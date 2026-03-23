import { useAdmin } from '@/context/AdminContext';
import { useBooking } from '@/context/BookingContext';
import { Bus, MapPinned, Ticket, IndianRupee, TrendingUp, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminOverview() {
  const { buses, routes } = useAdmin();
  const { bookings, removeBooking } = useBooking();

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((s, b) => s + b.totalPrice, 0);
  const verifiedCount = bookings.filter(b => b.ticketVerified).length;
  const cancelledCount = bookings.filter(b => b.paymentStatus === 'cancelled').length;

  const handleRemoveBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to remove this booking?')) {
      removeBooking(bookingId);
    }
  };

  const stats = [
    { label: 'Total Buses', value: buses.length, icon: Bus, color: 'text-primary' },
    { label: 'Active Routes', value: routes.length, icon: MapPinned, color: 'text-selected' },
    { label: 'Total Bookings', value: bookings.length, icon: Ticket, color: 'text-success' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-primary' },
    { label: 'Verified Tickets', value: verifiedCount, icon: TrendingUp, color: 'text-success' },
    { label: 'Cancelled', value: cancelledCount, icon: Users, color: 'text-destructive' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold text-card-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <h2 className="mb-4 mt-8 text-lg font-semibold text-foreground">Recent Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-sm text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Booking ID</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Route</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Seats</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-3 font-mono font-medium text-primary">{b.id}</td>
                  <td className="px-4 py-3 text-card-foreground">{b.route.fromCity} → {b.route.toCity}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.seatNumbers.join(', ')}</td>
                  <td className="px-4 py-3 font-medium">₹{b.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      b.paymentStatus === 'paid' ? 'bg-success/10 text-success' :
                      b.paymentStatus === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {b.ticketVerified ? 'Verified' : b.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBooking(b.id)}
                      className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
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