/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.icamauth.v1beta1";
/** QueryInterchainAccountRequest is the request type for the Query/InterchainAccountAddress RPC. */

export interface QueryInterchainAccountRequest {
  owner: string;
  connectionId: string;
}
/** QueryInterchainAccountResponse the response type for the Query/InterchainAccountAddress RPC. */

export interface QueryInterchainAccountResponse {
  interchainAccountAddress: string;
}

function createBaseQueryInterchainAccountRequest(): QueryInterchainAccountRequest {
  return {
    owner: "",
    connectionId: "",
  };
}

export const QueryInterchainAccountRequest = {
  encode(message: QueryInterchainAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }

    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountRequest();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;

        case 2:
          message.connectionId = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): QueryInterchainAccountRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
    };
  },

  toJSON(message: QueryInterchainAccountRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterchainAccountRequest>, I>>(
    object: I,
  ): QueryInterchainAccountRequest {
    const message = createBaseQueryInterchainAccountRequest();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    return message;
  },
};

function createBaseQueryInterchainAccountResponse(): QueryInterchainAccountResponse {
  return {
    interchainAccountAddress: "",
  };
}

export const QueryInterchainAccountResponse = {
  encode(message: QueryInterchainAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interchainAccountAddress !== "") {
      writer.uint32(10).string(message.interchainAccountAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.interchainAccountAddress = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): QueryInterchainAccountResponse {
    return {
      interchainAccountAddress: isSet(object.interchainAccountAddress)
        ? String(object.interchainAccountAddress)
        : "",
    };
  },

  toJSON(message: QueryInterchainAccountResponse): unknown {
    const obj: any = {};
    message.interchainAccountAddress !== undefined &&
      (obj.interchainAccountAddress = message.interchainAccountAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryInterchainAccountResponse>, I>>(
    object: I,
  ): QueryInterchainAccountResponse {
    const message = createBaseQueryInterchainAccountResponse();
    message.interchainAccountAddress = object.interchainAccountAddress ?? "";
    return message;
  },
};
/** Query defines the gRPC querier service. */

export interface Query {
  /** QueryInterchainAccount returns the interchain account for given owner address on a given connection pair. */
  InterchainAccount(request: QueryInterchainAccountRequest): Promise<QueryInterchainAccountResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InterchainAccount = this.InterchainAccount.bind(this);
  }

  InterchainAccount(request: QueryInterchainAccountRequest): Promise<QueryInterchainAccountResponse> {
    const data = QueryInterchainAccountRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.icamauth.v1beta1.Query", "InterchainAccount", data);
    return promise.then((data) => QueryInterchainAccountResponse.decode(new _m0.Reader(data)));
  }
}
