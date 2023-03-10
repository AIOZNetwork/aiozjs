/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { BridgeValidator } from "./types";
import { Any } from "../../google/protobuf/any";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Long, bytesFromBase64, base64FromBytes, Rpc } from "../../helpers";
export const protobufPackage = "gravity.v1";
/**
 * MsgSetOrchestratorAddress
 * this message allows validators to delegate their voting responsibilities
 * to a given key. This key is then used as an optional authentication method
 * for sigining oracle claims
 * VALIDATOR
 * The validator field is a cosmosvaloper1... string (i.e. sdk.ValAddress)
 * that references a validator in the active set
 * ORCHESTRATOR
 * The orchestrator field is a cosmos1... string  (i.e. sdk.AccAddress) that
 * references the key that is being delegated to
 * ETH_ADDRESS
 * This is a hex encoded 0x Ethereum public key that will be used by this validator
 * on Ethereum
 */

export interface MsgSetOrchestratorAddress {
  validator: string;
  orchestrator: string;
  evmAddresses: EvmChainAddress[];
}
export interface EvmChainAddress {
  chainName: string;
  evmAddress: string;
}
export interface MsgSetOrchestratorAddressResponse {}
/**
 * MsgValsetConfirm
 * this is the message sent by the validators when they wish to submit their
 * signatures over the validator set at a given block height. A validator must
 * first call MsgSetEvmAddress to set their Ethereum address to be used for
 * signing. Then someone (anyone) must make a ValsetRequest, the request is
 * essentially a messaging mechanism to determine which block all validators
 * should submit signatures over. Finally validators sign the validator set,
 * powers, and Ethereum addresses of the entire validator set at the height of a
 * ValsetRequest and submit that signature with this message.
 *
 * If a sufficient number of validators (66% of voting power) (A) have set
 * Ethereum addresses and (B) submit ValsetConfirm messages with their
 * signatures it is then possible for anyone to view these signatures in the
 * chain store and submit them to Ethereum to update the validator set
 * -------------
 */

export interface MsgValsetConfirm {
  chainName: string;
  nonce: Long;
  orchestrator: string;
  evmAddress: string;
  signature: string;
}
export interface MsgValsetConfirmResponse {}
/**
 * MsgSendToEvmChain
 * This is the message that a user calls when they want to bridge an asset
 * it will later be removed when it is included in a batch and successfully
 * submitted tokens are removed from the users balance immediately
 * -------------
 * AMOUNT:
 * the coin to send across the bridge, note the restriction that this is a
 * single coin not a set of coins that is normal in other Cosmos messages
 * FEE:
 * the fee paid for the bridge, distinct from the fee paid to the chain to
 * actually send this message in the first place. So a successful send has
 * two layers of fees for the user
 */

export interface MsgSendToEvmChain {
  sender: string;
  chainName: string;
  evmDest: string;
  amount?: Coin;
  bridgeFee?: Coin;
}
export interface MsgSendToEvmChainResponse {}
/**
 * MsgRequestBatch
 * this is a message anyone can send that requests a batch of transactions to
 * send across the bridge be created for whatever block height this message is
 * included in. This acts as a coordination point, the handler for this message
 * looks at the AddToOutgoingPool tx's in the store and generates a batch, also
 * available in the store tied to this message. The validators then grab this
 * batch, sign it, submit the signatures with a MsgConfirmBatch before a relayer
 * can finally submit the batch
 * -------------
 */

export interface MsgRequestBatch {
  sender: string;
  denom: string;
  chainName: string;
}
export interface MsgRequestBatchResponse {}
/**
 * MsgConfirmBatch
 * When validators observe a MsgRequestBatch they form a batch by ordering
 * transactions currently in the txqueue in order of highest to lowest fee,
 * cutting off when the batch either reaches a hardcoded maximum size (to be
 * decided, probably around 100) or when transactions stop being profitable
 * (TODO determine this without nondeterminism) This message includes the batch
 * as well as an Ethereum signature over this batch by the validator
 * -------------
 */

export interface MsgConfirmBatch {
  chainName: string;
  nonce: Long;
  tokenContract: string;
  evmSigner: string;
  orchestrator: string;
  signature: string;
}
export interface MsgConfirmBatchResponse {}
/**
 * MsgConfirmLogicCall
 * When validators observe a MsgRequestBatch they form a batch by ordering
 * transactions currently in the txqueue in order of highest to lowest fee,
 * cutting off when the batch either reaches a hardcoded maximum size (to be
 * decided, probably around 100) or when transactions stop being profitable
 * (TODO determine this without nondeterminism) This message includes the batch
 * as well as an Ethereum signature over this batch by the validator
 * -------------
 */

export interface MsgConfirmLogicCall {
  chainName: string;
  invalidationId: string;
  invalidationNonce: Long;
  evmSigner: string;
  orchestrator: string;
  signature: string;
}
export interface MsgConfirmLogicCallResponse {}
/**
 * MsgSendToCosmosClaim
 * When more than 66% of the active validator set has
 * claimed to have seen the deposit enter the ethereum blockchain coins are
 * issued to the Cosmos address in question
 * -------------
 */

export interface MsgSendToCosmosClaim {
  chainName: string;
  eventNonce: Long;
  evmBlockHeight: Long;
  tokenContract: string;
  amount: string;
  evmSender: string;
  cosmosReceiver: string;
  orchestrator: string;
}
export interface MsgSendToCosmosClaimResponse {}
/**
 * MsgSendFromEvmChainToEvmChainClaim
 * When more than 66% of the active validator set has
 * claimed to have seen the deposit enter the ethereum blockchain coins are
 * issued to the Cosmos address in question
 * -------------
 */

export interface MsgSendFromEvmChainToEvmChainClaim {
  chainName: string;
  eventNonce: Long;
  evmBlockHeight: Long;
  tokenContract: string;
  amount: string;
  evmSender: string;
  toChainName: string;
  receiver: string;
  bridgeFee: string;
  orchestrator: string;
}
export interface MsgSendFromEvmChainToEvmChainClaimResponse {}
/**
 * MsgExecuteIbcAutoForwards
 * Prompts the forwarding of Pending IBC Auto-Forwards in the queue
 * The Pending forwards will be executed in order of their original SendToCosmos.EventNonce
 * The funds in the queue will be sent to a local gravity-prefixed address if IBC transfer is not possible
 */

export interface MsgExecuteIbcAutoForwards {
  /** How many queued forwards to clear, be careful about gas limits */
  forwardsToClear: Long;
  /** This message's sender */

  executor: string;
}
export interface MsgExecuteIbcAutoForwardsResponse {}
/**
 * BatchSendToEvmChainClaim claims that a batch of send to EVM chain
 * operations on the bridge contract was executed.
 */

export interface MsgBatchSendToEvmChainClaim {
  chainName: string;
  eventNonce: Long;
  evmBlockHeight: Long;
  batchNonce: Long;
  tokenContract: string;
  orchestrator: string;
}
export interface MsgBatchSendToEvmChainClaimResponse {}
/**
 * ERC20DeployedClaim allows the Cosmos module
 * to learn about an ERC20 that someone deployed
 * to represent a Cosmos asset
 */

export interface MsgERC20DeployedClaim {
  chainName: string;
  eventNonce: Long;
  evmBlockHeight: Long;
  cosmosDenom: string;
  tokenContract: string;
  name: string;
  symbol: string;
  decimals: Long;
  orchestrator: string;
}
export interface MsgERC20DeployedClaimResponse {}
/**
 * This informs the Cosmos module that a logic
 * call has been executed
 */

export interface MsgLogicCallExecutedClaim {
  chainName: string;
  eventNonce: Long;
  evmBlockHeight: Long;
  invalidationId: Uint8Array;
  invalidationNonce: Long;
  orchestrator: string;
}
export interface MsgLogicCallExecutedClaimResponse {}
/**
 * This informs the Cosmos module that a validator
 * set has been updated.
 */

export interface MsgValsetUpdatedClaim {
  chainName: string;
  eventNonce: Long;
  valsetNonce: Long;
  evmBlockHeight: Long;
  members: BridgeValidator[];
  rewardAmount: string;
  rewardToken: string;
  orchestrator: string;
}
export interface MsgValsetUpdatedClaimResponse {}
/**
 * This call allows the sender (and only the sender)
 * to cancel a given MsgSendToEvmChain and recieve a refund
 * of the tokens
 */

export interface MsgCancelSendToEvmChain {
  chainName: string;
  transactionId: Long;
  sender: string;
}
export interface MsgCancelSendToEvmChainResponse {}
/**
 * This call allows anyone to submit evidence that a
 * validator has signed a valset, batch, or logic call that never
 * existed on the Cosmos chain.
 * Subject contains the batch, valset, or logic call.
 */

export interface MsgSubmitBadSignatureEvidence {
  chainName: string;
  subject?: Any;
  signature: string;
  sender: string;
}
export interface MsgSubmitBadSignatureEvidenceResponse {}
export interface EventSetOperatorAddress {
  message: string;
  address: string;
}
export interface EventValsetConfirmKey {
  message: string;
  chainName: string;
  key: string;
}
export interface EventBatchCreated {
  message: string;
  chainName: string;
  batchNonce: string;
}
export interface EventBatchConfirmKey {
  message: string;
  batchConfirmKey: string;
}
export interface EventBatchSendToEvmChainClaim {
  chainName: string;
  nonce: string;
}
export interface EventClaim {
  message: string;
  chainName: string;
  claimHash: string;
  attestationId: string;
}
export interface EventBadSignatureEvidence {
  message: string;
  chainName: string;
  badEvmSignature: string;
  badEvmSignatureSubject: string;
}
export interface EventERC20DeployedClaim {
  chainName: string;
  token: string;
  nonce: string;
}
export interface EventValsetUpdatedClaim {
  chainName: string;
  nonce: string;
}
export interface EventMultisigUpdateRequest {
  chainName: string;
  bridgeContract: string;
  bridgeChainId: string;
  multisigId: string;
  nonce: string;
}
export interface EventOutgoingLogicCallCanceled {
  chainName: string;
  logicCallInvalidationId: string;
  logicCallInvalidationNonce: string;
}
export interface EventSignatureSlashing {
  type: string;
  address: string;
}
export interface EventOutgoingTxId {
  message: string;
  chainName: string;
  txId: string;
}

function createBaseMsgSetOrchestratorAddress(): MsgSetOrchestratorAddress {
  return {
    validator: "",
    orchestrator: "",
    evmAddresses: [],
  };
}

export const MsgSetOrchestratorAddress = {
  encode(message: MsgSetOrchestratorAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetOrchestratorAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetOrchestratorAddress();

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

  fromJSON(object: any): MsgSetOrchestratorAddress {
    return {
      validator: isSet(object.validator) ? String(object.validator) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
      evmAddresses: Array.isArray(object?.evmAddresses)
        ? object.evmAddresses.map((e: any) => EvmChainAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSetOrchestratorAddress): unknown {
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

  fromPartial<I extends Exact<DeepPartial<MsgSetOrchestratorAddress>, I>>(
    object: I,
  ): MsgSetOrchestratorAddress {
    const message = createBaseMsgSetOrchestratorAddress();
    message.validator = object.validator ?? "";
    message.orchestrator = object.orchestrator ?? "";
    message.evmAddresses = object.evmAddresses?.map((e) => EvmChainAddress.fromPartial(e)) || [];
    return message;
  },
};

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

function createBaseMsgSetOrchestratorAddressResponse(): MsgSetOrchestratorAddressResponse {
  return {};
}

export const MsgSetOrchestratorAddressResponse = {
  encode(_: MsgSetOrchestratorAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetOrchestratorAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetOrchestratorAddressResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSetOrchestratorAddressResponse {
    return {};
  },

  toJSON(_: MsgSetOrchestratorAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetOrchestratorAddressResponse>, I>>(
    _: I,
  ): MsgSetOrchestratorAddressResponse {
    const message = createBaseMsgSetOrchestratorAddressResponse();
    return message;
  },
};

function createBaseMsgValsetConfirm(): MsgValsetConfirm {
  return {
    chainName: "",
    nonce: Long.UZERO,
    orchestrator: "",
    evmAddress: "",
    signature: "",
  };
}

export const MsgValsetConfirm = {
  encode(message: MsgValsetConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.nonce.isZero()) {
      writer.uint32(16).uint64(message.nonce);
    }

    if (message.orchestrator !== "") {
      writer.uint32(26).string(message.orchestrator);
    }

    if (message.evmAddress !== "") {
      writer.uint32(34).string(message.evmAddress);
    }

    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgValsetConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgValsetConfirm();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.nonce = reader.uint64() as Long;
          break;

        case 3:
          message.orchestrator = reader.string();
          break;

        case 4:
          message.evmAddress = reader.string();
          break;

        case 5:
          message.signature = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgValsetConfirm {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
      evmAddress: isSet(object.evmAddress) ? String(object.evmAddress) : "",
      signature: isSet(object.signature) ? String(object.signature) : "",
    };
  },

  toJSON(message: MsgValsetConfirm): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    message.evmAddress !== undefined && (obj.evmAddress = message.evmAddress);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgValsetConfirm>, I>>(object: I): MsgValsetConfirm {
    const message = createBaseMsgValsetConfirm();
    message.chainName = object.chainName ?? "";
    message.nonce =
      object.nonce !== undefined && object.nonce !== null ? Long.fromValue(object.nonce) : Long.UZERO;
    message.orchestrator = object.orchestrator ?? "";
    message.evmAddress = object.evmAddress ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
};

function createBaseMsgValsetConfirmResponse(): MsgValsetConfirmResponse {
  return {};
}

export const MsgValsetConfirmResponse = {
  encode(_: MsgValsetConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgValsetConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgValsetConfirmResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgValsetConfirmResponse {
    return {};
  },

  toJSON(_: MsgValsetConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgValsetConfirmResponse>, I>>(_: I): MsgValsetConfirmResponse {
    const message = createBaseMsgValsetConfirmResponse();
    return message;
  },
};

function createBaseMsgSendToEvmChain(): MsgSendToEvmChain {
  return {
    sender: "",
    chainName: "",
    evmDest: "",
    amount: undefined,
    bridgeFee: undefined,
  };
}

export const MsgSendToEvmChain = {
  encode(message: MsgSendToEvmChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.evmDest !== "") {
      writer.uint32(26).string(message.evmDest);
    }

    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
    }

    if (message.bridgeFee !== undefined) {
      Coin.encode(message.bridgeFee, writer.uint32(42).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendToEvmChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendToEvmChain();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.evmDest = reader.string();
          break;

        case 4:
          message.amount = Coin.decode(reader, reader.uint32());
          break;

        case 5:
          message.bridgeFee = Coin.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSendToEvmChain {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      evmDest: isSet(object.evmDest) ? String(object.evmDest) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      bridgeFee: isSet(object.bridgeFee) ? Coin.fromJSON(object.bridgeFee) : undefined,
    };
  },

  toJSON(message: MsgSendToEvmChain): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.evmDest !== undefined && (obj.evmDest = message.evmDest);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.bridgeFee !== undefined &&
      (obj.bridgeFee = message.bridgeFee ? Coin.toJSON(message.bridgeFee) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendToEvmChain>, I>>(object: I): MsgSendToEvmChain {
    const message = createBaseMsgSendToEvmChain();
    message.sender = object.sender ?? "";
    message.chainName = object.chainName ?? "";
    message.evmDest = object.evmDest ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.bridgeFee =
      object.bridgeFee !== undefined && object.bridgeFee !== null
        ? Coin.fromPartial(object.bridgeFee)
        : undefined;
    return message;
  },
};

function createBaseMsgSendToEvmChainResponse(): MsgSendToEvmChainResponse {
  return {};
}

export const MsgSendToEvmChainResponse = {
  encode(_: MsgSendToEvmChainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendToEvmChainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendToEvmChainResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSendToEvmChainResponse {
    return {};
  },

  toJSON(_: MsgSendToEvmChainResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendToEvmChainResponse>, I>>(_: I): MsgSendToEvmChainResponse {
    const message = createBaseMsgSendToEvmChainResponse();
    return message;
  },
};

function createBaseMsgRequestBatch(): MsgRequestBatch {
  return {
    sender: "",
    denom: "",
    chainName: "",
  };
}

export const MsgRequestBatch = {
  encode(message: MsgRequestBatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }

    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }

    if (message.chainName !== "") {
      writer.uint32(26).string(message.chainName);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRequestBatch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRequestBatch();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;

        case 2:
          message.denom = reader.string();
          break;

        case 3:
          message.chainName = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgRequestBatch {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
    };
  },

  toJSON(message: MsgRequestBatch): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.denom !== undefined && (obj.denom = message.denom);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRequestBatch>, I>>(object: I): MsgRequestBatch {
    const message = createBaseMsgRequestBatch();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    message.chainName = object.chainName ?? "";
    return message;
  },
};

function createBaseMsgRequestBatchResponse(): MsgRequestBatchResponse {
  return {};
}

export const MsgRequestBatchResponse = {
  encode(_: MsgRequestBatchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRequestBatchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRequestBatchResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgRequestBatchResponse {
    return {};
  },

  toJSON(_: MsgRequestBatchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRequestBatchResponse>, I>>(_: I): MsgRequestBatchResponse {
    const message = createBaseMsgRequestBatchResponse();
    return message;
  },
};

function createBaseMsgConfirmBatch(): MsgConfirmBatch {
  return {
    chainName: "",
    nonce: Long.UZERO,
    tokenContract: "",
    evmSigner: "",
    orchestrator: "",
    signature: "",
  };
}

export const MsgConfirmBatch = {
  encode(message: MsgConfirmBatch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.nonce.isZero()) {
      writer.uint32(16).uint64(message.nonce);
    }

    if (message.tokenContract !== "") {
      writer.uint32(26).string(message.tokenContract);
    }

    if (message.evmSigner !== "") {
      writer.uint32(34).string(message.evmSigner);
    }

    if (message.orchestrator !== "") {
      writer.uint32(42).string(message.orchestrator);
    }

    if (message.signature !== "") {
      writer.uint32(50).string(message.signature);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBatch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBatch();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.nonce = reader.uint64() as Long;
          break;

        case 3:
          message.tokenContract = reader.string();
          break;

        case 4:
          message.evmSigner = reader.string();
          break;

        case 5:
          message.orchestrator = reader.string();
          break;

        case 6:
          message.signature = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgConfirmBatch {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      tokenContract: isSet(object.tokenContract) ? String(object.tokenContract) : "",
      evmSigner: isSet(object.evmSigner) ? String(object.evmSigner) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
      signature: isSet(object.signature) ? String(object.signature) : "",
    };
  },

  toJSON(message: MsgConfirmBatch): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.tokenContract !== undefined && (obj.tokenContract = message.tokenContract);
    message.evmSigner !== undefined && (obj.evmSigner = message.evmSigner);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConfirmBatch>, I>>(object: I): MsgConfirmBatch {
    const message = createBaseMsgConfirmBatch();
    message.chainName = object.chainName ?? "";
    message.nonce =
      object.nonce !== undefined && object.nonce !== null ? Long.fromValue(object.nonce) : Long.UZERO;
    message.tokenContract = object.tokenContract ?? "";
    message.evmSigner = object.evmSigner ?? "";
    message.orchestrator = object.orchestrator ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
};

function createBaseMsgConfirmBatchResponse(): MsgConfirmBatchResponse {
  return {};
}

export const MsgConfirmBatchResponse = {
  encode(_: MsgConfirmBatchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBatchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBatchResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgConfirmBatchResponse {
    return {};
  },

  toJSON(_: MsgConfirmBatchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConfirmBatchResponse>, I>>(_: I): MsgConfirmBatchResponse {
    const message = createBaseMsgConfirmBatchResponse();
    return message;
  },
};

function createBaseMsgConfirmLogicCall(): MsgConfirmLogicCall {
  return {
    chainName: "",
    invalidationId: "",
    invalidationNonce: Long.UZERO,
    evmSigner: "",
    orchestrator: "",
    signature: "",
  };
}

export const MsgConfirmLogicCall = {
  encode(message: MsgConfirmLogicCall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.invalidationId !== "") {
      writer.uint32(18).string(message.invalidationId);
    }

    if (!message.invalidationNonce.isZero()) {
      writer.uint32(24).uint64(message.invalidationNonce);
    }

    if (message.evmSigner !== "") {
      writer.uint32(34).string(message.evmSigner);
    }

    if (message.orchestrator !== "") {
      writer.uint32(42).string(message.orchestrator);
    }

    if (message.signature !== "") {
      writer.uint32(50).string(message.signature);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmLogicCall {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmLogicCall();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.invalidationId = reader.string();
          break;

        case 3:
          message.invalidationNonce = reader.uint64() as Long;
          break;

        case 4:
          message.evmSigner = reader.string();
          break;

        case 5:
          message.orchestrator = reader.string();
          break;

        case 6:
          message.signature = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgConfirmLogicCall {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      invalidationId: isSet(object.invalidationId) ? String(object.invalidationId) : "",
      invalidationNonce: isSet(object.invalidationNonce)
        ? Long.fromValue(object.invalidationNonce)
        : Long.UZERO,
      evmSigner: isSet(object.evmSigner) ? String(object.evmSigner) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
      signature: isSet(object.signature) ? String(object.signature) : "",
    };
  },

  toJSON(message: MsgConfirmLogicCall): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.invalidationId !== undefined && (obj.invalidationId = message.invalidationId);
    message.invalidationNonce !== undefined &&
      (obj.invalidationNonce = (message.invalidationNonce || Long.UZERO).toString());
    message.evmSigner !== undefined && (obj.evmSigner = message.evmSigner);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConfirmLogicCall>, I>>(object: I): MsgConfirmLogicCall {
    const message = createBaseMsgConfirmLogicCall();
    message.chainName = object.chainName ?? "";
    message.invalidationId = object.invalidationId ?? "";
    message.invalidationNonce =
      object.invalidationNonce !== undefined && object.invalidationNonce !== null
        ? Long.fromValue(object.invalidationNonce)
        : Long.UZERO;
    message.evmSigner = object.evmSigner ?? "";
    message.orchestrator = object.orchestrator ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
};

function createBaseMsgConfirmLogicCallResponse(): MsgConfirmLogicCallResponse {
  return {};
}

export const MsgConfirmLogicCallResponse = {
  encode(_: MsgConfirmLogicCallResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmLogicCallResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmLogicCallResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgConfirmLogicCallResponse {
    return {};
  },

  toJSON(_: MsgConfirmLogicCallResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConfirmLogicCallResponse>, I>>(
    _: I,
  ): MsgConfirmLogicCallResponse {
    const message = createBaseMsgConfirmLogicCallResponse();
    return message;
  },
};

function createBaseMsgSendToCosmosClaim(): MsgSendToCosmosClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    tokenContract: "",
    amount: "",
    evmSender: "",
    cosmosReceiver: "",
    orchestrator: "",
  };
}

export const MsgSendToCosmosClaim = {
  encode(message: MsgSendToCosmosClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.evmBlockHeight);
    }

    if (message.tokenContract !== "") {
      writer.uint32(34).string(message.tokenContract);
    }

    if (message.amount !== "") {
      writer.uint32(42).string(message.amount);
    }

    if (message.evmSender !== "") {
      writer.uint32(50).string(message.evmSender);
    }

    if (message.cosmosReceiver !== "") {
      writer.uint32(58).string(message.cosmosReceiver);
    }

    if (message.orchestrator !== "") {
      writer.uint32(66).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendToCosmosClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendToCosmosClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 4:
          message.tokenContract = reader.string();
          break;

        case 5:
          message.amount = reader.string();
          break;

        case 6:
          message.evmSender = reader.string();
          break;

        case 7:
          message.cosmosReceiver = reader.string();
          break;

        case 8:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSendToCosmosClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      tokenContract: isSet(object.tokenContract) ? String(object.tokenContract) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      evmSender: isSet(object.evmSender) ? String(object.evmSender) : "",
      cosmosReceiver: isSet(object.cosmosReceiver) ? String(object.cosmosReceiver) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgSendToCosmosClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    message.tokenContract !== undefined && (obj.tokenContract = message.tokenContract);
    message.amount !== undefined && (obj.amount = message.amount);
    message.evmSender !== undefined && (obj.evmSender = message.evmSender);
    message.cosmosReceiver !== undefined && (obj.cosmosReceiver = message.cosmosReceiver);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendToCosmosClaim>, I>>(object: I): MsgSendToCosmosClaim {
    const message = createBaseMsgSendToCosmosClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.tokenContract = object.tokenContract ?? "";
    message.amount = object.amount ?? "";
    message.evmSender = object.evmSender ?? "";
    message.cosmosReceiver = object.cosmosReceiver ?? "";
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgSendToCosmosClaimResponse(): MsgSendToCosmosClaimResponse {
  return {};
}

export const MsgSendToCosmosClaimResponse = {
  encode(_: MsgSendToCosmosClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendToCosmosClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendToCosmosClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSendToCosmosClaimResponse {
    return {};
  },

  toJSON(_: MsgSendToCosmosClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendToCosmosClaimResponse>, I>>(
    _: I,
  ): MsgSendToCosmosClaimResponse {
    const message = createBaseMsgSendToCosmosClaimResponse();
    return message;
  },
};

function createBaseMsgSendFromEvmChainToEvmChainClaim(): MsgSendFromEvmChainToEvmChainClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    tokenContract: "",
    amount: "",
    evmSender: "",
    toChainName: "",
    receiver: "",
    bridgeFee: "",
    orchestrator: "",
  };
}

export const MsgSendFromEvmChainToEvmChainClaim = {
  encode(message: MsgSendFromEvmChainToEvmChainClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.evmBlockHeight);
    }

    if (message.tokenContract !== "") {
      writer.uint32(34).string(message.tokenContract);
    }

    if (message.amount !== "") {
      writer.uint32(42).string(message.amount);
    }

    if (message.evmSender !== "") {
      writer.uint32(50).string(message.evmSender);
    }

    if (message.toChainName !== "") {
      writer.uint32(58).string(message.toChainName);
    }

    if (message.receiver !== "") {
      writer.uint32(66).string(message.receiver);
    }

    if (message.bridgeFee !== "") {
      writer.uint32(74).string(message.bridgeFee);
    }

    if (message.orchestrator !== "") {
      writer.uint32(82).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendFromEvmChainToEvmChainClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendFromEvmChainToEvmChainClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 4:
          message.tokenContract = reader.string();
          break;

        case 5:
          message.amount = reader.string();
          break;

        case 6:
          message.evmSender = reader.string();
          break;

        case 7:
          message.toChainName = reader.string();
          break;

        case 8:
          message.receiver = reader.string();
          break;

        case 9:
          message.bridgeFee = reader.string();
          break;

        case 10:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSendFromEvmChainToEvmChainClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      tokenContract: isSet(object.tokenContract) ? String(object.tokenContract) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      evmSender: isSet(object.evmSender) ? String(object.evmSender) : "",
      toChainName: isSet(object.toChainName) ? String(object.toChainName) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      bridgeFee: isSet(object.bridgeFee) ? String(object.bridgeFee) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgSendFromEvmChainToEvmChainClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    message.tokenContract !== undefined && (obj.tokenContract = message.tokenContract);
    message.amount !== undefined && (obj.amount = message.amount);
    message.evmSender !== undefined && (obj.evmSender = message.evmSender);
    message.toChainName !== undefined && (obj.toChainName = message.toChainName);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.bridgeFee !== undefined && (obj.bridgeFee = message.bridgeFee);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendFromEvmChainToEvmChainClaim>, I>>(
    object: I,
  ): MsgSendFromEvmChainToEvmChainClaim {
    const message = createBaseMsgSendFromEvmChainToEvmChainClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.tokenContract = object.tokenContract ?? "";
    message.amount = object.amount ?? "";
    message.evmSender = object.evmSender ?? "";
    message.toChainName = object.toChainName ?? "";
    message.receiver = object.receiver ?? "";
    message.bridgeFee = object.bridgeFee ?? "";
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgSendFromEvmChainToEvmChainClaimResponse(): MsgSendFromEvmChainToEvmChainClaimResponse {
  return {};
}

export const MsgSendFromEvmChainToEvmChainClaimResponse = {
  encode(
    _: MsgSendFromEvmChainToEvmChainClaimResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendFromEvmChainToEvmChainClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendFromEvmChainToEvmChainClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSendFromEvmChainToEvmChainClaimResponse {
    return {};
  },

  toJSON(_: MsgSendFromEvmChainToEvmChainClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendFromEvmChainToEvmChainClaimResponse>, I>>(
    _: I,
  ): MsgSendFromEvmChainToEvmChainClaimResponse {
    const message = createBaseMsgSendFromEvmChainToEvmChainClaimResponse();
    return message;
  },
};

function createBaseMsgExecuteIbcAutoForwards(): MsgExecuteIbcAutoForwards {
  return {
    forwardsToClear: Long.UZERO,
    executor: "",
  };
}

export const MsgExecuteIbcAutoForwards = {
  encode(message: MsgExecuteIbcAutoForwards, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.forwardsToClear.isZero()) {
      writer.uint32(8).uint64(message.forwardsToClear);
    }

    if (message.executor !== "") {
      writer.uint32(18).string(message.executor);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteIbcAutoForwards {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteIbcAutoForwards();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.forwardsToClear = reader.uint64() as Long;
          break;

        case 2:
          message.executor = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgExecuteIbcAutoForwards {
    return {
      forwardsToClear: isSet(object.forwardsToClear) ? Long.fromValue(object.forwardsToClear) : Long.UZERO,
      executor: isSet(object.executor) ? String(object.executor) : "",
    };
  },

  toJSON(message: MsgExecuteIbcAutoForwards): unknown {
    const obj: any = {};
    message.forwardsToClear !== undefined &&
      (obj.forwardsToClear = (message.forwardsToClear || Long.UZERO).toString());
    message.executor !== undefined && (obj.executor = message.executor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecuteIbcAutoForwards>, I>>(
    object: I,
  ): MsgExecuteIbcAutoForwards {
    const message = createBaseMsgExecuteIbcAutoForwards();
    message.forwardsToClear =
      object.forwardsToClear !== undefined && object.forwardsToClear !== null
        ? Long.fromValue(object.forwardsToClear)
        : Long.UZERO;
    message.executor = object.executor ?? "";
    return message;
  },
};

function createBaseMsgExecuteIbcAutoForwardsResponse(): MsgExecuteIbcAutoForwardsResponse {
  return {};
}

export const MsgExecuteIbcAutoForwardsResponse = {
  encode(_: MsgExecuteIbcAutoForwardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteIbcAutoForwardsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteIbcAutoForwardsResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgExecuteIbcAutoForwardsResponse {
    return {};
  },

  toJSON(_: MsgExecuteIbcAutoForwardsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecuteIbcAutoForwardsResponse>, I>>(
    _: I,
  ): MsgExecuteIbcAutoForwardsResponse {
    const message = createBaseMsgExecuteIbcAutoForwardsResponse();
    return message;
  },
};

function createBaseMsgBatchSendToEvmChainClaim(): MsgBatchSendToEvmChainClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    batchNonce: Long.UZERO,
    tokenContract: "",
    orchestrator: "",
  };
}

export const MsgBatchSendToEvmChainClaim = {
  encode(message: MsgBatchSendToEvmChainClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.evmBlockHeight);
    }

    if (!message.batchNonce.isZero()) {
      writer.uint32(32).uint64(message.batchNonce);
    }

    if (message.tokenContract !== "") {
      writer.uint32(42).string(message.tokenContract);
    }

    if (message.orchestrator !== "") {
      writer.uint32(50).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBatchSendToEvmChainClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBatchSendToEvmChainClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 4:
          message.batchNonce = reader.uint64() as Long;
          break;

        case 5:
          message.tokenContract = reader.string();
          break;

        case 6:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgBatchSendToEvmChainClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      batchNonce: isSet(object.batchNonce) ? Long.fromValue(object.batchNonce) : Long.UZERO,
      tokenContract: isSet(object.tokenContract) ? String(object.tokenContract) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgBatchSendToEvmChainClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    message.batchNonce !== undefined && (obj.batchNonce = (message.batchNonce || Long.UZERO).toString());
    message.tokenContract !== undefined && (obj.tokenContract = message.tokenContract);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBatchSendToEvmChainClaim>, I>>(
    object: I,
  ): MsgBatchSendToEvmChainClaim {
    const message = createBaseMsgBatchSendToEvmChainClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.batchNonce =
      object.batchNonce !== undefined && object.batchNonce !== null
        ? Long.fromValue(object.batchNonce)
        : Long.UZERO;
    message.tokenContract = object.tokenContract ?? "";
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgBatchSendToEvmChainClaimResponse(): MsgBatchSendToEvmChainClaimResponse {
  return {};
}

export const MsgBatchSendToEvmChainClaimResponse = {
  encode(_: MsgBatchSendToEvmChainClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBatchSendToEvmChainClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBatchSendToEvmChainClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgBatchSendToEvmChainClaimResponse {
    return {};
  },

  toJSON(_: MsgBatchSendToEvmChainClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBatchSendToEvmChainClaimResponse>, I>>(
    _: I,
  ): MsgBatchSendToEvmChainClaimResponse {
    const message = createBaseMsgBatchSendToEvmChainClaimResponse();
    return message;
  },
};

function createBaseMsgERC20DeployedClaim(): MsgERC20DeployedClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    cosmosDenom: "",
    tokenContract: "",
    name: "",
    symbol: "",
    decimals: Long.UZERO,
    orchestrator: "",
  };
}

export const MsgERC20DeployedClaim = {
  encode(message: MsgERC20DeployedClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.evmBlockHeight);
    }

    if (message.cosmosDenom !== "") {
      writer.uint32(34).string(message.cosmosDenom);
    }

    if (message.tokenContract !== "") {
      writer.uint32(42).string(message.tokenContract);
    }

    if (message.name !== "") {
      writer.uint32(50).string(message.name);
    }

    if (message.symbol !== "") {
      writer.uint32(58).string(message.symbol);
    }

    if (!message.decimals.isZero()) {
      writer.uint32(64).uint64(message.decimals);
    }

    if (message.orchestrator !== "") {
      writer.uint32(74).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgERC20DeployedClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgERC20DeployedClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 4:
          message.cosmosDenom = reader.string();
          break;

        case 5:
          message.tokenContract = reader.string();
          break;

        case 6:
          message.name = reader.string();
          break;

        case 7:
          message.symbol = reader.string();
          break;

        case 8:
          message.decimals = reader.uint64() as Long;
          break;

        case 9:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgERC20DeployedClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      cosmosDenom: isSet(object.cosmosDenom) ? String(object.cosmosDenom) : "",
      tokenContract: isSet(object.tokenContract) ? String(object.tokenContract) : "",
      name: isSet(object.name) ? String(object.name) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      decimals: isSet(object.decimals) ? Long.fromValue(object.decimals) : Long.UZERO,
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgERC20DeployedClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    message.cosmosDenom !== undefined && (obj.cosmosDenom = message.cosmosDenom);
    message.tokenContract !== undefined && (obj.tokenContract = message.tokenContract);
    message.name !== undefined && (obj.name = message.name);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.decimals !== undefined && (obj.decimals = (message.decimals || Long.UZERO).toString());
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgERC20DeployedClaim>, I>>(object: I): MsgERC20DeployedClaim {
    const message = createBaseMsgERC20DeployedClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.cosmosDenom = object.cosmosDenom ?? "";
    message.tokenContract = object.tokenContract ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.decimals =
      object.decimals !== undefined && object.decimals !== null
        ? Long.fromValue(object.decimals)
        : Long.UZERO;
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgERC20DeployedClaimResponse(): MsgERC20DeployedClaimResponse {
  return {};
}

export const MsgERC20DeployedClaimResponse = {
  encode(_: MsgERC20DeployedClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgERC20DeployedClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgERC20DeployedClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgERC20DeployedClaimResponse {
    return {};
  },

  toJSON(_: MsgERC20DeployedClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgERC20DeployedClaimResponse>, I>>(
    _: I,
  ): MsgERC20DeployedClaimResponse {
    const message = createBaseMsgERC20DeployedClaimResponse();
    return message;
  },
};

function createBaseMsgLogicCallExecutedClaim(): MsgLogicCallExecutedClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    invalidationId: new Uint8Array(),
    invalidationNonce: Long.UZERO,
    orchestrator: "",
  };
}

export const MsgLogicCallExecutedClaim = {
  encode(message: MsgLogicCallExecutedClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(24).uint64(message.evmBlockHeight);
    }

    if (message.invalidationId.length !== 0) {
      writer.uint32(34).bytes(message.invalidationId);
    }

    if (!message.invalidationNonce.isZero()) {
      writer.uint32(40).uint64(message.invalidationNonce);
    }

    if (message.orchestrator !== "") {
      writer.uint32(50).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLogicCallExecutedClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLogicCallExecutedClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 4:
          message.invalidationId = reader.bytes();
          break;

        case 5:
          message.invalidationNonce = reader.uint64() as Long;
          break;

        case 6:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgLogicCallExecutedClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      invalidationId: isSet(object.invalidationId)
        ? bytesFromBase64(object.invalidationId)
        : new Uint8Array(),
      invalidationNonce: isSet(object.invalidationNonce)
        ? Long.fromValue(object.invalidationNonce)
        : Long.UZERO,
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgLogicCallExecutedClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());
    message.invalidationId !== undefined &&
      (obj.invalidationId = base64FromBytes(
        message.invalidationId !== undefined ? message.invalidationId : new Uint8Array(),
      ));
    message.invalidationNonce !== undefined &&
      (obj.invalidationNonce = (message.invalidationNonce || Long.UZERO).toString());
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLogicCallExecutedClaim>, I>>(
    object: I,
  ): MsgLogicCallExecutedClaim {
    const message = createBaseMsgLogicCallExecutedClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.invalidationId = object.invalidationId ?? new Uint8Array();
    message.invalidationNonce =
      object.invalidationNonce !== undefined && object.invalidationNonce !== null
        ? Long.fromValue(object.invalidationNonce)
        : Long.UZERO;
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgLogicCallExecutedClaimResponse(): MsgLogicCallExecutedClaimResponse {
  return {};
}

export const MsgLogicCallExecutedClaimResponse = {
  encode(_: MsgLogicCallExecutedClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLogicCallExecutedClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLogicCallExecutedClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgLogicCallExecutedClaimResponse {
    return {};
  },

  toJSON(_: MsgLogicCallExecutedClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLogicCallExecutedClaimResponse>, I>>(
    _: I,
  ): MsgLogicCallExecutedClaimResponse {
    const message = createBaseMsgLogicCallExecutedClaimResponse();
    return message;
  },
};

function createBaseMsgValsetUpdatedClaim(): MsgValsetUpdatedClaim {
  return {
    chainName: "",
    eventNonce: Long.UZERO,
    valsetNonce: Long.UZERO,
    evmBlockHeight: Long.UZERO,
    members: [],
    rewardAmount: "",
    rewardToken: "",
    orchestrator: "",
  };
}

export const MsgValsetUpdatedClaim = {
  encode(message: MsgValsetUpdatedClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.eventNonce.isZero()) {
      writer.uint32(16).uint64(message.eventNonce);
    }

    if (!message.valsetNonce.isZero()) {
      writer.uint32(24).uint64(message.valsetNonce);
    }

    if (!message.evmBlockHeight.isZero()) {
      writer.uint32(32).uint64(message.evmBlockHeight);
    }

    for (const v of message.members) {
      BridgeValidator.encode(v!, writer.uint32(42).fork()).ldelim();
    }

    if (message.rewardAmount !== "") {
      writer.uint32(50).string(message.rewardAmount);
    }

    if (message.rewardToken !== "") {
      writer.uint32(58).string(message.rewardToken);
    }

    if (message.orchestrator !== "") {
      writer.uint32(66).string(message.orchestrator);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgValsetUpdatedClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgValsetUpdatedClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.eventNonce = reader.uint64() as Long;
          break;

        case 3:
          message.valsetNonce = reader.uint64() as Long;
          break;

        case 4:
          message.evmBlockHeight = reader.uint64() as Long;
          break;

        case 5:
          message.members.push(BridgeValidator.decode(reader, reader.uint32()));
          break;

        case 6:
          message.rewardAmount = reader.string();
          break;

        case 7:
          message.rewardToken = reader.string();
          break;

        case 8:
          message.orchestrator = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgValsetUpdatedClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      eventNonce: isSet(object.eventNonce) ? Long.fromValue(object.eventNonce) : Long.UZERO,
      valsetNonce: isSet(object.valsetNonce) ? Long.fromValue(object.valsetNonce) : Long.UZERO,
      evmBlockHeight: isSet(object.evmBlockHeight) ? Long.fromValue(object.evmBlockHeight) : Long.UZERO,
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => BridgeValidator.fromJSON(e))
        : [],
      rewardAmount: isSet(object.rewardAmount) ? String(object.rewardAmount) : "",
      rewardToken: isSet(object.rewardToken) ? String(object.rewardToken) : "",
      orchestrator: isSet(object.orchestrator) ? String(object.orchestrator) : "",
    };
  },

  toJSON(message: MsgValsetUpdatedClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.eventNonce !== undefined && (obj.eventNonce = (message.eventNonce || Long.UZERO).toString());
    message.valsetNonce !== undefined && (obj.valsetNonce = (message.valsetNonce || Long.UZERO).toString());
    message.evmBlockHeight !== undefined &&
      (obj.evmBlockHeight = (message.evmBlockHeight || Long.UZERO).toString());

    if (message.members) {
      obj.members = message.members.map((e) => (e ? BridgeValidator.toJSON(e) : undefined));
    } else {
      obj.members = [];
    }

    message.rewardAmount !== undefined && (obj.rewardAmount = message.rewardAmount);
    message.rewardToken !== undefined && (obj.rewardToken = message.rewardToken);
    message.orchestrator !== undefined && (obj.orchestrator = message.orchestrator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgValsetUpdatedClaim>, I>>(object: I): MsgValsetUpdatedClaim {
    const message = createBaseMsgValsetUpdatedClaim();
    message.chainName = object.chainName ?? "";
    message.eventNonce =
      object.eventNonce !== undefined && object.eventNonce !== null
        ? Long.fromValue(object.eventNonce)
        : Long.UZERO;
    message.valsetNonce =
      object.valsetNonce !== undefined && object.valsetNonce !== null
        ? Long.fromValue(object.valsetNonce)
        : Long.UZERO;
    message.evmBlockHeight =
      object.evmBlockHeight !== undefined && object.evmBlockHeight !== null
        ? Long.fromValue(object.evmBlockHeight)
        : Long.UZERO;
    message.members = object.members?.map((e) => BridgeValidator.fromPartial(e)) || [];
    message.rewardAmount = object.rewardAmount ?? "";
    message.rewardToken = object.rewardToken ?? "";
    message.orchestrator = object.orchestrator ?? "";
    return message;
  },
};

function createBaseMsgValsetUpdatedClaimResponse(): MsgValsetUpdatedClaimResponse {
  return {};
}

export const MsgValsetUpdatedClaimResponse = {
  encode(_: MsgValsetUpdatedClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgValsetUpdatedClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgValsetUpdatedClaimResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgValsetUpdatedClaimResponse {
    return {};
  },

  toJSON(_: MsgValsetUpdatedClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgValsetUpdatedClaimResponse>, I>>(
    _: I,
  ): MsgValsetUpdatedClaimResponse {
    const message = createBaseMsgValsetUpdatedClaimResponse();
    return message;
  },
};

function createBaseMsgCancelSendToEvmChain(): MsgCancelSendToEvmChain {
  return {
    chainName: "",
    transactionId: Long.UZERO,
    sender: "",
  };
}

export const MsgCancelSendToEvmChain = {
  encode(message: MsgCancelSendToEvmChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (!message.transactionId.isZero()) {
      writer.uint32(16).uint64(message.transactionId);
    }

    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSendToEvmChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSendToEvmChain();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.transactionId = reader.uint64() as Long;
          break;

        case 3:
          message.sender = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgCancelSendToEvmChain {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      transactionId: isSet(object.transactionId) ? Long.fromValue(object.transactionId) : Long.UZERO,
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: MsgCancelSendToEvmChain): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.transactionId !== undefined &&
      (obj.transactionId = (message.transactionId || Long.UZERO).toString());
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSendToEvmChain>, I>>(object: I): MsgCancelSendToEvmChain {
    const message = createBaseMsgCancelSendToEvmChain();
    message.chainName = object.chainName ?? "";
    message.transactionId =
      object.transactionId !== undefined && object.transactionId !== null
        ? Long.fromValue(object.transactionId)
        : Long.UZERO;
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgCancelSendToEvmChainResponse(): MsgCancelSendToEvmChainResponse {
  return {};
}

export const MsgCancelSendToEvmChainResponse = {
  encode(_: MsgCancelSendToEvmChainResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSendToEvmChainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSendToEvmChainResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgCancelSendToEvmChainResponse {
    return {};
  },

  toJSON(_: MsgCancelSendToEvmChainResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSendToEvmChainResponse>, I>>(
    _: I,
  ): MsgCancelSendToEvmChainResponse {
    const message = createBaseMsgCancelSendToEvmChainResponse();
    return message;
  },
};

function createBaseMsgSubmitBadSignatureEvidence(): MsgSubmitBadSignatureEvidence {
  return {
    chainName: "",
    subject: undefined,
    signature: "",
    sender: "",
  };
}

export const MsgSubmitBadSignatureEvidence = {
  encode(message: MsgSubmitBadSignatureEvidence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.subject !== undefined) {
      Any.encode(message.subject, writer.uint32(18).fork()).ldelim();
    }

    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }

    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBadSignatureEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBadSignatureEvidence();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.subject = Any.decode(reader, reader.uint32());
          break;

        case 3:
          message.signature = reader.string();
          break;

        case 4:
          message.sender = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MsgSubmitBadSignatureEvidence {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      subject: isSet(object.subject) ? Any.fromJSON(object.subject) : undefined,
      signature: isSet(object.signature) ? String(object.signature) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: MsgSubmitBadSignatureEvidence): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.subject !== undefined &&
      (obj.subject = message.subject ? Any.toJSON(message.subject) : undefined);
    message.signature !== undefined && (obj.signature = message.signature);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitBadSignatureEvidence>, I>>(
    object: I,
  ): MsgSubmitBadSignatureEvidence {
    const message = createBaseMsgSubmitBadSignatureEvidence();
    message.chainName = object.chainName ?? "";
    message.subject =
      object.subject !== undefined && object.subject !== null ? Any.fromPartial(object.subject) : undefined;
    message.signature = object.signature ?? "";
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgSubmitBadSignatureEvidenceResponse(): MsgSubmitBadSignatureEvidenceResponse {
  return {};
}

export const MsgSubmitBadSignatureEvidenceResponse = {
  encode(_: MsgSubmitBadSignatureEvidenceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBadSignatureEvidenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBadSignatureEvidenceResponse();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(_: any): MsgSubmitBadSignatureEvidenceResponse {
    return {};
  },

  toJSON(_: MsgSubmitBadSignatureEvidenceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitBadSignatureEvidenceResponse>, I>>(
    _: I,
  ): MsgSubmitBadSignatureEvidenceResponse {
    const message = createBaseMsgSubmitBadSignatureEvidenceResponse();
    return message;
  },
};

function createBaseEventSetOperatorAddress(): EventSetOperatorAddress {
  return {
    message: "",
    address: "",
  };
}

export const EventSetOperatorAddress = {
  encode(message: EventSetOperatorAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSetOperatorAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetOperatorAddress();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.address = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventSetOperatorAddress {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: EventSetOperatorAddress): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSetOperatorAddress>, I>>(object: I): EventSetOperatorAddress {
    const message = createBaseEventSetOperatorAddress();
    message.message = object.message ?? "";
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseEventValsetConfirmKey(): EventValsetConfirmKey {
  return {
    message: "",
    chainName: "",
    key: "",
  };
}

export const EventValsetConfirmKey = {
  encode(message: EventValsetConfirmKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventValsetConfirmKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventValsetConfirmKey();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.key = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventValsetConfirmKey {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      key: isSet(object.key) ? String(object.key) : "",
    };
  },

  toJSON(message: EventValsetConfirmKey): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventValsetConfirmKey>, I>>(object: I): EventValsetConfirmKey {
    const message = createBaseEventValsetConfirmKey();
    message.message = object.message ?? "";
    message.chainName = object.chainName ?? "";
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseEventBatchCreated(): EventBatchCreated {
  return {
    message: "",
    chainName: "",
    batchNonce: "",
  };
}

export const EventBatchCreated = {
  encode(message: EventBatchCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.batchNonce !== "") {
      writer.uint32(26).string(message.batchNonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBatchCreated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBatchCreated();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.batchNonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventBatchCreated {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      batchNonce: isSet(object.batchNonce) ? String(object.batchNonce) : "",
    };
  },

  toJSON(message: EventBatchCreated): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.batchNonce !== undefined && (obj.batchNonce = message.batchNonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBatchCreated>, I>>(object: I): EventBatchCreated {
    const message = createBaseEventBatchCreated();
    message.message = object.message ?? "";
    message.chainName = object.chainName ?? "";
    message.batchNonce = object.batchNonce ?? "";
    return message;
  },
};

function createBaseEventBatchConfirmKey(): EventBatchConfirmKey {
  return {
    message: "",
    batchConfirmKey: "",
  };
}

export const EventBatchConfirmKey = {
  encode(message: EventBatchConfirmKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.batchConfirmKey !== "") {
      writer.uint32(18).string(message.batchConfirmKey);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBatchConfirmKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBatchConfirmKey();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.batchConfirmKey = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventBatchConfirmKey {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      batchConfirmKey: isSet(object.batchConfirmKey) ? String(object.batchConfirmKey) : "",
    };
  },

  toJSON(message: EventBatchConfirmKey): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.batchConfirmKey !== undefined && (obj.batchConfirmKey = message.batchConfirmKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBatchConfirmKey>, I>>(object: I): EventBatchConfirmKey {
    const message = createBaseEventBatchConfirmKey();
    message.message = object.message ?? "";
    message.batchConfirmKey = object.batchConfirmKey ?? "";
    return message;
  },
};

function createBaseEventBatchSendToEvmChainClaim(): EventBatchSendToEvmChainClaim {
  return {
    chainName: "",
    nonce: "",
  };
}

export const EventBatchSendToEvmChainClaim = {
  encode(message: EventBatchSendToEvmChainClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBatchSendToEvmChainClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBatchSendToEvmChainClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.nonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventBatchSendToEvmChainClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
    };
  },

  toJSON(message: EventBatchSendToEvmChainClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBatchSendToEvmChainClaim>, I>>(
    object: I,
  ): EventBatchSendToEvmChainClaim {
    const message = createBaseEventBatchSendToEvmChainClaim();
    message.chainName = object.chainName ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};

function createBaseEventClaim(): EventClaim {
  return {
    message: "",
    chainName: "",
    claimHash: "",
    attestationId: "",
  };
}

export const EventClaim = {
  encode(message: EventClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.claimHash !== "") {
      writer.uint32(26).string(message.claimHash);
    }

    if (message.attestationId !== "") {
      writer.uint32(34).string(message.attestationId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.claimHash = reader.string();
          break;

        case 4:
          message.attestationId = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventClaim {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      claimHash: isSet(object.claimHash) ? String(object.claimHash) : "",
      attestationId: isSet(object.attestationId) ? String(object.attestationId) : "",
    };
  },

  toJSON(message: EventClaim): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.claimHash !== undefined && (obj.claimHash = message.claimHash);
    message.attestationId !== undefined && (obj.attestationId = message.attestationId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventClaim>, I>>(object: I): EventClaim {
    const message = createBaseEventClaim();
    message.message = object.message ?? "";
    message.chainName = object.chainName ?? "";
    message.claimHash = object.claimHash ?? "";
    message.attestationId = object.attestationId ?? "";
    return message;
  },
};

function createBaseEventBadSignatureEvidence(): EventBadSignatureEvidence {
  return {
    message: "",
    chainName: "",
    badEvmSignature: "",
    badEvmSignatureSubject: "",
  };
}

export const EventBadSignatureEvidence = {
  encode(message: EventBadSignatureEvidence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.badEvmSignature !== "") {
      writer.uint32(26).string(message.badEvmSignature);
    }

    if (message.badEvmSignatureSubject !== "") {
      writer.uint32(34).string(message.badEvmSignatureSubject);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBadSignatureEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBadSignatureEvidence();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.badEvmSignature = reader.string();
          break;

        case 4:
          message.badEvmSignatureSubject = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventBadSignatureEvidence {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      badEvmSignature: isSet(object.badEvmSignature) ? String(object.badEvmSignature) : "",
      badEvmSignatureSubject: isSet(object.badEvmSignatureSubject)
        ? String(object.badEvmSignatureSubject)
        : "",
    };
  },

  toJSON(message: EventBadSignatureEvidence): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.badEvmSignature !== undefined && (obj.badEvmSignature = message.badEvmSignature);
    message.badEvmSignatureSubject !== undefined &&
      (obj.badEvmSignatureSubject = message.badEvmSignatureSubject);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBadSignatureEvidence>, I>>(
    object: I,
  ): EventBadSignatureEvidence {
    const message = createBaseEventBadSignatureEvidence();
    message.message = object.message ?? "";
    message.chainName = object.chainName ?? "";
    message.badEvmSignature = object.badEvmSignature ?? "";
    message.badEvmSignatureSubject = object.badEvmSignatureSubject ?? "";
    return message;
  },
};

function createBaseEventERC20DeployedClaim(): EventERC20DeployedClaim {
  return {
    chainName: "",
    token: "",
    nonce: "",
  };
}

export const EventERC20DeployedClaim = {
  encode(message: EventERC20DeployedClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }

    if (message.nonce !== "") {
      writer.uint32(26).string(message.nonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventERC20DeployedClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventERC20DeployedClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.token = reader.string();
          break;

        case 3:
          message.nonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventERC20DeployedClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      token: isSet(object.token) ? String(object.token) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
    };
  },

  toJSON(message: EventERC20DeployedClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.token !== undefined && (obj.token = message.token);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventERC20DeployedClaim>, I>>(object: I): EventERC20DeployedClaim {
    const message = createBaseEventERC20DeployedClaim();
    message.chainName = object.chainName ?? "";
    message.token = object.token ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};

function createBaseEventValsetUpdatedClaim(): EventValsetUpdatedClaim {
  return {
    chainName: "",
    nonce: "",
  };
}

export const EventValsetUpdatedClaim = {
  encode(message: EventValsetUpdatedClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventValsetUpdatedClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventValsetUpdatedClaim();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.nonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventValsetUpdatedClaim {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
    };
  },

  toJSON(message: EventValsetUpdatedClaim): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventValsetUpdatedClaim>, I>>(object: I): EventValsetUpdatedClaim {
    const message = createBaseEventValsetUpdatedClaim();
    message.chainName = object.chainName ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};

function createBaseEventMultisigUpdateRequest(): EventMultisigUpdateRequest {
  return {
    chainName: "",
    bridgeContract: "",
    bridgeChainId: "",
    multisigId: "",
    nonce: "",
  };
}

export const EventMultisigUpdateRequest = {
  encode(message: EventMultisigUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.bridgeContract !== "") {
      writer.uint32(18).string(message.bridgeContract);
    }

    if (message.bridgeChainId !== "") {
      writer.uint32(26).string(message.bridgeChainId);
    }

    if (message.multisigId !== "") {
      writer.uint32(34).string(message.multisigId);
    }

    if (message.nonce !== "") {
      writer.uint32(42).string(message.nonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventMultisigUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMultisigUpdateRequest();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.bridgeContract = reader.string();
          break;

        case 3:
          message.bridgeChainId = reader.string();
          break;

        case 4:
          message.multisigId = reader.string();
          break;

        case 5:
          message.nonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventMultisigUpdateRequest {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      bridgeContract: isSet(object.bridgeContract) ? String(object.bridgeContract) : "",
      bridgeChainId: isSet(object.bridgeChainId) ? String(object.bridgeChainId) : "",
      multisigId: isSet(object.multisigId) ? String(object.multisigId) : "",
      nonce: isSet(object.nonce) ? String(object.nonce) : "",
    };
  },

  toJSON(message: EventMultisigUpdateRequest): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.bridgeContract !== undefined && (obj.bridgeContract = message.bridgeContract);
    message.bridgeChainId !== undefined && (obj.bridgeChainId = message.bridgeChainId);
    message.multisigId !== undefined && (obj.multisigId = message.multisigId);
    message.nonce !== undefined && (obj.nonce = message.nonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventMultisigUpdateRequest>, I>>(
    object: I,
  ): EventMultisigUpdateRequest {
    const message = createBaseEventMultisigUpdateRequest();
    message.chainName = object.chainName ?? "";
    message.bridgeContract = object.bridgeContract ?? "";
    message.bridgeChainId = object.bridgeChainId ?? "";
    message.multisigId = object.multisigId ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
};

function createBaseEventOutgoingLogicCallCanceled(): EventOutgoingLogicCallCanceled {
  return {
    chainName: "",
    logicCallInvalidationId: "",
    logicCallInvalidationNonce: "",
  };
}

export const EventOutgoingLogicCallCanceled = {
  encode(message: EventOutgoingLogicCallCanceled, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainName !== "") {
      writer.uint32(10).string(message.chainName);
    }

    if (message.logicCallInvalidationId !== "") {
      writer.uint32(18).string(message.logicCallInvalidationId);
    }

    if (message.logicCallInvalidationNonce !== "") {
      writer.uint32(26).string(message.logicCallInvalidationNonce);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventOutgoingLogicCallCanceled {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventOutgoingLogicCallCanceled();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.chainName = reader.string();
          break;

        case 2:
          message.logicCallInvalidationId = reader.string();
          break;

        case 3:
          message.logicCallInvalidationNonce = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventOutgoingLogicCallCanceled {
    return {
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      logicCallInvalidationId: isSet(object.logicCallInvalidationId)
        ? String(object.logicCallInvalidationId)
        : "",
      logicCallInvalidationNonce: isSet(object.logicCallInvalidationNonce)
        ? String(object.logicCallInvalidationNonce)
        : "",
    };
  },

  toJSON(message: EventOutgoingLogicCallCanceled): unknown {
    const obj: any = {};
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.logicCallInvalidationId !== undefined &&
      (obj.logicCallInvalidationId = message.logicCallInvalidationId);
    message.logicCallInvalidationNonce !== undefined &&
      (obj.logicCallInvalidationNonce = message.logicCallInvalidationNonce);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventOutgoingLogicCallCanceled>, I>>(
    object: I,
  ): EventOutgoingLogicCallCanceled {
    const message = createBaseEventOutgoingLogicCallCanceled();
    message.chainName = object.chainName ?? "";
    message.logicCallInvalidationId = object.logicCallInvalidationId ?? "";
    message.logicCallInvalidationNonce = object.logicCallInvalidationNonce ?? "";
    return message;
  },
};

function createBaseEventSignatureSlashing(): EventSignatureSlashing {
  return {
    type: "",
    address: "",
  };
}

export const EventSignatureSlashing = {
  encode(message: EventSignatureSlashing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }

    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSignatureSlashing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSignatureSlashing();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;

        case 2:
          message.address = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventSignatureSlashing {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: EventSignatureSlashing): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSignatureSlashing>, I>>(object: I): EventSignatureSlashing {
    const message = createBaseEventSignatureSlashing();
    message.type = object.type ?? "";
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseEventOutgoingTxId(): EventOutgoingTxId {
  return {
    message: "",
    chainName: "",
    txId: "",
  };
}

export const EventOutgoingTxId = {
  encode(message: EventOutgoingTxId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }

    if (message.chainName !== "") {
      writer.uint32(18).string(message.chainName);
    }

    if (message.txId !== "") {
      writer.uint32(26).string(message.txId);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventOutgoingTxId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventOutgoingTxId();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;

        case 2:
          message.chainName = reader.string();
          break;

        case 3:
          message.txId = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): EventOutgoingTxId {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      chainName: isSet(object.chainName) ? String(object.chainName) : "",
      txId: isSet(object.txId) ? String(object.txId) : "",
    };
  },

  toJSON(message: EventOutgoingTxId): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.chainName !== undefined && (obj.chainName = message.chainName);
    message.txId !== undefined && (obj.txId = message.txId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventOutgoingTxId>, I>>(object: I): EventOutgoingTxId {
    const message = createBaseEventOutgoingTxId();
    message.message = object.message ?? "";
    message.chainName = object.chainName ?? "";
    message.txId = object.txId ?? "";
    return message;
  },
};
/** Msg defines the state transitions possible within gravity */

export interface Msg {
  ValsetConfirm(request: MsgValsetConfirm): Promise<MsgValsetConfirmResponse>;
  SendToEvmChain(request: MsgSendToEvmChain): Promise<MsgSendToEvmChainResponse>;
  RequestBatch(request: MsgRequestBatch): Promise<MsgRequestBatchResponse>;
  ConfirmBatch(request: MsgConfirmBatch): Promise<MsgConfirmBatchResponse>;
  ConfirmLogicCall(request: MsgConfirmLogicCall): Promise<MsgConfirmLogicCallResponse>;
  SendToCosmosClaim(request: MsgSendToCosmosClaim): Promise<MsgSendToCosmosClaimResponse>;
  SendFromEvmChainToEvmChainClaim(
    request: MsgSendFromEvmChainToEvmChainClaim,
  ): Promise<MsgSendFromEvmChainToEvmChainClaimResponse>;
  ExecuteIbcAutoForwards(request: MsgExecuteIbcAutoForwards): Promise<MsgExecuteIbcAutoForwardsResponse>;
  BatchSendToEvmChainClaim(
    request: MsgBatchSendToEvmChainClaim,
  ): Promise<MsgBatchSendToEvmChainClaimResponse>;
  ValsetUpdateClaim(request: MsgValsetUpdatedClaim): Promise<MsgValsetUpdatedClaimResponse>;
  ERC20DeployedClaim(request: MsgERC20DeployedClaim): Promise<MsgERC20DeployedClaimResponse>;
  LogicCallExecutedClaim(request: MsgLogicCallExecutedClaim): Promise<MsgLogicCallExecutedClaimResponse>;
  SetOrchestratorAddress(request: MsgSetOrchestratorAddress): Promise<MsgSetOrchestratorAddressResponse>;
  CancelSendToEvmChain(request: MsgCancelSendToEvmChain): Promise<MsgCancelSendToEvmChainResponse>;
  SubmitBadSignatureEvidence(
    request: MsgSubmitBadSignatureEvidence,
  ): Promise<MsgSubmitBadSignatureEvidenceResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ValsetConfirm = this.ValsetConfirm.bind(this);
    this.SendToEvmChain = this.SendToEvmChain.bind(this);
    this.RequestBatch = this.RequestBatch.bind(this);
    this.ConfirmBatch = this.ConfirmBatch.bind(this);
    this.ConfirmLogicCall = this.ConfirmLogicCall.bind(this);
    this.SendToCosmosClaim = this.SendToCosmosClaim.bind(this);
    this.SendFromEvmChainToEvmChainClaim = this.SendFromEvmChainToEvmChainClaim.bind(this);
    this.ExecuteIbcAutoForwards = this.ExecuteIbcAutoForwards.bind(this);
    this.BatchSendToEvmChainClaim = this.BatchSendToEvmChainClaim.bind(this);
    this.ValsetUpdateClaim = this.ValsetUpdateClaim.bind(this);
    this.ERC20DeployedClaim = this.ERC20DeployedClaim.bind(this);
    this.LogicCallExecutedClaim = this.LogicCallExecutedClaim.bind(this);
    this.SetOrchestratorAddress = this.SetOrchestratorAddress.bind(this);
    this.CancelSendToEvmChain = this.CancelSendToEvmChain.bind(this);
    this.SubmitBadSignatureEvidence = this.SubmitBadSignatureEvidence.bind(this);
  }

  ValsetConfirm(request: MsgValsetConfirm): Promise<MsgValsetConfirmResponse> {
    const data = MsgValsetConfirm.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ValsetConfirm", data);
    return promise.then((data) => MsgValsetConfirmResponse.decode(new _m0.Reader(data)));
  }

  SendToEvmChain(request: MsgSendToEvmChain): Promise<MsgSendToEvmChainResponse> {
    const data = MsgSendToEvmChain.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "SendToEvmChain", data);
    return promise.then((data) => MsgSendToEvmChainResponse.decode(new _m0.Reader(data)));
  }

  RequestBatch(request: MsgRequestBatch): Promise<MsgRequestBatchResponse> {
    const data = MsgRequestBatch.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "RequestBatch", data);
    return promise.then((data) => MsgRequestBatchResponse.decode(new _m0.Reader(data)));
  }

  ConfirmBatch(request: MsgConfirmBatch): Promise<MsgConfirmBatchResponse> {
    const data = MsgConfirmBatch.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ConfirmBatch", data);
    return promise.then((data) => MsgConfirmBatchResponse.decode(new _m0.Reader(data)));
  }

  ConfirmLogicCall(request: MsgConfirmLogicCall): Promise<MsgConfirmLogicCallResponse> {
    const data = MsgConfirmLogicCall.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ConfirmLogicCall", data);
    return promise.then((data) => MsgConfirmLogicCallResponse.decode(new _m0.Reader(data)));
  }

  SendToCosmosClaim(request: MsgSendToCosmosClaim): Promise<MsgSendToCosmosClaimResponse> {
    const data = MsgSendToCosmosClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "SendToCosmosClaim", data);
    return promise.then((data) => MsgSendToCosmosClaimResponse.decode(new _m0.Reader(data)));
  }

  SendFromEvmChainToEvmChainClaim(
    request: MsgSendFromEvmChainToEvmChainClaim,
  ): Promise<MsgSendFromEvmChainToEvmChainClaimResponse> {
    const data = MsgSendFromEvmChainToEvmChainClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "SendFromEvmChainToEvmChainClaim", data);
    return promise.then((data) => MsgSendFromEvmChainToEvmChainClaimResponse.decode(new _m0.Reader(data)));
  }

  ExecuteIbcAutoForwards(request: MsgExecuteIbcAutoForwards): Promise<MsgExecuteIbcAutoForwardsResponse> {
    const data = MsgExecuteIbcAutoForwards.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ExecuteIbcAutoForwards", data);
    return promise.then((data) => MsgExecuteIbcAutoForwardsResponse.decode(new _m0.Reader(data)));
  }

  BatchSendToEvmChainClaim(
    request: MsgBatchSendToEvmChainClaim,
  ): Promise<MsgBatchSendToEvmChainClaimResponse> {
    const data = MsgBatchSendToEvmChainClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "BatchSendToEvmChainClaim", data);
    return promise.then((data) => MsgBatchSendToEvmChainClaimResponse.decode(new _m0.Reader(data)));
  }

  ValsetUpdateClaim(request: MsgValsetUpdatedClaim): Promise<MsgValsetUpdatedClaimResponse> {
    const data = MsgValsetUpdatedClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ValsetUpdateClaim", data);
    return promise.then((data) => MsgValsetUpdatedClaimResponse.decode(new _m0.Reader(data)));
  }

  ERC20DeployedClaim(request: MsgERC20DeployedClaim): Promise<MsgERC20DeployedClaimResponse> {
    const data = MsgERC20DeployedClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "ERC20DeployedClaim", data);
    return promise.then((data) => MsgERC20DeployedClaimResponse.decode(new _m0.Reader(data)));
  }

  LogicCallExecutedClaim(request: MsgLogicCallExecutedClaim): Promise<MsgLogicCallExecutedClaimResponse> {
    const data = MsgLogicCallExecutedClaim.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "LogicCallExecutedClaim", data);
    return promise.then((data) => MsgLogicCallExecutedClaimResponse.decode(new _m0.Reader(data)));
  }

  SetOrchestratorAddress(request: MsgSetOrchestratorAddress): Promise<MsgSetOrchestratorAddressResponse> {
    const data = MsgSetOrchestratorAddress.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "SetOrchestratorAddress", data);
    return promise.then((data) => MsgSetOrchestratorAddressResponse.decode(new _m0.Reader(data)));
  }

  CancelSendToEvmChain(request: MsgCancelSendToEvmChain): Promise<MsgCancelSendToEvmChainResponse> {
    const data = MsgCancelSendToEvmChain.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "CancelSendToEvmChain", data);
    return promise.then((data) => MsgCancelSendToEvmChainResponse.decode(new _m0.Reader(data)));
  }

  SubmitBadSignatureEvidence(
    request: MsgSubmitBadSignatureEvidence,
  ): Promise<MsgSubmitBadSignatureEvidenceResponse> {
    const data = MsgSubmitBadSignatureEvidence.encode(request).finish();
    const promise = this.rpc.request("gravity.v1.Msg", "SubmitBadSignatureEvidence", data);
    return promise.then((data) => MsgSubmitBadSignatureEvidenceResponse.decode(new _m0.Reader(data)));
  }
}
