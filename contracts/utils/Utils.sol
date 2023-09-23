// SPDX-License-Identifier: GPL-3.0
pragma solidity =0.5.16;

import "../UniswapV2Pair.sol";

contract Utils {
    function initcodehash() external pure returns (bytes32 bytecode) {
        bytecode = keccak256(type(UniswapV2Pair).creationCode);
    }
}
