import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { SystemOwnerRegistration } from './components/auth/SystemOwnerRegistration';
import { ClientRegistration } from './components/auth/ClientRegistration';
import { CompanyUserRegistration } from './components/auth/CompanyUserRegistration';
import { HousekeeperRegistration } from './components/auth/HousekeeperRegistration';
import { LoginForm } from './components/auth/LoginForm';
import { checkSystemOwnerExists, getCurrentUser } from './lib/supabase';

type UserType = 'owner' | 'company' | 'user' | null;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [systemOwnerExists, setSystemOwnerExists] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    checkOwner();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    
    if (session) {
      const user = await getCurrentUser();
      setUserType(user?.type as UserType);
    }
    
    setLoading(false);
  };

  const checkOwner = async () => {
    try {
      const exists = await checkSystemOwnerExists();
      setSystemOwnerExists(exists);
    } catch (error) {
      console.error('Error checking system owner:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    if (!systemOwnerExists) {
      return <SystemOwnerRegistration />;
    }
    return <LoginForm />;
  }

  // Render appropriate screen based on user type
  switch (userType) {
    case 'owner':
      return <ClientRegistration />;
    case 'company':
      return <CompanyUserRegistration />;
    case 'user':
      return <HousekeeperRegistration />;
    default:
      return <div>Tipo de usuário não reconhecido</div>;
  }
}

export default App;