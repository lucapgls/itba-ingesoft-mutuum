// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract ContractLendingPost {
    address public lender;          // Dirección del prestamista (blockchain)
    address public borrower;        // Dirección del prestatario (blockchain)
    uint256 public loanAmount;      // Monto del préstamo
    uint256 public interest;        // Interés del préstamo
    uint256 public deadline;        // Fecha límite en timestamp
    bool public isLoanTaken;        // Estado del préstamo
    bool public isClosed;           // Estado del contrato

    event DepositConfirmed(address indexed lender, uint256 amount);
    event LoanTaken(address indexed borrower, uint256 amount);
    event ContractClosed();

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
        require(!isClosed, "El contrato ya está cerrado");
        _;
    }

    modifier loanNotTaken() {
        require(!isLoanTaken, "El préstamo ya fue tomado");
        _;
    }

    // Confirmar depósito desde el backend después de la transferencia de Circle
    function confirmDeposit(uint256 amount) external onlyLender isActive loanNotTaken {
        require(amount == loanAmount, "El monto depositado debe ser igual al del préstamo");

        emit DepositConfirmed(msg.sender, amount);
    }

    // Prestatario toma el préstamo
    function takeLoan(address _borrower) external isActive loanNotTaken {
        require(_borrower != address(0), "El prestatario debe tener una dirección válida");
        borrower = _borrower;
        isLoanTaken = true;

        emit LoanTaken(borrower, loanAmount);
    }

    // Cancelar contrato si no se ha tomado el préstamo
    function cancelLoan() external onlyLender isActive loanNotTaken {
        isClosed = true;
        emit ContractClosed();
    }
}
