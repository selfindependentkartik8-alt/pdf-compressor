import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://pdfcompressor.krishaiworks.com"
  ),

  title: "PDF Compressor | Compress PDF Files Online",

  description:
    "Compress PDF files online and reduce their file size quickly while maintaining quality. Use the free PDF Compressor by KrishAIWorks.",

  keywords: [
    "PDF Compressor",
    "Compress PDF",
    "PDF Compressor Online",
    "Compress PDF Online",
    "Reduce PDF Size",
    "PDF Size Reducer",
    "Free PDF Compressor",
    "Online PDF Compressor",
    "Compress PDF File",
    "PDF Compression Tool",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical:
      "https://pdfcompressor.krishaiworks.com/",
  },

  openGraph: {
    title: "PDF Compressor | KrishAIWorks",
    description:
      "Compress PDF files online and reduce their file size quickly while maintaining quality.",
    url: "https://pdfcompressor.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "PDF Compressor | KrishAIWorks",
    description:
      "Compress PDF files online and reduce their file size quickly with KrishAIWorks.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}