import React, { useEffect } from 'react';
import './App.css';
import CryptographicRandomNumberGenerator from './CryptographicRandomNumberGenerator';

function App() {
  useEffect(() => {
    document.title = 'Cryptographic Random Number Generator'; // Change the title when the component mounts
    return () => {
      document.title = 'React App'; // Restore the previous title when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <CryptographicRandomNumberGenerator />
      <h5>&copy;2023 | Cryptographic RandomNumber Generator</h5>
    </div>
  );
}

export default App;
