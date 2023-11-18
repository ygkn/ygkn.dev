import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "ygkn.dev",
};

const RootLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <html lang="ja">
      <link rel="shortcut icon" href="icon.jpg" />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
