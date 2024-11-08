/* eslint-disable */
import { MsgEthereumTx, MsgEthereumTxResponse } from "../../../ethermint/evm/v1/tx";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.wetx.v1";
export interface MsgWrappedEthereumTx {
  msgEthereumTx?: MsgEthereumTx;
}
export interface MsgWrappedEthereumTxResponse {
  msgEthereumTxResponse?: MsgEthereumTxResponse;
}
/**
 * ExtensionOptionsWrappedEthereumTx is an extension option for ethereum
 * transactions
 */
export interface ExtensionOptionsWrappedEthereumTx {}
function createBaseMsgWrappedEthereumTx(): MsgWrappedEthereumTx {
  return {
    msgEthereumTx: undefined,
  };
}
export const MsgWrappedEthereumTx = {
  typeUrl: "/aioz.wetx.v1.MsgWrappedEthereumTx",
  encode(message: MsgWrappedEthereumTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.msgEthereumTx !== undefined) {
      MsgEthereumTx.encode(message.msgEthereumTx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWrappedEthereumTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWrappedEthereumTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgEthereumTx = MsgEthereumTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWrappedEthereumTx {
    const obj = createBaseMsgWrappedEthereumTx();
    if (isSet(object.msgEthereumTx)) obj.msgEthereumTx = MsgEthereumTx.fromJSON(object.msgEthereumTx);
    return obj;
  },
  toJSON(message: MsgWrappedEthereumTx): JsonSafe<MsgWrappedEthereumTx> {
    const obj: any = {};
    message.msgEthereumTx !== undefined &&
      (obj.msgEthereumTx = message.msgEthereumTx ? MsgEthereumTx.toJSON(message.msgEthereumTx) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgWrappedEthereumTx>, I>>(object: I): MsgWrappedEthereumTx {
    const message = createBaseMsgWrappedEthereumTx();
    if (object.msgEthereumTx !== undefined && object.msgEthereumTx !== null) {
      message.msgEthereumTx = MsgEthereumTx.fromPartial(object.msgEthereumTx);
    }
    return message;
  },
};
function createBaseMsgWrappedEthereumTxResponse(): MsgWrappedEthereumTxResponse {
  return {
    msgEthereumTxResponse: undefined,
  };
}
export const MsgWrappedEthereumTxResponse = {
  typeUrl: "/aioz.wetx.v1.MsgWrappedEthereumTxResponse",
  encode(message: MsgWrappedEthereumTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.msgEthereumTxResponse !== undefined) {
      MsgEthereumTxResponse.encode(message.msgEthereumTxResponse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWrappedEthereumTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWrappedEthereumTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgEthereumTxResponse = MsgEthereumTxResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWrappedEthereumTxResponse {
    const obj = createBaseMsgWrappedEthereumTxResponse();
    if (isSet(object.msgEthereumTxResponse))
      obj.msgEthereumTxResponse = MsgEthereumTxResponse.fromJSON(object.msgEthereumTxResponse);
    return obj;
  },
  toJSON(message: MsgWrappedEthereumTxResponse): JsonSafe<MsgWrappedEthereumTxResponse> {
    const obj: any = {};
    message.msgEthereumTxResponse !== undefined &&
      (obj.msgEthereumTxResponse = message.msgEthereumTxResponse
        ? MsgEthereumTxResponse.toJSON(message.msgEthereumTxResponse)
        : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgWrappedEthereumTxResponse>, I>>(
    object: I,
  ): MsgWrappedEthereumTxResponse {
    const message = createBaseMsgWrappedEthereumTxResponse();
    if (object.msgEthereumTxResponse !== undefined && object.msgEthereumTxResponse !== null) {
      message.msgEthereumTxResponse = MsgEthereumTxResponse.fromPartial(object.msgEthereumTxResponse);
    }
    return message;
  },
};
function createBaseExtensionOptionsWrappedEthereumTx(): ExtensionOptionsWrappedEthereumTx {
  return {};
}
export const ExtensionOptionsWrappedEthereumTx = {
  typeUrl: "/aioz.wetx.v1.ExtensionOptionsWrappedEthereumTx",
  encode(_: ExtensionOptionsWrappedEthereumTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExtensionOptionsWrappedEthereumTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionOptionsWrappedEthereumTx();
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
  fromJSON(_: any): ExtensionOptionsWrappedEthereumTx {
    const obj = createBaseExtensionOptionsWrappedEthereumTx();
    return obj;
  },
  toJSON(_: ExtensionOptionsWrappedEthereumTx): JsonSafe<ExtensionOptionsWrappedEthereumTx> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionOptionsWrappedEthereumTx>, I>>(
    _: I,
  ): ExtensionOptionsWrappedEthereumTx {
    const message = createBaseExtensionOptionsWrappedEthereumTx();
    return message;
  },
};
/** Msg defines the evm Msg service. */
export interface Msg {
  /**
   * WrappedEthereumTx defines a method submitting Wrapped Ethereum
   * transactions.
   */
  WrappedEthereumTx(request: MsgWrappedEthereumTx): Promise<MsgWrappedEthereumTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.WrappedEthereumTx = this.WrappedEthereumTx.bind(this);
  }
  WrappedEthereumTx(request: MsgWrappedEthereumTx): Promise<MsgWrappedEthereumTxResponse> {
    const data = MsgWrappedEthereumTx.encode(request).finish();
    const promise = this.rpc.request("aioz.wetx.v1.Msg", "WrappedEthereumTx", data);
    return promise.then((data) => MsgWrappedEthereumTxResponse.decode(new BinaryReader(data)));
  }
}
