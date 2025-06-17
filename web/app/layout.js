import "./globals.css";

export const metadata = {
  title: "Open Library",
  description: "Open Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
