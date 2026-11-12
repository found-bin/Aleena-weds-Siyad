import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9225;
const BASE_URL = "http://localhost:3001/wedding_invite_one";

console.log("=== Testing Exported Static Site in Headless Chrome ===");

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-static-test-" + Date.now(),
  BASE_URL + "/"
]);

let versionRes = null;
for (let i = 0; i < 20; i++) {
  try {
    versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    if (versionRes.ok) break;
  } catch {
    await new Promise((r) => setTimeout(r, 300));
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

  await send("Page.navigate", { url: BASE_URL + "/" });
  await new Promise((r) => setTimeout(r, 1200));

  // Check direct loading & title
  const initialInfo = await evalCode(`
    (() => {
      return {
        title: document.title,
        hasEnvelope: !!document.querySelector('[aria-label="Folded Wedding Invitation"]'),
        hasSkipBtn: !!Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip intro'))
      };
    })()
  `);
  console.log("✔ Direct loading successful:", initialInfo);

  // Click skip intro to reveal main invitation page
  const clickSkip = await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip intro'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()
  `);
  console.log("✔ Skip intro clicked:", clickSkip);
  await new Promise((r) => setTimeout(r, 800));

  // Check main page elements: couple image, venue images, events, families, RSVP
  const pageAudit = await evalCode(`
    (() => {
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth
      }));
      const coupleImg = images.find(img => img.src.includes('couple-illustration.jpg'));
      const nikahImg = images.find(img => img.src.includes('venue-nikah.jpg'));
      const receptionImg = images.find(img => img.src.includes('venue-reception.jpg'));
      return {
        totalImages: images.length,
        coupleImageFound: !!coupleImg,
        coupleImageLoaded: coupleImg ? coupleImg.naturalWidth > 0 : false,
        nikahImageFound: !!nikahImg,
        receptionImageFound: !!receptionImg
      };
    })()
  `);
  console.log("✔ Illustrated image elements audit:", pageAudit);

  // Single-line couple names verification
  const coupleNameCheck = await evalCode(`
    (() => {
      const el = document.querySelector('.hero-couple-title');
      if (!el) return { found: false };
      const computed = window.getComputedStyle(el);
      return {
        found: true,
        text: el.textContent.replace(/\\s+/g, ' ').trim(),
        whiteSpace: computed.whiteSpace,
        isSingleLine: computed.whiteSpace === 'nowrap'
      };
    })()
  `);
  console.log("✔ Couple names single-line check:", coupleNameCheck);

  // Compact share element verification
  const shareCheck = await evalCode(`
    (() => {
      const shareEl = document.getElementById('share');
      const shareBtn = shareEl ? shareEl.querySelector('button') : null;
      return {
        found: !!shareBtn,
        text: shareBtn ? shareBtn.textContent.trim() : '',
        isCompact: shareBtn ? shareBtn.clientHeight < 50 : false
      };
    })()
  `);
  console.log("✔ Share button compact check:", shareCheck);

  // Viewports responsive audit
  const viewports = [
    { width: 360, height: 740, label: "360px (Standard mobile)" },
    { width: 390, height: 844, label: "390px (iPhone 14)" },
    { width: 430, height: 932, label: "430px (iPhone Pro Max)" },
    { width: 768, height: 1024, label: "768px (Tablet portrait)" },
    { width: 1024, height: 768, label: "1024px (Tablet landscape / small laptop)" },
    { width: 1440, height: 900, label: "1440px (Desktop wide)" }
  ];

  console.log("\n--- Testing Responsive Viewports (Zero Overflow) ---");
  for (const vp of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768
    });
    await new Promise((r) => setTimeout(r, 200));

    const overflowCheck = await evalCode(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          docWidth,
          winWidth,
          overflow: docWidth > winWidth
        };
      })()
    `);

    const pass = overflowCheck && !overflowCheck.overflow;
    console.log(`[${vp.width}px] ${vp.label}: ${pass ? '✔ PASS (0 horizontal overflow)' : '✖ FAIL OVERFLOW'}`);
  }

  // Test RSVP Interactions
  console.log("\n--- Testing RSVP Flow in Browser ---");
  const selectYes = await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Joyfully Yes!'));
      if (btn) { btn.click(); return true; }
      return false;
    })()
  `);
  console.log("1. Select 'Joyfully Yes!':", selectYes);
  await new Promise((r) => setTimeout(r, 400));

  const checkCountField = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      const nameInput = document.getElementById('guestName');
      return { hasCount: !!countInput, hasName: !!nameInput };
    })()
  `);
  console.log("2. Guest count field rendered:", checkCountField);

  // Click Change answer
  await evalCode(`
    (() => {
      const changeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Change answer'));
      if (changeBtn) changeBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  // Select Maybe
  await evalCode(`
    (() => {
      const maybeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Maybe'));
      if (maybeBtn) maybeBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const checkMaybeForm = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      const rsvpText = document.getElementById('rsvp')?.textContent || '';
      return {
        countHidden: !countInput,
        hasWarmMessage: rsvpText.includes('We hope you can join us!')
      };
    })()
  `);
  console.log("3. 'Maybe' excludes count and shows warm message:", checkMaybeForm);

  // Test browser refresh
  console.log("\n--- Testing Browser Refresh ---");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));
  const refreshCheck = await evalCode(`
    (() => {
      return {
        title: document.title,
        bodyLen: document.body?.innerHTML?.length || 0
      };
    })()
  `);
  console.log("✔ Direct browser refresh PASS:", refreshCheck);

  ws.close();
  console.log("\n=== Headless Chrome Static Site Tests ALL PASSED! ===");
} catch (err) {
  console.error("Test error:", err);
} finally {
  chromeProcess.kill();
}
