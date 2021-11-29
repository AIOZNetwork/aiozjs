/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "ethermint.feemarket.v1";

/** Params defines the EVM module parameters */
export interface Params {
  /** no base fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  noBaseFee: boolean;
  /**
   * base fee change denominator bounds the amount the base fee can change
   * between blocks.
   */
  baseFeeChangeDenominator: number;
  /**
   * elasticity multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   */
  elasticityMultiplier: number;
  /** initial base fee for EIP-1559 blocks. */
  initialBaseFee: Long;
  /** height at which the base fee calculation is enabled. */
  enableHeight: Long;
}

const baseParams: object = {
  noBaseFee: false,
  baseFeeChangeDenominator: 0,
  elasticityMultiplier: 0,
  initialBaseFee: Long.ZERO,
  enableHeight: Long.ZERO,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.noBaseFee === true) {
      writer.uint32(8).bool(message.noBaseFee);
    }
    if (message.baseFeeChangeDenominator !== 0) {
      writer.uint32(16).uint32(message.baseFeeChangeDenominator);
    }
    if (message.elasticityMultiplier !== 0) {
      writer.uint32(24).uint32(message.elasticityMultiplier);
    }
    if (!message.initialBaseFee.isZero()) {
      writer.uint32(32).int64(message.initialBaseFee);
    }
    if (!message.enableHeight.isZero()) {
      writer.uint32(40).int64(message.enableHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.noBaseFee = reader.bool();
          break;
        case 2:
          message.baseFeeChangeDenominator = reader.uint32();
          break;
        case 3:
          message.elasticityMultiplier = reader.uint32();
          break;
        case 4:
          message.initialBaseFee = reader.int64() as Long;
          break;
        case 5:
          message.enableHeight = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (object.noBaseFee !== undefined && object.noBaseFee !== null) {
      message.noBaseFee = Boolean(object.noBaseFee);
    } else {
      message.noBaseFee = false;
    }
    if (object.baseFeeChangeDenominator !== undefined && object.baseFeeChangeDenominator !== null) {
      message.baseFeeChangeDenominator = Number(object.baseFeeChangeDenominator);
    } else {
      message.baseFeeChangeDenominator = 0;
    }
    if (object.elasticityMultiplier !== undefined && object.elasticityMultiplier !== null) {
      message.elasticityMultiplier = Number(object.elasticityMultiplier);
    } else {
      message.elasticityMultiplier = 0;
    }
    if (object.initialBaseFee !== undefined && object.initialBaseFee !== null) {
      message.initialBaseFee = Long.fromString(object.initialBaseFee);
    } else {
      message.initialBaseFee = Long.ZERO;
    }
    if (object.enableHeight !== undefined && object.enableHeight !== null) {
      message.enableHeight = Long.fromString(object.enableHeight);
    } else {
      message.enableHeight = Long.ZERO;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.noBaseFee !== undefined && (obj.noBaseFee = message.noBaseFee);
    message.baseFeeChangeDenominator !== undefined &&
      (obj.baseFeeChangeDenominator = message.baseFeeChangeDenominator);
    message.elasticityMultiplier !== undefined && (obj.elasticityMultiplier = message.elasticityMultiplier);
    message.initialBaseFee !== undefined &&
      (obj.initialBaseFee = (message.initialBaseFee || Long.ZERO).toString());
    message.enableHeight !== undefined && (obj.enableHeight = (message.enableHeight || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.noBaseFee !== undefined && object.noBaseFee !== null) {
      message.noBaseFee = object.noBaseFee;
    } else {
      message.noBaseFee = false;
    }
    if (object.baseFeeChangeDenominator !== undefined && object.baseFeeChangeDenominator !== null) {
      message.baseFeeChangeDenominator = object.baseFeeChangeDenominator;
    } else {
      message.baseFeeChangeDenominator = 0;
    }
    if (object.elasticityMultiplier !== undefined && object.elasticityMultiplier !== null) {
      message.elasticityMultiplier = object.elasticityMultiplier;
    } else {
      message.elasticityMultiplier = 0;
    }
    if (object.initialBaseFee !== undefined && object.initialBaseFee !== null) {
      message.initialBaseFee = object.initialBaseFee as Long;
    } else {
      message.initialBaseFee = Long.ZERO;
    }
    if (object.enableHeight !== undefined && object.enableHeight !== null) {
      message.enableHeight = object.enableHeight as Long;
    } else {
      message.enableHeight = Long.ZERO;
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
