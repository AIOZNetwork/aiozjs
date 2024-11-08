/* eslint-disable */
import { Params } from "./feemarket";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, Rpc } from "../../../helpers";
export const protobufPackage = "ethermint.feemarket.v1";
/** QueryParamsRequest defines the request type for querying x/evm parameters. */
export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface QueryParamsResponse {
  /** params define the evm module parameters. */
  params: Params;
}
/**
 * QueryBaseFeeRequest defines the request type for querying the EIP1559 base
 * fee.
 */
export interface QueryBaseFeeRequest {}
/** QueryBaseFeeResponse returns the EIP1559 base fee. */
export interface QueryBaseFeeResponse {
  /** base_fee is the EIP1559 base fee */
  baseFee: string;
}
/**
 * QueryBlockGasRequest defines the request type for querying the EIP1559 base
 * fee.
 */
export interface QueryBlockGasRequest {}
/** QueryBlockGasResponse returns block gas used for a given height. */
export interface QueryBlockGasResponse {
  /** gas is the returned block gas */
  gas: bigint;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/ethermint.feemarket.v1.QueryParamsRequest",
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
  typeUrl: "/ethermint.feemarket.v1.QueryParamsResponse",
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
function createBaseQueryBaseFeeRequest(): QueryBaseFeeRequest {
  return {};
}
export const QueryBaseFeeRequest = {
  typeUrl: "/ethermint.feemarket.v1.QueryBaseFeeRequest",
  encode(_: QueryBaseFeeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBaseFeeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseFeeRequest();
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
  fromJSON(_: any): QueryBaseFeeRequest {
    const obj = createBaseQueryBaseFeeRequest();
    return obj;
  },
  toJSON(_: QueryBaseFeeRequest): JsonSafe<QueryBaseFeeRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBaseFeeRequest>, I>>(_: I): QueryBaseFeeRequest {
    const message = createBaseQueryBaseFeeRequest();
    return message;
  },
};
function createBaseQueryBaseFeeResponse(): QueryBaseFeeResponse {
  return {
    baseFee: "",
  };
}
export const QueryBaseFeeResponse = {
  typeUrl: "/ethermint.feemarket.v1.QueryBaseFeeResponse",
  encode(message: QueryBaseFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseFee !== "") {
      writer.uint32(10).string(message.baseFee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBaseFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBaseFeeResponse {
    const obj = createBaseQueryBaseFeeResponse();
    if (isSet(object.baseFee)) obj.baseFee = String(object.baseFee);
    return obj;
  },
  toJSON(message: QueryBaseFeeResponse): JsonSafe<QueryBaseFeeResponse> {
    const obj: any = {};
    message.baseFee !== undefined && (obj.baseFee = message.baseFee);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBaseFeeResponse>, I>>(object: I): QueryBaseFeeResponse {
    const message = createBaseQueryBaseFeeResponse();
    message.baseFee = object.baseFee ?? "";
    return message;
  },
};
function createBaseQueryBlockGasRequest(): QueryBlockGasRequest {
  return {};
}
export const QueryBlockGasRequest = {
  typeUrl: "/ethermint.feemarket.v1.QueryBlockGasRequest",
  encode(_: QueryBlockGasRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockGasRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockGasRequest();
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
  fromJSON(_: any): QueryBlockGasRequest {
    const obj = createBaseQueryBlockGasRequest();
    return obj;
  },
  toJSON(_: QueryBlockGasRequest): JsonSafe<QueryBlockGasRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBlockGasRequest>, I>>(_: I): QueryBlockGasRequest {
    const message = createBaseQueryBlockGasRequest();
    return message;
  },
};
function createBaseQueryBlockGasResponse(): QueryBlockGasResponse {
  return {
    gas: BigInt(0),
  };
}
export const QueryBlockGasResponse = {
  typeUrl: "/ethermint.feemarket.v1.QueryBlockGasResponse",
  encode(message: QueryBlockGasResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gas !== BigInt(0)) {
      writer.uint32(8).int64(message.gas);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockGasResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockGasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBlockGasResponse {
    const obj = createBaseQueryBlockGasResponse();
    if (isSet(object.gas)) obj.gas = BigInt(object.gas.toString());
    return obj;
  },
  toJSON(message: QueryBlockGasResponse): JsonSafe<QueryBlockGasResponse> {
    const obj: any = {};
    message.gas !== undefined && (obj.gas = (message.gas || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBlockGasResponse>, I>>(object: I): QueryBlockGasResponse {
    const message = createBaseQueryBlockGasResponse();
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = BigInt(object.gas.toString());
    }
    return message;
  },
};
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of x/feemarket module. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** BaseFee queries the base fee of the parent block of the current block. */
  BaseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse>;
  /** BlockGas queries the gas used at a given block height */
  BlockGas(request?: QueryBlockGasRequest): Promise<QueryBlockGasResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.BaseFee = this.BaseFee.bind(this);
    this.BlockGas = this.BlockGas.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  BaseFee(request: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponse> {
    const data = QueryBaseFeeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "BaseFee", data);
    return promise.then((data) => QueryBaseFeeResponse.decode(new BinaryReader(data)));
  }
  BlockGas(request: QueryBlockGasRequest = {}): Promise<QueryBlockGasResponse> {
    const data = QueryBlockGasRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "BlockGas", data);
    return promise.then((data) => QueryBlockGasResponse.decode(new BinaryReader(data)));
  }
}
