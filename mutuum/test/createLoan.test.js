import createLoan from '../app/create_loan.tsx';

describe("CreateLoan", () => {
  it("should throw an error if amount is less than or equal to 0", async () => {
    await expect(CreateLoan(-1)).to.be.rejectedWith("Amount must be greater than 0");
    await expect(CreateLoan(0)).to.be.rejectedWith("Amount must be greater than 0");
  });

  it("should create a loan successfully when amount is greater than 0", async () => {
    const result = await CreateLoan(1000);
    expect(result).to.deep.equal({ success: true, amount: 1000 });
  });
});
