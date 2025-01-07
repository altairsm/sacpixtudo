import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

type AuthScreen = 'login' | 'register' | 'forgot-password';

interface Props {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  onForgotPassword: (email: string) => void;
}

export function AuthManager({ onLogin, onRegister, onForgotPassword }: Props) {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');

  const handleLogin = (email: string, password: string) => {
    onLogin(email, password);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    onRegister(name, email, password);
  };

  const handleForgotPassword = (email: string) => {
    onForgotPassword(email);
  };

  switch (currentScreen) {
    case 'register':
      return (
        <RegisterForm
          onRegister={handleRegister}
          onBack={() => setCurrentScreen('login')}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPasswordForm
          onSubmit={handleForgotPassword}
          onBack={() => setCurrentScreen('login')}
        />
      );
    default:
      return (
        <LoginForm
          onLogin={handleLogin}
          onRegister={() => setCurrentScreen('register')}
          onForgotPassword={() => setCurrentScreen('forgot-password')}
        />
      );
  }
}