import localFont from "next/font/local";

import Head from "next/head";
import { CustomCursor, ScrollTrace } from "./components";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeueThin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueRoman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueHeavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

export const metadata = {
  title: "Design Portfolio",
  description: "A portfolio website for designers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Design Portfolio" />
        <meta property="og:description" content="A portfolio website for designers" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Sergi0let/design-portfolio/refs/heads/main/public/favicon/og-image.png"
        />
        <meta property="og:url" content="https://design-portfolio-six-roan.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Назва сайту" />

        {/* Для Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Portfolio" />
        <meta name="twitter:description" content="A portfolio website for designers" />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Sergi0let/design-portfolio/refs/heads/main/public/favicon/og-image.png"
        />
      </Head>
      <body className={`${helveticaNeue.variable} antialiased`}>
        <ScrollTrace />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
