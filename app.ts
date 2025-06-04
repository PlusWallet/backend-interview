import { ethers } from "ethers";

const PROVIDER_URL =
  "https://rpc.ankr.com/bsc_testnet_chapel/f527182cd4042062b678ae009c1c2fac7e68e12af5be01f035b35f3dcb85e592";

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

async function main() {
  // get latest block
  // get all transactions in the block
  // print details of each transaction (hash, from, to, value) to console
}
