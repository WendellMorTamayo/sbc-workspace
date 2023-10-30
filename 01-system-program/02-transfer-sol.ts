import * as Web3 from '@solana/web3.js';
import base58 from 'bs58'

async function main() {
    const decoded = base58.decode('4NBdgYahj1Tfa3x1gcjdoQCH6Cpgc7nrSwYjdPbdZAZA3j2bwm9o3uepBQZBczZeuxpXsoJjvyrYaavucFdxeMMr')
    const keyPair = Web3.Keypair.fromSecretKey(decoded)

    const publicKeyFrom = new Web3.PublicKey('CgZR5yxZWYX53TSBub9etanvqNvAxBWQMsLj5fWYQCsz');
    const publicKeyTo = new Web3.PublicKey('F4coyXgjxsQGp9M3ZFR71vV8YadsJaz1oSfp2qRgCkfg');

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKeyFrom,
        toPubkey: publicKeyTo,
        lamports: 1,
    });
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]);

    console.log('txHash', txSignature)
}

main();