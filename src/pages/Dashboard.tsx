import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Ticket, MapPin, CalendarDays, X } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBooking();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Ticket className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">No bookings yet</h2>
          <p className="mb-6 text-muted-foreground">Search and book your first bus ticket!</p>
          <Button onClick={() => navigate('/')}>Search Buses</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="rounded-lg border bg-card p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary">{b.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      b.paymentStatus === 'paid' ? 'bg-success/10 text-success' :
                      b.paymentStatus === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {b.paymentStatus === 'paid' ? (b.ticketVerified ? 'Verified' : 'Confirmed') : 'Cancelled'}
                    </span>
                  </div>
                  <p className="font-semibold text-card-foreground">{b.route.bus.busName}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.route.fromCity} → {b.route.toCity}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />
                      {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Seats: {b.seatNumbers.join(', ')} · ₹{b.totalPrice}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => navigate(`/ticket/${b.id}`)}>View Ticket</Button>
                  {b.paymentStatus === 'paid' && (
                    <Button size="sm" variant="outline" className="gap-1"
                      onClick={() => { if (window.confirm('Cancel this booking?')) cancelBooking(b.id); }}>
                      <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}