
import React, { useState } from 'react';
import { MOCK_SALES, MOCK_TRIPS } from '../constants';
import { Sale, PaymentType } from '../types';
import { calculateFifthBusinessDay, formatCurrency, formatDate } from '../utils/dateUtils';

const SalesManager: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = sales.filter(s => 
    s.responsibleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecalculateVencimento = (saleId: string) => {
    // Logic for recalculating based on the 5th business day
    const now = new Date();
    const nextMonth = now.getMonth() + 1;
    const year = now.getFullYear();
    const fifthDay = calculateFifthBusinessDay(nextMonth, year);
    alert(`Novo vencimento padrão sugerido (5º dia útil): ${formatDate(fifthDay)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Vendas</h3>
          <p className="text-sm text-slate-500">Controle de recebíveis e fluxo de caixa</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar por cliente ou ID..."
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Nova Venda
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Cliente / ID</th>
              <th className="px-6 py-4">Viagem</th>
              <th className="px-6 py-4">Valor Total</th>
              <th className="px-6 py-4">Parcelas</th>
              <th className="px-6 py-4">Pagamento</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{sale.responsibleName}</div>
                  <div className="text-xs text-slate-400">ID: {sale.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {MOCK_TRIPS.find(t => t.id === sale.tripId)?.name || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(sale.totalValue)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm">{sale.installments}x</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sale.paymentType === PaymentType.PIX ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {sale.paymentType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sale.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 
                    sale.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {sale.status === 'PAID' ? 'Pago' : sale.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button 
                    onClick={() => handleRecalculateVencimento(sale.id)}
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    title="Calcular 5º dia útil"
                  >
                    📅
                  </button>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">✏️</button>
                  <button className="text-slate-400 hover:text-red-600 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredSales.length === 0 && (
        <div className="p-12 text-center text-slate-400">
          Nenhuma venda encontrada para os critérios de busca.
        </div>
      )}
    </div>
  );
};

export default SalesManager;
