import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundPage from './components/errors/NotFoundPage';
import Register from '@/pages/auth/register/Register';
import UserList from '@/pages/user/UserList';
import EmployeeList from '@/pages/employee/EmployeeList';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/employees" element={<EmployeeList />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default App;
