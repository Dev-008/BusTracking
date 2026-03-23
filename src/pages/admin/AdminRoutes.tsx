import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { cities } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminRoutes() {
  const { buses, routes, addRoute, updateRoute, deleteRoute } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    fromCity: '', toCity: '', departureTime: '06:00', arrivalTime: '10:00',
    duration: '4h 00m', price: '500', busId: '',
  });

  const resetForm = () => {
    setForm({ fromCity: '', toCity: '', departureTime: '06:00', arrivalTime: '10:00', duration: '4h 00m', price: '500', busId: buses[0]?.id || '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (r: typeof routes[0]) => {
    setForm({
      fromCity: r.fromCity, toCity: r.toCity, departureTime: r.departureTime,
      arrivalTime: r.arrivalTime, duration: r.duration, price: String(r.price), busId: r.busId,
    });
    setEditId(r.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fromCity || !form.toCity || !form.busId) return;
    const data = {
      fromCity: form.fromCity, toCity: form.toCity,
      departureTime: form.departureTime, arrivalTime: form.arrivalTime,
      duration: form.duration, price: Number(form.price), busId: form.busId,
      bookedSeats: [] as number[],
    };
    if (editId) {
      updateRoute(editId, data);
    } else {
      addRoute(data);
    }
    resetForm();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Routes</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Route
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-card-foreground">{editId ? 'Edit Route' : 'Add New Route'}</h2>
            <Button type="button" variant="ghost" size="icon" onClick={resetForm}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">From City *</label>
              <select value={form.fromCity} onChange={e => setForm(p => ({ ...p, fromCity: e.target.value }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select city</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">To City *</label>
              <select value={form.toCity} onChange={e => setForm(p => ({ ...p, toCity: e.target.value }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select city</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Bus *</label>
              <select value={form.busId} onChange={e => setForm(p => ({ ...p, busId: e.target.value }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select bus</option>
                {buses.map(b => <option key={b.id} value={b.id}>{b.busName} ({b.operator})</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Departure Time</label>
              <input type="time" value={form.departureTime} onChange={e => setForm(p => ({ ...p, departureTime: e.target.value }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Arrival Time</label>
              <input type="time" value={form.arrivalTime} onChange={e => setForm(p => ({ ...p, arrivalTime: e.target.value }))}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Duration</label>
              <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} maxLength={20}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 4h 00m" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Price (₹)</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} min="1" max="99999"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <Button type="submit" className="mt-4">{editId ? 'Update Route' : 'Add Route'}</Button>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Route</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Bus</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Time</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Duration</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Price</th>
              <th className="px-4 py-3 text-left font-medium text-secondary-foreground">Available</th>
              <th className="px-4 py-3 text-right font-medium text-secondary-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(r => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 font-medium text-card-foreground">{r.fromCity} → {r.toCity}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.bus.busName}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.departureTime} – {r.arrivalTime}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.duration}</td>
                <td className="px-4 py-3 font-medium">₹{r.price}</td>
                <td className="px-4 py-3">
                  <span className="text-xs text-success font-medium">{r.availableSeats} seats</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { if (window.confirm('Delete this route?')) deleteRoute(r.id); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}