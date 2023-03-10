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
exports.HrpIbcRecord = exports.protobufPackage = void 0;
/* eslint-disable */
const duration_1 = require("../../google/protobuf/duration");
const helpers_1 = require("../../helpers");
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "bech32ibc.bech32ibc.v1beta1";
function createBaseHrpIbcRecord() {
    return {
        hrp: "",
        sourceChannel: "",
        icsToHeightOffset: helpers_1.Long.UZERO,
        icsToTimeOffset: undefined,
    };
}
exports.HrpIbcRecord = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hrp !== "") {
            writer.uint32(10).string(message.hrp);
        }
        if (message.sourceChannel !== "") {
            writer.uint32(18).string(message.sourceChannel);
        }
        if (!message.icsToHeightOffset.isZero()) {
            writer.uint32(24).uint64(message.icsToHeightOffset);
        }
        if (message.icsToTimeOffset !== undefined) {
            duration_1.Duration.encode(message.icsToTimeOffset, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHrpIbcRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hrp = reader.string();
                    break;
                case 2:
                    message.sourceChannel = reader.string();
                    break;
                case 3:
                    message.icsToHeightOffset = reader.uint64();
                    break;
                case 4:
                    message.icsToTimeOffset = duration_1.Duration.decode(reader, reader.uint32());
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
            hrp: (0, helpers_1.isSet)(object.hrp) ? String(object.hrp) : "",
            sourceChannel: (0, helpers_1.isSet)(object.sourceChannel) ? String(object.sourceChannel) : "",
            icsToHeightOffset: (0, helpers_1.isSet)(object.icsToHeightOffset)
                ? helpers_1.Long.fromValue(object.icsToHeightOffset)
                : helpers_1.Long.UZERO,
            icsToTimeOffset: (0, helpers_1.isSet)(object.icsToTimeOffset) ? duration_1.Duration.fromJSON(object.icsToTimeOffset) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hrp !== undefined && (obj.hrp = message.hrp);
        message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
        message.icsToHeightOffset !== undefined &&
            (obj.icsToHeightOffset = (message.icsToHeightOffset || helpers_1.Long.UZERO).toString());
        message.icsToTimeOffset !== undefined &&
            (obj.icsToTimeOffset = message.icsToTimeOffset ? duration_1.Duration.toJSON(message.icsToTimeOffset) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseHrpIbcRecord();
        message.hrp = object.hrp ?? "";
        message.sourceChannel = object.sourceChannel ?? "";
        message.icsToHeightOffset =
            object.icsToHeightOffset !== undefined && object.icsToHeightOffset !== null
                ? helpers_1.Long.fromValue(object.icsToHeightOffset)
                : helpers_1.Long.UZERO;
        message.icsToTimeOffset =
            object.icsToTimeOffset !== undefined && object.icsToTimeOffset !== null
                ? duration_1.Duration.fromPartial(object.icsToTimeOffset)
                : undefined;
        return message;
    },
};
//# sourceMappingURL=types.js.map