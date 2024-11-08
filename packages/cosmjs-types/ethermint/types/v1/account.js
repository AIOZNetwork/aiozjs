"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthAccount = exports.protobufPackage = void 0;
/* eslint-disable */
const auth_1 = require("../../../cosmos/auth/v1beta1/auth");
const binary_1 = require("../../../binary");
const helpers_1 = require("../../../helpers");
exports.protobufPackage = "ethermint.types.v1";
function createBaseEthAccount() {
    return {
        baseAccount: undefined,
        codeHash: "",
    };
}
exports.EthAccount = {
    typeUrl: "/ethermint.types.v1.EthAccount",
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.baseAccount !== undefined) {
            auth_1.BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.codeHash !== "") {
            writer.uint32(18).string(message.codeHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEthAccount();
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
        const obj = createBaseEthAccount();
        if ((0, helpers_1.isSet)(object.baseAccount))
            obj.baseAccount = auth_1.BaseAccount.fromJSON(object.baseAccount);
        if ((0, helpers_1.isSet)(object.codeHash))
            obj.codeHash = String(object.codeHash);
        return obj;
    },
    toJSON(message) {
        const obj = {};
        message.baseAccount !== undefined &&
            (obj.baseAccount = message.baseAccount ? auth_1.BaseAccount.toJSON(message.baseAccount) : undefined);
        message.codeHash !== undefined && (obj.codeHash = message.codeHash);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEthAccount();
        if (object.baseAccount !== undefined && object.baseAccount !== null) {
            message.baseAccount = auth_1.BaseAccount.fromPartial(object.baseAccount);
        }
        message.codeHash = object.codeHash ?? "";
        return message;
    },
};
//# sourceMappingURL=account.js.map