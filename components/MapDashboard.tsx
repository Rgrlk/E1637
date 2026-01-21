
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingSpot, ActiveVehicle } from '../types';

interface MapDashboardProps {
  spots: ParkingSpot[];
  activeVehicles: ActiveVehicle[];
  onSpotSelect: (spot: ParkingSpot) => void;
  onClientLost?: (spotId: string) => void;
}

const MapDashboard: React.FC<MapDashboardProps> = ({ spots, activeVehicles, onClientLost }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === 'FREE') {
      navigate(`/entry/${spot.id}`);
    } else {
      navigate(`/payment/${spot.id}`);
    }
  };

  const getSpot = (id: string) => spots.find(s => s.id === id);

  // Added 'key' to prop type to satisfy TypeScript when using SpotButton inside .map()
  const SpotButton = ({ id, className = "" }: { id: string; className?: string; key?: React.Key }) => {
    const spot = getSpot(id);
    if (!spot) return <div className={`bg-transparent ${className}`}></div>;
    return (
      <button 
        onClick={() => handleSpotClick(spot)}
        className={`relative flex items-center justify-center font-black transition-all active:scale-90 border-[1px] ${className} ${
          spot.status === 'OCCUPIED' 
          ? 'bg-black border-white/40 text-white shadow-inner' 
          : 'bg-white border-black text-black'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] absolute -top-1 -left-1 bg-yellow-400 px-0.5 rounded leading-none text-black z-10">{spot.number}</span>
          <span className="material-icons-round text-xs opacity-80">{spot.status === 'OCCUPIED' ? 'directions_car' : ''}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#111] text-white overflow-hidden relative">
      {/* Dynamic Menu Overlay (Image 6) */}
      {showMenu && (
        <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col p-6 animate-in fade-in duration-300">
           <header className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-red-600 scale-75">
                    <div className="flex gap-0.5 scale-50"><div className="w-4 h-8 bg-black rounded-full"></div></div>
                 </div>
                 <h1 className="text-3xl font-black italic tracking-tighter">1637</h1>
              </div>
              <button onClick={() => setShowMenu(false)} className="text-primary"><span className="material-icons-round text-5xl">close</span></button>
           </header>
           
           <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">menu</span> Menú</button>
              <button onClick={() => navigate('/login')} className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">logout</span> Log Out</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">login</span> Ingreso</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">door_back</span> Salida</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">map</span> Mapa</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">do_not_disturb_on</span> Pérdida</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">event_available</span> Mensualeros</button>
              <button className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">payments</span> Cobrar</button>
              <button onClick={() => navigate('/report')} className="w-full bg-primary text-black py-3 rounded font-black flex items-center gap-4 px-4 text-xl"><span className="material-icons-round">send</span> Enviar Informe</button>
           </div>
           
           <footer className="mt-8 flex flex-col items-center opacity-30">
              <span className="text-[10px] font-black tracking-widest">Powered by Lab.IA</span>
           </footer>
        </div>
      )}

      {/* HEADER SEGUN IMAGEN 3 */}
      <header className="p-4 bg-black border-b border-white/10 flex justify-between items-center">
        <div className="flex gap-6">
          <button onClick={() => setShowMenu(true)} className="text-primary"><span className="material-icons-round text-5xl">reply</span></button>
          <button onClick={() => navigate('/report')} className="text-primary"><span className="material-icons-round text-5xl">analytics</span></button>
          <button className="relative">
            <span className="material-icons-round text-5xl text-red-600">do_not_disturb_on</span>
            <span className="absolute inset-0 flex items-center justify-center text-[6px] font-black leading-none mt-4 text-white uppercase">Rejected Clients</span>
          </button>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
             <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-red-600 scale-75">
                <div className="flex gap-0.5 scale-50"><div className="w-2 h-4 bg-black rounded-full"></div></div>
             </div>
             <h1 className="text-xl font-black italic tracking-tighter leading-none">1637</h1>
          </div>
          <div className="flex items-center gap-1 opacity-40">
            <span className="text-[6px] font-black text-cyan-400 uppercase">Powered by</span>
            <span className="material-icons-round text-[10px] text-cyan-400">psychology</span>
          </div>
        </div>
      </header>

      {/* MAPA SEGUN IMAGEN 3 */}
      <main className="flex-1 overflow-y-auto p-2 no-scrollbar bg-white">
        <div className="max-w-[340px] mx-auto space-y-4 py-2 border-[1px] border-black p-2 bg-[#f8f8f8]">
          
          {/* AREA ALTA */}
          <div className="grid grid-cols-5 gap-2 px-2">
            {[1,2,3,4,5].map(i => <SpotButton key={i} id={i.toString()} className="h-14 rounded-full" />)}
          </div>

          <div className="flex justify-between items-center px-4 relative h-20">
             <div className="flex flex-col gap-2">
                <SpotButton id="6" className="w-16 h-10" />
                <SpotButton id="7" className="w-20 h-10" />
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="flex items-center gap-2"><span className="material-icons-round text-green-500 text-3xl">arrow_back</span><span className="material-icons-round text-green-500 text-3xl">arrow_forward</span></div>
                <span className="text-[8px] font-bold text-black opacity-60">Area ALTA</span>
                <SpotButton id="E5" className="w-10 h-10 rounded-full mt-1" />
             </div>
             <div className="flex flex-col gap-2 items-end">
                <SpotButton id="8" className="w-16 h-10" />
                <SpotButton id="9" className="w-16 h-10" />
             </div>
          </div>

          {/* RAMPA */}
          <div className="grid grid-cols-12 gap-1 items-center bg-[#eee] p-1 border-y border-black/10">
             <div className="col-span-4 grid grid-cols-2 gap-1">
                <SpotButton id="10" className="h-6" /><SpotButton id="11" className="h-6" />
                <SpotButton id="M1" className="h-10 border-blue-500/20" /><SpotButton id="M2" className="h-10 border-blue-500/20" />
             </div>
             <div className="col-span-4 flex flex-col items-center bg-white border border-black p-2">
                <SpotButton id="E4" className="w-4 h-4 rounded-full mb-1" />
                <span className="text-sm font-black tracking-widest text-black">RAMPA</span>
                <SpotButton id="E3" className="w-4 h-4 rounded-full mt-1" />
             </div>
             <div className="col-span-4 grid grid-cols-2 gap-1">
                <SpotButton id="12" className="h-6" /><SpotButton id="13" className="h-6" />
                <SpotButton id="M3" className="h-10 border-blue-500/20" /><SpotButton id="M4" className="h-10 border-blue-500/20" />
             </div>
          </div>

          {/* AREA BAJA */}
          <div className="relative p-2 flex justify-between gap-8 h-[300px]">
             <div className="flex flex-col gap-1 w-12">
                <SpotButton id="E1" className="h-4 rounded-sm bg-purple-500/20 border-purple-500" />
                {["29","28","27","26","25","24","23","22","21"].map(id => <SpotButton key={id} id={id} className="h-7 w-full rounded" />)}
             </div>

             <div className="flex-1 flex flex-col items-center justify-between py-10 opacity-60">
                <span className="text-[8px] font-black text-black">Area BAJA</span>
                <span className="material-icons-round text-green-500 text-5xl">arrow_upward</span>
                <span className="material-icons-round text-green-500 text-5xl">arrow_upward</span>
                <span className="text-xl font-black text-green-600 tracking-[0.5em] mt-2">PORTON</span>
             </div>

             <div className="flex flex-col gap-1 w-14">
                <SpotButton id="E2" className="h-4 rounded-sm bg-purple-500/20 border-purple-500" />
                <SpotButton id="14" className="h-10 rounded" />
                <SpotButton id="15" className="h-10 rounded" />
                <div className="bg-blue-600/10 border border-blue-600 h-20 rounded flex items-center justify-center my-2">
                   <span className="text-[10px] font-black text-blue-800 uppercase vertical-text -rotate-180">OFICINA</span>
                </div>
                {["16","17","18","19","20"].map(id => <SpotButton key={id} id={id} className="h-7 w-full rounded" />)}
             </div>
          </div>
        </div>
      </main>

      <footer className="p-3 bg-black border-t border-white/10 flex justify-center items-center opacity-30">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Powered by Lab.IA</span>
      </footer>
    </div>
  );
};

export default MapDashboard;
