import { fetchLoans, fetchLoanRequirements, createLendingPost, createLoanRequirements } from "../api/loanApi";

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
  const result = await createLendingPostAndRequirements(lenderId, initialAmount, availableAmount, interest, deadline, requirements);

  if (result) {
    const { lendingPostId, requirements } = result;
    const newLoan = {
      id: lendingPostId,
      lender_id: lenderId,
      initial_amount: initialAmount,
      available_amount: availableAmount,
      interest: interest,
      dead_line: deadline,
      requirements: requirements,
    };
    await loadLoans();
    console.log('Loan added successfully:', newLoan);
  } else {
    console.log('Failed to add new loan');
  }
};


export const createLendingPostAndRequirements = async (
  lenderId: string,
  initialAmount: number,
  availableAmount: number,
  interest: number,
  deadline: string,
  requirements: Array<{ name: string; completed: boolean }>
) => {
  const lendingPostId = await createLendingPost(lenderId, initialAmount, availableAmount, interest, deadline);

  if (lendingPostId) {
    await createLoanRequirements(lendingPostId, requirements);
    return { lendingPostId, requirements };
  } else {
    console.log('Failed to create lending post');
    return null;
  }
};


export const getLoans = () => loansArray;
