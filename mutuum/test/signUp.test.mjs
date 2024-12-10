import signUpUser from "../app/(auth)/sign-up.tsx";

describe("signUpUser", () => {
  it("should throw an error if email or password is empty", async () => {
    await expect(signUpUser("", "password")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
    await expect(signUpUser("test@example.com", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
    await expect(signUpUser("", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
  });

  it("should sign up successfully when email and password are provided", async () => {
    const result = await signUpUser("test@example.com", "password");
    expect(result).to.deep.equal({ success: true });
  });
});
