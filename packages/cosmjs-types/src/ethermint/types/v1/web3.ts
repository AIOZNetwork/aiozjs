/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, bytesFromBase64, base64FromBytes, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.types.v1";
/**
 * ExtensionOptionsWeb3Tx is an extension option that specifies the typed chain
 * id, the fee payer as well as its signature data.
 */
export interface ExtensionOptionsWeb3Tx {
  /**
   * typed_data_chain_id is used only in EIP712 Domain and should match
   * Ethereum network ID in a Web3 provider (e.g. Metamask).
   */
  typedDataChainId: bigint;
  /**
   * fee_payer is an account address for the fee payer. It will be validated
   * during EIP712 signature checking.
   */
  feePayer: string;
  /**
   * fee_payer_sig is a signature data from the fee paying account,
   * allows to perform fee delegation when using EIP712 Domain.
   */
  feePayerSig: Uint8Array;
}
function createBaseExtensionOptionsWeb3Tx(): ExtensionOptionsWeb3Tx {
  return {
    typedDataChainId: BigInt(0),
    feePayer: "",
    feePayerSig: new Uint8Array(),
  };
}
export const ExtensionOptionsWeb3Tx = {
  typeUrl: "/ethermint.types.v1.ExtensionOptionsWeb3Tx",
  encode(message: ExtensionOptionsWeb3Tx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.typedDataChainId !== BigInt(0)) {
      writer.uint32(8).uint64(message.typedDataChainId);
    }
    if (message.feePayer !== "") {
      writer.uint32(18).string(message.feePayer);
    }
    if (message.feePayerSig.length !== 0) {
      writer.uint32(26).bytes(message.feePayerSig);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExtensionOptionsWeb3Tx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionOptionsWeb3Tx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typedDataChainId = reader.uint64();
          break;
        case 2:
          message.feePayer = reader.string();
          break;
        case 3:
          message.feePayerSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ExtensionOptionsWeb3Tx {
    const obj = createBaseExtensionOptionsWeb3Tx();
    if (isSet(object.typedDataChainId)) obj.typedDataChainId = BigInt(object.typedDataChainId.toString());
    if (isSet(object.feePayer)) obj.feePayer = String(object.feePayer);
    if (isSet(object.feePayerSig)) obj.feePayerSig = bytesFromBase64(object.feePayerSig);
    return obj;
  },
  toJSON(message: ExtensionOptionsWeb3Tx): JsonSafe<ExtensionOptionsWeb3Tx> {
    const obj: any = {};
    message.typedDataChainId !== undefined &&
      (obj.typedDataChainId = (message.typedDataChainId || BigInt(0)).toString());
    message.feePayer !== undefined && (obj.feePayer = message.feePayer);
    message.feePayerSig !== undefined &&
      (obj.feePayerSig = base64FromBytes(
        message.feePayerSig !== undefined ? message.feePayerSig : new Uint8Array(),
      ));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionOptionsWeb3Tx>, I>>(object: I): ExtensionOptionsWeb3Tx {
    const message = createBaseExtensionOptionsWeb3Tx();
    if (object.typedDataChainId !== undefined && object.typedDataChainId !== null) {
      message.typedDataChainId = BigInt(object.typedDataChainId.toString());
    }
    message.feePayer = object.feePayer ?? "";
    message.feePayerSig = object.feePayerSig ?? new Uint8Array();
    return message;
  },
};
