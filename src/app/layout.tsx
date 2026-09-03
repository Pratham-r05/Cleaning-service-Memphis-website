import type { Metadata } from "next";
import { Poppins, Open_Sans, Archivo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | House & Office Cleaning in ${site.city}, ${site.state}`,
  description: `${site.yearsExperience} years cleaning homes, offices, and post-construction sites across ${site.areaLabel}. Free estimates, guaranteed service. Call ${site.owner} at ${site.phone}.`,
  openGraph: {
    title: `${site.name} | ${site.city}, ${site.state}`,
    description: `${site.yearsExperience} years of spotless. Houses, offices, deep cleaning and construction cleanup. Free estimates.`,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
