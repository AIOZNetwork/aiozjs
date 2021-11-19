"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthAccount = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const auth_1 = require("../../../cosmos/auth/v1beta1/auth");
exports.protobufPackage = "ethermint.types.v1";
const baseEthAccount = { codeHash: "" };
exports.EthAccount = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.baseAccount !== undefined) {
            auth_1.BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.codeHash !== "") {
            writer.uint32(18).string(message.codeHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseEthAccount);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.baseAccount = auth_1.BaseAccount.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.codeHash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseEthAccount);
        if (object.baseAccount !== undefined && object.baseAccount !== null) {
            message.baseAccount = auth_1.BaseAccount.fromJSON(object.baseAccount);
        }
        else {
            message.baseAccount = undefined;
        }
        if (object.codeHash !== undefined && object.codeHash !== null) {
            message.codeHash = String(object.codeHash);
        }
        else {
            message.codeHash = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.baseAccount !== undefined &&
            (obj.baseAccount = message.baseAccount ? auth_1.BaseAccount.toJSON(message.baseAccount) : undefined);
        message.codeHash !== undefined && (obj.codeHash = message.codeHash);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseEthAccount);
        if (object.baseAccount !== undefined && object.baseAccount !== null) {
            message.baseAccount = auth_1.BaseAccount.fromPartial(object.baseAccount);
        }
        else {
            message.baseAccount = undefined;
        }
        if (object.codeHash !== undefined && object.codeHash !== null) {
            message.codeHash = object.codeHash;
        }
        else {
            message.codeHash = "";
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=account.js.map