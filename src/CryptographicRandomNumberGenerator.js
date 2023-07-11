import React, { useState } from 'react';

function CryptographicRandomNumberGenerator() {
  const [input, setInput] = useState('');
  const [trueRandomNum, setTrueRandomNum] = useState(null);
  const [pseudoRandomNum, setPseudoRandomNum] = useState(null);
  const [hybridRandomNum, setHybridRandomNum] = useState(null);

  const generateTrueRandomNumber = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const randomNumber = hashArray.slice(0, 8).reduce((acc, val) => acc * 256 + val, 0);
    return randomNumber; // Return the random number
  };

  const generatePseudoRandomNumber = () => {
    const seed = input ? input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    const randomNumber = (seed * 9301 + 49297) % 256; // Corrected formula
    return randomNumber; // Return the random number
  };

  const generateHybridRandomNumber = async () => {
    const trueRandomNumber = await generateTrueRandomNumber(); // Await the true random number
    const pseudoRandomNumber = generatePseudoRandomNumber(); // Pseudo random number is synchronous
    const hybridRandomNumber = (trueRandomNumber + pseudoRandomNumber) / 2;
    setHybridRandomNum(hybridRandomNumber);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleGenerateRandomNumbers = () => {
    generateTrueRandomNumber().then((randomNumber) => {
      setTrueRandomNum(randomNumber);
    });
    setPseudoRandomNum(generatePseudoRandomNumber());
    generateHybridRandomNumber();
  };

  return (
    <div className="container">
      <h2 className="title">Cryptographic Random Number Generator</h2>
      <div className="content-container">
        <div className="input-container">
          <label htmlFor="input" className="label">Enter a value:</label>
          <input type="text" id="input" value={input} onChange={handleInputChange} className="input" />
        </div>

        <button onClick={handleGenerateRandomNumbers} className="button">Generate Random Numbers</button>

        {trueRandomNum && <p className="result">True Random Number: {trueRandomNum}</p>}
        {pseudoRandomNum && <p className="result">Pseudo Random Number: {pseudoRandomNum}</p>}
        {hybridRandomNum && <p className="result">Hybrid Random Number: {hybridRandomNum}</p>}
      </div>

      
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
          font-size: 120%;
        }

        .title {
          font-size: 200%;
          color: purple;
        }

        .content-container {
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          margin-top: 20px;
        }

        .input-container {
          margin-bottom: 10px;
        }

        .label {
          display: block;
          font-size: 18px;
          color: blue;
          font-size: 200%;
        }

        .input {
          padding: 10px;
          width: 40%;
          border: 2px solid purple;
          border-radius: 5px;
        }

        .input:focus {
          outline: none;
          border-color: blue;
        }

        .button {
          padding: 10px 20px;
          background-color: purple;
          color: white;
          font-size: 110%;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }

        .button:hover {
          background-color: blue;
        }

        .result {
          margin-top: 20px;
          font-size: 120%;
          color: green;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default CryptographicRandomNumberGenerator;
