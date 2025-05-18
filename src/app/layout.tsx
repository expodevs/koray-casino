import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import { headers } from "next/headers";
import '@/styles/base.scss';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Admin Panel",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const ua = headers().get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);
    const deviceClass = isMobile ? "mobile" : "desktop";
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${deviceClass} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
