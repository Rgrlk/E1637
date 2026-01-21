
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActiveVehicle, Transaction, PaymentMethod, VehicleType } from '../types';
import { HOURLY_RATE } from '../constants';

interface PaymentProps {
  activeVehicles: ActiveVehicle[];
  onConfirm: (transaction: Transaction, spotId: string) => void;
  onMonthlyExit: (spotId: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ activeVehicles, onConfirm, onMonthlyExit }) => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<'options' | 'ticket'>('options');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const vehicle = useMemo(() => activeVehicles.find(v => v.spotId === spotId), [activeVehicles, spotId]);

  if (!vehicle) return <div className="p-8 text-center bg-black h-full flex flex-col justify-center">No Vehicle Found</div>;

  const entryDate = new Date(vehicle.entryTime);
  const diffMs = new Date().getTime() - entryDate.getTime();
  const diffHrs = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
  const amount = vehicle.type === VehicleType.MONTHLY ? 0 : diffHrs * HOURLY_RATE;

  const handleCobrar = () => {
    setStep('ticket');
  };

  const handleFinalConfirm = () => {
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      plate: `${vehicle.plateLetters}-${vehicle.plateNumbers}`,
      type: vehicle.type,
      entryTime: vehicle.entryTime,
      exitTime: new Date().toISOString(),
      amount,
      paymentMethod: PaymentMethod.CASH
    };
    onConfirm(transaction, spotId!);
    navigate('/');
  };

  const dateStr = dateTime.toLocaleDateString('es-PY', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).toUpperCase();
  const timeStr = dateTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit', hour12: false });

  if (step === 'ticket') {
    return (
      <div className="flex flex-col h-full bg-black text-white p-6 items-center">
         {/* Top Header similar to Map */}
         <div className="w-full flex justify-between items-center mb-6">
            <div className="flex gap-4"><button onClick={() => setStep('options')} className="text-primary"><span className="material-icons-round text-5xl">reply</span></button></div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1"><h1 className="text-xl font-black italic tracking-tighter">1637</h1></div>
            </div>
         </div>

         <div className="w-full space-y-2 mb-10">
            <div className="bg-primary text-black font-black py-1 px-4 rounded text-center text-sm">{dateStr}</div>
            <div className="flex gap-2">
              <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-lg tracking-widest">Hora:</div>
              <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-2xl font-mono">{timeStr}</div>
            </div>
         </div>

         <div className="bg-primary p-2 rounded-2xl w-full max-w-xs shadow-2xl mb-8">
            <div className="bg-black border-[3px] border-primary rounded-xl flex items-center justify-center py-10 gap-4">
               <span className="material-icons-round text-primary text-7xl">gate</span>
               <h2 className="text-6xl font-black text-primary italic">SALIDA</h2>
            </div>
         </div>

         <div className="bg-white p-6 rounded-lg w-full max-w-xs text-black flex flex-col items-center border-[8px] border-primary mb-12">
            <h3 className="text-7xl font-black mb-1 leading-none tracking-tighter">Gs.</h3>
            <div className="text-7xl font-black mb-4 tracking-tighter leading-none">{amount.toLocaleString('es-PY')}</div>
            <p className="text-[10px] font-bold opacity-60 uppercase mb-4 tracking-widest">Factura n° {Math.floor(Math.random() * 999999)}</p>
            <div className="w-32 h-32 bg-black/5 flex items-center justify-center border-2 border-black/10 rounded mb-4 overflow-hidden">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1637_STREET_${amount}`} alt="QR" className="w-full h-full object-cover p-2" />
            </div>
            <div className="text-center">
               <p className="text-sm font-black uppercase">Gracias</p>
               <p className="text-sm font-black uppercase">Vuelva Pronto</p>
            </div>
         </div>

         <button onClick={handleFinalConfirm} className="w-full bg-primary text-black py-4 rounded-xl font-black text-2xl active:scale-95 transition-all">TERMINAR PROCESO</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 items-center">
      <header className="w-full flex justify-between items-center mb-6">
        <div className="flex gap-4"><button onClick={() => navigate('/')} className="text-primary"><span className="material-icons-round text-5xl">reply</span></button></div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1"><h1 className="text-xl font-black italic tracking-tighter">1637</h1></div>
        </div>
      </header>

      <div className="w-full space-y-2 mb-10">
        <div className="bg-primary text-black font-black py-1 px-4 rounded text-center text-sm">{dateStr}</div>
        <div className="flex gap-2">
          <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-lg tracking-widest">Hora:</div>
          <div className="flex-1 bg-primary text-black font-black py-2 rounded text-center text-2xl font-mono">{timeStr}</div>
        </div>
      </div>

      <div className="bg-primary p-2 rounded-2xl w-full max-w-xs shadow-2xl mb-12">
        <div className="bg-black border-[3px] border-primary rounded-xl flex items-center justify-center py-10 gap-4">
          <span className="material-icons-round text-primary text-7xl">gate</span>
          <h2 className="text-6xl font-black text-primary italic">SALIDA</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
         <button onClick={() => { onMonthlyExit(spotId!); navigate('/'); }} className="bg-black border-[3px] border-primary rounded-2xl p-4 flex flex-col items-center justify-center gap-2 aspect-square group active:scale-95 transition-all">
            <h3 className="text-primary font-black text-xl uppercase leading-none">Sale</h3>
            <h3 className="text-primary font-black text-xl uppercase leading-none">Mensualero</h3>
            <span className="material-icons-round text-primary text-5xl">calendar_month</span>
            <span className="material-icons-round text-primary text-5xl">gate</span>
         </button>
         <button onClick={handleCobrar} className="bg-black border-[3px] border-primary rounded-2xl p-4 flex flex-col items-center justify-center gap-2 aspect-square group active:scale-95 transition-all">
            <h3 className="text-primary font-black text-4xl uppercase leading-none">COBRAR</h3>
            <span className="material-icons-round text-primary text-5xl">payments</span>
            <span className="material-icons-round text-primary text-5xl">gate</span>
         </button>
      </div>

      <footer className="mt-auto opacity-20 flex flex-col items-center gap-1">
        <span className="text-[10px] font-black tracking-widest">Powered by Lab.IA</span>
        <span className="material-icons-round text-[10px] text-cyan-400">psychology</span>
      </footer>
    </div>
  );
};

export default Payment;
