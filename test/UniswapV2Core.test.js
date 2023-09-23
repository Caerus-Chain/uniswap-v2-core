const { expect } = require("chai");

const WETH_ADDRESS = require("../config/contractAddrs.json").WETH;
const CAERUS_ADDRESS = require("../config/contractAddrs.json").CAERUS;

describe("UniswapV2Core Test", function () {
    let factory, weth, caerus, pair;
    let owner;

    beforeEach(async () => {
        // Getting signers
        [owner] = await ethers.getSigners();

        // Deploying the factory contract
        const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
        factory = await UniswapV2Factory.deploy(owner.address);
        await factory.deployed();

        // Connecting to existing WETH and CAERUS contracts
        const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
        const ERC20 = await ethers.getContractFactory("ERC20");

        weth = ERC20.attach(WETH_ADDRESS);
        caerus = ERC20.attach(CAERUS_ADDRESS);

        await factory.createPair(WETH_ADDRESS, CAERUS_ADDRESS);

        const pairAddress = await factory.getPair(WETH_ADDRESS, CAERUS_ADDRESS);
        pair = UniswapV2Pair.attach(pairAddress);
    });

    it("should create a WETH-Caerus pair", async () => {
        const token0 = await pair.token0();
        const token1 = await pair.token1();

        expect(token0).to.not.equal("0x0000000000000000000000000000000000000000");
        expect(token1).to.not.equal("0x0000000000000000000000000000000000000000");

        expect(
            (token0 === WETH_ADDRESS && token1 === CAERUS_ADDRESS) ||
            (token0 === CAERUS_ADDRESS && token1 === WETH_ADDRESS)
        ).to.equal(true);
    });
});
