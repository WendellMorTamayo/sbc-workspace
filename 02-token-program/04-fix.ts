import { NoInstructionsToSendError } from '@metaplex-foundation/js'
import * as Web3 from '@solana/web3.js'
import base58 from "bs58"

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
const publicKey = new Web3.PublicKey("CgZR5yxZWYX53TSBub9etanvqNvAxBWQMsLj5fWYQCsz")
const decoded = base58.decode('4NBdgYahj1Tfa3x1gcjdoQCH6Cpgc7nrSwYjdPbdZAZA3j2bwm9o3uepBQZBczZeuxpXsoJjvyrYaavucFdxeMMr')
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const transaction = new Web3.Transaction()
const programId = new Web3.PublicKey("6NbPNUHAH6WLX8tKsoRpgMUDnKM7mCUcf79W7BAxtNgM")
async function main() {
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId,
    });

    transaction.add(instruction);
    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keyPair],
    )
    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});