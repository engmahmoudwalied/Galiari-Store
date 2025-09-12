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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
