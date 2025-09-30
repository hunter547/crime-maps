import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AgeDistribution = ({ ageData, title, color, icon }) => {
  if (!ageData) return null;

  // Get max value for scaling
  const maxValue = Math.max(...Object.values(ageData));
  
  // Sort age groups for better display
  const sortedAges = Object.entries(ageData).sort((a, b) => {
    // Custom sorting for age groups
    const ageOrder = ['Under 10', 'Under 11', '10-12', '11-12', '13-14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65 and over', 'Adult Other', 'Juvenile Other'];
    return ageOrder.indexOf(a[0]) - ageOrder.indexOf(b[0]);
  });

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        {icon}
        <Typography variant="h6" style={{ color: color, fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'end' }}>
        {sortedAges.map(([ageGroup, count]) => {
          const height = maxValue > 0 ? (count / maxValue) * 100 : 0;
          return (
            <Box key={ageGroup} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <Box
                sx={{
                  width: '40px',
                  height: `${Math.max(height, 5)}px`,
                  backgroundColor: color,
                  borderRadius: '4px 4px 0 0',
                  minHeight: count > 0 ? '20px' : '5px',
                  opacity: count > 0 ? 0.8 : 0.3,
                  transition: 'all 0.1s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scaleY(1.1)',
                  }
                }}
                title={`${ageGroup}: ${count} arrests`}
              />
              <Typography variant="caption" sx={{ 
                fontSize: '10px', 
                textAlign: 'center', 
                mt: 0.5,
                fontWeight: count > 0 ? 'bold' : 'normal',
                color: count > 0 ? 'text.primary' : 'text.secondary'
              }}>
                {ageGroup}
              </Typography>
              <Typography variant="caption" sx={{ 
                fontSize: '9px', 
                color: count > 0 ? color : 'text.secondary',
                fontWeight: 'bold'
              }}>
                {count}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default AgeDistribution;
