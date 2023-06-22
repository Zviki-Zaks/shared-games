import "./globals.scss";
import { Secular_One } from "next/font/google";

const secular = Secular_One({ weight: "400", subsets: ["hebrew"] });

export const metadata = {
  title: "משחקים יחד",
  description: "shared games platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he">
      <body className={secular.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
