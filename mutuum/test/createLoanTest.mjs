import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { CreateLoan } from '../app/create_loan.js';

// Configurar chai-as-promised
chai.use(chaiAsPromised);
const { expect } = chai;

describe("createLoan", () => {
  it("should throw an error if amount is less than or equal to 0", async () => {
    // Verifica que lance un error si la cantidad es negativa
    await expect(CreateLoan(-1)).to.be.rejectedWith("Amount must be greater than 0");

    // Verifica que lance un error si la cantidad es 0
    await expect(CreateLoan(0)).to.be.rejectedWith("Amount must be greater than 0");
  });

  it("should create a loan successfully when amount is greater than 0", async () => {
    const result = await CreateLoan(1000);

    // Verifica que el resultado sea exitoso
    expect(result).to.deep.equal({ success: true, amount: 1000 });
  });
});