
import { BRAZILIAN_HOLIDAYS_2025 } from '../constants';

/**
 * Calculates the 5th business day of a given month/year.
 * Logic: Monday to Saturday are business days. Sundays and Holidays are not.
 */
export const calculateFifthBusinessDay = (month: number, year: number): Date => {
  let count = 0;
  let currentDay = new Date(year, month, 1);

  while (count < 5) {
    const dayOfWeek = currentDay.getDay(); // 0 is Sunday
    const dateStr = currentDay.toISOString().split('T')[0];
    const isHoliday = BRAZILIAN_HOLIDAYS_2025.includes(dateStr);
    const isSunday = dayOfWeek === 0;

    if (!isSunday && !isHoliday) {
      count++;
    }

    if (count < 5) {
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  return currentDay;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};
