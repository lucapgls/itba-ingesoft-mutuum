// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract LendingPost {
    address public lender;
    address public borrower;
    address public token; // Dirección del token USDC
    uint256 public loanAmount;
    uint256 public interest;
    uint256 public deadline;
    bool public isLoanTaken;
    bool public isClosed;

    event DepositConfirmed(address indexed lender, uint256 amount);
    event LoanTaken(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 totalAmount);
    event LoanCancelled(address indexed lender);

    constructor(
        address _token,
        uint256 _loanAmount,
        uint256 _interest,
        uint256 _deadline
    ) {
        lender = msg.sender; // El prestamista despliega el contrato
        token = _token;
        loanAmount = _loanAmount;
        interest = _interest;
        deadline = block.timestamp + _deadline; // Plazo en segundos
    }

    modifier onlyLender() {
        require(msg.sender == lender, "Solo el prestamista puede ejecutar esta acción");
        _;
    }

    modifier onlyBorrower() {
        require(msg.sender == borrower, "Solo el prestatario puede ejecutar esta acción");
        _;
    }

    modifier isActive() {
        require(!isClosed, "El contrato ya está cerrado");
        _;
    }

    // Confirmar depósito (llamado tras la transferencia desde Circle al contrato)
    function confirmDeposit(uint256 amount) external onlyLender isActive {
        require(amount == loanAmount, "El monto depositado debe ser igual al del préstamo");
        emit DepositConfirmed(msg.sender, amount);
    }

    // El prestatario toma el préstamo (registrado después de la transferencia)
    function takeLoan(address _borrower) external onlyLender isActive {
        require(!isLoanTaken, "El préstamo ya fue tomado");
        borrower = _borrower;
        isLoanTaken = true;

        emit LoanTaken(borrower, loanAmount);
    }

    // Confirmar reembolso (llamado tras la transferencia desde Circle al contrato)
    function confirmRepayment(uint256 totalAmount) external onlyBorrower isActive {
        require(totalAmount == loanAmount + interest, "El monto reembolsado no es correcto");

        // Marcar el contrato como cerrado
        isClosed = true;

        emit LoanRepaid(msg.sender, totalAmount);
    }

    // Cancelar el préstamo (si no se tomó)
    function cancelLoan() external onlyLender isActive {
        require(!isLoanTaken, "El préstamo ya fue tomado");
        isClosed = true;

        emit LoanCancelled(msg.sender);
    }
}
