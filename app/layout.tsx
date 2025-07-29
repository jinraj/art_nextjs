import type { Metadata } from "next";
import { Funnel_Sans, Funnel_Display, Poppins, Cactus_Classical_Serif} from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/NavBar";
import AuthProvider from "./auth/AuthProvider";

const fontSans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});


const fontMono = Poppins({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"]
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

  const bgGradient = [
    "bg-gradient-to-br from-gray-50 via-gray-100 to-white"
  ];
  const randomGradient = bgGradient[Math.floor(Math.random() * bgGradient.length)];
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased min-h-screen ${randomGradient}`}
      >
        <AuthProvider>
          <div className="pt-5 md:pt-7 fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
