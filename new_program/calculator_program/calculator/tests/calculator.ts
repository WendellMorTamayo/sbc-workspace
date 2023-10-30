import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { assert } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const keyPair = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Calculator as Program<Calculator>;

  it("Is initialized!", async () => {

    // Add your test here.
    const num1: number = 2
    const num2: number = 1
    await program.methods.initialize().accounts({
      calculator: keyPair.publicKey,
      signer: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([keyPair]).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);

  });
  it("Should Add", async () => {
    // Add your test here.
    const num1: number = 2
    const num2: number = 1
    await program.methods.add(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(num1 + num2 == Number(calculatorAccount.result));

  });
  it("Should Subtract!", async () => {
    // Add your test here.
    const num1: number = 2
    const num2: number = 1
    await program.methods.subtract(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(num1 - num2 == Number(calculatorAccount.result));
  });
  it("Should Multiply!", async () => {
    
    // Add your test here.
    const num1: number = 2
    const num2: number = 1
    await program.methods.multiply(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(num1 * num2 == Number(calculatorAccount.result));

  });
  it("Should Divide!", async () => {
    
    // Add your test here.
    const num1: number = 2
    const num2: number = 1
    await program.methods.divide(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(num1 / num2 == Number(calculatorAccount.result));
    assert.ok(num1 % num2 == Number(calculatorAccount.remainder));
  });
});
