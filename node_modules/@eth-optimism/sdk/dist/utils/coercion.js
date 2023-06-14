"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAddress = exports.toNumber = exports.toBigNumber = exports.toTransactionHash = exports.toProvider = exports.toSignerOrProvider = void 0;
const abstract_provider_1 = require("@ethersproject/abstract-provider");
const abstract_signer_1 = require("@ethersproject/abstract-signer");
const ethers_1 = require("ethers");
const assert_1 = require("./assert");
const toSignerOrProvider = (signerOrProvider) => {
    if (typeof signerOrProvider === 'string') {
        return new ethers_1.ethers.providers.JsonRpcProvider(signerOrProvider);
    }
    else if (abstract_provider_1.Provider.isProvider(signerOrProvider)) {
        return signerOrProvider;
    }
    else if (abstract_signer_1.Signer.isSigner(signerOrProvider)) {
        return signerOrProvider;
    }
    else {
        throw new Error('Invalid provider');
    }
};
exports.toSignerOrProvider = toSignerOrProvider;
const toProvider = (provider) => {
    if (typeof provider === 'string') {
        return new ethers_1.ethers.providers.JsonRpcProvider(provider);
    }
    else if (abstract_provider_1.Provider.isProvider(provider)) {
        return provider;
    }
    else {
        throw new Error('Invalid provider');
    }
};
exports.toProvider = toProvider;
const toTransactionHash = (transaction) => {
    if (typeof transaction === 'string') {
        (0, assert_1.assert)(ethers_1.ethers.utils.isHexString(transaction, 32), 'Invalid transaction hash');
        return transaction;
    }
    else if (transaction.transactionHash) {
        return transaction.transactionHash;
    }
    else if (transaction.hash) {
        return transaction.hash;
    }
    else {
        throw new Error('Invalid transaction');
    }
};
exports.toTransactionHash = toTransactionHash;
const toBigNumber = (num) => {
    return ethers_1.ethers.BigNumber.from(num);
};
exports.toBigNumber = toBigNumber;
const toNumber = (num) => {
    return (0, exports.toBigNumber)(num).toNumber();
};
exports.toNumber = toNumber;
const toAddress = (addr) => {
    if (typeof addr === 'string') {
        (0, assert_1.assert)(ethers_1.ethers.utils.isAddress(addr), 'Invalid address');
        return ethers_1.ethers.utils.getAddress(addr);
    }
    else {
        (0, assert_1.assert)(ethers_1.ethers.utils.isAddress(addr.address), 'Invalid address');
        return ethers_1.ethers.utils.getAddress(addr.address);
    }
};
exports.toAddress = toAddress;
//# sourceMappingURL=coercion.js.map