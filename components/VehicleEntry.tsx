
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VehicleType, ActiveVehicle } from '../types';

interface VehicleEntryProps {
  onEntry: (vehicle: ActiveVehicle) => void;
}

const VehicleEntry: React.FC<VehicleEntryProps> = ({ onEntry }) => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [type, setType] = useState<VehicleType>(VehicleType.AUTO);
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEntry = () => {
    if (!spotId) return;
    const vehicle: ActiveVehicle = {
      id: Math.random().toString(36).substr(2, 9),
      plateLetters: letters.toUpperCase(),
      plateNumbers: numbers,
      type,
      entryTime: new Date().toISOString(),
      spotId
    };
    onEntry(vehicle);
    navigate('/');
  };

  const dateStr = dateTime.toLocaleDateString('es-PY', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).toUpperCase();
  const timeStr = dateTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex flex-col h-full bg-background-dark text-white overflow-hidden">
      <header className="p-4 bg-black border-b border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="text-primary"><span className="material-icons-round text-4xl">reply</span></button>
            <button className="text-primary"><span className="material-icons-round text-4xl">analytics</span></button>
            <button className="text-red-600"><span className="material-icons-round text-4xl">do_not_disturb_on</span></button>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-red-600 scale-75">
                  <div className="flex gap-0.5 scale-50"><div className="w-2 h-4 bg-black rounded-full"></div></div>
                </div>
                <h1 className="text-xl font-black italic tracking-tighter">1637</h1>
             </div>
             <p className="text-[6px] opacity-40 uppercase font-black">Mercado 4 Asunción</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="bg-primary text-black font-black py-1 px-4 rounded text-center text-sm">{dateStr}</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-lg tracking-widest">Hora:</div>
            <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-2xl font-mono">{timeStr}</div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto no-scrollbar pb-24">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { id: VehicleType.AUTO, label: 'Auto', icon: 'directions_car' },
            { id: VehicleType.MOTO, label: 'Moto', icon: 'two_wheeler' },
            { id: VehicleType.SUV, label: 'SUV/Camio.', icon: 'minor_crash' },
            { id: VehicleType.TRUCK, label: 'Camión', icon: 'local_shipping' },
            { id: VehicleType.MONTHLY, label: 'Mensualero', icon: 'event_available' },
          ].map(v => (
            <button 
              key={v.id}
              onClick={() => setType(v.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${type === v.id ? 'text-primary scale-110' : 'opacity-40'}`}
            >
              <span className="material-icons-round text-4xl">{v.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">{v.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white/5 border-2 border-white/20 rounded-2xl p-4 flex gap-4 items-center mb-8 shadow-inner shadow-white/5">
          <div className="flex-1 border-r border-white/10 pr-4">
             <span className="text-[8px] font-black opacity-40 uppercase block mb-1">Letters</span>
             <input 
              className="w-full bg-transparent text-center text-3xl font-black uppercase focus:outline-none" 
              placeholder="ABC-" 
              maxLength={4}
              value={letters}
              onChange={(e) => setLetters(e.target.value)}
             />
          </div>
          <div className="flex-1 pl-4">
             <span className="text-[8px] font-black opacity-40 uppercase block mb-1">Numbers</span>
             <input 
              className="w-full bg-transparent text-center text-3xl font-black focus:outline-none" 
              placeholder="4567" 
              type="tel"
              maxLength={4}
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
             />
          </div>
        </div>

        <button 
          onClick={handleEntry}
          disabled={!letters || !numbers}
          className="w-full bg-primary text-black py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-3xl shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-20"
        >
          <span className="material-icons-round text-4xl">shortcut</span> Ingreso
        </button>
      </main>

      <footer className="p-4 flex flex-col items-center gap-1 opacity-20">
        <span className="text-[8px] font-black tracking-widest">Powered by Lab.IA</span>
        <span className="material-icons-round text-[10px] text-cyan-400">psychology</span>
      </footer>
    </div>
  );
};

export default VehicleEntry;
