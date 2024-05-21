/* eslint-disable */
import { Params, BurnAccount } from "./burn";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
export const protobufPackage = "aioz.burn.v1";
/** MsgUpdateParams is the Msg/UpdateParams request type. */

export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/burn parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */

  params?: Params;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */

export interface MsgUpdateParamsResponse {}
/** MsgSetBurnAccount is the Msg/SetBurnAccount request type. */

export interface MsgSetBurnAccount {
  authority: string;
  /** burn_accounts is the list of entries to add or update. */

  burnAccounts: BurnAccount[];
}
/** MsgSetBurnAccountResponse defines the Msg/SetBurnAccount response type. */

export interface MsgSetBurnAccountResponse {}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: undefined,
  };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }

    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgSetBurnAccount(): MsgSetBurnAccount {
  return {
    authority: "",
    burnAccounts: [],
  };
}

export const MsgSetBurnAccount = {
  encode(message: MsgSetBurnAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }

    for (const v of message.burnAccounts) {
      BurnAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBurnAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBurnAccount();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;

        case 2:
          message.burnAccounts.push(BurnAccount.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSetBurnAccount {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      burnAccounts: Array.isArray(object?.burnAccounts)
        ? object.burnAccounts.map((e: any) => BurnAccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSetBurnAccount): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);

    if (message.burnAccounts) {
      obj.burnAccounts = message.burnAccounts.map((e) => (e ? BurnAccount.toJSON(e) : undefined));
    } else {
      obj.burnAccounts = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetBurnAccount>, I>>(object: I): MsgSetBurnAccount {
    const message = createBaseMsgSetBurnAccount();
    message.authority = object.authority ?? "";
    message.burnAccounts = object.burnAccounts?.map((e) => BurnAccount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSetBurnAccountResponse(): MsgSetBurnAccountResponse {
  return {};
}

export const MsgSetBurnAccountResponse = {
  encode(_: MsgSetBurnAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBurnAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBurnAccountResponse();

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

  fromJSON(_: any): MsgSetBurnAccountResponse {
    return {};
  },

  toJSON(_: MsgSetBurnAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetBurnAccountResponse>, I>>(_: I): MsgSetBurnAccountResponse {
    const message = createBaseMsgSetBurnAccountResponse();
    return message;
  },
};
/** Msg defines the burn Msg service. */

export interface Msg {
  /**
   * UpdateParams defines a governance operation for updating the x/burn module parameters.
   * The authority is defined in the keeper.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * SetBurnAccount defines a governance operation for adding or updating burn accounts.
   * The authority is defined in the keeper.
   */

  SetBurnAccount(request: MsgSetBurnAccount): Promise<MsgSetBurnAccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.SetBurnAccount = this.SetBurnAccount.bind(this);
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("aioz.burn.v1.Msg", "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new _m0.Reader(data)));
  }

  SetBurnAccount(request: MsgSetBurnAccount): Promise<MsgSetBurnAccountResponse> {
    const data = MsgSetBurnAccount.encode(request).finish();
    const promise = this.rpc.request("aioz.burn.v1.Msg", "SetBurnAccount", data);
    return promise.then((data) => MsgSetBurnAccountResponse.decode(new _m0.Reader(data)));
  }
}
