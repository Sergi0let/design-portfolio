import localFont from "next/font/local";

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

const baseUrl = "https://design-portfolio-six-roan.vercel.app/";

export async function generateMetadata() {
  const title = "Design Portfolio";
  const description = "A portfolio website for designers";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    themeColor: "black",
    openGraph: {
      title,
      description,
      url: baseUrl,
      images: [
        {
          url: "/favicon/apple-touch-icon.png",
          secureUrl: "/favicon/apple-touch-icon.png",
          width: 1200,
          height: 630,
          alt: "Image preview of the website",
        },
      ],
      type: "website",
      siteName: "Design Portfolio",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.variable} antialiased`}>
        <ScrollTrace />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
