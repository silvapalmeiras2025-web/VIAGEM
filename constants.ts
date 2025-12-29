
import { Trip, TripStatus, PaymentType, Sale } from './types';

export const BRAZILIAN_HOLIDAYS_2025 = [
  '2025-01-01', // Confraternização Universal
  '2025-03-03', // Carnaval
  '2025-03-04', // Carnaval
  '2025-04-18', // Sexta-feira Santa
  '2025-04-21', // Tiradentes
  '2025-05-01', // Dia do Trabalho
  '2025-06-19', // Corpus Christi
  '2025-09-07', // Independência do Brasil
  '2025-10-12', // Nossa Senhora Aparecida
  '2025-11-02', // Finados
  '2025-11-15', // Proclamação da República
  '2025-11-20', // Dia da Consciência Negra
  '2025-12-25', // Natal
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    name: 'Reveillon Búzios 2025',
    destination: 'Armação dos Búzios, RJ',
    startDate: '2024-12-28',
    endDate: '2025-01-02',
    status: TripStatus.ACTIVE,
    busCapacity: 44,
    busCost: 5500,
    hotelCost: 12000,
    otherExpenses: 850,
    itinerary: 'Saída às 22h da Praça da Sé. Parada em Casimiro de Abreu.',
    departureLocation: 'Praça da Sé, São Paulo'
  },
  {
    id: '2',
    name: 'Carnaval Salvador 2025',
    destination: 'Salvador, BA',
    startDate: '2025-02-27',
    endDate: '2025-03-05',
    status: TripStatus.PLANNING,
    busCapacity: 50,
    busCost: 8500,
    hotelCost: 25000,
    otherExpenses: 2500,
    itinerary: 'Roteiro completo pelos circuitos Dodô e Osmar.',
    departureLocation: 'Terminal Barra Funda'
  }
];

export const MOCK_SALES: Sale[] = [
  {
    id: 's1',
    tripId: '1',
    responsibleName: 'João Silva',
    responsiblePhone: '11988887777',
    totalValue: 1200,
    installments: 3,
    paymentType: PaymentType.PIX,
    date: '2024-10-15',
    status: 'PAID',
    passengers: [
      { id: 'p1', name: 'João Silva', document: '12.345.678-9', isLapChild: false, seatNumber: 5, roomNumber: '101' },
      { id: 'p2', name: 'Maria Silva', document: '98.765.432-1', isLapChild: false, seatNumber: 6, roomNumber: '101' }
    ]
  }
];
