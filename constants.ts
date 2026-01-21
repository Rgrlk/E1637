
import { ParkingSpot, VehicleType } from './types';

export const HOURLY_RATE = 5000;

export const INITIAL_SPOTS: ParkingSpot[] = [
  // AREA ALTA (1-9 + E5)
  { id: '1', number: '1', status: 'FREE', area: 'ALTA' },
  { id: '2', number: '2', status: 'FREE', area: 'ALTA' },
  { id: '3', number: '3', status: 'FREE', area: 'ALTA' },
  { id: '4', number: '4', status: 'FREE', area: 'ALTA' },
  { id: '5', number: '5', status: 'FREE', area: 'ALTA' },
  { id: '6', number: '6', status: 'FREE', area: 'ALTA' },
  { id: '7', number: '7', status: 'FREE', area: 'ALTA' },
  { id: '8', number: '8', status: 'FREE', area: 'ALTA' },
  { id: '9', number: '9', status: 'FREE', area: 'ALTA' },
  { id: 'E5', number: 'E5', status: 'FREE', area: 'ALTA' },

  // RAMPA (10-13, M1-M4, E4, E3)
  { id: '10', number: '10', status: 'FREE', area: 'RAMPA' },
  { id: '11', number: '11', status: 'FREE', area: 'RAMPA' },
  { id: 'M1', number: 'M1', status: 'FREE', area: 'RAMPA' },
  { id: 'M2', number: 'M2', status: 'FREE', area: 'RAMPA' },
  { id: '12', number: '12', status: 'FREE', area: 'RAMPA' },
  { id: '13', number: '13', status: 'FREE', area: 'RAMPA' },
  { id: 'M3', number: 'M3', status: 'FREE', area: 'RAMPA' },
  { id: 'M4', number: 'M4', status: 'FREE', area: 'RAMPA' },
  { id: 'E4', number: 'E4', status: 'FREE', area: 'RAMPA' },
  { id: 'E3', number: 'E3', status: 'FREE', area: 'RAMPA' },

  // AREA BJA (14-29, E1, E2)
  { id: '14', number: '14', status: 'FREE', area: 'BAJA' },
  { id: '15', number: '15', status: 'FREE', area: 'BAJA' },
  { id: '16', number: '16', status: 'FREE', area: 'BAJA' },
  { id: '17', number: '17', status: 'FREE', area: 'BAJA' },
  { id: '18', number: '18', status: 'FREE', area: 'BAJA' },
  { id: '19', number: '19', status: 'FREE', area: 'BAJA' },
  { id: '20', number: '20', status: 'FREE', area: 'BAJA' },
  { id: '21', number: '21', status: 'FREE', area: 'BAJA' },
  { id: '22', number: '22', status: 'FREE', area: 'BAJA' },
  { id: '23', number: '23', status: 'FREE', area: 'BAJA' },
  { id: '24', number: '24', status: 'FREE', area: 'BAJA' },
  { id: '25', number: '25', status: 'FREE', area: 'BAJA' },
  { id: '26', number: '26', status: 'FREE', area: 'BAJA' },
  { id: '27', number: '27', status: 'FREE', area: 'BAJA' },
  { id: '28', number: '28', status: 'FREE', area: 'BAJA' },
  { id: '29', number: '29', status: 'FREE', area: 'BAJA' },
  { id: 'E1', number: 'E1', status: 'FREE', area: 'BAJA' },
  { id: 'E2', number: 'E2', status: 'FREE', area: 'BAJA' },
];

export const VEHICLE_CONFIG = [
  { type: VehicleType.AUTO, icon: 'directions_car', label: 'AUTO' },
  { type: VehicleType.MOTO, icon: 'two_wheeler', label: 'MOTO' },
  { type: VehicleType.SUV, icon: 'minor_crash', label: 'SUV' },
  { type: VehicleType.TRUCK, icon: 'local_shipping', label: 'CAMIÓN' },
  { type: VehicleType.MONTHLY, icon: 'calendar_today', label: 'MENSUAL' },
];
