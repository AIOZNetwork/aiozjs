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
exports.QueryClientImpl = exports.QueryNativeHrpResponse = exports.QueryNativeHrpRequest = exports.QueryHrpIbcRecordResponse = exports.QueryHrpIbcRecordRequest = exports.QueryHrpIbcRecordsResponse = exports.QueryHrpIbcRecordsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const types_1 = require("./types");
const _m0 = __importStar(require("protobufjs/minimal"));
const helpers_1 = require("../../helpers");
exports.protobufPackage = "bech32ibc.bech32ibc.v1beta1";
function createBaseQueryHrpIbcRecordsRequest() {
    return {};
}
exports.QueryHrpIbcRecordsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHrpIbcRecordsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryHrpIbcRecordsRequest();
        return message;
    },
};
function createBaseQueryHrpIbcRecordsResponse() {
    return {
        hrpIbcRecords: [],
    };
}
exports.QueryHrpIbcRecordsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.hrpIbcRecords) {
            types_1.HrpIbcRecord.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHrpIbcRecordsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hrpIbcRecords.push(types_1.HrpIbcRecord.decode(reader, reader.uint32()));
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
            hrpIbcRecords: Array.isArray(object?.hrpIbcRecords)
                ? object.hrpIbcRecords.map((e) => types_1.HrpIbcRecord.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.hrpIbcRecords) {
            obj.hrpIbcRecords = message.hrpIbcRecords.map((e) => (e ? types_1.HrpIbcRecord.toJSON(e) : undefined));
        }
        else {
            obj.hrpIbcRecords = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryHrpIbcRecordsResponse();
        message.hrpIbcRecords = object.hrpIbcRecords?.map((e) => types_1.HrpIbcRecord.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryHrpIbcRecordRequest() {
    return {
        hrp: "",
    };
}
exports.QueryHrpIbcRecordRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hrp !== "") {
            writer.uint32(10).string(message.hrp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHrpIbcRecordRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hrp = reader.string();
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
        };
    },
    toJSON(message) {
        const obj = {};
        message.hrp !== undefined && (obj.hrp = message.hrp);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryHrpIbcRecordRequest();
        message.hrp = object.hrp ?? "";
        return message;
    },
};
function createBaseQueryHrpIbcRecordResponse() {
    return {
        hrpIbcRecord: undefined,
    };
}
exports.QueryHrpIbcRecordResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hrpIbcRecord !== undefined) {
            types_1.HrpIbcRecord.encode(message.hrpIbcRecord, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHrpIbcRecordResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hrpIbcRecord = types_1.HrpIbcRecord.decode(reader, reader.uint32());
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
            hrpIbcRecord: (0, helpers_1.isSet)(object.hrpIbcRecord) ? types_1.HrpIbcRecord.fromJSON(object.hrpIbcRecord) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hrpIbcRecord !== undefined &&
            (obj.hrpIbcRecord = message.hrpIbcRecord ? types_1.HrpIbcRecord.toJSON(message.hrpIbcRecord) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryHrpIbcRecordResponse();
        message.hrpIbcRecord =
            object.hrpIbcRecord !== undefined && object.hrpIbcRecord !== null
                ? types_1.HrpIbcRecord.fromPartial(object.hrpIbcRecord)
                : undefined;
        return message;
    },
};
function createBaseQueryNativeHrpRequest() {
    return {};
}
exports.QueryNativeHrpRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNativeHrpRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryNativeHrpRequest();
        return message;
    },
};
function createBaseQueryNativeHrpResponse() {
    return {
        nativeHrp: "",
    };
}
exports.QueryNativeHrpResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.nativeHrp !== "") {
            writer.uint32(10).string(message.nativeHrp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNativeHrpResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nativeHrp = reader.string();
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
            nativeHrp: (0, helpers_1.isSet)(object.nativeHrp) ? String(object.nativeHrp) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.nativeHrp !== undefined && (obj.nativeHrp = message.nativeHrp);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryNativeHrpResponse();
        message.nativeHrp = object.nativeHrp ?? "";
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.HrpIbcRecords = this.HrpIbcRecords.bind(this);
        this.HrpIbcRecord = this.HrpIbcRecord.bind(this);
        this.NativeHrp = this.NativeHrp.bind(this);
    }
    HrpIbcRecords(request = {}) {
        const data = exports.QueryHrpIbcRecordsRequest.encode(request).finish();
        const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "HrpIbcRecords", data);
        return promise.then((data) => exports.QueryHrpIbcRecordsResponse.decode(new _m0.Reader(data)));
    }
    HrpIbcRecord(request) {
        const data = exports.QueryHrpIbcRecordRequest.encode(request).finish();
        const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "HrpIbcRecord", data);
        return promise.then((data) => exports.QueryHrpIbcRecordResponse.decode(new _m0.Reader(data)));
    }
    NativeHrp(request = {}) {
        const data = exports.QueryNativeHrpRequest.encode(request).finish();
        const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "NativeHrp", data);
        return promise.then((data) => exports.QueryNativeHrpResponse.decode(new _m0.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
//# sourceMappingURL=query.js.map