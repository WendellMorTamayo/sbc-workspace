import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

import base58 from 'bs58';
async function main(){

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const base58DecodedPK = base58.decode('4NBdgYahj1Tfa3x1gcjdoQCH6Cpgc7nrSwYjdPbdZAZA3j2bwm9o3uepBQZBczZeuxpXsoJjvyrYaavucFdxeMMr');
    const signer = Web3.Keypair.fromSecretKey(base58DecodedPK);

    const mintToken = await token.mintTo(
        connection,
        signer,
        new Web3.PublicKey('FdEmD9e6kqzHmTMnbL93nq5cnzTMj9Z2FLNZNV3PTb4G'), //mint 
        new Web3.PublicKey('3bRTvpHZ1wXiFnLdymk7MHHU56BAAW1yLnyzsmBytsNT'), // token account
        new Web3.PublicKey('CgZR5yxZWYX53TSBub9etanvqNvAxBWQMsLj5fWYQCsz'), //authority
        100000000000, //amount
    )
    console.log('mint Token ', mintToken)
}

main()