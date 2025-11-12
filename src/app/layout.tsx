export const metadata = { title: "Humanitas", description: "Reading test" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin:0, background:"#F8F5F0", color:"#222" }}>{children}</body>
    </html>
  );
}
