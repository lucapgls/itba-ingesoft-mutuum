import { createTransaction } from "../wallets/transaction.js";
import { ethers } from "ethers";

// Función para desplegar un nuevo contrato
async function deployContract(loanAmount, interest, deadline) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = provider.getSigner();
    const contractFactory = new ethers.ContractFactory(ContractLendingPost.abi, ContractLendingPost.bytecode, signer);

    const contract = await contractFactory.deploy(loanAmount, interest, deadline);
    await contract.deployed();

    console.log(`Contrato desplegado en la dirección: ${contract.address}`);
    return contract.address;
}

// Función principal para crear un préstamo y desplegar el contrato
async function createLoanContract(lenderWalletId, loanAmount, interest, deadline) {
    // 1. Desplegar el contrato 
    const contractAddress = await deployContract(loanAmount, interest, deadline);

    // 2. Realizar la transferencia de fondos utilizando Circle API
    const transaction = await createTransaction(lenderWalletId, contractAddress, loanAmount);

    if (!transaction || transaction.status !== "pending") {
        console.error("Error: La transferencia no se pudo completar correctamente.");
        return;
    }

    console.log("Préstamo creado y fondos transferidos al contrato.");

    return contractAddress;
}

// Función para que un prestatario tome un préstamo
async function takeLoanContract(contractAddress, borrowerWalletId) {
    const contract = connectContract(contractAddress);

    // Confirmar que el prestatario puede tomar el préstamo
    await contract.takeLoan(borrowerWalletId);

    console.log(`Préstamo tomado por: ${borrowerWalletId}`);
}

// Conectar con el contrato
function connectContract(contractAddress) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, ContractLendingPost.abi, signer);
}

// Exportar funciones
export { createLoanContract, takeLoanContract };