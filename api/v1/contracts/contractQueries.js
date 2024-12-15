import fetch from "node-fetch";
import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import { get } from "https";

dotenv.config();

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas absolutas para los archivos ABI y Bytecode
const abiPath = path.resolve(__dirname, './v1_contracts_contractLendingPost_sol_ContractLendingPost.abi');
const binPath = path.resolve(__dirname, './v1_contracts_contractLendingPost_sol_ContractLendingPost.bin');

// Verificar que los archivos existen
if (!fs.existsSync(abiPath) || !fs.existsSync(binPath)) {
    throw new Error(`No se encontraron los archivos necesarios: ${abiPath}, ${binPath}`);
}

// Leer el ABI y el Bytecode
const contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const contractBytecode = fs.readFileSync(binPath, 'utf8').trim();

// Configurar la wallet
const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.JsonRpcProvider(process.env.RPC_URL) // Provider
);

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

async function initializeLoanContract(lenderWalletId, contractAddress, loanAmount) {
    try {
        // Conectar con el contrato
        const contract = connectContract(contractAddress);

        // Transferir fondos al contrato
        await transferToContract(lenderWalletId, contractAddress, loanAmount);

        console.log(`Fondos transferidos al contrato desde el prestamista: ${lenderWalletId}, Monto: ${loanAmount}`);
        console.log("Contrato inicializado exitosamente.");
        return contractAddress;
    } catch (error) {
        console.error('Error al inicializar el contrato:', error);
        throw new Error('No se pudo inicializar el contrato.');
    }
}


// Función principal para crear un préstamo y desplegar el contrato
async function createLoanContract(lenderWalletId, loanAmount, interest, deadline) {
    // 1. Desplegar el contrato
    const contractAddress = await deployContract(loanAmount, interest, deadline);

    if (!contractAddress) {
        console.error("Error: deploy contract error.");
        return;
    }

    console.log(`Contrato desplegado en la dirección: ${contractAddress}`);

    // 2. Inicializar el contrato
    await initializeLoanContract(lenderWalletId, 
        contractAddress, loanAmount);

    return contractAddress;
}



// Función para que un prestatario tome un préstamo
async function takeLoanContract(contractAddress, borrowerWalletId) {
    if (!contractAddress || !borrowerWalletId) {
        throw new Error('contractAddress y borrowerWalletId son requeridos.');
    }

    const contract = connectContract(contractAddress);

    try {
        // Obtener la dirección blockchain del prestatario
        const borrowerWalletBlockchainAddress = await getWalletBlockchainAddress(borrowerWalletId);
        
        console.log(`Conectando al contrato ${contractAddress}...`);
        console.log(`Dirección blockchain del prestatario: ${borrowerWalletBlockchainAddress}`);

        // Confirmar que el prestatario puede tomar el préstamo
        const txTakeLoan = await contract.takeLoan(borrowerWalletBlockchainAddress);
        await txTakeLoan.wait();
        console.log(`Préstamo tomado en el contrato: ${contractAddress}`);

        // Obtener el monto del préstamo desde el contrato
        const loanAmount = await contract.getLoanAmount();
        console.log(`Monto del préstamo obtenido: ${loanAmount}`);

        // Transferir los fondos desde el contrato a la wallet del prestatario
        const txTransfer = await contract.transferToWallet(borrowerWalletId, loanAmount);
        await txTransfer.wait(); // Esperar la confirmación de la transacción
        console.log(`Fondos transferidos al prestatario: ${borrowerWalletId}, Monto: ${loanAmount}`);
    } catch (error) {
        console.error('Error al procesar el préstamo:', error.message);
        throw new Error('No se pudo completar el préstamo.');
    }

    console.log(`Préstamo tomado exitosamente por: ${borrowerWalletId}`);
}

// Conectar con el contrato
function connectContract(contractAddress) {
    if (!contractAddress) {
        throw new Error('La dirección del contrato es requerida.');
    }
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

// Función para obtener la dirección de blockchain de una wallet en Circle
async function getWalletBlockchainAddress(walletId) {
    try {
        const url = `https://api.circle.com/v1/wallets/${walletId}`;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.CIRCLE_API_KEY}`,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        // Obtener la primera dirección de blockchain asociada
        const blockchainAddress = data.data?.chainAddresses?.[0]?.address;

        if (!blockchainAddress) {
            throw new Error(`No blockchain address found for wallet ID: ${walletId}`);
        }

        console.log(`Blockchain address for wallet ${walletId}: ${blockchainAddress}`);
        return blockchainAddress;
    } catch (error) {
        console.error(`Error fetching blockchain address for wallet ${walletId}:`, error.message);
        throw error;
    }
}

export { initializeLoanContract, createLoanContract, takeLoanContract, getWalletBlockchainAddress };