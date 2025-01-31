import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

import { Roboto } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "EducaPro",
  description: "EducaPro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
