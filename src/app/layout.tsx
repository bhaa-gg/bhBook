"use client";

import { Toaster } from "@/components/ui/toaster";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { reduxStore } from "@/lib/Redux/reduxStore";
// import { Alert } from "@/components/ui/alert";
// import { Offline } from "react-detect-offline";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const query = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={reduxStore}>
          <QueryClientProvider client={query}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
        <Toaster />

        {/* <Offline>
          <Alert className=" bottom-0 fw-bold   ms-4 fixed">
            No Internet Connection
          </Alert>
        </Offline> */}
      </body>
    </html>
  );
}
