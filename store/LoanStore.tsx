// LoansStore.ts
let loansArray: Array<any> = [];

export const addLoan = (loan: any) => {
  loansArray.push(loan);
};

export const getLoans = () => loansArray;
