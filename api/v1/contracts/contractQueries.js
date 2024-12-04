async function handleDepositContract(contractAddress, lenderWalletId, amount) {
    // Transferir fondos desde la wallet Circle al contrato
    await transferFunds({
        sourceWalletId: lenderWalletId,
        destinationBlockchainAddress: contractAddress,
        amount: amount,
        currency: "USD",
    });

    // Confirmar depósito en el contrato
    const contract = connectContract(contractAddress);
    await contract.confirmDeposit(amount);
}

async function handleTakeLoanContract(contractAddress, borrowerBlockchainAddress) {
    const contract = connectContract(contractAddress);
    await contract.takeLoan(borrowerBlockchainAddress);
}

async function handleCancelContract(contractAddress, lenderWalletId, amount) {
    const contract = connectContract(contractAddress);

    // Cancelar el contrato en la blockchain
    await contract.cancelLoan();

    // Transferir fondos de vuelta al prestamista
    await transferFunds({
        sourceBlockchainAddress: contractAddress,
        destinationWalletId: lenderWalletId,
        amount: amount,
        currency: "USD",
    });

    console.log("Contrato cancelado y fondos devueltos al prestamista.");
}

async function getContractState(contractAddress) {
    const contract = connectContract(contractAddress);

    const lender = await contract.lender();
    const borrower = await contract.borrower();
    const loanAmount = await contract.loanAmount();
    const isLoanTaken = await contract.isLoanTaken();
    const isClosed = await contract.isClosed();

    return {
        lender,
        borrower,
        loanAmount: loanAmount.toString(),
        isLoanTaken,
        isClosed,
    };
}



export {handleDepositContract, handleTakeLoanContract, getContractState, handleCancelContract};