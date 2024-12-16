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
    const deploymentTx = await contract.deploymentTransaction();
    console.log(`Hash de la transacción de despliegue: ${deploymentTx.hash}`);
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
async function takeLoanContract(contractAddress, borrowerWalletId, amount) {
    if (!contractAddress || !borrowerWalletId || !amount) {
        throw new Error('contractAddress, borrowerWalletId y amount son requeridos.');
    }

    const backendWalletAddress = wallet.address; // Dirección de la wallet backend configurada

    try {
        console.log(`Iniciando flujo para tomar préstamo desde el contrato: ${contractAddress}`);

        // 1. Obtener el contrato y transferir fondos a la wallet backend
        const contract = connectContract(contractAddress);
        console.log(`Transfiriendo ${amount} desde el contrato a la wallet backend: ${backendWalletAddress}`);
        const tx = await contract.transferToWallet(backendWalletAddress, amount);
        console.log('Esperando confirmación de la transacción...');
        const receipt = await tx.wait(); // Confirmar transacción
        const transactionHash = receipt.transactionHash;
        console.log(`Transferencia desde el contrato completada. Hash de la transacción: ${transactionHash}`);

        // 2. Depositar los fondos en la wallet de Circle
        console.log(`Iniciando depósito en la wallet de Circle: ${borrowerWalletId}`);
        const depositResult = await depositToCircle(borrowerWalletId, transactionHash);
        console.log(`Depósito en Circle completado. Detalles:`, depositResult);

        console.log(`Préstamo tomado y fondos depositados exitosamente en Circle.`);
        return depositResult;
    } catch (error) {
        console.error('Error al procesar el flujo de toma de préstamo:', error.message);
        throw new Error('No se pudo completar el proceso de toma de préstamo.');
    }
}


// Conectar con el contrato
function connectContract(contractAddress) {
    if (!contractAddress) {
        throw new Error('La dirección del contrato es requerida.');
    }
    return new ethers.Contract(contractAddress, contractABI, wallet);
}




async function transferToContract(walletId, contractAddress, amount) {
    // 1. Transferir desde la wallet de Circle a la wallet backend
    const url = "https://api.circle.com/v1/transfers";
    const backendWalletAddress = wallet.address; // Dirección de la wallet backend

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
                address: backendWalletAddress,
                chain: "ETH-SEPOLIA",
            },
            amount: {
                amount: amount.toString(),
                currency: "USD",
            },
            metadata: {
                memo: "Transferencia a wallet backend",
            },
        }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al transferir fondos desde Circle");
    }

    console.log(`Transferencia a wallet backend completada. ID: ${data.id}, Hash: ${data.transactionHash}`);

    // 2. Transferir desde la wallet backend al contrato
    const contract = connectContract(contractAddress);
    const tx = await contract.transferToContract(amount);
    await tx.wait();
    console.log(`Fondos transferidos al contrato inteligente. Hash: ${tx.hash}`);

    return tx.hash;
}


// async function transferFromContract(contractAddress, backendWalletAddress, amount) {
//     const contract = connectContract(contractAddress);

//     try {
//         console.log(`Iniciando transferencia desde contrato: ${contractAddress} a la wallet: ${backendWalletAddress}`);
//         const tx = await contract.transferToWallet(backendWalletAddress, amount);
//         await tx.wait(); // Esperar confirmación
//         console.log(`Transferencia exitosa desde contrato a wallet backend. Monto: ${amount}`);
//     } catch (error) {
//         console.error("Error transfiriendo desde el contrato:", error.message);
//         throw new Error('No se pudo transferir los fondos desde el contrato.');
//     }
// }


async function depositToCircle(walletId, transactionHash) {
    const url = "https://api.circle.com/v1/deposits";
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idempotencyKey: `${Date.now()}-${transactionHash}`,
            source: {
                type: "blockchain",
                transactionHash: transactionHash, // Hash de la transacción on-chain
                chain: "ETH-SEPOLIA",
            },
            destination: {
                type: "wallet",
                id: walletId, // Wallet de Circle
            },
        }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        console.log(`Depósito exitoso en Circle. Hash on-chain: ${data.transactionHash}`);
        return data;
    } else {
        console.error("Error realizando depósito en Circle:", data);
        throw new Error(data.message || "Depósito fallido");
    }
}


async function getContractBalance(contractAddress) {
    try {
        const contract = connectContract(contractAddress);
        const balance = await contract.getContractBalance();
        console.log(`Balance del contrato (${contractAddress}): ${balance}`);
        return balance;
    } catch (error) {
        console.error('Error obteniendo el balance del contrato:', error.message);
        throw error;
    }
}



export { initializeLoanContract, createLoanContract, takeLoanContract, getContractBalance };