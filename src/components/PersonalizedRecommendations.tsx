import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  School as SchoolIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MatchResult } from '../utils/matchingAlgorithm';

interface PersonalizedRecommendationsProps {
  perfectMatches: MatchResult[];
  goodMatches: MatchResult[];
  learningOpportunities: MatchResult[];
  loading?: boolean;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  perfectMatches,
  goodMatches,
  learningOpportunities,
  loading = false
}) => {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const renderMatchCard = (match: MatchResult, type: 'perfect' | 'good' | 'learning') => {
    const { opportunity, score, matchedSkills, missingSkills, reasons } = match;

    return (
      <Card key={opportunity.id} sx={{ mb: 2, border: type === 'perfect' ? '2px solid #4caf50' : '1px solid #e0e0e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                {opportunity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {opportunity.organization}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2">{opportunity.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ScheduleIcon fontSize="small" color="action" />
                  <Typography variant="body2">{opportunity.startDate}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <GroupIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {opportunity.volunteersAssigned}/{opportunity.volunteersNeeded} volunteers
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Chip
                label={`${score}% Match`}
                color={getScoreColor(score) as any}
                size="small"
                sx={{ mb: 1 }}
              />
              <Chip
                label={opportunity.urgency}
                color={getUrgencyColor(opportunity.urgency) as any}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {opportunity.description.length > 150 
              ? `${opportunity.description.substring(0, 150)}...`
              : opportunity.description
            }
          </Typography>

          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Why this matches you</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {reasons.map((reason, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={reason} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Your Matching Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {matchedSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  color="success"
                  variant="outlined"
                  icon={<CheckCircleIcon />}
                />
              ))}
            </Box>
          </Box>

          {missingSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Missing Required Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {missingSkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    color="error"
                    variant="outlined"
                    icon={<CancelIcon />}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/needs/${opportunity.id}`)}
            >
              View Details
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/needs/${opportunity.id}`)}
            >
              Volunteer Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Finding your perfect matches...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Personalized Recommendations
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Based on your skills and preferences, here are opportunities that match your profile.
      </Typography>

      {/* Perfect Matches */}
      {perfectMatches.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <StarIcon color="success" />
            <Typography variant="h5">
              Perfect Matches ({perfectMatches.length})
            </Typography>
          </Box>
          <Alert severity="success" sx={{ mb: 2 }}>
            These opportunities perfectly match your skills and experience level!
          </Alert>
          {perfectMatches.map(match => renderMatchCard(match, 'perfect'))}
        </Box>
      )}

      {/* Good Matches */}
      {goodMatches.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircleIcon color="warning" />
            <Typography variant="h5">
              Good Matches ({goodMatches.length})
            </Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            These opportunities are well-suited to your profile with some skill overlap.
          </Alert>
          {goodMatches.map(match => renderMatchCard(match, 'good'))}
        </Box>
      )}

      {/* Learning Opportunities */}
      {learningOpportunities.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SchoolIcon color="info" />
            <Typography variant="h5">
              Learning Opportunities ({learningOpportunities.length})
            </Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            These opportunities could help you develop new skills and gain experience.
          </Alert>
          {learningOpportunities.map(match => renderMatchCard(match, 'learning'))}
        </Box>
      )}

      {/* No Matches */}
      {perfectMatches.length === 0 && goodMatches.length === 0 && learningOpportunities.length === 0 && (
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            No matches found
          </Typography>
          <Typography variant="body2">
            We couldn't find any opportunities that match your current profile. 
            Consider updating your skills or expanding your preferences to see more opportunities.
          </Typography>
        </Alert>
      )}

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Want to see all available opportunities?
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/needs')}
        >
          Browse All Opportunities
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalizedRecommendations; 