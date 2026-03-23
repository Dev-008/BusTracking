import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { PassengerDetail } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, MapPin, Clock } from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { selectedRoute, selectedSeats, createBooking } = useBooking();
  const date = params.get('date') || new Date().toISOString().split('T')[0];

  const [passengers, setPassengers] = useState<PassengerDetail[]>(
    selectedSeats.map(() => ({ name: '', age: '', phone: '', email: '' }))
  );
  const [paying, setPaying] = useState(false);

  if (!selectedRoute || selectedSeats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">No booking in progress.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Search Buses</Button>
      </div>
    );
  }

  const updatePassenger = (idx: number, field: keyof PassengerDetail, value: string) => {
    setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const isValid = passengers.every(p => p.name.trim() && p.age && p.phone.trim());

  const handlePay = () => {
    if (!isValid) return;
    setPaying(true);
    setTimeout(() => {
      const booking = createBooking(passengers, date);
      navigate(`/ticket/${booking.id}`);
    }, 1500);
  };

  const total = selectedRoute.price * selectedSeats.length;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">Complete Your Booking</h1>
      </div>

      {/* Trip Info */}
      <div className="mb-6 rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="font-semibold text-card-foreground">{selectedRoute.bus.busName}</span>
          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{selectedRoute.fromCity} → {selectedRoute.toCity}</span>
          <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" />{selectedRoute.departureTime} – {selectedRoute.arrivalTime}</span>
          <span className="text-muted-foreground">Seats: {selectedSeats.sort((a, b) => a - b).join(', ')}</span>
        </div>
      </div>

      {/* Passenger Forms */}
      <div className="space-y-4">
        {passengers.map((p, idx) => (
          <div key={idx} className="rounded-lg border bg-card p-4 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-card-foreground">Passenger {idx + 1} — Seat {selectedSeats[idx]}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name *</label>
                <input value={p.name} onChange={e => updatePassenger(idx, 'name', e.target.value)}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter full name" maxLength={100} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Age *</label>
                <input value={p.age} onChange={e => updatePassenger(idx, 'age', e.target.value)} type="number" min="1" max="120"
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Age" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone *</label>
                <input value={p.phone} onChange={e => updatePassenger(idx, 'phone', e.target.value)} type="tel" maxLength={15}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Phone number" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                <input value={p.email} onChange={e => updatePassenger(idx, 'email', e.target.value)} type="email" maxLength={100}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Email (optional)" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="mt-6 rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Payment Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{selectedSeats.length} seat(s) × ₹{selectedRoute.price}</span>
            <span className="font-medium">₹{total}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-primary">₹{total}</span>
          </div>
        </div>
        <Button onClick={handlePay} disabled={!isValid || paying} size="lg" className="mt-6 w-full">
          {paying ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Processing...
            </span>
          ) : `Pay ₹${total}`}
        </Button>
      </div>
    </div>
  );
}