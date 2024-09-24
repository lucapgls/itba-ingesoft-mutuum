import { fetchLoans, fetchLoanRequirements } from "../api/loanApi";

let loansArray: Array<any> = [];

export const loadLoans = async () => {
  const loans = await fetchLoans();
  if (Array.isArray(loans)) {
    for (const loan of loans) {
      const requirements = await fetchLoanRequirements(loan.id);
      loan.requirements = requirements; // Agrega los requisitos al préstamo
    }
    setLoans(loans);
  } else {
    console.log('No loans available or an error occurred.');
  }
}


export const setLoans = (loans: Array<any>) => {
  loansArray = loans;
}


export const addLoan = (loan: any) => {
  loansArray.push(loan);
};

export const getLoans = () => loansArray;
