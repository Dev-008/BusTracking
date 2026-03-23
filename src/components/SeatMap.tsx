import { User } from 'lucide-react';

interface SeatMapProps {
  totalSeats: number;
  bookedSeats: number[];
  selectedSeats: number[];
  onSeatToggle: (seat: number) => void;
}

export default function SeatMap({ totalSeats, bookedSeats, selectedSeats, onSeatToggle }: SeatMapProps) {
  const seatsPerRow = 4;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const getSeatClass = (seat: number) => {
    if (bookedSeats.includes(seat)) return 'seat-booked';
    if (selectedSeats.includes(seat)) return 'seat-selected';
    return 'seat-available';
  };

  const handleClick = (seat: number) => {
    if (!bookedSeats.includes(seat)) onSeatToggle(seat);
  };

  return (
    <div className="mx-auto max-w-xs">
      {/* Driver area */}
      <div className="mb-4 flex items-center justify-end rounded-t-xl border border-b-0 bg-secondary/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Driver</span>
        </div>
      </div>

      {/* Seat grid */}
      <div className="rounded-b-xl border bg-card p-4">
        <div className="space-y-2">
          {Array.from({ length: rows }, (_, rowIdx) => {
            const leftSeats = [rowIdx * seatsPerRow + 1, rowIdx * seatsPerRow + 2];
            const rightSeats = [rowIdx * seatsPerRow + 3, rowIdx * seatsPerRow + 4];
            return (
              <div key={rowIdx} className="flex items-center justify-center gap-6">
                <div className="flex gap-2">
                  {leftSeats.map(s => s <= totalSeats ? (
                    <button key={s} onClick={() => handleClick(s)}
                      className={`flex h-10 w-10 items-center justify-center rounded-sm border text-xs font-medium transition-colors ${getSeatClass(s)}`}>
                      {s}
                    </button>
                  ) : <div key={s} className="h-10 w-10" />)}
                </div>
                <div className="w-6" /> {/* Aisle */}
                <div className="flex gap-2">
                  {rightSeats.map(s => s <= totalSeats ? (
                    <button key={s} onClick={() => handleClick(s)}
                      className={`flex h-10 w-10 items-center justify-center rounded-sm border text-xs font-medium transition-colors ${getSeatClass(s)}`}>
                      {s}
                    </button>
                  ) : <div key={s} className="h-10 w-10" />)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm border border-success bg-success/20" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm bg-selected" />
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm bg-muted opacity-60" />
            <span className="text-muted-foreground">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}