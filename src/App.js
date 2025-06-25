import { useEffect, useState } from "react";

// Example API URL:
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [currencyType, setCurrencyType] = useState("USD");
  const [toConvert, setToConvert] = useState("EUR");
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(function () {
    if (currencyType === toConvert || price <= 0) {
      setResult(null);
      return;
    }
    async function calculateCurl() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${price}&from=${currencyType}&to=${toConvert}`
      );

      const data = await res.json();
      if(data.rates && data.rates[toConvert])
      {
        setResult(data.rates[toConvert])
      }
      else{
        setResult(null)
      }
    }
    calculateCurl();
  }, [price, currencyType, toConvert]);

  return (
    <div>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        value={currencyType}
        onChange={(e) => setCurrencyType(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toConvert} onChange={(e) => setToConvert(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result}</p>
    </div>
  );
}
