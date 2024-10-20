import { fetchLendingPosts, fetchLendingPostRequirements, createLendingPostAndRequirements, fetchLendingPostsByUserId } from "api/lendingPost";

let loansArray: Array<any> = [];

export const loadLoans = async () => {
  const loans = await fetchLendingPosts();
  if (Array.isArray(loans)) {
    for (const loan of loans) {
      const requirements = await fetchLendingPostRequirements(loan.id);
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
  requirements: Array<{ name: string; completed: boolean }>,
  quotas: number
) => {
  await createLendingPostAndRequirements(lenderId, initialAmount, availableAmount, interest, deadline, requirements, quotas);
  await loadLoans();
  console.log('Loan added successfully:');

};

export const getLendingPostsByUserId = async (userId: string) => {
  const loans = await fetchLendingPostsByUserId(userId);
  if (Array.isArray(loans)) {
    for (const loan of loans) {
      const requirements = await fetchLendingPostRequirements(loan.id);
      loan.requirements = requirements;
    }
    return loans;
  } else {
    console.log('No loans available or an error occurred.');
  }
}


export const getLoans = () => loansArray;
