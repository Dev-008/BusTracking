import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes as RoutesList } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/context/BookingContext";
import { AdminProvider } from "@/context/AdminContext";
import { UserProvider } from "@/context/UserContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import SeatSelection from "./pages/SeatSelection";
import Booking from "./pages/Booking";
import Ticket from "./pages/Ticket";
import Dashboard from "./pages/Dashboard";
import ConductorVerify from "./pages/ConductorVerify";
import Login from "./pages/Login";
import Routes from "./pages/Routes";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminBuses from "./pages/admin/AdminBuses";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminBookings from "./pages/admin/AdminBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <AdminProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RoutesList>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/routes" element={<Routes />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/select-seats/:routeId" element={<SeatSelection />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/ticket/:bookingId" element={<Ticket />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/conductor" element={<ConductorVerify />} />
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<ProtectedRoute element={<AdminOverview />} requireAdmin />} />
                  <Route path="/admin/buses" element={<ProtectedRoute element={<AdminBuses />} requireAdmin />} />
                  <Route path="/admin/routes" element={<ProtectedRoute element={<AdminRoutes />} requireAdmin />} />
                  <Route path="/admin/bookings" element={<ProtectedRoute element={<AdminBookings />} requireAdmin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </RoutesList>
            </BrowserRouter>
          </BookingProvider>
        </AdminProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;