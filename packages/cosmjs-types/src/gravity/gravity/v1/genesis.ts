/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Valset, DelegateKeys, ERC20ToDenom, PendingIbcAutoForward } from "./types";
import { MsgValsetConfirm, MsgConfirmBatch, MsgConfirmLogicCall } from "./msgs";
import { OutgoingTxBatch, OutgoingLogicCall, OutgoingTransferTx } from "./batch";
import { Attestation } from "./attestation";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, bytesFromBase64, base64FromBytes, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "gravity.gravity.v1";
/**
 * The slashing fractions for the various gravity related slashing conditions. The first three
 * refer to not submitting a particular message, the third for submitting a different claim
 * for the same EVM chain event
 *
 * unbond_slashing_valsets_window
 *
 * The unbond slashing valsets window is used to determine how many blocks after starting to unbond
 * a validator needs to continue signing blocks. The goal of this paramater is that when a validator leaves
 * the set, if their leaving creates enough change in the validator set to justify an update they will sign
 * a validator set update for the EVM chain bridge that does not include themselves. Allowing us to remove them
 * from the EVM chain bridge and replace them with the new set gracefully.
 *
 * valset_reward
 *
 * These parameters allow for the bridge oracle to resolve a fork on the EVM chain without halting
 * the chain. Once set reset bridge state will roll back events to the nonce provided in reset_bridge_nonce
 * if and only if those events have not yet been observed (executed on the Cosmos chain). This allows for easy
 * handling of cases where for example an EVM chain hardfork has occured and more than 1/3 of the vlaidtor set
 * disagrees with the rest. Normally this would require a chain halt, manual genesis editing and restar to resolve
 * with this feature a governance proposal can be used instead
 *
 * bridge_active
 *
 * This boolean flag can be used by governance to temporarily halt the bridge due to a vulnerability or other issue
 * In this context halting the bridge means prevent the execution of any oracle events from EVM chain and preventing
 * the creation of new batches that may be relayed to EVM chain.
 * This does not prevent the creation of validator sets
 * or slashing for not submitting validator set signatures as either of these might allow key signers to leave the validator
 * set and steal funds on EVM chain without consequence.
 * The practical outcome of this flag being set to 'false' is that deposits from EVM chain will not show up and withdraws from
 * Cosmos will not execute on EVM chain.
 *
 * min_chain_fee_basis_points
 *
 * The minimum SendToEvmChain `chain_fee` amount, in terms of basis points. e.g. 10% fee = 1000, and 0.02% fee = 2
 */
export interface Params {
  gravityId: string;
  /**
   * string contract_source_hash        = 2 [deprecated = true];
   * string bridge_ethereum_address     = 4 [deprecated = true];
   * uint64 bridge_chain_id             = 5 [deprecated = true];
   */
  signedValsetsWindow: bigint;
  signedBatchesWindow: bigint;
  signedLogicCallsWindow: bigint;
  targetBatchTimeout: bigint;
  averageBlockTime: bigint;
  /** uint64 average_ethereum_block_time = 11 [deprecated = true]; */
  slashFractionValset: Uint8Array;
  slashFractionBatch: Uint8Array;
  slashFractionLogicCall: Uint8Array;
  unbondSlashingValsetsWindow: bigint;
  slashFractionBadEvmSignature: Uint8Array;
  valsetReward: Coin;
  /**
   * bool bridge_active = 18 [deprecated = true];
   * addresses on this blacklist are forbidden from depositing or withdrawing
   * from EVM chain to the bridge
   */
  evmChainBlacklist: string[];
  minChainFeeBasisPoints: bigint;
  evmChains: EvmChainParams[];
}
export interface EvmChainParams {
  chainName: string;
  contractSourceHash: string;
  bridgeAddress: string;
  bridgeChainId: bigint;
  averageBlockTime: bigint;
  bridgeActive: boolean;
}
/** GenesisState struct, containing all persistant data required by the Gravity module */
export interface GenesisState {
  params?: Params;
  evmChains: EvmChainData[];
}
/** EvmChainData struct, containing all persistant data per EVM chain required by the Gravity module */
export interface EvmChainData {
  chainName: string;
  gravityNonces: GravityNonces;
  valsets: Valset[];
  valsetConfirms: MsgValsetConfirm[];
  batches: OutgoingTxBatch[];
  batchConfirms: MsgConfirmBatch[];
  logicCalls: OutgoingLogicCall[];
  logicCallConfirms: MsgConfirmLogicCall[];
  attestations: Attestation[];
  delegateKeys: DelegateKeys[];
  erc20ToDenoms: ERC20ToDenom[];
  unbatchedTransfers: OutgoingTransferTx[];
  pendingIbcAutoForwards: PendingIbcAutoForward[];
}
/** GravityCounters contains the many noces and counters required to maintain the bridge state in the genesis */
export interface GravityNonces {
  /** the nonce of the last generated validator set */
  latestValsetNonce: bigint;
  /** the last observed Gravity.sol contract event nonce */
  lastObservedNonce: bigint;
  /** the last valset nonce we have slashed, to prevent double slashing */
  lastSlashedValsetNonce: bigint;
  /**
   * the last batch Cosmos chain block that batch slashing has completed for
   * there is an individual batch nonce for each token type so this removes
   * the need to store them all
   */
  lastSlashedBatchBlock: bigint;
  /** the last cosmos block that logic call slashing has completed for */
  lastSlashedLogicCallBlock: bigint;
  /**
   * the last transaction id from the Gravity TX pool, this prevents ID
   * duplication during chain upgrades
   */
  lastTxPoolId: bigint;
  /**
   * the last batch id from the Gravity batch pool, this prevents ID duplication
   * during chain upgrades
   */
  lastBatchId: bigint;
}
function createBaseParams(): Params {
  return {
    gravityId: "",
    signedValsetsWindow: BigInt(0),
    signedBatchesWindow: BigInt(0),
    signedLogicCallsWindow: BigInt(0),
    targetBatchTimeout: BigInt(0),
    averageBlockTime: BigInt(0),
    slashFractionValset: new Uint8Array(),
    slashFractionBatch: new Uint8Array(),
    slashFractionLogicCall: new Uint8Array(),
    unbondSlashingValsetsWindow: BigInt(0),
    slashFractionBadEvmSignature: new Uint8Array(),
    valsetReward: Coin.fromPartial({}),
    evmChainBlacklist: [],
    minChainFeeBasisPoints: BigInt(0),
    evmChains: [],
  };
}
export const Params = {
  typeUrl: "/gravity.gravity.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gravityId !== "") {
      writer.uint32(10).string(message.gravityId);
    }
    if (message.signedValsetsWindow !== BigInt(0)) {
      writer.uint32(48).uint64(message.signedValsetsWindow);
    }
    if (message.signedBatchesWindow !== BigInt(0)) {
      writer.uint32(56).uint64(message.signedBatchesWindow);
    }
    if (message.signedLogicCallsWindow !== BigInt(0)) {
      writer.uint32(64).uint64(message.signedLogicCallsWindow);
    }
    if (message.targetBatchTimeout !== BigInt(0)) {
      writer.uint32(72).uint64(message.targetBatchTimeout);
    }
    if (message.averageBlockTime !== BigInt(0)) {
      writer.uint32(80).uint64(message.averageBlockTime);
    }
    if (message.slashFractionValset.length !== 0) {
      writer.uint32(98).bytes(message.slashFractionValset);
    }
    if (message.slashFractionBatch.length !== 0) {
      writer.uint32(106).bytes(message.slashFractionBatch);
    }
    if (message.slashFractionLogicCall.length !== 0) {
      writer.uint32(114).bytes(message.slashFractionLogicCall);
    }
    if (message.unbondSlashingValsetsWindow !== BigInt(0)) {
      writer.uint32(120).uint64(message.unbondSlashingValsetsWindow);
    }
    if (message.slashFractionBadEvmSignature.length !== 0) {
      writer.uint32(130).bytes(message.slashFractionBadEvmSignature);
    }
    if (message.valsetReward !== undefined) {
      Coin.encode(message.valsetReward, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.evmChainBlacklist) {
      writer.uint32(154).string(v!);
    }
    if (message.minChainFeeBasisPoints !== BigInt(0)) {
      writer.uint32(160).uint64(message.minChainFeeBasisPoints);
    }
    for (const v of message.evmChains) {
      EvmChainParams.encode(v!, writer.uint32(810).fork()).ldelim();
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
          message.gravityId = reader.string();
          break;
        case 6:
          message.signedValsetsWindow = reader.uint64();
          break;
        case 7:
          message.signedBatchesWindow = reader.uint64();
          break;
        case 8:
          message.signedLogicCallsWindow = reader.uint64();
          break;
        case 9:
          message.targetBatchTimeout = reader.uint64();
          break;
        case 10:
          message.averageBlockTime = reader.uint64();
          break;
        case 12:
          message.slashFractionValset = reader.bytes();
          break;
        case 13:
          message.slashFractionBatch = reader.bytes();
          break;
        case 14:
          message.slashFractionLogicCall = reader.bytes();
          break;
        case 15:
          message.unbondSlashingValsetsWindow = reader.uint64();
          break;
        case 16:
          message.slashFractionBadEvmSignature = reader.bytes();
          break;
        case 17:
          message.valsetReward = Coin.decode(reader, reader.uint32());
          break;
        case 19:
          message.evmChainBlacklist.push(reader.string());
          break;
        case 20:
          message.minChainFeeBasisPoints = reader.uint64();
          break;
        case 101:
          message.evmChains.push(EvmChainParams.decode(reader, reader.uint32()));
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
    if (isSet(object.gravityId)) obj.gravityId = String(object.gravityId);
    if (isSet(object.signedValsetsWindow))
      obj.signedValsetsWindow = BigInt(object.signedValsetsWindow.toString());
    if (isSet(object.signedBatchesWindow))
      obj.signedBatchesWindow = BigInt(object.signedBatchesWindow.toString());
    if (isSet(object.signedLogicCallsWindow))
      obj.signedLogicCallsWindow = BigInt(object.signedLogicCallsWindow.toString());
    if (isSet(object.targetBatchTimeout))
      obj.targetBatchTimeout = BigInt(object.targetBatchTimeout.toString());
    if (isSet(object.averageBlockTime)) obj.averageBlockTime = BigInt(object.averageBlockTime.toString());
    if (isSet(object.slashFractionValset))
      obj.slashFractionValset = bytesFromBase64(object.slashFractionValset);
    if (isSet(object.slashFractionBatch)) obj.slashFractionBatch = bytesFromBase64(object.slashFractionBatch);
    if (isSet(object.slashFractionLogicCall))
      obj.slashFractionLogicCall = bytesFromBase64(object.slashFractionLogicCall);
    if (isSet(object.unbondSlashingValsetsWindow))
      obj.unbondSlashingValsetsWindow = BigInt(object.unbondSlashingValsetsWindow.toString());
    if (isSet(object.slashFractionBadEvmSignature))
      obj.slashFractionBadEvmSignature = bytesFromBase64(object.slashFractionBadEvmSignature);
    if (isSet(object.valsetReward)) obj.valsetReward = Coin.fromJSON(object.valsetReward);
    if (Array.isArray(object?.evmChainBlacklist))
      obj.evmChainBlacklist = object.evmChainBlacklist.map((e: any) => String(e));
    if (isSet(object.minChainFeeBasisPoints))
      obj.minChainFeeBasisPoints = BigInt(object.minChainFeeBasisPoints.toString());
    if (Array.isArray(object?.evmChains))
      obj.evmChains = object.evmChains.map((e: any) => EvmChainParams.fromJSON(e));
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.gravityId !== undefined && (obj.gravityId = message.gravityId);
    message.signedValsetsWindow !== undefined &&
      (obj.signedValsetsWindow = (message.signedValsetsWindow || BigInt(0)).toString());
    message.signedBatchesWindow !== undefined &&
      (obj.signedBatchesWindow = (message.signedBatchesWindow || BigInt(0)).toString());
    message.signedLogicCallsWindow !== undefined &&
      (obj.signedLogicCallsWindow = (message.signedLogicCallsWindow || BigInt(0)).toString());
    message.targetBatchTimeout !== undefined &&
      (obj.targetBatchTimeout = (message.targetBatchTimeout || BigInt(0)).toString());
    message.averageBlockTime !== undefined &&
      (obj.averageBlockTime = (message.averageBlockTime || BigInt(0)).toString());
    message.slashFractionValset !== undefined &&
      (obj.slashFractionValset = base64FromBytes(
        message.slashFractionValset !== undefined ? message.slashFractionValset : new Uint8Array(),
      ));
    message.slashFractionBatch !== undefined &&
      (obj.slashFractionBatch = base64FromBytes(
        message.slashFractionBatch !== undefined ? message.slashFractionBatch : new Uint8Array(),
      ));
    message.slashFractionLogicCall !== undefined &&
      (obj.slashFractionLogicCall = base64FromBytes(
        message.slashFractionLogicCall !== undefined ? message.slashFractionLogicCall : new Uint8Array(),
      ));
    message.unbondSlashingValsetsWindow !== undefined &&
      (obj.unbondSlashingValsetsWindow = (message.unbondSlashingValsetsWindow || BigInt(0)).toString());
    message.slashFractionBadEvmSignature !== undefined &&
      (obj.slashFractionBadEvmSignature = base64FromBytes(
        message.slashFractionBadEvmSignature !== undefined
          ? message.slashFractionBadEvmSignature
          : new Uint8Array(),
      ));
    message.valsetReward !== undefined &&
      (obj.valsetReward = message.valsetReward ? Coin.toJSON(message.valsetReward) : undefined);
    if (message.evmChainBlacklist) {
      obj.evmChainBlacklist = message.evmChainBlacklist.map((e) => e);
    } else {
      obj.evmChainBlacklist = [];
    }
    message.minChainFeeBasisPoints !== undefined &&
      (obj.minChainFeeBasisPoints = (message.minChainFeeBasisPoints || BigInt(0)).toString());
    if (message.evmChains) {
      obj.evmChains = message.evmChains.map((e) => (e ? EvmChainParams.toJSON(e) : undefined));
    } else {
      obj.evmChains = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.gravityId = object.gravityId ?? "";
    if (object.signedValsetsWindow !== undefined && object.signedValsetsWindow !== null) {
      message.signedValsetsWindow = BigInt(object.signedValsetsWindow.toString());
    }
    if (object.signedBatchesWindow !== undefined && object.signedBatchesWindow !== null) {
      message.signedBatchesWindow = BigInt(object.signedBatchesWindow.toString());
    }
    if (object.signedLogicCallsWindow !== undefined && object.signedLogicCallsWindow !== null) {
      message.signedLogicCallsWindow = BigInt(object.signedLogicCallsWindow.toString());
    }
    if (object.targetBatchTimeout !== undefined && object.targetBatchTimeout !== null) {
      message.targetBatchTimeout = BigInt(object.targetBatchTimeout.toString());
    }
    if (object.averageBlockTime !== undefined && object.averageBlockTime !== null) {
      message.averageBlockTime = BigInt(object.averageBlockTime.toString());
    }
    message.slashFractionValset = object.slashFractionValset ?? new Uint8Array();
    message.slashFractionBatch = object.slashFractionBatch ?? new Uint8Array();
    message.slashFractionLogicCall = object.slashFractionLogicCall ?? new Uint8Array();
    if (object.unbondSlashingValsetsWindow !== undefined && object.unbondSlashingValsetsWindow !== null) {
      message.unbondSlashingValsetsWindow = BigInt(object.unbondSlashingValsetsWindow.toString());
    }
    message.slashFractionBadEvmSignature = object.slashFractionBadEvmSignature ?? new Uint8Array();
    if (object.valsetReward !== undefined && object.valsetReward !== null) {
      message.valsetReward = Coin.fromPartial(object.valsetReward);
    }
    message.evmChainBlacklist = object.evmChainBlacklist?.map((e) => e) || [];
    if (object.minChainFeeBasisPoints !== undefined && object.minChainFeeBasisPoints !== null) {
      message.minChainFeeBasisPoints = BigInt(object.minChainFeeBasisPoints.toString());
    }
    message.evmChains = object.evmChains?.map((e) => EvmChainParams.fromPartial(e)) || [];
    return message;
  },
};
function createBaseEvmChainParams(): EvmChainParams {
  return {
    chainName: "",
    contractSourceHash: "",
    bridgeAddress: "",
    bridgeChainId: BigInt(0),
    averageBlockTime: BigInt(0),
    bridgeActive: false,
  };
}
export const EvmChainParams = {
  typeUrl: "/gravity.gravity.v1.EvmChainParams",
  encode(message: EvmChainParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.contractSourceHash !== "") {
      writer.uint32(18).string(message.contractSourceHash);
    }
    if (message.bridgeAddress !== "") {
      writer.uint32(26).string(message.bridgeAddress);
    }
    if (message.bridgeChainId !== BigInt(0)) {
      writer.uint32(32).uint64(message.bridgeChainId);
    }
    if (message.averageBlockTime !== BigInt(0)) {
      writer.uint32(40).uint64(message.averageBlockTime);
    }
    if (message.bridgeActive === true) {
      writer.uint32(48).bool(message.bridgeActive);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EvmChainParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvmChainParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.contractSourceHash = reader.string();
          break;
        case 3:
          message.bridgeAddress = reader.string();
          break;
        case 4:
          message.bridgeChainId = reader.uint64();
          break;
        case 5:
          message.averageBlockTime = reader.uint64();
          break;
        case 6:
          message.bridgeActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EvmChainParams {
    const obj = createBaseEvmChainParams();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.contractSourceHash)) obj.contractSourceHash = String(object.contractSourceHash);
    if (isSet(object.bridgeAddress)) obj.bridgeAddress = String(object.bridgeAddress);
    if (isSet(object.bridgeChainId)) obj.bridgeChainId = BigInt(object.bridgeChainId.toString());
    if (isSet(object.averageBlockTime)) obj.averageBlockTime = BigInt(object.averageBlockTime.toString());
    if (isSet(object.bridgeActive)) obj.bridgeActive = Boolean(object.bridgeActive);
    return obj;
  },
  toJSON(message: EvmChainParams): JsonSafe<EvmChainParams> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.contractSourceHash !== undefined && (obj.contractSourceHash = message.contractSourceHash);
    message.bridgeAddress !== undefined && (obj.bridgeAddress = message.bridgeAddress);
    message.bridgeChainId !== undefined &&
      (obj.bridgeChainId = (message.bridgeChainId || BigInt(0)).toString());
    message.averageBlockTime !== undefined &&
      (obj.averageBlockTime = (message.averageBlockTime || BigInt(0)).toString());
    message.bridgeActive !== undefined && (obj.bridgeActive = message.bridgeActive);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EvmChainParams>, I>>(object: I): EvmChainParams {
    const message = createBaseEvmChainParams();
    message.chainName = object.chainName ?? "";
    message.contractSourceHash = object.contractSourceHash ?? "";
    message.bridgeAddress = object.bridgeAddress ?? "";
    if (object.bridgeChainId !== undefined && object.bridgeChainId !== null) {
      message.bridgeChainId = BigInt(object.bridgeChainId.toString());
    }
    if (object.averageBlockTime !== undefined && object.averageBlockTime !== null) {
      message.averageBlockTime = BigInt(object.averageBlockTime.toString());
    }
    message.bridgeActive = object.bridgeActive ?? false;
    return message;
  },
};
function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    evmChains: [],
  };
}
export const GenesisState = {
  typeUrl: "/gravity.gravity.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.evmChains) {
      EvmChainData.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.evmChains.push(EvmChainData.decode(reader, reader.uint32()));
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
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    if (Array.isArray(object?.evmChains))
      obj.evmChains = object.evmChains.map((e: any) => EvmChainData.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.evmChains) {
      obj.evmChains = message.evmChains.map((e) => (e ? EvmChainData.toJSON(e) : undefined));
    } else {
      obj.evmChains = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    message.evmChains = object.evmChains?.map((e) => EvmChainData.fromPartial(e)) || [];
    return message;
  },
};
function createBaseEvmChainData(): EvmChainData {
  return {
    chainName: "",
    gravityNonces: GravityNonces.fromPartial({}),
    valsets: [],
    valsetConfirms: [],
    batches: [],
    batchConfirms: [],
    logicCalls: [],
    logicCallConfirms: [],
    attestations: [],
    delegateKeys: [],
    erc20ToDenoms: [],
    unbatchedTransfers: [],
    pendingIbcAutoForwards: [],
  };
}
export const EvmChainData = {
  typeUrl: "/gravity.gravity.v1.EvmChainData",
  encode(message: EvmChainData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }
    if (message.gravityNonces !== undefined) {
      GravityNonces.encode(message.gravityNonces, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.valsets) {
      Valset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.valsetConfirms) {
      MsgValsetConfirm.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.batches) {
      OutgoingTxBatch.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.batchConfirms) {
      MsgConfirmBatch.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.logicCalls) {
      OutgoingLogicCall.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.logicCallConfirms) {
      MsgConfirmLogicCall.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.attestations) {
      Attestation.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.delegateKeys) {
      DelegateKeys.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.erc20ToDenoms) {
      ERC20ToDenom.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.unbatchedTransfers) {
      OutgoingTransferTx.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.pendingIbcAutoForwards) {
      PendingIbcAutoForward.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EvmChainData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvmChainData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;
        case 2:
          message.gravityNonces = GravityNonces.decode(reader, reader.uint32());
          break;
        case 3:
          message.valsets.push(Valset.decode(reader, reader.uint32()));
          break;
        case 4:
          message.valsetConfirms.push(MsgValsetConfirm.decode(reader, reader.uint32()));
          break;
        case 5:
          message.batches.push(OutgoingTxBatch.decode(reader, reader.uint32()));
          break;
        case 6:
          message.batchConfirms.push(MsgConfirmBatch.decode(reader, reader.uint32()));
          break;
        case 7:
          message.logicCalls.push(OutgoingLogicCall.decode(reader, reader.uint32()));
          break;
        case 8:
          message.logicCallConfirms.push(MsgConfirmLogicCall.decode(reader, reader.uint32()));
          break;
        case 9:
          message.attestations.push(Attestation.decode(reader, reader.uint32()));
          break;
        case 10:
          message.delegateKeys.push(DelegateKeys.decode(reader, reader.uint32()));
          break;
        case 11:
          message.erc20ToDenoms.push(ERC20ToDenom.decode(reader, reader.uint32()));
          break;
        case 12:
          message.unbatchedTransfers.push(OutgoingTransferTx.decode(reader, reader.uint32()));
          break;
        case 13:
          message.pendingIbcAutoForwards.push(PendingIbcAutoForward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EvmChainData {
    const obj = createBaseEvmChainData();
    if (isSet(object.chainName)) obj.chainName = String(object.chainName);
    if (isSet(object.gravityNonces)) obj.gravityNonces = GravityNonces.fromJSON(object.gravityNonces);
    if (Array.isArray(object?.valsets)) obj.valsets = object.valsets.map((e: any) => Valset.fromJSON(e));
    if (Array.isArray(object?.valsetConfirms))
      obj.valsetConfirms = object.valsetConfirms.map((e: any) => MsgValsetConfirm.fromJSON(e));
    if (Array.isArray(object?.batches))
      obj.batches = object.batches.map((e: any) => OutgoingTxBatch.fromJSON(e));
    if (Array.isArray(object?.batchConfirms))
      obj.batchConfirms = object.batchConfirms.map((e: any) => MsgConfirmBatch.fromJSON(e));
    if (Array.isArray(object?.logicCalls))
      obj.logicCalls = object.logicCalls.map((e: any) => OutgoingLogicCall.fromJSON(e));
    if (Array.isArray(object?.logicCallConfirms))
      obj.logicCallConfirms = object.logicCallConfirms.map((e: any) => MsgConfirmLogicCall.fromJSON(e));
    if (Array.isArray(object?.attestations))
      obj.attestations = object.attestations.map((e: any) => Attestation.fromJSON(e));
    if (Array.isArray(object?.delegateKeys))
      obj.delegateKeys = object.delegateKeys.map((e: any) => DelegateKeys.fromJSON(e));
    if (Array.isArray(object?.erc20ToDenoms))
      obj.erc20ToDenoms = object.erc20ToDenoms.map((e: any) => ERC20ToDenom.fromJSON(e));
    if (Array.isArray(object?.unbatchedTransfers))
      obj.unbatchedTransfers = object.unbatchedTransfers.map((e: any) => OutgoingTransferTx.fromJSON(e));
    if (Array.isArray(object?.pendingIbcAutoForwards))
      obj.pendingIbcAutoForwards = object.pendingIbcAutoForwards.map((e: any) =>
        PendingIbcAutoForward.fromJSON(e),
      );
    return obj;
  },
  toJSON(message: EvmChainData): JsonSafe<EvmChainData> {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.gravityNonces !== undefined &&
      (obj.gravityNonces = message.gravityNonces ? GravityNonces.toJSON(message.gravityNonces) : undefined);
    if (message.valsets) {
      obj.valsets = message.valsets.map((e) => (e ? Valset.toJSON(e) : undefined));
    } else {
      obj.valsets = [];
    }
    if (message.valsetConfirms) {
      obj.valsetConfirms = message.valsetConfirms.map((e) => (e ? MsgValsetConfirm.toJSON(e) : undefined));
    } else {
      obj.valsetConfirms = [];
    }
    if (message.batches) {
      obj.batches = message.batches.map((e) => (e ? OutgoingTxBatch.toJSON(e) : undefined));
    } else {
      obj.batches = [];
    }
    if (message.batchConfirms) {
      obj.batchConfirms = message.batchConfirms.map((e) => (e ? MsgConfirmBatch.toJSON(e) : undefined));
    } else {
      obj.batchConfirms = [];
    }
    if (message.logicCalls) {
      obj.logicCalls = message.logicCalls.map((e) => (e ? OutgoingLogicCall.toJSON(e) : undefined));
    } else {
      obj.logicCalls = [];
    }
    if (message.logicCallConfirms) {
      obj.logicCallConfirms = message.logicCallConfirms.map((e) =>
        e ? MsgConfirmLogicCall.toJSON(e) : undefined,
      );
    } else {
      obj.logicCallConfirms = [];
    }
    if (message.attestations) {
      obj.attestations = message.attestations.map((e) => (e ? Attestation.toJSON(e) : undefined));
    } else {
      obj.attestations = [];
    }
    if (message.delegateKeys) {
      obj.delegateKeys = message.delegateKeys.map((e) => (e ? DelegateKeys.toJSON(e) : undefined));
    } else {
      obj.delegateKeys = [];
    }
    if (message.erc20ToDenoms) {
      obj.erc20ToDenoms = message.erc20ToDenoms.map((e) => (e ? ERC20ToDenom.toJSON(e) : undefined));
    } else {
      obj.erc20ToDenoms = [];
    }
    if (message.unbatchedTransfers) {
      obj.unbatchedTransfers = message.unbatchedTransfers.map((e) =>
        e ? OutgoingTransferTx.toJSON(e) : undefined,
      );
    } else {
      obj.unbatchedTransfers = [];
    }
    if (message.pendingIbcAutoForwards) {
      obj.pendingIbcAutoForwards = message.pendingIbcAutoForwards.map((e) =>
        e ? PendingIbcAutoForward.toJSON(e) : undefined,
      );
    } else {
      obj.pendingIbcAutoForwards = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EvmChainData>, I>>(object: I): EvmChainData {
    const message = createBaseEvmChainData();
    message.chainName = object.chainName ?? "";
    if (object.gravityNonces !== undefined && object.gravityNonces !== null) {
      message.gravityNonces = GravityNonces.fromPartial(object.gravityNonces);
    }
    message.valsets = object.valsets?.map((e) => Valset.fromPartial(e)) || [];
    message.valsetConfirms = object.valsetConfirms?.map((e) => MsgValsetConfirm.fromPartial(e)) || [];
    message.batches = object.batches?.map((e) => OutgoingTxBatch.fromPartial(e)) || [];
    message.batchConfirms = object.batchConfirms?.map((e) => MsgConfirmBatch.fromPartial(e)) || [];
    message.logicCalls = object.logicCalls?.map((e) => OutgoingLogicCall.fromPartial(e)) || [];
    message.logicCallConfirms =
      object.logicCallConfirms?.map((e) => MsgConfirmLogicCall.fromPartial(e)) || [];
    message.attestations = object.attestations?.map((e) => Attestation.fromPartial(e)) || [];
    message.delegateKeys = object.delegateKeys?.map((e) => DelegateKeys.fromPartial(e)) || [];
    message.erc20ToDenoms = object.erc20ToDenoms?.map((e) => ERC20ToDenom.fromPartial(e)) || [];
    message.unbatchedTransfers =
      object.unbatchedTransfers?.map((e) => OutgoingTransferTx.fromPartial(e)) || [];
    message.pendingIbcAutoForwards =
      object.pendingIbcAutoForwards?.map((e) => PendingIbcAutoForward.fromPartial(e)) || [];
    return message;
  },
};
function createBaseGravityNonces(): GravityNonces {
  return {
    latestValsetNonce: BigInt(0),
    lastObservedNonce: BigInt(0),
    lastSlashedValsetNonce: BigInt(0),
    lastSlashedBatchBlock: BigInt(0),
    lastSlashedLogicCallBlock: BigInt(0),
    lastTxPoolId: BigInt(0),
    lastBatchId: BigInt(0),
  };
}
export const GravityNonces = {
  typeUrl: "/gravity.gravity.v1.GravityNonces",
  encode(message: GravityNonces, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.latestValsetNonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.latestValsetNonce);
    }
    if (message.lastObservedNonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.lastObservedNonce);
    }
    if (message.lastSlashedValsetNonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.lastSlashedValsetNonce);
    }
    if (message.lastSlashedBatchBlock !== BigInt(0)) {
      writer.uint32(32).uint64(message.lastSlashedBatchBlock);
    }
    if (message.lastSlashedLogicCallBlock !== BigInt(0)) {
      writer.uint32(40).uint64(message.lastSlashedLogicCallBlock);
    }
    if (message.lastTxPoolId !== BigInt(0)) {
      writer.uint32(48).uint64(message.lastTxPoolId);
    }
    if (message.lastBatchId !== BigInt(0)) {
      writer.uint32(56).uint64(message.lastBatchId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GravityNonces {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGravityNonces();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latestValsetNonce = reader.uint64();
          break;
        case 2:
          message.lastObservedNonce = reader.uint64();
          break;
        case 3:
          message.lastSlashedValsetNonce = reader.uint64();
          break;
        case 4:
          message.lastSlashedBatchBlock = reader.uint64();
          break;
        case 5:
          message.lastSlashedLogicCallBlock = reader.uint64();
          break;
        case 6:
          message.lastTxPoolId = reader.uint64();
          break;
        case 7:
          message.lastBatchId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GravityNonces {
    const obj = createBaseGravityNonces();
    if (isSet(object.latestValsetNonce)) obj.latestValsetNonce = BigInt(object.latestValsetNonce.toString());
    if (isSet(object.lastObservedNonce)) obj.lastObservedNonce = BigInt(object.lastObservedNonce.toString());
    if (isSet(object.lastSlashedValsetNonce))
      obj.lastSlashedValsetNonce = BigInt(object.lastSlashedValsetNonce.toString());
    if (isSet(object.lastSlashedBatchBlock))
      obj.lastSlashedBatchBlock = BigInt(object.lastSlashedBatchBlock.toString());
    if (isSet(object.lastSlashedLogicCallBlock))
      obj.lastSlashedLogicCallBlock = BigInt(object.lastSlashedLogicCallBlock.toString());
    if (isSet(object.lastTxPoolId)) obj.lastTxPoolId = BigInt(object.lastTxPoolId.toString());
    if (isSet(object.lastBatchId)) obj.lastBatchId = BigInt(object.lastBatchId.toString());
    return obj;
  },
  toJSON(message: GravityNonces): JsonSafe<GravityNonces> {
    const obj: any = {};
    message.latestValsetNonce !== undefined &&
      (obj.latestValsetNonce = (message.latestValsetNonce || BigInt(0)).toString());
    message.lastObservedNonce !== undefined &&
      (obj.lastObservedNonce = (message.lastObservedNonce || BigInt(0)).toString());
    message.lastSlashedValsetNonce !== undefined &&
      (obj.lastSlashedValsetNonce = (message.lastSlashedValsetNonce || BigInt(0)).toString());
    message.lastSlashedBatchBlock !== undefined &&
      (obj.lastSlashedBatchBlock = (message.lastSlashedBatchBlock || BigInt(0)).toString());
    message.lastSlashedLogicCallBlock !== undefined &&
      (obj.lastSlashedLogicCallBlock = (message.lastSlashedLogicCallBlock || BigInt(0)).toString());
    message.lastTxPoolId !== undefined && (obj.lastTxPoolId = (message.lastTxPoolId || BigInt(0)).toString());
    message.lastBatchId !== undefined && (obj.lastBatchId = (message.lastBatchId || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GravityNonces>, I>>(object: I): GravityNonces {
    const message = createBaseGravityNonces();
    if (object.latestValsetNonce !== undefined && object.latestValsetNonce !== null) {
      message.latestValsetNonce = BigInt(object.latestValsetNonce.toString());
    }
    if (object.lastObservedNonce !== undefined && object.lastObservedNonce !== null) {
      message.lastObservedNonce = BigInt(object.lastObservedNonce.toString());
    }
    if (object.lastSlashedValsetNonce !== undefined && object.lastSlashedValsetNonce !== null) {
      message.lastSlashedValsetNonce = BigInt(object.lastSlashedValsetNonce.toString());
    }
    if (object.lastSlashedBatchBlock !== undefined && object.lastSlashedBatchBlock !== null) {
      message.lastSlashedBatchBlock = BigInt(object.lastSlashedBatchBlock.toString());
    }
    if (object.lastSlashedLogicCallBlock !== undefined && object.lastSlashedLogicCallBlock !== null) {
      message.lastSlashedLogicCallBlock = BigInt(object.lastSlashedLogicCallBlock.toString());
    }
    if (object.lastTxPoolId !== undefined && object.lastTxPoolId !== null) {
      message.lastTxPoolId = BigInt(object.lastTxPoolId.toString());
    }
    if (object.lastBatchId !== undefined && object.lastBatchId !== null) {
      message.lastBatchId = BigInt(object.lastBatchId.toString());
    }
    return message;
  },
};
