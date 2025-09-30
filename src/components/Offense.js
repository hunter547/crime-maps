import React from 'react';

export const OFFENSE_TYPES = [
  { code: 'all', name: 'All' },
  { code: '310', name: 'All Other Offenses (Except Traffic)' },
  { code: '110', name: 'Arson' },
  { code: '60', name: 'Burglary' },
  { code: '330', name: 'Curfew and Loitering Law Violations' },
  { code: '290', name: 'Disorderly Conduct' },
  { code: '260', name: 'Driving Under the Influence' },
  { code: '150', name: 'Drug Abuse Violations' },
  { code: '158', name: 'Drug Possession - Marijuana' },
  { code: '157', name: 'Drug Possession - Opium or Cocaine or Their Derivatives' },
  { code: '160', name: 'Drug Possession - Other - Dangerous Nonnarcotic Drugs' },
  { code: '159', name: 'Drug Possession - Synthetic Narcotics' },
  { code: '153', name: 'Drug Sale/Manufacturing - Marijuana' },
  { code: '152', name: 'Drug Sale/Manufacturing - Opium or Cocaine or Their Derivatives' },
  { code: '155', name: 'Drug Sale/Manufacturing - Other - Dangerous Nonnarcotic Drugs' },
  { code: '154', name: 'Drug Sale/Manufacturing - Synthetic Narcotics' },
  { code: '280', name: 'Drunkenness' },
  { code: '200', name: 'Embezzlement' },
  { code: '180', name: 'Forgery and Counterfeiting' },
  { code: '190', name: 'Fraud' },
  { code: '173', name: 'Gambling - All Other Gambling' },
  { code: '171', name: 'Gambling - Bookmaking (Horse and Sport Book)' },
  { code: '172', name: 'Gambling - Numbers and Lottery' },
  { code: '170', name: 'Gambling' },
  { code: '70', name: 'Larceny - Theft' },
  { code: '270', name: 'Liquor Law Violations' },
  { code: '12', name: 'Manslaughter by Negligence' },
  { code: '90', name: 'Motor Vehicle Theft' },
  { code: '11', name: 'Murder and Nonnegligent Homicide' },
  { code: '250', name: 'Offenses Against the Family and Children' },
  { code: '140', name: 'Prostitution and Commercialized Vice' },
  { code: '142', name: 'Prostitution and Commercialized Vice - Assisting or Promoting Prostitution' },
  { code: '141', name: 'Prostitution and Commercialized Vice - Prostitution' },
  { code: '143', name: 'Prostitution and Commercialized Vice - Purchasing Prostitution' },
  { code: '23', name: 'Rape' },
  { code: '30', name: 'Robbery' },
  { code: '240', name: 'Sex Offenses (Except Rape, and Prostitution and Commercialized Vice)' },
  { code: '55', name: 'Simple Assault' },
  { code: '210', name: 'Stolen Property: Buying, Receiving, Possessing' },
  { code: '300', name: 'Vagrancy' },
  { code: '220', name: 'Vandalism' },
  { code: '230', name: 'Weapons: Carrying, Possessing, Etc.' }
];

export default function Offense({ selectedOffense, onOffenseChange }) {
  const handleOffenseChange = (event) => {
    const offenseCode = event.target.value;
    onOffenseChange(offenseCode);
  };

  return (
    <div className="dropdown-selector">
      <label htmlFor="offense-select">Select Offense Type:</label>
      <select 
        id="offense-select" 
        value={selectedOffense} 
        onChange={handleOffenseChange}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          minWidth: '400px',
          marginLeft: '10px'
        }}
      >
        <option value="">Choose an offense type...</option>
        {OFFENSE_TYPES.map(offense => (
          <option key={offense.code} value={offense.code}>
            {offense.name}
          </option>
        ))}
      </select>
    </div>
  );
}
