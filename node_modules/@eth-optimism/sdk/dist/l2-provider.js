"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asL2Provider = exports.isL2Provider = exports.estimateTotalGasCost = exports.estimateL2GasCost = exports.estimateL1GasCost = exports.estimateL1Gas = exports.getL1GasPrice = void 0;
const transactions_1 = require("@ethersproject/transactions");
const ethers_1 = require("ethers");
const contracts_1 = require("@eth-optimism/contracts");
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const assert_1 = require("./utils/assert");
const utils_1 = require("./utils");
const getNonceForTx = async (provider, tx) => {
    if (tx.nonce !== undefined) {
        return (0, utils_1.toNumber)(tx.nonce);
    }
    else if (tx.from !== undefined) {
        return (0, utils_1.toProvider)(provider).getTransactionCount(tx.from);
    }
    else {
        return 0xffffffff;
    }
};
const connectGasPriceOracle = (provider) => {
    return new ethers_1.Contract(contracts_1.predeploys.OVM_GasPriceOracle, (0, contracts_1.getContractInterface)('OVM_GasPriceOracle'), (0, utils_1.toProvider)(provider));
};
const getL1GasPrice = async (l2Provider) => {
    const gpo = connectGasPriceOracle(l2Provider);
    return gpo.l1BaseFee();
};
exports.getL1GasPrice = getL1GasPrice;
const estimateL1Gas = async (l2Provider, tx) => {
    const gpo = connectGasPriceOracle(l2Provider);
    return gpo.getL1GasUsed((0, transactions_1.serialize)({
        data: tx.data,
        to: tx.to,
        gasPrice: tx.gasPrice,
        type: tx.type,
        gasLimit: tx.gasLimit,
        nonce: await getNonceForTx(l2Provider, tx),
    }));
};
exports.estimateL1Gas = estimateL1Gas;
const estimateL1GasCost = async (l2Provider, tx) => {
    const gpo = connectGasPriceOracle(l2Provider);
    return gpo.getL1Fee((0, transactions_1.serialize)({
        data: tx.data,
        to: tx.to,
        gasPrice: tx.gasPrice,
        type: tx.type,
        gasLimit: tx.gasLimit,
        nonce: await getNonceForTx(l2Provider, tx),
    }));
};
exports.estimateL1GasCost = estimateL1GasCost;
const estimateL2GasCost = async (l2Provider, tx) => {
    const parsed = (0, utils_1.toProvider)(l2Provider);
    const l2GasPrice = await parsed.getGasPrice();
    const l2GasCost = await parsed.estimateGas(tx);
    return l2GasPrice.mul(l2GasCost);
};
exports.estimateL2GasCost = estimateL2GasCost;
const estimateTotalGasCost = async (l2Provider, tx) => {
    const l1GasCost = await (0, exports.estimateL1GasCost)(l2Provider, tx);
    const l2GasCost = await (0, exports.estimateL2GasCost)(l2Provider, tx);
    return l1GasCost.add(l2GasCost);
};
exports.estimateTotalGasCost = estimateTotalGasCost;
const isL2Provider = (provider) => {
    return Boolean(provider._isL2Provider);
};
exports.isL2Provider = isL2Provider;
const asL2Provider = (provider) => {
    if ((0, exports.isL2Provider)(provider)) {
        return provider;
    }
    const l2Provider = (0, cloneDeep_1.default)(provider);
    const formatter = l2Provider.formatter;
    (0, assert_1.assert)(formatter, `provider.formatter must be defined`);
    const ogBlockFormatter = formatter.block.bind(formatter);
    formatter.block = (block) => {
        const parsed = ogBlockFormatter(block);
        parsed.stateRoot = block.stateRoot;
        return parsed;
    };
    const ogBlockWithTxFormatter = formatter.blockWithTransactions.bind(formatter);
    formatter.blockWithTransactions = (block) => {
        const parsed = ogBlockWithTxFormatter(block);
        parsed.stateRoot = block.stateRoot;
        parsed.transactions = parsed.transactions.map((tx, idx) => {
            const ogTx = block.transactions[idx];
            tx.l1BlockNumber = ogTx.l1BlockNumber
                ? (0, utils_1.toNumber)(ogTx.l1BlockNumber)
                : ogTx.l1BlockNumber;
            tx.l1Timestamp = ogTx.l1Timestamp
                ? (0, utils_1.toNumber)(ogTx.l1Timestamp)
                : ogTx.l1Timestamp;
            tx.l1TxOrigin = ogTx.l1TxOrigin;
            tx.queueOrigin = ogTx.queueOrigin;
            tx.rawTransaction = ogTx.rawTransaction;
            return tx;
        });
        return parsed;
    };
    const ogTxResponseFormatter = formatter.transactionResponse.bind(formatter);
    formatter.transactionResponse = (tx) => {
        const parsed = ogTxResponseFormatter(tx);
        parsed.txType = tx.txType;
        parsed.queueOrigin = tx.queueOrigin;
        parsed.rawTransaction = tx.rawTransaction;
        parsed.l1TxOrigin = tx.l1TxOrigin;
        parsed.l1BlockNumber = tx.l1BlockNumber
            ? parseInt(tx.l1BlockNumber, 16)
            : tx.l1BlockNumbers;
        return parsed;
    };
    const ogReceiptFormatter = formatter.receipt.bind(formatter);
    formatter.receipt = (receipt) => {
        const parsed = ogReceiptFormatter(receipt);
        parsed.l1GasPrice = (0, utils_1.toBigNumber)(receipt.l1GasPrice);
        parsed.l1GasUsed = (0, utils_1.toBigNumber)(receipt.l1GasUsed);
        parsed.l1Fee = (0, utils_1.toBigNumber)(receipt.l1Fee);
        parsed.l1FeeScalar = parseFloat(receipt.l1FeeScalar);
        return parsed;
    };
    l2Provider.getL1GasPrice = async () => {
        return (0, exports.getL1GasPrice)(l2Provider);
    };
    l2Provider.estimateL1Gas = async (tx) => {
        return (0, exports.estimateL1Gas)(l2Provider, tx);
    };
    l2Provider.estimateL1GasCost = async (tx) => {
        return (0, exports.estimateL1GasCost)(l2Provider, tx);
    };
    l2Provider.estimateL2GasCost = async (tx) => {
        return (0, exports.estimateL2GasCost)(l2Provider, tx);
    };
    l2Provider.estimateTotalGasCost = async (tx) => {
        return (0, exports.estimateTotalGasCost)(l2Provider, tx);
    };
    l2Provider._isL2Provider = true;
    return l2Provider;
};
exports.asL2Provider = asL2Provider;
//# sourceMappingURL=l2-provider.js.map