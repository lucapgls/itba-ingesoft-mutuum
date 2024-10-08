import { fetchLoans, fetchLoanRequirements, createLendingPostAndRequirements, fetchLoansByUserId } from "api/loan";

let loansArray: Array<any> = [];

export const loadLoans = async () => {
  const loans = await fetchLoans();
  if (Array.isArray(loans)) {
    for (const loan of loans) {
      const requirements = await fetchLoanRequirements(loan.id);
      loan.requirements = requirements; 
    }
    setLoans(loans);
  } else {
    console.log('No loans available or an error occurred.');
  }
}


export const setLoans = (loans: Array<any>) => {
  loansArray = loans;
}


export const addLoan = async (
  lenderId: string,
  initialAmount: number,
  availableAmount: number,
  interest: number,
  deadline: string,
  requirements: Array<{ name: string; completed: boolean }>
) => {
  await createLendingPostAndRequirements(lenderId, initialAmount, availableAmount, interest, deadline, requirements);
  await loadLoans();
  console.log('Loan added successfully:');

};

export const getLoansByUserId = async (userId: string) => {
  const loans = await fetchLoansByUserId(userId);
  if (Array.isArray(loans)) {
    for (const loan of loans) {
      const requirements = await fetchLoanRequirements(loan.id);
      loan.requirements = requirements;
    }
    return loans;
  } else {
    console.log('No loans available or an error occurred.');
  }
}


export const getLoans = () => loansArray;
