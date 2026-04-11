import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionsProvider } from './contexts/SessionsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ErrorBoundary from './components/layout/ErrorBoundary';
import ErrorService from './utils/ErrorService';
import LanguageSwitcher from './components/ui/LanguageSwitcher';
import { dashboardRoutes } from './components/constants/dashboardRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from './components/constants';

// --- Lazy Loading Core Layouts & Pages ---
const AuthLayout = lazy(() => import('./pages/AuthLayout/AuthLayout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Centralized Loading Fallback UI
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create a client with global error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        ErrorService.handleError(error);
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return true;
    //!!localStorage.getItem("token") || !!sessionStorage.getItem("token");
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language.split('-')[0];
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [i18n.language]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <SessionsProvider>
              <Router>
                {!isAuthenticated && <LanguageSwitcher />}
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/dashboard" replace />}>
                      <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                      <Route path="/register" element={<Register onRegisterSuccess={handleLogin} />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/verify-account" element={<VerifyAccount onVerifySuccess={handleLogin} />} />
                    </Route>
                    <Route
                      path="/dashboard"
                      element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
                    >
                      <Route index element={null} />
                      {dashboardRoutes.flatMap(route => {
                        if (route.subItems) {
                          return route.subItems.map(subItem => (
                            <Route key={subItem.id} path={subItem.path} element={subItem.element} />
                          ));
                        }
                        return route.element ? [<Route key={route.id} path={route.path} element={route.element} />] : [];
                      })}
                    </Route>

                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
                </Suspense>
              </Router>
            </SessionsProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
