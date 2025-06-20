import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  VolunteerActivism as VolunteerIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NeedsDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for needs
  const dummyNeeds = [
    {
      id: '1',
      title: 'Emergency Medical Support - Hurricane Recovery',
      description: 'Critical need for licensed medical professionals to provide emergency care and trauma support in areas devastated by Hurricane Maria. We need doctors, nurses, EMTs, and mental health professionals to work in mobile clinics and temporary medical facilities. Experience with disaster medicine, trauma care, and working in resource-limited environments is essential. This is a 24/7 operation with rotating shifts.',
      organization: 'Red Cross Emergency Response',
      location: 'Houston, TX - Multiple locations across affected areas',
      urgency: 'critical',
      status: 'open',
      requiredSkills: ['Medical License', 'Emergency Medicine', 'Trauma Care', 'CPR Certification', 'Disaster Response', 'Spanish Language Skills'],
      volunteersNeeded: 15,
      volunteersAssigned: 8,
      organizationLogo: '🏥',
    },
    {
      id: '2',
      title: 'Food Distribution & Supply Chain Management',
      description: 'Help coordinate and execute large-scale food distribution operations to serve over 10,000 affected families. This involves managing inventory, coordinating with local food banks, organizing volunteer teams, and ensuring proper food safety protocols. Physical stamina required for lifting and carrying heavy boxes. Must be able to work in outdoor conditions and coordinate with multiple organizations.',
      organization: 'Food Bank of America',
      location: 'Miami, FL - Central Distribution Hub',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['Logistics Management', 'Inventory Control', 'Physical Labor', 'Team Leadership', 'Food Safety', 'Bilingual (English/Spanish)'],
      volunteersNeeded: 25,
      volunteersAssigned: 12,
      organizationLogo: '🍽️',
    },
    {
      id: '3',
      title: 'Temporary Shelter Construction & Repair',
      description: 'Assist in building and repairing temporary shelters for displaced families. This includes constructing modular housing units, repairing damaged homes, and ensuring all structures meet safety standards. Construction experience is helpful but not required - we provide training. Must be comfortable with power tools and working in teams. Safety equipment provided.',
      organization: 'Habitat for Humanity',
      location: 'New Orleans, LA - Multiple construction sites',
      urgency: 'high',
      status: 'inProgress',
      requiredSkills: ['Construction Experience', 'Carpentry Skills', 'Power Tool Operation', 'Safety Protocols', 'Team Collaboration', 'Blueprint Reading'],
      volunteersNeeded: 20,
      volunteersAssigned: 18,
      organizationLogo: '🏗️',
    },
    {
      id: '4',
      title: 'Mental Health Crisis Intervention & Support',
      description: 'Provide critical mental health support and crisis intervention to disaster survivors experiencing trauma, grief, and post-traumatic stress. Licensed therapists, counselors, and social workers needed to work with individuals and families. Experience with trauma-informed care, grief counseling, and working with vulnerable populations required. Must be able to work in challenging emotional environments.',
      organization: 'Mental Health First Aid International',
      location: 'Los Angeles, CA - Community Centers & Mobile Units',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Licensed Therapist', 'Trauma-Informed Care', 'Crisis Intervention', 'Grief Counseling', 'Cultural Competency', 'Active Listening'],
      volunteersNeeded: 10,
      volunteersAssigned: 3,
      organizationLogo: '🧠',
    },
    {
      id: '5',
      title: 'Water Infrastructure & Purification Systems',
      description: 'Install, maintain, and operate water purification systems in communities where water infrastructure has been compromised. This includes setting up portable water treatment units, testing water quality, training local operators, and ensuring compliance with health standards. Technical background in engineering, water systems, or environmental science required.',
      organization: 'Water.org - Emergency Response Division',
      location: 'San Antonio, TX - Multiple rural communities',
      urgency: 'critical',
      status: 'open',
      requiredSkills: ['Civil/Environmental Engineering', 'Water Treatment Systems', 'Quality Control', 'Technical Documentation', 'Training & Education', 'Field Work Experience'],
      volunteersNeeded: 8,
      volunteersAssigned: 2,
      organizationLogo: '💧',
    },
    {
      id: '6',
      title: 'Child Care & Family Support Services',
      description: 'Provide safe, nurturing child care for families affected by disaster while parents access essential services or return to work. This includes creating structured activities, providing emotional support to children, and coordinating with family services. Background check required. Experience with child development, trauma-informed care for children, and working with diverse families preferred.',
      organization: 'Child Care Relief Network',
      location: 'Atlanta, GA - Community Centers',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Child Development', 'First Aid & CPR', 'Trauma-Informed Care', 'Patience & Empathy', 'Activity Planning', 'Background Check Required'],
      volunteersNeeded: 12,
      volunteersAssigned: 7,
      organizationLogo: '👶',
    },
    {
      id: '7',
      title: 'Transportation & Logistics Coordination',
      description: 'Coordinate transportation networks for supplies, volunteers, and affected families. This involves managing fleet operations, route planning, coordinating with multiple organizations, and ensuring timely delivery of critical resources. Experience with logistics, transportation management, or supply chain operations required. Must be able to work in a fast-paced, high-pressure environment.',
      organization: 'Transport Relief Network',
      location: 'Phoenix, AZ - Central Logistics Hub',
      urgency: 'high',
      status: 'inProgress',
      requiredSkills: ['Logistics Management', 'Fleet Operations', 'Route Planning', 'Supply Chain Coordination', 'Communication Skills', 'Problem Solving'],
      volunteersNeeded: 15,
      volunteersAssigned: 14,
      organizationLogo: '🚚',
    },
    {
      id: '8',
      title: 'Educational Support & Temporary Schooling',
      description: 'Help establish and operate temporary educational programs for children displaced by disaster. This includes setting up mobile classrooms, providing academic support, creating trauma-informed learning environments, and coordinating with local school districts. Teaching experience preferred but not required. Must be patient, creative, and able to work with children experiencing trauma.',
      organization: 'Education Without Borders',
      location: 'Denver, CO - Multiple community locations',
      urgency: 'low',
      status: 'open',
      requiredSkills: ['Teaching Experience', 'Child Development', 'Trauma-Informed Education', 'Curriculum Development', 'Patience & Creativity', 'Cultural Sensitivity'],
      volunteersNeeded: 18,
      volunteersAssigned: 5,
      organizationLogo: '📚',
    },
    {
      id: '9',
      title: 'Communication & Technology Infrastructure',
      description: 'Set up and maintain communication systems, internet connectivity, and technology infrastructure for disaster response operations. This includes installing satellite communications, setting up mobile hotspots, providing technical support, and ensuring reliable communication channels for emergency services. IT or telecommunications experience required.',
      organization: 'Tech for Good Foundation',
      location: 'Seattle, WA - Emergency Operations Center',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['IT Infrastructure', 'Network Administration', 'Satellite Communications', 'Technical Support', 'Problem Solving', 'Emergency Systems'],
      volunteersNeeded: 6,
      volunteersAssigned: 1,
      organizationLogo: '📡',
    },
    {
      id: '10',
      title: 'Animal Rescue & Veterinary Care',
      description: 'Provide emergency veterinary care and rescue services for animals affected by disaster. This includes treating injured animals, setting up temporary shelters, coordinating with animal control, and reuniting pets with their families. Veterinary experience or animal handling skills required. Must be comfortable working with distressed animals in challenging conditions.',
      organization: 'Animal Disaster Response Team',
      location: 'Portland, OR - Multiple rescue locations',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Veterinary Experience', 'Animal Handling', 'Emergency Care', 'Shelter Management', 'Compassion', 'Physical Stamina'],
      volunteersNeeded: 8,
      volunteersAssigned: 4,
      organizationLogo: '🐾',
    },
    {
      id: '11',
      title: 'Elderly Care & Senior Support Services',
      description: 'Provide specialized care and support for elderly disaster survivors, including medical assistance, emotional support, and help with daily activities. This includes working with seniors who may have mobility issues, chronic health conditions, or cognitive challenges. Experience with geriatric care, patience, and compassion required.',
      organization: 'Senior Care Relief Network',
      location: 'Chicago, IL - Senior Centers & Homes',
      urgency: 'medium',
      status: 'open',
      requiredSkills: ['Geriatric Care', 'Medical Assistance', 'Patience & Compassion', 'Communication Skills', 'Physical Support', 'Emergency Response'],
      volunteersNeeded: 10,
      volunteersAssigned: 6,
      organizationLogo: '👴',
    },
    {
      id: '12',
      title: 'Environmental Cleanup & Hazardous Waste Management',
      description: 'Assist in environmental cleanup operations, including hazardous waste removal, debris management, and environmental restoration. This involves working with specialized equipment, following safety protocols, and coordinating with environmental agencies. Safety training provided. Must be physically fit and able to work in potentially hazardous conditions.',
      organization: 'Environmental Response Team',
      location: 'New York, NY - Multiple cleanup sites',
      urgency: 'high',
      status: 'open',
      requiredSkills: ['Environmental Safety', 'Hazardous Materials', 'Physical Fitness', 'Safety Protocols', 'Equipment Operation', 'Team Coordination'],
      volunteersNeeded: 14,
      volunteersAssigned: 9,
      organizationLogo: '🌱',
    },
  ];

  const filteredNeeds = dummyNeeds.filter(need =>
    need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    need.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    need.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleVolunteerClick = (needId: string) => {
    navigate(`/needs/${needId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            color: '#1e3a5f',
          }}
        >
          {t('needs.title')}
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          sx={{ mb: 3 }}
        >
          Find opportunities to help communities in need
        </Typography>
        
        {/* Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4, flexWrap: 'wrap' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 700 }}>
              {filteredNeeds.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active Needs
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#2d5a3d', fontWeight: 700 }}>
              {filteredNeeds.filter(n => n.status === 'open').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Open Positions
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#1e3a5f', fontWeight: 700 }}>
              {filteredNeeds.reduce((sum, need) => sum + need.volunteersNeeded, 0)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Volunteers Needed
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <TextField
          fullWidth
          placeholder="Search needs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      {/* Needs Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {filteredNeeds.map((need) => (
          <Box key={need.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: '#1e3a5f',
                      mr: 2,
                      fontSize: '1.5rem',
                    }}
                  >
                    {need.organizationLogo}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {need.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {need.organization}
                    </Typography>
                  </Box>
                </Box>

                {/* Urgency and Status */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
                </Box>

                {/* Description */}
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  sx={{ mb: 2, lineHeight: 1.5 }}
                >
                  {need.description}
                </Typography>

                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="textSecondary">
                    {need.location}
                  </Typography>
                </Box>

                {/* Skills */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Required Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {need.requiredSkills.slice(0, 3).map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                    {need.requiredSkills.length > 3 && (
                      <Chip
                        label={`+${need.requiredSkills.length - 3} more`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Volunteers */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="textSecondary">
                    {need.volunteersAssigned}/{need.volunteersNeeded} volunteers
                  </Typography>
                </Box>

                {/* Action Button */}
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<VolunteerIcon />}
                  onClick={() => handleVolunteerClick(need.id)}
                  disabled={need.status !== 'open'}
                  sx={{
                    bgcolor: need.status === 'open' ? '#ff6b35' : '#ccc',
                    color: 'white',
                    '&:hover': {
                      bgcolor: need.status === 'open' ? '#e55a2b' : '#ccc',
                    },
                  }}
                >
                  {need.status === 'open' ? t('needs.details.volunteerNow') : t(`needs.status.${need.status}`)}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* No Results */}
      {filteredNeeds.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No needs found matching your criteria
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search terms
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default NeedsDashboard;
