import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TodoContextProvider from "@/context/useTodo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Context API Todo Local Storage",
  description: "Generate Todo items list and store in local storage data sharing by context api",
  icons: ["/react-icon.svg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TodoContextProvider>
          {children}
        </TodoContextProvider>
      </body>
    </html>
  );
}
