import { createTransaction, createWallet } from "../wallets/transaction.js";
import { ethers } from "ethers";

const adminWalletId = await createWallet(); // A esta cuenta se transfiere para deducir fondos de otra cuenta
console.log(`Admin wallet creada: ${adminWalletId}`);


// Función para desplegar un nuevo contrato
async function deployContract(loanAmount, interest, deadline) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    console.log('Provider initialized:', provider);

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

    if (!contractAddress) {
        console.error("Error: deploy contract error.");
        return;
    }

    // 2. Conectar con el contrato
    const contract = connectContract(contractAddress);

    try {
        // Transferir los fondos desde la wallet del prestamista al contrato usando deposit()
        const tx = await contract.deposit({ value: ethers.utils.parseEther(loanAmount.toString()) });
        await tx.wait(); // Esperar la confirmación de la transacción

        await createTransaction(lenderWalletId, adminWalletId, loanAmount);  // deduccion de fondos

        console.log(`Fondos transferidos al contrato desde el prestamista: ${lenderWalletId}, Monto: ${loanAmount}`);
    } catch (error) {
        console.error('Error al transferir los fondos al contrato:', error);
        throw new Error('No se pudo completar la transferencia de fondos al contrato.');
    }

    console.log("Préstamo creado exitosamente con contrato desplegado y fondos transferidos.");
    return contractAddress;
}


// Función para que un prestatario tome un préstamo
async function takeLoanContract(contractAddress, borrowerWalletId) {
    const contract = connectContract(contractAddress);

    try {
        // Confirmar que el prestatario puede tomar el préstamo
        await contract.takeLoan(borrowerWalletId);

        // Obtener el monto del préstamo desde el contrato
        const loanAmount = await contract.getLoanAmount();
        console.log(`Monto del préstamo obtenido: ${loanAmount}`);

        // Transferir los fondos desde el contrato a la wallet del prestatario
        const tx = await contract.transferToWallet(borrowerWalletId, loanAmount);
        await tx.wait(); // Esperar la confirmación de la transacción
        console.log(`Fondos transferidos al prestatario: ${borrowerWalletId}, Monto: ${loanAmount}`);
    } catch (error) {
        console.error('Error al procesar el préstamo:', error);
        throw new Error('No se pudo completar el préstamo.');
    }

    console.log(`Préstamo tomado exitosamente por: ${borrowerWalletId}`);
}


// Conectar con el contrato
function connectContract(contractAddress) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, ContractLendingPost.abi, signer);
}

// Exportar funciones
export { createLoanContract, takeLoanContract };