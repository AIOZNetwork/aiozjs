/* eslint-disable */
import { HrpIbcRecord } from "./types";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial, Exact, isSet, Rpc } from "../../helpers";
export const protobufPackage = "bech32ibc.bech32ibc.v1beta1";
export interface QueryHrpIbcRecordsRequest {}
export interface QueryHrpIbcRecordsResponse {
  hrpIbcRecords: HrpIbcRecord[];
}
export interface QueryHrpIbcRecordRequest {
  hrp: string;
}
export interface QueryHrpIbcRecordResponse {
  hrpIbcRecord?: HrpIbcRecord;
}
export interface QueryNativeHrpRequest {}
export interface QueryNativeHrpResponse {
  nativeHrp: string;
}

function createBaseQueryHrpIbcRecordsRequest(): QueryHrpIbcRecordsRequest {
  return {};
}

export const QueryHrpIbcRecordsRequest = {
  encode(_: QueryHrpIbcRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHrpIbcRecordsRequest {
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

  fromJSON(_: any): QueryHrpIbcRecordsRequest {
    return {};
  },

  toJSON(_: QueryHrpIbcRecordsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHrpIbcRecordsRequest>, I>>(_: I): QueryHrpIbcRecordsRequest {
    const message = createBaseQueryHrpIbcRecordsRequest();
    return message;
  },
};

function createBaseQueryHrpIbcRecordsResponse(): QueryHrpIbcRecordsResponse {
  return {
    hrpIbcRecords: [],
  };
}

export const QueryHrpIbcRecordsResponse = {
  encode(message: QueryHrpIbcRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.hrpIbcRecords) {
      HrpIbcRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHrpIbcRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHrpIbcRecordsResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.hrpIbcRecords.push(HrpIbcRecord.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): QueryHrpIbcRecordsResponse {
    return {
      hrpIbcRecords: Array.isArray(object?.hrpIbcRecords)
        ? object.hrpIbcRecords.map((e: any) => HrpIbcRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryHrpIbcRecordsResponse): unknown {
    const obj: any = {};

    if (message.hrpIbcRecords) {
      obj.hrpIbcRecords = message.hrpIbcRecords.map((e) => (e ? HrpIbcRecord.toJSON(e) : undefined));
    } else {
      obj.hrpIbcRecords = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHrpIbcRecordsResponse>, I>>(
    object: I,
  ): QueryHrpIbcRecordsResponse {
    const message = createBaseQueryHrpIbcRecordsResponse();
    message.hrpIbcRecords = object.hrpIbcRecords?.map((e) => HrpIbcRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryHrpIbcRecordRequest(): QueryHrpIbcRecordRequest {
  return {
    hrp: "",
  };
}

export const QueryHrpIbcRecordRequest = {
  encode(message: QueryHrpIbcRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hrp !== "") {
      writer.uint32(10).string(message.hrp);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHrpIbcRecordRequest {
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

  fromJSON(object: any): QueryHrpIbcRecordRequest {
    return {
      hrp: isSet(object.hrp) ? String(object.hrp) : "",
    };
  },

  toJSON(message: QueryHrpIbcRecordRequest): unknown {
    const obj: any = {};
    message.hrp !== undefined && (obj.hrp = message.hrp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHrpIbcRecordRequest>, I>>(
    object: I,
  ): QueryHrpIbcRecordRequest {
    const message = createBaseQueryHrpIbcRecordRequest();
    message.hrp = object.hrp ?? "";
    return message;
  },
};

function createBaseQueryHrpIbcRecordResponse(): QueryHrpIbcRecordResponse {
  return {
    hrpIbcRecord: undefined,
  };
}

export const QueryHrpIbcRecordResponse = {
  encode(message: QueryHrpIbcRecordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hrpIbcRecord !== undefined) {
      HrpIbcRecord.encode(message.hrpIbcRecord, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHrpIbcRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHrpIbcRecordResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.hrpIbcRecord = HrpIbcRecord.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): QueryHrpIbcRecordResponse {
    return {
      hrpIbcRecord: isSet(object.hrpIbcRecord) ? HrpIbcRecord.fromJSON(object.hrpIbcRecord) : undefined,
    };
  },

  toJSON(message: QueryHrpIbcRecordResponse): unknown {
    const obj: any = {};
    message.hrpIbcRecord !== undefined &&
      (obj.hrpIbcRecord = message.hrpIbcRecord ? HrpIbcRecord.toJSON(message.hrpIbcRecord) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHrpIbcRecordResponse>, I>>(
    object: I,
  ): QueryHrpIbcRecordResponse {
    const message = createBaseQueryHrpIbcRecordResponse();
    message.hrpIbcRecord =
      object.hrpIbcRecord !== undefined && object.hrpIbcRecord !== null
        ? HrpIbcRecord.fromPartial(object.hrpIbcRecord)
        : undefined;
    return message;
  },
};

function createBaseQueryNativeHrpRequest(): QueryNativeHrpRequest {
  return {};
}

export const QueryNativeHrpRequest = {
  encode(_: QueryNativeHrpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNativeHrpRequest {
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

  fromJSON(_: any): QueryNativeHrpRequest {
    return {};
  },

  toJSON(_: QueryNativeHrpRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNativeHrpRequest>, I>>(_: I): QueryNativeHrpRequest {
    const message = createBaseQueryNativeHrpRequest();
    return message;
  },
};

function createBaseQueryNativeHrpResponse(): QueryNativeHrpResponse {
  return {
    nativeHrp: "",
  };
}

export const QueryNativeHrpResponse = {
  encode(message: QueryNativeHrpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nativeHrp !== "") {
      writer.uint32(10).string(message.nativeHrp);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNativeHrpResponse {
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

  fromJSON(object: any): QueryNativeHrpResponse {
    return {
      nativeHrp: isSet(object.nativeHrp) ? String(object.nativeHrp) : "",
    };
  },

  toJSON(message: QueryNativeHrpResponse): unknown {
    const obj: any = {};
    message.nativeHrp !== undefined && (obj.nativeHrp = message.nativeHrp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNativeHrpResponse>, I>>(object: I): QueryNativeHrpResponse {
    const message = createBaseQueryNativeHrpResponse();
    message.nativeHrp = object.nativeHrp ?? "";
    return message;
  },
};
export interface Query {
  /** HrpIbcRecords returns to full list of records */
  HrpIbcRecords(request?: QueryHrpIbcRecordsRequest): Promise<QueryHrpIbcRecordsResponse>;
  /** HrpIbcRecord returns the record for a requested HRP */

  HrpIbcRecord(request: QueryHrpIbcRecordRequest): Promise<QueryHrpIbcRecordResponse>;
  /** NativeHrp returns the chain's native HRP */

  NativeHrp(request?: QueryNativeHrpRequest): Promise<QueryNativeHrpResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.HrpIbcRecords = this.HrpIbcRecords.bind(this);
    this.HrpIbcRecord = this.HrpIbcRecord.bind(this);
    this.NativeHrp = this.NativeHrp.bind(this);
  }

  HrpIbcRecords(request: QueryHrpIbcRecordsRequest = {}): Promise<QueryHrpIbcRecordsResponse> {
    const data = QueryHrpIbcRecordsRequest.encode(request).finish();
    const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "HrpIbcRecords", data);
    return promise.then((data) => QueryHrpIbcRecordsResponse.decode(new _m0.Reader(data)));
  }

  HrpIbcRecord(request: QueryHrpIbcRecordRequest): Promise<QueryHrpIbcRecordResponse> {
    const data = QueryHrpIbcRecordRequest.encode(request).finish();
    const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "HrpIbcRecord", data);
    return promise.then((data) => QueryHrpIbcRecordResponse.decode(new _m0.Reader(data)));
  }

  NativeHrp(request: QueryNativeHrpRequest = {}): Promise<QueryNativeHrpResponse> {
    const data = QueryNativeHrpRequest.encode(request).finish();
    const promise = this.rpc.request("bech32ibc.bech32ibc.v1beta1.Query", "NativeHrp", data);
    return promise.then((data) => QueryNativeHrpResponse.decode(new _m0.Reader(data)));
  }
}
