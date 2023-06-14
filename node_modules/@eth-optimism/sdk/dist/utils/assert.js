"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};
exports.assert = assert;
//# sourceMappingURL=assert.js.map