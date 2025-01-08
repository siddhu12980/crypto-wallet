import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/toaster";
import { FloatingNav } from "@/components/ui/floating-navbar";
export const metadata: Metadata = {
  title: "Crypto Wallet",
  description: " A simple crypto wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav
            className="w-[80%]  "
            navItems={[
              { name: "Home", link: "/" },
              { name: "About", link: "/" },
              { name: "Contact", link: "/" },
            ]}
          />

          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
