import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useBooking } from '@/context/BookingContext';
import BusCard from '@/components/BusCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Bus, MapPin, CalendarDays } from 'lucide-react';

export default function SearchResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { selectRoute } = useBooking();
  const { searchRoutes } = useAdmin();

  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const date = params.get('date') || '';
  const results = searchRoutes(from, to, date);

  const handleViewSeats = (route: typeof results[0]) => {
    selectRoute(route);
    navigate(`/select-seats/${route.id}?date=${date}`);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="font-semibold">{from}</span>
                  <span>→</span>
                  <span className="font-semibold">{to}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  {from} → {to}
                </h1>
                {date && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(date)}
                  </p>
                )}
              </div>
              <div className="rounded-lg bg-primary/10 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-primary">{results.length}</p>
                <p className="text-xs text-muted-foreground">
                  Bus{results.length !== 1 ? 'es' : ''} Available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-20 text-center">
              <Bus className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="mb-2 text-xl font-semibold text-foreground">No buses found</h2>
              <p className="mb-6 text-muted-foreground">
                Try searching for a different route or date.
              </p>
              <Button onClick={() => navigate('/')}>Back to Search</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((route, index) => (
              <div key={route.id} className="animate-in fade-in slide-in-from-top-2" style={{ animationDelay: `${index * 50}ms` }}>
                <BusCard route={route} onViewSeats={handleViewSeats} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}