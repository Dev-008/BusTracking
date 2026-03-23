import { Link, useLocation } from 'react-router-dom';
import { Bus, LayoutDashboard, ScanLine, Menu, X, Shield, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/routes', label: 'Routes & Places', icon: MapPin },
    { to: '/dashboard', label: 'My Bookings', icon: LayoutDashboard },
    { to: '/conductor', label: 'Verify Ticket', icon: ScanLine },
    ...(user?.isAdmin ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    // Refresh the page after logout
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">SmartBus</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to}>
              <Button variant={isActive(l.to) ? 'secondary' : 'ghost'} size="sm" className="gap-2">
                {l.icon && <l.icon className="h-4 w-4" />}
                {l.label}
              </Button>
            </Link>
          ))}
          {user ? (
            <div className="ml-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.fullName}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(l.to) ? 'secondary' : 'ghost'} className="w-full justify-start gap-2">
                  {l.icon && <l.icon className="h-4 w-4" />}
                  {l.label}
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t pt-2">
                  <p className="px-2 py-2 text-sm font-medium text-foreground">{user.fullName}</p>
                  <p className="px-2 text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}