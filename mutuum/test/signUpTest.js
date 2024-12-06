import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { signUpUser } from '../app/(auth)/sign-up';

// Configurar chai-as-promised
chai.use(chaiAsPromised);
const { expect } = chai;

describe("signUpUser", () => {
  it("should throw an error if email or password is empty", async () => {
    // Verifica que lance un error si el email está vacío
    await expect(signUpUser("", "password"))
      .to.be.rejectedWith("Email and password must not be empty");

    // Verifica que lance un error si la password está vacía
    await expect(signUpUser("test@example.com", ""))
      .to.be.rejectedWith("Email and password must not be empty");

    // Verifica que lance un error si ambos están vacíos
    await expect(signUpUser("", ""))
      .to.be.rejectedWith("Email and password must not be empty");
  });

  it("should sign in successfully when email and password are provided", async () => {
    const result = await signUpUser("test@example.com", "password");

    // Verifica que el resultado sea exitoso
    expect(result).to.deep.equal({ success: true });
  });
});