import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SkillQuestionnaireProps {
  onComplete: (userProfile: UserProfile) => void;
  onSkip: () => void;
}

export interface UserProfile {
  skills: string[];
  experienceLevel: number; // 1-5 scale
  availability: string[];
  location: string;
  emergencyResponse: boolean;
  certifications: string[];
  languages: string[];
  physicalCapabilities: string[];
  preferences: string[];
}

const steps = ['Skills & Experience', 'Availability & Location', 'Capabilities & Preferences'];

const SkillQuestionnaire: React.FC<SkillQuestionnaireProps> = ({ onComplete, onSkip }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    experienceLevel: 3,
    availability: [],
    location: '',
    emergencyResponse: false,
    certifications: [],
    languages: [],
    physicalCapabilities: [],
    preferences: []
  });

  const skillCategories = {
    medical: ['First Aid', 'CPR', 'EMT', 'Nursing', 'Medical Doctor', 'Mental Health Support'],
    technical: ['IT Support', 'Network Administration', 'Software Development', 'Data Analysis', 'GIS Mapping'],
    logistics: ['Supply Chain Management', 'Inventory Management', 'Transportation', 'Warehouse Operations'],
    communication: ['Translation', 'Public Speaking', 'Crisis Communication', 'Social Media Management'],
    construction: ['Carpentry', 'Electrical Work', 'Plumbing', 'Heavy Equipment Operation', 'Building Inspection'],
    administrative: ['Project Management', 'Event Planning', 'Documentation', 'Volunteer Coordination'],
    safety: ['Search & Rescue', 'Fire Safety', 'Hazardous Materials', 'Security'],
    other: ['Cooking', 'Childcare', 'Elder Care', 'Animal Care', 'Teaching']
  };

  const availabilityOptions = [
    'Immediate Response (24/7)',
    'Weekdays',
    'Weekends',
    'Evenings',
    'Flexible Schedule',
    'Remote Work'
  ];

  const certificationOptions = [
    'First Aid/CPR',
    'EMT Certification',
    'Fire Safety',
    'Hazardous Materials',
    'Project Management',
    'Mental Health First Aid',
    'Disaster Response',
    'None'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Arabic',
    'Russian',
    'Portuguese',
    'Japanese',
    'Korean'
  ];

  const physicalCapabilities = [
    'Heavy Lifting',
    'Long Distance Walking',
    'Climbing',
    'Working in Confined Spaces',
    'Working at Heights',
    'Working in Extreme Weather',
    'Driving',
    'None'
  ];

  const preferenceOptions = [
    'Working with Children',
    'Working with Elderly',
    'Working with Animals',
    'Indoor Work',
    'Outdoor Work',
    'Team Work',
    'Independent Work',
    'Leadership Roles',
    'Technical Tasks',
    'Manual Labor'
  ];

  const handleSkillToggle = (skill: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleAvailabilityToggle = (availability: string) => {
    setUserProfile(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const handleCertificationToggle = (cert: string) => {
    setUserProfile(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setUserProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handlePhysicalCapabilityToggle = (capability: string) => {
    setUserProfile(prev => ({
      ...prev,
      physicalCapabilities: prev.physicalCapabilities.includes(capability)
        ? prev.physicalCapabilities.filter(c => c !== capability)
        : [...prev.physicalCapabilities, capability]
    }));
  };

  const handlePreferenceToggle = (preference: string) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onComplete(userProfile);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Skills & Experience
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Experience Level</FormLabel>
              <Slider
                value={userProfile.experienceLevel}
                onChange={(_, value) => setUserProfile(prev => ({ ...prev, experienceLevel: value as number }))}
                min={1}
                max={5}
                marks={[
                  { value: 1, label: 'Beginner' },
                  { value: 2, label: 'Some Experience' },
                  { value: 3, label: 'Moderate' },
                  { value: 4, label: 'Experienced' },
                  { value: 5, label: 'Expert' }
                ]}
                valueLabelDisplay="auto"
              />
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Emergency Response Experience</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userProfile.emergencyResponse}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, emergencyResponse: e.target.checked }))}
                  />
                }
                label="I have experience in emergency response or disaster relief"
              />
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Select Your Skills
            </Typography>
            
            {Object.entries(skillCategories).map(([category, skills]) => (
              <FormControl component="fieldset" key={category} sx={{ mb: 2 }}>
                <FormLabel component="legend" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </FormLabel>
                <FormGroup>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
                    {skills.map((skill) => (
                      <FormControlLabel
                        key={skill}
                        control={
                          <Checkbox
                            checked={userProfile.skills.includes(skill)}
                            onChange={() => handleSkillToggle(skill)}
                          />
                        }
                        label={skill}
                      />
                    ))}
                  </Box>
                </FormGroup>
              </FormControl>
            ))}

            {userProfile.skills.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {userProfile.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleSkillToggle(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Availability & Location
            </Typography>

            <TextField
              fullWidth
              label="Your Location (City, State)"
              value={userProfile.location}
              onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
              sx={{ mb: 3 }}
              placeholder="e.g., San Francisco, CA"
            />

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Availability</FormLabel>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                  {availabilityOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={userProfile.availability.includes(option)}
                          onChange={() => handleAvailabilityToggle(option)}
                        />
                      }
                      label={option}
                    />
                  ))}
                </Box>
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Certifications</FormLabel>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                  {certificationOptions.map((cert) => (
                    <FormControlLabel
                      key={cert}
                      control={
                        <Checkbox
                          checked={userProfile.certifications.includes(cert)}
                          onChange={() => handleCertificationToggle(cert)}
                        />
                      }
                      label={cert}
                    />
                  ))}
                </Box>
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Languages You Speak</FormLabel>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
                  {languageOptions.map((language) => (
                    <FormControlLabel
                      key={language}
                      control={
                        <Checkbox
                          checked={userProfile.languages.includes(language)}
                          onChange={() => handleLanguageToggle(language)}
                        />
                      }
                      label={language}
                    />
                  ))}
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Capabilities & Preferences
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Physical Capabilities</FormLabel>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                  {physicalCapabilities.map((capability) => (
                    <FormControlLabel
                      key={capability}
                      control={
                        <Checkbox
                          checked={userProfile.physicalCapabilities.includes(capability)}
                          onChange={() => handlePhysicalCapabilityToggle(capability)}
                        />
                      }
                      label={capability}
                    />
                  ))}
                </Box>
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Work Preferences</FormLabel>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                  {preferenceOptions.map((preference) => (
                    <FormControlLabel
                      key={preference}
                      control={
                        <Checkbox
                          checked={userProfile.preferences.includes(preference)}
                          onChange={() => handlePreferenceToggle(preference)}
                        />
                      }
                      label={preference}
                    />
                  ))}
                </Box>
              </FormGroup>
            </FormControl>

            <Alert severity="info" sx={{ mt: 3 }}>
              This information helps us match you with the most suitable volunteer opportunities. 
              You can update your profile anytime.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Skill Assessment Questionnaire
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
        Help us match you with the perfect volunteer opportunities by telling us about your skills and preferences.
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        <Box>
          <Button
            variant="outlined"
            onClick={onSkip}
            sx={{ mr: 2 }}
          >
            Skip for Now
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleComplete}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Processing...' : 'Complete Profile'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default SkillQuestionnaire; 