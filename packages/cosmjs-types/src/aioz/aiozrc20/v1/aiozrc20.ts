/* eslint-disable */
import { Metadata } from "../../../cosmos/bank/v1beta1/bank";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.aiozrc20.v1";
/** Owner enumerates the ownership of an AIOZRC20 contract. */
export enum Owner {
  /** OWNER_UNSPECIFIED - OWNER_UNSPECIFIED defines an invalid/undefined owner. */
  OWNER_UNSPECIFIED = 0,
  /** OWNER_MODULE - OWNER_MODULE aiozrc20 is owned by the aiozrc20 module account. */
  OWNER_MODULE = 1,
  /** OWNER_EXTERNAL - EXTERNAL aiozrc20 is owned by an external account. */
  OWNER_EXTERNAL = 2,
  UNRECOGNIZED = -1,
}
export function ownerFromJSON(object: any): Owner {
  switch (object) {
    case 0:
    case "OWNER_UNSPECIFIED":
      return Owner.OWNER_UNSPECIFIED;
    case 1:
    case "OWNER_MODULE":
      return Owner.OWNER_MODULE;
    case 2:
    case "OWNER_EXTERNAL":
      return Owner.OWNER_EXTERNAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Owner.UNRECOGNIZED;
  }
}
export function ownerToJSON(object: Owner): string {
  switch (object) {
    case Owner.OWNER_UNSPECIFIED:
      return "OWNER_UNSPECIFIED";
    case Owner.OWNER_MODULE:
      return "OWNER_MODULE";
    case Owner.OWNER_EXTERNAL:
      return "OWNER_EXTERNAL";
    case Owner.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * TokenPair defines an instance that records pairing consisting of a Cosmos
 * native Coin and an AIOZRC20 token address.
 */
export interface TokenPair {
  /** address of AIOZRC20 contract token */
  aiozrc20Address: string;
  /** cosmos base denomination to be mapped to */
  denom: string;
  /** shows token mapping enable status */
  enabled: boolean;
  /**
   * AIOZRC20 owner address ENUM (0 invalid, 1 ModuleAccount, 2 external
   * address)
   */
  contractOwner: Owner;
}
/** RegisterCoinProposal is a gov Content type to register a token pair. */
export interface RegisterCoinProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** token pair of Cosmos native denom and AIOZRC20 token address */
  metadata: Metadata;
}
/** RegisterCoinProposal is a gov Content type to register a token pair. */
export interface RegisterAIOZRC20Proposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** contract address of AIOZRC20 token */
  aiozrc20Address: string;
}
/**
 * ToggleTokenPairConversionProposal is a gov Content type to toggle
 * the conversion of a token pair's AIOZRC20.
 */
export interface ToggleTokenPairConversionProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /**
   * token identifier can be either the hex contract address of the AIOZRC20 or
   * the Cosmos base denomination
   */
  token: string;
}
/**
 * UpdateTokenPairProposal is a gov Content type to update a token pair's
 * AIOZRC20 contract address.
 */
export interface UpdateTokenPairProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** contract address of AIOZRC20 token */
  aiozrc20Address: string;
  /** new address of AIOZRC20 token contract */
  newAiozrc20Address: string;
}
/**
 * SetConverterAddressProposal is a gov Content type to set/update the converter
 * address.
 */
export interface SetConverterAddressProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** implementation contract address of the converter, let empty to deploy a default one */
  upgradeAddress: string;
}
function createBaseTokenPair(): TokenPair {
  return {
    aiozrc20Address: "",
    denom: "",
    enabled: false,
    contractOwner: 0,
  };
}
export const TokenPair = {
  typeUrl: "/aioz.aiozrc20.v1.TokenPair",
  encode(message: TokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.aiozrc20Address !== "") {
      writer.uint32(10).string(message.aiozrc20Address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    if (message.contractOwner !== 0) {
      writer.uint32(32).int32(message.contractOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aiozrc20Address = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.enabled = reader.bool();
          break;
        case 4:
          message.contractOwner = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TokenPair {
    const obj = createBaseTokenPair();
    if (isSet(object.aiozrc20Address)) obj.aiozrc20Address = String(object.aiozrc20Address);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    if (isSet(object.enabled)) obj.enabled = Boolean(object.enabled);
    if (isSet(object.contractOwner)) obj.contractOwner = ownerFromJSON(object.contractOwner);
    return obj;
  },
  toJSON(message: TokenPair): JsonSafe<TokenPair> {
    const obj: any = {};
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    message.denom !== undefined && (obj.denom = message.denom);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.contractOwner !== undefined && (obj.contractOwner = ownerToJSON(message.contractOwner));
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<TokenPair>, I>>(object: I): TokenPair {
    const message = createBaseTokenPair();
    message.aiozrc20Address = object.aiozrc20Address ?? "";
    message.denom = object.denom ?? "";
    message.enabled = object.enabled ?? false;
    message.contractOwner = object.contractOwner ?? 0;
    return message;
  },
};
function createBaseRegisterCoinProposal(): RegisterCoinProposal {
  return {
    title: "",
    description: "",
    metadata: Metadata.fromPartial({}),
  };
}
export const RegisterCoinProposal = {
  typeUrl: "/aioz.aiozrc20.v1.RegisterCoinProposal",
  encode(message: RegisterCoinProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RegisterCoinProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterCoinProposal();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterCoinProposal {
    const obj = createBaseRegisterCoinProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.metadata)) obj.metadata = Metadata.fromJSON(object.metadata);
    return obj;
  },
  toJSON(message: RegisterCoinProposal): JsonSafe<RegisterCoinProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<RegisterCoinProposal>, I>>(object: I): RegisterCoinProposal {
    const message = createBaseRegisterCoinProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    }
    return message;
  },
};
function createBaseRegisterAIOZRC20Proposal(): RegisterAIOZRC20Proposal {
  return {
    title: "",
    description: "",
    aiozrc20Address: "",
  };
}
export const RegisterAIOZRC20Proposal = {
  typeUrl: "/aioz.aiozrc20.v1.RegisterAIOZRC20Proposal",
  encode(message: RegisterAIOZRC20Proposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.aiozrc20Address !== "") {
      writer.uint32(26).string(message.aiozrc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RegisterAIOZRC20Proposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterAIOZRC20Proposal();
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
          message.aiozrc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterAIOZRC20Proposal {
    const obj = createBaseRegisterAIOZRC20Proposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.aiozrc20Address)) obj.aiozrc20Address = String(object.aiozrc20Address);
    return obj;
  },
  toJSON(message: RegisterAIOZRC20Proposal): JsonSafe<RegisterAIOZRC20Proposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<RegisterAIOZRC20Proposal>, I>>(
    object: I,
  ): RegisterAIOZRC20Proposal {
    const message = createBaseRegisterAIOZRC20Proposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.aiozrc20Address = object.aiozrc20Address ?? "";
    return message;
  },
};
function createBaseToggleTokenPairConversionProposal(): ToggleTokenPairConversionProposal {
  return {
    title: "",
    description: "",
    token: "",
  };
}
export const ToggleTokenPairConversionProposal = {
  typeUrl: "/aioz.aiozrc20.v1.ToggleTokenPairConversionProposal",
  encode(
    message: ToggleTokenPairConversionProposal,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ToggleTokenPairConversionProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToggleTokenPairConversionProposal();
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
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ToggleTokenPairConversionProposal {
    const obj = createBaseToggleTokenPairConversionProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.token)) obj.token = String(object.token);
    return obj;
  },
  toJSON(message: ToggleTokenPairConversionProposal): JsonSafe<ToggleTokenPairConversionProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ToggleTokenPairConversionProposal>, I>>(
    object: I,
  ): ToggleTokenPairConversionProposal {
    const message = createBaseToggleTokenPairConversionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.token = object.token ?? "";
    return message;
  },
};
function createBaseUpdateTokenPairProposal(): UpdateTokenPairProposal {
  return {
    title: "",
    description: "",
    aiozrc20Address: "",
    newAiozrc20Address: "",
  };
}
export const UpdateTokenPairProposal = {
  typeUrl: "/aioz.aiozrc20.v1.UpdateTokenPairProposal",
  encode(message: UpdateTokenPairProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.aiozrc20Address !== "") {
      writer.uint32(26).string(message.aiozrc20Address);
    }
    if (message.newAiozrc20Address !== "") {
      writer.uint32(34).string(message.newAiozrc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateTokenPairProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTokenPairProposal();
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
          message.aiozrc20Address = reader.string();
          break;
        case 4:
          message.newAiozrc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateTokenPairProposal {
    const obj = createBaseUpdateTokenPairProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.aiozrc20Address)) obj.aiozrc20Address = String(object.aiozrc20Address);
    if (isSet(object.newAiozrc20Address)) obj.newAiozrc20Address = String(object.newAiozrc20Address);
    return obj;
  },
  toJSON(message: UpdateTokenPairProposal): JsonSafe<UpdateTokenPairProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    message.newAiozrc20Address !== undefined && (obj.newAiozrc20Address = message.newAiozrc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<UpdateTokenPairProposal>, I>>(object: I): UpdateTokenPairProposal {
    const message = createBaseUpdateTokenPairProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.aiozrc20Address = object.aiozrc20Address ?? "";
    message.newAiozrc20Address = object.newAiozrc20Address ?? "";
    return message;
  },
};
function createBaseSetConverterAddressProposal(): SetConverterAddressProposal {
  return {
    title: "",
    description: "",
    upgradeAddress: "",
  };
}
export const SetConverterAddressProposal = {
  typeUrl: "/aioz.aiozrc20.v1.SetConverterAddressProposal",
  encode(message: SetConverterAddressProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.upgradeAddress !== "") {
      writer.uint32(26).string(message.upgradeAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SetConverterAddressProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetConverterAddressProposal();
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
          message.upgradeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SetConverterAddressProposal {
    const obj = createBaseSetConverterAddressProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.upgradeAddress)) obj.upgradeAddress = String(object.upgradeAddress);
    return obj;
  },
  toJSON(message: SetConverterAddressProposal): JsonSafe<SetConverterAddressProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.upgradeAddress !== undefined && (obj.upgradeAddress = message.upgradeAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<SetConverterAddressProposal>, I>>(
    object: I,
  ): SetConverterAddressProposal {
    const message = createBaseSetConverterAddressProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.upgradeAddress = object.upgradeAddress ?? "";
    return message;
  },
};
