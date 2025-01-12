import localFont from "next/font/local";

import { CustomCursor } from "./components";
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
      <body className={`${helveticaNeue.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
