import type { Metadata } from "next";
import { Funnel_Sans, Funnel_Display } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/NavBar";

const fontSans = Funnel_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const fontMono = Funnel_Display({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "It Is Meaningful",
  description: "It Is Meaningful",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased bg-gray-100`}
      >
        <div className="px-10 pt-5 md:px-15 md:pt-7 fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <main className="px-10">{children}</main>

        {/* <div id="quote" className="py-8 text-center">Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks.</div> */}
      </body>
    </html>
  );
}
