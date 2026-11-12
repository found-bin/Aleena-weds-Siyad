import type { Metadata, Viewport } from "next";
import { assetPath } from "@/data/weddingConfig";
import "./globals.css";

const isVercel = Boolean(process.env.VERCEL === "1" || process.env.VERCEL_ENV);
const isProd = process.env.NODE_ENV === "production";
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : isProd && !isVercel
  ? "https://welkincedev.github.io/wedding_invite_one"
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aleena Siyad & Siyad T N | Wedding Invitation",
  description:
    "Together with their families, we cordially invite you to celebrate their Nikah on 13 December 2026.",
  authors: [{ name: "found.bin" }],
  icons: {
    icon: [
      { url: assetPath("/favicon/favicon.ico"), sizes: "any" },
      { url: assetPath("/favicon/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: assetPath("/favicon/favicon-16x16.png"), sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: assetPath("/favicon/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "manifest", url: assetPath("/favicon/site.webmanifest") }
    ]
  },
  openGraph: {
    type: "website",
    title: "Aleena Siyad & Siyad T N | Wedding Invitation",
    description:
      "Together with their families, we cordially invite you to celebrate their Nikah on 13 December 2026.",
    images: [
      {
        url: assetPath("/favicon/web-thumb.png"),
        width: 1733,
        height: 907,
        type: "image/png",
        alt: "Aleena Siyad & Siyad T N | Wedding Invitation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleena Siyad & Siyad T N | Wedding Invitation",
    description:
      "Together with their families, we cordially invite you to celebrate their Nikah on 13 December 2026.",
    images: [assetPath("/favicon/web-thumb.png")]
  }
};

export const viewport: Viewport = {
  themeColor: "#343C32",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const paperTextureUrl = assetPath("/assets/paper-texture.webp");
  const faviconIcoUrl = assetPath("/favicon/favicon.ico");
  const favicon32Url = assetPath("/favicon/favicon-32x32.png");
  const favicon16Url = assetPath("/favicon/favicon-16x16.png");
  const appleTouchIconUrl = assetPath("/favicon/apple-touch-icon.png");
  const manifestUrl = assetPath("/favicon/site.webmanifest");
  const heroCoupleUrl = assetPath("/images/couple/couple-illustration.jpg");

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconIcoUrl} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32Url} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16Url} />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconUrl} />
        <link rel="manifest" href={manifestUrl} />
        <link rel="preload" as="image" href={heroCoupleUrl} />
        <style
          id="paper-bg-inject"
          dangerouslySetInnerHTML={{
            __html: `:root { --bg-paper-url: url("${paperTextureUrl}"); }`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
