import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useAnime } from '../hooks/useAnime';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, currentOrganization, userType } = useAuth();
  const { fadeInUp, staggerFadeIn } = useAnime();
  const [isEditing, setIsEditing] = React.useState(false);
  
  const user = currentUser || currentOrganization;
  
  const [editData, setEditData] = React.useState({
    name: user?.name || '',
    email: currentUser?.email || currentOrganization?.contactEmail || '',
    phone: currentUser?.phone || currentOrganization?.contactPhone || '',
    location: user?.location?.address || '',
  });

  React.useEffect(() => {
    fadeInUp('.profile-header', 200);
    staggerFadeIn('.profile-section', 150);
  }, [fadeInUp, staggerFadeIn]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: currentUser?.email || currentOrganization?.contactEmail || '',
      phone: currentUser?.phone || currentOrganization?.contactPhone || '',
      location: user?.location?.address || '',
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('profile.title')}
        </Typography>
        <Typography variant="body1">
          Please log in to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper 
        className="profile-header"
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          opacity: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'rgba(255,255,255,0.2)',
              fontSize: '2rem',
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {user.name || 'User'}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {userType === 'volunteer' ? 'Volunteer' : 'Organization'}
            </Typography>
            {userType === 'organization' && currentOrganization && (
              <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                {currentOrganization.description}
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>

      {/* Profile Details */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: { md: 2 } }}>
          <Card className="profile-section" sx={{ opacity: 0 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: { sm: '200px' } }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: { sm: '200px' } }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: { sm: '200px' } }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: { sm: '200px' } }}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={editData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
              </Box>

              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { md: 1 } }}>
          {/* Volunteer-specific information */}
          {userType === 'volunteer' && currentUser && (
            <Card className="profile-section" sx={{ opacity: 0 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Volunteer Status
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Training Status
                  </Typography>
                  <Chip
                    label={currentUser.trainingCompleted ? 'Completed' : 'Pending'}
                    color={currentUser.trainingCompleted ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentUser.skills?.map((skill: string, index: number) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    )) || (
                      <Typography variant="body2" color="text.secondary">
                        No skills listed
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Badges Earned
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentUser.badges?.length > 0 ? (
                      currentUser.badges.map((badge: string, index: number) => (
                        <Chip
                          key={index}
                          label={badge}
                          size="small"
                          color="primary"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No badges yet
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Organization-specific information */}
          {userType === 'organization' && currentOrganization && (
            <Card className="profile-section" sx={{ opacity: 0 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Organization Status
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Verification Status
                  </Typography>
                  <Chip
                    label={currentOrganization.verified ? 'Verified' : 'Pending Verification'}
                    color={currentOrganization.verified ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Member Since
                  </Typography>
                  <Typography variant="body1">
                    {currentOrganization.createdAt ? new Date(currentOrganization.createdAt).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile; 