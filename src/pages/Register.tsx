import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    skills: '',
    organizationName: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-extract name from email for volunteer registration
    if (name === 'email' && tabValue === 0 && value) {
      const extractedName = extractNameFromEmail(value);
      if (extractedName && !formData.name) {
        setFormData(prev => ({
          ...prev,
          name: extractedName,
        }));
      }
    }
  };

  const extractNameFromEmail = (email: string): string => {
    // Extract the part before @ symbol
    const localPart = email.split('@')[0];
    
    // Handle common email patterns
    if (localPart.includes('.')) {
      // Convert "john.doe" to "John Doe"
      return localPart
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    } else if (localPart.includes('_')) {
      // Convert "john_doe" to "John Doe"
      return localPart
        .split('_')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    } else if (localPart.includes('-')) {
      // Convert "john-doe" to "John Doe"
      return localPart
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    } else {
      // Single word - capitalize first letter
      return localPart.charAt(0).toUpperCase() + localPart.slice(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (tabValue === 0) {
        // Volunteer registration
        const mockUser = {
          id: '1',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: formData.location,
          },
          skills: formData.skills.split(',').map(s => s.trim()),
          isAffiliated: false,
          trainingCompleted: false,
          badges: [],
          createdAt: new Date(),
        };
        login(mockUser, 'volunteer');
        navigate('/my-opportunities');
      } else {
        // Organization registration
        const mockOrg = {
          id: '1',
          name: formData.organizationName,
          description: formData.description,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: formData.location,
          },
          verified: false,
          createdAt: new Date(),
        };
        login(mockOrg, 'organization');
        navigate('/organization-dashboard');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {t('auth.register.title')}
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
          <Tab label={t('auth.register.volunteer')} />
          <Tab label={t('auth.register.organization')} />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {tabValue === 0 ? (
            // Volunteer Form
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label={t('auth.register.name')}
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label={t('auth.register.email')}
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label={t('auth.register.phone')}
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="location"
                label={t('auth.register.location')}
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="skills"
                label={t('auth.register.skills')}
                placeholder="First Aid, Search and Rescue, etc."
                value={formData.skills}
                onChange={handleChange}
                disabled={loading}
              />
            </>
          ) : (
            // Organization Form
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="organizationName"
                label={t('auth.register.organizationName')}
                value={formData.organizationName}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="description"
                label={t('auth.register.description')}
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contactEmail"
                label={t('auth.register.contactEmail')}
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="contactPhone"
                label={t('auth.register.contactPhone')}
                value={formData.contactPhone}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                name="location"
                label={t('auth.register.location')}
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
              />
            </>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('auth.register.password')}
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t('auth.register.confirmPassword')}
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('auth.register.submit')
            )}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ textDecoration: 'none' }}
            >
              {t('auth.register.alreadyAccount')} {t('auth.register.signIn')}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 