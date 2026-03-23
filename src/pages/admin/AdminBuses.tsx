import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Bus, getRoutesByBusId } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const busTypes: Bus['busType'][] = ['AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Non-AC Sleeper'];
const amenityOptions = ['WiFi', 'Charging', 'Blanket', 'Water', 'Snacks', 'TV'];

export default function AdminBuses() {
  const { buses, addBus, updateBus, deleteBus } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);
  const [form, setForm] = useState({ busName: '', operator: '', busType: 'AC Seater' as Bus['busType'], totalSeats: '40', amenities: [] as string[] });

  const resetForm = () => {
    setForm({ busName: '', operator: '', busType: 'AC Seater', totalSeats: '40', amenities: [] });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (bus: Bus) => {
    setForm({ busName: bus.busName, operator: bus.operator, busType: bus.busType, totalSeats: String(bus.totalSeats), amenities: bus.amenities });
    setEditId(bus.id);
    setShowForm(true);
  };

  const toggleAmenity = (a: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a) ? prev.amenities.filter(x => x !== a) : [...prev.amenities, a],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.busName.trim() || !form.operator.trim()) return;
    const data = { busName: form.busName.trim(), operator: form.operator.trim(), busType: form.busType, totalSeats: Number(form.totalSeats), amenities: form.amenities };
    if (editId) {
      updateBus(editId, data);
    } else {
      addBus(data);
    }
    resetForm();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Buses</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Bus
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-card-foreground">{editId ? 'Edit Bus' : 'Add New Bus'}</h2>
            <Button type="button" variant="ghost" size="icon" onClick={resetForm}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Bus Name *</label>
              <input value={form.busName} onChange={e => setForm(p => ({ ...p, busName: e.target.value }))} maxLength={100}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Royal Cruiser" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Operator *</label>
              <input value={form.operator} onChange={e => setForm(p => ({ ...p, operator: e.target.value }))} maxLength={100}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. VRL Travels" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Bus Type</label>
              <select value={form.busType} onChange={e => setForm(p => ({ ...p, busType: e.target.value as Bus['busType'] }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {busTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Total Seats</label>
              <input type="number" value={form.totalSeats} onChange={e => setForm(p => ({ ...p, totalSeats: e.target.value }))} min="10" max="60"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map(a => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    form.amenities.includes(a) ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'
                  }`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="mt-4">{editId ? 'Update Bus' : 'Add Bus'}</Button>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground"></th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Bus Name</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Operator</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Seats</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Routes</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Amenities</th>
              <th className="px-4 py-3 text-right font-medium text-secondary-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(bus => {
              const busRoutes = getRoutesByBusId(bus.id);
              const uniqueDestinations = new Set<string>();
              busRoutes.forEach(route => {
                uniqueDestinations.add(`${route.fromCity} → ${route.toCity}`);
              });
              const isExpanded = expandedBusId === bus.id;
              
              return (
                <tr key={bus.id} className="border-t">
                  <td className="px-4 py-3">
                    {busRoutes.length > 0 && (
                      <button
                        onClick={() => setExpandedBusId(isExpanded ? null : bus.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-card-foreground">{bus.busName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{bus.operator}</td>
                  <td className="px-4 py-3"><span className="rounded-sm bg-secondary px-2 py-0.5 text-xs">{bus.busType}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{bus.totalSeats}</td>
                  <td className="px-4 py-3">
                    {busRoutes.length > 0 ? (
                      <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {busRoutes.length} route{busRoutes.length !== 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No routes</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{bus.amenities.join(', ')}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(bus)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (window.confirm(`Delete ${bus.busName}?`)) deleteBus(bus.id); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Expanded Routes Details */}
      {expandedBusId && (
        <div className="mt-4 rounded-lg border bg-card p-4">
          <div className="mb-4 space-y-2">
            <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
              <MapPin className="h-4 w-4" />
              Routes for {buses.find(b => b.id === expandedBusId)?.busName}
            </h3>
            {(() => {
              const busRoutes = getRoutesByBusId(expandedBusId);
              return (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {busRoutes.map(route => (
                    <div key={route.id} className="flex items-center gap-2 rounded bg-secondary/50 p-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="font-medium">{route.fromCity}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{route.toCity}</span>
                      <span className="ml-auto text-muted-foreground">({route.departureTime})</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}