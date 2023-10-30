import "dotenv/config"
import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))
const publickey = new Web3.PublicKey("CgZR5yxZWYX53TSBub9etanvqNvAxBWQMsLj5fWYQCsz")
const decoded = base58.decode('4NBdgYahj1Tfa3x1gcjdoQCH6Cpgc7nrSwYjdPbdZAZA3j2bwm9o3uepBQZBczZeuxpXsoJjvyrYaavucFdxeMMr')
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const tokenMint = "FdEmD9e6kqzHmTMnbL93nq5cnzTMj9Z2FLNZNV3PTb4G"

async function main(){
    const tokenAccount  = await token.createAccount(
        connection, // connection
        keyPair, // signer
        new Web3.PublicKey(tokenMint), // mint public key
        publickey, // owner of the token-account
    );
    console.log(tokenAccount.toBase58());
}

main();