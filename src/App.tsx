import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import NeedsDashboard from './pages/NeedsDashboard';
import NeedDetails from './pages/NeedDetails';
import CreateNeed from './pages/CreateNeed';
import Training from './pages/Training';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import MyOpps from './pages/MyOpps';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

// Create theme with professional disaster response color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f', // Deep Navy - Main header/navigation
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b35', // Bright Orange - Primary action buttons and CTAs
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa', // Warm Gray - Background and neutral areas
      paper: '#ffffff',
    },
    text: {
      primary: '#343a40', // Charcoal - Text and serious content
      secondary: '#6c757d', // Medium gray for secondary text
    },
    success: {
      main: '#2d5a3d', // Forest Green - Secondary actions and success states
    },
    warning: {
      main: '#ffc107', // Golden Yellow - Alerts and important information
    },
    error: {
      main: '#dc3545', // Standard red for errors
    },
    info: {
      main: '#26a69a', // Soft Teal - Statistics and progress indicators
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1e3a5f',
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#343a40',
      letterSpacing: '0.025em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6c757d',
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 8, // Professional rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          minHeight: 44,
          letterSpacing: '0.025em',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
          boxShadow: '0 4px 14px rgba(255, 107, 53, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e55a2b 0%, #d1491f 100%)',
            boxShadow: '0 10px 25px rgba(255, 107, 53, 0.35)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          background: '#ffffff',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontSize: '0.875rem',
            '& fieldset': {
              borderWidth: '1.5px',
              borderColor: '#dee2e6',
            },
            '&:hover fieldset': {
              borderColor: '#adb5bd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1e3a5f',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
          padding: '4px 12px',
          letterSpacing: '0.025em',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#1e3a5f',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/volunteer-dashboard" element={<ProtectedRoute userType="volunteer"><VolunteerDashboard /></ProtectedRoute>} />
                <Route path="/organization-dashboard" element={<ProtectedRoute userType="organization"><OrganizationDashboard /></ProtectedRoute>} />
                <Route path="/needs" element={<NeedsDashboard />} />
                <Route path="/needs/:id" element={<NeedDetails />} />
                <Route path="/create-need" element={<ProtectedRoute userType="organization"><CreateNeed /></ProtectedRoute>} />
                <Route path="/training" element={<Training />} />
                <Route path="/messages" element={<ProtectedRoute userType="any"><Messages /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute userType="any"><Profile /></ProtectedRoute>} />
                <Route path="/my-opportunities" element={<MyOpps />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
