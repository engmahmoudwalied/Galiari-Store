import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "جاليرى العربى",
  description:" جاليرى العربى للأفراح والمناسبات الخاصة",
  generator: "Galiari Store",
  keywords: ["كوشة العروس", "تنسيق الأفراح", "ديكور الزفاف", "هدايا الزفاف", "إكسسوارات العروس", "تنسيق الحفلات"],
  authors: [{ name: "جاليرى العربى " }],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://galiari-store.vercel.app"),
  icons: {
    icon: [
      { url: "/481664288_122104225784786774_8348681655699318804_n.jpg", type: "image/jpeg" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/481664288_122104225784786774_8348681655699318804_n.jpg",
    apple: "/481664288_122104225784786774_8348681655699318804_n.jpg",
  },
  openGraph: {
    type: "website",
    locale: "ar",
    url: "/",
    siteName: "جاليرى العربى",
    title: "جاليرى العربى",
    description: " جاليرى العربى للأفراح والمناسبات الخاصة",
    images: [
      {
        url: "/481664288_122104225784786774_8348681655699318804_n.jpg",
        width: 1200,
        height: 630,
        alt: "جاليرى العربى",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "جاليرى العربى",
    description: " جاليرى العربى للأفراح والمناسبات الخاصة",
    images: [
      "/481664288_122104225784786774_8348681655699318804_n.jpg",
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Suspense fallback={<div>جاري التحميل...</div>}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
