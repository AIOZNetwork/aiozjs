/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { JsonSafe } from "../../../json-safe";
import { DeepPartial, Exact, isSet } from "../../../helpers";
export const protobufPackage = "gravity.gravity.v1";
/** IDSet represents a set of IDs */
export interface IDSet {
  ids: bigint[];
}
export interface BatchFees {
  token: string;
  totalFees: string;
  txCount: bigint;
}
export interface EventWithdrawalReceived {
  chainName: string;
  bridgeContract: string;
  bridgeChainId: string;
  outgoingTxId: string;
  nonce: string;
}
export interface EventWithdrawCanceled {
  sender: string;
  chainName: string;
  txId: string;
  bridgeContract: string;
  bridgeChainId: string;
}
function createBaseIDSet(): IDSet {
  return {
    ids: [],
  };
}
export const IDSet = {
  typeUrl: "/gravity.gravity.v1.IDSet",
  encode(message: IDSet, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): IDSet {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(reader.uint64());
            }
          } else {
            message.ids.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IDSet {
    const obj = createBaseIDSet();
    if (Array.isArray(object?.ids)) obj.ids = object.ids.map((e: any) => BigInt(e.toString()));
    return obj;
  },
  toJSON(message: IDSet): JsonSafe<IDSet> {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => (e || BigInt(0)).toString());
    } else {
      obj.ids = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<IDSet>, I>>(object: I): IDSet {
    const message = createBaseIDSet();
    message.ids = object.ids?.map((e) => BigInt(e.toString())) || [];
    return message;
  },
};
function createBaseBatchFees(): BatchFees {
  return {
    token: "",
    totalFees: "",
    txCount: BigInt(0),
  };
}
export const BatchFees = {
  typeUrl: "/gravity.gravity.v1.BatchFees",
  encode(message: BatchFees, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.totalFees !== "") {
      writer.uint32(18).string(message.totalFees);
    }
    if (message.txCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.txCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BatchFees {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.totalFees = reader.string();
          break;
        case 3:
          message.txCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchFees {
    const obj = createBaseBatchFees();
    if (isSet(object.token)) obj.token = String(object.token);
    if (isSet(object.totalFees)) obj.totalFees = String(object.totalFees);
    if (isSet(object.txCount)) obj.txCount = BigInt(object.txCount.toString());
    return obj;
  },
  toJSON(message: BatchFees): JsonSafe<BatchFees> {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.totalFees !== undefined && (obj.totalFees = message.totalFees);
    message.txCount !== undefined && (obj.txCount = (message.txCount || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<BatchFees>, I>>(object: I): BatchFees {
    const message = createBaseBatchFees();
    message.token = object.token ?? "";
    message.totalFees = object.totalFees ?? "";
    if (object.txCount !== undefined && object.txCount !== null) {
      message.txCount = BigInt(object.txCount.toString());
    }
    return message;
  },
};
function createBaseEventWithdrawalReceived(): EventWithdrawalReceived {
  return {
    chainName: "",
    bridgeContract: "",
    bridgeChainId: "",
    outgoingTxId: "",
    nonce: "",
  };
}
export const EventWithdrawalReceived = {
  typeUrl: "/gravity.gravity.v1.EventWithdrawalReceived",
  encode(message: EventWithdrawalReceived, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.bridgeContract !== "") {
      writer.uint32(18).string(message.bridgeContract);
    }
    if (message.bridgeChainId !== "") {
      writer.uint32(26).string(message.bridgeChainId);
    }
    if (message.outgoingTxId !== "") {
      writer.uint32(34).string(message.outgoingTxId);
    }
    if (message.nonce !== "") {
      writer.uint32(42).string(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventWithdrawalReceived {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdrawalReceived();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.bridgeContract = reader.string();
          break;
        case 3:
          message.bridgeChainId = reader.string();
          break;
        case 4:
          message.outgoingTxId = reader.string();
          break;
        case 5:
          message.nonce = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventWithdrawalReceived {
    const obj = createBaseEventWithdrawalReceived();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.bridgeContract)) obj.bridgeContract = String(object.bridgeContract);
    if (isSet(object.bridgeChainId)) obj.bridgeChainId = String(object.bridgeChainId);
    if (isSet(object.outgoingTxId)) obj.outgoingTxId = String(object.outgoingTxId);
    if (isSet(object.nonce)) obj.nonce = String(object.nonce);
    return obj;
  },
  toJSON(message: EventWithdrawalReceived): JsonSafe<EventWithdrawalReceived> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.bridgeContract !== undefined && (obj.bridgeContract = message.bridgeContract);
    message.bridgeChainId !== undefined && (obj.bridgeChainId = message.bridgeChainId);
    message.outgoingTxId !== undefined && (obj.outgoingTxId = message.outgoingTxId);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventWithdrawalReceived>, I>>(object: I): EventWithdrawalReceived {
    const message = createBaseEventWithdrawalReceived();
    message.chainName = object.chainName ?? "";
    message.bridgeContract = object.bridgeContract ?? "";
    message.bridgeChainId = object.bridgeChainId ?? "";
    message.outgoingTxId = object.outgoingTxId ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};
function createBaseEventWithdrawCanceled(): EventWithdrawCanceled {
  return {
    sender: "",
    chainName: "",
    txId: "",
    bridgeContract: "",
    bridgeChainId: "",
  };
}
export const EventWithdrawCanceled = {
  typeUrl: "/gravity.gravity.v1.EventWithdrawCanceled",
  encode(message: EventWithdrawCanceled, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }
    if (message.txId !== "") {
      writer.uint32(26).string(message.txId);
    }
    if (message.bridgeContract !== "") {
      writer.uint32(34).string(message.bridgeContract);
    }
    if (message.bridgeChainId !== "") {
      writer.uint32(42).string(message.bridgeChainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventWithdrawCanceled {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdrawCanceled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.chainName = reader.string();
          break;
        case 3:
          message.txId = reader.string();
          break;
        case 4:
          message.bridgeContract = reader.string();
          break;
        case 5:
          message.bridgeChainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventWithdrawCanceled {
    const obj = createBaseEventWithdrawCanceled();
    if (isSet(object.sender)) obj.sender = String(object.sender);
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.txId)) obj.txId = String(object.txId);
    if (isSet(object.bridgeContract)) obj.bridgeContract = String(object.bridgeContract);
    if (isSet(object.bridgeChainId)) obj.bridgeChainId = String(object.bridgeChainId);
    return obj;
  },
  toJSON(message: EventWithdrawCanceled): JsonSafe<EventWithdrawCanceled> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.txId !== undefined && (obj.txId = message.txId);
    message.bridgeContract !== undefined && (obj.bridgeContract = message.bridgeContract);
    message.bridgeChainId !== undefined && (obj.bridgeChainId = message.bridgeChainId);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventWithdrawCanceled>, I>>(object: I): EventWithdrawCanceled {
    const message = createBaseEventWithdrawCanceled();
    message.sender = object.sender ?? "";
    message.chainName = object.chainName ?? "";
    message.txId = object.txId ?? "";
    message.bridgeContract = object.bridgeContract ?? "";
    message.bridgeChainId = object.bridgeChainId ?? "";
    return message;
  },
};
