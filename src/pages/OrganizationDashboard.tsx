import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const OrganizationDashboard: React.FC = () => {
  const { currentOrganization } = useAuth();
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('organization_dashboard.title', { name: currentOrganization?.name })}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {t('organization_dashboard.description')}
        </Typography>
      </Box>
      {/* Add organization dashboard content here */}
    </Container>
  );
};

export default OrganizationDashboard; 