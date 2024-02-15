import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProvider from "@/components/ClientProvider";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAS AI APP",
  description: "AI APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Header/>
            {children}
            </ThemeProvider>
          </FirebaseAuthProvider>
          
          </body>
      </html>
    </ClientProvider>
  );
}
