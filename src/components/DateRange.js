import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';

export default function DateRange({ fromDate, toDate, onFromDateChange, onToDateChange }) {
  const [fromDateValue, setFromDateValue] = useState(fromDate || null);
  const [toDateValue, setToDateValue] = useState(toDate || null);

  const handleFromDateChange = (date) => {
    setFromDateValue(date);
    if (onFromDateChange) {
      onFromDateChange(date);
    }
  };

  const handleToDateChange = (date) => {
    setToDateValue(date);
    if (onToDateChange) {
      onToDateChange(date);
    }
  };

  // Sync local state with props
  useEffect(() => {
    setFromDateValue(fromDate || null);
  }, [fromDate]);

  useEffect(() => {
    setToDateValue(toDate || null);
  }, [toDate]);

  // Format date to mm-yyyy
  const formatDateToMMYYYY = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
  };


  return (
    <div className="dropdown-selector">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <label htmlFor="from-date">From:</label>
            <DatePicker
              label="From Date"
              value={fromDateValue}
              onChange={handleFromDateChange}
              views={['year', 'month']}
              openTo="month"
              format="MM/yyyy"
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{ width: 150 }}
                />
              )}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <label htmlFor="to-date">To:</label>
            <DatePicker
              label="To Date"
              value={toDateValue}
              onChange={handleToDateChange}
              views={['year', 'month']}
              openTo="month"
              format="MM/yyyy"
              minDate={fromDateValue}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{ width: 150 }}
                />
              )}
            />
          </Box>
          
          {(fromDateValue || toDateValue) && (
            <Box sx={{ 
              padding: '8px 12px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'monospace'
            }}>
              {formatDateToMMYYYY(fromDateValue)} through {formatDateToMMYYYY(toDateValue)}
            </Box>
          )}
        </Box>
      </LocalizationProvider>
    </div>
  );
}

