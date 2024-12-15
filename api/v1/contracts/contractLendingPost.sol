// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract ContractLendingPost {
    address public lender;          // Direccion del prestamista (blockchain)
    address public borrower;        // Direccion del prestatario (blockchain)
    uint256 public loanAmount;      // Monto del prestamo
    uint256 public interest;        // Interes del prestamo
    uint256 public deadline;        // Fecha limite en timestamp
    bool public isLoanTaken;        // Estado del prestamo
    bool public isClosed;           // Estado del contrato

    event DepositConfirmed(address indexed lender, uint256 amount);
    event LoanTaken(address indexed borrower, uint256 amount);
    event ContractClosed();
    event FundsDeposited(address indexed from, uint256 amount);

    constructor(
        uint256 _loanAmount,
        uint256 _interest,
        uint256 _deadline
    ) {
        lender = msg.sender; // El prestamista es quien despliega el contrato
        loanAmount = _loanAmount;
        interest = _interest;
        deadline = block.timestamp + _deadline; // Plazo en segundos
    }

    modifier onlyLender() {
        require(msg.sender == lender, "Solo el prestamista puede ejecutar esto");
        _;
    }

    modifier isActive() {
        require(!isClosed, "El contrato ya esta cerrado");
        _;
    }

    modifier loanNotTaken() {
        require(!isLoanTaken, "El prestamo ya fue tomado");
        _;
    }

    // Recibir fondos directamente desde Circle
    receive() external payable {
        require(!isLoanTaken, "El prestamo ya fue tomado");
        require(msg.value > 0, "Debe enviar fondos mayores a 0");
        emit FundsDeposited(msg.sender, msg.value);
    }


    function deposit() external payable {
        require(msg.value > 0, "Debe enviar fondos mayores a 0");
        require(msg.value == loanAmount, "El monto enviado debe coincidir con el del prestamo");
    }

    function transferToWallet(address payable recipient, uint256 amount) external onlyLender {
        require(address(this).balance >= amount, "Fondos insuficientes en el contrato");
        require(recipient != address(0), "Direccion invalida");

        recipient.transfer(amount);
    }


    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Confirmar deposito desde el backend despues de la transferencia de Circle
    function confirmDeposit(uint256 amount) external onlyLender isActive loanNotTaken {
        require(amount == loanAmount, "El monto depositado debe ser igual al del prestamo");

        emit DepositConfirmed(msg.sender, amount);
    }

    // Prestatario toma el prestamo
    function takeLoan(address _borrower) external isActive loanNotTaken {
        require(_borrower != address(0), "El prestatario debe tener una direccion valida");
        borrower = _borrower;
        isLoanTaken = true;

        emit LoanTaken(borrower, loanAmount);
    }

    // Cancelar contrato si no se ha tomado el prestamo
    function cancelLoan() external onlyLender isActive loanNotTaken {
        isClosed = true;
        emit ContractClosed();
    }

    
}
