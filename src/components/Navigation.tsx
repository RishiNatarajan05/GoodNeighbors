import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  VolunteerActivism as VolunteerActivismIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useAnime } from '../hooks/useAnime';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { currentUser, currentOrganization, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const { fadeInUp, fadeInLeft, fadeInRight, pulse, float } = useAnime();

  const handleLanguageChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { text: t('navigation.home'), path: '/', icon: <HomeIcon /> },
    { text: t('navigation.needs'), path: '/needs', icon: <VolunteerActivismIcon /> },
    { text: t('navigation.training'), path: '/training', icon: <SchoolIcon /> },
    { text: t('navigation.messages'), path: '/messages', icon: <MessageIcon /> },
    { text: t('navigation.profile'), path: '/profile', icon: <PersonIcon /> },
  ];

  const userMenuItems = [
    { label: t('navigation.profile'), icon: <PersonIcon />, action: () => navigate('/profile') },
    { label: t('navigation.logout'), icon: <PersonIcon />, action: handleLogout },
  ];

  useEffect(() => {
    // Navigation animations
    if (navRef.current) {
      fadeInUp('.nav-logo', 200);
      fadeInLeft('.nav-menu', 400);
      fadeInRight('.nav-actions', 600);
    }

    // Add floating animation to icons
    float('.floating-icon');
  }, [fadeInUp, fadeInLeft, fadeInRight, float]);

  const handleButtonHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    pulse(`#${button.id}`);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2, background: '#1e3a5f', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
          GoodNeighbors
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        <MenuItem component={NavLink} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.home')} />
        </MenuItem>
        <MenuItem component={NavLink} to="/needs" onClick={handleDrawerToggle}>
          <ListItemIcon><VolunteerActivismIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.needs')} />
        </MenuItem>
        <MenuItem component={NavLink} to="/my-opportunities" onClick={handleDrawerToggle}>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="My Opportunities" />
        </MenuItem>
        <MenuItem component={NavLink} to="/training" onClick={handleDrawerToggle}>
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.training')} />
        </MenuItem>
        <MenuItem component={NavLink} to="/messages" onClick={handleDrawerToggle}>
          <ListItemIcon><MessageIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.messages')} />
        </MenuItem>
        <MenuItem component={NavLink} to="/profile" onClick={handleDrawerToggle}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.profile')} />
        </MenuItem>
      </List>
      <Divider />
      <List>
        {userMenuItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={item.action}
            sx={{
              mx: 1,
              borderRadius: 1,
              mb: 0.5,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        ref={navRef}
        position="fixed"
        sx={{
          background: '#1e3a5f',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Brand */}
          <Box
            className="nav-logo"
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: 0,
            }}
            onClick={() => navigate('/')}
          >
            <VolunteerActivismIcon
              className="floating-icon"
              sx={{
                fontSize: 32,
                color: '#ff6b35',
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                letterSpacing: '-0.025em',
              }}
            >
              GoodNeighbors
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              className="nav-menu"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0,
              }}
            >
              <Button component={NavLink} to="/" color="inherit" startIcon={<HomeIcon />}>{t('navigation.home')}</Button>
              <Button component={NavLink} to="/needs" color="inherit" startIcon={<VolunteerActivismIcon />}>{t('navigation.needs')}</Button>
              <Button component={NavLink} to="/my-opportunities" color="inherit" startIcon={<AssignmentIcon />}>My Opportunities</Button>
              <Button component={NavLink} to="/training" color="inherit" startIcon={<SchoolIcon />}>{t('navigation.training')}</Button>
              <Button component={NavLink} to="/messages" color="inherit" startIcon={<MessageIcon />}>{t('navigation.messages')}</Button>
            </Box>
          )}

          {/* Right Side Actions */}
          <Box
            className="nav-actions"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              opacity: 0,
            }}
          >
            {/* Language Selector */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  '& .MuiSelect-icon': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
              </Select>
            </FormControl>

            {/* User Menu */}
            {(currentUser || currentOrganization) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#ff6b35',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {(currentUser?.name || currentOrganization?.name || 'U').charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {currentUser?.name || currentOrganization?.name}
                </Typography>
              </Box>
            )}

            {/* Logout Button */}
            {(currentUser || currentOrganization) && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleLogout}
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {t('navigation.logout')}
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Navigation; 