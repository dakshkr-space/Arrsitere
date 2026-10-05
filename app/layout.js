import { Unbounded, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], weight: ["300", "600"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

export const metadata = {
  title: "Aarohan",
  description: "Aarohan, NIT Durgapur",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
