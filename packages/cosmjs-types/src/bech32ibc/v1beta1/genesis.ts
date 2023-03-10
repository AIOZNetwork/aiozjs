/* eslint-disable */
import { HrpIbcRecord } from "./types";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../helpers";
export const protobufPackage = "bech32ibc.bech32ibc.v1beta1";
export interface GenesisState {
  nativeHRP: string;
  hrpIBCRecords: HrpIbcRecord[];
}

function createBaseGenesisState(): GenesisState {
  return {
    nativeHRP: "",
    hrpIBCRecords: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nativeHRP !== "") {
      writer.uint32(10).string(message.nativeHRP);
    }

    for (const v of message.hrpIBCRecords) {
      HrpIbcRecord.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.nativeHRP = reader.string();
          break;

        case 2:
          message.hrpIBCRecords.push(HrpIbcRecord.decode(reader, reader.uint32()));
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
      nativeHRP: isSet(object.nativeHRP) ? String(object.nativeHRP) : "",
      hrpIBCRecords: Array.isArray(object?.hrpIBCRecords)
        ? object.hrpIBCRecords.map((e: any) => HrpIbcRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.nativeHRP !== undefined && (obj.nativeHRP = message.nativeHRP);

    if (message.hrpIBCRecords) {
      obj.hrpIBCRecords = message.hrpIBCRecords.map((e) => (e ? HrpIbcRecord.toJSON(e) : undefined));
    } else {
      obj.hrpIBCRecords = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.nativeHRP = object.nativeHRP ?? "";
    message.hrpIBCRecords = object.hrpIBCRecords?.map((e) => HrpIbcRecord.fromPartial(e)) || [];
    return message;
  },
};
