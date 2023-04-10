/* eslint-disable */
import { MsgEthereumTx, MsgEthereumTxResponse } from "../../../ethermint/evm/v1/tx";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.wetx.v1";
export interface MsgWrappedEthereumTx {
  msgEthereumTx?: MsgEthereumTx;
}
export interface MsgWrappedEthereumTxResponse {
  msgEthereumTxResponse?: MsgEthereumTxResponse;
}
/** ExtensionOptionsWrappedEthereumTx is an extension option for ethereum transactions */

export interface ExtensionOptionsWrappedEthereumTx {}

function createBaseMsgWrappedEthereumTx(): MsgWrappedEthereumTx {
  return {
    msgEthereumTx: undefined,
  };
}

export const MsgWrappedEthereumTx = {
  encode(message: MsgWrappedEthereumTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msgEthereumTx !== undefined) {
      MsgEthereumTx.encode(message.msgEthereumTx, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedEthereumTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      msgEthereumTx: isSet(object.msgEthereumTx) ? MsgEthereumTx.fromJSON(object.msgEthereumTx) : undefined,
    };
  },

  toJSON(message: MsgWrappedEthereumTx): unknown {
    const obj: any = {};
    message.msgEthereumTx !== undefined &&
      (obj.msgEthereumTx = message.msgEthereumTx ? MsgEthereumTx.toJSON(message.msgEthereumTx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWrappedEthereumTx>, I>>(object: I): MsgWrappedEthereumTx {
    const message = createBaseMsgWrappedEthereumTx();
    message.msgEthereumTx =
      object.msgEthereumTx !== undefined && object.msgEthereumTx !== null
        ? MsgEthereumTx.fromPartial(object.msgEthereumTx)
        : undefined;
    return message;
  },
};

function createBaseMsgWrappedEthereumTxResponse(): MsgWrappedEthereumTxResponse {
  return {
    msgEthereumTxResponse: undefined,
  };
}

export const MsgWrappedEthereumTxResponse = {
  encode(message: MsgWrappedEthereumTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msgEthereumTxResponse !== undefined) {
      MsgEthereumTxResponse.encode(message.msgEthereumTxResponse, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedEthereumTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      msgEthereumTxResponse: isSet(object.msgEthereumTxResponse)
        ? MsgEthereumTxResponse.fromJSON(object.msgEthereumTxResponse)
        : undefined,
    };
  },

  toJSON(message: MsgWrappedEthereumTxResponse): unknown {
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
    message.msgEthereumTxResponse =
      object.msgEthereumTxResponse !== undefined && object.msgEthereumTxResponse !== null
        ? MsgEthereumTxResponse.fromPartial(object.msgEthereumTxResponse)
        : undefined;
    return message;
  },
};

function createBaseExtensionOptionsWrappedEthereumTx(): ExtensionOptionsWrappedEthereumTx {
  return {};
}

export const ExtensionOptionsWrappedEthereumTx = {
  encode(_: ExtensionOptionsWrappedEthereumTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionOptionsWrappedEthereumTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {};
  },

  toJSON(_: ExtensionOptionsWrappedEthereumTx): unknown {
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
  /** WrappedEthereumTx defines a method submitting Wrapped Ethereum transactions. */
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
    return promise.then((data) => MsgWrappedEthereumTxResponse.decode(new _m0.Reader(data)));
  }
}
