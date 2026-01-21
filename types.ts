
export enum VehicleType {
  AUTO = 'AUTO',
  MOTO = 'MOTO',
  SUV = 'SUV',
  TRUCK = 'CAMIÓN',
  MONTHLY = 'MENSUAL',
}

export enum PaymentMethod {
  CASH = 'EFECTIVO',
  TRANSFER = 'TRANSFERENCIA',
}

export interface ParkingSpot {
  id: string;
  number: string;
  status: 'FREE' | 'OCCUPIED';
  vehicleId?: string;
  area: 'ALTA' | 'BAJA' | 'RAMPA';
}

export interface ActiveVehicle {
  id: string;
  plateLetters: string;
  plateNumbers: string;
  type: VehicleType;
  entryTime: string; // ISO String
  spotId: string;
  imageUrl?: string; // Hotlinking support
}

export interface Transaction {
  id: string;
  plate: string;
  type: VehicleType;
  entryTime: string;
  exitTime: string;
  amount: number;
  paymentMethod: PaymentMethod;
  imageUrl?: string; // Persist image in history
}

export interface DailyStats {
  totalRevenue: number;
  vehicleCounts: Record<VehicleType, number>;
  transactions: Transaction[];
  lostClients: number;
}
