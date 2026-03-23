import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Route, Booking, PassengerDetail, generateBookingId } from '@/data/mockData';

interface BookingContextType {
  selectedRoute: Route | null;
  selectedSeats: number[];
  bookings: Booking[];
  selectRoute: (route: Route) => void;
  selectSeats: (seats: number[]) => void;
  createBooking: (passengers: PassengerDetail[], travelDate: string) => Booking;
  verifyTicket: (bookingId: string) => boolean;
  cancelBooking: (bookingId: string) => void;
  removeBooking: (bookingId: string) => boolean;
  getBooking: (bookingId: string) => Booking | undefined;
  clearSelection: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('smartbus_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smartbus_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const selectRoute = (route: Route) => setSelectedRoute(route);
  const selectSeats = (seats: number[]) => setSelectedSeats(seats);
  const clearSelection = () => { setSelectedRoute(null); setSelectedSeats([]); };

  const createBooking = (passengers: PassengerDetail[], travelDate: string): Booking => {
    if (!selectedRoute) throw new Error('No route selected');
    const booking: Booking = {
      id: generateBookingId(),
      route: selectedRoute,
      seatNumbers: selectedSeats,
      passengerDetails: passengers,
      bookingDate: new Date().toISOString(),
      travelDate,
      paymentStatus: 'paid',
      ticketVerified: false,
      totalPrice: selectedRoute.price * selectedSeats.length,
    };
    setBookings(prev => [booking, ...prev]);
    clearSelection();
    return booking;
  };

  const verifyTicket = (bookingId: string): boolean => {
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return false;
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ticketVerified: true } : b));
    return true;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus: 'cancelled' as const } : b));
  };

  const removeBooking = (bookingId: string): boolean => {
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return false;
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    return true;
  };

  const getBooking = (bookingId: string) => bookings.find(b => b.id === bookingId);

  return (
    <BookingContext.Provider value={{
      selectedRoute, selectedSeats, bookings,
      selectRoute, selectSeats, createBooking,
      verifyTicket, cancelBooking, removeBooking, getBooking, clearSelection,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}