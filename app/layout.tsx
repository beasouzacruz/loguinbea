import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "projeto login",
  description: "criando meu primeiro projeto com o backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
