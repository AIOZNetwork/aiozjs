/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Long } from "../../helpers";
export const protobufPackage = "gravity.v1";
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
  power: Long;
  evmAddress: string;
}
/**
 * Valset is the Ethereum Bridge Multsig Set, each gravity validator also
 * maintains an ETH key to sign messages, these are used to check signatures on
 * ETH because of the significant gas savings
 */

export interface Valset {
  nonce: Long;
  members: BridgeValidator[];
  height: Long;
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
  cosmosBlockHeight: Long;
  evmBlockHeight: Long;
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

  eventNonce: Long;
}

function createBaseEvmChainAddress(): EvmChainAddress {
  return {
    chainName: "",
    evmAddress: "",
  };
}

export const EvmChainAddress = {
  encode(message: EvmChainAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvmChainAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      evmAddress: isSet(object.evmAddress) ? String(object.evmAddress) : "",
    };
  },

  toJSON(message: EvmChainAddress): unknown {
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
  encode(message: DelegateKeys, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegateKeys {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      validator: isSet(object.validator) ? String(object.validator) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
      evmAddresses: Array.isArray(object?.evmAddresses)
        ? object.evmAddresses.map((e: any) => EvmChainAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DelegateKeys): unknown {
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
    power: Long.UZERO,
    evmAddress: "",
  };
}

export const BridgeValidator = {
  encode(message: BridgeValidator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.power.isZero()) {
      writer.uint32(8).uint64(message.power);
    }

    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BridgeValidator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeValidator();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.power = reader.uint64() as Long;
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
    return {
      power: isSet(object.power) ? Long.fromValue(object.power) : Long.UZERO,
      evmAddress: isSet(object.evmAddress) ? String(object.evmAddress) : "",
    };
  },

  toJSON(message: BridgeValidator): unknown {
    const obj: any = {};
    message.power !== undefined && (obj.power = (message.power || Long.UZERO).toString());
    message.evmAddress !== undefined && (obj.evmAddress = message.evmAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BridgeValidator>, I>>(object: I): BridgeValidator {
    const message = createBaseBridgeValidator();
    message.power =
      object.power !== undefined && object.power !== null ? Long.fromValue(object.power) : Long.UZERO;
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};

function createBaseValset(): Valset {
  return {
    nonce: Long.UZERO,
    members: [],
    height: Long.UZERO,
    rewardAmount: "",
    rewardToken: "",
  };
}

export const Valset = {
  encode(message: Valset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }

    for (const v of message.members) {
      BridgeValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }

    if (!message.height.isZero()) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Valset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValset();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64() as Long;
          break;

        case 2:
          message.members.push(BridgeValidator.decode(reader, reader.uint32()));
          break;

        case 3:
          message.height = reader.uint64() as Long;
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
    return {
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => BridgeValidator.fromJSON(e))
        : [],
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      rewardAmount: isSet(object.rewardAmount) ? String(object.rewardAmount) : "",
      rewardToken: isSet(object.rewardToken) ? String(object.rewardToken) : "",
    };
  },

  toJSON(message: Valset): unknown {
    const obj: any = {};
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());

    if (message.members) {
      obj.members = message.members.map((e) => (e ? BridgeValidator.toJSON(e) : undefined));
    } else {
      obj.members = [];
    }

    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.rewardAmount !== undefined && (obj.rewardAmount = message.rewardAmount);
    message.rewardToken !== undefined && (obj.rewardToken = message.rewardToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Valset>, I>>(object: I): Valset {
    const message = createBaseValset();
    message.nonce =
      object.nonce !== undefined && object.nonce !== null ? Long.fromValue(object.nonce) : Long.UZERO;
    message.members = object.members?.map((e) => BridgeValidator.fromPartial(e)) || [];
    message.height =
      object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.rewardAmount = object.rewardAmount ?? "";
    message.rewardToken = object.rewardToken ?? "";
    return message;
  },
};

function createBaseLastObservedEvmBlockHeight(): LastObservedEvmBlockHeight {
  return {
    cosmosBlockHeight: Long.UZERO,
    evmBlockHeight: Long.UZERO,
  };
}

export const LastObservedEvmBlockHeight = {
  encode(message: LastObservedEvmBlockHeight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cosmosBlockHeight.isZero()) {
      writer.uint32(8).uint64(message.cosmosBlockHeight);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(16).uint64(message.evmBlockHeight);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastObservedEvmBlockHeight {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastObservedEvmBlockHeight();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.cosmosBlockHeight = reader.uint64() as Long;
          break;

        case 2:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): LastObservedEvmBlockHeight {
    return {
      cosmosBlockHeight: isSet(object.cosmosBlockHeight)
        ? Long.fromValue(object.cosmosBlockHeight)
        : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
    };
  },

  toJSON(message: LastObservedEvmBlockHeight): unknown {
    const obj: any = {};
    message.cosmosBlockHeight !== undefined &&
      (obj.cosmosBlockHeight = (message.cosmosBlockHeight || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LastObservedEvmBlockHeight>, I>>(
    object: I,
  ): LastObservedEvmBlockHeight {
    const message = createBaseLastObservedEvmBlockHeight();
    message.cosmosBlockHeight =
      object.cosmosBlockHeight !== undefined && object.cosmosBlockHeight !== null
        ? Long.fromValue(object.cosmosBlockHeight)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
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
  encode(message: ERC20ToDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.erc20 !== "") {
      writer.uint32(10).string(message.erc20);
    }

    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ERC20ToDenom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      erc20: isSet(object.erc20) ? String(object.erc20) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: ERC20ToDenom): unknown {
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
    eventNonce: Long.UZERO,
  };
}

export const PendingIbcAutoForward = {
  encode(message: PendingIbcAutoForward, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

    if (!message.eventNonce.isZero()) {
      writer.uint32(40).uint64(message.eventNonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingIbcAutoForward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          message.eventNonce = reader.uint64() as Long;
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): PendingIbcAutoForward {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      foreignReceiver: isSet(object.foreignReceiver) ? String(object.foreignReceiver) : "",
      token: isSet(object.token) ? Coin.fromJSON(object.token) : undefined,
      ibcChannel: isSet(object.ibcChannel) ? String(object.ibcChannel) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
    };
  },

  toJSON(message: PendingIbcAutoForward): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.foreignReceiver !== undefined && (obj.foreignReceiver = message.foreignReceiver);
    message.token !== undefined && (obj.token = message.token ? Coin.toJSON(message.token) : undefined);
    message.ibcChannel !== undefined && (obj.ibcChannel = message.ibcChannel);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PendingIbcAutoForward>, I>>(object: I): PendingIbcAutoForward {
    const message = createBasePendingIbcAutoForward();
    message.sender = object.sender ?? "";
    message.foreignReceiver = object.foreignReceiver ?? "";
    message.token =
      object.token !== undefined && object.token !== null ? Coin.fromPartial(object.token) : undefined;
    message.ibcChannel = object.ibcChannel ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    return message;
  },
};
