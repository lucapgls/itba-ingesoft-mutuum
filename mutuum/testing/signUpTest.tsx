import React from "react";
import { render } from "@testing-library/react-native";
import CreateLoan from "../app/create_loan";

import { signUpUser } from "../app/(auth)/sign-up";

test("should throw an error if email or password is empty", async () => {
  // Verifica que lance un error si el email está vacío
  await expect(signUpUser("", "password")).rejects.toThrow(
    "Email and password must not be empty",
  );

  // Verifica que lance un error si la password está vacía
  await expect(signUpUser("test@example.com", "")).rejects.toThrow(
    "Email and password must not be empty",
  );

  // Verifica que lance un error si ambos están vacíos
  await expect(signUpUser("", "")).rejects.toThrow(
    "Email and password must not be empty",
  );
});

test("should sign in successfully when email and password are provided", async () => {
  const result = await signUpUser("test@example.com", "password");

  // Verifica que el resultado sea exitoso
  expect(result).toEqual({ success: true });
});
