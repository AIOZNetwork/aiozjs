/* eslint-disable */
import { Params } from "./mint";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, bytesFromBase64, base64FromBytes, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.mint.v1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params;
}
/** QueryInflationRequest is the request type for the Query/Inflation RPC method. */
export interface QueryInflationRequest {}
/**
 * QueryInflationResponse is the response type for the Query/Inflation RPC
 * method.
 */
export interface QueryInflationResponse {
  /** inflation is the current minting inflation value. */
  inflation: Uint8Array;
}
/**
 * QueryAnnualInflationRequest is the request type for the Query/AnnualInflation
 * RPC method.
 */
export interface QueryAnnualInflationRequest {}
/**
 * QueryAnnualInflationResponse is the response type for the
 * Query/AnnualInflation RPC method.
 */
export interface QueryAnnualInflationResponse {
  /** annual_inflation is the current minting annual inflation value. */
  annualInflation: Uint8Array;
}
/**
 * QueryAnnualProvisionsRequest is the request type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsRequest {}
/**
 * QueryAnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsResponse {
  /** annual_provisions is the current minting annual provisions value. */
  annualProvisions: Uint8Array;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/aioz.mint.v1.QueryParamsRequest",
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
  typeUrl: "/aioz.mint.v1.QueryParamsResponse",
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
function createBaseQueryInflationRequest(): QueryInflationRequest {
  return {};
}
export const QueryInflationRequest = {
  typeUrl: "/aioz.mint.v1.QueryInflationRequest",
  encode(_: QueryInflationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryInflationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRequest();
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
  fromJSON(_: any): QueryInflationRequest {
    const obj = createBaseQueryInflationRequest();
    return obj;
  },
  toJSON(_: QueryInflationRequest): JsonSafe<QueryInflationRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRequest>, I>>(_: I): QueryInflationRequest {
    const message = createBaseQueryInflationRequest();
    return message;
  },
};
function createBaseQueryInflationResponse(): QueryInflationResponse {
  return {
    inflation: new Uint8Array(),
  };
}
export const QueryInflationResponse = {
  typeUrl: "/aioz.mint.v1.QueryInflationResponse",
  encode(message: QueryInflationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.inflation.length !== 0) {
      writer.uint32(10).bytes(message.inflation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryInflationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inflation = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryInflationResponse {
    const obj = createBaseQueryInflationResponse();
    if (isSet(object.inflation)) obj.inflation = bytesFromBase64(object.inflation);
    return obj;
  },
  toJSON(message: QueryInflationResponse): JsonSafe<QueryInflationResponse> {
    const obj: any = {};
    message.inflation !== undefined &&
      (obj.inflation = base64FromBytes(
        message.inflation !== undefined ? message.inflation : new Uint8Array(),
      ));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationResponse>, I>>(object: I): QueryInflationResponse {
    const message = createBaseQueryInflationResponse();
    message.inflation = object.inflation ?? new Uint8Array();
    return message;
  },
};
function createBaseQueryAnnualInflationRequest(): QueryAnnualInflationRequest {
  return {};
}
export const QueryAnnualInflationRequest = {
  typeUrl: "/aioz.mint.v1.QueryAnnualInflationRequest",
  encode(_: QueryAnnualInflationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAnnualInflationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualInflationRequest();
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
  fromJSON(_: any): QueryAnnualInflationRequest {
    const obj = createBaseQueryAnnualInflationRequest();
    return obj;
  },
  toJSON(_: QueryAnnualInflationRequest): JsonSafe<QueryAnnualInflationRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualInflationRequest>, I>>(
    _: I,
  ): QueryAnnualInflationRequest {
    const message = createBaseQueryAnnualInflationRequest();
    return message;
  },
};
function createBaseQueryAnnualInflationResponse(): QueryAnnualInflationResponse {
  return {
    annualInflation: new Uint8Array(),
  };
}
export const QueryAnnualInflationResponse = {
  typeUrl: "/aioz.mint.v1.QueryAnnualInflationResponse",
  encode(message: QueryAnnualInflationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.annualInflation.length !== 0) {
      writer.uint32(10).bytes(message.annualInflation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAnnualInflationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualInflationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annualInflation = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAnnualInflationResponse {
    const obj = createBaseQueryAnnualInflationResponse();
    if (isSet(object.annualInflation)) obj.annualInflation = bytesFromBase64(object.annualInflation);
    return obj;
  },
  toJSON(message: QueryAnnualInflationResponse): JsonSafe<QueryAnnualInflationResponse> {
    const obj: any = {};
    message.annualInflation !== undefined &&
      (obj.annualInflation = base64FromBytes(
        message.annualInflation !== undefined ? message.annualInflation : new Uint8Array(),
      ));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualInflationResponse>, I>>(
    object: I,
  ): QueryAnnualInflationResponse {
    const message = createBaseQueryAnnualInflationResponse();
    message.annualInflation = object.annualInflation ?? new Uint8Array();
    return message;
  },
};
function createBaseQueryAnnualProvisionsRequest(): QueryAnnualProvisionsRequest {
  return {};
}
export const QueryAnnualProvisionsRequest = {
  typeUrl: "/aioz.mint.v1.QueryAnnualProvisionsRequest",
  encode(_: QueryAnnualProvisionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAnnualProvisionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsRequest();
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
  fromJSON(_: any): QueryAnnualProvisionsRequest {
    const obj = createBaseQueryAnnualProvisionsRequest();
    return obj;
  },
  toJSON(_: QueryAnnualProvisionsRequest): JsonSafe<QueryAnnualProvisionsRequest> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsRequest>, I>>(
    _: I,
  ): QueryAnnualProvisionsRequest {
    const message = createBaseQueryAnnualProvisionsRequest();
    return message;
  },
};
function createBaseQueryAnnualProvisionsResponse(): QueryAnnualProvisionsResponse {
  return {
    annualProvisions: new Uint8Array(),
  };
}
export const QueryAnnualProvisionsResponse = {
  typeUrl: "/aioz.mint.v1.QueryAnnualProvisionsResponse",
  encode(message: QueryAnnualProvisionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.annualProvisions.length !== 0) {
      writer.uint32(10).bytes(message.annualProvisions);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAnnualProvisionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annualProvisions = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAnnualProvisionsResponse {
    const obj = createBaseQueryAnnualProvisionsResponse();
    if (isSet(object.annualProvisions)) obj.annualProvisions = bytesFromBase64(object.annualProvisions);
    return obj;
  },
  toJSON(message: QueryAnnualProvisionsResponse): JsonSafe<QueryAnnualProvisionsResponse> {
    const obj: any = {};
    message.annualProvisions !== undefined &&
      (obj.annualProvisions = base64FromBytes(
        message.annualProvisions !== undefined ? message.annualProvisions : new Uint8Array(),
      ));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsResponse>, I>>(
    object: I,
  ): QueryAnnualProvisionsResponse {
    const message = createBaseQueryAnnualProvisionsResponse();
    message.annualProvisions = object.annualProvisions ?? new Uint8Array();
    return message;
  },
};
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of minting parameters. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Inflation returns the current minting inflation value. */
  Inflation(request?: QueryInflationRequest): Promise<QueryInflationResponse>;
  /** AnnualInflation returns the current minting annual inflation value. */
  AnnualInflation(request?: QueryAnnualInflationRequest): Promise<QueryAnnualInflationResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Inflation = this.Inflation.bind(this);
    this.AnnualInflation = this.AnnualInflation.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.mint.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  Inflation(request: QueryInflationRequest = {}): Promise<QueryInflationResponse> {
    const data = QueryInflationRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.mint.v1.Query", "Inflation", data);
    return promise.then((data) => QueryInflationResponse.decode(new BinaryReader(data)));
  }
  AnnualInflation(request: QueryAnnualInflationRequest = {}): Promise<QueryAnnualInflationResponse> {
    const data = QueryAnnualInflationRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.mint.v1.Query", "AnnualInflation", data);
    return promise.then((data) => QueryAnnualInflationResponse.decode(new BinaryReader(data)));
  }
}
