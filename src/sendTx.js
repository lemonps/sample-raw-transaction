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

const send = async () => {
   console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

   // Create raw Tx Object
   const tx = {
      to: addressTo,
      value: ethers.utils.parseEther('0.00001'),
   };

   // Sign and Send a Tx - Wait for Receipt
   const createReceipt = await wallet.sendTransaction(tx);
   await createReceipt.wait();
   console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

send();
