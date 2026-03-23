import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bus, Route as BusRoute, buses as initialBuses, routes as initialRoutes, cities } from '@/data/mockData';

interface AdminContextType {
  buses: Bus[];
  routes: BusRoute[];
  addBus: (bus: Omit<Bus, 'id'>) => Bus;
  updateBus: (id: string, bus: Partial<Bus>) => void;
  deleteBus: (id: string) => void;
  addRoute: (route: Omit<BusRoute, 'id' | 'bus' | 'availableSeats'>) => BusRoute;
  updateRoute: (id: string, route: Partial<BusRoute>) => void;
  deleteRoute: (id: string) => void;
  searchRoutes: (from: string, to: string) => BusRoute[];
  getRouteById: (id: string) => BusRoute | undefined;
  getAvailableDates: (from: string, to: string, days?: number) => string[];
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [buses, setBuses] = useState<Bus[]>(() => {
    const saved = localStorage.getItem('smartbus_buses');
    // Validate that saved data has expected number of buses, otherwise reset
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === initialBuses.length) {
          return parsed;
        }
      } catch (e) {
        // JSON parse error, use initial data
      }
    }
    return initialBuses;
  });

  const [routes, setRoutes] = useState<BusRoute[]>(() => {
    const saved = localStorage.getItem('smartbus_routes');
    // Validate that saved data has expected number of routes, otherwise reset
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === initialRoutes.length) {
          return parsed;
        }
      } catch (e) {
        // JSON parse error, use initial data
      }
    }
    // Clear old cached data if it doesn't match the new structure
    localStorage.removeItem('smartbus_routes');
    localStorage.removeItem('smartbus_buses');
    return initialRoutes;
  });

  useEffect(() => { localStorage.setItem('smartbus_buses', JSON.stringify(buses)); }, [buses]);
  useEffect(() => { localStorage.setItem('smartbus_routes', JSON.stringify(routes)); }, [routes]);

  const addBus = (busData: Omit<Bus, 'id'>): Bus => {
    const bus: Bus = { ...busData, id: 'bus' + Date.now() };
    setBuses(prev => [...prev, bus]);
    return bus;
  };

  const updateBus = (id: string, data: Partial<Bus>) => {
    setBuses(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    // Also update bus reference in routes
    setRoutes(prev => prev.map(r => r.busId === id ? { ...r, bus: { ...r.bus, ...data } } : r));
  };

  const deleteBus = (id: string) => {
    setBuses(prev => prev.filter(b => b.id !== id));
    setRoutes(prev => prev.filter(r => r.busId !== id));
  };

  const addRoute = (routeData: Omit<BusRoute, 'id' | 'bus' | 'availableSeats'>): BusRoute => {
    const bus = buses.find(b => b.id === routeData.busId);
    if (!bus) throw new Error('Bus not found');
    const route: BusRoute = {
      ...routeData,
      id: 'r' + Date.now(),
      bus,
      availableSeats: bus.totalSeats - routeData.bookedSeats.length,
    };
    setRoutes(prev => [...prev, route]);
    return route;
  };

  const updateRoute = (id: string, data: Partial<BusRoute>) => {
    setRoutes(prev => prev.map(r => {
      if (r.id !== id) return r;
      const updated = { ...r, ...data };
      if (data.busId && data.busId !== r.busId) {
        const newBus = buses.find(b => b.id === data.busId);
        if (newBus) updated.bus = newBus;
      }
      return updated;
    }));
  };

  const deleteRoute = (id: string) => {
    setRoutes(prev => prev.filter(r => r.id !== id));
  };

  const searchRoutes = (from: string, to: string) =>
    routes.filter(r => r.fromCity.toLowerCase() === from.toLowerCase() && r.toCity.toLowerCase() === to.toLowerCase());

  const getRouteById = (id: string) => routes.find(r => r.id === id);

  const getAvailableDates = (from: string, to: string, days: number = 30): string[] => {
    // Check if buses are available for this route
    const availableRoutes = searchRoutes(from, to);
    
    if (availableRoutes.length === 0) {
      return [];
    }

    // Generate dates for the next 'days' days starting from tomorrow
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  };

  return (
    <AdminContext.Provider value={{
      buses, routes, addBus, updateBus, deleteBus,
      addRoute, updateRoute, deleteRoute, searchRoutes, getRouteById, getAvailableDates,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}