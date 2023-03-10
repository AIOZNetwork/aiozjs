"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const types_1 = require("./types");
const _m0 = __importStar(require("protobufjs/minimal"));
const helpers_1 = require("../../helpers");
exports.protobufPackage = "bech32ibc.bech32ibc.v1beta1";
function createBaseGenesisState() {
    return {
        nativeHRP: "",
        hrpIBCRecords: [],
    };
}
exports.GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.nativeHRP !== "") {
            writer.uint32(10).string(message.nativeHRP);
        }
        for (const v of message.hrpIBCRecords) {
            types_1.HrpIbcRecord.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nativeHRP = reader.string();
                    break;
                case 2:
                    message.hrpIBCRecords.push(types_1.HrpIbcRecord.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            nativeHRP: (0, helpers_1.isSet)(object.nativeHRP) ? String(object.nativeHRP) : "",
            hrpIBCRecords: Array.isArray(object?.hrpIBCRecords)
                ? object.hrpIBCRecords.map((e) => types_1.HrpIbcRecord.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.nativeHRP !== undefined && (obj.nativeHRP = message.nativeHRP);
        if (message.hrpIBCRecords) {
            obj.hrpIBCRecords = message.hrpIBCRecords.map((e) => (e ? types_1.HrpIbcRecord.toJSON(e) : undefined));
        }
        else {
            obj.hrpIBCRecords = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.nativeHRP = object.nativeHRP ?? "";
        message.hrpIBCRecords = object.hrpIBCRecords?.map((e) => types_1.HrpIbcRecord.fromPartial(e)) || [];
        return message;
    },
};
//# sourceMappingURL=genesis.js.map