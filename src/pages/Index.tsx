import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';
import { cities } from '@/data/mockData';
import { ArrowRightLeft, MapPin, CalendarDays, Search, Bus, Shield, Ticket } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { getAvailableDates } = useAdmin();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // Auto-populate date when both cities are selected
  useEffect(() => {
    if (from && to && from !== to) {
      const availableDates = getAvailableDates(from, to);
      if (availableDates.length > 0) {
        // Set the earliest available date automatically
        setDate(availableDates[0]);
        setError('');
      }
    }
  }, [from, to, getAvailableDates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!from) {
      setError('Please select a departure city');
      return;
    }
    if (!to) {
      setError('Please select an arrival city');
      return;
    }
    if (!date) {
      setError('Please select a travel date');
      return;
    }
    if (from === to) {
      setError('Departure and arrival cities cannot be the same');
      return;
    }

    navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`);
  };

  const swapCities = () => { 
    setFrom(to); 
    setTo(from);
    setError('');
  };

  const today = new Date().toISOString().split('T')[0];
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-16 sm:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(350_83%_50%/0.15),transparent_70%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-background sm:text-5xl lg:text-6xl">
            Book Bus Tickets
            <br />
            <span className="text-primary">Hassle-Free</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-background/60">
            Search, compare, and book bus tickets across India. Instant QR code tickets with live seat selection.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch}
            className="mx-auto max-w-4xl rounded-2xl border border-background/10 bg-card p-6 shadow-2xl">
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-200">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-4 sm:items-end">
              {/* From City */}
              <div className="space-y-2 text-left sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground">From City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <select 
                    value={from} 
                    onChange={e => {
                      setFrom(e.target.value);
                      setError('');
                    }}
                    className="h-12 w-full rounded-lg border bg-background pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button 
                  type="button" 
                  onClick={swapCities}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Swap cities"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>
              </div>

              {/* To City */}
              <div className="space-y-2 text-left sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground">To City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <select 
                    value={to} 
                    onChange={e => {
                      setTo(e.target.value);
                      setError('');
                    }}
                    className="h-12 w-full rounded-lg border bg-background pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2 text-left sm:col-span-1">
                <label className="text-xs font-semibold text-muted-foreground">Travel Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => {
                      setDate(e.target.value);
                      setError('');
                    }}
                    min={today} 
                    className="h-12 w-full rounded-lg border bg-background pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                    placeholder="dd-mm-yyyy"
                  />
                </div>
                {date && (
                  <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <Search className="h-4 w-4" />
                Search Buses
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { icon: Bus, title: '1000+ Bus Partners', desc: 'Wide network of operators across all major routes in India.' },
            { icon: Ticket, title: 'Instant QR Tickets', desc: 'Get your digital ticket with QR code immediately after booking.' },
            { icon: Shield, title: 'Safe & Secure', desc: 'Verified operators and secure payments for worry-free travel.' },
          ].map(f => (
            <div key={f.title} className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Popular Routes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { from: 'Mumbai', to: 'Pune', price: 300 },
            { from: 'Delhi', to: 'Jaipur', price: 800 },
            { from: 'Bangalore', to: 'Chennai', price: 650 },
            { from: 'Hyderabad', to: 'Bangalore', price: 950 },
          ].map(r => (
            <button key={r.from + r.to} onClick={() => { setFrom(r.from); setTo(r.to); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center justify-between rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary/30">
              <div>
                <p className="font-medium text-card-foreground">{r.from} → {r.to}</p>
                <p className="text-xs text-muted-foreground">Starting from ₹{r.price}</p>
              </div>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}