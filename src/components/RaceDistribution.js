import React from 'react';
import { Box, Typography, Paper, Tooltip as MuiTooltip } from '@mui/material';

const RaceDistribution = ({ raceData, title }) => {
  if (!raceData) return null;

  // Get max value for scaling
  const maxValue = Math.max(...Object.values(raceData));
  
  // Define colors for different race categories
  const raceColors = {
    'White': '#4CAF50',
    'Black or African American': '#2196F3',
    'Asian': '#FF9800',
    'American Indian or Alaska Native': '#9C27B0',
    'Native Hawaiian or Other Pacific Islander': '#F44336',
    'Multiple': '#607D8B',
    'Unknown': '#795548',
    'Not Specified': '#9E9E9E',
    'Asian, Native Hawaiian, or Other Pacific Islander': '#E91E63'
  };

  // Sort races by count (descending) but put Unknown/Not Specified at the end
  const sortedRaces = Object.entries(raceData).sort((a, b) => {
    const aIsUnknown = a[0] === 'Unknown' || a[0] === 'Not Specified';
    const bIsUnknown = b[0] === 'Unknown' || b[0] === 'Not Specified';
    
    // If one is unknown/not specified and the other isn't, put unknown at end
    if (aIsUnknown && !bIsUnknown) return 1;
    if (!aIsUnknown && bIsUnknown) return -1;
    
    // If both are unknown/not specified, sort by count
    if (aIsUnknown && bIsUnknown) return b[1] - a[1];
    
    // If neither are unknown/not specified, sort by count
    return b[1] - a[1];
  });

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" style={{ color: '#2e7d32', fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'end' }}>
        {sortedRaces.map(([race, count]) => {
          const height = maxValue > 0 ? (count / maxValue) * 100 : 0;
          const color = raceColors[race] || '#757575';
          return (
            <Box key={race} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
              <Box
                sx={{
                  width: '50px',
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
                title={`${race}: ${count} arrests`}
              />
              <MuiTooltip 
                title={race} 
                enterDelay={200}
                leaveDelay={100}
                arrow
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: '9px', 
                    textAlign: 'center', 
                    mt: 0.5,
                    fontWeight: count > 0 ? 'bold' : 'normal',
                    color: count > 0 ? 'text.primary' : 'text.secondary',
                    maxWidth: '80px',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    cursor: 'help'
                  }}
                >
                  {race}
                </Typography>
              </MuiTooltip>
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

export default RaceDistribution;
