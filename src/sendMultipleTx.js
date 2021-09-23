const ethers = require('ethers');

const providerRPC = {
   testnet: {
      name: 'bkc-testnet',
      rpc: 'https://rpc-testnet.bitkubchain.io',
      chainId: 25925,
   }
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.testnet.rpc,
   {
      chainId: providerRPC.testnet.chainId,
      name: providerRPC.testnet.name,
   }
);

const account_from = {
   privateKey: process.env.PRIVATE_KEY,
};

const addressTo = '0xBAA1A050dE591d61b1577a707190becdDe04F2e3'; // destination address 

let wallet = new ethers.Wallet(account_from.privateKey, provider);

const send = async (numberOfTransaction) => {
   console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

   // Create raw Tx Object
   const tx = {
      to: addressTo,
      value: ethers.utils.parseEther('0.0000001'),
   };

   // Sign and Send Multiple Transactions - Wait for Receipts
   for (let i = 0; i < numberOfTransaction; i++) {
      const createReceipt = await wallet.sendTransaction(tx);
      await createReceipt.wait();
      console.log(`Transaction [${i}] send successful with tx hash: ${createReceipt.hash}`);
   }
};

send(10);