import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CreateNeed: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('create_need.title')}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {t('create_need.description')}
        </Typography>
      </Box>
      {/* Add form for creating a new need here */}
    </Container>
  );
};

export default CreateNeed; 