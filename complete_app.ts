import { ethers } from "ethers";

const PROVIDER_URL =
  "https://rpc.ankr.com/bsc_testnet_chapel/f527182cd4042062b678ae009c1c2fac7e68e12af5be01f035b35f3dcb85e592";

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

async function main() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("blockNumber", blockNumber);

    if (isNaN(blockNumber)) {
      throw new Error("Invalid block number");
    }

    // const walletAddress = address.toLowerCase();
    // if (!ethers.isAddress(walletAddress)) throw new Error("Invalid address");

    const blockData = await provider.getBlock(blockNumber, true);
    if (!blockData) {
      throw new Error("Block not found");
    }

    const transactions = await Promise.all(
      blockData.transactions.map(async (txHash: string) => {
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
          return null;
        }
        return {
          hash: tx.hash,
          from: tx.from.toLowerCase(),
          to: tx.to?.toLowerCase() || "",
          value: ethers.formatEther(tx.value),
        };
      })
    );

    console.log(transactions);

    // const filteredTxs = transactions.filter(
    //   (tx) => tx.from === walletAddress || tx.to === walletAddress
    // );

    // return {
    //   block: blockNumber,
    //   address: walletAddress,
    //   transactions: filteredTxs,
    // };
  } catch (error) {
    console.error(error);
    throw new Error(`Error scanning block: ${error.message}`);
  }
}

main();
