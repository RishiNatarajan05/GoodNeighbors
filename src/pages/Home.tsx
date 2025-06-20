import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  VolunteerActivism,
  Business,
  Speed,
  Verified,
  Accessibility,
  School,
  Public,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAnime } from '../hooks/useAnime';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { 
    fadeInUp, 
    fadeInLeft, 
    fadeInRight, 
    scaleIn, 
    staggerFadeIn, 
    pulse, 
    float, 
    slideInFromBottom,
    globeRotation,
    particleOrbit,
    connectionLines,
    globePulse,
    continentReveal
  } = useAnime();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Speed fontSize="large" color="primary" />,
      title: t('home.features.realtime.title'),
      description: t('home.features.realtime.description'),
    },
    {
      icon: <Verified fontSize="large" color="primary" />,
      title: t('home.features.volunteer.title'),
      description: t('home.features.volunteer.description'),
    },
    {
      icon: <Accessibility fontSize="large" color="primary" />,
      title: t('home.features.organization.title'),
      description: t('home.features.organization.description'),
    },
  ];

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      fadeInUp('.hero-title', 200);
      fadeInUp('.hero-subtitle', 400);
      fadeInLeft('.hero-buttons', 600);
      fadeInRight('.hero-image', 800);
      
      // Globe-specific animations
      globeRotation('.earth-globe', 30000);
      particleOrbit('.globe-particle', 170, 4000);
      connectionLines('.connection-line', 3000);
      globePulse('.globe-sphere');
      continentReveal('.continent', 1000);
    }

    // Features section animations
    if (featuresRef.current) {
      fadeInUp('.features-title', 200);
      staggerFadeIn('.feature-card', 150);
    }

    // CTA section animations
    if (ctaRef.current) {
      slideInFromBottom('.cta-content', 200);
    }

    // Add floating animation to icons
    float('.floating-icon');
  }, [fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerFadeIn, slideInFromBottom, float, globeRotation, particleOrbit, connectionLines, globePulse, continentReveal]);

  const handleButtonHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    pulse(`#${button.id}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        ref={heroRef}
        sx={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a3d 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                className="hero-title"
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  opacity: 0,
                  letterSpacing: '-0.025em',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {t('home.hero.title')}
              </Typography>
              <Typography
                className="hero-subtitle"
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  opacity: 0,
                  color: 'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '0.025em',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {t('home.hero.subtitle')}
              </Typography>
              <Box className="hero-buttons" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', opacity: 0 }}>
                <Button
                  id="volunteer-btn"
                  variant="contained"
                  size="large"
                  startIcon={<VolunteerActivism className="floating-icon" />}
                  onClick={() => navigate('/register')}
                  onMouseEnter={handleButtonHover}
                  sx={{
                    bgcolor: '#ff6b35',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#e55a2b',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.025em',
                  }}
                >
                  {t('home.hero.cta.primary')}
                </Button>
                <Button
                  id="organization-btn"
                  variant="outlined"
                  size="large"
                  startIcon={<Business className="floating-icon" />}
                  onClick={() => navigate('/register')}
                  onMouseEnter={handleButtonHover}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    borderWidth: '1.5px',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.025em',
                  }}
                >
                  {t('home.hero.cta.secondary')}
                </Button>
              </Box>
            </Box>
            <Box className="hero-image" sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: 300, md: 400 }, opacity: 0 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 200, md: 300 },
                  height: { xs: 200, md: 300 },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Modern Earth Globe */}
                <Box
                  className="earth-globe"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Globe sphere with modern Earth texture */}
                  <Box
                    className="globe-sphere"
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%),
                        linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E40AF 100%)
                      `,
                      border: '2px solid rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '80%',
                        height: '80%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {/* Grid lines for latitude and longitude */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        transform: 'translate(-50%, -50%)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '0',
                          width: '100%',
                          height: '1px',
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                          transform: 'translateY(-50%)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '0',
                          left: '50%',
                          width: '1px',
                          height: '100%',
                          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                          transform: 'translateX(-50%)',
                        },
                      }}
                    />
                    
                    {/* Modern Continents */}
                    {/* North America */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '25%',
                        left: '20%',
                        width: '25%',
                        height: '20%',
                        background: '#10B981',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-15deg)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '60%',
                          left: '20%',
                          width: '15%',
                          height: '12%',
                          background: '#10B981',
                          borderRadius: '50%',
                          transform: 'rotate(25deg)',
                        },
                      }}
                    />
                    
                    {/* South America */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '25%',
                        width: '18%',
                        height: '35%',
                        background: '#10B981',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-5deg)',
                      }}
                    />
                    
                    {/* Europe */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '30%',
                        left: '45%',
                        width: '15%',
                        height: '12%',
                        background: '#10B981',
                        borderRadius: '50%',
                        transform: 'rotate(10deg)',
                      }}
                    />
                    
                    {/* Africa */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '35%',
                        left: '48%',
                        width: '20%',
                        height: '30%',
                        background: '#10B981',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-2deg)',
                      }}
                    />
                    
                    {/* Asia */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '25%',
                        left: '55%',
                        width: '35%',
                        height: '25%',
                        background: '#10B981',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-8deg)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '40%',
                          left: '70%',
                          width: '20%',
                          height: '15%',
                          background: '#10B981',
                          borderRadius: '50%',
                          transform: 'rotate(15deg)',
                        },
                      }}
                    />
                    
                    {/* Australia */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '65%',
                        left: '70%',
                        width: '18%',
                        height: '12%',
                        background: '#10B981',
                        borderRadius: '50%',
                        transform: 'rotate(-5deg)',
                      }}
                    />
                    
                    {/* Greenland */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        top: '15%',
                        left: '25%',
                        width: '12%',
                        height: '8%',
                        background: '#10B981',
                        borderRadius: '50%',
                        transform: 'rotate(20deg)',
                      }}
                    />
                    
                    {/* Antarctica */}
                    <Box
                      className="continent"
                      sx={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '40%',
                        width: '20%',
                        height: '8%',
                        background: '#10B981',
                        borderRadius: '50%',
                        transform: 'rotate(5deg)',
                      }}
                    />
                    
                    {/* Ocean highlights */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '60%',
                        width: '25%',
                        height: '15%',
                        background: 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '50%',
                        transform: 'rotate(-10deg)',
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '10%',
                        width: '20%',
                        height: '12%',
                        background: 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '50%',
                        transform: 'rotate(15deg)',
                      }}
                    />
                  </Box>
                </Box>
                
                {/* Modern floating particles */}
                {[...Array(12)].map((_, index) => (
                  <Box
                    key={index}
                    className="globe-particle"
                    sx={{
                      position: 'absolute',
                      width: '4px',
                      height: '4px',
                      background: 'rgba(255,255,255,0.8)',
                      borderRadius: '50%',
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    }}
                  />
                ))}
                
                {/* Connection lines */}
                {[...Array(6)].map((_, index) => (
                  <Box
                    key={`line-${index}`}
                    className="connection-line"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '1px',
                      height: '200px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                      transform: `translate(-50%, -50%) rotate(${index * 60}deg)`,
                    }}
                  />
                ))}
                
                {/* Center icon */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}
                >
                  <Public
                    sx={{
                      fontSize: { xs: 40, md: 60 },
                      color: 'rgba(255,255,255,0.9)',
                      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" ref={featuresRef}>
        <Typography
          className="features-title"
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            opacity: 0,
            letterSpacing: '-0.025em',
          }}
        >
          {t('home.features.title')}
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card"
              sx={{
                p: 4,
                textAlign: 'center',
                opacity: 0,
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                  '& .MuiSvgIcon-root': {
                    fontSize: '3rem',
                    color: '#2563EB',
                  },
                }}
              >
                {feature.icon}
              </Box>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: '#1F2937',
                  letterSpacing: '-0.025em',
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  lineHeight: 1.6,
                  letterSpacing: '0.025em',
                }}
              >
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Card
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a3d 100%)',
              border: '2px solid #1e3a5f',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                color: 'white',
                fontWeight: 700,
              }}
            >
              {t('home.cta.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'white',
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              {t('home.cta.description')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: '#ff6b35',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#e55a2b',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('home.cta.volunteer')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {t('home.cta.organization')}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 