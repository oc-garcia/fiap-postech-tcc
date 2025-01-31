import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

import { Roboto } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";

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
          <Box component="main" sx={{ display: "flex", flexDirection: "column" }}>
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
