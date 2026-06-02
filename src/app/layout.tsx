import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torbite Mobile Dashboard",
  description: "Responsive Mobile App & Dashboard Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 font-sans antialiased flex justify-center items-center min-h-screen/90 my-4">
        {/* Frame Simulasi Mobile Device (Bentuk HP) */}
        <div className="w-full max-w-md h-[844px] bg-slate-950 rounded-[40px] shadow-2xl border-8 border-slate-800 overflow-hidden relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}