/* eslint-disable */
import { Metadata } from "../../../cosmos/bank/v1beta1/bank";
import { EvmChainData, EvmChainParams } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, bytesFromBase64, base64FromBytes } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "gravity.gravity.v1";
/**
 * UnhaltBridgeProposal defines a custom governance proposal useful for restoring
 * the bridge after a oracle disagreement. Once this proposal is passed bridge state will roll back events
 * to the nonce provided in target_nonce if and only if those events have not yet been observed (executed on the Cosmos chain). This allows for easy
 * handling of cases where for example an Ethereum hardfork has occured and more than 1/3 of the vlaidtor set
 * disagrees with the rest. Normally this would require a chain halt, manual genesis editing and restar to resolve
 * with this feature a governance proposal can be used instead
 */
export interface UnhaltBridgeProposal {
  title: string;
  description: string;
  targetChainName: string;
  targetNonce: bigint;
}
/**
 * AirdropProposal defines a custom governance proposal type that allows an airdrop to occur in a decentralized
 * fashion. A list of destination addresses and an amount per airdrop recipient is provided. The funds for this
 * airdrop are removed from the Community Pool, if the community pool does not have sufficient funding to perform
 * the airdrop to all provided recipients nothing will occur
 */
export interface AirdropProposal {
  title: string;
  description: string;
  denom: string;
  recipients: Uint8Array;
  amounts: bigint[];
}
/**
 * IBCMetadataProposal defines a custom governance proposal type that allows governance to set the
 * metadata for an IBC token, this will allow Gravity to deploy an ERC20 representing this token on
 * Ethereum
 * Name: the token name
 * Symbol: the token symbol
 * Description: the token description, not sent to EVM chain at all, only used on Cosmos
 * Display: the token display name (only used on Cosmos to decide ERC20 Decimals)
 * Deicmals: the decimals for the display unit
 * ibc_denom is the denom of the token in question on this chain
 */
export interface IBCMetadataProposal {
  title: string;
  description: string;
  metadata: Metadata;
  ibcDenom: string;
}
/**
 * EvmChainProposal defines a custom governance proposal type that allows governance to set the
 * data and params of an EVM chain, this will allow Gravity to connect with valsets on that EVM chain.
 */
export interface EvmChainProposal {
  title: string;
  description: string;
  chainData: EvmChainData;
  params: EvmChainParams;
  reservedMainToken: string;
}
function createBaseUnhaltBridgeProposal(): UnhaltBridgeProposal {
  return {
    title: "",
    description: "",
    targetChainName: "",
    targetNonce: BigInt(0),
  };
}
export const UnhaltBridgeProposal = {
  typeUrl: "/gravity.gravity.v1.UnhaltBridgeProposal",
  encode(message: UnhaltBridgeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.targetChainName !== "") {
      writer.uint32(26).string(message.targetChainName);
    }
    if (message.targetNonce !== BigInt(0)) {
      writer.uint32(32).uint64(message.targetNonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UnhaltBridgeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnhaltBridgeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.targetChainName = reader.string();
          break;
        case 4:
          message.targetNonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UnhaltBridgeProposal {
    const obj = createBaseUnhaltBridgeProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.targetChainName)) obj.targetChainName = String(object.targetChainName);
    if (isSet(object.targetNonce)) obj.targetNonce = BigInt(object.targetNonce.toString());
    return obj;
  },
  toJSON(message: UnhaltBridgeProposal): JsonSafe<UnhaltBridgeProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.targetChainName !== undefined && (obj.targetChainName = message.targetChainName);
    message.targetNonce !== undefined && (obj.targetNonce = (message.targetNonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<UnhaltBridgeProposal>, I>>(object: I): UnhaltBridgeProposal {
    const message = createBaseUnhaltBridgeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.targetChainName = object.targetChainName ?? "";
    if (object.targetNonce !== undefined && object.targetNonce !== null) {
      message.targetNonce = BigInt(object.targetNonce.toString());
    }
    return message;
  },
};
function createBaseAirdropProposal(): AirdropProposal {
  return {
    title: "",
    description: "",
    denom: "",
    recipients: new Uint8Array(),
    amounts: [],
  };
}
export const AirdropProposal = {
  typeUrl: "/gravity.gravity.v1.AirdropProposal",
  encode(message: AirdropProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.recipients.length !== 0) {
      writer.uint32(34).bytes(message.recipients);
    }
    writer.uint32(42).fork();
    for (const v of message.amounts) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AirdropProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAirdropProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.recipients = reader.bytes();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.amounts.push(reader.uint64());
            }
          } else {
            message.amounts.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AirdropProposal {
    const obj = createBaseAirdropProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.recipients)) obj.recipients = bytesFromBase64(object.recipients);
    if (Array.isArray(object?.amounts)) obj.amounts = object.amounts.map((e: any) => BigInt(e.toString()));
    return obj;
  },
  toJSON(message: AirdropProposal): JsonSafe<AirdropProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.denom !== undefined && (obj.denom = message.denom);
    message.recipients !== undefined &&
      (obj.recipients = base64FromBytes(
        message.recipients !== undefined ? message.recipients : new Uint8Array(),
      ));
    if (message.amounts) {
      obj.amounts = message.amounts.map((e) => (e || BigInt(0)).toString());
    } else {
      obj.amounts = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<AirdropProposal>, I>>(object: I): AirdropProposal {
    const message = createBaseAirdropProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denom = object.denom ?? "";
    message.recipients = object.recipients ?? new Uint8Array();
    message.amounts = object.amounts?.map((e) => BigInt(e.toString())) || [];
    return message;
  },
};
function createBaseIBCMetadataProposal(): IBCMetadataProposal {
  return {
    title: "",
    description: "",
    metadata: Metadata.fromPartial({}),
    ibcDenom: "",
  };
}
export const IBCMetadataProposal = {
  typeUrl: "/gravity.gravity.v1.IBCMetadataProposal",
  encode(message: IBCMetadataProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    if (message.ibcDenom !== "") {
      writer.uint32(34).string(message.ibcDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): IBCMetadataProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIBCMetadataProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 4:
          message.ibcDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IBCMetadataProposal {
    const obj = createBaseIBCMetadataProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.metadata)) obj.metadata = Metadata.fromJSON(object.metadata);
    if (isSet(object.ibcDenom)) obj.ibcDenom = String(object.ibcDenom);
    return obj;
  },
  toJSON(message: IBCMetadataProposal): JsonSafe<IBCMetadataProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    message.ibcDenom !== undefined && (obj.ibcDenom = message.ibcDenom);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<IBCMetadataProposal>, I>>(object: I): IBCMetadataProposal {
    const message = createBaseIBCMetadataProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    }
    message.ibcDenom = object.ibcDenom ?? "";
    return message;
  },
};
function createBaseEvmChainProposal(): EvmChainProposal {
  return {
    title: "",
    description: "",
    chainData: EvmChainData.fromPartial({}),
    params: EvmChainParams.fromPartial({}),
    reservedMainToken: "",
  };
}
export const EvmChainProposal = {
  typeUrl: "/gravity.gravity.v1.EvmChainProposal",
  encode(message: EvmChainProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainData !== undefined) {
      EvmChainData.encode(message.chainData, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      EvmChainParams.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    if (message.reservedMainToken !== "") {
      writer.uint32(42).string(message.reservedMainToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EvmChainProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvmChainProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainData = EvmChainData.decode(reader, reader.uint32());
          break;
        case 4:
          message.params = EvmChainParams.decode(reader, reader.uint32());
          break;
        case 5:
          message.reservedMainToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EvmChainProposal {
    const obj = createBaseEvmChainProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.chainData)) obj.chainData = EvmChainData.fromJSON(object.chainData);
    if (isSet(object.params)) obj.params = EvmChainParams.fromJSON(object.params);
    if (isSet(object.reservedMainToken)) obj.reservedMainToken = String(object.reservedMainToken);
    return obj;
  },
  toJSON(message: EvmChainProposal): JsonSafe<EvmChainProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.chainData !== undefined &&
      (obj.chainData = message.chainData ? EvmChainData.toJSON(message.chainData) : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? EvmChainParams.toJSON(message.params) : undefined);
    message.reservedMainToken !== undefined && (obj.reservedMainToken = message.reservedMainToken);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EvmChainProposal>, I>>(object: I): EvmChainProposal {
    const message = createBaseEvmChainProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    if (object.chainData !== undefined && object.chainData !== null) {
      message.chainData = EvmChainData.fromPartial(object.chainData);
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = EvmChainParams.fromPartial(object.params);
    }
    message.reservedMainToken = object.reservedMainToken ?? "";
    return message;
  },
};
