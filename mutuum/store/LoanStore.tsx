import { fetchLoans } from "../api/loanApi";

let loansArray: Array<any> = [];

export const loadLoans = async () => {
  const loans = await fetchLoans();
  //setLoans(loans);
}


export const setLoans = (loans: Array<any>) => {
  loansArray = loans;
}


export const addLoan = (loan: any) => {
  loansArray.push(loan);
};

export const getLoans = () => loansArray;
