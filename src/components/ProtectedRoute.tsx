import { Navigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ element, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoggedIn } = useUser();

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !user.isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="w-full max-w-md border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">Access Denied</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You don't have permission to access the admin dashboard.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="mt-6 w-full"
              variant="default"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{element}</>;
}
