import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
  description: string;
  requirements: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  duration: string;
  maxVolunteers: number;
  currentVolunteers: number;
  category: string;
}

const MyOpps: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const myOpportunities: Opportunity[] = [
    {
      id: 'op1',
      title: 'First Aid Event Support',
      organization: 'City Medical Corps',
      location: 'San Francisco, CA',
      date: '2024-07-10',
      time: '8:00 AM - 4:00 PM',
      status: 'Upcoming',
      description: 'Provide first aid support at a local community marathon. Volunteers will be stationed at various checkpoints along the route to provide immediate medical assistance to runners and spectators.',
      requirements: ['First Aid Certification', 'CPR Training', 'Comfortable standing for long periods'],
      contactPerson: 'Dr. Sarah Johnson',
      contactEmail: 'sarah.johnson@citymedical.org',
      contactPhone: '(415) 555-0123',
      duration: '8 hours',
      maxVolunteers: 25,
      currentVolunteers: 18,
      category: 'Medical Support'
    },
    {
      id: 'op2',
      title: 'Urban Search and Rescue Drill',
      organization: 'State Disaster Response',
      location: 'Oakland, CA',
      date: '2024-07-15',
      time: '7:00 AM - 6:00 PM',
      status: 'Upcoming',
      description: 'Participate in a full-day search and rescue training exercise in a simulated urban environment. This is a comprehensive drill that will test emergency response capabilities.',
      requirements: ['Search and Rescue Training', 'Physical fitness', 'Safety equipment provided'],
      contactPerson: 'Captain Mike Rodriguez',
      contactEmail: 'mike.rodriguez@stateresponse.gov',
      contactPhone: '(510) 555-0456',
      duration: '11 hours',
      maxVolunteers: 40,
      currentVolunteers: 35,
      category: 'Emergency Response'
    },
    {
      id: 'op3',
      title: 'CPR Awareness Campaign',
      organization: 'Community Health Org',
      location: 'Berkeley, CA',
      date: '2024-07-20',
      time: '10:00 AM - 3:00 PM',
      status: 'Upcoming',
      description: 'Help demonstrate and teach hands-only CPR to the public at a community fair. This event aims to increase public awareness and preparedness.',
      requirements: ['CPR Instructor Certification', 'Teaching experience preferred'],
      contactPerson: 'Lisa Chen',
      contactEmail: 'lisa.chen@communityhealth.org',
      contactPhone: '(510) 555-0789',
      duration: '5 hours',
      maxVolunteers: 15,
      currentVolunteers: 12,
      category: 'Education'
    },
    {
      id: 'op4',
      title: 'Emergency Shelter Setup',
      organization: 'Red Cross Bay Area',
      location: 'San Jose, CA',
      date: '2024-07-12',
      time: '9:00 AM - 5:00 PM',
      status: 'In Progress',
      description: 'Assist in setting up emergency shelters and providing support to displaced families. This is an ongoing response to recent flooding in the area.',
      requirements: ['Shelter Management Training', 'Compassionate communication', 'Physical stamina'],
      contactPerson: 'David Thompson',
      contactEmail: 'david.thompson@redcross.org',
      contactPhone: '(408) 555-0321',
      duration: '8 hours',
      maxVolunteers: 30,
      currentVolunteers: 28,
      category: 'Disaster Relief'
    },
    {
      id: 'op5',
      title: 'Medical Supply Distribution',
      organization: 'Healthcare Without Borders',
      location: 'Fresno, CA',
      date: '2024-07-08',
      time: '8:00 AM - 2:00 PM',
      status: 'Completed',
      description: 'Successfully distributed medical supplies to rural communities. Organized inventory and coordinated delivery to multiple locations.',
      requirements: ['Inventory management experience', 'Valid driver\'s license', 'Physical ability to lift boxes'],
      contactPerson: 'Maria Garcia',
      contactEmail: 'maria.garcia@healthcarewb.org',
      contactPhone: '(559) 555-0654',
      duration: '6 hours',
      maxVolunteers: 20,
      currentVolunteers: 20,
      category: 'Medical Support'
    },
    {
      id: 'op6',
      title: 'Emergency Communications Training',
      organization: 'Amateur Radio Emergency Service',
      location: 'Sacramento, CA',
      date: '2024-07-25',
      time: '9:00 AM - 4:00 PM',
      status: 'Upcoming',
      description: 'Learn emergency communication protocols and radio operation for disaster response scenarios. This training is essential for maintaining communications during emergencies.',
      requirements: ['Basic radio knowledge helpful', 'Willingness to learn', 'No prior experience required'],
      contactPerson: 'Robert Wilson',
      contactEmail: 'robert.wilson@ares-sacramento.org',
      contactPhone: '(916) 555-0987',
      duration: '7 hours',
      maxVolunteers: 35,
      currentVolunteers: 22,
      category: 'Communications'
    }
  ];

  const handleViewDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenDialog(true);
  };

  const handleMarkComplete = (opportunityId: string) => {
    setAlertMessage(`Opportunity "${myOpportunities.find(op => op.id === opportunityId)?.title}" marked as completed!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleContactOrganization = (opportunity: Opportunity) => {
    // Create a new contact for this opportunity
    const newContactData = {
      id: `opp-${opportunity.id}`,
      name: opportunity.contactPerson,
      organization: opportunity.organization,
      avatar: opportunity.contactPerson.split(' ').map(n => n[0]).join('').substring(0, 2),
      status: 'online' as const,
      lastMessage: `New conversation about: ${opportunity.title}`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [] // Start with empty messages array
    };

    // Store in localStorage for Messages page to access
    localStorage.setItem('newConversation', JSON.stringify(newContactData));
    
    // Navigate to Messages page
    navigate('/messages');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'primary';
      case 'In Progress': return 'warning';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical Support': return 'error';
      case 'Emergency Response': return 'warning';
      case 'Education': return 'info';
      case 'Disaster Relief': return 'secondary';
      case 'Communications': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Opportunities
      </Typography>
      
      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, 
        gap: 3 
      }}>
        {myOpportunities.map((op) => (
          <Card key={op.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>
                  {op.title}
                </Typography>
                <Chip 
                  label={op.status} 
                  color={getStatusColor(op.status) as any} 
                  size="small" 
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {op.organization}
              </Typography>
              
              <Chip 
                label={op.category} 
                color={getCategoryColor(op.category) as any} 
                size="small" 
                sx={{ mb: 2 }} 
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {op.location}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScheduleIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {op.date} • {op.time}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {op.currentVolunteers}/{op.maxVolunteers} volunteers
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3 }}>
                {op.description.length > 120 
                  ? `${op.description.substring(0, 120)}...` 
                  : op.description
                }
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewDetails(op)}
                >
                  View Details
                </Button>
                
                {op.status === 'Upcoming' && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EmailIcon />}
                      onClick={() => handleContactOrganization(op)}
                    >
                      Contact
                    </Button>
                  </>
                )}
                
                {op.status === 'In Progress' && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleMarkComplete(op.id)}
                  >
                    Mark Complete
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOpportunity && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedOpportunity.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedOpportunity.organization}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Chip 
                  label={selectedOpportunity.status} 
                  color={getStatusColor(selectedOpportunity.status) as any} 
                  sx={{ mr: 1 }} 
                />
                <Chip 
                  label={selectedOpportunity.category} 
                  color={getCategoryColor(selectedOpportunity.category) as any} 
                />
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedOpportunity.description}
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>Event Details</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedOpportunity.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {selectedOpportunity.date} • {selectedOpportunity.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <GroupIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Duration: {selectedOpportunity.duration}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Volunteers: {selectedOpportunity.currentVolunteers}/{selectedOpportunity.maxVolunteers}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Contact:</strong> {selectedOpportunity.contactPerson}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedOpportunity.contactEmail}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedOpportunity.contactPhone}</Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Requirements</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedOpportunity.requirements.map((req, index) => (
                    <Chip key={index} label={req} variant="outlined" size="small" />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              {selectedOpportunity.status === 'Upcoming' && (
                <Button 
                  variant="contained" 
                  startIcon={<EmailIcon />}
                  onClick={() => {
                    handleContactOrganization(selectedOpportunity);
                    setOpenDialog(false);
                  }}
                >
                  Contact Organization
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default MyOpps; 