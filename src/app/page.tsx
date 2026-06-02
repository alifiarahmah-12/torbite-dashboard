"use client";
import React, { useState, useEffect } from "react";
import { LayoutDashboard, Wallet, User, Bell, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({ balance: 0, income: 0, expense: 0, transactions: [] });
  const [loading, setLoading] = useState(true);

  // Mengambil data dari API backend (yang nanti terhubung ke Database)
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      {/* Header Aplikasi */}
      <header className="p-6 flex justify-between items-center bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div>
          <p className="text-xs text-slate-400">Selamat Datang di</p>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Torbite App</h1>
        </div>
        <button className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
          <Bell className="w-5 h-5 text-slate-300" />
        </button>
      </header>

      {/* Konten Utama (Bisa di-scroll) */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {/* Card Saldo Utama */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl shadow-lg relative overflow-hidden">
          <p className="text-sm text-emerald-100/80 font-medium">Total Saldo Terkumpul</p>
          <h2 className="text-3xl font-black mt-1 text-white">
            {loading ? "Rp --.---" : `Rp ${data.balance.toLocaleString("id-ID")}`}
          </h2>
          <div className="mt-6 flex justify-between border-t border-white/20 pt-4">
            <div>
              <p className="text-xs text-emerald-100/70 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Pemasukan</p>
              <p className="font-semibold text-white text-sm">+{loading ? "..." : data.income.toLocaleString("id-ID")}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-100/70 flex items-center gap-1"><ArrowDownLeft className="w-3 h-3"/> Pengeluaran</p>
              <p className="font-semibold text-white text-sm">-{loading ? "..." : data.expense.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>

        {/* Daftar Aktivitas Terakhir */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-base text-slate-200">Aktivitas Torbite</h3>
            <span className="text-xs text-emerald-400 cursor-pointer hover:underline">Lihat Semua</span>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-6"><RefreshCw className="animate-spin text-emerald-400" /></div>
            ) : (
              data.transactions.map((tx: any) => (
                <div key={tx.id} className="bg-slate-900 p-4 rounded-2xl flex justify-between items-center border border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{tx.title}</p>
                      <p className="text-xs text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Navigasi Menu Bawah */}
      <nav className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-8 py-4 flex justify-between items-center rounded-b-[32px]">
        <button className="flex flex-col items-center gap-1 text-emerald-400">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dompet</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profil</span>
        </button>
      </nav>
    </>
  );
}