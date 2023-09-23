const hre = require("hardhat");

const WETH_ADDRESS = require("../config/contractAddrs.json").WETH;
const CAERUS_ADDRESS = require("../config/contractAddrs.json").CAERUS;

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy UniswapV2Factory
  const UniswapV2Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const uniswapV2Factory = await UniswapV2Factory.deploy(deployer.address);
  await uniswapV2Factory.deployed();
  console.log("UniswapV2Factory deployed to:", uniswapV2Factory.address);

  // Deploy Utils
  const Utils = await hre.ethers.getContractFactory("Utils");
  const utils = await Utils.deploy();
  await utils.deployed();
  console.log("Utils deployed to:", utils.address);

  // Create WETH-Caerus pair using existing deployed contracts
  tx = await uniswapV2Factory.createPair(WETH_ADDRESS, CAERUS_ADDRESS);
  await tx.wait();
  const pairAddress = await uniswapV2Factory.getPair(WETH_ADDRESS, CAERUS_ADDRESS);
  console.log(`WETH-Caerus pair created at address: ${pairAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// Deploying contracts with the account: 0xa40aa030A3ba4f42FDCd2B7bC33d5B03770290ea
// UniswapV2Factory deployed to: 0x872ACf446AA9DaA665EE3fA8Be034B3014b5492E
// Utils deployed to: 0x2fc8406A40116900C14e08e38D135124B63066CC
// WETH-Caerus pair created at address: 0x2B89551a4A387e5A95878D7A2a038A01d72a15f4