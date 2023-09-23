const hre = require("hardhat");

const UTILS_ADDRESS = require("../config/contractAddrs.json").Utils;

async function main() {
    // Getting the Utils contract
    const Utils = await hre.ethers.getContractFactory("Utils");
    const utils = Utils.attach(UTILS_ADDRESS);

    // Get init code hash using Utils contract
    const initCodeHash = await utils.initcodehash();
    console.log(`Init code hash is: ${initCodeHash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// Init code hash is: 0x1892ee6b3b8f653471529d0b06a772bdc5588bb0b15607cb427c8148f70004a9