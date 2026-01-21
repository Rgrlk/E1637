
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (role: 'admin' | 'operator') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'admin' | 'operator' | null>(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (role) {
      onLogin(role);
      navigate('/');
    }
  };

  const dateStr = dateTime.toLocaleDateString('es-PY', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).toUpperCase();
  const timeStr = dateTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 items-center">
      {/* Top Info Blocks */}
      <div className="w-full space-y-4 mb-10">
        <div className="bg-primary text-black font-black py-2 px-4 rounded text-center text-lg shadow-lg shadow-primary/20">
          {dateStr}
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-primary text-black font-black py-3 px-4 rounded text-center text-2xl">
            Hora:
          </div>
          <div className="flex-1 bg-primary text-black font-black py-3 px-4 rounded text-center text-3xl font-mono">
            {timeStr}
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Iniciar Sesión</h2>

      <div className="w-full max-w-xs space-y-4 mb-12">
        <button 
          onClick={() => setRole('admin')}
          className={`w-full py-4 px-6 rounded-lg font-black flex items-center justify-center gap-3 transition-all ${role === 'admin' ? 'bg-primary text-black scale-105 shadow-xl shadow-primary/30' : 'bg-primary/80 text-black opacity-60'}`}
        >
          <span className="material-icons-round">person</span> ADMINISTRADOR
        </button>
        <button 
          onClick={() => setRole('operator')}
          className={`w-full py-4 px-6 rounded-lg font-black flex items-center justify-center gap-3 transition-all ${role === 'operator' ? 'bg-primary text-black scale-105 shadow-xl shadow-primary/30' : 'bg-primary/80 text-black opacity-60'}`}
        >
          <span className="material-icons-round">directions_car</span> OPERADOR
        </button>
        
        <button 
          onClick={handleNext}
          disabled={!role}
          className="w-full bg-primary text-black py-4 px-6 rounded-lg font-black flex items-center justify-center gap-2 text-2xl mt-8 disabled:opacity-20"
        >
          <span className="material-icons-round text-3xl">shortcut</span> Siguiente
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-red-600">
             <div className="flex gap-0.5 scale-50">
                <div className="w-4 h-8 bg-black rounded-full"></div>
                <div className="flex flex-col gap-0.5 justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
             </div>
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-black italic tracking-tighter leading-none">1637</h1>
            <p className="text-[6px] font-bold opacity-40 uppercase tracking-widest">Mercado 4 Asunción - Paraguay</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center opacity-30">
          <span className="text-[8px] font-black tracking-widest">Powered by Lab.IA</span>
          <span className="material-icons-round text-cyan-400 text-sm">psychology</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
