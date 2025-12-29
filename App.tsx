
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SalesManager from './components/SalesManager';
import BusSeatMap from './components/BusSeatMap';
import { MOCK_TRIPS, MOCK_SALES } from './constants';
import { formatCurrency, formatDate } from './utils/dateUtils';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trips':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TRIPS.map(trip => (
              <div key={trip.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      trip.status === 'Ativo' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {trip.status}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{trip.name}</h3>
                  </div>
                  <button className="text-slate-400 hover:text-blue-600">Edit</button>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>📍 {trip.destination}</p>
                  <p>📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                  <p>🚌 Cap: {trip.busCapacity} passageiros</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Custo Operacional</p>
                    <p className="text-lg font-bold text-slate-800">{formatCurrency(trip.busCost + trip.hotelCost)}</p>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                    Gerenciar Itinerário
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'sales':
        return <SalesManager />;
      case 'logistics':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Mapa de Assentos: Búzios 2025</h3>
              <BusSeatMap capacity={44} occupiedSeats={[1, 2, 5, 6, 12, 13, 20]} />
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Rooming List (Hospedagem)</h3>
              <div className="space-y-4">
                {[101, 102, 103].map(room => (
                  <div key={room} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-slate-700">Quarto {room}</span>
                       <span className="text-xs bg-slate-100 px-2 py-1 rounded">Triplo</span>
                    </div>
                    <div className="space-y-2">
                       <div className="text-sm bg-blue-50 text-blue-700 p-2 rounded flex justify-between">
                         <span>João Silva</span>
                         <span className="text-xs">Responsável</span>
                       </div>
                       <div className="text-sm bg-blue-50 text-blue-700 p-2 rounded">
                         <span>Maria Silva</span>
                       </div>
                       <div className="text-sm border border-dashed border-slate-300 p-2 rounded text-slate-400 text-center">
                         Vaga Disponível
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Gerador de Manifesto ANTT</h3>
              <p className="text-slate-600 mb-6">Emita o arquivo XML/PDF para fiscalização conforme as normas vigentes (ANTT 2025).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all">
                  <h4 className="font-bold">Lista de Passageiros</h4>
                  <p className="text-xs text-slate-500">Documentos, poltronas e seguro individual.</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 cursor-pointer transition-all">
                  <h4 className="font-bold">MDF-e (Carga/Frete)</h4>
                  <p className="text-xs text-slate-500">Dados financeiros de transporte para receita federal.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl border-l-4 border-l-emerald-500 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Privacidade & LGPD</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-sm">
                  <input type="checkbox" checked readOnly className="mt-1" />
                  <div>
                    <p className="font-bold">Termos de Consentimento (Menores)</p>
                    <p className="text-slate-500">Termos digitais vinculados ao responsável legal para passageiros &lt; 12 anos.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <input type="checkbox" checked readOnly className="mt-1" />
                  <div>
                    <p className="font-bold">Mascaramento de Dados</p>
                    <p className="text-slate-500">Dados sensíveis (saúde) são ocultos para operadores sem privilégios de gerente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Em breve...</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
