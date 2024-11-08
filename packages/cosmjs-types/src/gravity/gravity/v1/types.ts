/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "gravity.gravity.v1";
export interface EvmChainAddress {
  chainName: string;
  evmAddress: string;
}
export interface DelegateKeys {
  validator: string;
  orchestrator: string;
  evmAddresses: EvmChainAddress[];
}
/** BridgeValidator represents a validator's ETH address and its power */
export interface BridgeValidator {
  power: bigint;
  evmAddress: string;
}
/**
 * Valset is the Ethereum Bridge Multsig Set, each gravity validator also
 * maintains an ETH key to sign messages, these are used to check signatures on
 * ETH because of the significant gas savings
 */
export interface Valset {
  nonce: bigint;
  members: BridgeValidator[];
  height: bigint;
  rewardAmount: string;
  /** the reward token in it's Ethereum hex address representation */
  rewardToken: string;
}
/**
 * LastObservedEvmBlockHeight stores the last observed
 * Ethereum block height along with the Cosmos block height that
 * it was observed at. These two numbers can be used to project
 * outward and always produce batches with timeouts in the future
 * even if no Ethereum block height has been relayed for a long time
 */
export interface LastObservedEvmBlockHeight {
  cosmosBlockHeight: bigint;
  evmBlockHeight: bigint;
}
/**
 * This records the relationship between an ERC20 token and the denom
 * of the corresponding Cosmos originated asset
 */
export interface ERC20ToDenom {
  erc20: string;
  denom: string;
}
/**
 * PendingIbcAutoForward represents a SendToCosmos transaction with a foreign CosmosReceiver which will be added to the
 * PendingIbcAutoForward queue in attestation_handler and sent over IBC on some submission of a MsgExecuteIbcAutoForwards
 */
export interface PendingIbcAutoForward {
  sender: string;
  /** the destination address. sdk.AccAddress does not preserve foreign prefixes */
  foreignReceiver: string;
  /** the token sent from ethereum to the ibc-enabled chain over `IbcChannel` */
  token?: Coin;
  /** the IBC channel to send `Amount` over via ibc-transfer module */
  ibcChannel: string;
  /** the EventNonce from the MsgSendToCosmosClaim, used for ordering the queue */
  eventNonce: bigint;
}
function createBaseEvmChainAddress(): EvmChainAddress {
  return {
    chainName: "",
    evmAddress: "",
  };
}
export const EvmChainAddress = {
  typeUrl: "/gravity.gravity.v1.EvmChainAddress",
  encode(message: EvmChainAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EvmChainAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvmChainAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.evmAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EvmChainAddress {
    const obj = createBaseEvmChainAddress();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.evmAddress)) obj.evmAddress = String(object.evmAddress);
    return obj;
  },
  toJSON(message: EvmChainAddress): JsonSafe<EvmChainAddress> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.evmAddress !== undefined && (obj.evmAddress = message.evmAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EvmChainAddress>, I>>(object: I): EvmChainAddress {
    const message = createBaseEvmChainAddress();
    message.chainName = object.chainName ?? "";
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};
function createBaseDelegateKeys(): DelegateKeys {
  return {
    validator: "",
    orchestrator: "",
    evmAddresses: [],
  };
}
export const DelegateKeys = {
  typeUrl: "/gravity.gravity.v1.DelegateKeys",
  encode(message: DelegateKeys, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.orchestrator !== "") {
      writer.uint32(18).string(message.orchestrator);
    }
    for (const v of message.evmAddresses) {
      EvmChainAddress.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DelegateKeys {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateKeys();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
          break;
        case 2:
          message.orchestrator = reader.string();
          break;
        case 3:
          message.evmAddresses.push(EvmChainAddress.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DelegateKeys {
    const obj = createBaseDelegateKeys();
    if (isSet(object.validator)) obj.validator = String(object.validator);
    if (isSet(object.orchestrator)) obj.orchestrator = String(object.orchestrator);
    if (Array.isArray(object?.evmAddresses))
      obj.evmAddresses = object.evmAddresses.map((e: any) => EvmChainAddress.fromJSON(e));
    return obj;
  },
  toJSON(message: DelegateKeys): JsonSafe<DelegateKeys> {
    const obj: any = {};
    message.validator !== undefined && (obj.validator = message.validator);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    if (message.evmAddresses) {
      obj.evmAddresses = message.evmAddresses.map((e) => (e ? EvmChainAddress.toJSON(e) : undefined));
    } else {
      obj.evmAddresses = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<DelegateKeys>, I>>(object: I): DelegateKeys {
    const message = createBaseDelegateKeys();
    message.validator = object.validator ?? "";
    message.orchestrator = object.orchestrator ?? "";
    message.evmAddresses = object.evmAddresses?.map((e) => EvmChainAddress.fromPartial(e)) || [];
    return message;
  },
};
function createBaseBridgeValidator(): BridgeValidator {
  return {
    power: BigInt(0),
    evmAddress: "",
  };
}
export const BridgeValidator = {
  typeUrl: "/gravity.gravity.v1.BridgeValidator",
  encode(message: BridgeValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.power !== BigInt(0)) {
      writer.uint32(8).uint64(message.power);
    }
    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BridgeValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.power = reader.uint64();
          break;
        case 2:
          message.evmAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BridgeValidator {
    const obj = createBaseBridgeValidator();
    if (isSet(object.power)) obj.power = BigInt(object.power.toString());
    if (isSet(object.evmAddress)) obj.evmAddress = String(object.evmAddress);
    return obj;
  },
  toJSON(message: BridgeValidator): JsonSafe<BridgeValidator> {
    const obj: any = {};
    message.power !== undefined && (obj.power = (message.power || BigInt(0)).toString());
    message.evmAddress !== undefined && (obj.evmAddress = message.evmAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<BridgeValidator>, I>>(object: I): BridgeValidator {
    const message = createBaseBridgeValidator();
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power.toString());
    }
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};
function createBaseValset(): Valset {
  return {
    nonce: BigInt(0),
    members: [],
    height: BigInt(0),
    rewardAmount: "",
    rewardToken: "",
  };
}
export const Valset = {
  typeUrl: "/gravity.gravity.v1.Valset",
  encode(message: Valset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    for (const v of message.members) {
      BridgeValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.rewardAmount !== "") {
      writer.uint32(34).string(message.rewardAmount);
    }
    if (message.rewardToken !== "") {
      writer.uint32(42).string(message.rewardToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Valset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        case 2:
          message.members.push(BridgeValidator.decode(reader, reader.uint32()));
          break;
        case 3:
          message.height = reader.uint64();
          break;
        case 4:
          message.rewardAmount = reader.string();
          break;
        case 5:
          message.rewardToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Valset {
    const obj = createBaseValset();
    if (isSet(object.nonce)) obj.nonce = BigInt(object.nonce.toString());
    if (Array.isArray(object?.members))
      obj.members = object.members.map((e: any) => BridgeValidator.fromJSON(e));
    if (isSet(object.height)) obj.height = BigInt(object.height.toString());
    if (isSet(object.rewardAmount)) obj.rewardAmount = String(object.rewardAmount);
    if (isSet(object.rewardToken)) obj.rewardToken = String(object.rewardToken);
    return obj;
  },
  toJSON(message: Valset): JsonSafe<Valset> {
    const obj: any = {};
    message.nonce !== undefined && (obj.nonce = (message.nonce || BigInt(0)).toString());
    if (message.members) {
      obj.members = message.members.map((e) => (e ? BridgeValidator.toJSON(e) : undefined));
    } else {
      obj.members = [];
    }
    message.height !== undefined && (obj.height = (message.height || BigInt(0)).toString());
    message.rewardAmount !== undefined && (obj.rewardAmount = message.rewardAmount);
    message.rewardToken !== undefined && (obj.rewardToken = message.rewardToken);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Valset>, I>>(object: I): Valset {
    const message = createBaseValset();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce.toString());
    }
    message.members = object.members?.map((e) => BridgeValidator.fromPartial(e)) || [];
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height.toString());
    }
    message.rewardAmount = object.rewardAmount ?? "";
    message.rewardToken = object.rewardToken ?? "";
    return message;
  },
};
function createBaseLastObservedEvmBlockHeight(): LastObservedEvmBlockHeight {
  return {
    cosmosBlockHeight: BigInt(0),
    evmBlockHeight: BigInt(0),
  };
}
export const LastObservedEvmBlockHeight = {
  typeUrl: "/gravity.gravity.v1.LastObservedEvmBlockHeight",
  encode(message: LastObservedEvmBlockHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cosmosBlockHeight !== BigInt(0)) {
      writer.uint32(8).uint64(message.cosmosBlockHeight);
    }
    if (message.evmBlockHeight !== BigInt(0)) {
      writer.uint32(16).uint64(message.evmBlockHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LastObservedEvmBlockHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastObservedEvmBlockHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cosmosBlockHeight = reader.uint64();
          break;
        case 2:
          message.evmBlockHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LastObservedEvmBlockHeight {
    const obj = createBaseLastObservedEvmBlockHeight();
    if (isSet(object.cosmosBlockHeight)) obj.cosmosBlockHeight = BigInt(object.cosmosBlockHeight.toString());
    if (isSet(object.evmBlockHeight)) obj.evmBlockHeight = BigInt(object.evmBlockHeight.toString());
    return obj;
  },
  toJSON(message: LastObservedEvmBlockHeight): JsonSafe<LastObservedEvmBlockHeight> {
    const obj: any = {};
    message.cosmosBlockHeight !== undefined &&
      (obj.cosmosBlockHeight = (message.cosmosBlockHeight || BigInt(0)).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<LastObservedEvmBlockHeight>, I>>(
    object: I,
  ): LastObservedEvmBlockHeight {
    const message = createBaseLastObservedEvmBlockHeight();
    if (object.cosmosBlockHeight !== undefined && object.cosmosBlockHeight !== null) {
      message.cosmosBlockHeight = BigInt(object.cosmosBlockHeight.toString());
    }
    if (object.evmBlockHeight !== undefined && object.evmBlockHeight !== null) {
      message.evmBlockHeight = BigInt(object.evmBlockHeight.toString());
    }
    return message;
  },
};
function createBaseERC20ToDenom(): ERC20ToDenom {
  return {
    erc20: "",
    denom: "",
  };
}
export const ERC20ToDenom = {
  typeUrl: "/gravity.gravity.v1.ERC20ToDenom",
  encode(message: ERC20ToDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.erc20 !== "") {
      writer.uint32(10).string(message.erc20);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ERC20ToDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseERC20ToDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.erc20 = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ERC20ToDenom {
    const obj = createBaseERC20ToDenom();
    if (isSet(object.erc20)) obj.erc20 = String(object.erc20);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    return obj;
  },
  toJSON(message: ERC20ToDenom): JsonSafe<ERC20ToDenom> {
    const obj: any = {};
    message.erc20 !== undefined && (obj.erc20 = message.erc20);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ERC20ToDenom>, I>>(object: I): ERC20ToDenom {
    const message = createBaseERC20ToDenom();
    message.erc20 = object.erc20 ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};
function createBasePendingIbcAutoForward(): PendingIbcAutoForward {
  return {
    sender: "",
    foreignReceiver: "",
    token: undefined,
    ibcChannel: "",
    eventNonce: BigInt(0),
  };
}
export const PendingIbcAutoForward = {
  typeUrl: "/gravity.gravity.v1.PendingIbcAutoForward",
  encode(message: PendingIbcAutoForward, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.foreignReceiver !== "") {
      writer.uint32(18).string(message.foreignReceiver);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(26).fork()).ldelim();
    }
    if (message.ibcChannel !== "") {
      writer.uint32(34).string(message.ibcChannel);
    }
    if (message.eventNonce !== BigInt(0)) {
      writer.uint32(40).uint64(message.eventNonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PendingIbcAutoForward {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingIbcAutoForward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.foreignReceiver = reader.string();
          break;
        case 3:
          message.token = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.ibcChannel = reader.string();
          break;
        case 5:
          message.eventNonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PendingIbcAutoForward {
    const obj = createBasePendingIbcAutoForward();
    if (isSet(object.sender)) obj.sender = String(object.sender);
    if (isSet(object.foreignReceiver)) obj.foreignReceiver = String(object.foreignReceiver);
    if (isSet(object.token)) obj.token = Coin.fromJSON(object.token);
    if (isSet(object.ibcChannel)) obj.ibcChannel = String(object.ibcChannel);
    if (isSet(object.eventNonce)) obj.eventNonce = BigInt(object.eventNonce.toString());
    return obj;
  },
  toJSON(message: PendingIbcAutoForward): JsonSafe<PendingIbcAutoForward> {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.foreignReceiver !== undefined && (obj.foreignReceiver = message.foreignReceiver);
    message.token !== undefined && (obj.token = message.token ? Coin.toJSON(message.token) : undefined);
    message.ibcChannel !== undefined && (obj.ibcChannel = message.ibcChannel);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<PendingIbcAutoForward>, I>>(object: I): PendingIbcAutoForward {
    const message = createBasePendingIbcAutoForward();
    message.sender = object.sender ?? "";
    message.foreignReceiver = object.foreignReceiver ?? "";
    if (object.token !== undefined && object.token !== null) {
      message.token = Coin.fromPartial(object.token);
    }
    message.ibcChannel = object.ibcChannel ?? "";
    if (object.eventNonce !== undefined && object.eventNonce !== null) {
      message.eventNonce = BigInt(object.eventNonce.toString());
    }
    return message;
  },
};
