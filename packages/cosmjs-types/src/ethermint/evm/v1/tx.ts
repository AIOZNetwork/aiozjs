/* eslint-disable */
import { Any } from "../../../google/protobuf/any";
import { Params, AccessTuple, Log } from "./evm";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, bytesFromBase64, base64FromBytes, Rpc } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.evm.v1";
/** MsgEthereumTx encapsulates an Ethereum transaction as an SDK message. */
export interface MsgEthereumTx {
  /** data is inner transaction data of the Ethereum transaction */
  data?: Any;
  /** size is the encoded storage size of the transaction (DEPRECATED) */
  size: number;
  /** hash of the transaction in hex format */
  hash: string;
  /**
   * from is the ethereum signer address in hex format. This address value is
   * checked against the address derived from the signature (V, R, S) using the
   * secp256k1 elliptic curve
   */
  from: string;
}
/**
 * LegacyTx is the transaction data of regular Ethereum transactions.
 * NOTE: All non-protected transactions (i.e non EIP155 signed) will fail if the
 * AllowUnprotectedTxs parameter is disabled.
 */
export interface LegacyTx {
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: bigint;
  /** gas_price defines the value for each gas unit */
  gasPrice: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: bigint;
  /** to is the hex formatted address of the recipient */
  to: string;
  /** value defines the unsigned integer value of the transaction amount. */
  value: string;
  /** data is the data payload bytes of the transaction. */
  data: Uint8Array;
  /** v defines the signature value */
  v: Uint8Array;
  /** r defines the signature value */
  r: Uint8Array;
  /** s define the signature value */
  s: Uint8Array;
}
/** AccessListTx is the data of EIP-2930 access list transactions. */
export interface AccessListTx {
  /** chain_id of the destination EVM chain */
  chainId: string;
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: bigint;
  /** gas_price defines the value for each gas unit */
  gasPrice: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: bigint;
  /** to is the recipient address in hex format */
  to: string;
  /** value defines the unsigned integer value of the transaction amount. */
  value: string;
  /** data is the data payload bytes of the transaction. */
  data: Uint8Array;
  /** accesses is an array of access tuples */
  accesses: AccessTuple[];
  /** v defines the signature value */
  v: Uint8Array;
  /** r defines the signature value */
  r: Uint8Array;
  /** s define the signature value */
  s: Uint8Array;
}
/** DynamicFeeTx is the data of EIP-1559 dinamic fee transactions. */
export interface DynamicFeeTx {
  /** chain_id of the destination EVM chain */
  chainId: string;
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: bigint;
  /** gas_tip_cap defines the max value for the gas tip */
  gasTipCap: string;
  /** gas_fee_cap defines the max value for the gas fee */
  gasFeeCap: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: bigint;
  /** to is the hex formatted address of the recipient */
  to: string;
  /** value defines the the transaction amount. */
  value: string;
  /** data is the data payload bytes of the transaction. */
  data: Uint8Array;
  /** accesses is an array of access tuples */
  accesses: AccessTuple[];
  /** v defines the signature value */
  v: Uint8Array;
  /** r defines the signature value */
  r: Uint8Array;
  /** s define the signature value */
  s: Uint8Array;
}
/** ExtensionOptionsEthereumTx is an extension option for ethereum transactions */
export interface ExtensionOptionsEthereumTx {}
/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface MsgEthereumTxResponse {
  /**
   * hash of the ethereum transaction in hex format. This hash differs from the
   * Tendermint sha256 hash of the transaction bytes. See
   * https://github.com/tendermint/tendermint/issues/6539 for reference
   */
  hash: string;
  /**
   * logs contains the transaction hash and the proto-compatible ethereum
   * logs.
   */
  logs: Log[];
  /**
   * ret is the returned data from evm function (result or data supplied with
   * revert opcode)
   */
  ret: Uint8Array;
  /** vm_error is the error returned by vm execution */
  vmError: string;
  /** gas_used specifies how much gas was consumed by the transaction */
  gasUsed: bigint;
}
/** MsgUpdateParams defines a Msg for updating the x/evm module parameters. */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/evm parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
function createBaseMsgEthereumTx(): MsgEthereumTx {
  return {
    data: undefined,
    size: 0,
    hash: "",
    from: "",
  };
}
export const MsgEthereumTx = {
  typeUrl: "/ethermint.evm.v1.MsgEthereumTx",
  encode(message: MsgEthereumTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(10).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(17).double(message.size);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }
    if (message.from !== "") {
      writer.uint32(34).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgEthereumTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEthereumTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.size = reader.double();
          break;
        case 3:
          message.hash = reader.string();
          break;
        case 4:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgEthereumTx {
    const obj = createBaseMsgEthereumTx();
    if (isSet(object.data)) obj.data = Any.fromJSON(object.data);
    if (isSet(object.size)) obj.size = Number(object.size);
    if (isSet(object.hash)) obj.hash = String(object.hash);
    if (isSet(object.from)) obj.from = String(object.from);
    return obj;
  },
  toJSON(message: MsgEthereumTx): JsonSafe<MsgEthereumTx> {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    message.size !== undefined && (obj.size = message.size);
    message.hash !== undefined && (obj.hash = message.hash);
    message.from !== undefined && (obj.from = message.from);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgEthereumTx>, I>>(object: I): MsgEthereumTx {
    const message = createBaseMsgEthereumTx();
    if (object.data !== undefined && object.data !== null) {
      message.data = Any.fromPartial(object.data);
    }
    message.size = object.size ?? 0;
    message.hash = object.hash ?? "";
    message.from = object.from ?? "";
    return message;
  },
};
function createBaseLegacyTx(): LegacyTx {
  return {
    nonce: BigInt(0),
    gasPrice: "",
    gas: BigInt(0),
    to: "",
    value: "",
    data: new Uint8Array(),
    v: new Uint8Array(),
    r: new Uint8Array(),
    s: new Uint8Array(),
  };
}
export const LegacyTx = {
  typeUrl: "/ethermint.evm.v1.LegacyTx",
  encode(message: LegacyTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    if (message.gasPrice !== "") {
      writer.uint32(18).string(message.gasPrice);
    }
    if (message.gas !== BigInt(0)) {
      writer.uint32(24).uint64(message.gas);
    }
    if (message.to !== "") {
      writer.uint32(34).string(message.to);
    }
    if (message.value !== "") {
      writer.uint32(42).string(message.value);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    if (message.v.length !== 0) {
      writer.uint32(58).bytes(message.v);
    }
    if (message.r.length !== 0) {
      writer.uint32(66).bytes(message.r);
    }
    if (message.s.length !== 0) {
      writer.uint32(74).bytes(message.s);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LegacyTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        case 2:
          message.gasPrice = reader.string();
          break;
        case 3:
          message.gas = reader.uint64();
          break;
        case 4:
          message.to = reader.string();
          break;
        case 5:
          message.value = reader.string();
          break;
        case 6:
          message.data = reader.bytes();
          break;
        case 7:
          message.v = reader.bytes();
          break;
        case 8:
          message.r = reader.bytes();
          break;
        case 9:
          message.s = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LegacyTx {
    const obj = createBaseLegacyTx();
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.gasPrice)) obj.gasPrice = String(object.gasPrice);
    if (isSet(object.gas)) obj.gas = BigInt(object.gas.toString());
    if (isSet(object.to)) obj.to = String(object.to);
    if (isSet(object.value)) obj.value = String(object.value);
    if (isSet(object.data)) obj.data = bytesFromBase64(object.data);
    if (isSet(object.v)) obj.v = bytesFromBase64(object.v);
    if (isSet(object.r)) obj.r = bytesFromBase64(object.r);
    if (isSet(object.s)) obj.s = bytesFromBase64(object.s);
    return obj;
  },
  toJSON(message: LegacyTx): JsonSafe<LegacyTx> {
    const obj: any = {};
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
    message.gas !== undefined && (obj.gas = (message.gas || BigInt(0)).toString());
    message.to !== undefined && (obj.to = message.to);
    message.value !== undefined && (obj.value = message.value);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.v !== undefined &&
      (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
    message.r !== undefined &&
      (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
    message.s !== undefined &&
      (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<LegacyTx>, I>>(object: I): LegacyTx {
    const message = createBaseLegacyTx();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.gasPrice = object.gasPrice ?? "";
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = BigInt(object.gas.toString());
    }
    message.to = object.to ?? "";
    message.value = object.value ?? "";
    message.data = object.data ?? new Uint8Array();
    message.v = object.v ?? new Uint8Array();
    message.r = object.r ?? new Uint8Array();
    message.s = object.s ?? new Uint8Array();
    return message;
  },
};
function createBaseAccessListTx(): AccessListTx {
  return {
    chainId: "",
    nonce: BigInt(0),
    gasPrice: "",
    gas: BigInt(0),
    to: "",
    value: "",
    data: new Uint8Array(),
    accesses: [],
    v: new Uint8Array(),
    r: new Uint8Array(),
    s: new Uint8Array(),
  };
}
export const AccessListTx = {
  typeUrl: "/ethermint.evm.v1.AccessListTx",
  encode(message: AccessListTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.gasPrice !== "") {
      writer.uint32(26).string(message.gasPrice);
    }
    if (message.gas !== BigInt(0)) {
      writer.uint32(32).uint64(message.gas);
    }
    if (message.to !== "") {
      writer.uint32(42).string(message.to);
    }
    if (message.value !== "") {
      writer.uint32(50).string(message.value);
    }
    if (message.data.length !== 0) {
      writer.uint32(58).bytes(message.data);
    }
    for (const v of message.accesses) {
      AccessTuple.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.v.length !== 0) {
      writer.uint32(74).bytes(message.v);
    }
    if (message.r.length !== 0) {
      writer.uint32(82).bytes(message.r);
    }
    if (message.s.length !== 0) {
      writer.uint32(90).bytes(message.s);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccessListTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessListTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.gasPrice = reader.string();
          break;
        case 4:
          message.gas = reader.uint64();
          break;
        case 5:
          message.to = reader.string();
          break;
        case 6:
          message.value = reader.string();
          break;
        case 7:
          message.data = reader.bytes();
          break;
        case 8:
          message.accesses.push(AccessTuple.decode(reader, reader.uint32()));
          break;
        case 9:
          message.v = reader.bytes();
          break;
        case 10:
          message.r = reader.bytes();
          break;
        case 11:
          message.s = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AccessListTx {
    const obj = createBaseAccessListTx();
    if (isSet(object.chainId)) obj.chainId = String(object.chainId);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.gasPrice)) obj.gasPrice = String(object.gasPrice);
    if (isSet(object.gas)) obj.gas = BigInt(object.gas.toString());
    if (isSet(object.to)) obj.to = String(object.to);
    if (isSet(object.value)) obj.value = String(object.value);
    if (isSet(object.data)) obj.data = bytesFromBase64(object.data);
    if (Array.isArray(object?.accesses))
      obj.accesses = object.accesses.map((e: any) => AccessTuple.fromJSON(e));
    if (isSet(object.v)) obj.v = bytesFromBase64(object.v);
    if (isSet(object.r)) obj.r = bytesFromBase64(object.r);
    if (isSet(object.s)) obj.s = bytesFromBase64(object.s);
    return obj;
  },
  toJSON(message: AccessListTx): JsonSafe<AccessListTx> {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
    message.gas !== undefined && (obj.gas = (message.gas || BigInt(0)).toString());
    message.to !== undefined && (obj.to = message.to);
    message.value !== undefined && (obj.value = message.value);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    if (message.accesses) {
      obj.accesses = message.accesses.map((e) => (e ? AccessTuple.toJSON(e) : undefined));
    } else {
      obj.accesses = [];
    }
    message.v !== undefined &&
      (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
    message.r !== undefined &&
      (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
    message.s !== undefined &&
      (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<AccessListTx>, I>>(object: I): AccessListTx {
    const message = createBaseAccessListTx();
    message.chainId = object.chainId ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.gasPrice = object.gasPrice ?? "";
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = BigInt(object.gas.toString());
    }
    message.to = object.to ?? "";
    message.value = object.value ?? "";
    message.data = object.data ?? new Uint8Array();
    message.accesses = object.accesses?.map((e) => AccessTuple.fromPartial(e)) || [];
    message.v = object.v ?? new Uint8Array();
    message.r = object.r ?? new Uint8Array();
    message.s = object.s ?? new Uint8Array();
    return message;
  },
};
function createBaseDynamicFeeTx(): DynamicFeeTx {
  return {
    chainId: "",
    nonce: BigInt(0),
    gasTipCap: "",
    gasFeeCap: "",
    gas: BigInt(0),
    to: "",
    value: "",
    data: new Uint8Array(),
    accesses: [],
    v: new Uint8Array(),
    r: new Uint8Array(),
    s: new Uint8Array(),
  };
}
export const DynamicFeeTx = {
  typeUrl: "/ethermint.evm.v1.DynamicFeeTx",
  encode(message: DynamicFeeTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.gasTipCap !== "") {
      writer.uint32(26).string(message.gasTipCap);
    }
    if (message.gasFeeCap !== "") {
      writer.uint32(34).string(message.gasFeeCap);
    }
    if (message.gas !== BigInt(0)) {
      writer.uint32(40).uint64(message.gas);
    }
    if (message.to !== "") {
      writer.uint32(50).string(message.to);
    }
    if (message.value !== "") {
      writer.uint32(58).string(message.value);
    }
    if (message.data.length !== 0) {
      writer.uint32(66).bytes(message.data);
    }
    for (const v of message.accesses) {
      AccessTuple.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.v.length !== 0) {
      writer.uint32(82).bytes(message.v);
    }
    if (message.r.length !== 0) {
      writer.uint32(90).bytes(message.r);
    }
    if (message.s.length !== 0) {
      writer.uint32(98).bytes(message.s);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DynamicFeeTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDynamicFeeTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        case 3:
          message.gasTipCap = reader.string();
          break;
        case 4:
          message.gasFeeCap = reader.string();
          break;
        case 5:
          message.gas = reader.uint64();
          break;
        case 6:
          message.to = reader.string();
          break;
        case 7:
          message.value = reader.string();
          break;
        case 8:
          message.data = reader.bytes();
          break;
        case 9:
          message.accesses.push(AccessTuple.decode(reader, reader.uint32()));
          break;
        case 10:
          message.v = reader.bytes();
          break;
        case 11:
          message.r = reader.bytes();
          break;
        case 12:
          message.s = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DynamicFeeTx {
    const obj = createBaseDynamicFeeTx();
    if (isSet(object.chainId)) obj.chainId = String(object.chainId);
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (isSet(object.gasTipCap)) obj.gasTipCap = String(object.gasTipCap);
    if (isSet(object.gasFeeCap)) obj.gasFeeCap = String(object.gasFeeCap);
    if (isSet(object.gas)) obj.gas = BigInt(object.gas.toString());
    if (isSet(object.to)) obj.to = String(object.to);
    if (isSet(object.value)) obj.value = String(object.value);
    if (isSet(object.data)) obj.data = bytesFromBase64(object.data);
    if (Array.isArray(object?.accesses))
      obj.accesses = object.accesses.map((e: any) => AccessTuple.fromJSON(e));
    if (isSet(object.v)) obj.v = bytesFromBase64(object.v);
    if (isSet(object.r)) obj.r = bytesFromBase64(object.r);
    if (isSet(object.s)) obj.s = bytesFromBase64(object.s);
    return obj;
  },
  toJSON(message: DynamicFeeTx): JsonSafe<DynamicFeeTx> {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    message.gasTipCap !== undefined && (obj.gasTipCap = message.gasTipCap);
    message.gasFeeCap !== undefined && (obj.gasFeeCap = message.gasFeeCap);
    message.gas !== undefined && (obj.gas = (message.gas || BigInt(0)).toString());
    message.to !== undefined && (obj.to = message.to);
    message.value !== undefined && (obj.value = message.value);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    if (message.accesses) {
      obj.accesses = message.accesses.map((e) => (e ? AccessTuple.toJSON(e) : undefined));
    } else {
      obj.accesses = [];
    }
    message.v !== undefined &&
      (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
    message.r !== undefined &&
      (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
    message.s !== undefined &&
      (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<DynamicFeeTx>, I>>(object: I): DynamicFeeTx {
    const message = createBaseDynamicFeeTx();
    message.chainId = object.chainId ?? "";
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.gasTipCap = object.gasTipCap ?? "";
    message.gasFeeCap = object.gasFeeCap ?? "";
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = BigInt(object.gas.toString());
    }
    message.to = object.to ?? "";
    message.value = object.value ?? "";
    message.data = object.data ?? new Uint8Array();
    message.accesses = object.accesses?.map((e) => AccessTuple.fromPartial(e)) || [];
    message.v = object.v ?? new Uint8Array();
    message.r = object.r ?? new Uint8Array();
    message.s = object.s ?? new Uint8Array();
    return message;
  },
};
function createBaseExtensionOptionsEthereumTx(): ExtensionOptionsEthereumTx {
  return {};
}
export const ExtensionOptionsEthereumTx = {
  typeUrl: "/ethermint.evm.v1.ExtensionOptionsEthereumTx",
  encode(_: ExtensionOptionsEthereumTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExtensionOptionsEthereumTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionOptionsEthereumTx();
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
  fromJSON(_: any): ExtensionOptionsEthereumTx {
    const obj = createBaseExtensionOptionsEthereumTx();
    return obj;
  },
  toJSON(_: ExtensionOptionsEthereumTx): JsonSafe<ExtensionOptionsEthereumTx> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionOptionsEthereumTx>, I>>(_: I): ExtensionOptionsEthereumTx {
    const message = createBaseExtensionOptionsEthereumTx();
    return message;
  },
};
function createBaseMsgEthereumTxResponse(): MsgEthereumTxResponse {
  return {
    hash: "",
    logs: [],
    ret: new Uint8Array(),
    vmError: "",
    gasUsed: BigInt(0),
  };
}
export const MsgEthereumTxResponse = {
  typeUrl: "/ethermint.evm.v1.MsgEthereumTxResponse",
  encode(message: MsgEthereumTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    for (const v of message.logs) {
      Log.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.ret.length !== 0) {
      writer.uint32(26).bytes(message.ret);
    }
    if (message.vmError !== "") {
      writer.uint32(34).string(message.vmError);
    }
    if (message.gasUsed !== BigInt(0)) {
      writer.uint32(40).uint64(message.gasUsed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgEthereumTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEthereumTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.logs.push(Log.decode(reader, reader.uint32()));
          break;
        case 3:
          message.ret = reader.bytes();
          break;
        case 4:
          message.vmError = reader.string();
          break;
        case 5:
          message.gasUsed = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgEthereumTxResponse {
    const obj = createBaseMsgEthereumTxResponse();
    if (isSet(object.hash)) obj.hash = String(object.hash);
    if (Array.isArray(object?.logs)) obj.logs = object.logs.map((e: any) => Log.fromJSON(e));
    if (isSet(object.ret)) obj.ret = bytesFromBase64(object.ret);
    if (isSet(object.vmError)) obj.vmError = String(object.vmError);
    if (isSet(object.gasUsed)) obj.gasUsed = BigInt(object.gasUsed.toString());
    return obj;
  },
  toJSON(message: MsgEthereumTxResponse): JsonSafe<MsgEthereumTxResponse> {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    if (message.logs) {
      obj.logs = message.logs.map((e) => (e ? Log.toJSON(e) : undefined));
    } else {
      obj.logs = [];
    }
    message.ret !== undefined &&
      (obj.ret = base64FromBytes(message.ret !== undefined ? message.ret : new Uint8Array()));
    message.vmError !== undefined && (obj.vmError = message.vmError);
    message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgEthereumTxResponse>, I>>(object: I): MsgEthereumTxResponse {
    const message = createBaseMsgEthereumTxResponse();
    message.hash = object.hash ?? "";
    message.logs = object.logs?.map((e) => Log.fromPartial(e)) || [];
    message.ret = object.ret ?? new Uint8Array();
    message.vmError = object.vmError ?? "";
    if (object.gasUsed !== undefined && object.gasUsed !== null) {
      message.gasUsed = BigInt(object.gasUsed.toString());
    }
    return message;
  },
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({}),
  };
}
export const MsgUpdateParams = {
  typeUrl: "/ethermint.evm.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    const obj = createBaseMsgUpdateParams();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/ethermint.evm.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromJSON(_: any): MsgUpdateParamsResponse {
    const obj = createBaseMsgUpdateParamsResponse();
    return obj;
  },
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};
/** Msg defines the evm Msg service. */
export interface Msg {
  /** EthereumTx defines a method submitting Ethereum transactions. */
  EthereumTx(request: MsgEthereumTx): Promise<MsgEthereumTxResponse>;
  /**
   * UpdateParams defined a governance operation for updating the x/evm module
   * parameters. The authority is hard-coded to the Cosmos SDK x/gov module
   * account
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.EthereumTx = this.EthereumTx.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  EthereumTx(request: MsgEthereumTx): Promise<MsgEthereumTxResponse> {
    const data = MsgEthereumTx.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Msg", "EthereumTx", data);
    return promise.then((data) => MsgEthereumTxResponse.decode(new BinaryReader(data)));
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Msg", "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}
