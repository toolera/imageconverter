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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
