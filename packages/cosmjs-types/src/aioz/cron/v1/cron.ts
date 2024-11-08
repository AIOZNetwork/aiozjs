/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, fromJsonTimestamp, fromTimestamp } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.cron.v1";
/** Params holds parameters for the cron module. */
export interface Params {
  enabled: boolean;
}
/** Ids defines an array of cron ids. */
export interface Ids {
  ids: string[];
}
/**
 * BaseEntry defines a base entry type. It contains all the necessary fields
 * for basic entry functionality. Any custom entry type should extend this
 * type for additional functionality.
 */
export interface BaseEntry {
  module: string;
  id: string;
  crontab: string;
  nextTime: Timestamp;
}
function createBaseParams(): Params {
  return {
    enabled: false,
  };
}
export const Params = {
  typeUrl: "/aioz.cron.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Params {
    const obj = createBaseParams();
    if (isSet(object.enabled)) obj.enabled = Boolean(object.enabled);
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.enabled !== undefined && (obj.enabled = message.enabled);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.enabled = object.enabled ?? false;
    return message;
  },
};
function createBaseIds(): Ids {
  return {
    ids: [],
  };
}
export const Ids = {
  typeUrl: "/aioz.cron.v1.Ids",
  encode(message: Ids, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Ids {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Ids {
    const obj = createBaseIds();
    if (Array.isArray(object?.ids)) obj.ids = object.ids.map((e: any) => String(e));
    return obj;
  },
  toJSON(message: Ids): JsonSafe<Ids> {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Ids>, I>>(object: I): Ids {
    const message = createBaseIds();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};
function createBaseBaseEntry(): BaseEntry {
  return {
    module: "",
    id: "",
    crontab: "",
    nextTime: Timestamp.fromPartial({}),
  };
}
export const BaseEntry = {
  typeUrl: "/aioz.cron.v1.BaseEntry",
  encode(message: BaseEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.crontab !== "") {
      writer.uint32(26).string(message.crontab);
    }
    if (message.nextTime !== undefined) {
      Timestamp.encode(message.nextTime, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BaseEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.crontab = reader.string();
          break;
        case 4:
          message.nextTime = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BaseEntry {
    const obj = createBaseBaseEntry();
    if (isSet(object.module)) obj.module = String(object.module);
    if (isSet(object.id)) obj.id = String(object.id);
    if (isSet(object.crontab)) obj.crontab = String(object.crontab);
    if (isSet(object.nextTime)) obj.nextTime = fromJsonTimestamp(object.nextTime);
    return obj;
  },
  toJSON(message: BaseEntry): JsonSafe<BaseEntry> {
    const obj: any = {};
    message.module !== undefined && (obj.module = message.module);
    message.id !== undefined && (obj.id = message.id);
    message.crontab !== undefined && (obj.crontab = message.crontab);
    message.nextTime !== undefined && (obj.nextTime = fromTimestamp(message.nextTime).toISOString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<BaseEntry>, I>>(object: I): BaseEntry {
    const message = createBaseBaseEntry();
    message.module = object.module ?? "";
    message.id = object.id ?? "";
    message.crontab = object.crontab ?? "";
    if (object.nextTime !== undefined && object.nextTime !== null) {
      message.nextTime = Timestamp.fromPartial(object.nextTime);
    }
    return message;
  },
};
