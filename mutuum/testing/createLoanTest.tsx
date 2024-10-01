import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateLoan from "../app/create_loan";

// Mock de la función alert
global.alert = jest.fn();

test("should show an alert if amount is less than or equal to 0", () => {
  const { getByPlaceholderText, getByText } = render(<CreateLoan />);

  // Simula el cambio en el campo "amount" con valor negativo
  const amountInput = getByPlaceholderText("Enter amount");
  fireEvent.changeText(amountInput, "-1");

  // Simula el click en el botón "Create Loan"
  const button = getByText("Create Loan");
  fireEvent.press(button);

  // Verifica que se haya mostrado la alerta para valores negativos
  expect(alert).toHaveBeenCalledWith("Amount must be greater than 0");

  // Verifica también el valor 0
  fireEvent.changeText(amountInput, "0");
  fireEvent.press(button);
  expect(alert).toHaveBeenCalledWith("Amount must be greater than 0");
});
