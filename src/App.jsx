import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
function App() {
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("INR");
  const [convertedAmt, setConvertedAmt] = useState(0);
  const handleSubmit = async () => {
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const response = await resp.json();
    setConvertedAmt(Object.values(response.rates)[0]);
  };
  useEffect(() => {
    const getCurrencies = async () => {
      const curr = await fetch(`https://api.frankfurter.app/currencies?`);
      const data = await curr.json();
      setCurrencies(Object.entries(data));
    };
    getCurrencies();
  }, []);
  return (
    <div className="container">
      <input
        type="number"
        min={1}
        max={1000000000}
        placeholder="Enter Amount..."
        name="inputCurrency"
        id="inputCurrency"
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      />
      <select
        name="inputCurrency"
        onChange={(event) => {
          setFrom(event.target.value);
        }}
        id="inputCurrency"
      >
        <option value="">From</option>
        {currencies.map((currency) => {
          return (
            <option key={currency[0]} value={currency[0]}>
              {currency[1]}
            </option>
          );
        })}
      </select>
      <select
        onChange={(event) => {
          setTo(event.target.value);
        }}
        name="outputCurrency"
        id="outputCurrency"
      >
        <option value="">To</option>
        {currencies.map((currency) => {
          return (
            <option key={currency[0]} value={currency[0]}>
              {currency[1]}
            </option>
          );
        })}
      </select>
      <div className="outputBox">
        <h1>
          {convertedAmt} <i style={{ fontSize: "12px" }}>{to}</i>
        </h1>
        <button className="btn" onClick={handleSubmit}>
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;
