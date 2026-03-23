import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminBookings() {
  const { bookings, verifyTicket, cancelBooking } = useBooking();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">All Bookings</h1>

      {bookings.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Booking ID</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Passenger</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Route</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Bus</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Seats</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-secondary-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-3 font-mono font-medium text-primary">{b.id}</td>
                  <td className="px-4 py-3 text-card-foreground">{b.passengerDetails[0]?.name || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.route.fromCity} → {b.route.toCity}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.route.bus.busName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.seatNumbers.join(', ')}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3 font-medium">₹{b.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      b.paymentStatus === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      b.ticketVerified ? 'bg-success/10 text-success' :
                      'bg-selected/10 text-selected'
                    }`}>
                      {b.paymentStatus === 'cancelled' ? 'Cancelled' : b.ticketVerified ? 'Verified' : 'Confirmed'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      {b.paymentStatus === 'paid' && !b.ticketVerified && (
                        <Button variant="ghost" size="icon" title="Verify" onClick={() => verifyTicket(b.id)}>
                          <CheckCircle className="h-4 w-4 text-success" />
                        </Button>
                      )}
                      {b.paymentStatus === 'paid' && (
                        <Button variant="ghost" size="icon" title="Cancel" onClick={() => { if (window.confirm('Cancel this booking?')) cancelBooking(b.id); }}>
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}