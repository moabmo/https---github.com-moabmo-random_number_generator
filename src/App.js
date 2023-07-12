import React, { useEffect } from 'react';
import './App.css';
import CryptographicRandomNumberGenerator from './CryptographicRandomNumberGenerator';

function App() {
  useEffect(() => {
    document.title = 'Cryptographic Random Number Generator'; 
    return () => {
      document.title = 'React App'; // Restore the previous title when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <CryptographicRandomNumberGenerator />
      <h5><b>&copy;CIS-3-3024-3/2022 ISEC 631 Week 3 Assignment</b></h5>
    </div>
  );
}

export default App;
