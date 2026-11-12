import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;
const ARTIFACT_DIR = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\8ac6ca83-f352-42b4-881a-0a99950b9f40";

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-audit-polish-" + Date.now(),
  "http://localhost:3000"
]);

let versionRes = null;
for (let i = 0; i < 20; i++) {
  try {
    versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    if (versionRes.ok) break;
  } catch (e) {
    await new Promise((r) => setTimeout(r, 400));
  }
}
if (!versionRes || !versionRes.ok) {
  throw new Error("Could not connect to Chrome debugging port " + PORT);
}

try {
  const pages = await versionRes.json();
  const page = pages.find((p) => p.type === "page") || pages[0];

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  const evalCode = async (expr) => {
    const res = await send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res?.result?.result?.value;
  };

  await new Promise((r) => (ws.onopen = r));

  await send("Page.enable");
  await send("DOM.enable");
  await send("Runtime.enable");

  await send("Page.navigate", { url: "http://localhost:3000" });

  // Wait for page ready
  for (let i = 0; i < 30; i++) {
    const ready = await evalCode(`document.readyState === 'complete' && document.body?.innerHTML?.length > 1000`);
    if (ready) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  // Click Open Invitation to open envelope
  const clickRes = await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.toLowerCase().includes('open invitation') ||
        b.textContent.toLowerCase().includes('skip intro')
      );
      if (btn) {
        btn.click();
        return 'Clicked ' + btn.textContent.trim();
      }
      return 'Button not found';
    })()
  `);
  console.log("Intro interaction:", clickRes);

  await new Promise((r) => setTimeout(r, 2200));

  const viewports = [
    { width: 320, height: 600, label: "320px (Narrow Mobile)" },
    { width: 360, height: 740, label: "360px (Standard Mobile)" },
    { width: 375, height: 667, label: "375px (iPhone SE)" },
    { width: 390, height: 844, label: "390px (iPhone 12/13/14)" },
    { width: 430, height: 932, label: "430px (iPhone Pro Max)" },
    { width: 768, height: 1024, label: "768px (Tablet / iPad)" },
    { width: 1280, height: 800, label: "1280px (Desktop)" }
  ];

  console.log("\n=== VIEWPORT RESPONSIVENESS AUDIT ===");
  for (const vp of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 1000
    });
    await new Promise((r) => setTimeout(r, 500));

    const metrics = await evalCode(`
      (() => {
        const docW = document.documentElement.offsetWidth;
        const scrollW = document.documentElement.scrollWidth;
        const bodyScrollW = document.body.scrollWidth;
        const maxScrollW = Math.max(scrollW, bodyScrollW);
        const overflowPx = Math.max(0, maxScrollW - window.innerWidth);

        // Find couple names elements
        const h1 = document.querySelector('header h1');
        const h1Spans = h1 ? Array.from(h1.querySelectorAll('span')).map(s => s.textContent.trim()).filter(Boolean) : [];
        const h1Box = h1 ? h1.getBoundingClientRect() : null;

        // Footer elements
        const footer = document.querySelector('footer:last-of-type');
        const closingSec = document.querySelector('section:last-of-type');
        const closingBox = closingSec ? closingSec.getBoundingClientRect() : null;

        return {
          windowInnerWidth: window.innerWidth,
          maxScrollW,
          overflowPx,
          h1Spans,
          h1Width: h1Box ? Math.round(h1Box.width) : 0,
          h1Fits: h1Box ? h1Box.width <= window.innerWidth : false,
          closingHeight: closingBox ? Math.round(closingBox.height) : 0
        };
      })()
    `);

    console.log(`[${vp.label}] width=${metrics.windowInnerWidth}px, maxScrollW=${metrics.maxScrollW}px, overflow=${metrics.overflowPx}px, h1Width=${metrics.h1Width}px (fits=${metrics.h1Fits})`);
  }

  // Now capture screenshots on mobile 390px
  console.log("\nCapturing screenshots on iPhone 14 (390px)...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise((r) => setTimeout(r, 600));

  // Scroll to Hero
  await evalCode(`window.scrollTo({ top: 0, behavior: 'instant' })`);
  await new Promise((r) => setTimeout(r, 500));

  const heroClip = await evalCode(`
    (() => {
      const h1 = document.querySelector('header h1');
      if (!h1) return null;
      const rect = h1.parentElement.parentElement.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, rect.top + window.scrollY),
        width: 390,
        height: Math.min(844, rect.height + 60),
        scale: 1
      };
    })()
  `);

  if (heroClip) {
    const heroScreenshot = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 90,
      clip: heroClip
    });
    const heroData = heroScreenshot?.data || heroScreenshot?.result?.data;
    if (heroData) {
      const outPath = path.join(ARTIFACT_DIR, "hero-couple-names-mobile.jpg");
      fs.writeFileSync(outPath, Buffer.from(heroData, "base64"));
      console.log("Saved hero screenshot to", outPath);
    }
  }

  // Scroll to Closing Section / Footer
  await evalCode(`
    (() => {
      const closing = document.querySelector('section:last-of-type');
      if (closing) {
        closing.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 600));

  const footerClip = await evalCode(`
    (() => {
      const closing = document.querySelector('section:last-of-type');
      if (!closing) return null;
      const closingRect = closing.getBoundingClientRect();
      const footer = document.querySelector('footer:last-of-type');
      const footerRect = footer ? footer.getBoundingClientRect() : { height: 100 };
      const totalH = closingRect.height + footerRect.height;
      return {
        x: 0,
        y: Math.max(0, closingRect.top + window.scrollY),
        width: 390,
        height: Math.min(844, totalH),
        scale: 1
      };
    })()
  `);

  if (footerClip) {
    const footerScreenshot = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 90,
      clip: footerClip
    });
    const footerData = footerScreenshot?.data || footerScreenshot?.result?.data;
    if (footerData) {
      const outPath = path.join(ARTIFACT_DIR, "closing-footer-mobile.jpg");
      fs.writeFileSync(outPath, Buffer.from(footerData, "base64"));
      console.log("Saved closing footer screenshot to", outPath);
    }
  }

  // Also desktop hero capture (1280px)
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 800,
    deviceScaleFactor: 2,
    mobile: false
  });
  await evalCode(`window.scrollTo({ top: 0, behavior: 'instant' })`);
  await new Promise((r) => setTimeout(r, 600));

  const desktopHeroClip = await evalCode(`
    (() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return {
        x: 0,
        y: 0,
        width: 1280,
        height: Math.min(800, rect.height),
        scale: 1
      };
    })()
  `);

  if (desktopHeroClip) {
    const dScreenshot = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 90,
      clip: desktopHeroClip
    });
    const dData = dScreenshot?.data || dScreenshot?.result?.data;
    if (dData) {
      const outPath = path.join(ARTIFACT_DIR, "hero-couple-names-desktop.jpg");
      fs.writeFileSync(outPath, Buffer.from(dData, "base64"));
      console.log("Saved desktop hero screenshot to", outPath);
    }
  }

  console.log("\n=== AUDIT COMPLETE ===");
  ws.close();
} finally {
  chromeProcess.kill();
}
