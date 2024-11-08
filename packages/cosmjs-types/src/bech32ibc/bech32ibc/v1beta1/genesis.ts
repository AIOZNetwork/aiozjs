/* eslint-disable */
import { HrpIbcRecord } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
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
  typeUrl: "/bech32ibc.bech32ibc.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nativeHRP !== "") {
      writer.uint32(10).string(message.nativeHRP);
    }
    for (const v of message.hrpIBCRecords) {
      HrpIbcRecord.encode(v!, writer.uint32(18).fork()).ldelim();
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
    const obj = createBaseGenesisState();
    if (isSet(object.nativeHRP)) obj.nativeHRP = String(object.nativeHRP);
    if (Array.isArray(object?.hrpIBCRecords))
      obj.hrpIBCRecords = object.hrpIBCRecords.map((e: any) => HrpIbcRecord.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
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
