import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Keys } from './pages/Keys';
import { Suppliers } from './pages/Suppliers';
import { Alerts } from './pages/Alerts';
import { Profile } from './pages/Profile';
import { CardProfile } from './pages/CardProfile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider, useAuth } from './lib/auth';
import './lib/firebase';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002DB3]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/card" element={<CardProfile />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="keys" element={<Keys />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}