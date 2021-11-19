/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "../../../aioz/staking/v1beta1/staking";
import {
  QueryValidatorsResponse,
  QueryValidatorResponse,
  QueryValidatorDelegationsResponse,
  QueryValidatorUnbondingDelegationsResponse,
  QueryDelegationResponse,
  QueryUnbondingDelegationResponse,
  QueryDelegatorDelegationsResponse,
  QueryDelegatorUnbondingDelegationsResponse,
  QueryRedelegationsResponse,
  QueryDelegatorValidatorsResponse,
  QueryDelegatorValidatorResponse,
  QueryHistoricalInfoResponse,
  QueryPoolResponse,
  QueryValidatorsRequest,
  QueryValidatorRequest,
  QueryValidatorDelegationsRequest,
  QueryValidatorUnbondingDelegationsRequest,
  QueryDelegationRequest,
  QueryUnbondingDelegationRequest,
  QueryDelegatorDelegationsRequest,
  QueryDelegatorUnbondingDelegationsRequest,
  QueryRedelegationsRequest,
  QueryDelegatorValidatorsRequest,
  QueryDelegatorValidatorRequest,
  QueryHistoricalInfoRequest,
  QueryPoolRequest,
} from "../../../cosmos/staking/v1beta1/query";

export const protobufPackage = "aioz.staking.v1beta1";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

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
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
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
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Validators queries all validators that match the given status. */
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
  /** Validator queries validator info for given validator address. */
  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
  /** ValidatorDelegations queries delegate info for given validator. */
  ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
  /** ValidatorUnbondingDelegations queries unbonding delegations of a validator. */
  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse>;
  /** Delegation queries delegate info for given validator delegator pair. */
  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
  /**
   * UnbondingDelegation queries unbonding info for given validator delegator
   * pair.
   */
  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
  /** DelegatorDelegations queries all delegations of a given delegator address. */
  DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
  /**
   * DelegatorUnbondingDelegations queries all unbonding delegations of a given
   * delegator address.
   */
  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse>;
  /** Redelegations queries redelegations of given address. */
  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
  /**
   * DelegatorValidators queries all validators info for given delegator
   * address.
   */
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  /**
   * DelegatorValidator queries validator info for given delegator validator
   * pair.
   */
  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
  /** HistoricalInfo queries the historical info for given height. */
  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
  /** Pool queries the pool info. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Parameters queries the staking parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Validators = this.Validators.bind(this);
    this.Validator = this.Validator.bind(this);
    this.ValidatorDelegations = this.ValidatorDelegations.bind(this);
    this.ValidatorUnbondingDelegations = this.ValidatorUnbondingDelegations.bind(this);
    this.Delegation = this.Delegation.bind(this);
    this.UnbondingDelegation = this.UnbondingDelegation.bind(this);
    this.DelegatorDelegations = this.DelegatorDelegations.bind(this);
    this.DelegatorUnbondingDelegations = this.DelegatorUnbondingDelegations.bind(this);
    this.Redelegations = this.Redelegations.bind(this);
    this.DelegatorValidators = this.DelegatorValidators.bind(this);
    this.DelegatorValidator = this.DelegatorValidator.bind(this);
    this.HistoricalInfo = this.HistoricalInfo.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Params = this.Params.bind(this);
  }
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse> {
    const data = QueryValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Validators", data);
    return promise.then((data) => QueryValidatorsResponse.decode(new _m0.Reader(data)));
  }

  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse> {
    const data = QueryValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Validator", data);
    return promise.then((data) => QueryValidatorResponse.decode(new _m0.Reader(data)));
  }

  ValidatorDelegations(
    request: QueryValidatorDelegationsRequest,
  ): Promise<QueryValidatorDelegationsResponse> {
    const data = QueryValidatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "ValidatorDelegations", data);
    return promise.then((data) => QueryValidatorDelegationsResponse.decode(new _m0.Reader(data)));
  }

  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse> {
    const data = QueryValidatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "ValidatorUnbondingDelegations", data);
    return promise.then((data) => QueryValidatorUnbondingDelegationsResponse.decode(new _m0.Reader(data)));
  }

  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse> {
    const data = QueryDelegationRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Delegation", data);
    return promise.then((data) => QueryDelegationResponse.decode(new _m0.Reader(data)));
  }

  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse> {
    const data = QueryUnbondingDelegationRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "UnbondingDelegation", data);
    return promise.then((data) => QueryUnbondingDelegationResponse.decode(new _m0.Reader(data)));
  }

  DelegatorDelegations(
    request: QueryDelegatorDelegationsRequest,
  ): Promise<QueryDelegatorDelegationsResponse> {
    const data = QueryDelegatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "DelegatorDelegations", data);
    return promise.then((data) => QueryDelegatorDelegationsResponse.decode(new _m0.Reader(data)));
  }

  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse> {
    const data = QueryDelegatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "DelegatorUnbondingDelegations", data);
    return promise.then((data) => QueryDelegatorUnbondingDelegationsResponse.decode(new _m0.Reader(data)));
  }

  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse> {
    const data = QueryRedelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Redelegations", data);
    return promise.then((data) => QueryRedelegationsResponse.decode(new _m0.Reader(data)));
  }

  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse> {
    const data = QueryDelegatorValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "DelegatorValidators", data);
    return promise.then((data) => QueryDelegatorValidatorsResponse.decode(new _m0.Reader(data)));
  }

  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse> {
    const data = QueryDelegatorValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "DelegatorValidator", data);
    return promise.then((data) => QueryDelegatorValidatorResponse.decode(new _m0.Reader(data)));
  }

  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse> {
    const data = QueryHistoricalInfoRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "HistoricalInfo", data);
    return promise.then((data) => QueryHistoricalInfoResponse.decode(new _m0.Reader(data)));
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Pool", data);
    return promise.then((data) => QueryPoolResponse.decode(new _m0.Reader(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
