import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-3 border-b bg-card px-4">
            <SidebarTrigger />
            <Link to="/admin" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Bus className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">SmartBus Admin</span>
            </Link>
          </header>
          <main className="flex-1 overflow-auto bg-background p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}