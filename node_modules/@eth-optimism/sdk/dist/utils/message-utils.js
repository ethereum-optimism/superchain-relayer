"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migratedWithdrawalGasLimit = exports.hashMessageHash = exports.hashLowLevelMessage = void 0;
const core_utils_1 = require("@eth-optimism/core-utils");
const ethers_1 = require("ethers");
const { hexDataLength } = ethers_1.utils;
const RELAY_CONSTANT_OVERHEAD = ethers_1.BigNumber.from(200000);
const RELAY_PER_BYTE_DATA_COST = ethers_1.BigNumber.from(16);
const MIN_GAS_DYNAMIC_OVERHEAD_NUMERATOR = ethers_1.BigNumber.from(64);
const MIN_GAS_DYNAMIC_OVERHEAD_DENOMINATOR = ethers_1.BigNumber.from(63);
const RELAY_CALL_OVERHEAD = ethers_1.BigNumber.from(40000);
const RELAY_RESERVED_GAS = ethers_1.BigNumber.from(40000);
const RELAY_GAS_CHECK_BUFFER = ethers_1.BigNumber.from(5000);
const hashLowLevelMessage = (message) => {
    return (0, core_utils_1.hashWithdrawal)(message.messageNonce, message.sender, message.target, message.value, message.minGasLimit, message.message);
};
exports.hashLowLevelMessage = hashLowLevelMessage;
const hashMessageHash = (messageHash) => {
    const data = ethers_1.ethers.utils.defaultAbiCoder.encode(['bytes32', 'uint256'], [messageHash, ethers_1.ethers.constants.HashZero]);
    return ethers_1.ethers.utils.keccak256(data);
};
exports.hashMessageHash = hashMessageHash;
const migratedWithdrawalGasLimit = (data, chainID) => {
    const dataCost = ethers_1.BigNumber.from(hexDataLength(data)).mul(RELAY_PER_BYTE_DATA_COST);
    let overhead;
    if (chainID === 420) {
        overhead = ethers_1.BigNumber.from(200000);
    }
    else {
        const dynamicOverhead = MIN_GAS_DYNAMIC_OVERHEAD_NUMERATOR.mul(1000000).div(MIN_GAS_DYNAMIC_OVERHEAD_DENOMINATOR);
        overhead = RELAY_CONSTANT_OVERHEAD.add(dynamicOverhead)
            .add(RELAY_CALL_OVERHEAD)
            .add(RELAY_RESERVED_GAS)
            .add(RELAY_GAS_CHECK_BUFFER);
    }
    let minGasLimit = dataCost.add(overhead);
    if (minGasLimit.gt(25000000)) {
        minGasLimit = ethers_1.BigNumber.from(25000000);
    }
    return minGasLimit;
};
exports.migratedWithdrawalGasLimit = migratedWithdrawalGasLimit;
//# sourceMappingURL=message-utils.js.map