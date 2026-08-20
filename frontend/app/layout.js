import "./globals.css";
import { BrandProvider } from "@/components/brand-provider";

export const metadata = {
  title: "Todo Command Center",
  description: "Admin and user todo workspace"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BrandProvider>{children}</BrandProvider>
      </body>
    </html>
  );
}
