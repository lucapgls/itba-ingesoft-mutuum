const chai = require("chai");
import chaiAsPromised from "chai-as-promised";
import { signInUser } from "../app/(auth)/sign-in";

// Configurar chai-as-promised
chai.use(chaiAsPromised);
const { expect } = chai;

describe("signInUser", () => {
  it("should throw an error if email or password is empty", async () => {
    // Verifica que lance un error si el email está vacío
    await expect(signInUser("", "password")).to.be.rejectedWith(
      "Email and password must not be empty"
    );

    // Verifica que lance un error si la password está vacía
    await expect(signInUser("test@example.com", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );

    // Verifica que lance un error si ambos están vacíos
    await expect(signInUser("", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
  });

  it("should sign in successfully when email and password are provided", async () => {
    const result = await signInUser("test@example.com", "password");

    // Verifica que el resultado sea exitoso
    expect(result).to.deep.equal({ success: true });
  });
});
