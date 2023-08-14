import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Linear",
  description: "Learn and experiment with linear equations",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className={poppins.className + " overflow-hidden bg-gray-950"}>
      {children}
    </body>
  </html>
);

export default RootLayout;
