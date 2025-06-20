import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogContent
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Add as AddIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import SkillQuestionnaire, { UserProfile } from '../components/SkillQuestionnaire';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import { Opportunity, getPersonalizedRecommendations, MatchResult } from '../utils/matchingAlgorithm';

// Mock data is now defined at the top level
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Emergency Medical Response Team',
    description: 'Provide immediate medical assistance to disaster survivors.',
    requiredSkills: ['First Aid', 'CPR', 'EMT'],
    preferredSkills: ['Nursing'],
    experienceLevel: 4,
    location: 'San Francisco, CA',
    urgency: 'critical',
    certifications: ['EMT Certification'],
    languages: ['English', 'Spanish'],
    physicalRequirements: ['Heavy Lifting'],
    workType: ['Team Work'],
    organization: 'Red Cross',
    volunteersNeeded: 10,
    volunteersAssigned: 3,
    startDate: '2024-01-20',
    status: 'open'
  },
    {
    id: '5',
    title: 'Search and Rescue Operations',
    description: 'Join a team to search for and rescue individuals in a simulated disaster zone.',
    requiredSkills: ['Search & Rescue', 'First Aid'],
    preferredSkills: ['Map Reading', 'GPS'],
    experienceLevel: 3,
    location: 'Oakland, CA',
    urgency: 'high',
    certifications: ['Search & Rescue'],
    languages: ['English'],
    physicalRequirements: ['Long Distance Walking', 'Climbing'],
    workType: ['Outdoor Work', 'Team Work'],
    organization: 'FEMA',
    volunteersNeeded: 12,
    volunteersAssigned: 2,
    startDate: '2024-01-28',
    status: 'open'
  }
];

const VolunteerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState<{
    perfectMatches: MatchResult[];
    goodMatches: MatchResult[];
    learningOpportunities: MatchResult[];
  }>({
    perfectMatches: [],
    goodMatches: [],
    learningOpportunities: []
  });

  // --- Hardcoded Dummy Data ---
  const myOpportunities = [
    {
      id: 'op1',
      title: 'First Aid Event Support',
      organization: 'City Medical Corps',
      location: 'San Francisco, CA',
      date: '2024-07-10',
      status: 'Upcoming',
      description: 'Provide first aid support at a local community marathon.'
    },
    {
      id: 'op2',
      title: 'Urban Search and Rescue Drill',
      organization: 'State Disaster Response',
      location: 'Oakland, CA',
      date: '2024-07-15',
      status: 'Upcoming',
      description: 'Participate in a full-day search and rescue training exercise in a simulated urban environment.'
    },
    {
      id: 'op3',
      title: 'CPR Awareness Campaign',
      organization: 'Community Health Org',
      location: 'Berkeley, CA',
      date: '2024-07-20',
      status: 'Upcoming',
      description: 'Help demonstrate and teach hands-only CPR to the public at a community fair.'
    }
  ];

  const currentAssignments = [
    {
      id: 'as1',
      title: 'First Aid Station Volunteer',
      organization: 'Red Cross',
      progress: 80,
      status: 'In Progress'
    },
  ];

  const trainingModules = [
    {
      id: 'tr1',
      title: 'First Aid Basics',
      progress: 100,
      status: 'Completed'
    },
    {
      id: 'tr2',
      title: 'Search and Rescue Theory',
      progress: 45,
      status: 'In Progress'
    },
  ];
  // --- End of Dummy Data ---

  const generateRecommendations = useCallback((profile: UserProfile) => {
    const recs = getPersonalizedRecommendations(profile, mockOpportunities);
    setRecommendations(recs);
    setLoading(false);
  }, []);
  
  const handleQuestionnaireComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setShowQuestionnaire(false);
    setLoading(true);
    generateRecommendations(profile);
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      generateRecommendations(profile);
    } else {
      // Create a default profile to ensure the page is never blank
      const demoProfile: UserProfile = {
        skills: ['First Aid', 'Search & Rescue', 'CPR'],
        experienceLevel: 2,
        availability: ['Weekends'],
        location: 'San Francisco, CA',
        emergencyResponse: true,
        certifications: ['First Aid/CPR'],
        languages: ['English'],
        physicalCapabilities: [],
        preferences: ['Team Work', 'Outdoor Work']
      };
      setUserProfile(demoProfile);
      generateRecommendations(demoProfile);
    }
  }, [generateRecommendations]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
            <Typography variant="h4" gutterBottom>
              {t('dashboard.volunteer.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Welcome back, {currentUser?.name || 'Rishi'}!
            </Typography>
        </Box>
        <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setShowQuestionnaire(true)}
        >
            Update My Skills
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="My Opportunities" />
          <Tab label="Personalized Matches" />
          <Tab label="Current Assignments" />
          <Tab label="Training Progress" />
        </Tabs>
      </Box>

      {/* Tab Panel 0: My Opportunities */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{mb: 2}}>My Opportunities</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
            {myOpportunities.map((op) => (
              <Card key={op.id}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{op.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{op.organization}</Typography>
                  <Chip label={op.status} color="primary" size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>{op.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Tab Panel 1: Personalized Matches */}
      {activeTab === 1 && (
        loading ? <LinearProgress /> : <PersonalizedRecommendations {...recommendations} />
      )}

      {/* Tab Panel 2: Current Assignments */}
      {activeTab === 2 && (
        <Box>
            <Typography variant="h5" gutterBottom sx={{mb: 2}}>My Assignments</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                {currentAssignments.map((assignment) => (
                    <Card key={assignment.id}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>{assignment.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{assignment.organization}</Typography>
                            <LinearProgress variant="determinate" value={assignment.progress} sx={{ height: 8, borderRadius: 4, mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">{assignment.progress}% Complete</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
      )}

      {/* Tab Panel 3: Training Progress */}
      {activeTab === 3 && (
        <Box>
            <Typography variant="h5" gutterBottom sx={{mb: 2}}>My Training</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {trainingModules.map((module) => (
                    <Card key={module.id}>
                        <CardContent>
                            <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}><SchoolIcon /></Avatar>
                            <Typography variant="h6" gutterBottom>{module.title}</Typography>
                            <Chip label={module.status} color={module.status === 'Completed' ? 'success' : 'warning'} size="small"/>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
      )}

      <Dialog open={showQuestionnaire} onClose={() => setShowQuestionnaire(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: {xs: 1, sm: 2, md: 3} }}>
          <SkillQuestionnaire
            onComplete={handleQuestionnaireComplete}
            onSkip={() => setShowQuestionnaire(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VolunteerDashboard;