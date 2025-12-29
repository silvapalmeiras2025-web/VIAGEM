
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/dateUtils';
import { MOCK_TRIPS, MOCK_SALES } from '../constants';

const Dashboard: React.FC = () => {
  // Simple summary calculations
  const totalTrips = MOCK_TRIPS.length;
  const activeSales = MOCK_SALES.length;
  
  const financialData = MOCK_TRIPS.map(trip => {
    const tripSales = MOCK_SALES.filter(s => s.tripId === trip.id);
    const revenue = tripSales.reduce((sum, s) => sum + s.totalValue, 0);
    const costs = trip.busCost + trip.hotelCost + trip.otherExpenses;
    return {
      name: trip.name,
      receita: revenue,
      custos: costs,
      lucro: revenue - costs
    };
  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const stats = [
    { label: 'Lucro Previsto Total', value: formatCurrency(financialData.reduce((acc, d) => acc + d.lucro, 0)), color: 'text-emerald-600', icon: '📈' },
    { label: 'Receita Total', value: formatCurrency(financialData.reduce((acc, d) => acc + d.receita, 0)), color: 'text-blue-600', icon: '💰' },
    { label: 'Vagas Ocupadas', value: '78%', color: 'text-amber-600', icon: '🚌' },
    { label: 'Inadimplência', value: '4.2%', color: 'text-red-600', icon: '⚠️' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Saúde Financeira por Viagem</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="receita" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Receita" />
                <Bar dataKey="custos" fill="#ef4444" radius={[4, 4, 0, 0]} name="Custos" />
                <Bar dataKey="lucro" fill="#10b981" radius={[4, 4, 0, 0]} name="Lucro" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Distribuição de Recebíveis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pagos', value: 65 },
                    { name: 'Pendentes', value: 25 },
                    { name: 'Atrasados', value: 10 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Pagos</span>
              <span className="font-semibold">65%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>Pendentes</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center"><span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>Atrasados</span>
              <span className="font-semibold">10%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Alerts Section (ANTT Compliance focus) */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
        <h4 className="text-blue-800 font-bold flex items-center mb-2">
          <span className="mr-2">🚨</span> Alertas de Conformidade ANTT 2025
        </h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-center">• Viagem "Búzios 2025" possui 3 passageiros sem RG cadastrado (Manifesto Incompleto).</li>
          <li className="flex items-center">• Lembrete: MDF-e deve conter os novos campos de parcelas de frete a partir de Outubro.</li>
          <li className="flex items-center">• Apólice de Seguro de Responsabilidade Civil expira em 15 dias.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
