import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://pdfcompressor.krishaiworks.com/#webapplication",
      name: "PDF Compressor",
      url: "https://pdfcompressor.krishaiworks.com/",
      description:
        "Compress PDF files online and reduce their file size quickly while maintaining quality. Use the free PDF Compressor by KrishAIWorks.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://pdfcompressor.krishaiworks.com/#webpage",
      url: "https://pdfcompressor.krishaiworks.com/",
      name: "PDF Compressor | Compress PDF Files Online",
      description:
        "Compress PDF files online and reduce their file size quickly while maintaining quality. Use the free PDF Compressor by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://pdfcompressor.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          id="pdf-compressor-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}