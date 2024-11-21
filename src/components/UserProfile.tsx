import { LogOut, User, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg bg-popover shadow-lg ring-1 ring-black ring-opacity-5 mr-4">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || ''}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="font-medium text-popover-foreground">
              {user?.displayName || 'Utilisateur'}
            </div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>

      <div className="p-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground rounded-md hover:bg-accent"
          onClick={onClose}
        >
          <User className="h-4 w-4" />
          Votre Profil
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}