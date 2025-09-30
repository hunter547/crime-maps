import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Circle } from "react-leaflet"
import { CoordinatesContext } from '../context/CoordinatesContext';
import { getAgenciesFromState, getOffensesFromAgencyInTimeRange } from '../utils/fbi-api-helper';
import { Button, Box, Typography, Chip } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
import State from './State';
import Agency from './Agency';
import Offense from './Offense';
import DateRange from './DateRange';
import AgeDistribution from './AgeDistribution';
import RaceDistribution from './RaceDistribution';
import { OFFENSE_TYPES } from './Offense';

export default function Map() {

  const [coordinatesContext, setCoordinatesContext] = useContext(CoordinatesContext)
  const [map, setMap] = useState(null)
  const [agencies, setAgencies] = useState(null)
  const [selectedState, setSelectedState] = useState('VA') // Default to Virginia
  const [selectedAgency, setSelectedAgency] = useState('')
  const [selectedOffense, setSelectedOffense] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [offenseData, setOffenseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function returnAgencies() {
      if (selectedState) {
        const agenciesData = await getAgenciesFromState(selectedState)
          .then(agencies => Object.values(agencies).flat().map(a => ({ 
            lat: a.latitude, 
            lng: a.longitude, 
            name: a.agency_name, 
            type: a.agency_type_name,
            ori: a.ori
          })))
        setAgencies(agenciesData)
      }
    }
    returnAgencies()
  }, [selectedState])

  // Reset selected agency when state changes
  useEffect(() => {
    setSelectedAgency('')
  }, [selectedState])

  // Reset selected offense when agency changes
  useEffect(() => {
    setSelectedOffense('')
  }, [selectedAgency])

  // Reset date range when offense changes and set default to last year
  useEffect(() => {
    if (selectedOffense) {
      const now = new Date();
      const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      setFromDate(lastYear);
      setToDate(currentMonth);
    } else {
      setFromDate(null);
      setToDate(null);
    }
    setOffenseData(null);
  }, [selectedOffense])

  // Check if search button should be enabled
  const isSearchEnabled = fromDate && toDate && selectedAgency && selectedOffense;


  // Handle search for offense data
  const handleSearch = async () => {
    if (!isSearchEnabled) return;
    
    setIsLoading(true);
    try {
      // Find the selected agency to get its ORI
      const selectedAgencyData = agencies.find(agency => agency.ori === selectedAgency);
      if (!selectedAgencyData) {
        console.error('Selected agency not found');
        return;
      }

      // Format dates for API call (mm-yyyy format)
      const formatDateForAPI = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${year}`;
      };

      const fromDateFormatted = formatDateForAPI(fromDate);
      const toDateFormatted = formatDateForAPI(toDate);

      // Make API call
      const data = await getOffensesFromAgencyInTimeRange(
        selectedAgencyData.ori,
        selectedOffense,
        fromDateFormatted,
        toDateFormatted
      );

      setOffenseData(data);
      console.log('Offense data:', data);
    } catch (error) {
      console.error('Error fetching offense data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update coordinates when agency is selected
  useEffect(() => {
    if (selectedAgency && agencies) {
      const selectedAgencyData = agencies.find(agency => agency.ori === selectedAgency)
      if (selectedAgencyData && selectedAgencyData.lat && selectedAgencyData.lng) {
        setCoordinatesContext(prevContext => ({
          ...prevContext,
          mapProps: {
            ...prevContext.mapProps,
            center: [selectedAgencyData.lat, selectedAgencyData.lng],
            zoom: 13
          },
          address: selectedAgencyData.name,
        }))
      }
    }
  }, [selectedAgency, agencies, setCoordinatesContext])

  // Radius in miles
  const radius = 5

  useEffect(() => {
    if (map) {
      map.on("moveend zoomend", function() {
        // Logic for when map is done zooming in from the map.flyTo method.
      })
    }
  }, [map])

  useEffect(() => {
    if (map) map.flyTo(coordinatesContext.mapProps.center, coordinatesContext.mapProps.zoom)
  }, [map, coordinatesContext]) // <= Listen to value changes to either map or coordinatesContext

  return (
    <div id="map">
      <div className="map-controls">
        <State 
          selectedState={selectedState} 
          onStateChange={setSelectedState}
        />
        <Agency 
          agencies={agencies}
          selectedAgency={selectedAgency}
          onAgencyChange={setSelectedAgency}
        />
        {selectedAgency && (
          <Offense 
            selectedOffense={selectedOffense}
            onOffenseChange={setSelectedOffense}
          />
        )}
        {selectedOffense && (
          <DateRange 
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
        )}
        
        {/* Search Button */}
        {selectedOffense && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!isSearchEnabled}
              sx={{
                margin: '16px',
                minWidth: 120,
                height: 40,
                backgroundColor: isSearchEnabled ? '#1976d2' : '#ccc',
                '&:hover': {
                  backgroundColor: isSearchEnabled ? '#1565c0' : '#ccc',
                }
              }}
            >
              {isLoading ? 'Searching...' : 'Search Crime Data'}
            </Button>
            {!isSearchEnabled && (
              <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                Select both dates to enable search
              </span>
            )}
          </Box>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div style={{ 
            padding: '10px', 
            textAlign: 'center', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            Loading offense data...
          </div>
        )}
        
        {/* Offense data display */}
        {offenseData && !isLoading && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e8f5e8', 
            borderRadius: '4px',
            margin: '10px 0',
            border: '1px solid #4caf50'
          }}>
            <Typography variant="h6" style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
              {OFFENSE_TYPES.find(o => o.code === selectedOffense)?.name} Offense Data Retrieved
            </Typography>
            <Typography variant="body2" style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
              Data loaded for {selectedAgency && agencies?.find(a => a.ori === selectedAgency)?.name} 
              {" "}from {fromDate && `${fromDate.getMonth() + 1}/${fromDate.getFullYear()}`} 
              {" "}to {toDate && `${toDate.getMonth() + 1}/${toDate.getFullYear()}`}
            </Typography>
            
            {/* Arrestee Sex Data Display */}
            {offenseData["Arrestee Sex"] && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  Arrestee Breakdown:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Male style={{ color: '#1976d2', fontSize: '20px' }} />
                  <Chip 
                    label={`${offenseData["Arrestee Sex"].Male || 0} Male`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Female style={{ color: '#e91e63', fontSize: '20px' }} />
                  <Chip 
                    label={`${offenseData["Arrestee Sex"].Female || 0} Female`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}
            
            {/* Total Arrests */}
            {offenseData["Arrestee Sex"] && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  Total Arrests: 
                </Typography>
                <Chip 
                  label={(offenseData["Arrestee Sex"].Male || 0) + (offenseData["Arrestee Sex"].Female || 0)}
                  size="small"
                  color="default"
                  variant="filled"
                />
              </Box>
            )}
            
            {/* Age Distribution Histograms */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
              <AgeDistribution
                ageData={offenseData["Male Arrests By Age"]}
                title="Male Age Distribution"
                color="#1976d2"
                icon={<Male style={{ color: '#1976d2', fontSize: '20px' }} />}
              />
              <AgeDistribution
                ageData={offenseData["Female Arrests By Age"]}
                title="Female Age Distribution"
                color="#e91e63"
                icon={<Female style={{ color: '#e91e63', fontSize: '20px' }} />}
              />
            </Box>
            
            {/* Race Distribution Histogram */}
            <RaceDistribution
              raceData={offenseData["Arrestee Race"]}
              title="Arrestee Race Distribution"
            />
            
            {/* Expandable Raw Data */}
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Complete Raw Data</summary>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                maxHeight: '200px',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                marginTop: '10px'
              }}>
                {JSON.stringify(offenseData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
      <MapContainer whenCreated={map => setMap(map)} {...coordinatesContext.mapProps}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinatesContext.address && (
              <>
                <Marker
                  position={coordinatesContext.mapProps.center}
                >
                  <Tooltip>{coordinatesContext.address}</Tooltip>
                </Marker>
                <Circle center={coordinatesContext.mapProps.center} radius={radius*1609.34}  />
              </>
            )}
            {agencies && (
              <>
                {agencies.map((a, i) => (
                  <>
                    {a.lat && a.lng && (
                      <Marker key={i} position={[a.lat, a.lng]}>
                        <Tooltip>{`Agency: ${a?.name}`}<br />{`Type: ${a?.type}`}</Tooltip>
                      </Marker>
                    )}
                  </>
                ))}
              </>
            )}
        </MapContainer>
    </div>
  )
}