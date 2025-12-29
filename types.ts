
export enum PaymentType {
  PIX = 'PIX',
  CASH = 'Dinheiro',
  CREDIT_CARD = 'Cartão de Crédito'
}

export enum TripStatus {
  PLANNING = 'Planejamento',
  ACTIVE = 'Ativo',
  COMPLETED = 'Finalizado',
  CANCELLED = 'Cancelado'
}

export interface Passenger {
  id: string;
  name: string;
  document: string; // RG or CPF
  isLapChild: boolean;
  seatNumber?: number;
  roomNumber?: string;
  age?: number;
}

export interface Sale {
  id: string;
  tripId: string;
  responsibleName: string;
  responsiblePhone: string;
  totalValue: number;
  installments: number;
  paymentType: PaymentType;
  passengers: Passenger[];
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  busCapacity: number;
  busCost: number;
  hotelCost: number;
  otherExpenses: number;
  itinerary: string;
  departureLocation: string;
}

export interface FinancialMetric {
  totalRevenue: number;
  totalCosts: number;
  projectedProfit: number;
  receivedAmount: number;
  pendingAmount: number;
}
