import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { SessionsProvider } from './contexts/SessionsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LanguageSwitcher from './components/ui/LanguageSwitcher';

// Import all dashboard sub-pages
import UsersPage from './pages/Users';
import StudentsPage from './pages/Students';
import TeachersPage from './pages/Teachers';
import ParentsPage from './pages/Parents';
import SessionsPage from './pages/Sessions';
import AgendaPage from './pages/Agenda';
import ExamsPage from './pages/Exams';
import AssignmentsPage from './pages/Assignments';
import SubscriptionRequestsPage from './pages/SubscriptionRequests';
import AllSubscriptionsPage from './pages/AllSubscriptions';
import PlansPage from './pages/Plans';
import CurrenciesPage from './pages/Currencies';
import ExpensesPage from './pages/Expenses';
import TransactionsPage from './pages/Transactions';
import TeacherRequestsPage from './pages/TeacherRequests';
import TeacherAvailabilityPage from './pages/TeacherAvailability';
import SubjectsPage from './pages/Subjects';
import LMSCoursesPage from './pages/LMSCourses';
import SettingsPage from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <SettingsProvider>
      <LanguageProvider>
        <SessionsProvider>
          <Router>
            {!isAuthenticated && <LanguageSwitcher />}
            <Routes>
              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? (
                    <Login onLoginSuccess={handleLogin} />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                } 
              />
              <Route 
                path="/register" 
                element={
                  !isAuthenticated ? (
                    <Register onRegisterSuccess={handleLogin} />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                } 
              />
              
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
              >
                <Route index element={null} /> {/* This will be handled inside Dashboard for now, or we can move DashboardHome here */}
                <Route path="admins" element={<UsersPage />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="parents" element={<ParentsPage />} />
                <Route path="sessions" element={<SessionsPage />} />
                <Route path="agenda" element={<AgendaPage />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="assignments" element={<AssignmentsPage />} />
                <Route path="subscription-requests" element={<SubscriptionRequestsPage />} />
                <Route path="all-subscriptions" element={<AllSubscriptionsPage />} />
                <Route path="plans" element={<PlansPage />} />
                <Route path="currencies" element={<CurrenciesPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="teacher-requests" element={<TeacherRequestsPage />} />
                <Route path="teacher-availability" element={<TeacherAvailabilityPage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="lms-courses" element={<LMSCoursesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </SessionsProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}

export default App;

