import React, { useState } from "react";
import axios from "axios";
import "./index.css"; 

function App() {
  const [loanAmount, setLoanAmount] = useState(""); 
  const [interestRate, setInterestRate] = useState("");
  const [terms, setTerms] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = async () => {
    const parsedLoanAmount = parseFloat(loanAmount);
    const parsedInterestRate = parseFloat(interestRate);
    const parsedTerms = parseInt(terms);

    if (isNaN(parsedLoanAmount) || isNaN(parsedInterestRate) || isNaN(parsedTerms)) {
      console.error("Invalid input values");
    }

    const options = {
      method: "GET",
      url: "https://mortgage-monthly-payment-calculator.p.rapidapi.com/revotek-finance/mortgage/monthly-payment",
      params: {
        loanAmount: parsedLoanAmount,
        interestRate: parsedInterestRate,
        terms: parsedTerms
      },
      headers: {
        "X-RapidAPI-Key": "931562259emsh725cb21c9c42981p16a7c1jsn8b28145da88e",
        "X-RapidAPI-Host": "mortgage-monthly-payment-calculator.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      setMonthlyPayment(response.data.monthlyPayment.toFixed());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <h1>
          <i>Mortgage Calculator</i>
        </h1>
        <input
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Loan Amount (no commas)"
          type="text"
        />
        <input
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Interest Rate (decimal form)"
          type="text"
        />
        <input
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Terms"
          type="text"
        />
        <button onClick={calculateMortgage}>Calculate</button>
        <div className="result">
          Monthly Payment: <b>${monthlyPayment}</b>
        </div>
      </div>
    </div>
  );
}

export default App;
