/* eslint-disable */
import { Params, BurnAccount } from "./burn";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "aioz.burn.v1";
/** GenesisState defines the burn module's genesis state. */

export interface GenesisState {
  /** params defines all the parameters of the module. */
  params?: Params;
  /** burn_accounts defines the list of burn accounts. */

  burnAccounts: BurnAccount[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    burnAccounts: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }

    for (const v of message.burnAccounts) {
      BurnAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
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

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      burnAccounts: Array.isArray(object?.burnAccounts)
        ? object.burnAccounts.map((e: any) => BurnAccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);

    if (message.burnAccounts) {
      obj.burnAccounts = message.burnAccounts.map((e) => (e ? BurnAccount.toJSON(e) : undefined));
    } else {
      obj.burnAccounts = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.burnAccounts = object.burnAccounts?.map((e) => BurnAccount.fromPartial(e)) || [];
    return message;
  },
};
