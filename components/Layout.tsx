
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'trips', label: 'Viagens', icon: '✈️' },
    { id: 'sales', label: 'Vendas & Financeiro', icon: '💰' },
    { id: 'logistics', label: 'Logística', icon: '🚌' },
    { id: 'compliance', label: 'Conformidade', icon: '⚖️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">ViaGestão Pro</h1>
          <p className="text-xs text-slate-400 mt-1">Sistemas de Fretamento</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 text-sm text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">AD</div>
            <div>
              <p className="font-medium text-white">Admin</p>
              <p className="text-xs">Versão 2025.1.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex space-x-4">
             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
               <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
               Sistema Operacional
             </span>
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
