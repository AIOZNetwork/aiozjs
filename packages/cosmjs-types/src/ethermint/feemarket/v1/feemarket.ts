/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.feemarket.v1";
/** Params defines the EVM module parameters */
export interface Params {
  /** no_base_fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  noBaseFee: boolean;
  /**
   * base_fee_change_denominator bounds the amount the base fee can change
   * between blocks.
   */
  baseFeeChangeDenominator: number;
  /**
   * elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   */
  elasticityMultiplier: number;
  /**
   * enable_height defines at which block height the base fee calculation is
   * enabled.
   */
  enableHeight: bigint;
  /** base_fee for EIP-1559 blocks. */
  baseFee: string;
  /**
   * min_gas_price defines the minimum gas price value for cosmos and eth
   * transactions
   */
  minGasPrice: string;
  /**
   * min_gas_multiplier bounds the minimum gas used to be charged
   * to senders based on gas limit
   */
  minGasMultiplier: string;
}
function createBaseParams(): Params {
  return {
    noBaseFee: false,
    baseFeeChangeDenominator: 0,
    elasticityMultiplier: 0,
    enableHeight: BigInt(0),
    baseFee: "",
    minGasPrice: "",
    minGasMultiplier: "",
  };
}
export const Params = {
  typeUrl: "/ethermint.feemarket.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.noBaseFee === true) {
      writer.uint32(8).bool(message.noBaseFee);
    }
    if (message.baseFeeChangeDenominator !== 0) {
      writer.uint32(16).uint32(message.baseFeeChangeDenominator);
    }
    if (message.elasticityMultiplier !== 0) {
      writer.uint32(24).uint32(message.elasticityMultiplier);
    }
    if (message.enableHeight !== BigInt(0)) {
      writer.uint32(40).int64(message.enableHeight);
    }
    if (message.baseFee !== "") {
      writer.uint32(50).string(message.baseFee);
    }
    if (message.minGasPrice !== "") {
      writer.uint32(58).string(message.minGasPrice);
    }
    if (message.minGasMultiplier !== "") {
      writer.uint32(66).string(message.minGasMultiplier);
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
          message.noBaseFee = reader.bool();
          break;
        case 2:
          message.baseFeeChangeDenominator = reader.uint32();
          break;
        case 3:
          message.elasticityMultiplier = reader.uint32();
          break;
        case 5:
          message.enableHeight = reader.int64();
          break;
        case 6:
          message.baseFee = reader.string();
          break;
        case 7:
          message.minGasPrice = reader.string();
          break;
        case 8:
          message.minGasMultiplier = reader.string();
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
    if (isSet(object.noBaseFee)) obj.noBaseFee = Boolean(object.noBaseFee);
    if (isSet(object.baseFeeChangeDenominator))
      obj.baseFeeChangeDenominator = Number(object.baseFeeChangeDenominator);
    if (isSet(object.elasticityMultiplier)) obj.elasticityMultiplier = Number(object.elasticityMultiplier);
    if (isSet(object.enableHeight)) obj.enableHeight = BigInt(object.enableHeight.toString());
    if (isSet(object.baseFee)) obj.baseFee = String(object.baseFee);
    if (isSet(object.minGasPrice)) obj.minGasPrice = String(object.minGasPrice);
    if (isSet(object.minGasMultiplier)) obj.minGasMultiplier = String(object.minGasMultiplier);
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.noBaseFee !== undefined && (obj.noBaseFee = message.noBaseFee);
    message.baseFeeChangeDenominator !== undefined &&
      (obj.baseFeeChangeDenominator = Math.round(message.baseFeeChangeDenominator));
    message.elasticityMultiplier !== undefined &&
      (obj.elasticityMultiplier = Math.round(message.elasticityMultiplier));
    message.enableHeight !== undefined && (obj.enableHeight = (message.enableHeight || BigInt(0)).toString());
    message.baseFee !== undefined && (obj.baseFee = message.baseFee);
    message.minGasPrice !== undefined && (obj.minGasPrice = message.minGasPrice);
    message.minGasMultiplier !== undefined && (obj.minGasMultiplier = message.minGasMultiplier);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.noBaseFee = object.noBaseFee ?? false;
    message.baseFeeChangeDenominator = object.baseFeeChangeDenominator ?? 0;
    message.elasticityMultiplier = object.elasticityMultiplier ?? 0;
    if (object.enableHeight !== undefined && object.enableHeight !== null) {
      message.enableHeight = BigInt(object.enableHeight.toString());
    }
    message.baseFee = object.baseFee ?? "";
    message.minGasPrice = object.minGasPrice ?? "";
    message.minGasMultiplier = object.minGasMultiplier ?? "";
    return message;
  },
};
