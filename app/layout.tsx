import './styles/globals.css';

export const metadata = {
  title: '玄学日记 TaoistDiaries',
  description: '结合道教玄学与现代日记的数字化修仙工具'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <body className="bg-[#f0e6d2] text-[#2c2416] font-serif antialiased">
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
          {children}
        </div>
      </body>
    </html>
  );
}
