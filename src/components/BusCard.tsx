import { Route } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Wifi, BatteryCharging, Droplets, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface BusCardProps {
  route: Route;
  onViewSeats: (route: Route) => void;
}

const amenityIcon: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-3.5 w-3.5" />,
  Charging: <BatteryCharging className="h-3.5 w-3.5" />,
  Water: <Droplets className="h-3.5 w-3.5" />,
};

export default function BusCard({ route, onViewSeats }: BusCardProps) {
  const [showRoutes, setShowRoutes] = useState(false);
  const destinations = route.bus.routeDestinations || [];
  
  return (
    <div className="group rounded-lg border bg-card p-4 transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Time & Route */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-card-foreground">{route.bus.busName}</h3>
            <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {route.bus.busType}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{route.bus.operator}</p>
          
          {/* Routes/Destinations Section */}
          {destinations.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowRoutes(!showRoutes)}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <MapPin className="h-3 w-3" />
                {destinations.length} route{destinations.length !== 1 ? 's' : ''} served
                {showRoutes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              
              {showRoutes && (
                <div className="mt-2 space-y-1 rounded bg-muted/50 p-2">
                  {destinations.map((dest, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span className="font-medium">{dest.from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{dest.to}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{route.departureTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-px w-8 bg-border" />
              <span className="text-xs text-muted-foreground">{route.duration}</span>
              <div className="h-px w-8 bg-border" />
            </div>
            <span className="font-medium">{route.arrivalTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {route.fromCity} → {route.toCity}
          </div>
        </div>

        {/* Center: Amenities */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <div className="flex gap-2">
            {route.bus.amenities.map(a => (
              <span key={a} className="text-muted-foreground" title={a}>
                {amenityIcon[a] || <Star className="h-3.5 w-3.5" />}
              </span>
            ))}
          </div>
          <span className="text-xs text-success font-medium">{route.availableSeats} seats available</span>
        </div>

        {/* Right: Price & CTA */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">₹{route.price}</p>
            <p className="text-xs text-muted-foreground">per seat</p>
          </div>
          <Button onClick={() => onViewSeats(route)} className="whitespace-nowrap">
            View Seats
          </Button>
        </div>
      </div>
    </div>
  );
}