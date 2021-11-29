/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { AccessTuple, Log } from "../../../ethermint/evm/v1/evm";

export const protobufPackage = "ethermint.evm.v1";

/** MsgEthereumTx encapsulates an Ethereum transaction as an SDK message. */
export interface MsgEthereumTx {
  /** inner transaction data */
  data?: Any;
  /** encoded storage size of the transaction */
  size: number;
  /** transaction hash in hex format */
  hash: string;
  /**
   * ethereum signer address in hex format. This address value is checked
   * against the address derived from the signature (V, R, S) using the
   * secp256k1 elliptic curve
   */
  from: string;
}

/** LegacyTx is the transaction data of regular Ethereum transactions. */
export interface LegacyTx {
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: Long;
  /** gas price defines the value for each gas unit */
  gasPrice: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: Long;
  /** hex formatted address of the recipient */
  to: string;
  /** value defines the unsigned integer value of the transaction amount. */
  value: string;
  /** input defines the data payload bytes of the transaction. */
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
  /** destination EVM chain ID */
  chainId: string;
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: Long;
  /** gas price defines the value for each gas unit */
  gasPrice: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: Long;
  /** hex formatted address of the recipient */
  to: string;
  /** value defines the unsigned integer value of the transaction amount. */
  value: string;
  /** input defines the data payload bytes of the transaction. */
  data: Uint8Array;
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
  /** destination EVM chain ID */
  chainId: string;
  /** nonce corresponds to the account nonce (transaction sequence). */
  nonce: Long;
  /** gas tip cap defines the max value for the gas tip */
  gasTipCap: string;
  /** gas fee cap defines the max value for the gas fee */
  gasFeeCap: string;
  /** gas defines the gas limit defined for the transaction. */
  gas: Long;
  /** hex formatted address of the recipient */
  to: string;
  /** value defines the the transaction amount. */
  value: string;
  /** input defines the data payload bytes of the transaction. */
  data: Uint8Array;
  accesses: AccessTuple[];
  /** v defines the signature value */
  v: Uint8Array;
  /** r defines the signature value */
  r: Uint8Array;
  /** s define the signature value */
  s: Uint8Array;
}

export interface ExtensionOptionsEthereumTx {}

/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface MsgEthereumTxResponse {
  /**
   * ethereum transaction hash in hex format. This hash differs from the
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
   * returned data from evm function (result or data supplied with revert
   * opcode)
   */
  ret: Uint8Array;
  /** vm error is the error returned by vm execution */
  vmError: string;
  /** gas consumed by the transaction */
  gasUsed: Long;
}

const baseMsgEthereumTx: object = { size: 0, hash: "", from: "" };

export const MsgEthereumTx = {
  encode(message: MsgEthereumTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEthereumTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEthereumTx } as MsgEthereumTx;
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
    const message = { ...baseMsgEthereumTx } as MsgEthereumTx;
    if (object.data !== undefined && object.data !== null) {
      message.data = Any.fromJSON(object.data);
    } else {
      message.data = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash);
    } else {
      message.hash = "";
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    return message;
  },

  toJSON(message: MsgEthereumTx): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    message.size !== undefined && (obj.size = message.size);
    message.hash !== undefined && (obj.hash = message.hash);
    message.from !== undefined && (obj.from = message.from);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEthereumTx>): MsgEthereumTx {
    const message = { ...baseMsgEthereumTx } as MsgEthereumTx;
    if (object.data !== undefined && object.data !== null) {
      message.data = Any.fromPartial(object.data);
    } else {
      message.data = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    } else {
      message.hash = "";
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    return message;
  },
};

const baseLegacyTx: object = { nonce: Long.UZERO, gasPrice: "", gas: Long.UZERO, to: "", value: "" };

export const LegacyTx = {
  encode(message: LegacyTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    if (message.gasPrice !== "") {
      writer.uint32(18).string(message.gasPrice);
    }
    if (!message.gas.isZero()) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLegacyTx } as LegacyTx;
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64() as Long;
          break;
        case 2:
          message.gasPrice = reader.string();
          break;
        case 3:
          message.gas = reader.uint64() as Long;
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
    const message = { ...baseLegacyTx } as LegacyTx;
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Long.fromString(object.nonce);
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasPrice !== undefined && object.gasPrice !== null) {
      message.gasPrice = String(object.gasPrice);
    } else {
      message.gasPrice = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = Long.fromString(object.gas);
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = bytesFromBase64(object.v);
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = bytesFromBase64(object.r);
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = bytesFromBase64(object.s);
    }
    return message;
  },

  toJSON(message: LegacyTx): unknown {
    const obj: any = {};
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
    message.gas !== undefined && (obj.gas = (message.gas || Long.UZERO).toString());
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

  fromPartial(object: DeepPartial<LegacyTx>): LegacyTx {
    const message = { ...baseLegacyTx } as LegacyTx;
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce as Long;
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasPrice !== undefined && object.gasPrice !== null) {
      message.gasPrice = object.gasPrice;
    } else {
      message.gasPrice = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = object.gas as Long;
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = object.v;
    } else {
      message.v = new Uint8Array();
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = object.r;
    } else {
      message.r = new Uint8Array();
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = object.s;
    } else {
      message.s = new Uint8Array();
    }
    return message;
  },
};

const baseAccessListTx: object = {
  chainId: "",
  nonce: Long.UZERO,
  gasPrice: "",
  gas: Long.UZERO,
  to: "",
  value: "",
};

export const AccessListTx = {
  encode(message: AccessListTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (!message.nonce.isZero()) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.gasPrice !== "") {
      writer.uint32(26).string(message.gasPrice);
    }
    if (!message.gas.isZero()) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessListTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccessListTx } as AccessListTx;
    message.accesses = [];
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64() as Long;
          break;
        case 3:
          message.gasPrice = reader.string();
          break;
        case 4:
          message.gas = reader.uint64() as Long;
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
    const message = { ...baseAccessListTx } as AccessListTx;
    message.accesses = [];
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = String(object.chainId);
    } else {
      message.chainId = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Long.fromString(object.nonce);
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasPrice !== undefined && object.gasPrice !== null) {
      message.gasPrice = String(object.gasPrice);
    } else {
      message.gasPrice = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = Long.fromString(object.gas);
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.accesses !== undefined && object.accesses !== null) {
      for (const e of object.accesses) {
        message.accesses.push(AccessTuple.fromJSON(e));
      }
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = bytesFromBase64(object.v);
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = bytesFromBase64(object.r);
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = bytesFromBase64(object.s);
    }
    return message;
  },

  toJSON(message: AccessListTx): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
    message.gas !== undefined && (obj.gas = (message.gas || Long.UZERO).toString());
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

  fromPartial(object: DeepPartial<AccessListTx>): AccessListTx {
    const message = { ...baseAccessListTx } as AccessListTx;
    message.accesses = [];
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = object.chainId;
    } else {
      message.chainId = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce as Long;
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasPrice !== undefined && object.gasPrice !== null) {
      message.gasPrice = object.gasPrice;
    } else {
      message.gasPrice = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = object.gas as Long;
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.accesses !== undefined && object.accesses !== null) {
      for (const e of object.accesses) {
        message.accesses.push(AccessTuple.fromPartial(e));
      }
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = object.v;
    } else {
      message.v = new Uint8Array();
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = object.r;
    } else {
      message.r = new Uint8Array();
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = object.s;
    } else {
      message.s = new Uint8Array();
    }
    return message;
  },
};

const baseDynamicFeeTx: object = {
  chainId: "",
  nonce: Long.UZERO,
  gasTipCap: "",
  gasFeeCap: "",
  gas: Long.UZERO,
  to: "",
  value: "",
};

export const DynamicFeeTx = {
  encode(message: DynamicFeeTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (!message.nonce.isZero()) {
      writer.uint32(16).uint64(message.nonce);
    }
    if (message.gasTipCap !== "") {
      writer.uint32(26).string(message.gasTipCap);
    }
    if (message.gasFeeCap !== "") {
      writer.uint32(34).string(message.gasFeeCap);
    }
    if (!message.gas.isZero()) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DynamicFeeTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDynamicFeeTx } as DynamicFeeTx;
    message.accesses = [];
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.nonce = reader.uint64() as Long;
          break;
        case 3:
          message.gasTipCap = reader.string();
          break;
        case 4:
          message.gasFeeCap = reader.string();
          break;
        case 5:
          message.gas = reader.uint64() as Long;
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
    const message = { ...baseDynamicFeeTx } as DynamicFeeTx;
    message.accesses = [];
    message.data = new Uint8Array();
    message.v = new Uint8Array();
    message.r = new Uint8Array();
    message.s = new Uint8Array();
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = String(object.chainId);
    } else {
      message.chainId = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Long.fromString(object.nonce);
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasTipCap !== undefined && object.gasTipCap !== null) {
      message.gasTipCap = String(object.gasTipCap);
    } else {
      message.gasTipCap = "";
    }
    if (object.gasFeeCap !== undefined && object.gasFeeCap !== null) {
      message.gasFeeCap = String(object.gasFeeCap);
    } else {
      message.gasFeeCap = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = Long.fromString(object.gas);
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to);
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.accesses !== undefined && object.accesses !== null) {
      for (const e of object.accesses) {
        message.accesses.push(AccessTuple.fromJSON(e));
      }
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = bytesFromBase64(object.v);
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = bytesFromBase64(object.r);
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = bytesFromBase64(object.s);
    }
    return message;
  },

  toJSON(message: DynamicFeeTx): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.gasTipCap !== undefined && (obj.gasTipCap = message.gasTipCap);
    message.gasFeeCap !== undefined && (obj.gasFeeCap = message.gasFeeCap);
    message.gas !== undefined && (obj.gas = (message.gas || Long.UZERO).toString());
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

  fromPartial(object: DeepPartial<DynamicFeeTx>): DynamicFeeTx {
    const message = { ...baseDynamicFeeTx } as DynamicFeeTx;
    message.accesses = [];
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = object.chainId;
    } else {
      message.chainId = "";
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce as Long;
    } else {
      message.nonce = Long.UZERO;
    }
    if (object.gasTipCap !== undefined && object.gasTipCap !== null) {
      message.gasTipCap = object.gasTipCap;
    } else {
      message.gasTipCap = "";
    }
    if (object.gasFeeCap !== undefined && object.gasFeeCap !== null) {
      message.gasFeeCap = object.gasFeeCap;
    } else {
      message.gasFeeCap = "";
    }
    if (object.gas !== undefined && object.gas !== null) {
      message.gas = object.gas as Long;
    } else {
      message.gas = Long.UZERO;
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to;
    } else {
      message.to = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.accesses !== undefined && object.accesses !== null) {
      for (const e of object.accesses) {
        message.accesses.push(AccessTuple.fromPartial(e));
      }
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = object.v;
    } else {
      message.v = new Uint8Array();
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = object.r;
    } else {
      message.r = new Uint8Array();
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = object.s;
    } else {
      message.s = new Uint8Array();
    }
    return message;
  },
};

const baseExtensionOptionsEthereumTx: object = {};

export const ExtensionOptionsEthereumTx = {
  encode(_: ExtensionOptionsEthereumTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionOptionsEthereumTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseExtensionOptionsEthereumTx } as ExtensionOptionsEthereumTx;
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
    const message = { ...baseExtensionOptionsEthereumTx } as ExtensionOptionsEthereumTx;
    return message;
  },

  toJSON(_: ExtensionOptionsEthereumTx): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ExtensionOptionsEthereumTx>): ExtensionOptionsEthereumTx {
    const message = { ...baseExtensionOptionsEthereumTx } as ExtensionOptionsEthereumTx;
    return message;
  },
};

const baseMsgEthereumTxResponse: object = { hash: "", vmError: "", gasUsed: Long.UZERO };

export const MsgEthereumTxResponse = {
  encode(message: MsgEthereumTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (!message.gasUsed.isZero()) {
      writer.uint32(40).uint64(message.gasUsed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEthereumTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEthereumTxResponse } as MsgEthereumTxResponse;
    message.logs = [];
    message.ret = new Uint8Array();
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
          message.gasUsed = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEthereumTxResponse {
    const message = { ...baseMsgEthereumTxResponse } as MsgEthereumTxResponse;
    message.logs = [];
    message.ret = new Uint8Array();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash);
    } else {
      message.hash = "";
    }
    if (object.logs !== undefined && object.logs !== null) {
      for (const e of object.logs) {
        message.logs.push(Log.fromJSON(e));
      }
    }
    if (object.ret !== undefined && object.ret !== null) {
      message.ret = bytesFromBase64(object.ret);
    }
    if (object.vmError !== undefined && object.vmError !== null) {
      message.vmError = String(object.vmError);
    } else {
      message.vmError = "";
    }
    if (object.gasUsed !== undefined && object.gasUsed !== null) {
      message.gasUsed = Long.fromString(object.gasUsed);
    } else {
      message.gasUsed = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgEthereumTxResponse): unknown {
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
    message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEthereumTxResponse>): MsgEthereumTxResponse {
    const message = { ...baseMsgEthereumTxResponse } as MsgEthereumTxResponse;
    message.logs = [];
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    } else {
      message.hash = "";
    }
    if (object.logs !== undefined && object.logs !== null) {
      for (const e of object.logs) {
        message.logs.push(Log.fromPartial(e));
      }
    }
    if (object.ret !== undefined && object.ret !== null) {
      message.ret = object.ret;
    } else {
      message.ret = new Uint8Array();
    }
    if (object.vmError !== undefined && object.vmError !== null) {
      message.vmError = object.vmError;
    } else {
      message.vmError = "";
    }
    if (object.gasUsed !== undefined && object.gasUsed !== null) {
      message.gasUsed = object.gasUsed as Long;
    } else {
      message.gasUsed = Long.UZERO;
    }
    return message;
  },
};

/** Msg defines the evm Msg service. */
export interface Msg {
  /** EthereumTx defines a method submitting Ethereum transactions. */
  EthereumTx(request: MsgEthereumTx): Promise<MsgEthereumTxResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.EthereumTx = this.EthereumTx.bind(this);
  }
  EthereumTx(request: MsgEthereumTx): Promise<MsgEthereumTxResponse> {
    const data = MsgEthereumTx.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Msg", "EthereumTx", data);
    return promise.then((data) => MsgEthereumTxResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
