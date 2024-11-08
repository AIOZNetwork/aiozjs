/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.evm.v1";
/** EventEthereumTx defines the event for an Ethereum transaction */
export interface EventEthereumTx {
  /** amount */
  amount: string;
  /** eth_hash is the Ethereum hash of the transaction */
  ethHash: string;
  /** index of the transaction in the block */
  index: string;
  /** gas_used is the amount of gas used by the transaction */
  gasUsed: string;
  /** hash is the Tendermint hash of the transaction */
  hash: string;
  /** recipient of the transaction */
  recipient: string;
  /** eth_tx_failed contains a VM error should it occur */
  ethTxFailed: string;
}
/** EventTxLog defines the event for an Ethereum transaction log */
export interface EventTxLog {
  /** tx_logs is an array of transaction logs */
  txLogs: string[];
}
/** EventMessage */
export interface EventMessage {
  /** module which emits the event */
  module: string;
  /** sender of the message */
  sender: string;
  /** tx_type is the type of the message */
  txType: string;
}
/** EventBlockBloom defines an Ethereum block bloom filter event */
export interface EventBlockBloom {
  /** bloom is the bloom filter of the block */
  bloom: string;
}
function createBaseEventEthereumTx(): EventEthereumTx {
  return {
    amount: "",
    ethHash: "",
    index: "",
    gasUsed: "",
    hash: "",
    recipient: "",
    ethTxFailed: "",
  };
}
export const EventEthereumTx = {
  typeUrl: "/ethermint.evm.v1.EventEthereumTx",
  encode(message: EventEthereumTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== "") {
      writer.uint32(10).string(message.amount);
    }
    if (message.ethHash !== "") {
      writer.uint32(18).string(message.ethHash);
    }
    if (message.index !== "") {
      writer.uint32(26).string(message.index);
    }
    if (message.gasUsed !== "") {
      writer.uint32(34).string(message.gasUsed);
    }
    if (message.hash !== "") {
      writer.uint32(42).string(message.hash);
    }
    if (message.recipient !== "") {
      writer.uint32(50).string(message.recipient);
    }
    if (message.ethTxFailed !== "") {
      writer.uint32(58).string(message.ethTxFailed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventEthereumTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventEthereumTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string();
          break;
        case 2:
          message.ethHash = reader.string();
          break;
        case 3:
          message.index = reader.string();
          break;
        case 4:
          message.gasUsed = reader.string();
          break;
        case 5:
          message.hash = reader.string();
          break;
        case 6:
          message.recipient = reader.string();
          break;
        case 7:
          message.ethTxFailed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventEthereumTx {
    const obj = createBaseEventEthereumTx();
    if (isSet(object.amount)) obj.amount = String(object.amount);
    if (isSet(object.ethHash)) obj.ethHash = String(object.ethHash);
    if (isSet(object.index)) obj.index = String(object.index);
    if (isSet(object.gasUsed)) obj.gasUsed = String(object.gasUsed);
    if (isSet(object.hash)) obj.hash = String(object.hash);
    if (isSet(object.recipient)) obj.recipient = String(object.recipient);
    if (isSet(object.ethTxFailed)) obj.ethTxFailed = String(object.ethTxFailed);
    return obj;
  },
  toJSON(message: EventEthereumTx): JsonSafe<EventEthereumTx> {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.ethHash !== undefined && (obj.ethHash = message.ethHash);
    message.index !== undefined && (obj.index = message.index);
    message.gasUsed !== undefined && (obj.gasUsed = message.gasUsed);
    message.hash !== undefined && (obj.hash = message.hash);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.ethTxFailed !== undefined && (obj.ethTxFailed = message.ethTxFailed);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventEthereumTx>, I>>(object: I): EventEthereumTx {
    const message = createBaseEventEthereumTx();
    message.amount = object.amount ?? "";
    message.ethHash = object.ethHash ?? "";
    message.index = object.index ?? "";
    message.gasUsed = object.gasUsed ?? "";
    message.hash = object.hash ?? "";
    message.recipient = object.recipient ?? "";
    message.ethTxFailed = object.ethTxFailed ?? "";
    return message;
  },
};
function createBaseEventTxLog(): EventTxLog {
  return {
    txLogs: [],
  };
}
export const EventTxLog = {
  typeUrl: "/ethermint.evm.v1.EventTxLog",
  encode(message: EventTxLog, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.txLogs) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventTxLog {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTxLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txLogs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventTxLog {
    const obj = createBaseEventTxLog();
    if (Array.isArray(object?.txLogs)) obj.txLogs = object.txLogs.map((e: any) => String(e));
    return obj;
  },
  toJSON(message: EventTxLog): JsonSafe<EventTxLog> {
    const obj: any = {};
    if (message.txLogs) {
      obj.txLogs = message.txLogs.map((e) => e);
    } else {
      obj.txLogs = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventTxLog>, I>>(object: I): EventTxLog {
    const message = createBaseEventTxLog();
    message.txLogs = object.txLogs?.map((e) => e) || [];
    return message;
  },
};
function createBaseEventMessage(): EventMessage {
  return {
    module: "",
    sender: "",
    txType: "",
  };
}
export const EventMessage = {
  typeUrl: "/ethermint.evm.v1.EventMessage",
  encode(message: EventMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.txType !== "") {
      writer.uint32(26).string(message.txType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.txType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventMessage {
    const obj = createBaseEventMessage();
    if (isSet(object.module)) obj.module = String(object.module);
    if (isSet(object.sender)) obj.sender = String(object.sender);
    if (isSet(object.txType)) obj.txType = String(object.txType);
    return obj;
  },
  toJSON(message: EventMessage): JsonSafe<EventMessage> {
    const obj: any = {};
    message.module !== undefined && (obj.module = message.module);
    message.sender !== undefined && (obj.sender = message.sender);
    message.txType !== undefined && (obj.txType = message.txType);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventMessage>, I>>(object: I): EventMessage {
    const message = createBaseEventMessage();
    message.module = object.module ?? "";
    message.sender = object.sender ?? "";
    message.txType = object.txType ?? "";
    return message;
  },
};
function createBaseEventBlockBloom(): EventBlockBloom {
  return {
    bloom: "",
  };
}
export const EventBlockBloom = {
  typeUrl: "/ethermint.evm.v1.EventBlockBloom",
  encode(message: EventBlockBloom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bloom !== "") {
      writer.uint32(10).string(message.bloom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventBlockBloom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBlockBloom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bloom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventBlockBloom {
    const obj = createBaseEventBlockBloom();
    if (isSet(object.bloom)) obj.bloom = String(object.bloom);
    return obj;
  },
  toJSON(message: EventBlockBloom): JsonSafe<EventBlockBloom> {
    const obj: any = {};
    message.bloom !== undefined && (obj.bloom = message.bloom);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventBlockBloom>, I>>(object: I): EventBlockBloom {
    const message = createBaseEventBlockBloom();
    message.bloom = object.bloom ?? "";
    return message;
  },
};
