/* eslint-disable */
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, BurnAccount } from "./burn";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial, Exact, isSet, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.burn.v1";
/** QueryParamsRequest defines the request type for querying x/burn parameters. */

export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/burn parameters. */

export interface QueryParamsResponse {
  params?: Params;
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
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
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
    params: undefined,
  };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
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
  encode(message: QueryBurnAccountsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }

    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBurnAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryBurnAccountsRequest): unknown {
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
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
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
  encode(message: QueryBurnAccountsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.burnAccounts) {
      BurnAccountInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }

    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBurnAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      burnAccounts: Array.isArray(object?.burnAccounts)
        ? object.burnAccounts.map((e: any) => BurnAccountInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryBurnAccountsResponse): unknown {
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
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
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
  encode(message: BurnAccountInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): BurnAccountInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      burnAccount: isSet(object.burnAccount) ? BurnAccount.fromJSON(object.burnAccount) : undefined,
      address: isSet(object.address) ? String(object.address) : "",
      addressHex: isSet(object.addressHex) ? String(object.addressHex) : "",
    };
  },

  toJSON(message: BurnAccountInfo): unknown {
    const obj: any = {};
    message.burnAccount !== undefined &&
      (obj.burnAccount = message.burnAccount ? BurnAccount.toJSON(message.burnAccount) : undefined);
    message.address !== undefined && (obj.address = message.address);
    message.addressHex !== undefined && (obj.addressHex = message.addressHex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BurnAccountInfo>, I>>(object: I): BurnAccountInfo {
    const message = createBaseBurnAccountInfo();
    message.burnAccount =
      object.burnAccount !== undefined && object.burnAccount !== null
        ? BurnAccount.fromPartial(object.burnAccount)
        : undefined;
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
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  BurnAccounts(request: QueryBurnAccountsRequest): Promise<QueryBurnAccountsResponse> {
    const data = QueryBurnAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.burn.v1.Query", "BurnAccounts", data);
    return promise.then((data) => QueryBurnAccountsResponse.decode(new _m0.Reader(data)));
  }
}
