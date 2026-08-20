import "./globals.css";

export const metadata = {
  title: "Todo Command Center",
  description: "Admin and user todo workspace"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
