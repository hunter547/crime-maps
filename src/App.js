import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import { CoordinatesContext } from './context/CoordinatesContext'


function App() {

  const [coordinatesContext, setCoordinatesContext] = useState({ mapProps: { center: [38.8399918, -98.7887878], zoom: 5}, details: { } })

  return (
    <div className="App">
      <CoordinatesContext.Provider value={[coordinatesContext, setCoordinatesContext]}>
        <Header />
        <Map />
      </CoordinatesContext.Provider>
    </div>
  );
}

export default App;
