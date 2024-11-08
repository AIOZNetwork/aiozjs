/* eslint-disable */
import { Params } from "./genesis";
import { Valset, DelegateKeys, EvmChainAddress, PendingIbcAutoForward } from "./types";
import { MsgValsetConfirm, MsgConfirmBatch, MsgConfirmLogicCall } from "./msgs";
import { BatchFees } from "./pool";
import { OutgoingTxBatch, OutgoingLogicCall, OutgoingTransferTx } from "./batch";
import { Attestation } from "./attestation";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet, bytesFromBase64, base64FromBytes, Rpc } from "../../../helpers";
export const protobufPackage = "gravity.gravity.v1";
export interface QueryParamsRequest {}
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryCurrentValsetRequest {
  chainName: string;
}
export interface QueryCurrentValsetResponse {
  valset: Valset;
}
export interface QueryValsetRequestRequest {
  chainName: string;
  nonce: bigint;
}
export interface QueryValsetRequestResponse {
  valset?: Valset;
}
export interface QueryValsetConfirmRequest {
  chainName: string;
  nonce: bigint;
  address: string;
}
export interface QueryValsetConfirmResponse {
  confirm?: MsgValsetConfirm;
}
export interface QueryValsetConfirmsByNonceRequest {
  chainName: string;
  nonce: bigint;
}
export interface QueryValsetConfirmsByNonceResponse {
  confirms: MsgValsetConfirm[];
}
export interface QueryLastValsetRequestsRequest {
  chainName: string;
}
export interface QueryLastValsetRequestsResponse {
  valsets: Valset[];
}
export interface QueryLastPendingValsetRequestByAddrRequest {
  chainName: string;
  address: string;
}
export interface QueryLastPendingValsetRequestByAddrResponse {
  valsets: Valset[];
}
export interface QueryBatchFeeRequest {
  chainName: string;
}
export interface QueryBatchFeeResponse {
  batchFees: BatchFees[];
}
export interface QueryLastPendingBatchRequestByAddrRequest {
  chainName: string;
  address: string;
}
export interface QueryLastPendingBatchRequestByAddrResponse {
  batch: OutgoingTxBatch[];
}
export interface QueryLastPendingLogicCallByAddrRequest {
  chainName: string;
  address: string;
}
export interface QueryLastPendingLogicCallByAddrResponse {
  call: OutgoingLogicCall[];
}
export interface QueryOutgoingTxBatchesRequest {
  chainName: string;
}
export interface QueryOutgoingTxBatchesResponse {
  batches: OutgoingTxBatch[];
}
export interface QueryOutgoingLogicCallsRequest {
  chainName: string;
}
export interface QueryOutgoingLogicCallsResponse {
  calls: OutgoingLogicCall[];
}
export interface QueryBatchRequestByNonceRequest {
  chainName: string;
  nonce: bigint;
  contractAddress: string;
}
export interface QueryBatchRequestByNonceResponse {
  batch: OutgoingTxBatch;
}
export interface QueryBatchConfirmsRequest {
  chainName: string;
  nonce: bigint;
  contractAddress: string;
}
export interface QueryBatchConfirmsResponse {
  confirms: MsgConfirmBatch[];
}
export interface QueryLogicConfirmsRequest {
  chainName: string;
  invalidationId: Uint8Array;
  invalidationNonce: bigint;
}
export interface QueryLogicConfirmsResponse {
  confirms: MsgConfirmLogicCall[];
}
export interface QueryLastEventNonceByAddrRequest {
  chainName: string;
  address: string;
}
export interface QueryLastEventNonceByAddrResponse {
  eventNonce: bigint;
}
export interface QueryERC20ToDenomRequest {
  chainName: string;
  erc20: string;
}
export interface QueryERC20ToDenomResponse {
  denom: string;
  cosmosOriginated: boolean;
}
export interface QueryDenomToERC20Request {
  chainName: string;
  denom: string;
}
export interface QueryDenomToERC20Response {
  erc20: string;
  cosmosOriginated: boolean;
}
/**
 * QueryLastObservedEvmBlockRequest defines the request for getting the height of the
 * last applied Ethereum Event on the bridge. This is expected to lag the actual
 * Ethereum block height significantly due to 1. Ethereum Finality and
 *  2. Consensus mirroring the state on Ethereum
 */
export interface QueryLastObservedEvmBlockRequest {
  /**
   * indicates whether to search for store data using the old Gravity v1 key "LastObservedEvmBlockHeightKey"
   * Note that queries before the Mercury upgrade at height 1282013 must set this to true
   */
  useV1Key: boolean;
  chainName: string;
}
export interface QueryLastObservedEvmBlockResponse {
  /**
   * a response of 0 indicates that no Ethereum events have been observed, and thus
   * the bridge is inactive
   */
  block: bigint;
}
/**
 * QueryLastObservedEvmNonceRequest defines the request for getting the event nonce
 * of the last applied Ethereum Event on the bridge.
 * Note that this is likely to lag the last executed event a little
 * due to 1. Ethereum Finality and 2. Consensus mirroring the Ethereum state
 */
export interface QueryLastObservedEvmNonceRequest {
  /**
   * indicates whether to search for store data using the old Gravity v1 key "LastObservedEventNonceKey"
   * Note that queries before the Mercury upgrade at height 1282013 must set this to true
   */
  useV1Key: boolean;
  chainName: string;
}
export interface QueryLastObservedEvmNonceResponse {
  /**
   * a response of 0 indicates that no Ethereum events have been observed, and thus
   * the bridge is inactive
   */
  nonce: bigint;
}
/**
 * QueryAttestationsRequest defines the request structure for getting recent
 * attestations with optional query parameters. By default, a limited set of
 * recent attestations will be returned, defined by 'limit'. These attestations
 * can be ordered ascending or descending by nonce, that defaults to ascending.
 * Filtering criteria may also be provided, including nonce, claim type, and
 * height. Note, that an attestation will be returned if it matches ANY of the
 * filter query parameters provided.
 */
export interface QueryAttestationsRequest {
  /** limit defines how many attestations to limit in the response. */
  limit: bigint;
  /**
   * order_by provides ordering of atteststions by nonce in the response. Either
   * 'asc' or 'desc' can be provided. If no value is provided, it defaults to
   * 'asc'.
   */
  orderBy: string;
  /** chain_name allows filtering attestations by Evm Chain name */
  chainName: string;
  /** claim_type allows filtering attestations by Ethereum claim type. */
  claimType: string;
  /** nonce allows filtering attestations by Ethereum claim nonce. */
  nonce: bigint;
  /** height allows filtering attestations by Ethereum claim height. */
  height: bigint;
  /**
   * indicates whether to search for store data using the old Gravity v1 key "OracleAttestationKey"
   * Note that queries before the Mercury upgrade at height 1282013 must set this to true
   */
  useV1Key: boolean;
}
export interface QueryAttestationsResponse {
  attestations: Attestation[];
}
export interface QueryDelegateKeys {}
export interface QueryDelegateKeysResponse {
  delegateKeys: DelegateKeys[];
}
export interface QueryDelegateKeysByValidatorAddress {
  validatorAddress: string;
}
export interface QueryDelegateKeysByValidatorAddressResponse {
  orchestratorAddress: string;
  evmAddresses: EvmChainAddress[];
}
export interface QueryDelegateKeysByEvmAddress {
  chainName: string;
  evmAddress: string;
}
export interface QueryDelegateKeysByEvmAddressResponse {
  validatorAddress: string;
  orchestratorAddress: string;
}
export interface QueryDelegateKeysByOrchestratorAddress {
  orchestratorAddress: string;
}
export interface QueryDelegateKeysByOrchestratorAddressResponse {
  validatorAddress: string;
  evmAddresses: EvmChainAddress[];
}
export interface QueryPendingSendToEvmChain {
  chainName: string;
  senderAddress: string;
}
export interface QueryPendingSendToEvmChainResponse {
  transfersInBatches: OutgoingTransferTx[];
  unbatchedTransfers: OutgoingTransferTx[];
}
export interface QueryPendingIbcAutoForwards {
  /** limit defines the number of pending forwards to return, in order of their SendToCosmos.EventNonce */
  limit: bigint;
  chainName: string;
}
export interface QueryPendingIbcAutoForwardsResponse {
  pendingIbcAutoForwards: PendingIbcAutoForward[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryParamsRequest",
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
  typeUrl: "/gravity.gravity.v1.QueryParamsResponse",
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
function createBaseQueryCurrentValsetRequest(): QueryCurrentValsetRequest {
  return {
    chainName: "",
  };
}
export const QueryCurrentValsetRequest = {
  typeUrl: "/gravity.gravity.v1.QueryCurrentValsetRequest",
  encode(message: QueryCurrentValsetRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentValsetRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentValsetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCurrentValsetRequest {
    const obj = createBaseQueryCurrentValsetRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryCurrentValsetRequest): JsonSafe<QueryCurrentValsetRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentValsetRequest>, I>>(
    object: I,
  ): QueryCurrentValsetRequest {
    const message = createBaseQueryCurrentValsetRequest();
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryCurrentValsetResponse(): QueryCurrentValsetResponse {
  return {
    valset: Valset.fromPartial({}),
  };
}
export const QueryCurrentValsetResponse = {
  typeUrl: "/gravity.gravity.v1.QueryCurrentValsetResponse",
  encode(message: QueryCurrentValsetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valset !== undefined) {
      Valset.encode(message.valset, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentValsetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentValsetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valset = Valset.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCurrentValsetResponse {
    const obj = createBaseQueryCurrentValsetResponse();
    if (isSet(object.valset)) obj.valset = Valset.fromJSON(object.valset);
    return obj;
  },
  toJSON(message: QueryCurrentValsetResponse): JsonSafe<QueryCurrentValsetResponse> {
    const obj: any = {};
    message.valset !== undefined && (obj.valset = message.valset ? Valset.toJSON(message.valset) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentValsetResponse>, I>>(
    object: I,
  ): QueryCurrentValsetResponse {
    const message = createBaseQueryCurrentValsetResponse();
    if (object.valset !== undefined && object.valset !== null) {
      message.valset = Valset.fromPartial(object.valset);
    }
    return message;
  },
};
function createBaseQueryValsetRequestRequest(): QueryValsetRequestRequest {
  return {
    chainName: "",
    nonce: BigInt(0),
  };
}
export const QueryValsetRequestRequest = {
  typeUrl: "/gravity.gravity.v1.QueryValsetRequestRequest",
  encode(message: QueryValsetRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetRequestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetRequestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetRequestRequest {
    const obj = createBaseQueryValsetRequestRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    return obj;
  },
  toJSON(message: QueryValsetRequestRequest): JsonSafe<QueryValsetRequestRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetRequestRequest>, I>>(
    object: I,
  ): QueryValsetRequestRequest {
    const message = createBaseQueryValsetRequestRequest();
    message.chainName = object.chainName ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    return message;
  },
};
function createBaseQueryValsetRequestResponse(): QueryValsetRequestResponse {
  return {
    valset: undefined,
  };
}
export const QueryValsetRequestResponse = {
  typeUrl: "/gravity.gravity.v1.QueryValsetRequestResponse",
  encode(message: QueryValsetRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valset !== undefined) {
      Valset.encode(message.valset, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valset = Valset.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetRequestResponse {
    const obj = createBaseQueryValsetRequestResponse();
    if (isSet(object.valset)) obj.valset = Valset.fromJSON(object.valset);
    return obj;
  },
  toJSON(message: QueryValsetRequestResponse): JsonSafe<QueryValsetRequestResponse> {
    const obj: any = {};
    message.valset !== undefined && (obj.valset = message.valset ? Valset.toJSON(message.valset) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetRequestResponse>, I>>(
    object: I,
  ): QueryValsetRequestResponse {
    const message = createBaseQueryValsetRequestResponse();
    if (object.valset !== undefined && object.valset !== null) {
      message.valset = Valset.fromPartial(object.valset);
    }
    return message;
  },
};
function createBaseQueryValsetConfirmRequest(): QueryValsetConfirmRequest {
  return {
    chainName: "",
    nonce: BigInt(0),
    address: "",
  };
}
export const QueryValsetConfirmRequest = {
  typeUrl: "/gravity.gravity.v1.QueryValsetConfirmRequest",
  encode(message: QueryValsetConfirmRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetConfirmRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetConfirmRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetConfirmRequest {
    const obj = createBaseQueryValsetConfirmRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryValsetConfirmRequest): JsonSafe<QueryValsetConfirmRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetConfirmRequest>, I>>(
    object: I,
  ): QueryValsetConfirmRequest {
    const message = createBaseQueryValsetConfirmRequest();
    message.chainName = object.chainName ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryValsetConfirmResponse(): QueryValsetConfirmResponse {
  return {
    confirm: undefined,
  };
}
export const QueryValsetConfirmResponse = {
  typeUrl: "/gravity.gravity.v1.QueryValsetConfirmResponse",
  encode(message: QueryValsetConfirmResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.confirm !== undefined) {
      MsgValsetConfirm.encode(message.confirm, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetConfirmResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.confirm = MsgValsetConfirm.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetConfirmResponse {
    const obj = createBaseQueryValsetConfirmResponse();
    if (isSet(object.confirm)) obj.confirm = MsgValsetConfirm.fromJSON(object.confirm);
    return obj;
  },
  toJSON(message: QueryValsetConfirmResponse): JsonSafe<QueryValsetConfirmResponse> {
    const obj: any = {};
    message.confirm !== undefined &&
      (obj.confirm = message.confirm ? MsgValsetConfirm.toJSON(message.confirm) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetConfirmResponse>, I>>(
    object: I,
  ): QueryValsetConfirmResponse {
    const message = createBaseQueryValsetConfirmResponse();
    if (object.confirm !== undefined && object.confirm !== null) {
      message.confirm = MsgValsetConfirm.fromPartial(object.confirm);
    }
    return message;
  },
};
function createBaseQueryValsetConfirmsByNonceRequest(): QueryValsetConfirmsByNonceRequest {
  return {
    chainName: "",
    nonce: BigInt(0),
  };
}
export const QueryValsetConfirmsByNonceRequest = {
  typeUrl: "/gravity.gravity.v1.QueryValsetConfirmsByNonceRequest",
  encode(
    message: QueryValsetConfirmsByNonceRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetConfirmsByNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetConfirmsByNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetConfirmsByNonceRequest {
    const obj = createBaseQueryValsetConfirmsByNonceRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    return obj;
  },
  toJSON(message: QueryValsetConfirmsByNonceRequest): JsonSafe<QueryValsetConfirmsByNonceRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetConfirmsByNonceRequest>, I>>(
    object: I,
  ): QueryValsetConfirmsByNonceRequest {
    const message = createBaseQueryValsetConfirmsByNonceRequest();
    message.chainName = object.chainName ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    return message;
  },
};
function createBaseQueryValsetConfirmsByNonceResponse(): QueryValsetConfirmsByNonceResponse {
  return {
    confirms: [],
  };
}
export const QueryValsetConfirmsByNonceResponse = {
  typeUrl: "/gravity.gravity.v1.QueryValsetConfirmsByNonceResponse",
  encode(
    message: QueryValsetConfirmsByNonceResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.confirms) {
      MsgValsetConfirm.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValsetConfirmsByNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValsetConfirmsByNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.confirms.push(MsgValsetConfirm.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValsetConfirmsByNonceResponse {
    const obj = createBaseQueryValsetConfirmsByNonceResponse();
    if (Array.isArray(object?.confirms))
      obj.confirms = object.confirms.map((e: any) => MsgValsetConfirm.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryValsetConfirmsByNonceResponse): JsonSafe<QueryValsetConfirmsByNonceResponse> {
    const obj: any = {};
    if (message.confirms) {
      obj.confirms = message.confirms.map((e) => (e ? MsgValsetConfirm.toJSON(e) : undefined));
    } else {
      obj.confirms = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValsetConfirmsByNonceResponse>, I>>(
    object: I,
  ): QueryValsetConfirmsByNonceResponse {
    const message = createBaseQueryValsetConfirmsByNonceResponse();
    message.confirms = object.confirms?.map((e) => MsgValsetConfirm.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLastValsetRequestsRequest(): QueryLastValsetRequestsRequest {
  return {
    chainName: "",
  };
}
export const QueryLastValsetRequestsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastValsetRequestsRequest",
  encode(
    message: QueryLastValsetRequestsRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastValsetRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastValsetRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastValsetRequestsRequest {
    const obj = createBaseQueryLastValsetRequestsRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryLastValsetRequestsRequest): JsonSafe<QueryLastValsetRequestsRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastValsetRequestsRequest>, I>>(
    object: I,
  ): QueryLastValsetRequestsRequest {
    const message = createBaseQueryLastValsetRequestsRequest();
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryLastValsetRequestsResponse(): QueryLastValsetRequestsResponse {
  return {
    valsets: [],
  };
}
export const QueryLastValsetRequestsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastValsetRequestsResponse",
  encode(
    message: QueryLastValsetRequestsResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.valsets) {
      Valset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastValsetRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastValsetRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsets.push(Valset.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastValsetRequestsResponse {
    const obj = createBaseQueryLastValsetRequestsResponse();
    if (Array.isArray(object?.valsets)) obj.valsets = object.valsets.map((e: any) => Valset.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryLastValsetRequestsResponse): JsonSafe<QueryLastValsetRequestsResponse> {
    const obj: any = {};
    if (message.valsets) {
      obj.valsets = message.valsets.map((e) => (e ? Valset.toJSON(e) : undefined));
    } else {
      obj.valsets = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastValsetRequestsResponse>, I>>(
    object: I,
  ): QueryLastValsetRequestsResponse {
    const message = createBaseQueryLastValsetRequestsResponse();
    message.valsets = object.valsets?.map((e) => Valset.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLastPendingValsetRequestByAddrRequest(): QueryLastPendingValsetRequestByAddrRequest {
  return {
    chainName: "",
    address: "",
  };
}
export const QueryLastPendingValsetRequestByAddrRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingValsetRequestByAddrRequest",
  encode(
    message: QueryLastPendingValsetRequestByAddrRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingValsetRequestByAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingValsetRequestByAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingValsetRequestByAddrRequest {
    const obj = createBaseQueryLastPendingValsetRequestByAddrRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(
    message: QueryLastPendingValsetRequestByAddrRequest,
  ): JsonSafe<QueryLastPendingValsetRequestByAddrRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingValsetRequestByAddrRequest>, I>>(
    object: I,
  ): QueryLastPendingValsetRequestByAddrRequest {
    const message = createBaseQueryLastPendingValsetRequestByAddrRequest();
    message.chainName = object.chainName ?? "";
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryLastPendingValsetRequestByAddrResponse(): QueryLastPendingValsetRequestByAddrResponse {
  return {
    valsets: [],
  };
}
export const QueryLastPendingValsetRequestByAddrResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingValsetRequestByAddrResponse",
  encode(
    message: QueryLastPendingValsetRequestByAddrResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.valsets) {
      Valset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingValsetRequestByAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingValsetRequestByAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsets.push(Valset.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingValsetRequestByAddrResponse {
    const obj = createBaseQueryLastPendingValsetRequestByAddrResponse();
    if (Array.isArray(object?.valsets)) obj.valsets = object.valsets.map((e: any) => Valset.fromJSON(e));
    return obj;
  },
  toJSON(
    message: QueryLastPendingValsetRequestByAddrResponse,
  ): JsonSafe<QueryLastPendingValsetRequestByAddrResponse> {
    const obj: any = {};
    if (message.valsets) {
      obj.valsets = message.valsets.map((e) => (e ? Valset.toJSON(e) : undefined));
    } else {
      obj.valsets = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingValsetRequestByAddrResponse>, I>>(
    object: I,
  ): QueryLastPendingValsetRequestByAddrResponse {
    const message = createBaseQueryLastPendingValsetRequestByAddrResponse();
    message.valsets = object.valsets?.map((e) => Valset.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryBatchFeeRequest(): QueryBatchFeeRequest {
  return {
    chainName: "",
  };
}
export const QueryBatchFeeRequest = {
  typeUrl: "/gravity.gravity.v1.QueryBatchFeeRequest",
  encode(message: QueryBatchFeeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchFeeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchFeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchFeeRequest {
    const obj = createBaseQueryBatchFeeRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryBatchFeeRequest): JsonSafe<QueryBatchFeeRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchFeeRequest>, I>>(object: I): QueryBatchFeeRequest {
    const message = createBaseQueryBatchFeeRequest();
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryBatchFeeResponse(): QueryBatchFeeResponse {
  return {
    batchFees: [],
  };
}
export const QueryBatchFeeResponse = {
  typeUrl: "/gravity.gravity.v1.QueryBatchFeeResponse",
  encode(message: QueryBatchFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.batchFees) {
      BatchFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchFees.push(BatchFees.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchFeeResponse {
    const obj = createBaseQueryBatchFeeResponse();
    if (Array.isArray(object?.batchFees))
      obj.batchFees = object.batchFees.map((e: any) => BatchFees.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryBatchFeeResponse): JsonSafe<QueryBatchFeeResponse> {
    const obj: any = {};
    if (message.batchFees) {
      obj.batchFees = message.batchFees.map((e) => (e ? BatchFees.toJSON(e) : undefined));
    } else {
      obj.batchFees = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchFeeResponse>, I>>(object: I): QueryBatchFeeResponse {
    const message = createBaseQueryBatchFeeResponse();
    message.batchFees = object.batchFees?.map((e) => BatchFees.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLastPendingBatchRequestByAddrRequest(): QueryLastPendingBatchRequestByAddrRequest {
  return {
    chainName: "",
    address: "",
  };
}
export const QueryLastPendingBatchRequestByAddrRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingBatchRequestByAddrRequest",
  encode(
    message: QueryLastPendingBatchRequestByAddrRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingBatchRequestByAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingBatchRequestByAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingBatchRequestByAddrRequest {
    const obj = createBaseQueryLastPendingBatchRequestByAddrRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(
    message: QueryLastPendingBatchRequestByAddrRequest,
  ): JsonSafe<QueryLastPendingBatchRequestByAddrRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingBatchRequestByAddrRequest>, I>>(
    object: I,
  ): QueryLastPendingBatchRequestByAddrRequest {
    const message = createBaseQueryLastPendingBatchRequestByAddrRequest();
    message.chainName = object.chainName ?? "";
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryLastPendingBatchRequestByAddrResponse(): QueryLastPendingBatchRequestByAddrResponse {
  return {
    batch: [],
  };
}
export const QueryLastPendingBatchRequestByAddrResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingBatchRequestByAddrResponse",
  encode(
    message: QueryLastPendingBatchRequestByAddrResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.batch) {
      OutgoingTxBatch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingBatchRequestByAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingBatchRequestByAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batch.push(OutgoingTxBatch.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingBatchRequestByAddrResponse {
    const obj = createBaseQueryLastPendingBatchRequestByAddrResponse();
    if (Array.isArray(object?.batch)) obj.batch = object.batch.map((e: any) => OutgoingTxBatch.fromJSON(e));
    return obj;
  },
  toJSON(
    message: QueryLastPendingBatchRequestByAddrResponse,
  ): JsonSafe<QueryLastPendingBatchRequestByAddrResponse> {
    const obj: any = {};
    if (message.batch) {
      obj.batch = message.batch.map((e) => (e ? OutgoingTxBatch.toJSON(e) : undefined));
    } else {
      obj.batch = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingBatchRequestByAddrResponse>, I>>(
    object: I,
  ): QueryLastPendingBatchRequestByAddrResponse {
    const message = createBaseQueryLastPendingBatchRequestByAddrResponse();
    message.batch = object.batch?.map((e) => OutgoingTxBatch.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLastPendingLogicCallByAddrRequest(): QueryLastPendingLogicCallByAddrRequest {
  return {
    chainName: "",
    address: "",
  };
}
export const QueryLastPendingLogicCallByAddrRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingLogicCallByAddrRequest",
  encode(
    message: QueryLastPendingLogicCallByAddrRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingLogicCallByAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingLogicCallByAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingLogicCallByAddrRequest {
    const obj = createBaseQueryLastPendingLogicCallByAddrRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryLastPendingLogicCallByAddrRequest): JsonSafe<QueryLastPendingLogicCallByAddrRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingLogicCallByAddrRequest>, I>>(
    object: I,
  ): QueryLastPendingLogicCallByAddrRequest {
    const message = createBaseQueryLastPendingLogicCallByAddrRequest();
    message.chainName = object.chainName ?? "";
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryLastPendingLogicCallByAddrResponse(): QueryLastPendingLogicCallByAddrResponse {
  return {
    call: [],
  };
}
export const QueryLastPendingLogicCallByAddrResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastPendingLogicCallByAddrResponse",
  encode(
    message: QueryLastPendingLogicCallByAddrResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.call) {
      OutgoingLogicCall.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastPendingLogicCallByAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastPendingLogicCallByAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.call.push(OutgoingLogicCall.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastPendingLogicCallByAddrResponse {
    const obj = createBaseQueryLastPendingLogicCallByAddrResponse();
    if (Array.isArray(object?.call)) obj.call = object.call.map((e: any) => OutgoingLogicCall.fromJSON(e));
    return obj;
  },
  toJSON(
    message: QueryLastPendingLogicCallByAddrResponse,
  ): JsonSafe<QueryLastPendingLogicCallByAddrResponse> {
    const obj: any = {};
    if (message.call) {
      obj.call = message.call.map((e) => (e ? OutgoingLogicCall.toJSON(e) : undefined));
    } else {
      obj.call = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastPendingLogicCallByAddrResponse>, I>>(
    object: I,
  ): QueryLastPendingLogicCallByAddrResponse {
    const message = createBaseQueryLastPendingLogicCallByAddrResponse();
    message.call = object.call?.map((e) => OutgoingLogicCall.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryOutgoingTxBatchesRequest(): QueryOutgoingTxBatchesRequest {
  return {
    chainName: "",
  };
}
export const QueryOutgoingTxBatchesRequest = {
  typeUrl: "/gravity.gravity.v1.QueryOutgoingTxBatchesRequest",
  encode(message: QueryOutgoingTxBatchesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOutgoingTxBatchesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingTxBatchesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryOutgoingTxBatchesRequest {
    const obj = createBaseQueryOutgoingTxBatchesRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryOutgoingTxBatchesRequest): JsonSafe<QueryOutgoingTxBatchesRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryOutgoingTxBatchesRequest>, I>>(
    object: I,
  ): QueryOutgoingTxBatchesRequest {
    const message = createBaseQueryOutgoingTxBatchesRequest();
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryOutgoingTxBatchesResponse(): QueryOutgoingTxBatchesResponse {
  return {
    batches: [],
  };
}
export const QueryOutgoingTxBatchesResponse = {
  typeUrl: "/gravity.gravity.v1.QueryOutgoingTxBatchesResponse",
  encode(
    message: QueryOutgoingTxBatchesResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.batches) {
      OutgoingTxBatch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOutgoingTxBatchesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingTxBatchesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batches.push(OutgoingTxBatch.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryOutgoingTxBatchesResponse {
    const obj = createBaseQueryOutgoingTxBatchesResponse();
    if (Array.isArray(object?.batches))
      obj.batches = object.batches.map((e: any) => OutgoingTxBatch.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryOutgoingTxBatchesResponse): JsonSafe<QueryOutgoingTxBatchesResponse> {
    const obj: any = {};
    if (message.batches) {
      obj.batches = message.batches.map((e) => (e ? OutgoingTxBatch.toJSON(e) : undefined));
    } else {
      obj.batches = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryOutgoingTxBatchesResponse>, I>>(
    object: I,
  ): QueryOutgoingTxBatchesResponse {
    const message = createBaseQueryOutgoingTxBatchesResponse();
    message.batches = object.batches?.map((e) => OutgoingTxBatch.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryOutgoingLogicCallsRequest(): QueryOutgoingLogicCallsRequest {
  return {
    chainName: "",
  };
}
export const QueryOutgoingLogicCallsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryOutgoingLogicCallsRequest",
  encode(
    message: QueryOutgoingLogicCallsRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOutgoingLogicCallsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingLogicCallsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryOutgoingLogicCallsRequest {
    const obj = createBaseQueryOutgoingLogicCallsRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryOutgoingLogicCallsRequest): JsonSafe<QueryOutgoingLogicCallsRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryOutgoingLogicCallsRequest>, I>>(
    object: I,
  ): QueryOutgoingLogicCallsRequest {
    const message = createBaseQueryOutgoingLogicCallsRequest();
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryOutgoingLogicCallsResponse(): QueryOutgoingLogicCallsResponse {
  return {
    calls: [],
  };
}
export const QueryOutgoingLogicCallsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryOutgoingLogicCallsResponse",
  encode(
    message: QueryOutgoingLogicCallsResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.calls) {
      OutgoingLogicCall.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOutgoingLogicCallsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingLogicCallsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.calls.push(OutgoingLogicCall.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryOutgoingLogicCallsResponse {
    const obj = createBaseQueryOutgoingLogicCallsResponse();
    if (Array.isArray(object?.calls)) obj.calls = object.calls.map((e: any) => OutgoingLogicCall.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryOutgoingLogicCallsResponse): JsonSafe<QueryOutgoingLogicCallsResponse> {
    const obj: any = {};
    if (message.calls) {
      obj.calls = message.calls.map((e) => (e ? OutgoingLogicCall.toJSON(e) : undefined));
    } else {
      obj.calls = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryOutgoingLogicCallsResponse>, I>>(
    object: I,
  ): QueryOutgoingLogicCallsResponse {
    const message = createBaseQueryOutgoingLogicCallsResponse();
    message.calls = object.calls?.map((e) => OutgoingLogicCall.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryBatchRequestByNonceRequest(): QueryBatchRequestByNonceRequest {
  return {
    chainName: "",
    nonce: BigInt(0),
    contractAddress: "",
  };
}
export const QueryBatchRequestByNonceRequest = {
  typeUrl: "/gravity.gravity.v1.QueryBatchRequestByNonceRequest",
  encode(
    message: QueryBatchRequestByNonceRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.contractAddress !== "") {
      writer.uint32(26).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchRequestByNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchRequestByNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchRequestByNonceRequest {
    const obj = createBaseQueryBatchRequestByNonceRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.contractAddress)) obj.contractAddress = String(object.contractAddress);
    return obj;
  },
  toJSON(message: QueryBatchRequestByNonceRequest): JsonSafe<QueryBatchRequestByNonceRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchRequestByNonceRequest>, I>>(
    object: I,
  ): QueryBatchRequestByNonceRequest {
    const message = createBaseQueryBatchRequestByNonceRequest();
    message.chainName = object.chainName ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
};
function createBaseQueryBatchRequestByNonceResponse(): QueryBatchRequestByNonceResponse {
  return {
    batch: OutgoingTxBatch.fromPartial({}),
  };
}
export const QueryBatchRequestByNonceResponse = {
  typeUrl: "/gravity.gravity.v1.QueryBatchRequestByNonceResponse",
  encode(
    message: QueryBatchRequestByNonceResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.batch !== undefined) {
      OutgoingTxBatch.encode(message.batch, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchRequestByNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchRequestByNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batch = OutgoingTxBatch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchRequestByNonceResponse {
    const obj = createBaseQueryBatchRequestByNonceResponse();
    if (isSet(object.batch)) obj.batch = OutgoingTxBatch.fromJSON(object.batch);
    return obj;
  },
  toJSON(message: QueryBatchRequestByNonceResponse): JsonSafe<QueryBatchRequestByNonceResponse> {
    const obj: any = {};
    message.batch !== undefined &&
      (obj.batch = message.batch ? OutgoingTxBatch.toJSON(message.batch) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchRequestByNonceResponse>, I>>(
    object: I,
  ): QueryBatchRequestByNonceResponse {
    const message = createBaseQueryBatchRequestByNonceResponse();
    if (object.batch !== undefined && object.batch !== null) {
      message.batch = OutgoingTxBatch.fromPartial(object.batch);
    }
    return message;
  },
};
function createBaseQueryBatchConfirmsRequest(): QueryBatchConfirmsRequest {
  return {
    chainName: "",
    nonce: BigInt(0),
    contractAddress: "",
  };
}
export const QueryBatchConfirmsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryBatchConfirmsRequest",
  encode(message: QueryBatchConfirmsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.contractAddress !== "") {
      writer.uint32(26).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchConfirmsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchConfirmsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchConfirmsRequest {
    const obj = createBaseQueryBatchConfirmsRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.contractAddress)) obj.contractAddress = String(object.contractAddress);
    return obj;
  },
  toJSON(message: QueryBatchConfirmsRequest): JsonSafe<QueryBatchConfirmsRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchConfirmsRequest>, I>>(
    object: I,
  ): QueryBatchConfirmsRequest {
    const message = createBaseQueryBatchConfirmsRequest();
    message.chainName = object.chainName ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
};
function createBaseQueryBatchConfirmsResponse(): QueryBatchConfirmsResponse {
  return {
    confirms: [],
  };
}
export const QueryBatchConfirmsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryBatchConfirmsResponse",
  encode(message: QueryBatchConfirmsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.confirms) {
      MsgConfirmBatch.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchConfirmsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchConfirmsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.confirms.push(MsgConfirmBatch.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBatchConfirmsResponse {
    const obj = createBaseQueryBatchConfirmsResponse();
    if (Array.isArray(object?.confirms))
      obj.confirms = object.confirms.map((e: any) => MsgConfirmBatch.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryBatchConfirmsResponse): JsonSafe<QueryBatchConfirmsResponse> {
    const obj: any = {};
    if (message.confirms) {
      obj.confirms = message.confirms.map((e) => (e ? MsgConfirmBatch.toJSON(e) : undefined));
    } else {
      obj.confirms = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBatchConfirmsResponse>, I>>(
    object: I,
  ): QueryBatchConfirmsResponse {
    const message = createBaseQueryBatchConfirmsResponse();
    message.confirms = object.confirms?.map((e) => MsgConfirmBatch.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLogicConfirmsRequest(): QueryLogicConfirmsRequest {
  return {
    chainName: "",
    invalidationId: new Uint8Array(),
    invalidationNonce: BigInt(0),
  };
}
export const QueryLogicConfirmsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLogicConfirmsRequest",
  encode(message: QueryLogicConfirmsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.invalidationId.length !== 0) {
      writer.uint32(18).bytes(message.invalidationId);
    }
    if (message.invalidationNonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.invalidationNonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLogicConfirmsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLogicConfirmsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.invalidationId = reader.bytes();
          break;
        case 3:
          message.invalidationNonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLogicConfirmsRequest {
    const obj = createBaseQueryLogicConfirmsRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.invalidationId)) obj.invalidationId = bytesFromBase64(object.invalidationId);
    if (isSet(object.invalidationNonce)) obj.invalidationNonce = BigInt(object.invalidationNonce.toString());
    return obj;
  },
  toJSON(message: QueryLogicConfirmsRequest): JsonSafe<QueryLogicConfirmsRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.invalidationId !== undefined &&
      (obj.invalidationId = base64FromBytes(
        message.invalidationId !== undefined ? message.invalidationId : new Uint8Array(),
      ));
    message.invalidationNonce !== undefined &&
      (obj.invalidationNonce = (message.invalidationNonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLogicConfirmsRequest>, I>>(
    object: I,
  ): QueryLogicConfirmsRequest {
    const message = createBaseQueryLogicConfirmsRequest();
    message.chainName = object.chainName ?? "";
    message.invalidationId = object.invalidationId ?? new Uint8Array();
    if (object.invalidationNonce !== undefined && object.invalidationNonce !== null) {
      message.invalidationNonce = BigInt(object.invalidationNonce.toString());
    }
    return message;
  },
};
function createBaseQueryLogicConfirmsResponse(): QueryLogicConfirmsResponse {
  return {
    confirms: [],
  };
}
export const QueryLogicConfirmsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLogicConfirmsResponse",
  encode(message: QueryLogicConfirmsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.confirms) {
      MsgConfirmLogicCall.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLogicConfirmsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLogicConfirmsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.confirms.push(MsgConfirmLogicCall.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLogicConfirmsResponse {
    const obj = createBaseQueryLogicConfirmsResponse();
    if (Array.isArray(object?.confirms))
      obj.confirms = object.confirms.map((e: any) => MsgConfirmLogicCall.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryLogicConfirmsResponse): JsonSafe<QueryLogicConfirmsResponse> {
    const obj: any = {};
    if (message.confirms) {
      obj.confirms = message.confirms.map((e) => (e ? MsgConfirmLogicCall.toJSON(e) : undefined));
    } else {
      obj.confirms = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLogicConfirmsResponse>, I>>(
    object: I,
  ): QueryLogicConfirmsResponse {
    const message = createBaseQueryLogicConfirmsResponse();
    message.confirms = object.confirms?.map((e) => MsgConfirmLogicCall.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryLastEventNonceByAddrRequest(): QueryLastEventNonceByAddrRequest {
  return {
    chainName: "",
    address: "",
  };
}
export const QueryLastEventNonceByAddrRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastEventNonceByAddrRequest",
  encode(
    message: QueryLastEventNonceByAddrRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastEventNonceByAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastEventNonceByAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastEventNonceByAddrRequest {
    const obj = createBaseQueryLastEventNonceByAddrRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryLastEventNonceByAddrRequest): JsonSafe<QueryLastEventNonceByAddrRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastEventNonceByAddrRequest>, I>>(
    object: I,
  ): QueryLastEventNonceByAddrRequest {
    const message = createBaseQueryLastEventNonceByAddrRequest();
    message.chainName = object.chainName ?? "";
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryLastEventNonceByAddrResponse(): QueryLastEventNonceByAddrResponse {
  return {
    eventNonce: BigInt(0),
  };
}
export const QueryLastEventNonceByAddrResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastEventNonceByAddrResponse",
  encode(
    message: QueryLastEventNonceByAddrResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.eventNonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.eventNonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastEventNonceByAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastEventNonceByAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventNonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastEventNonceByAddrResponse {
    const obj = createBaseQueryLastEventNonceByAddrResponse();
    if (isSet(object.eventNonce)) obj.eventNonce = BigInt(object.eventNonce.toString());
    return obj;
  },
  toJSON(message: QueryLastEventNonceByAddrResponse): JsonSafe<QueryLastEventNonceByAddrResponse> {
    const obj: any = {};
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastEventNonceByAddrResponse>, I>>(
    object: I,
  ): QueryLastEventNonceByAddrResponse {
    const message = createBaseQueryLastEventNonceByAddrResponse();
    if (object.eventNonce !== undefined && object.eventNonce !== null) {
      message.eventNonce = BigInt(object.eventNonce.toString());
    }
    return message;
  },
};
function createBaseQueryERC20ToDenomRequest(): QueryERC20ToDenomRequest {
  return {
    chainName: "",
    erc20: "",
  };
}
export const QueryERC20ToDenomRequest = {
  typeUrl: "/gravity.gravity.v1.QueryERC20ToDenomRequest",
  encode(message: QueryERC20ToDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.erc20 !== "") {
      writer.uint32(18).string(message.erc20);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryERC20ToDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryERC20ToDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.erc20 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryERC20ToDenomRequest {
    const obj = createBaseQueryERC20ToDenomRequest();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.erc20)) obj.erc20 = String(object.erc20);
    return obj;
  },
  toJSON(message: QueryERC20ToDenomRequest): JsonSafe<QueryERC20ToDenomRequest> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.erc20 !== undefined && (obj.erc20 = message.erc20);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryERC20ToDenomRequest>, I>>(
    object: I,
  ): QueryERC20ToDenomRequest {
    const message = createBaseQueryERC20ToDenomRequest();
    message.chainName = object.chainName ?? "";
    message.erc20 = object.erc20 ?? "";
    return message;
  },
};
function createBaseQueryERC20ToDenomResponse(): QueryERC20ToDenomResponse {
  return {
    denom: "",
    cosmosOriginated: false,
  };
}
export const QueryERC20ToDenomResponse = {
  typeUrl: "/gravity.gravity.v1.QueryERC20ToDenomResponse",
  encode(message: QueryERC20ToDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.cosmosOriginated === true) {
      writer.uint32(16).bool(message.cosmosOriginated);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryERC20ToDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryERC20ToDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.cosmosOriginated = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryERC20ToDenomResponse {
    const obj = createBaseQueryERC20ToDenomResponse();
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.cosmosOriginated)) obj.cosmosOriginated = Boolean(object.cosmosOriginated);
    return obj;
  },
  toJSON(message: QueryERC20ToDenomResponse): JsonSafe<QueryERC20ToDenomResponse> {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.cosmosOriginated !== undefined && (obj.cosmosOriginated = message.cosmosOriginated);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryERC20ToDenomResponse>, I>>(
    object: I,
  ): QueryERC20ToDenomResponse {
    const message = createBaseQueryERC20ToDenomResponse();
    message.denom = object.denom ?? "";
    message.cosmosOriginated = object.cosmosOriginated ?? false;
    return message;
  },
};
function createBaseQueryDenomToERC20Request(): QueryDenomToERC20Request {
  return {
    chainName: "",
    denom: "",
  };
}
export const QueryDenomToERC20Request = {
  typeUrl: "/gravity.gravity.v1.QueryDenomToERC20Request",
  encode(message: QueryDenomToERC20Request, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomToERC20Request {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomToERC20Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDenomToERC20Request {
    const obj = createBaseQueryDenomToERC20Request();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    return obj;
  },
  toJSON(message: QueryDenomToERC20Request): JsonSafe<QueryDenomToERC20Request> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomToERC20Request>, I>>(
    object: I,
  ): QueryDenomToERC20Request {
    const message = createBaseQueryDenomToERC20Request();
    message.chainName = object.chainName ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};
function createBaseQueryDenomToERC20Response(): QueryDenomToERC20Response {
  return {
    erc20: "",
    cosmosOriginated: false,
  };
}
export const QueryDenomToERC20Response = {
  typeUrl: "/gravity.gravity.v1.QueryDenomToERC20Response",
  encode(message: QueryDenomToERC20Response, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.erc20 !== "") {
      writer.uint32(10).string(message.erc20);
    }
    if (message.cosmosOriginated === true) {
      writer.uint32(16).bool(message.cosmosOriginated);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomToERC20Response {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomToERC20Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.erc20 = reader.string();
          break;
        case 2:
          message.cosmosOriginated = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDenomToERC20Response {
    const obj = createBaseQueryDenomToERC20Response();
    if (isSet(object.erc20)) obj.erc20 = String(object.erc20);
    if (isSet(object.cosmosOriginated)) obj.cosmosOriginated = Boolean(object.cosmosOriginated);
    return obj;
  },
  toJSON(message: QueryDenomToERC20Response): JsonSafe<QueryDenomToERC20Response> {
    const obj: any = {};
    message.erc20 !== undefined && (obj.erc20 = message.erc20);
    message.cosmosOriginated !== undefined && (obj.cosmosOriginated = message.cosmosOriginated);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomToERC20Response>, I>>(
    object: I,
  ): QueryDenomToERC20Response {
    const message = createBaseQueryDenomToERC20Response();
    message.erc20 = object.erc20 ?? "";
    message.cosmosOriginated = object.cosmosOriginated ?? false;
    return message;
  },
};
function createBaseQueryLastObservedEvmBlockRequest(): QueryLastObservedEvmBlockRequest {
  return {
    useV1Key: false,
    chainName: "",
  };
}
export const QueryLastObservedEvmBlockRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastObservedEvmBlockRequest",
  encode(
    message: QueryLastObservedEvmBlockRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.useV1Key === true) {
      writer.uint32(8).bool(message.useV1Key);
    }
    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastObservedEvmBlockRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastObservedEvmBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.useV1Key = reader.bool();
          break;
        case 2:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastObservedEvmBlockRequest {
    const obj = createBaseQueryLastObservedEvmBlockRequest();
    if (isSet(object.useV1Key)) obj.useV1Key = Boolean(object.useV1Key);
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryLastObservedEvmBlockRequest): JsonSafe<QueryLastObservedEvmBlockRequest> {
    const obj: any = {};
    message.useV1Key !== undefined && (obj.useV1Key = message.useV1Key);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastObservedEvmBlockRequest>, I>>(
    object: I,
  ): QueryLastObservedEvmBlockRequest {
    const message = createBaseQueryLastObservedEvmBlockRequest();
    message.useV1Key = object.useV1Key ?? false;
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryLastObservedEvmBlockResponse(): QueryLastObservedEvmBlockResponse {
  return {
    block: BigInt(0),
  };
}
export const QueryLastObservedEvmBlockResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastObservedEvmBlockResponse",
  encode(
    message: QueryLastObservedEvmBlockResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.block !== BigInt(0)) {
      writer.uint32(8).uint64(message.block);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastObservedEvmBlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastObservedEvmBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastObservedEvmBlockResponse {
    const obj = createBaseQueryLastObservedEvmBlockResponse();
    if (isSet(object.block)) obj.block = BigInt(object.block.toString());
    return obj;
  },
  toJSON(message: QueryLastObservedEvmBlockResponse): JsonSafe<QueryLastObservedEvmBlockResponse> {
    const obj: any = {};
    message.block !== undefined && (obj.block = (message.block || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastObservedEvmBlockResponse>, I>>(
    object: I,
  ): QueryLastObservedEvmBlockResponse {
    const message = createBaseQueryLastObservedEvmBlockResponse();
    if (object.block !== undefined && object.block !== null) {
      message.block = BigInt(object.block.toString());
    }
    return message;
  },
};
function createBaseQueryLastObservedEvmNonceRequest(): QueryLastObservedEvmNonceRequest {
  return {
    useV1Key: false,
    chainName: "",
  };
}
export const QueryLastObservedEvmNonceRequest = {
  typeUrl: "/gravity.gravity.v1.QueryLastObservedEvmNonceRequest",
  encode(
    message: QueryLastObservedEvmNonceRequest,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.useV1Key === true) {
      writer.uint32(8).bool(message.useV1Key);
    }
    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastObservedEvmNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastObservedEvmNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.useV1Key = reader.bool();
          break;
        case 2:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastObservedEvmNonceRequest {
    const obj = createBaseQueryLastObservedEvmNonceRequest();
    if (isSet(object.useV1Key)) obj.useV1Key = Boolean(object.useV1Key);
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryLastObservedEvmNonceRequest): JsonSafe<QueryLastObservedEvmNonceRequest> {
    const obj: any = {};
    message.useV1Key !== undefined && (obj.useV1Key = message.useV1Key);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastObservedEvmNonceRequest>, I>>(
    object: I,
  ): QueryLastObservedEvmNonceRequest {
    const message = createBaseQueryLastObservedEvmNonceRequest();
    message.useV1Key = object.useV1Key ?? false;
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryLastObservedEvmNonceResponse(): QueryLastObservedEvmNonceResponse {
  return {
    nonce: BigInt(0),
  };
}
export const QueryLastObservedEvmNonceResponse = {
  typeUrl: "/gravity.gravity.v1.QueryLastObservedEvmNonceResponse",
  encode(
    message: QueryLastObservedEvmNonceResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLastObservedEvmNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLastObservedEvmNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryLastObservedEvmNonceResponse {
    const obj = createBaseQueryLastObservedEvmNonceResponse();
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    return obj;
  },
  toJSON(message: QueryLastObservedEvmNonceResponse): JsonSafe<QueryLastObservedEvmNonceResponse> {
    const obj: any = {};
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryLastObservedEvmNonceResponse>, I>>(
    object: I,
  ): QueryLastObservedEvmNonceResponse {
    const message = createBaseQueryLastObservedEvmNonceResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    return message;
  },
};
function createBaseQueryAttestationsRequest(): QueryAttestationsRequest {
  return {
    limit: BigInt(0),
    orderBy: "",
    chainName: "",
    claimType: "",
    nonce: BigInt(0),
    height: BigInt(0),
    useV1Key: false,
  };
}
export const QueryAttestationsRequest = {
  typeUrl: "/gravity.gravity.v1.QueryAttestationsRequest",
  encode(message: QueryAttestationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.limit !== BigInt(0)) {
      writer.uint32(8).uint64(message.limit);
    }
    if (message.orderBy !== "") {
      writer.uint32(18).string(message.orderBy);
    }
    if (message.chainName !== "") {
      writer.uint32(26).string(message.chainName);
    }
    if (message.claimType !== "") {
      writer.uint32(34).string(message.claimType);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(40).uint64(message.nonce);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(48).uint64(message.height);
    }
    if (message.useV1Key === true) {
      writer.uint32(56).bool(message.useV1Key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.uint64();
          break;
        case 2:
          message.orderBy = reader.string();
          break;
        case 3:
          message.chainName = reader.string();
          break;
        case 4:
          message.claimType = reader.string();
          break;
        case 5:
          message.nonce = reader.uint64();
          break;
        case 6:
          message.height = reader.uint64();
          break;
        case 7:
          message.useV1Key = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAttestationsRequest {
    const obj = createBaseQueryAttestationsRequest();
    if (isSet(object.limit)) obj.limit = BigInt(object.limit.toString());
    if (isSet(object.orderBy)) obj.orderBy = String(object.orderBy);
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.claimType)) obj.claimType = String(object.claimType);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.height)) obj.height = BigInt(object.height.toString());
    if (isSet(object.useV1Key)) obj.useV1Key = Boolean(object.useV1Key);
    return obj;
  },
  toJSON(message: QueryAttestationsRequest): JsonSafe<QueryAttestationsRequest> {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = (message.limit || BigInt(0)).toString());
    message.orderBy !== undefined && (obj.orderBy = message.orderBy);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.claimType !== undefined && (obj.claimType = message.claimType);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.height !== undefined && (obj.height = (message.height || BigInt(0)).toString());
    message.useV1Key !== undefined && (obj.useV1Key = message.useV1Key);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAttestationsRequest>, I>>(
    object: I,
  ): QueryAttestationsRequest {
    const message = createBaseQueryAttestationsRequest();
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = BigInt(object.limit.toString());
    }
    message.orderBy = object.orderBy ?? "";
    message.chainName = object.chainName ?? "";
    message.claimType = object.claimType ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height.toString());
    }
    message.useV1Key = object.useV1Key ?? false;
    return message;
  },
};
function createBaseQueryAttestationsResponse(): QueryAttestationsResponse {
  return {
    attestations: [],
  };
}
export const QueryAttestationsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryAttestationsResponse",
  encode(message: QueryAttestationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.attestations) {
      Attestation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestations.push(Attestation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAttestationsResponse {
    const obj = createBaseQueryAttestationsResponse();
    if (Array.isArray(object?.attestations))
      obj.attestations = object.attestations.map((e: any) => Attestation.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryAttestationsResponse): JsonSafe<QueryAttestationsResponse> {
    const obj: any = {};
    if (message.attestations) {
      obj.attestations = message.attestations.map((e) => (e ? Attestation.toJSON(e) : undefined));
    } else {
      obj.attestations = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAttestationsResponse>, I>>(
    object: I,
  ): QueryAttestationsResponse {
    const message = createBaseQueryAttestationsResponse();
    message.attestations = object.attestations?.map((e) => Attestation.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryDelegateKeys(): QueryDelegateKeys {
  return {};
}
export const QueryDelegateKeys = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeys",
  encode(_: QueryDelegateKeys, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeys {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeys();
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
  fromJSON(_: any): QueryDelegateKeys {
    const obj = createBaseQueryDelegateKeys();
    return obj;
  },
  toJSON(_: QueryDelegateKeys): JsonSafe<QueryDelegateKeys> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeys>, I>>(_: I): QueryDelegateKeys {
    const message = createBaseQueryDelegateKeys();
    return message;
  },
};
function createBaseQueryDelegateKeysResponse(): QueryDelegateKeysResponse {
  return {
    delegateKeys: [],
  };
}
export const QueryDelegateKeysResponse = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysResponse",
  encode(message: QueryDelegateKeysResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.delegateKeys) {
      DelegateKeys.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegateKeys.push(DelegateKeys.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysResponse {
    const obj = createBaseQueryDelegateKeysResponse();
    if (Array.isArray(object?.delegateKeys))
      obj.delegateKeys = object.delegateKeys.map((e: any) => DelegateKeys.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryDelegateKeysResponse): JsonSafe<QueryDelegateKeysResponse> {
    const obj: any = {};
    if (message.delegateKeys) {
      obj.delegateKeys = message.delegateKeys.map((e) => (e ? DelegateKeys.toJSON(e) : undefined));
    } else {
      obj.delegateKeys = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysResponse>, I>>(
    object: I,
  ): QueryDelegateKeysResponse {
    const message = createBaseQueryDelegateKeysResponse();
    message.delegateKeys = object.delegateKeys?.map((e) => DelegateKeys.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryDelegateKeysByValidatorAddress(): QueryDelegateKeysByValidatorAddress {
  return {
    validatorAddress: "",
  };
}
export const QueryDelegateKeysByValidatorAddress = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByValidatorAddress",
  encode(
    message: QueryDelegateKeysByValidatorAddress,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByValidatorAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByValidatorAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByValidatorAddress {
    const obj = createBaseQueryDelegateKeysByValidatorAddress();
    if (isSet(object.validatorAddress)) obj.validatorAddress = String(object.validatorAddress);
    return obj;
  },
  toJSON(message: QueryDelegateKeysByValidatorAddress): JsonSafe<QueryDelegateKeysByValidatorAddress> {
    const obj: any = {};
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByValidatorAddress>, I>>(
    object: I,
  ): QueryDelegateKeysByValidatorAddress {
    const message = createBaseQueryDelegateKeysByValidatorAddress();
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
};
function createBaseQueryDelegateKeysByValidatorAddressResponse(): QueryDelegateKeysByValidatorAddressResponse {
  return {
    orchestratorAddress: "",
    evmAddresses: [],
  };
}
export const QueryDelegateKeysByValidatorAddressResponse = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByValidatorAddressResponse",
  encode(
    message: QueryDelegateKeysByValidatorAddressResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.orchestratorAddress !== "") {
      writer.uint32(10).string(message.orchestratorAddress);
    }
    for (const v of message.evmAddresses) {
      EvmChainAddress.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByValidatorAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByValidatorAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestratorAddress = reader.string();
          break;
        case 2:
          message.evmAddresses.push(EvmChainAddress.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByValidatorAddressResponse {
    const obj = createBaseQueryDelegateKeysByValidatorAddressResponse();
    if (isSet(object.orchestratorAddress)) obj.orchestratorAddress = String(object.orchestratorAddress);
    if (Array.isArray(object?.evmAddresses))
      obj.evmAddresses = object.evmAddresses.map((e: any) => EvmChainAddress.fromJSON(e));
    return obj;
  },
  toJSON(
    message: QueryDelegateKeysByValidatorAddressResponse,
  ): JsonSafe<QueryDelegateKeysByValidatorAddressResponse> {
    const obj: any = {};
    message.orchestratorAddress !== undefined && (obj.orchestratorAddress = message.orchestratorAddress);
    if (message.evmAddresses) {
      obj.evmAddresses = message.evmAddresses.map((e) => (e ? EvmChainAddress.toJSON(e) : undefined));
    } else {
      obj.evmAddresses = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByValidatorAddressResponse>, I>>(
    object: I,
  ): QueryDelegateKeysByValidatorAddressResponse {
    const message = createBaseQueryDelegateKeysByValidatorAddressResponse();
    message.orchestratorAddress = object.orchestratorAddress ?? "";
    message.evmAddresses = object.evmAddresses?.map((e) => EvmChainAddress.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryDelegateKeysByEvmAddress(): QueryDelegateKeysByEvmAddress {
  return {
    chainName: "",
    evmAddress: "",
  };
}
export const QueryDelegateKeysByEvmAddress = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByEvmAddress",
  encode(message: QueryDelegateKeysByEvmAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByEvmAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByEvmAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.evmAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByEvmAddress {
    const obj = createBaseQueryDelegateKeysByEvmAddress();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.evmAddress)) obj.evmAddress = String(object.evmAddress);
    return obj;
  },
  toJSON(message: QueryDelegateKeysByEvmAddress): JsonSafe<QueryDelegateKeysByEvmAddress> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.evmAddress !== undefined && (obj.evmAddress = message.evmAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByEvmAddress>, I>>(
    object: I,
  ): QueryDelegateKeysByEvmAddress {
    const message = createBaseQueryDelegateKeysByEvmAddress();
    message.chainName = object.chainName ?? "";
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};
function createBaseQueryDelegateKeysByEvmAddressResponse(): QueryDelegateKeysByEvmAddressResponse {
  return {
    validatorAddress: "",
    orchestratorAddress: "",
  };
}
export const QueryDelegateKeysByEvmAddressResponse = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByEvmAddressResponse",
  encode(
    message: QueryDelegateKeysByEvmAddressResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.orchestratorAddress !== "") {
      writer.uint32(18).string(message.orchestratorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByEvmAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByEvmAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.orchestratorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByEvmAddressResponse {
    const obj = createBaseQueryDelegateKeysByEvmAddressResponse();
    if (isSet(object.validatorAddress)) obj.validatorAddress = String(object.validatorAddress);
    if (isSet(object.orchestratorAddress)) obj.orchestratorAddress = String(object.orchestratorAddress);
    return obj;
  },
  toJSON(message: QueryDelegateKeysByEvmAddressResponse): JsonSafe<QueryDelegateKeysByEvmAddressResponse> {
    const obj: any = {};
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.orchestratorAddress !== undefined && (obj.orchestratorAddress = message.orchestratorAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByEvmAddressResponse>, I>>(
    object: I,
  ): QueryDelegateKeysByEvmAddressResponse {
    const message = createBaseQueryDelegateKeysByEvmAddressResponse();
    message.validatorAddress = object.validatorAddress ?? "";
    message.orchestratorAddress = object.orchestratorAddress ?? "";
    return message;
  },
};
function createBaseQueryDelegateKeysByOrchestratorAddress(): QueryDelegateKeysByOrchestratorAddress {
  return {
    orchestratorAddress: "",
  };
}
export const QueryDelegateKeysByOrchestratorAddress = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByOrchestratorAddress",
  encode(
    message: QueryDelegateKeysByOrchestratorAddress,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.orchestratorAddress !== "") {
      writer.uint32(10).string(message.orchestratorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByOrchestratorAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByOrchestratorAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orchestratorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByOrchestratorAddress {
    const obj = createBaseQueryDelegateKeysByOrchestratorAddress();
    if (isSet(object.orchestratorAddress)) obj.orchestratorAddress = String(object.orchestratorAddress);
    return obj;
  },
  toJSON(message: QueryDelegateKeysByOrchestratorAddress): JsonSafe<QueryDelegateKeysByOrchestratorAddress> {
    const obj: any = {};
    message.orchestratorAddress !== undefined && (obj.orchestratorAddress = message.orchestratorAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByOrchestratorAddress>, I>>(
    object: I,
  ): QueryDelegateKeysByOrchestratorAddress {
    const message = createBaseQueryDelegateKeysByOrchestratorAddress();
    message.orchestratorAddress = object.orchestratorAddress ?? "";
    return message;
  },
};
function createBaseQueryDelegateKeysByOrchestratorAddressResponse(): QueryDelegateKeysByOrchestratorAddressResponse {
  return {
    validatorAddress: "",
    evmAddresses: [],
  };
}
export const QueryDelegateKeysByOrchestratorAddressResponse = {
  typeUrl: "/gravity.gravity.v1.QueryDelegateKeysByOrchestratorAddressResponse",
  encode(
    message: QueryDelegateKeysByOrchestratorAddressResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    for (const v of message.evmAddresses) {
      EvmChainAddress.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDelegateKeysByOrchestratorAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegateKeysByOrchestratorAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.evmAddresses.push(EvmChainAddress.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryDelegateKeysByOrchestratorAddressResponse {
    const obj = createBaseQueryDelegateKeysByOrchestratorAddressResponse();
    if (isSet(object.validatorAddress)) obj.validatorAddress = String(object.validatorAddress);
    if (Array.isArray(object?.evmAddresses))
      obj.evmAddresses = object.evmAddresses.map((e: any) => EvmChainAddress.fromJSON(e));
    return obj;
  },
  toJSON(
    message: QueryDelegateKeysByOrchestratorAddressResponse,
  ): JsonSafe<QueryDelegateKeysByOrchestratorAddressResponse> {
    const obj: any = {};
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    if (message.evmAddresses) {
      obj.evmAddresses = message.evmAddresses.map((e) => (e ? EvmChainAddress.toJSON(e) : undefined));
    } else {
      obj.evmAddresses = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegateKeysByOrchestratorAddressResponse>, I>>(
    object: I,
  ): QueryDelegateKeysByOrchestratorAddressResponse {
    const message = createBaseQueryDelegateKeysByOrchestratorAddressResponse();
    message.validatorAddress = object.validatorAddress ?? "";
    message.evmAddresses = object.evmAddresses?.map((e) => EvmChainAddress.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryPendingSendToEvmChain(): QueryPendingSendToEvmChain {
  return {
    chainName: "",
    senderAddress: "",
  };
}
export const QueryPendingSendToEvmChain = {
  typeUrl: "/gravity.gravity.v1.QueryPendingSendToEvmChain",
  encode(message: QueryPendingSendToEvmChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.senderAddress !== "") {
      writer.uint32(18).string(message.senderAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingSendToEvmChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingSendToEvmChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.senderAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingSendToEvmChain {
    const obj = createBaseQueryPendingSendToEvmChain();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.senderAddress)) obj.senderAddress = String(object.senderAddress);
    return obj;
  },
  toJSON(message: QueryPendingSendToEvmChain): JsonSafe<QueryPendingSendToEvmChain> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.senderAddress !== undefined && (obj.senderAddress = message.senderAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPendingSendToEvmChain>, I>>(
    object: I,
  ): QueryPendingSendToEvmChain {
    const message = createBaseQueryPendingSendToEvmChain();
    message.chainName = object.chainName ?? "";
    message.senderAddress = object.senderAddress ?? "";
    return message;
  },
};
function createBaseQueryPendingSendToEvmChainResponse(): QueryPendingSendToEvmChainResponse {
  return {
    transfersInBatches: [],
    unbatchedTransfers: [],
  };
}
export const QueryPendingSendToEvmChainResponse = {
  typeUrl: "/gravity.gravity.v1.QueryPendingSendToEvmChainResponse",
  encode(
    message: QueryPendingSendToEvmChainResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.transfersInBatches) {
      OutgoingTransferTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.unbatchedTransfers) {
      OutgoingTransferTx.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingSendToEvmChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingSendToEvmChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transfersInBatches.push(OutgoingTransferTx.decode(reader, reader.uint32()));
          break;
        case 2:
          message.unbatchedTransfers.push(OutgoingTransferTx.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingSendToEvmChainResponse {
    const obj = createBaseQueryPendingSendToEvmChainResponse();
    if (Array.isArray(object?.transfersInBatches))
      obj.transfersInBatches = object.transfersInBatches.map((e: any) => OutgoingTransferTx.fromJSON(e));
    if (Array.isArray(object?.unbatchedTransfers))
      obj.unbatchedTransfers = object.unbatchedTransfers.map((e: any) => OutgoingTransferTx.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryPendingSendToEvmChainResponse): JsonSafe<QueryPendingSendToEvmChainResponse> {
    const obj: any = {};
    if (message.transfersInBatches) {
      obj.transfersInBatches = message.transfersInBatches.map((e) =>
        e ? OutgoingTransferTx.toJSON(e) : undefined,
      );
    } else {
      obj.transfersInBatches = [];
    }
    if (message.unbatchedTransfers) {
      obj.unbatchedTransfers = message.unbatchedTransfers.map((e) =>
        e ? OutgoingTransferTx.toJSON(e) : undefined,
      );
    } else {
      obj.unbatchedTransfers = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPendingSendToEvmChainResponse>, I>>(
    object: I,
  ): QueryPendingSendToEvmChainResponse {
    const message = createBaseQueryPendingSendToEvmChainResponse();
    message.transfersInBatches =
      object.transfersInBatches?.map((e) => OutgoingTransferTx.fromPartial(e)) || [];
    message.unbatchedTransfers =
      object.unbatchedTransfers?.map((e) => OutgoingTransferTx.fromPartial(e)) || [];
    return message;
  },
};
function createBaseQueryPendingIbcAutoForwards(): QueryPendingIbcAutoForwards {
  return {
    limit: BigInt(0),
    chainName: "",
  };
}
export const QueryPendingIbcAutoForwards = {
  typeUrl: "/gravity.gravity.v1.QueryPendingIbcAutoForwards",
  encode(message: QueryPendingIbcAutoForwards, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.limit !== BigInt(0)) {
      writer.uint32(8).uint64(message.limit);
    }
    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingIbcAutoForwards {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingIbcAutoForwards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.uint64();
          break;
        case 2:
          message.chainName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingIbcAutoForwards {
    const obj = createBaseQueryPendingIbcAutoForwards();
    if (isSet(object.limit)) obj.limit = BigInt(object.limit.toString());
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    return obj;
  },
  toJSON(message: QueryPendingIbcAutoForwards): JsonSafe<QueryPendingIbcAutoForwards> {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = (message.limit || BigInt(0)).toString());
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPendingIbcAutoForwards>, I>>(
    object: I,
  ): QueryPendingIbcAutoForwards {
    const message = createBaseQueryPendingIbcAutoForwards();
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = BigInt(object.limit.toString());
    }
    message.chainName = object.chainName ?? "";
    return message;
  },
};
function createBaseQueryPendingIbcAutoForwardsResponse(): QueryPendingIbcAutoForwardsResponse {
  return {
    pendingIbcAutoForwards: [],
  };
}
export const QueryPendingIbcAutoForwardsResponse = {
  typeUrl: "/gravity.gravity.v1.QueryPendingIbcAutoForwardsResponse",
  encode(
    message: QueryPendingIbcAutoForwardsResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    for (const v of message.pendingIbcAutoForwards) {
      PendingIbcAutoForward.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingIbcAutoForwardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingIbcAutoForwardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingIbcAutoForwards.push(PendingIbcAutoForward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryPendingIbcAutoForwardsResponse {
    const obj = createBaseQueryPendingIbcAutoForwardsResponse();
    if (Array.isArray(object?.pendingIbcAutoForwards))
      obj.pendingIbcAutoForwards = object.pendingIbcAutoForwards.map((e: any) =>
        PendingIbcAutoForward.fromJSON(e),
      );
    return obj;
  },
  toJSON(message: QueryPendingIbcAutoForwardsResponse): JsonSafe<QueryPendingIbcAutoForwardsResponse> {
    const obj: any = {};
    if (message.pendingIbcAutoForwards) {
      obj.pendingIbcAutoForwards = message.pendingIbcAutoForwards.map((e) =>
        e ? PendingIbcAutoForward.toJSON(e) : undefined,
      );
    } else {
      obj.pendingIbcAutoForwards = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryPendingIbcAutoForwardsResponse>, I>>(
    object: I,
  ): QueryPendingIbcAutoForwardsResponse {
    const message = createBaseQueryPendingIbcAutoForwardsResponse();
    message.pendingIbcAutoForwards =
      object.pendingIbcAutoForwards?.map((e) => PendingIbcAutoForward.fromPartial(e)) || [];
    return message;
  },
};
/** Query defines the gRPC querier service */
export interface Query {
  /** Deployments queries deployments */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  CurrentValset(request: QueryCurrentValsetRequest): Promise<QueryCurrentValsetResponse>;
  ValsetRequest(request: QueryValsetRequestRequest): Promise<QueryValsetRequestResponse>;
  ValsetConfirm(request: QueryValsetConfirmRequest): Promise<QueryValsetConfirmResponse>;
  ValsetConfirmsByNonce(
    request: QueryValsetConfirmsByNonceRequest,
  ): Promise<QueryValsetConfirmsByNonceResponse>;
  LastValsetRequests(request: QueryLastValsetRequestsRequest): Promise<QueryLastValsetRequestsResponse>;
  LastPendingValsetRequestByAddr(
    request: QueryLastPendingValsetRequestByAddrRequest,
  ): Promise<QueryLastPendingValsetRequestByAddrResponse>;
  LastPendingBatchRequestByAddr(
    request: QueryLastPendingBatchRequestByAddrRequest,
  ): Promise<QueryLastPendingBatchRequestByAddrResponse>;
  LastPendingLogicCallByAddr(
    request: QueryLastPendingLogicCallByAddrRequest,
  ): Promise<QueryLastPendingLogicCallByAddrResponse>;
  LastEventNonceByAddr(request: QueryLastEventNonceByAddrRequest): Promise<QueryLastEventNonceByAddrResponse>;
  BatchFees(request: QueryBatchFeeRequest): Promise<QueryBatchFeeResponse>;
  OutgoingTxBatches(request: QueryOutgoingTxBatchesRequest): Promise<QueryOutgoingTxBatchesResponse>;
  OutgoingLogicCalls(request: QueryOutgoingLogicCallsRequest): Promise<QueryOutgoingLogicCallsResponse>;
  BatchRequestByNonce(request: QueryBatchRequestByNonceRequest): Promise<QueryBatchRequestByNonceResponse>;
  BatchConfirms(request: QueryBatchConfirmsRequest): Promise<QueryBatchConfirmsResponse>;
  LogicConfirms(request: QueryLogicConfirmsRequest): Promise<QueryLogicConfirmsResponse>;
  ERC20ToDenom(request: QueryERC20ToDenomRequest): Promise<QueryERC20ToDenomResponse>;
  DenomToERC20(request: QueryDenomToERC20Request): Promise<QueryDenomToERC20Response>;
  GetLastObservedEvmBlock(
    request: QueryLastObservedEvmBlockRequest,
  ): Promise<QueryLastObservedEvmBlockResponse>;
  GetLastObservedEvmNonce(
    request: QueryLastObservedEvmNonceRequest,
  ): Promise<QueryLastObservedEvmNonceResponse>;
  GetAttestations(request: QueryAttestationsRequest): Promise<QueryAttestationsResponse>;
  GetDelegateKeys(request?: QueryDelegateKeys): Promise<QueryDelegateKeysResponse>;
  GetDelegateKeysByValidator(
    request: QueryDelegateKeysByValidatorAddress,
  ): Promise<QueryDelegateKeysByValidatorAddressResponse>;
  GetDelegateKeysByEvmAddress(
    request: QueryDelegateKeysByEvmAddress,
  ): Promise<QueryDelegateKeysByEvmAddressResponse>;
  GetDelegateKeysByOrchestrator(
    request: QueryDelegateKeysByOrchestratorAddress,
  ): Promise<QueryDelegateKeysByOrchestratorAddressResponse>;
  GetPendingSendToEvmChain(request: QueryPendingSendToEvmChain): Promise<QueryPendingSendToEvmChainResponse>;
  GetPendingIbcAutoForwards(
    request: QueryPendingIbcAutoForwards,
  ): Promise<QueryPendingIbcAutoForwardsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.CurrentValset = this.CurrentValset.bind(this);
    this.ValsetRequest = this.ValsetRequest.bind(this);
    this.ValsetConfirm = this.ValsetConfirm.bind(this);
    this.ValsetConfirmsByNonce = this.ValsetConfirmsByNonce.bind(this);
    this.LastValsetRequests = this.LastValsetRequests.bind(this);
    this.LastPendingValsetRequestByAddr = this.LastPendingValsetRequestByAddr.bind(this);
    this.LastPendingBatchRequestByAddr = this.LastPendingBatchRequestByAddr.bind(this);
    this.LastPendingLogicCallByAddr = this.LastPendingLogicCallByAddr.bind(this);
    this.LastEventNonceByAddr = this.LastEventNonceByAddr.bind(this);
    this.BatchFees = this.BatchFees.bind(this);
    this.OutgoingTxBatches = this.OutgoingTxBatches.bind(this);
    this.OutgoingLogicCalls = this.OutgoingLogicCalls.bind(this);
    this.BatchRequestByNonce = this.BatchRequestByNonce.bind(this);
    this.BatchConfirms = this.BatchConfirms.bind(this);
    this.LogicConfirms = this.LogicConfirms.bind(this);
    this.ERC20ToDenom = this.ERC20ToDenom.bind(this);
    this.DenomToERC20 = this.DenomToERC20.bind(this);
    this.GetLastObservedEvmBlock = this.GetLastObservedEvmBlock.bind(this);
    this.GetLastObservedEvmNonce = this.GetLastObservedEvmNonce.bind(this);
    this.GetAttestations = this.GetAttestations.bind(this);
    this.GetDelegateKeys = this.GetDelegateKeys.bind(this);
    this.GetDelegateKeysByValidator = this.GetDelegateKeysByValidator.bind(this);
    this.GetDelegateKeysByEvmAddress = this.GetDelegateKeysByEvmAddress.bind(this);
    this.GetDelegateKeysByOrchestrator = this.GetDelegateKeysByOrchestrator.bind(this);
    this.GetPendingSendToEvmChain = this.GetPendingSendToEvmChain.bind(this);
    this.GetPendingIbcAutoForwards = this.GetPendingIbcAutoForwards.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  CurrentValset(request: QueryCurrentValsetRequest): Promise<QueryCurrentValsetResponse> {
    const data = QueryCurrentValsetRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "CurrentValset", data);
    return promise.then((data) => QueryCurrentValsetResponse.decode(new BinaryReader(data)));
  }
  ValsetRequest(request: QueryValsetRequestRequest): Promise<QueryValsetRequestResponse> {
    const data = QueryValsetRequestRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "ValsetRequest", data);
    return promise.then((data) => QueryValsetRequestResponse.decode(new BinaryReader(data)));
  }
  ValsetConfirm(request: QueryValsetConfirmRequest): Promise<QueryValsetConfirmResponse> {
    const data = QueryValsetConfirmRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "ValsetConfirm", data);
    return promise.then((data) => QueryValsetConfirmResponse.decode(new BinaryReader(data)));
  }
  ValsetConfirmsByNonce(
    request: QueryValsetConfirmsByNonceRequest,
  ): Promise<QueryValsetConfirmsByNonceResponse> {
    const data = QueryValsetConfirmsByNonceRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "ValsetConfirmsByNonce", data);
    return promise.then((data) => QueryValsetConfirmsByNonceResponse.decode(new BinaryReader(data)));
  }
  LastValsetRequests(request: QueryLastValsetRequestsRequest): Promise<QueryLastValsetRequestsResponse> {
    const data = QueryLastValsetRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LastValsetRequests", data);
    return promise.then((data) => QueryLastValsetRequestsResponse.decode(new BinaryReader(data)));
  }
  LastPendingValsetRequestByAddr(
    request: QueryLastPendingValsetRequestByAddrRequest,
  ): Promise<QueryLastPendingValsetRequestByAddrResponse> {
    const data = QueryLastPendingValsetRequestByAddrRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LastPendingValsetRequestByAddr", data);
    return promise.then((data) => QueryLastPendingValsetRequestByAddrResponse.decode(new BinaryReader(data)));
  }
  LastPendingBatchRequestByAddr(
    request: QueryLastPendingBatchRequestByAddrRequest,
  ): Promise<QueryLastPendingBatchRequestByAddrResponse> {
    const data = QueryLastPendingBatchRequestByAddrRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LastPendingBatchRequestByAddr", data);
    return promise.then((data) => QueryLastPendingBatchRequestByAddrResponse.decode(new BinaryReader(data)));
  }
  LastPendingLogicCallByAddr(
    request: QueryLastPendingLogicCallByAddrRequest,
  ): Promise<QueryLastPendingLogicCallByAddrResponse> {
    const data = QueryLastPendingLogicCallByAddrRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LastPendingLogicCallByAddr", data);
    return promise.then((data) => QueryLastPendingLogicCallByAddrResponse.decode(new BinaryReader(data)));
  }
  LastEventNonceByAddr(
    request: QueryLastEventNonceByAddrRequest,
  ): Promise<QueryLastEventNonceByAddrResponse> {
    const data = QueryLastEventNonceByAddrRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LastEventNonceByAddr", data);
    return promise.then((data) => QueryLastEventNonceByAddrResponse.decode(new BinaryReader(data)));
  }
  BatchFees(request: QueryBatchFeeRequest): Promise<QueryBatchFeeResponse> {
    const data = QueryBatchFeeRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "BatchFees", data);
    return promise.then((data) => QueryBatchFeeResponse.decode(new BinaryReader(data)));
  }
  OutgoingTxBatches(request: QueryOutgoingTxBatchesRequest): Promise<QueryOutgoingTxBatchesResponse> {
    const data = QueryOutgoingTxBatchesRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "OutgoingTxBatches", data);
    return promise.then((data) => QueryOutgoingTxBatchesResponse.decode(new BinaryReader(data)));
  }
  OutgoingLogicCalls(request: QueryOutgoingLogicCallsRequest): Promise<QueryOutgoingLogicCallsResponse> {
    const data = QueryOutgoingLogicCallsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "OutgoingLogicCalls", data);
    return promise.then((data) => QueryOutgoingLogicCallsResponse.decode(new BinaryReader(data)));
  }
  BatchRequestByNonce(request: QueryBatchRequestByNonceRequest): Promise<QueryBatchRequestByNonceResponse> {
    const data = QueryBatchRequestByNonceRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "BatchRequestByNonce", data);
    return promise.then((data) => QueryBatchRequestByNonceResponse.decode(new BinaryReader(data)));
  }
  BatchConfirms(request: QueryBatchConfirmsRequest): Promise<QueryBatchConfirmsResponse> {
    const data = QueryBatchConfirmsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "BatchConfirms", data);
    return promise.then((data) => QueryBatchConfirmsResponse.decode(new BinaryReader(data)));
  }
  LogicConfirms(request: QueryLogicConfirmsRequest): Promise<QueryLogicConfirmsResponse> {
    const data = QueryLogicConfirmsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "LogicConfirms", data);
    return promise.then((data) => QueryLogicConfirmsResponse.decode(new BinaryReader(data)));
  }
  ERC20ToDenom(request: QueryERC20ToDenomRequest): Promise<QueryERC20ToDenomResponse> {
    const data = QueryERC20ToDenomRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "ERC20ToDenom", data);
    return promise.then((data) => QueryERC20ToDenomResponse.decode(new BinaryReader(data)));
  }
  DenomToERC20(request: QueryDenomToERC20Request): Promise<QueryDenomToERC20Response> {
    const data = QueryDenomToERC20Request.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "DenomToERC20", data);
    return promise.then((data) => QueryDenomToERC20Response.decode(new BinaryReader(data)));
  }
  GetLastObservedEvmBlock(
    request: QueryLastObservedEvmBlockRequest,
  ): Promise<QueryLastObservedEvmBlockResponse> {
    const data = QueryLastObservedEvmBlockRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetLastObservedEvmBlock", data);
    return promise.then((data) => QueryLastObservedEvmBlockResponse.decode(new BinaryReader(data)));
  }
  GetLastObservedEvmNonce(
    request: QueryLastObservedEvmNonceRequest,
  ): Promise<QueryLastObservedEvmNonceResponse> {
    const data = QueryLastObservedEvmNonceRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetLastObservedEvmNonce", data);
    return promise.then((data) => QueryLastObservedEvmNonceResponse.decode(new BinaryReader(data)));
  }
  GetAttestations(request: QueryAttestationsRequest): Promise<QueryAttestationsResponse> {
    const data = QueryAttestationsRequest.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetAttestations", data);
    return promise.then((data) => QueryAttestationsResponse.decode(new BinaryReader(data)));
  }
  GetDelegateKeys(request: QueryDelegateKeys = {}): Promise<QueryDelegateKeysResponse> {
    const data = QueryDelegateKeys.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetDelegateKeys", data);
    return promise.then((data) => QueryDelegateKeysResponse.decode(new BinaryReader(data)));
  }
  GetDelegateKeysByValidator(
    request: QueryDelegateKeysByValidatorAddress,
  ): Promise<QueryDelegateKeysByValidatorAddressResponse> {
    const data = QueryDelegateKeysByValidatorAddress.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetDelegateKeysByValidator", data);
    return promise.then((data) => QueryDelegateKeysByValidatorAddressResponse.decode(new BinaryReader(data)));
  }
  GetDelegateKeysByEvmAddress(
    request: QueryDelegateKeysByEvmAddress,
  ): Promise<QueryDelegateKeysByEvmAddressResponse> {
    const data = QueryDelegateKeysByEvmAddress.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetDelegateKeysByEvmAddress", data);
    return promise.then((data) => QueryDelegateKeysByEvmAddressResponse.decode(new BinaryReader(data)));
  }
  GetDelegateKeysByOrchestrator(
    request: QueryDelegateKeysByOrchestratorAddress,
  ): Promise<QueryDelegateKeysByOrchestratorAddressResponse> {
    const data = QueryDelegateKeysByOrchestratorAddress.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetDelegateKeysByOrchestrator", data);
    return promise.then((data) =>
      QueryDelegateKeysByOrchestratorAddressResponse.decode(new BinaryReader(data)),
    );
  }
  GetPendingSendToEvmChain(request: QueryPendingSendToEvmChain): Promise<QueryPendingSendToEvmChainResponse> {
    const data = QueryPendingSendToEvmChain.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetPendingSendToEvmChain", data);
    return promise.then((data) => QueryPendingSendToEvmChainResponse.decode(new BinaryReader(data)));
  }
  GetPendingIbcAutoForwards(
    request: QueryPendingIbcAutoForwards,
  ): Promise<QueryPendingIbcAutoForwardsResponse> {
    const data = QueryPendingIbcAutoForwards.encode(request).finish();
    const promise = this.rpc.request("gravity.gravity.v1.Query", "GetPendingIbcAutoForwards", data);
    return promise.then((data) => QueryPendingIbcAutoForwardsResponse.decode(new BinaryReader(data)));
  }
}
