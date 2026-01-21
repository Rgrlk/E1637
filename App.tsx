
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MapDashboard from './components/MapDashboard';
import VehicleEntry from './components/VehicleEntry';
import Payment from './components/Payment';
import Report from './components/Report';
import { ParkingSpot, ActiveVehicle, DailyStats, VehicleType, Transaction } from './types';
import { INITIAL_SPOTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'operator' | null>(null);
  const [spots, setSpots] = useState<ParkingSpot[]>(() => {
    const saved = localStorage.getItem('e1637_spots');
    return saved ? JSON.parse(saved) : INITIAL_SPOTS;
  });
  const [activeVehicles, setActiveVehicles] = useState<ActiveVehicle[]>(() => {
    const saved = localStorage.getItem('e1637_active');
    return saved ? JSON.parse(saved) : [];
  });
  const [dailyStats, setDailyStats] = useState<DailyStats>(() => {
    const saved = localStorage.getItem('e1637_stats');
    return saved ? JSON.parse(saved) : {
      totalRevenue: 0,
      vehicleCounts: { [VehicleType.AUTO]: 0, [VehicleType.MOTO]: 0, [VehicleType.SUV]: 0, [VehicleType.TRUCK]: 0, [VehicleType.MONTHLY]: 0 },
      transactions: [],
      lostClients: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('e1637_spots', JSON.stringify(spots));
    localStorage.setItem('e1637_active', JSON.stringify(activeVehicles));
    localStorage.setItem('e1637_stats', JSON.stringify(dailyStats));
  }, [spots, activeVehicles, dailyStats]);

  const handleLogin = (role: 'admin' | 'operator') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleEntry = (vehicle: ActiveVehicle) => {
    setActiveVehicles(prev => [...prev, vehicle]);
    setSpots(prev => prev.map(s => s.id === vehicle.spotId ? { ...s, status: 'OCCUPIED', vehicleId: vehicle.id } : s));
  };

  const handlePaymentConfirm = (transaction: Transaction, spotId: string) => {
    setDailyStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + transaction.amount,
      vehicleCounts: {
        ...prev.vehicleCounts,
        [transaction.type]: prev.vehicleCounts[transaction.type] + 1
      },
      transactions: [...prev.transactions, transaction]
    }));
    setSpots(prev => prev.map(s => s.id === spotId ? { ...s, status: 'FREE', vehicleId: undefined } : s));
    setActiveVehicles(prev => prev.filter(v => v.spotId !== spotId));
  };

  const handleMonthlyExit = (spotId: string) => {
    setSpots(prev => prev.map(s => s.id === spotId ? { ...s, status: 'FREE', vehicleId: undefined } : s));
    setActiveVehicles(prev => prev.filter(v => v.spotId !== spotId));
  };

  const handleClientLost = (spotId: string) => {
    setDailyStats(prev => ({
      ...prev,
      lostClients: prev.lostClients + 1
    }));
    setSpots(prev => prev.map(s => s.id === spotId ? { ...s, status: 'FREE', vehicleId: undefined } : s));
    setActiveVehicles(prev => prev.filter(v => v.spotId !== spotId));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-primary selection:text-black overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-md h-screen flex flex-col relative bg-black shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/" element={
                  <MapDashboard 
                    spots={spots} 
                    activeVehicles={activeVehicles} 
                    onSpotSelect={() => {}} 
                    onClientLost={handleClientLost}
                  />
                } />
                <Route path="/entry/:spotId" element={<VehicleEntry onEntry={handleEntry} />} />
                <Route path="/payment/:spotId" element={<Payment 
                  activeVehicles={activeVehicles} 
                  onConfirm={handlePaymentConfirm}
                  onMonthlyExit={handleMonthlyExit}
                />} />
                <Route path="/report" element={<Report stats={dailyStats} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
