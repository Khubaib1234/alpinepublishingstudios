import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});

export const metadata = {
  title: "Alpine Publishing Studios | Professional Self-Publishing Services",
  description:
    "Professional publishing services for independent authors. Alpine Publishing Studios helps authors edit, design, format, publish, and promote their books.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://www.alpinepublishingstudios.com"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1690CE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className={`${dmSans.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
