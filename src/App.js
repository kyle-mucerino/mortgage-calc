import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 

function App() {
  const [currentLoanAmount, setCurrentLoanAmount] = useState("");
  const [currentInterestRate, setCurrentInterestRate] = useState("");
  const [currentTerms, setCurrentTerms] = useState("");
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(null);
  const [newLoanAmount, setNewLoanAmount] = useState("");
  const [newInterestRate, setNewInterestRate] = useState("");
  const [newTerms, setNewTerms] = useState("");
  const [newMonthlyPayment, setNewMonthlyPayment] = useState(null);

  const calculateCurrentMortgage = async () => {
    const parsedCurrentLoanAmount = parseFloat(currentLoanAmount);
    const parsedCurrentInterestRate = parseFloat(currentInterestRate);
    const parsedCurrentTerms = parseInt(currentTerms);

    if (
      isNaN(parsedCurrentLoanAmount) ||
      isNaN(parsedCurrentInterestRate) ||
      isNaN(parsedCurrentTerms)
    ) {
      console.error("Invalid input values");
    }

    const options = {
      method: "GET",
      url: "https://mortgage-monthly-payment-calculator.p.rapidapi.com/revotek-finance/mortgage/monthly-payment",
      params: {
        loanAmount: parsedCurrentLoanAmount,
        interestRate: parsedCurrentInterestRate,
        terms: parsedCurrentTerms
      },
      headers: {
        "X-RapidAPI-Key": "931562259emsh725cb21c9c42981p16a7c1jsn8b28145da88e",
        "X-RapidAPI-Host": "mortgage-monthly-payment-calculator.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      setCurrentMonthlyPayment(response.data.monthlyPayment.toFixed());
    } catch (error) {
      console.error(error);
    }
  };

  const calculateNewMortgage = async () => {
    const parsedNewLoanAmount = parseFloat(newLoanAmount);
    const parsedNewInterestRate = parseFloat(newInterestRate);
    const parsedNewTerms = parseInt(newTerms);

    if (
      isNaN(parsedNewLoanAmount) ||
      isNaN(parsedNewInterestRate) ||
      isNaN(parsedNewTerms)
    ) {
      console.error("Invalid input values");
    }

    const options = {
      method: "GET",
      url: "https://mortgage-monthly-payment-calculator.p.rapidapi.com/revotek-finance/mortgage/monthly-payment",
      params: {
        loanAmount: parsedNewLoanAmount,
        interestRate: parsedNewInterestRate,
        terms: parsedNewTerms
      },
      headers: {
        "X-RapidAPI-Key": "931562259emsh725cb21c9c42981p16a7c1jsn8b28145da88e",
        "X-RapidAPI-Host": "mortgage-monthly-payment-calculator.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      setNewMonthlyPayment(response.data.monthlyPayment.toFixed());
    } catch (error) {
      console.error(error);
    }
  };

  function compareMortgages(
    currentMonthlyPayment,
    newMonthlyPayment,
    currentTerms,
    newTerms
  ) {
    const breakevenPoint =
      currentMonthlyPayment - newMonthlyPayment !== 0
        ? (currentTerms * 12 * currentMonthlyPayment) /
          (currentMonthlyPayment - newMonthlyPayment)
        : Infinity;
    const breakevenYears = breakevenPoint / 12;

    const currentTotalPayment = currentMonthlyPayment * currentTerms * 12;
    const newTotalPayment = newMonthlyPayment * newTerms * 12;
    const longTermSavings = currentTotalPayment - newTotalPayment;

    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

    return { breakevenYears, longTermSavings, monthlySavings };
  }

  const { breakevenYears, longTermSavings, monthlySavings } = compareMortgages(
    currentMonthlyPayment,
    newMonthlyPayment,
    currentTerms,
    newTerms
  );

  return (
    <React.Fragment>
      <div className="app-container">
        <div className="current-input-container">
          <div className="current">
            <h1>
              <i>Current Mortgage</i>
            </h1>
            <input
              value={currentLoanAmount}
              onChange={(e) => setCurrentLoanAmount(e.target.value)}
              placeholder="Loan Amount (no commas)"
              type="text"
            />
            <input
              value={currentInterestRate}
              onChange={(e) => setCurrentInterestRate(e.target.value)}
              placeholder="Interest Rate (decimal)"
              type="text"
            />
            <input
              value={currentTerms}
              onChange={(e) => setCurrentTerms(e.target.value)}
              placeholder="Terms"
              type="text"
            />
            <div className="button-container">
              <button onClick={calculateCurrentMortgage}>Calculate</button>
            </div>
            <div className="result">
              Monthly Payment: <b>${currentMonthlyPayment}</b>
            </div>
          </div>
        </div>
        <div className="new-input-container">
          <div className="new">
            <h1>
              <i>New Mortgage</i>
            </h1>
            <input
              value={newLoanAmount}
              onChange={(e) => setNewLoanAmount(e.target.value)}
              placeholder="Loan Amount (no commas)"
              type="text"
            />
            <input
              value={newInterestRate}
              onChange={(e) => setNewInterestRate(e.target.value)}
              placeholder="Interest Rate (decimal)"
              type="text"
            />
            <input
              value={newTerms}
              onChange={(e) => setNewTerms(e.target.value)}
              placeholder="Terms"
              type="text"
            />
            <div className="button-container">
              <button onClick={calculateNewMortgage}>Calculate</button>
            </div>
            <div className="result">
              Monthly Payment: <b>${newMonthlyPayment}</b>
            </div>
          </div>
        </div>
        <div className="calculations">
          <p>
            <i>Breakeven Time:</i> <br></br><b>{breakevenYears.toFixed(2)} years</b>
          </p>
          <p>
            <i>Long-Term-Savings:</i> <b>${longTermSavings.toFixed(2)}</b>
          </p>
          <p>
            <i>Monthly Savings</i> <b>${monthlySavings.toFixed(2)}</b>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
