
import React from 'react';

interface BusSeatMapProps {
  capacity: number;
  occupiedSeats: number[];
  onSelectSeat?: (num: number) => void;
}

const BusSeatMap: React.FC<BusSeatMapProps> = ({ capacity, occupiedSeats, onSelectSeat }) => {
  // Typical bus layout: 4 columns (2 left, aisle, 2 right)
  const rows = Math.ceil(capacity / 4);
  const seats = Array.from({ length: capacity }, (_, i) => i + 1);

  return (
    <div className="bg-slate-100 p-8 rounded-3xl border-4 border-slate-300 shadow-inner max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-12">
         <div className="w-12 h-12 bg-slate-400 rounded-lg flex items-center justify-center text-white font-bold">W</div>
         <div className="flex-1 border-t-2 border-slate-300 mx-4"></div>
         <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-white">Driver</div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Left Seats */}
            <Seat num={rowIndex * 4 + 1} isOccupied={occupiedSeats.includes(rowIndex * 4 + 1)} onSelect={onSelectSeat} />
            <Seat num={rowIndex * 4 + 2} isOccupied={occupiedSeats.includes(rowIndex * 4 + 2)} onSelect={onSelectSeat} />
            
            {/* Aisle */}
            <div className="w-8"></div>

            {/* Right Seats */}
            <Seat num={rowIndex * 4 + 3} isOccupied={occupiedSeats.includes(rowIndex * 4 + 3)} onSelect={onSelectSeat} />
            <Seat num={rowIndex * 4 + 4} isOccupied={occupiedSeats.includes(rowIndex * 4 + 4)} onSelect={onSelectSeat} />
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center space-x-4 text-xs font-medium">
        <div className="flex items-center"><span className="w-3 h-3 bg-white border border-slate-300 rounded mr-1"></span> Livre</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded mr-1"></span> Ocupado</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-emerald-400 rounded mr-1"></span> Selecionado</div>
      </div>
    </div>
  );
};

const Seat: React.FC<{ num: number; isOccupied: boolean; onSelect?: (n: number) => void }> = ({ num, isOccupied, onSelect }) => (
  <button
    disabled={isOccupied}
    onClick={() => onSelect?.(num)}
    className={`w-10 h-10 rounded-lg border-b-4 flex items-center justify-center text-xs font-bold transition-all ${
      isOccupied 
      ? 'bg-blue-500 border-blue-700 text-white cursor-not-allowed' 
      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
    }`}
  >
    {num}
  </button>
);

export default BusSeatMap;
