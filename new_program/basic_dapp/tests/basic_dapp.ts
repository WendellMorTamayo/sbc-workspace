import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BasicDapp } from "../target/types/basic_dapp";
import { assert } from "chai";

describe("basic_dapp", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const keyPair = anchor.web3.Keypair.generate();
  const program = anchor.workspace.BasicDapp as Program<BasicDapp>;

  it("Is initialized!", async () => {
    const firstName = "John"
    const lastName = "Doe"

    await program.methods.initialize(
      firstName,
      lastName,
    ).accounts({
      customer: keyPair.publicKey,
      signer: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([keyPair]).rpc();

    const customerAccount = await program.account.customer.fetch(keyPair.publicKey);

    assert.ok(firstName == customerAccount.firstName);
    assert.ok(lastName == customerAccount.lastName);
  });
});