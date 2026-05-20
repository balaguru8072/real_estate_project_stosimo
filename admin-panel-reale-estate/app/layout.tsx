import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import AdminLayout from "./_component/_headers/AdminLayout";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = { title: 'Admin Panel' }

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        {/* Icon CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/material-design-iconic-font@2.2.0/dist/css/material-design-iconic-font.min.css"
        />
      </head>

      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}