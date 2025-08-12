import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Image Format Converter - Convert JPEG to PNG & PNG to JPEG Online",
  description: "Free online image format converter. Convert JPEG to PNG and PNG to JPEG instantly in your browser. Fast, secure, and works on all devices. No upload required.",
  keywords: "image converter, JPEG to PNG, PNG to JPEG, image format converter, online converter, free image converter",
  authors: [{ name: "Image Format Converter" }],
  creator: "Image Format Converter",
  publisher: "Image Format Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://imageconverter.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Image Format Converter - Convert JPEG ↔ PNG Online",
    description: "Free online image format converter. Convert between JPEG and PNG formats instantly in your browser. Fast, secure, and mobile-friendly.",
    url: 'https://imageconverter.vercel.app',
    siteName: 'Image Format Converter',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Image Format Converter - Convert JPEG ↔ PNG Online",
    description: "Free online image format converter. Convert between JPEG and PNG formats instantly in your browser.",
    creator: '@imageconverter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon-192-maskable.png',
        color: '#3b82f6',
      },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ImageConverter" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-startup-image" href="/icon-512.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
