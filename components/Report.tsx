
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DailyStats, VehicleType } from '../types';

interface ReportProps {
  stats: DailyStats;
}

const Report: React.FC<ReportProps> = ({ stats }) => {
  const navigate = useNavigate();
  const now = new Date();

  return (
    <div className="flex flex-col h-full bg-[#111] text-white">
      <header className="p-4 bg-black border-b border-white/10 flex justify-between items-center mb-6">
        <button onClick={() => navigate('/')} className="text-primary"><span className="material-icons-round text-4xl">reply</span></button>
        <h1 className="text-3xl font-black tracking-widest uppercase">Reporte Diario</h1>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1"><h1 className="text-xl font-black italic tracking-tighter">1637</h1></div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 overflow-y-auto no-scrollbar pb-24">
        {/* Total Highlight */}
        <div className="bg-black border-[3px] border-primary rounded-3xl p-6 text-center shadow-lg shadow-primary/10">
          <h2 className="text-4xl font-black text-primary uppercase italic tracking-tighter">Total: Gs. {stats.totalRevenue.toLocaleString('es-PY')}</h2>
        </div>

        {/* Table Headings */}
        <div className="grid grid-cols-3 text-primary font-black text-3xl px-2">
          <span>Total</span>
          <span className="text-center">Cant.</span>
          <span className="text-right">Gs.</span>
        </div>

        {/* Main Data Table */}
        <div className="space-y-4 text-2xl font-black bg-black/40 p-4 rounded-2xl border border-white/5">
          <div className="grid grid-cols-3 border-b border-white/10 pb-2">
            <span className="opacity-0">.</span>
            <span className="text-primary text-center text-4xl">{stats.transactions.length}</span>
            <span className="text-primary text-right">Gs. {stats.totalRevenue.toLocaleString('es-PY')}</span>
          </div>

          {[
            { label: 'Autos', type: VehicleType.AUTO },
            { label: 'Motos', type: VehicleType.MOTO },
            { label: 'Camio/SUV', type: VehicleType.SUV },
            { label: 'Camion', type: VehicleType.TRUCK },
          ].map(row => {
            const count = stats.transactions.filter(t => t.type === row.type).length;
            const revenue = stats.transactions.filter(t => t.type === row.type).reduce((a,b) => a + b.amount, 0);
            return (
              <div key={row.label} className="grid grid-cols-3 border-b border-white/5 pb-1">
                <span className="text-white opacity-90">{row.label}</span>
                <span className="text-primary text-center">{String(count).padStart(2, '0')}</span>
                <span className="text-primary text-right font-mono text-xl">Gs. {revenue.toLocaleString('es-PY')}</span>
              </div>
            );
          })}
        </div>

        {/* Environment Stats */}
        <div className="bg-black p-4 rounded-xl border border-white/10 space-y-4">
           <div className="flex justify-between items-center px-4">
              <span className="text-2xl font-black text-primary">mm= <span className="text-white">44,2</span></span>
              <span className="material-icons-round text-white text-5xl">cloudy_snowing</span>
              <span className="text-2xl font-black text-primary">hr.: <span className="text-white">1:18</span></span>
           </div>
           <div className="flex justify-between items-center text-2xl font-black px-4">
              <span className="text-white">Aper= <span className="text-primary">07:09</span></span>
              <span className="text-white">Cierre= <span className="text-primary">17:35</span></span>
           </div>
           <div className="bg-black/80 py-2 rounded text-center text-xl font-black opacity-60">
              {now.toLocaleDateString('es-PY', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).toUpperCase()}
           </div>
        </div>

        {/* CSV Button */}
        <button className="w-full bg-black border-[3px] border-primary py-4 rounded-3xl flex items-center justify-center gap-4 active:scale-95 transition-all group">
           <span className="material-icons-round text-primary text-5xl group-hover:scale-110">download</span>
           <span className="text-primary font-black text-6xl tracking-widest italic">CSV</span>
           <div className="flex flex-col items-end scale-75">
              <div className="flex items-center gap-1"><h1 className="text-xl font-black italic tracking-tighter text-white">1637</h1></div>
           </div>
        </button>
      </main>

      <footer className="p-4 flex flex-col items-center gap-1 opacity-20">
        <span className="text-[10px] font-black tracking-widest">Powered by Lab.IA</span>
        <span className="material-icons-round text-[10px] text-cyan-400">psychology</span>
      </footer>
    </div>
  );
};

export default Report;
