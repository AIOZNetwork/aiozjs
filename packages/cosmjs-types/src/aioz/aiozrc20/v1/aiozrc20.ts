/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Metadata } from "../../../cosmos/bank/v1beta1/bank";

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
    default:
      return "UNKNOWN";
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
  /** AIOZRC20 owner address ENUM (0 invalid, 1 ModuleAccount, 2 external address) */
  contractOwner: Owner;
}

/** RegisterCoinProposal is a gov Content type to register a token pair */
export interface RegisterCoinProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** token pair of Cosmos native denom and AIOZRC20 token address */
  metadata?: Metadata;
}

/** RegisterCoinProposal is a gov Content type to register a token pair */
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
   * token identifier can be either the hex contract address of the AIOZRC20 or the
   * Cosmos base denomination
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

const baseTokenPair: object = { aiozrc20Address: "", denom: "", enabled: false, contractOwner: 0 };

export const TokenPair = {
  encode(message: TokenPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenPair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTokenPair } as TokenPair;
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
    const message = { ...baseTokenPair } as TokenPair;
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = String(object.aiozrc20Address);
    } else {
      message.aiozrc20Address = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = false;
    }
    if (object.contractOwner !== undefined && object.contractOwner !== null) {
      message.contractOwner = ownerFromJSON(object.contractOwner);
    } else {
      message.contractOwner = 0;
    }
    return message;
  },

  toJSON(message: TokenPair): unknown {
    const obj: any = {};
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    message.denom !== undefined && (obj.denom = message.denom);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.contractOwner !== undefined && (obj.contractOwner = ownerToJSON(message.contractOwner));
    return obj;
  },

  fromPartial(object: DeepPartial<TokenPair>): TokenPair {
    const message = { ...baseTokenPair } as TokenPair;
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = object.aiozrc20Address;
    } else {
      message.aiozrc20Address = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    } else {
      message.enabled = false;
    }
    if (object.contractOwner !== undefined && object.contractOwner !== null) {
      message.contractOwner = object.contractOwner;
    } else {
      message.contractOwner = 0;
    }
    return message;
  },
};

const baseRegisterCoinProposal: object = { title: "", description: "" };

export const RegisterCoinProposal = {
  encode(message: RegisterCoinProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterCoinProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegisterCoinProposal } as RegisterCoinProposal;
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
    const message = { ...baseRegisterCoinProposal } as RegisterCoinProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: RegisterCoinProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<RegisterCoinProposal>): RegisterCoinProposal {
    const message = { ...baseRegisterCoinProposal } as RegisterCoinProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseRegisterAIOZRC20Proposal: object = { title: "", description: "", aiozrc20Address: "" };

export const RegisterAIOZRC20Proposal = {
  encode(message: RegisterAIOZRC20Proposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterAIOZRC20Proposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegisterAIOZRC20Proposal } as RegisterAIOZRC20Proposal;
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
    const message = { ...baseRegisterAIOZRC20Proposal } as RegisterAIOZRC20Proposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = String(object.aiozrc20Address);
    } else {
      message.aiozrc20Address = "";
    }
    return message;
  },

  toJSON(message: RegisterAIOZRC20Proposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    return obj;
  },

  fromPartial(object: DeepPartial<RegisterAIOZRC20Proposal>): RegisterAIOZRC20Proposal {
    const message = { ...baseRegisterAIOZRC20Proposal } as RegisterAIOZRC20Proposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = object.aiozrc20Address;
    } else {
      message.aiozrc20Address = "";
    }
    return message;
  },
};

const baseToggleTokenPairConversionProposal: object = { title: "", description: "", token: "" };

export const ToggleTokenPairConversionProposal = {
  encode(message: ToggleTokenPairConversionProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ToggleTokenPairConversionProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseToggleTokenPairConversionProposal } as ToggleTokenPairConversionProposal;
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
    const message = { ...baseToggleTokenPairConversionProposal } as ToggleTokenPairConversionProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = "";
    }
    return message;
  },

  toJSON(message: ToggleTokenPairConversionProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial(object: DeepPartial<ToggleTokenPairConversionProposal>): ToggleTokenPairConversionProposal {
    const message = { ...baseToggleTokenPairConversionProposal } as ToggleTokenPairConversionProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = "";
    }
    return message;
  },
};

const baseUpdateTokenPairProposal: object = {
  title: "",
  description: "",
  aiozrc20Address: "",
  newAiozrc20Address: "",
};

export const UpdateTokenPairProposal = {
  encode(message: UpdateTokenPairProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTokenPairProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateTokenPairProposal } as UpdateTokenPairProposal;
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
    const message = { ...baseUpdateTokenPairProposal } as UpdateTokenPairProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = String(object.aiozrc20Address);
    } else {
      message.aiozrc20Address = "";
    }
    if (object.newAiozrc20Address !== undefined && object.newAiozrc20Address !== null) {
      message.newAiozrc20Address = String(object.newAiozrc20Address);
    } else {
      message.newAiozrc20Address = "";
    }
    return message;
  },

  toJSON(message: UpdateTokenPairProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    message.newAiozrc20Address !== undefined && (obj.newAiozrc20Address = message.newAiozrc20Address);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateTokenPairProposal>): UpdateTokenPairProposal {
    const message = { ...baseUpdateTokenPairProposal } as UpdateTokenPairProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.aiozrc20Address !== undefined && object.aiozrc20Address !== null) {
      message.aiozrc20Address = object.aiozrc20Address;
    } else {
      message.aiozrc20Address = "";
    }
    if (object.newAiozrc20Address !== undefined && object.newAiozrc20Address !== null) {
      message.newAiozrc20Address = object.newAiozrc20Address;
    } else {
      message.newAiozrc20Address = "";
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
