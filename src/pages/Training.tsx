import React, { useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  Security,
  Message,
  LocalHospital,
  LocalShipping,
  Psychology,
  Computer,
  PlayArrow,
  CheckCircle,
  Schedule,
  Book,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAnime } from '../hooks/useAnime';

const Training: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { fadeInUp, staggerFadeIn, scaleIn, pulse, float, slideInFromBottom } = useAnime();
  
  const trainingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  // Mock training data
  const trainingStats = {
    totalModules: 6,
    completedModules: 3,
    totalHours: 2.5,
    certificates: 2,
    currentStreak: 5,
  };

  const trainingModules = [
    {
      id: 'safety',
      title: t('training.modules.safety.title'),
      description: t('training.modules.safety.description'),
      duration: t('training.modules.safety.duration'),
      lessons: t('training.modules.safety.lessons'),
      status: 'completed',
      progress: 100,
      icon: <Security />,
      color: 'success',
      difficulty: 'Beginner',
      rating: 4.8,
    },
    {
      id: 'communication',
      title: t('training.modules.communication.title'),
      description: t('training.modules.communication.description'),
      duration: t('training.modules.communication.duration'),
      lessons: t('training.modules.communication.lessons'),
      status: 'inProgress',
      progress: 65,
      icon: <Message />,
      color: 'primary',
      difficulty: 'Beginner',
      rating: 4.6,
    },
    {
      id: 'firstAid',
      title: t('training.modules.firstAid.title'),
      description: t('training.modules.firstAid.description'),
      duration: t('training.modules.firstAid.duration'),
      lessons: t('training.modules.firstAid.lessons'),
      status: 'completed',
      progress: 100,
      icon: <LocalHospital />,
      color: 'error',
      difficulty: 'Intermediate',
      rating: 4.9,
    },
    {
      id: 'logistics',
      title: t('training.modules.logistics.title'),
      description: t('training.modules.logistics.description'),
      duration: t('training.modules.logistics.duration'),
      lessons: t('training.modules.logistics.lessons'),
      status: 'notStarted',
      progress: 0,
      icon: <LocalShipping />,
      color: 'warning',
      difficulty: 'Intermediate',
      rating: 4.7,
    },
    {
      id: 'mentalHealth',
      title: t('training.modules.mentalHealth.title'),
      description: t('training.modules.mentalHealth.description'),
      duration: t('training.modules.mentalHealth.duration'),
      lessons: t('training.modules.mentalHealth.lessons'),
      status: 'notStarted',
      progress: 0,
      icon: <Psychology />,
      color: 'info',
      difficulty: 'Advanced',
      rating: 4.5,
    },
    {
      id: 'technology',
      title: t('training.modules.technology.title'),
      description: t('training.modules.technology.description'),
      duration: t('training.modules.technology.duration'),
      lessons: t('training.modules.technology.lessons'),
      status: 'notStarted',
      progress: 0,
      icon: <Computer />,
      color: 'secondary',
      difficulty: 'Beginner',
      rating: 4.4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'inProgress':
        return 'primary';
      case 'notStarted':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'inProgress':
        return <PlayArrow />;
      case 'notStarted':
        return <Book />;
      default:
        return <Book />;
    }
  };

  useEffect(() => {
    // Training header animations
    if (trainingRef.current) {
      fadeInUp('.training-title', 200);
      fadeInUp('.training-subtitle', 400);
    }

    // Stats cards animation
    if (statsRef.current) {
      staggerFadeIn('.stat-card', 100);
    }

    // Modules cards animation
    if (modulesRef.current) {
      slideInFromBottom('.modules-title', 200);
      staggerFadeIn('.module-card', 150);
    }

    // Add floating animation to icons
    float('.floating-icon');
  }, [fadeInUp, staggerFadeIn, slideInFromBottom, float]);

  const handleCardHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    scaleIn(`#${card.id}`, 0);
  };

  const handleButtonHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    pulse(`#${button.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Training Header */}
      <Box ref={trainingRef} sx={{ mb: 6 }}>
        <Typography
          className="training-title"
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <School className="floating-icon" color="primary" />
          {t('training.title')}
        </Typography>
        <Typography
          className="training-subtitle"
          variant="h6"
          color="text.secondary"
          sx={{ opacity: 0 }}
        >
          {t('training.subtitle')}
        </Typography>
      </Box>

      {/* Training Stats */}
      <Box ref={statsRef} sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <Card
              id="modules-card"
              className="stat-card"
              sx={{
                textAlign: 'center',
                p: 3,
                opacity: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
              onMouseEnter={handleCardHover}
            >
              <CardContent>
                <Book className="floating-icon" color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" component="div" gutterBottom>
                  {trainingStats.totalModules}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('training.required')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <Card
              id="completed-card"
              className="stat-card"
              sx={{
                textAlign: 'center',
                p: 3,
                opacity: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
              onMouseEnter={handleCardHover}
            >
              <CardContent>
                <CheckCircle className="floating-icon" color="success" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" component="div" gutterBottom>
                  {trainingStats.completedModules}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('training.completed')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <Card
              id="hours-card"
              className="stat-card"
              sx={{
                textAlign: 'center',
                p: 3,
                opacity: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
              onMouseEnter={handleCardHover}
            >
              <CardContent>
                <Schedule className="floating-icon" color="warning" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" component="div" gutterBottom>
                  {trainingStats.totalHours}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('training.duration')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
            <Card
              id="streak-card"
              className="stat-card"
              sx={{
                textAlign: 'center',
                p: 3,
                opacity: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
              onMouseEnter={handleCardHover}
            >
              <CardContent>
                <TrendingUp className="floating-icon" color="error" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" component="div" gutterBottom>
                  {trainingStats.currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Day Streak
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Training Modules */}
      <Box ref={modulesRef}>
        <Typography
          className="modules-title"
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mb: 4, opacity: 0 }}
        >
          {t('training.required')}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {trainingModules.map((module, index) => (
            <Box key={module.id} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' } }}>
              <Card
                id={`module-${module.id}`}
                className="module-card"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    '& .module-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
                onMouseEnter={handleCardHover}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      className="module-icon floating-icon"
                      sx={{
                        mr: 2,
                        bgcolor: `${module.color}.main`,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {module.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {module.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star fontSize="small" color="warning" />
                        <Typography variant="body2" color="text.secondary">
                          {module.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {module.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={module.difficulty}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={module.status}
                      size="small"
                      color={getStatusColor(module.status) as any}
                      icon={getStatusIcon(module.status)}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Schedule fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {module.duration} • {module.lessons} lessons
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {t('training.progress')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={module.progress}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    id={`start-${module.id}`}
                    variant={module.status === 'completed' ? 'outlined' : 'contained'}
                    fullWidth
                    startIcon={module.status === 'completed' ? <CheckCircle /> : <PlayArrow />}
                    onMouseEnter={handleButtonHover}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    {module.status === 'completed' 
                      ? t('training.completeModule')
                      : module.status === 'inProgress'
                      ? t('training.continueModule')
                      : t('training.startModule')
                    }
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Training; 