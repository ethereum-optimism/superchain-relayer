"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStateTrieProof = exports.makeMerkleTreeProof = void 0;
const ethers_1 = require("ethers");
const core_utils_1 = require("@eth-optimism/core-utils");
const merkletreejs_1 = require("merkletreejs");
const makeMerkleTreeProof = (leaves, index) => {
    const correctedTreeSize = Math.pow(2, Math.ceil(Math.log2(leaves.length)));
    const parsedLeaves = [];
    for (let i = 0; i < correctedTreeSize; i++) {
        if (i < leaves.length) {
            parsedLeaves.push(leaves[i]);
        }
        else {
            parsedLeaves.push(ethers_1.ethers.utils.keccak256('0x' + '00'.repeat(32)));
        }
    }
    const bufLeaves = parsedLeaves.map(core_utils_1.fromHexString);
    const tree = new merkletreejs_1.MerkleTree(bufLeaves, (el) => {
        return (0, core_utils_1.fromHexString)(ethers_1.ethers.utils.keccak256(el));
    });
    const proof = tree.getProof(bufLeaves[index], index).map((element) => {
        return (0, core_utils_1.toHexString)(element.data);
    });
    return proof;
};
exports.makeMerkleTreeProof = makeMerkleTreeProof;
const makeStateTrieProof = async (provider, blockNumber, address, slot) => {
    const proof = await provider.send('eth_getProof', [
        address,
        [slot],
        (0, core_utils_1.toRpcHexString)(blockNumber),
    ]);
    return {
        accountProof: proof.accountProof,
        storageProof: proof.storageProof[0].proof,
        storageValue: ethers_1.BigNumber.from(proof.storageProof[0].value),
        storageRoot: proof.storageHash,
    };
};
exports.makeStateTrieProof = makeStateTrieProof;
//# sourceMappingURL=merkle-utils.js.map