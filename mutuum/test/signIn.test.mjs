import signInUser from "../app/(auth)/sign-in.tsx";

describe("signInUser", () => {
  it("should throw an error if email or password is empty", async () => {
    await expect(signInUser("", "password")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
    await expect(signInUser("test@example.com", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
    await expect(signInUser("", "")).to.be.rejectedWith(
      "Email and password must not be empty"
    );
  });

  it("should sign in successfully when email and password are provided", async () => {
    const result = await signInUser("test@example.com", "password");
    expect(result).to.deep.equal({ success: true });
  });
});
