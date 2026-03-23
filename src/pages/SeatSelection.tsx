import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { useAdmin } from '@/context/AdminContext';
import SeatMap from '@/components/SeatMap';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SeatSelection() {
  const { routeId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { selectedRoute, selectRoute, selectSeats } = useBooking();
  const { getRouteById } = useAdmin();
  const [localSeats, setLocalSeats] = useState<number[]>([]);

  const date = params.get('date') || '';
  const route = selectedRoute || getRouteById(routeId || '');

  useEffect(() => {
    if (!selectedRoute && route) selectRoute(route);
  }, [route, selectedRoute, selectRoute]);

  if (!route) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Route not found.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const toggleSeat = (seat: number) => {
    setLocalSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]);
  };



  const handleContinue = () => {
    selectSeats(localSeats);
    navigate(`/booking?date=${date}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Select Your Seats</h1>
          <p className="text-sm text-muted-foreground">{route.bus.busName} · {route.bus.busType}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <SeatMap
            totalSeats={route.bus.totalSeats}
            bookedSeats={route.bookedSeats}
            selectedSeats={localSeats}
            onSeatToggle={toggleSeat}
          />
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Booking Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {route.fromCity} → {route.toCity}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" /> {route.departureTime} – {route.arrivalTime} ({route.duration})
            </div>
            {date && (
              <p className="text-muted-foreground">
                {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            )}
            <hr className="border-border" />
            <div>
              <p className="font-medium text-card-foreground">
                Selected Seats: {localSeats.length > 0 ? localSeats.sort((a, b) => a - b).join(', ') : 'None'}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price per seat</span>
              <span className="font-medium">₹{route.price}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="font-semibold text-card-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{route.price * localSeats.length}</span>
            </div>
          </div>
          <Button onClick={handleContinue} disabled={localSeats.length === 0} className="mt-6 w-full" size="lg">
            Continue to Booking
          </Button>
        </div>
      </div>
    </div>
  );
}