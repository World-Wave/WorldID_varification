import Web3 from 'web3';
import { bufferToHex } from 'ethereumjs-util';

// Load environment variables
const GETH_RPC_URL = process.env.GETH_RPC_URL;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Create a web3 instance connected to Geth
const web3 = new Web3(new Web3.providers.HttpProvider(GETH_RPC_URL || ""));

export default async function POST(req: any, res: any) {
  const { address, userId } = req.body;

  if (!address || !userId) {
    return res.status(400).json({ error: 'Missing address or userId' });
  }

  try {
    // Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Create a transaction object
    const transaction = {
      from: ACCOUNT_ADDRESS,
      to: address,
      value: web3.utils.toWei('0', 'ether'),
      gas: 2000000, // Keep this as is
      gasPrice: gasPrice, // Add this line
      data: web3.utils.asciiToHex(`UserID: ${userId}`),
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      bufferToHex(Buffer.from(PRIVATE_KEY || "", 'hex'))
    );

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
    return res.status(200).json({ success: true, transactionHash: receipt.transactionHash });

  } catch (error) {
    console.error(`Transaction failed: ${error}`);
    return res.status(500).json({ error: 'Transaction failed' });
  }
}