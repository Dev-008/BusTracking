import { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { ScanLine, CheckCircle, XCircle, Search, MapPin, CalendarDays, User } from 'lucide-react';
import { Booking } from '@/data/mockData';

export default function ConductorVerify() {
  const { getBooking, verifyTicket } = useBooking();
  const [bookingId, setBookingId] = useState('');
  const [result, setResult] = useState<{ found: boolean; booking?: Booking } | null>(null);

  const handleSearch = () => {
    const id = bookingId.trim().toUpperCase();
    if (!id) return;
    const booking = getBooking(id);
    setResult(booking ? { found: true, booking } : { found: false });
  };

  const handleVerify = () => {
    if (result?.booking) {
      verifyTicket(result.booking.id);
      setResult({ found: true, booking: { ...result.booking, ticketVerified: true } });
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ScanLine className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Ticket Verification</h1>
        <p className="text-sm text-muted-foreground">Enter booking ID or scan QR code to verify</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <input value={bookingId} onChange={e => setBookingId(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Enter Booking ID (e.g. SB4X7K2M)"
          maxLength={20}
          className="h-12 flex-1 rounded-lg border bg-card px-4 font-mono text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-ring" />
        <Button onClick={handleSearch} size="lg" className="gap-2">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>

      {/* Result */}
      {result && !result.found && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <XCircle className="h-6 w-6 text-destructive" />
          <div>
            <p className="font-semibold text-foreground">Booking Not Found</p>
            <p className="text-sm text-muted-foreground">No booking exists with this ID. Please check and try again.</p>
          </div>
        </div>
      )}

      {result?.booking && (
        <div className="mt-6 rounded-xl border bg-card">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-primary">{result.booking.id}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                result.booking.ticketVerified
                  ? 'bg-success/10 text-success'
                  : result.booking.paymentStatus === 'paid'
                  ? 'bg-selected/10 text-selected'
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {result.booking.ticketVerified ? '✓ Verified' :
                 result.booking.paymentStatus === 'paid' ? 'Pending Verification' : 'Cancelled'}
              </span>
            </div>
          </div>

          <div className="space-y-3 p-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Bus</p>
                <p className="font-semibold text-card-foreground">{result.booking.route.bus.busName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="font-medium text-card-foreground">{result.booking.route.bus.busType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{result.booking.route.fromCity} → {result.booking.route.toCity}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(result.booking.travelDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Seats</p>
              <p className="font-semibold">{result.booking.seatNumbers.join(', ')}</p>
            </div>

            <hr className="border-border" />

            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Passengers</p>
              {result.booking.passengerDetails.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{p.name} — Seat {result.booking!.seatNumbers[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {!result.booking.ticketVerified && result.booking.paymentStatus === 'paid' && (
            <div className="border-t p-4">
              <Button onClick={handleVerify} variant="success" size="lg" className="w-full gap-2">
                <CheckCircle className="h-5 w-5" /> Verify Ticket
              </Button>
            </div>
          )}

          {result.booking.ticketVerified && (
            <div className="border-t p-4">
              <div className="flex items-center justify-center gap-2 rounded-lg bg-success/10 p-4 text-lg font-bold text-success">
                <CheckCircle className="h-6 w-6" /> Ticket Verified
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}