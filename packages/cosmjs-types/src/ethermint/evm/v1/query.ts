/* eslint-disable */
import { MsgEthereumTx, MsgEthereumTxResponse } from "./tx";
import { TraceConfig, Log, Params } from "./evm";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { BinaryReader, BinaryWriter } from "../../../binary";
import {
  isSet,
  DeepPartial,
  Exact,
  bytesFromBase64,
  base64FromBytes,
  fromJsonTimestamp,
  fromTimestamp,
  Rpc,
} from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.evm.v1";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  /** address is the ethereum hex address to query the account for. */
  address: string;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponse {
  /** balance is the balance of the EVM denomination. */
  balance: string;
  /** code_hash is the hex-formatted code bytes from the EOA. */
  codeHash: string;
  /** nonce is the account's sequence number. */
  nonce: bigint;
}
/**
 * QueryCosmosAccountRequest is the request type for the Query/CosmosAccount RPC
 * method.
 */
export interface QueryCosmosAccountRequest {
  /** address is the ethereum hex address to query the account for. */
  address: string;
}
/**
 * QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
 * RPC method.
 */
export interface QueryCosmosAccountResponse {
  /** cosmos_address is the cosmos address of the account. */
  cosmosAddress: string;
  /** sequence is the account's sequence number. */
  sequence: bigint;
  /** account_number is the account number */
  accountNumber: bigint;
}
/**
 * QueryValidatorAccountRequest is the request type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountRequest {
  /** cons_address is the validator cons address to query the account for. */
  consAddress: string;
}
/**
 * QueryValidatorAccountResponse is the response type for the
 * Query/ValidatorAccount RPC method.
 */
export interface QueryValidatorAccountResponse {
  /** account_address is the cosmos address of the account in bech32 format. */
  accountAddress: string;
  /** sequence is the account's sequence number. */
  sequence: bigint;
  /** account_number is the account number */
  accountNumber: bigint;
}
/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequest {
  /** address is the ethereum hex address to query the balance for. */
  address: string;
}
/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponse {
  /** balance is the balance of the EVM denomination. */
  balance: string;
}
/** QueryStorageRequest is the request type for the Query/Storage RPC method. */
export interface QueryStorageRequest {
  /** address is the ethereum hex address to query the storage state for. */
  address: string;
  /** key defines the key of the storage state */
  key: string;
}
/**
 * QueryStorageResponse is the response type for the Query/Storage RPC
 * method.
 */
export interface QueryStorageResponse {
  /** value defines the storage state value hash associated with the given key. */
  value: string;
}
/** QueryCodeRequest is the request type for the Query/Code RPC method. */
export interface QueryCodeRequest {
  /** address is the ethereum hex address to query the code for. */
  address: string;
}
/**
 * QueryCodeResponse is the response type for the Query/Code RPC
 * method.
 */
export interface QueryCodeResponse {
  /** code represents the code bytes from an ethereum address. */
  code: Uint8Array;
}
/** QueryTxLogsRequest is the request type for the Query/TxLogs RPC method. */
export interface QueryTxLogsRequest {
  /** hash is the ethereum transaction hex hash to query the logs for. */
  hash: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
/** QueryTxLogsResponse is the response type for the Query/TxLogs RPC method. */
export interface QueryTxLogsResponse {
  /** logs represents the ethereum logs generated from the given transaction. */
  logs: Log[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
/** QueryParamsRequest defines the request type for querying x/evm parameters. */
export interface QueryParamsRequest {}
/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface QueryParamsResponse {
  /** params define the evm module parameters. */
  params: Params;
}
/** EthCallRequest defines EthCall request */
export interface EthCallRequest {
  /** args uses the same json format as the json rpc api. */
  args: Uint8Array;
  /** gas_cap defines the default gas cap to be used */
  gasCap: bigint;
  /** proposer_address of the requested block in hex format */
  proposerAddress: Uint8Array;
  /** chain_id is the eip155 chain id parsed from the requested block header */
  chainId: bigint;
}
/** EstimateGasResponse defines EstimateGas response */
export interface EstimateGasResponse {
  /** gas returns the estimated gas */
  gas: bigint;
}
/** QueryTraceTxRequest defines TraceTx request */
export interface QueryTraceTxRequest {
  /** msg is the MsgEthereumTx for the requested transaction */
  msg?: MsgEthereumTx;
  /** trace_config holds extra parameters to trace functions. */
  traceConfig?: TraceConfig;
  /**
   * predecessors is an array of transactions included in the same block
   * need to be replayed first to get correct context for tracing.
   */
  predecessors: MsgEthereumTx[];
  /** block_number of requested transaction */
  blockNumber: bigint;
  /** block_hash of requested transaction */
  blockHash: string;
  /** block_time of requested transaction */
  blockTime: Timestamp;
  /** proposer_address is the proposer of the requested block */
  proposerAddress: Uint8Array;
  /** chain_id is the the eip155 chain id parsed from the requested block header */
  chainId: bigint;
}
/** QueryTraceTxResponse defines TraceTx response */
export interface QueryTraceTxResponse {
  /** data is the response serialized in bytes */
  data: Uint8Array;
}
/** QueryTraceBlockRequest defines TraceTx request */
export interface QueryTraceBlockRequest {
  /** txs is an array of messages in the block */
  txs: MsgEthereumTx[];
  /** trace_config holds extra parameters to trace functions. */
  traceConfig?: TraceConfig;
  /** block_number of the traced block */
  blockNumber: bigint;
  /** block_hash (hex) of the traced block */
  blockHash: string;
  /** block_time of the traced block */
  blockTime: Timestamp;
  /** proposer_address is the address of the requested block */
  proposerAddress: Uint8Array;
  /** chain_id is the eip155 chain id parsed from the requested block header */
  chainId: bigint;
}
/** QueryTraceBlockResponse defines TraceBlock response */
export interface QueryTraceBlockResponse {
  /** data is the response serialized in bytes */
  data: Uint8Array;
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
function createBaseQueryAccountRequest(): QueryAccountRequest {
  return {
    address: "",
  };
}
export const QueryAccountRequest = {
  typeUrl: "/ethermint.evm.v1.QueryAccountRequest",
  encode(message: QueryAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountRequest {
    const obj = createBaseQueryAccountRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryAccountRequest): JsonSafe<QueryAccountRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAccountRequest>, I>>(object: I): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryAccountResponse(): QueryAccountResponse {
  return {
    balance: "",
    codeHash: "",
    nonce: BigInt(0),
  };
}
export const QueryAccountResponse = {
  typeUrl: "/ethermint.evm.v1.QueryAccountResponse",
  encode(message: QueryAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    if (message.codeHash !== "") {
      writer.uint32(18).string(message.codeHash);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        case 2:
          message.codeHash = reader.string();
          break;
        case 3:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAccountResponse {
    const obj = createBaseQueryAccountResponse();
    if (isSet(object.balance)) obj.balance = String(object.balance);
    if (isSet(object.codeHash)) obj.codeHash = String(object.codeHash);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    return obj;
  },
  toJSON(message: QueryAccountResponse): JsonSafe<QueryAccountResponse> {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    message.codeHash !== undefined && (obj.codeHash = message.codeHash);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAccountResponse>, I>>(object: I): QueryAccountResponse {
    const message = createBaseQueryAccountResponse();
    message.balance = object.balance ?? "";
    message.codeHash = object.codeHash ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    return message;
  },
};
function createBaseQueryCosmosAccountRequest(): QueryCosmosAccountRequest {
  return {
    address: "",
  };
}
export const QueryCosmosAccountRequest = {
  typeUrl: "/ethermint.evm.v1.QueryCosmosAccountRequest",
  encode(message: QueryCosmosAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCosmosAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCosmosAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCosmosAccountRequest {
    const obj = createBaseQueryCosmosAccountRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryCosmosAccountRequest): JsonSafe<QueryCosmosAccountRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCosmosAccountRequest>, I>>(
    object: I,
  ): QueryCosmosAccountRequest {
    const message = createBaseQueryCosmosAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryCosmosAccountResponse(): QueryCosmosAccountResponse {
  return {
    cosmosAddress: "",
    sequence: BigInt(0),
    accountNumber: BigInt(0),
  };
}
export const QueryCosmosAccountResponse = {
  typeUrl: "/ethermint.evm.v1.QueryCosmosAccountResponse",
  encode(message: QueryCosmosAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cosmosAddress !== "") {
      writer.uint32(10).string(message.cosmosAddress);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (message.accountNumber !== BigInt(0)) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCosmosAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCosmosAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cosmosAddress = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        case 3:
          message.accountNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCosmosAccountResponse {
    const obj = createBaseQueryCosmosAccountResponse();
    if (isSet(object.cosmosAddress)) obj.cosmosAddress = String(object.cosmosAddress);
    if (isSet(object.sequence)) obj.sequence = BigInt(object.sequence.toString());
    if (isSet(object.accountNumber)) obj.accountNumber = BigInt(object.accountNumber.toString());
    return obj;
  },
  toJSON(message: QueryCosmosAccountResponse): JsonSafe<QueryCosmosAccountResponse> {
    const obj: any = {};
    message.cosmosAddress !== undefined && (obj.cosmosAddress = message.cosmosAddress);
    message.sequence !== undefined && (obj.sequence = (message.sequence || BigInt(0)).toString());
    message.accountNumber !== undefined &&
      (obj.accountNumber = (message.accountNumber || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCosmosAccountResponse>, I>>(
    object: I,
  ): QueryCosmosAccountResponse {
    const message = createBaseQueryCosmosAccountResponse();
    message.cosmosAddress = object.cosmosAddress ?? "";
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence.toString());
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = BigInt(object.accountNumber.toString());
    }
    return message;
  },
};
function createBaseQueryValidatorAccountRequest(): QueryValidatorAccountRequest {
  return {
    consAddress: "",
  };
}
export const QueryValidatorAccountRequest = {
  typeUrl: "/ethermint.evm.v1.QueryValidatorAccountRequest",
  encode(message: QueryValidatorAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consAddress !== "") {
      writer.uint32(10).string(message.consAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValidatorAccountRequest {
    const obj = createBaseQueryValidatorAccountRequest();
    if (isSet(object.consAddress)) obj.consAddress = String(object.consAddress);
    return obj;
  },
  toJSON(message: QueryValidatorAccountRequest): JsonSafe<QueryValidatorAccountRequest> {
    const obj: any = {};
    message.consAddress !== undefined && (obj.consAddress = message.consAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorAccountRequest>, I>>(
    object: I,
  ): QueryValidatorAccountRequest {
    const message = createBaseQueryValidatorAccountRequest();
    message.consAddress = object.consAddress ?? "";
    return message;
  },
};
function createBaseQueryValidatorAccountResponse(): QueryValidatorAccountResponse {
  return {
    accountAddress: "",
    sequence: BigInt(0),
    accountNumber: BigInt(0),
  };
}
export const QueryValidatorAccountResponse = {
  typeUrl: "/ethermint.evm.v1.QueryValidatorAccountResponse",
  encode(message: QueryValidatorAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (message.accountNumber !== BigInt(0)) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        case 3:
          message.accountNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryValidatorAccountResponse {
    const obj = createBaseQueryValidatorAccountResponse();
    if (isSet(object.accountAddress)) obj.accountAddress = String(object.accountAddress);
    if (isSet(object.sequence)) obj.sequence = BigInt(object.sequence.toString());
    if (isSet(object.accountNumber)) obj.accountNumber = BigInt(object.accountNumber.toString());
    return obj;
  },
  toJSON(message: QueryValidatorAccountResponse): JsonSafe<QueryValidatorAccountResponse> {
    const obj: any = {};
    message.accountAddress !== undefined && (obj.accountAddress = message.accountAddress);
    message.sequence !== undefined && (obj.sequence = (message.sequence || BigInt(0)).toString());
    message.accountNumber !== undefined &&
      (obj.accountNumber = (message.accountNumber || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorAccountResponse>, I>>(
    object: I,
  ): QueryValidatorAccountResponse {
    const message = createBaseQueryValidatorAccountResponse();
    message.accountAddress = object.accountAddress ?? "";
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence.toString());
    }
    if (object.accountNumber !== undefined && object.accountNumber !== null) {
      message.accountNumber = BigInt(object.accountNumber.toString());
    }
    return message;
  },
};
function createBaseQueryBalanceRequest(): QueryBalanceRequest {
  return {
    address: "",
  };
}
export const QueryBalanceRequest = {
  typeUrl: "/ethermint.evm.v1.QueryBalanceRequest",
  encode(message: QueryBalanceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalanceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalanceRequest {
    const obj = createBaseQueryBalanceRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryBalanceRequest): JsonSafe<QueryBalanceRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalanceRequest>, I>>(object: I): QueryBalanceRequest {
    const message = createBaseQueryBalanceRequest();
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryBalanceResponse(): QueryBalanceResponse {
  return {
    balance: "",
  };
}
export const QueryBalanceResponse = {
  typeUrl: "/ethermint.evm.v1.QueryBalanceResponse",
  encode(message: QueryBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalanceResponse {
    const obj = createBaseQueryBalanceResponse();
    if (isSet(object.balance)) obj.balance = String(object.balance);
    return obj;
  },
  toJSON(message: QueryBalanceResponse): JsonSafe<QueryBalanceResponse> {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalanceResponse>, I>>(object: I): QueryBalanceResponse {
    const message = createBaseQueryBalanceResponse();
    message.balance = object.balance ?? "";
    return message;
  },
};
function createBaseQueryStorageRequest(): QueryStorageRequest {
  return {
    address: "",
    key: "",
  };
}
export const QueryStorageRequest = {
  typeUrl: "/ethermint.evm.v1.QueryStorageRequest",
  encode(message: QueryStorageRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStorageRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStorageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryStorageRequest {
    const obj = createBaseQueryStorageRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.key)) obj.key = String(object.key);
    return obj;
  },
  toJSON(message: QueryStorageRequest): JsonSafe<QueryStorageRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryStorageRequest>, I>>(object: I): QueryStorageRequest {
    const message = createBaseQueryStorageRequest();
    message.address = object.address ?? "";
    message.key = object.key ?? "";
    return message;
  },
};
function createBaseQueryStorageResponse(): QueryStorageResponse {
  return {
    value: "",
  };
}
export const QueryStorageResponse = {
  typeUrl: "/ethermint.evm.v1.QueryStorageResponse",
  encode(message: QueryStorageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStorageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStorageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryStorageResponse {
    const obj = createBaseQueryStorageResponse();
    if (isSet(object.value)) obj.value = String(object.value);
    return obj;
  },
  toJSON(message: QueryStorageResponse): JsonSafe<QueryStorageResponse> {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryStorageResponse>, I>>(object: I): QueryStorageResponse {
    const message = createBaseQueryStorageResponse();
    message.value = object.value ?? "";
    return message;
  },
};
function createBaseQueryCodeRequest(): QueryCodeRequest {
  return {
    address: "",
  };
}
export const QueryCodeRequest = {
  typeUrl: "/ethermint.evm.v1.QueryCodeRequest",
  encode(message: QueryCodeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCodeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCodeRequest {
    const obj = createBaseQueryCodeRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryCodeRequest): JsonSafe<QueryCodeRequest> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCodeRequest>, I>>(object: I): QueryCodeRequest {
    const message = createBaseQueryCodeRequest();
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryCodeResponse(): QueryCodeResponse {
  return {
    code: new Uint8Array(),
  };
}
export const QueryCodeResponse = {
  typeUrl: "/ethermint.evm.v1.QueryCodeResponse",
  encode(message: QueryCodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.code.length !== 0) {
      writer.uint32(10).bytes(message.code);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCodeResponse {
    const obj = createBaseQueryCodeResponse();
    if (isSet(object.code)) obj.code = bytesFromBase64(object.code);
    return obj;
  },
  toJSON(message: QueryCodeResponse): JsonSafe<QueryCodeResponse> {
    const obj: any = {};
    message.code !== undefined &&
      (obj.code = base64FromBytes(message.code !== undefined ? message.code : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCodeResponse>, I>>(object: I): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    message.code = object.code ?? new Uint8Array();
    return message;
  },
};
function createBaseQueryTxLogsRequest(): QueryTxLogsRequest {
  return {
    hash: "",
    pagination: undefined,
  };
}
export const QueryTxLogsRequest = {
  typeUrl: "/ethermint.evm.v1.QueryTxLogsRequest",
  encode(message: QueryTxLogsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTxLogsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTxLogsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTxLogsRequest {
    const obj = createBaseQueryTxLogsRequest();
    if (isSet(object.hash)) obj.hash = String(object.hash);
    if (isSet(object.pagination)) obj.pagination = PageRequest.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryTxLogsRequest): JsonSafe<QueryTxLogsRequest> {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTxLogsRequest>, I>>(object: I): QueryTxLogsRequest {
    const message = createBaseQueryTxLogsRequest();
    message.hash = object.hash ?? "";
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryTxLogsResponse(): QueryTxLogsResponse {
  return {
    logs: [],
    pagination: undefined,
  };
}
export const QueryTxLogsResponse = {
  typeUrl: "/ethermint.evm.v1.QueryTxLogsResponse",
  encode(message: QueryTxLogsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.logs) {
      Log.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTxLogsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTxLogsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.logs.push(Log.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTxLogsResponse {
    const obj = createBaseQueryTxLogsResponse();
    if (Array.isArray(object?.logs)) obj.logs = object.logs.map((e: any) => Log.fromJSON(e));
    if (isSet(object.pagination)) obj.pagination = PageResponse.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryTxLogsResponse): JsonSafe<QueryTxLogsResponse> {
    const obj: any = {};
    if (message.logs) {
      obj.logs = message.logs.map((e) => (e ? Log.toJSON(e) : undefined));
    } else {
      obj.logs = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTxLogsResponse>, I>>(object: I): QueryTxLogsResponse {
    const message = createBaseQueryTxLogsResponse();
    message.logs = object.logs?.map((e) => Log.fromPartial(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    }
    return message;
  },
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/ethermint.evm.v1.QueryParamsRequest",
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
  typeUrl: "/ethermint.evm.v1.QueryParamsResponse",
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
function createBaseEthCallRequest(): EthCallRequest {
  return {
    args: new Uint8Array(),
    gasCap: BigInt(0),
    proposerAddress: new Uint8Array(),
    chainId: BigInt(0),
  };
}
export const EthCallRequest = {
  typeUrl: "/ethermint.evm.v1.EthCallRequest",
  encode(message: EthCallRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.args.length !== 0) {
      writer.uint32(10).bytes(message.args);
    }
    if (message.gasCap !== BigInt(0)) {
      writer.uint32(16).uint64(message.gasCap);
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(26).bytes(message.proposerAddress);
    }
    if (message.chainId !== BigInt(0)) {
      writer.uint32(32).int64(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EthCallRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEthCallRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.args = reader.bytes();
          break;
        case 2:
          message.gasCap = reader.uint64();
          break;
        case 3:
          message.proposerAddress = reader.bytes();
          break;
        case 4:
          message.chainId = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EthCallRequest {
    const obj = createBaseEthCallRequest();
    if (isSet(object.args)) obj.args = bytesFromBase64(object.args);
    if (isSet(object.gasCap)) obj.gasCap = BigInt(object.gasCap.toString());
    if (isSet(object.proposerAddress)) obj.proposerAddress = bytesFromBase64(object.proposerAddress);
    if (isSet(object.chainId)) obj.chainId = BigInt(object.chainId.toString());
    return obj;
  },
  toJSON(message: EthCallRequest): JsonSafe<EthCallRequest> {
    const obj: any = {};
    message.args !== undefined &&
      (obj.args = base64FromBytes(message.args !== undefined ? message.args : new Uint8Array()));
    message.gasCap !== undefined && (obj.gasCap = (message.gasCap || BigInt(0)).toString());
    message.proposerAddress !== undefined &&
      (obj.proposerAddress = base64FromBytes(
        message.proposerAddress !== undefined ? message.proposerAddress : new Uint8Array(),
      ));
    message.chainId !== undefined && (obj.chainId = (message.chainId || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EthCallRequest>, I>>(object: I): EthCallRequest {
    const message = createBaseEthCallRequest();
    message.args = object.args ?? new Uint8Array();
    if (object.gasCap !== undefined && object.gasCap !== null) {
      message.gasCap = BigInt(object.gasCap.toString());
    }
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = BigInt(object.chainId.toString());
    }
    return message;
  },
};
function createBaseEstimateGasResponse(): EstimateGasResponse {
  return {
    gas: BigInt(0),
  };
}
export const EstimateGasResponse = {
  typeUrl: "/ethermint.evm.v1.EstimateGasResponse",
  encode(message: EstimateGasResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gas !== BigInt(0)) {
      writer.uint32(8).uint64(message.gas);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EstimateGasResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateGasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EstimateGasResponse {
    const obj = createBaseEstimateGasResponse();
    if (isSet(object.gas)) obj.gas = BigInt(object.gas.toString());
    return obj;
  },
  toJSON(message: EstimateGasResponse): JsonSafe<EstimateGasResponse> {
    const obj: any = {};
    message.gas !== undefined && (obj.gas = (message.gas || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EstimateGasResponse>, I>>(object: I): EstimateGasResponse {
    const message = createBaseEstimateGasResponse();
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = BigInt(object.gas.toString());
    }
    return message;
  },
};
function createBaseQueryTraceTxRequest(): QueryTraceTxRequest {
  return {
    msg: undefined,
    traceConfig: undefined,
    predecessors: [],
    blockNumber: BigInt(0),
    blockHash: "",
    blockTime: Timestamp.fromPartial({}),
    proposerAddress: new Uint8Array(),
    chainId: BigInt(0),
  };
}
export const QueryTraceTxRequest = {
  typeUrl: "/ethermint.evm.v1.QueryTraceTxRequest",
  encode(message: QueryTraceTxRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.msg !== undefined) {
      MsgEthereumTx.encode(message.msg, writer.uint32(10).fork()).ldelim();
    }
    if (message.traceConfig !== undefined) {
      TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.predecessors) {
      MsgEthereumTx.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.blockNumber !== BigInt(0)) {
      writer.uint32(40).int64(message.blockNumber);
    }
    if (message.blockHash !== "") {
      writer.uint32(50).string(message.blockHash);
    }
    if (message.blockTime !== undefined) {
      Timestamp.encode(message.blockTime, writer.uint32(58).fork()).ldelim();
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    if (message.chainId !== BigInt(0)) {
      writer.uint32(72).int64(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTraceTxRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg = MsgEthereumTx.decode(reader, reader.uint32());
          break;
        case 3:
          message.traceConfig = TraceConfig.decode(reader, reader.uint32());
          break;
        case 4:
          message.predecessors.push(MsgEthereumTx.decode(reader, reader.uint32()));
          break;
        case 5:
          message.blockNumber = reader.int64();
          break;
        case 6:
          message.blockHash = reader.string();
          break;
        case 7:
          message.blockTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 8:
          message.proposerAddress = reader.bytes();
          break;
        case 9:
          message.chainId = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTraceTxRequest {
    const obj = createBaseQueryTraceTxRequest();
    if (isSet(object.msg)) obj.msg = MsgEthereumTx.fromJSON(object.msg);
    if (isSet(object.traceConfig)) obj.traceConfig = TraceConfig.fromJSON(object.traceConfig);
    if (Array.isArray(object?.predecessors))
      obj.predecessors = object.predecessors.map((e: any) => MsgEthereumTx.fromJSON(e));
    if (isSet(object.blockNumber)) obj.blockNumber = BigInt(object.blockNumber.toString());
    if (isSet(object.blockHash)) obj.blockHash = String(object.blockHash);
    if (isSet(object.blockTime)) obj.blockTime = fromJsonTimestamp(object.blockTime);
    if (isSet(object.proposerAddress)) obj.proposerAddress = bytesFromBase64(object.proposerAddress);
    if (isSet(object.chainId)) obj.chainId = BigInt(object.chainId.toString());
    return obj;
  },
  toJSON(message: QueryTraceTxRequest): JsonSafe<QueryTraceTxRequest> {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg ? MsgEthereumTx.toJSON(message.msg) : undefined);
    message.traceConfig !== undefined &&
      (obj.traceConfig = message.traceConfig ? TraceConfig.toJSON(message.traceConfig) : undefined);
    if (message.predecessors) {
      obj.predecessors = message.predecessors.map((e) => (e ? MsgEthereumTx.toJSON(e) : undefined));
    } else {
      obj.predecessors = [];
    }
    message.blockNumber !== undefined && (obj.blockNumber = (message.blockNumber || BigInt(0)).toString());
    message.blockHash !== undefined && (obj.blockHash = message.blockHash);
    message.blockTime !== undefined && (obj.blockTime = fromTimestamp(message.blockTime).toISOString());
    message.proposerAddress !== undefined &&
      (obj.proposerAddress = base64FromBytes(
        message.proposerAddress !== undefined ? message.proposerAddress : new Uint8Array(),
      ));
    message.chainId !== undefined && (obj.chainId = (message.chainId || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTraceTxRequest>, I>>(object: I): QueryTraceTxRequest {
    const message = createBaseQueryTraceTxRequest();
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = MsgEthereumTx.fromPartial(object.msg);
    }
    if (object.traceConfig !== undefined && object.traceConfig !== null) {
      message.traceConfig = TraceConfig.fromPartial(object.traceConfig);
    }
    message.predecessors = object.predecessors?.map((e) => MsgEthereumTx.fromPartial(e)) || [];
    if (object.blockNumber !== undefined && object.blockNumber !== null) {
      message.blockNumber = BigInt(object.blockNumber.toString());
    }
    message.blockHash = object.blockHash ?? "";
    if (object.blockTime !== undefined && object.blockTime !== null) {
      message.blockTime = Timestamp.fromPartial(object.blockTime);
    }
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = BigInt(object.chainId.toString());
    }
    return message;
  },
};
function createBaseQueryTraceTxResponse(): QueryTraceTxResponse {
  return {
    data: new Uint8Array(),
  };
}
export const QueryTraceTxResponse = {
  typeUrl: "/ethermint.evm.v1.QueryTraceTxResponse",
  encode(message: QueryTraceTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTraceTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTraceTxResponse {
    const obj = createBaseQueryTraceTxResponse();
    if (isSet(object.data)) obj.data = bytesFromBase64(object.data);
    return obj;
  },
  toJSON(message: QueryTraceTxResponse): JsonSafe<QueryTraceTxResponse> {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTraceTxResponse>, I>>(object: I): QueryTraceTxResponse {
    const message = createBaseQueryTraceTxResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};
function createBaseQueryTraceBlockRequest(): QueryTraceBlockRequest {
  return {
    txs: [],
    traceConfig: undefined,
    blockNumber: BigInt(0),
    blockHash: "",
    blockTime: Timestamp.fromPartial({}),
    proposerAddress: new Uint8Array(),
    chainId: BigInt(0),
  };
}
export const QueryTraceBlockRequest = {
  typeUrl: "/ethermint.evm.v1.QueryTraceBlockRequest",
  encode(message: QueryTraceBlockRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.txs) {
      MsgEthereumTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.traceConfig !== undefined) {
      TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
    }
    if (message.blockNumber !== BigInt(0)) {
      writer.uint32(40).int64(message.blockNumber);
    }
    if (message.blockHash !== "") {
      writer.uint32(50).string(message.blockHash);
    }
    if (message.blockTime !== undefined) {
      Timestamp.encode(message.blockTime, writer.uint32(58).fork()).ldelim();
    }
    if (message.proposerAddress.length !== 0) {
      writer.uint32(66).bytes(message.proposerAddress);
    }
    if (message.chainId !== BigInt(0)) {
      writer.uint32(72).int64(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTraceBlockRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(MsgEthereumTx.decode(reader, reader.uint32()));
          break;
        case 3:
          message.traceConfig = TraceConfig.decode(reader, reader.uint32());
          break;
        case 5:
          message.blockNumber = reader.int64();
          break;
        case 6:
          message.blockHash = reader.string();
          break;
        case 7:
          message.blockTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 8:
          message.proposerAddress = reader.bytes();
          break;
        case 9:
          message.chainId = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTraceBlockRequest {
    const obj = createBaseQueryTraceBlockRequest();
    if (Array.isArray(object?.txs)) obj.txs = object.txs.map((e: any) => MsgEthereumTx.fromJSON(e));
    if (isSet(object.traceConfig)) obj.traceConfig = TraceConfig.fromJSON(object.traceConfig);
    if (isSet(object.blockNumber)) obj.blockNumber = BigInt(object.blockNumber.toString());
    if (isSet(object.blockHash)) obj.blockHash = String(object.blockHash);
    if (isSet(object.blockTime)) obj.blockTime = fromJsonTimestamp(object.blockTime);
    if (isSet(object.proposerAddress)) obj.proposerAddress = bytesFromBase64(object.proposerAddress);
    if (isSet(object.chainId)) obj.chainId = BigInt(object.chainId.toString());
    return obj;
  },
  toJSON(message: QueryTraceBlockRequest): JsonSafe<QueryTraceBlockRequest> {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) => (e ? MsgEthereumTx.toJSON(e) : undefined));
    } else {
      obj.txs = [];
    }
    message.traceConfig !== undefined &&
      (obj.traceConfig = message.traceConfig ? TraceConfig.toJSON(message.traceConfig) : undefined);
    message.blockNumber !== undefined && (obj.blockNumber = (message.blockNumber || BigInt(0)).toString());
    message.blockHash !== undefined && (obj.blockHash = message.blockHash);
    message.blockTime !== undefined && (obj.blockTime = fromTimestamp(message.blockTime).toISOString());
    message.proposerAddress !== undefined &&
      (obj.proposerAddress = base64FromBytes(
        message.proposerAddress !== undefined ? message.proposerAddress : new Uint8Array(),
      ));
    message.chainId !== undefined && (obj.chainId = (message.chainId || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTraceBlockRequest>, I>>(object: I): QueryTraceBlockRequest {
    const message = createBaseQueryTraceBlockRequest();
    message.txs = object.txs?.map((e) => MsgEthereumTx.fromPartial(e)) || [];
    if (object.traceConfig !== undefined && object.traceConfig !== null) {
      message.traceConfig = TraceConfig.fromPartial(object.traceConfig);
    }
    if (object.blockNumber !== undefined && object.blockNumber !== null) {
      message.blockNumber = BigInt(object.blockNumber.toString());
    }
    message.blockHash = object.blockHash ?? "";
    if (object.blockTime !== undefined && object.blockTime !== null) {
      message.blockTime = Timestamp.fromPartial(object.blockTime);
    }
    message.proposerAddress = object.proposerAddress ?? new Uint8Array();
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = BigInt(object.chainId.toString());
    }
    return message;
  },
};
function createBaseQueryTraceBlockResponse(): QueryTraceBlockResponse {
  return {
    data: new Uint8Array(),
  };
}
export const QueryTraceBlockResponse = {
  typeUrl: "/ethermint.evm.v1.QueryTraceBlockResponse",
  encode(message: QueryTraceBlockResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTraceBlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTraceBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTraceBlockResponse {
    const obj = createBaseQueryTraceBlockResponse();
    if (isSet(object.data)) obj.data = bytesFromBase64(object.data);
    return obj;
  },
  toJSON(message: QueryTraceBlockResponse): JsonSafe<QueryTraceBlockResponse> {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryTraceBlockResponse>, I>>(object: I): QueryTraceBlockResponse {
    const message = createBaseQueryTraceBlockResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};
function createBaseQueryBaseFeeRequest(): QueryBaseFeeRequest {
  return {};
}
export const QueryBaseFeeRequest = {
  typeUrl: "/ethermint.evm.v1.QueryBaseFeeRequest",
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
  typeUrl: "/ethermint.evm.v1.QueryBaseFeeResponse",
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
/** Query defines the gRPC querier service. */
export interface Query {
  /** Account queries an Ethereum account. */
  Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
  /** CosmosAccount queries an Ethereum account's Cosmos Address. */
  CosmosAccount(request: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponse>;
  /**
   * ValidatorAccount queries an Ethereum account's from a validator consensus
   * Address.
   */
  ValidatorAccount(request: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponse>;
  /**
   * Balance queries the balance of a the EVM denomination for a single
   * EthAccount.
   */
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /** Storage queries the balance of all coins for a single account. */
  Storage(request: QueryStorageRequest): Promise<QueryStorageResponse>;
  /** Code queries the balance of all coins for a single account. */
  Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
  /** Params queries the parameters of x/evm module. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** EthCall implements the `eth_call` rpc api */
  EthCall(request: EthCallRequest): Promise<MsgEthereumTxResponse>;
  /** EstimateGas implements the `eth_estimateGas` rpc api */
  EstimateGas(request: EthCallRequest): Promise<EstimateGasResponse>;
  /** TraceTx implements the `debug_traceTransaction` rpc api */
  TraceTx(request: QueryTraceTxRequest): Promise<QueryTraceTxResponse>;
  /**
   * TraceBlock implements the `debug_traceBlockByNumber` and
   * `debug_traceBlockByHash` rpc api
   */
  TraceBlock(request: QueryTraceBlockRequest): Promise<QueryTraceBlockResponse>;
  /**
   * BaseFee queries the base fee of the parent block of the current block,
   * it's similar to feemarket module's method, but also checks london hardfork
   * status.
   */
  BaseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Account = this.Account.bind(this);
    this.CosmosAccount = this.CosmosAccount.bind(this);
    this.ValidatorAccount = this.ValidatorAccount.bind(this);
    this.Balance = this.Balance.bind(this);
    this.Storage = this.Storage.bind(this);
    this.Code = this.Code.bind(this);
    this.Params = this.Params.bind(this);
    this.EthCall = this.EthCall.bind(this);
    this.EstimateGas = this.EstimateGas.bind(this);
    this.TraceTx = this.TraceTx.bind(this);
    this.TraceBlock = this.TraceBlock.bind(this);
    this.BaseFee = this.BaseFee.bind(this);
  }
  Account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Account", data);
    return promise.then((data) => QueryAccountResponse.decode(new BinaryReader(data)));
  }
  CosmosAccount(request: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponse> {
    const data = QueryCosmosAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "CosmosAccount", data);
    return promise.then((data) => QueryCosmosAccountResponse.decode(new BinaryReader(data)));
  }
  ValidatorAccount(request: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponse> {
    const data = QueryValidatorAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "ValidatorAccount", data);
    return promise.then((data) => QueryValidatorAccountResponse.decode(new BinaryReader(data)));
  }
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Balance", data);
    return promise.then((data) => QueryBalanceResponse.decode(new BinaryReader(data)));
  }
  Storage(request: QueryStorageRequest): Promise<QueryStorageResponse> {
    const data = QueryStorageRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Storage", data);
    return promise.then((data) => QueryStorageResponse.decode(new BinaryReader(data)));
  }
  Code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
    const data = QueryCodeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Code", data);
    return promise.then((data) => QueryCodeResponse.decode(new BinaryReader(data)));
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  EthCall(request: EthCallRequest): Promise<MsgEthereumTxResponse> {
    const data = EthCallRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "EthCall", data);
    return promise.then((data) => MsgEthereumTxResponse.decode(new BinaryReader(data)));
  }
  EstimateGas(request: EthCallRequest): Promise<EstimateGasResponse> {
    const data = EthCallRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "EstimateGas", data);
    return promise.then((data) => EstimateGasResponse.decode(new BinaryReader(data)));
  }
  TraceTx(request: QueryTraceTxRequest): Promise<QueryTraceTxResponse> {
    const data = QueryTraceTxRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceTx", data);
    return promise.then((data) => QueryTraceTxResponse.decode(new BinaryReader(data)));
  }
  TraceBlock(request: QueryTraceBlockRequest): Promise<QueryTraceBlockResponse> {
    const data = QueryTraceBlockRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceBlock", data);
    return promise.then((data) => QueryTraceBlockResponse.decode(new BinaryReader(data)));
  }
  BaseFee(request: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponse> {
    const data = QueryBaseFeeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "BaseFee", data);
    return promise.then((data) => QueryBaseFeeResponse.decode(new BinaryReader(data)));
  }
}
