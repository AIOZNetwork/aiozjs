/* eslint-disable */
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, BurnAccount } from "./burn";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.burn.v1";
/** QueryParamsRequest defines the request type for querying x/burn parameters. */
export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/burn parameters. */
export interface QueryParamsResponse {
  params: Params;
}
/** QueryBurnAccountsRequest defines the RPC request for looking up burn account entries. */
export interface QueryBurnAccountsRequest {
  /** ids is the specific IDs you want look up. Leave empty to get all entries. */
  ids: string[];
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryBurnAccountsResponse defines the RPC response of a BurnAccounts query. */
export interface QueryBurnAccountsResponse {
  burnAccounts: BurnAccountInfo[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** BurnAccountInfo defines the burn account response. */
export interface BurnAccountInfo {
  /** burn_account is the details of the burn account. */
  burnAccount?: BurnAccount;
  /** address is the bech32 address of the burn account. */
  address: string;
  /** address_hex is the hex address of the burn account. */
  addressHex: string;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/aioz.burn.v1.QueryParamsRequest",
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
  typeUrl: "/aioz.burn.v1.QueryParamsResponse",
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
function createBaseQueryBurnAccountsRequest(): QueryBurnAccountsRequest {
  return {
    ids: [],
    pagination: undefined,
  };
}
export const QueryBurnAccountsRequest = {
  typeUrl: "/aioz.burn.v1.QueryBurnAccountsRequest",
  encode(message: QueryBurnAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBurnAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBurnAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
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
  fromJSON(object: any): QueryBurnAccountsRequest {
    const obj = createBaseQueryBurnAccountsRequest();
    if (Array.isArray(object?.ids)) obj.ids = object.ids.map((e: any) => String(e));
    if (isSet(object.pagination)) obj.pagination = PageRequest.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryBurnAccountsRequest): JsonSafe<QueryBurnAccountsRequest> {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBurnAccountsRequest>, I>>(
    object: I,
  ): QueryBurnAccountsRequest {
    const message = createBaseQueryBurnAccountsRequest();
    message.ids = object.ids?.map((e) => e) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryBurnAccountsResponse(): QueryBurnAccountsResponse {
  return {
    burnAccounts: [],
    pagination: undefined,
  };
}
export const QueryBurnAccountsResponse = {
  typeUrl: "/aioz.burn.v1.QueryBurnAccountsResponse",
  encode(message: QueryBurnAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.burnAccounts) {
      BurnAccountInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBurnAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBurnAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.burnAccounts.push(BurnAccountInfo.decode(reader, reader.uint32()));
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
  fromJSON(object: any): QueryBurnAccountsResponse {
    const obj = createBaseQueryBurnAccountsResponse();
    if (Array.isArray(object?.burnAccounts))
      obj.burnAccounts = object.burnAccounts.map((e: any) => BurnAccountInfo.fromJSON(e));
    if (isSet(object.pagination)) obj.pagination = PageResponse.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryBurnAccountsResponse): JsonSafe<QueryBurnAccountsResponse> {
    const obj: any = {};
    if (message.burnAccounts) {
      obj.burnAccounts = message.burnAccounts.map((e) => (e ? BurnAccountInfo.toJSON(e) : undefined));
    } else {
      obj.burnAccounts = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBurnAccountsResponse>, I>>(
    object: I,
  ): QueryBurnAccountsResponse {
    const message = createBaseQueryBurnAccountsResponse();
    message.burnAccounts = object.burnAccounts?.map((e) => BurnAccountInfo.fromPartial(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseBurnAccountInfo(): BurnAccountInfo {
  return {
    burnAccount: undefined,
    address: "",
    addressHex: "",
  };
}
export const BurnAccountInfo = {
  typeUrl: "/aioz.burn.v1.BurnAccountInfo",
  encode(message: BurnAccountInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.burnAccount !== undefined) {
      BurnAccount.encode(message.burnAccount, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.addressHex !== "") {
      writer.uint32(26).string(message.addressHex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BurnAccountInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurnAccountInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.burnAccount = BurnAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.addressHex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BurnAccountInfo {
    const obj = createBaseBurnAccountInfo();
    if (isSet(object.burnAccount)) obj.burnAccount = BurnAccount.fromJSON(object.burnAccount);
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.addressHex)) obj.addressHex = String(object.addressHex);
    return obj;
  },
  toJSON(message: BurnAccountInfo): JsonSafe<BurnAccountInfo> {
    const obj: any = {};
    message.burnAccount !== undefined &&
      (obj.burnAccount = message.burnAccount ? BurnAccount.toJSON(message.burnAccount) : undefined);
    message.address !== undefined && (obj.address = message.address);
    message.addressHex !== undefined && (obj.addressHex = message.addressHex);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<BurnAccountInfo>, I>>(object: I): BurnAccountInfo {
    const message = createBaseBurnAccountInfo();
    if (object.burnAccount !== undefined && object.burnAccount !== null) {
      message.burnAccount = BurnAccount.fromPartial(object.burnAccount);
    }
    message.address = object.address ?? "";
    message.addressHex = object.addressHex ?? "";
    return message;
  },
};
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of x/burn module. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** BurnAccounts queries for burn account entries. */
  BurnAccounts(request: QueryBurnAccountsRequest): Promise<QueryBurnAccountsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.BurnAccounts = this.BurnAccounts.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.burn.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  BurnAccounts(request: QueryBurnAccountsRequest): Promise<QueryBurnAccountsResponse> {
    const data = QueryBurnAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.burn.v1.Query", "BurnAccounts", data);
    return promise.then((data) => QueryBurnAccountsResponse.decode(new BinaryReader(data)));
  }
}
