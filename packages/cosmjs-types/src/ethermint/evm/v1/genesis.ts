/* eslint-disable */
import { Params, State } from "./evm";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.evm.v1";
/** GenesisState defines the evm module's genesis state. */
export interface GenesisState {
  /** accounts is an array containing the ethereum genesis accounts. */
  accounts: GenesisAccount[];
  /** params defines all the parameters of the module. */
  params: Params;
}
/**
 * GenesisAccount defines an account to be initialized in the genesis state.
 * Its main difference between with Geth's GenesisAccount is that it uses a
 * custom storage type and that it doesn't contain the private key field.
 */
export interface GenesisAccount {
  /** address defines an ethereum hex formated address of an account */
  address: string;
  /** code defines the hex bytes of the account code. */
  code: string;
  /** storage defines the set of state key values for the account. */
  storage: State[];
}
function createBaseGenesisState(): GenesisState {
  return {
    accounts: [],
    params: Params.fromPartial({}),
  };
}
export const GenesisState = {
  typeUrl: "/ethermint.evm.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      GenesisAccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(GenesisAccount.decode(reader, reader.uint32()));
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
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (Array.isArray(object?.accounts))
      obj.accounts = object.accounts.map((e: any) => GenesisAccount.fromJSON(e));
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map((e) => (e ? GenesisAccount.toJSON(e) : undefined));
    } else {
      obj.accounts = [];
    }
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.accounts = object.accounts?.map((e) => GenesisAccount.fromPartial(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
function createBaseGenesisAccount(): GenesisAccount {
  return {
    address: "",
    code: "",
    storage: [],
  };
}
export const GenesisAccount = {
  typeUrl: "/ethermint.evm.v1.GenesisAccount",
  encode(message: GenesisAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    for (const v of message.storage) {
      State.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.code = reader.string();
          break;
        case 3:
          message.storage.push(State.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisAccount {
    const obj = createBaseGenesisAccount();
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.code)) obj.code = String(object.code);
    if (Array.isArray(object?.storage)) obj.storage = object.storage.map((e: any) => State.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisAccount): JsonSafe<GenesisAccount> {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.code !== undefined && (obj.code = message.code);
    if (message.storage) {
      obj.storage = message.storage.map((e) => (e ? State.toJSON(e) : undefined));
    } else {
      obj.storage = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisAccount>, I>>(object: I): GenesisAccount {
    const message = createBaseGenesisAccount();
    message.address = object.address ?? "";
    message.code = object.code ?? "";
    message.storage = object.storage?.map((e) => State.fromPartial(e)) || [];
    return message;
  },
};
