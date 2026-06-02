import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Di sinilah nanti kode database mengambil data aslinya.
    // Sementara kita pasang data simulasi agar aplikasi tidak error/crash saat pertama dinyalakan.
    const mockData = {
      balance: 14250000,
      income: 18500000,
      expense: 4250000,
      transactions: [
        { id: 1, title: "Pencairan Profit Torbite", amount: 2500050, type: "income", date: "Hari ini, 14:20" },
        { id: 2, title: "Biaya Operasional Layanan", amount: 150000, type: "expense", date: "Kemarin, 09:15" },
        { id: 3, title: "Bonus Referral Mitra", amount: 500000, type: "income", date: "24 Mei 2026" },
      ]
    };
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}