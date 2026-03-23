import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Printer, CheckCircle, MapPin, Clock, CalendarDays, User } from 'lucide-react';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function Ticket() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBooking } = useBooking();
  const ticketRef = useRef<HTMLDivElement>(null);

  const booking = getBooking(bookingId || '');

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Ticket not found.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const qrData = JSON.stringify({
    id: booking.id,
    passenger: booking.passengerDetails[0]?.name,
    bus: booking.route.bus.busName,
    route: `${booking.route.fromCity}-${booking.route.toCity}`,
    seats: booking.seatNumbers,
    date: booking.travelDate,
  });

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    if (ticketRef.current) {
      const element = ticketRef.current;
      const opt = {
        margin: 10,
        filename: `SmartBus-Ticket-${booking.id}.pdf`,
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Booking Confirmed!</h1>
        <p className="text-sm text-muted-foreground">Your ticket has been generated successfully</p>
      </div>

      <div ref={ticketRef} className="overflow-hidden rounded-xl border bg-card">
        {/* Header */}
        <div className="bg-foreground p-4 text-center">
          <p className="text-xs font-medium text-background/60">Booking ID</p>
          <p className="text-xl font-bold tracking-widest text-primary">{booking.id}</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center border-b py-6">
          <QRCodeSVG value={qrData} size={180} level="H"
            bgColor="transparent" fgColor="hsl(222, 47%, 11%)" />
        </div>

        {/* Details */}
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Bus</p>
              <p className="font-semibold text-card-foreground">{booking.route.bus.busName}</p>
              <p className="text-xs text-muted-foreground">{booking.route.bus.operator}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-medium text-card-foreground">{booking.route.bus.busType}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{booking.route.fromCity} → {booking.route.toCity}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.route.departureTime} – {booking.route.arrivalTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(booking.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-xs text-muted-foreground">Seats</p>
            <p className="font-semibold text-card-foreground">{booking.seatNumbers.join(', ')}</p>
          </div>

          <hr className="border-border" />

          {/* Passengers */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Passengers</p>
            {booking.passengerDetails.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-card-foreground">{p.name} (Age: {p.age}) — Seat {booking.seatNumbers[i]}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
            <span className="text-sm font-medium text-secondary-foreground">Total Paid</span>
            <span className="text-lg font-bold text-primary">₹{booking.totalPrice}</span>
          </div>

          {booking.ticketVerified && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">
              <CheckCircle className="h-4 w-4" /> Ticket Verified
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" /> Print
        </Button>
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownloadPDF}>
          <Download className="h-4 w-4" /> Download
        </Button>
      </div>
      <Button variant="ghost" className="mt-3 w-full" onClick={() => navigate('/dashboard')}>
        View All Bookings
      </Button>
    </div>
  );
}