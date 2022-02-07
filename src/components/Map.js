import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Circle } from "react-leaflet"
import { CoordinatesContext } from '../context/CoordinatesContext';
import { getAgenciesFromState } from '../utils/fbi-api-helper';

export default function Map() {

  const [coordinatesContext,] = useContext(CoordinatesContext)
  const [map, setMap] = useState(null)
  const [agencies, setAgencies] = useState(null)

  useEffect(() => {
    async function returnAgencies() {
      setAgencies(
        await getAgenciesFromState('CO')
          .then(agencies => agencies.map(a => ({ lat: a.latitude, lng: a.longitude, name: a.agency_name, type: a.agency_type_name })))
      )
    }
    returnAgencies()
  }, [])

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