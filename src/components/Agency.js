import React from 'react';

export default function Agency({ agencies, selectedAgency, onAgencyChange }) {
  const handleAgencyChange = (event) => {
    const ori = event.target.value;
    onAgencyChange(ori);
  };

  return (
    <div className="dropdown-selector">
      <label htmlFor="agency-select">Select an Agency:</label>
      <select 
        id="agency-select" 
        value={selectedAgency} 
        onChange={handleAgencyChange}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          minWidth: '300px',
          marginLeft: '10px'
        }}
        disabled={!agencies || agencies.length === 0}
      >
        <option value="">Choose an agency...</option>
        {agencies && agencies.sort((a, b) => a.name.localeCompare(b.name)).map(agency => (
          <option key={agency.ori} value={agency.ori}>
            {agency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
