import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  VolunteerActivism as VolunteerIcon,
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

interface Need {
  id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'inProgress' | 'completed' | 'cancelled';
  requiredSkills: string[];
  volunteersNeeded: number;
  volunteersAssigned: number;
  startDate: string;
  endDate?: string;
  category: string;
  organizationLogo?: string;
}

const NeedDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [need, setNeed] = useState<Need | null>(null);
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    message: '',
  });

  // Dummy data for needs (same as in NeedsDashboard)
  const dummyNeeds: Need[] = [
    {
      id: '1',
      title: 'Emergency Medical Support - Hurricane Recovery',
      description: 'Critical need for licensed medical professionals to provide emergency care and trauma support in areas devastated by Hurricane Maria. We need doctors, nurses, EMTs, and mental health professionals to work in mobile clinics and temporary medical facilities.',
      organization: 'Red Cross Emergency Response',
      location: 'Houston, TX - Multiple locations across affected areas',
      urgency: 'critical',
      status: 'open',
      requiredSkills: ['Medical License', 'Emergency Medicine', 'Trauma Care', 'CPR Certification', 'Disaster Response', 'Spanish Language Skills'],
      volunteersNeeded: 15,
      volunteersAssigned: 8,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      category: 'Medical',
      organizationLogo: '🏥',
    },
    {
      id: '2',
      title: 'Food Distribution & Supply Chain Management',
      description: 'Help coordinate and execute large-scale food distribution operations to serve over 10,000 affected families. This involves managing inventory, coordinating with local food banks, organizing volunteer teams, and ensuring proper food safety protocols.',
      organization: 'Food Bank of America',
      location: 'Miami, FL - Central Distribution Hub',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['Logistics Management', 'Inventory Control', 'Physical Labor', 'Team Leadership', 'Food Safety', 'Bilingual (English/Spanish)'],
      volunteersNeeded: 25,
      volunteersAssigned: 12,
      startDate: '2024-01-20',
      category: 'Food',
      organizationLogo: '🍽️',
    },
    {
      id: '3',
      title: 'Temporary Shelter Construction & Repair',
      description: 'Assist in building and repairing temporary shelters for displaced families. This includes constructing modular housing units, repairing damaged homes, and ensuring all structures meet safety standards.',
      organization: 'Habitat for Humanity',
      location: 'New Orleans, LA - Multiple construction sites',
      urgency: 'high',
      status: 'inProgress',
      requiredSkills: ['Construction Experience', 'Carpentry Skills', 'Power Tool Operation', 'Safety Protocols', 'Team Collaboration', 'Blueprint Reading'],
      volunteersNeeded: 20,
      volunteersAssigned: 18,
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      category: 'Construction',
      organizationLogo: '🏗️',
    },
    {
      id: '4',
      title: 'Mental Health Crisis Intervention & Support',
      description: 'Provide critical mental health support and crisis intervention to disaster survivors experiencing trauma, grief, and post-traumatic stress. Licensed therapists, counselors, and social workers needed.',
      organization: 'Mental Health First Aid International',
      location: 'Los Angeles, CA - Community Centers & Mobile Units',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Licensed Therapist', 'Trauma-Informed Care', 'Crisis Intervention', 'Grief Counseling', 'Cultural Competency', 'Active Listening'],
      volunteersNeeded: 10,
      volunteersAssigned: 3,
      startDate: '2024-01-25',
      category: 'Mental Health',
      organizationLogo: '🧠',
    },
    {
      id: '5',
      title: 'Water Infrastructure & Purification Systems',
      description: 'Install, maintain, and operate water purification systems in communities where water infrastructure has been compromised. Technical background in engineering, water systems, or environmental science required.',
      organization: 'Water.org - Emergency Response Division',
      location: 'San Antonio, TX - Multiple rural communities',
      urgency: 'critical',
      status: 'open',
      requiredSkills: ['Civil/Environmental Engineering', 'Water Treatment Systems', 'Quality Control', 'Technical Documentation', 'Training & Education', 'Field Work Experience'],
      volunteersNeeded: 8,
      volunteersAssigned: 2,
      startDate: '2024-01-18',
      category: 'Infrastructure',
      organizationLogo: '💧',
    },
    {
      id: '6',
      title: 'Child Care & Family Support Services',
      description: 'Provide safe, nurturing child care for families affected by disaster while parents access essential services or return to work. Background check required.',
      organization: 'Child Care Relief Network',
      location: 'Atlanta, GA - Community Centers',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Child Development', 'First Aid & CPR', 'Trauma-Informed Care', 'Patience & Empathy', 'Activity Planning', 'Background Check Required'],
      volunteersNeeded: 12,
      volunteersAssigned: 7,
      startDate: '2024-01-22',
      category: 'Child Care',
      organizationLogo: '👶',
    },
    {
      id: '7',
      title: 'Transportation & Logistics Coordination',
      description: 'Coordinate transportation networks for supplies, volunteers, and affected families. Experience with logistics, transportation management, or supply chain operations required.',
      organization: 'Transport Relief Network',
      location: 'Phoenix, AZ - Central Logistics Hub',
      urgency: 'high',
      status: 'inProgress',
      requiredSkills: ['Logistics Management', 'Fleet Operations', 'Route Planning', 'Supply Chain Coordination', 'Communication Skills', 'Problem Solving'],
      volunteersNeeded: 15,
      volunteersAssigned: 14,
      startDate: '2024-01-12',
      category: 'Logistics',
      organizationLogo: '🚚',
    },
    {
      id: '8',
      title: 'Educational Support & Temporary Schooling',
      description: 'Help establish and operate temporary educational programs for children displaced by disaster. Teaching experience preferred but not required.',
      organization: 'Education Without Borders',
      location: 'Denver, CO - Multiple community locations',
      urgency: 'low',
      status: 'open',
      requiredSkills: ['Teaching Experience', 'Child Development', 'Trauma-Informed Education', 'Curriculum Development', 'Patience & Creativity', 'Cultural Sensitivity'],
      volunteersNeeded: 18,
      volunteersAssigned: 5,
      startDate: '2024-02-01',
      category: 'Education',
      organizationLogo: '📚',
    },
    {
      id: '9',
      title: 'Communication & Technology Infrastructure',
      description: 'Set up and maintain communication systems, internet connectivity, and technology infrastructure for disaster response operations. IT or telecommunications experience required.',
      organization: 'Tech for Good Foundation',
      location: 'Seattle, WA - Emergency Operations Center',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['IT Infrastructure', 'Network Administration', 'Satellite Communications', 'Technical Support', 'Problem Solving', 'Emergency Systems'],
      volunteersNeeded: 6,
      volunteersAssigned: 1,
      startDate: '2024-01-15',
      category: 'Technology',
      organizationLogo: '📡',
    },
    {
      id: '10',
      title: 'Animal Rescue & Veterinary Care',
      description: 'Provide emergency veterinary care and rescue services for animals affected by disaster. Veterinary experience or animal handling skills required.',
      organization: 'Animal Disaster Response Team',
      location: 'Portland, OR - Multiple rescue locations',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Veterinary Experience', 'Animal Handling', 'Emergency Care', 'Shelter Management', 'Compassion', 'Physical Stamina'],
      volunteersNeeded: 8,
      volunteersAssigned: 4,
      startDate: '2024-01-20',
      category: 'Animal Care',
      organizationLogo: '🐾',
    },
    {
      id: '11',
      title: 'Elderly Care & Senior Support Services',
      description: 'Provide specialized care and support for elderly disaster survivors, including medical assistance, emotional support, and help with daily activities.',
      organization: 'Senior Care Relief Network',
      location: 'Chicago, IL - Senior Centers & Homes',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Geriatric Care', 'Medical Assistance', 'Patience & Compassion', 'Communication Skills', 'Physical Support', 'Emergency Response'],
      volunteersNeeded: 10,
      volunteersAssigned: 6,
      startDate: '2024-01-25',
      category: 'Senior Care',
      organizationLogo: '👴',
    },
    {
      id: '12',
      title: 'Environmental Cleanup & Hazardous Waste Management',
      description: 'Assist in environmental cleanup operations, including hazardous waste removal, debris management, and environmental restoration. Safety training provided.',
      organization: 'Environmental Response Team',
      location: 'New York, NY - Multiple cleanup sites',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['Environmental Safety', 'Hazardous Materials', 'Physical Fitness', 'Safety Protocols', 'Equipment Operation', 'Team Coordination'],
      volunteersNeeded: 14,
      volunteersAssigned: 9,
      startDate: '2024-01-18',
      category: 'Environmental',
      organizationLogo: '🌱',
    },
  ];

  useEffect(() => {
    if (id) {
      const foundNeed = dummyNeeds.find(n => n.id === id);
      setNeed(foundNeed || null);
    }
  }, [id]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '#d32f2f';
      case 'high': return '#f57c00';
      case 'medium': return '#fbc02d';
      case 'low': return '#388e3c';
      default: return '#757575';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#1976d2';
      case 'inProgress': return '#f57c00';
      case 'completed': return '#388e3c';
      case 'cancelled': return '#d32f2f';
      default: return '#757575';
    }
  };

  const handleVolunteerClick = () => {
    setVolunteerDialogOpen(true);
  };

  const handleVolunteerSubmit = () => {
    console.log('Volunteer application submitted:', volunteerForm);
    setVolunteerDialogOpen(false);
    setVolunteerForm({
      name: '',
      email: '',
      phone: '',
      experience: '',
      availability: '',
      message: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setVolunteerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!need) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Need Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            The need you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/needs')}
            sx={{ bgcolor: '#ff6b35' }}
          >
            Back to Needs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/needs')}
        sx={{ mb: 3 }}
      >
        Back to Needs
      </Button>

      {/* Need Details */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: '#1e3a5f',
                mr: 3,
                fontSize: '2rem',
              }}
            >
              {need.organizationLogo}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {need.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                {need.organization}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={t(`needs.urgency.${need.urgency}`)}
                  size="small"
                  sx={{
                    bgcolor: getUrgencyColor(need.urgency),
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={t(`needs.status.${need.status}`)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: getStatusColor(need.status),
                    color: getStatusColor(need.status),
                  }}
                />
                <Chip
                  label={need.category}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
            {need.description}
          </Typography>

          {/* Key Information Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3, 
            mb: 4 
          }}>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Location & Schedule
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Location" secondary={need.location} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ScheduleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Start Date" 
                    secondary={new Date(need.startDate).toLocaleDateString()} 
                  />
                </ListItem>
                {need.endDate && (
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="End Date" 
                      secondary={new Date(need.endDate).toLocaleDateString()} 
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
            <Paper sx={{ p: 3, bgcolor: '#f8fafc' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Volunteer Status
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Volunteers Needed" 
                    secondary={`${need.volunteersNeeded} total`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Volunteers Assigned" 
                    secondary={`${need.volunteersAssigned} assigned`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Still Needed" 
                    secondary={`${need.volunteersNeeded - need.volunteersAssigned} more volunteers`} 
                  />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Required Skills */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Required Skills & Qualifications
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {need.requiredSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<VolunteerIcon />}
              onClick={handleVolunteerClick}
              disabled={need.status !== 'open'}
              sx={{
                bgcolor: need.status === 'open' ? '#ff6b35' : '#ccc',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: need.status === 'open' ? '#e55a2b' : '#ccc',
                },
              }}
            >
              {need.status === 'open' ? 'Volunteer Now' : t(`needs.status.${need.status}`)}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Volunteer Application Dialog */}
      <Dialog 
        open={volunteerDialogOpen} 
        onClose={() => setVolunteerDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VolunteerIcon sx={{ color: '#ff6b35' }} />
            <Typography variant="h6">
              Volunteer Application - {need.title}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Please provide your information to apply for this volunteer opportunity. The organization will review your application and contact you within 24-48 hours.
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
            gap: 2 
          }}>
            <TextField
              fullWidth
              label="Full Name"
              value={volunteerForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={volunteerForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={volunteerForm.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={volunteerForm.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                label="Availability"
              >
                <MenuItem value="immediate">Immediate (Next 24 hours)</MenuItem>
                <MenuItem value="week">Within a week</MenuItem>
                <MenuItem value="month">Within a month</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Relevant Experience"
              multiline
              rows={3}
              value={volunteerForm.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="Please describe your relevant experience, skills, and qualifications..."
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            <TextField
              fullWidth
              label="Additional Message"
              multiline
              rows={3}
              value={volunteerForm.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Any additional information you'd like to share..."
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setVolunteerDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleVolunteerSubmit}
            variant="contained"
            sx={{ bgcolor: '#ff6b35' }}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NeedDetails;
