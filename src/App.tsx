import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundPage from './components/errors/NotFoundPage';
import { AuthProvider } from '@/providers/AuthProvider';
import Register from '@/pages/auth/register/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
