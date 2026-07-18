import Link from 'next/link';
import './globals.css'
import { Inter, IBM_Plex_Sans, Source_Sans_3 } from "next/font/google";
import { cn } from "@/lib/utils";

const sourceSans3Heading = Source_Sans_3({subsets:['latin'],variable:'--font-heading'});

const ibmPlexSans = IBM_Plex_Sans({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", ibmPlexSans.variable, sourceSans3Heading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
