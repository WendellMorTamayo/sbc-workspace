import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))

const publickey = new Web3.PublicKey("CgZR5yxZWYX53TSBub9etanvqNvAxBWQMsLj5fWYQCsz")
const decoded = base58.decode('4NBdgYahj1Tfa3x1gcjdoQCH6Cpgc7nrSwYjdPbdZAZA3j2bwm9o3uepBQZBczZeuxpXsoJjvyrYaavucFdxeMMr')
const keyPair = Web3.Keypair.fromSecretKey(decoded)

async function main(){
    const tokenMint = await token.createMint(
        connection,
        keyPair,
        publickey, // mint auth
        publickey, // freeze atuh
        9 //decimals
    )
    console.log(tokenMint.toBase58());
}

main();