"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
const omit = (obj, ...keys) => {
    const copy = Object.assign({}, obj);
    for (const key of keys) {
        delete copy[key];
    }
    return copy;
};
exports.omit = omit;
//# sourceMappingURL=misc-utils.js.map