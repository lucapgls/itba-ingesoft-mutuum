import fetch from "node-fetch";
import { ethers } from "ethers";
import fs from 'fs';

// Lee el ABI y el bytecode del contrato
const contractABI = JSON.parse(fs.readFileSync('./v1_contracts_ContractLendingPost_sol_ContractLendingPost.abi', 'utf8'));
const contractBytecode = fs.readFileSync('./v1_contracts_ContractLendingPost_sol_ContractLendingPost.bin', 'utf8');


const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, 
        new ethers.JsonRpcProvider(process.env.RPC_URL));

// Función para desplegar un nuevo contrato
async function deployContract(loanAmount, interest, deadline) {
    
    const contractFactory = new ethers.ContractFactory(
        contractABI,
        contractBytecode,
        wallet
    );
    const contract = await contractFactory.deploy(loanAmount, interest, deadline);
    console.log("Esperando que el contrato se despliegue...");
    await contract.waitForDeployment(); 
    

    console.log(`Contrato desplegado en la dirección: ${contract.target}`);

    return contract.target;
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

        await transferToContract(lenderWalletId, contractAddress, loanAmount);

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
    return new ethers.Contract(contractAddress, ContractLendingPost.abi, wallet);
}



async function transferToContract(walletId, contractAddress, amount) {
    const url = "https://api.circle.com/v1/transfers";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
        body: JSON.stringify({
            source: {
                type: "wallet",
                id: walletId,
            },
            destination: {
                type: "blockchain",
                address: contractAddress,
                chain: "ETH-SEPOLIA",
            },
            amount: {
                amount: amount.toString(),
                currency: "USD",
            },
            metadata: {
                memo: "Fondos para contrato inteligente",
            },
        }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al transferir fondos");
    }

    return data;
}


// Exportar funciones
export { createLoanContract, takeLoanContract };