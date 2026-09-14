import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import "./globals.css";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { OnboardingWizard } from "@/components/demo/OnboardingWizard";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "مُنظِّم — نظام إدارة السناتر التعليمية",
  description: "المنصة الأذكى لإدارة السناتر والمراكز التعليمية — تابع طلابك وماليتك وحضورك في مكان واحد",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: "#0f4c81",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased`}>
        <DemoBanner />
        <Providers>
            {children}
            <OnboardingWizard />
            <Toaster position="top-center" richColors theme="light" />
            <OfflineIndicator />
        </Providers>
      </body>
    </html>
  );
}
