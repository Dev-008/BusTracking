import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { isAdminUser } from '@/lib/adminConfig';
import { Button } from '@/components/ui/button';
import { Bus, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        // Register endpoint
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || 'Registration failed');
          return;
        }

        toast.success('Account created successfully! Please login');
        setFormData({ fullName: '', email: '', phoneNumber: '', password: '' });
        setIsRegister(false);
      } else {
        // Login endpoint
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || 'Login failed');
          return;
        }

        // Store user data using context
        setUser({
          userId: data.userId,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          isAdmin: isAdminUser(data.email)
        });

        toast.success(`Welcome back, ${data.fullName}!`);
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Connection error. Make sure the server is running on port 5000');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password && 
    (!isRegister || (formData.fullName && formData.password.length >= 6));

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Bus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-sm text-muted-foreground">{isRegister ? 'Sign up to start booking' : 'Login to your SmartBus account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
          {isRegister && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  maxLength={100}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="tel" 
                  name="phoneNumber"
                  placeholder="Phone Number" 
                  maxLength={15}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              maxLength={100}
              value={formData.email}
              onChange={handleInputChange}
              className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              maxLength={128}
              value={formData.password}
              onChange={handleInputChange}
              className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          {isRegister && formData.password && formData.password.length < 6 && (
            <p className="text-sm text-red-500">Password must be at least 6 characters</p>
          )}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (isRegister ? 'Creating Account...' : 'Logging in...') : (isRegister ? 'Sign Up' : 'Login')}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setFormData({ fullName: '', email: '', phoneNumber: '', password: '' });
            }} 
            className="font-medium text-primary hover:underline"
          >
            {isRegister ? 'Login' : 'Sign Up'}
          </button>
        </p>

        {!isRegister && (
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs text-muted-foreground dark:border-blue-900 dark:bg-blue-950">
            <p className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Admin Test Account:</p>
            <p className="mb-2">Login with these credentials to access admin dashboard:</p>
            <div className="space-y-1 rounded bg-white p-2 dark:bg-slate-900">
              <div><span className="font-medium">Email:</span> <code>admin@smartbus.com</code></div>
              <div><span className="font-medium">Password:</span> <code>admin@123</code></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}