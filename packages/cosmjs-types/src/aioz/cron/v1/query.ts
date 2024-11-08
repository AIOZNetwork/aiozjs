/* eslint-disable */
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params } from "./cron";
import { Any } from "../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.cron.v1";
/** QueryParamsRequest defines the request type for querying x/cron parameters. */
export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/cron parameters. */
export interface QueryParamsResponse {
  params: Params;
}
/** QueryEntriesRequest defines the RPC request for looking up cron entries. */
export interface QueryEntriesRequest {
  /** module is the specific module you want look up. Leave empty to get all entries of all modules. */
  module: string;
  /** ids is the specific ids you want look up. Leave empty to get all entries. */
  ids: string[];
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryEntriesResponse defines the RPC response of an Entries query. */
export interface QueryEntriesResponse {
  entries: Any[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/aioz.cron.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromJSON(_: any): QueryParamsRequest {
    const obj = createBaseQueryParamsRequest();
    return obj;
  },
  toJSON(_: QueryParamsRequest): JsonSafe<QueryParamsRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({}),
  };
}
export const QueryParamsResponse = {
  typeUrl: "/aioz.cron.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    const obj = createBaseQueryParamsResponse();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: QueryParamsResponse): JsonSafe<QueryParamsResponse> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
function createBaseQueryEntriesRequest(): QueryEntriesRequest {
  return {
    module: "",
    ids: [],
    pagination: undefined,
  };
}
export const QueryEntriesRequest = {
  typeUrl: "/aioz.cron.v1.QueryEntriesRequest",
  encode(message: QueryEntriesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    for (const v of message.ids) {
      writer.uint32(18).string(v!);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEntriesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEntriesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.ids.push(reader.string());
          break;
        case 99:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryEntriesRequest {
    const obj = createBaseQueryEntriesRequest();
    if (isSet(object.module)) obj.module = String(object.module);
    if (Array.isArray(object?.ids)) obj.ids = object.ids.map((e: any) => String(e));
    if (isSet(object.pagination)) obj.pagination = PageRequest.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryEntriesRequest): JsonSafe<QueryEntriesRequest> {
    const obj: any = {};
    message.module !== undefined && (obj.module = message.module);
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEntriesRequest>, I>>(object: I): QueryEntriesRequest {
    const message = createBaseQueryEntriesRequest();
    message.module = object.module ?? "";
    message.ids = object.ids?.map((e) => e) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryEntriesResponse(): QueryEntriesResponse {
  return {
    entries: [],
    pagination: undefined,
  };
}
export const QueryEntriesResponse = {
  typeUrl: "/aioz.cron.v1.QueryEntriesResponse",
  encode(message: QueryEntriesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.entries) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEntriesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEntriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(Any.decode(reader, reader.uint32()));
          break;
        case 99:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryEntriesResponse {
    const obj = createBaseQueryEntriesResponse();
    if (Array.isArray(object?.entries)) obj.entries = object.entries.map((e: any) => Any.fromJSON(e));
    if (isSet(object.pagination)) obj.pagination = PageResponse.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryEntriesResponse): JsonSafe<QueryEntriesResponse> {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.entries = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryEntriesResponse>, I>>(object: I): QueryEntriesResponse {
    const message = createBaseQueryEntriesResponse();
    message.entries = object.entries?.map((e) => Any.fromPartial(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    }
    return message;
  },
};
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of x/cron module. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Entries queries for cron entries. */
  Entries(request: QueryEntriesRequest): Promise<QueryEntriesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Entries = this.Entries.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.cron.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  Entries(request: QueryEntriesRequest): Promise<QueryEntriesResponse> {
    const data = QueryEntriesRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.cron.v1.Query", "Entries", data);
    return promise.then((data) => QueryEntriesResponse.decode(new BinaryReader(data)));
  }
}
