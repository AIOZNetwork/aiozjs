import {
  encodeSecp256k1Pubkey, encodeEthSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino, StdFee,
  hexToAddress,
 } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { Int53 } from "@cosmjs/math";
import {
  EncodeObject,
  encodePubkey,
  GeneratedType,
  // isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  // OfflineSigner,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import {
  isOfflineDirectSigner,
  isOfflineEIP712Signer,
  OfflineSigner,
  parseChainId,
} from "@cosmjs/eip712";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import { MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgDeposit, MsgSubmitProposal, MsgVote } from "cosmjs-types/cosmos/gov/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import {
  MsgConvertCoin,
  MsgConvertAIOZRC20,
} from "cosmjs-types/aioz/aiozrc20/v1/tx";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import {
  MsgAcknowledgement,
  MsgChannelCloseConfirm,
  MsgChannelCloseInit,
  MsgChannelOpenAck,
  MsgChannelOpenConfirm,
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgRecvPacket,
  MsgTimeout,
  MsgTimeoutOnClose,
} from "cosmjs-types/ibc/core/channel/v1/tx";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
} from "cosmjs-types/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "cosmjs-types/ibc/core/connection/v1/tx";
import { ExtensionOptionsWeb3Tx } from "cosmjs-types/ethermint/types/v1/web3";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";

import { AminoTypes } from "./aminotypes";
import {
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgTransferEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
} from "./encodeobjects";
import { BroadcastTxResponse, StargateClient } from "./stargateclient";

export const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
  ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
  ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
  ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", MsgWithdrawValidatorCommission],
  ["/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit],
  ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.gov.v1beta1.MsgVote", MsgVote],
  ["/cosmos.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
  ["/cosmos.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate],
  ["/cosmos.staking.v1beta1.MsgEditValidator", MsgEditValidator],
  ["/cosmos.staking.v1beta1.MsgUndelegate", MsgUndelegate],
  ["/ibc.core.channel.v1.MsgChannelOpenInit", MsgChannelOpenInit],
  ["/ibc.core.channel.v1.MsgChannelOpenTry", MsgChannelOpenTry],
  ["/ibc.core.channel.v1.MsgChannelOpenAck", MsgChannelOpenAck],
  ["/ibc.core.channel.v1.MsgChannelOpenConfirm", MsgChannelOpenConfirm],
  ["/ibc.core.channel.v1.MsgChannelCloseInit", MsgChannelCloseInit],
  ["/ibc.core.channel.v1.MsgChannelCloseConfirm", MsgChannelCloseConfirm],
  ["/ibc.core.channel.v1.MsgRecvPacket", MsgRecvPacket],
  ["/ibc.core.channel.v1.MsgTimeout ", MsgTimeout],
  ["/ibc.core.channel.v1.MsgTimeoutOnClose", MsgTimeoutOnClose],
  ["/ibc.core.channel.v1.MsgAcknowledgement", MsgAcknowledgement],
  ["/ibc.core.client.v1.MsgCreateClient", MsgCreateClient],
  ["/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient],
  ["/ibc.core.client.v1.MsgUpgradeClient", MsgUpgradeClient],
  ["/ibc.core.client.v1.MsgSubmitMisbehaviour", MsgSubmitMisbehaviour],
  ["/ibc.core.connection.v1.MsgConnectionOpenInit", MsgConnectionOpenInit],
  ["/ibc.core.connection.v1.MsgConnectionOpenTry", MsgConnectionOpenTry],
  ["/ibc.core.connection.v1.MsgConnectionOpenAck", MsgConnectionOpenAck],
  ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", MsgConnectionOpenConfirm],
  ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],
  ["/aioz.aiozrc20.v1.MsgConvertCoin", MsgConvertCoin],
  ["/aioz.aiozrc20.v1.MsgConvertAIOZRC20", MsgConvertAIOZRC20],
  ["/ethermint.types.v1.ExtensionOptionsWeb3Tx", ExtensionOptionsWeb3Tx],
];

function createDefaultRegistry(): Registry {
  return new Registry(defaultRegistryTypes);
}

/**
 * Signing information for a single signer that is not included in the transaction.
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/x/auth/signing/sign_mode_handler.go#L23-L37
 */
export interface SignerData {
  readonly accountNumber: number;
  readonly sequence: number;
  readonly chainId: string;
}

/** Use for testing only */
export interface PrivateSigningStargateClient {
  readonly registry: Registry;
}

export interface SigningStargateClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly broadcastTimeoutMs?: number;
  readonly broadcastPollIntervalMs?: number;
  readonly pubkeyAlgo?: string;
}

export class SigningStargateClient extends StargateClient {
  public readonly registry: Registry;
  public readonly broadcastTimeoutMs: number | undefined;
  public readonly broadcastPollIntervalMs: number | undefined;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;
  private readonly prefix: string;
  private readonly pubkeyAlgo?: string;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<SigningStargateClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningStargateClient(tmClient, signer, options);
  }

  /**
   * Creates a client in offline mode.
   *
   * This should only be used in niche cases where you know exactly what you're doing,
   * e.g. when building an offline signing application.
   *
   * When you try to use online functionality with such a signer, an
   * exception will be raised.
   */
  public static async offline(
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<SigningStargateClient> {
    return new SigningStargateClient(undefined, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
  ) {
    super(tmClient);
    const { registry = createDefaultRegistry(), aminoTypes = new AminoTypes({ prefix: options.prefix }) } =
      options;
    this.registry = registry;
    this.prefix = options.prefix || 'aioz';
    this.aminoTypes = aminoTypes;
    this.signer = signer;
    this.broadcastTimeoutMs = options.broadcastTimeoutMs;
    this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
    this.pubkeyAlgo = options.pubkeyAlgo;
  }

  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: hexToAddress(senderAddress, this.prefix),
        toAddress: hexToAddress(recipientAddress, this.prefix),
        amount: [...amount],
      },
    };
    return this.signAndBroadcast(hexToAddress(senderAddress, this.prefix), [sendMsg], fee, memo);
  }

  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const delegateMsg: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: MsgDelegate.fromPartial({
        delegatorAddress: hexToAddress(delegatorAddress, this.prefix),
        validatorAddress: hexToAddress(validatorAddress, this.prefix + 'valoper'),
        amount: amount,
      }),
    };
    return this.signAndBroadcast(hexToAddress(delegatorAddress, this.prefix), [delegateMsg], fee, memo);
  }

  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const undelegateMsg: MsgUndelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgUndelegate.fromPartial({
        delegatorAddress: hexToAddress(delegatorAddress, this.prefix),
        validatorAddress: hexToAddress(validatorAddress, this.prefix + 'valoper'),
        amount: amount,
      }),
    };
    return this.signAndBroadcast(hexToAddress(delegatorAddress, this.prefix), [undelegateMsg], fee, memo);
  }

  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddress: string,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const withdrawMsg: MsgWithdrawDelegatorRewardEncodeObject = {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: hexToAddress(delegatorAddress, this.prefix),
        validatorAddress: hexToAddress(validatorAddress, this.prefix + 'valoper'),
      }),
    };
    return this.signAndBroadcast(hexToAddress(delegatorAddress, this.prefix), [withdrawMsg], fee, memo);
  }

  public async sendIbcTokens(
    senderAddress: string,
    recipientAddress: string,
    transferAmount: Coin,
    sourcePort: string,
    sourceChannel: string,
    timeoutHeight: Height | undefined,
    /** timeout in seconds */
    timeoutTimestamp: number | undefined,
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const timeoutTimestampNanoseconds = timeoutTimestamp
      ? Long.fromNumber(timeoutTimestamp).multiply(1_000_000_000)
      : undefined;
    const transferMsg: MsgTransferEncodeObject = {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: MsgTransfer.fromPartial({
        sourcePort: sourcePort,
        sourceChannel: sourceChannel,
        sender: hexToAddress(senderAddress, this.prefix),
        receiver: recipientAddress,
        token: transferAmount,
        timeoutHeight: timeoutHeight,
        timeoutTimestamp: timeoutTimestampNanoseconds,
      }),
    };
    return this.signAndBroadcast(hexToAddress(senderAddress, this.prefix), [transferMsg], fee, memo);
  }

  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature and assembles the signed transaction.
   *
   * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
   *
   * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
   * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
   * (See the SigningStargateClient.offline constructor).
   */
  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData,
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const { accountNumber, sequence } = await this.getSequence(signerAddress);
      const chainId = await this.getChainId();
      signerData = {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.signer)
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : isOfflineEIP712Signer(this.signer)
      ? this.signEIP712(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signAmino(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.signer) && !isOfflineEIP712Signer(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account: any) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const account = {
      ...accountFromSigner, algo: this.pubkeyAlgo || accountFromSigner.algo,
    };
    const pubkey = account.algo == "eth_secp256k1" ?
      encodePubkey(encodeEthSecp256k1Pubkey(account.pubkey)) :
      encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
    const { signature, signed } = await this.signer.signAmino(signerAddress, signDoc);
    const signedTxBody = {
      messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
      memo: signed.memo,
    };
    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    };
    const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode,
    );
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account: any) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const account = {
      ...accountFromSigner, algo: this.pubkeyAlgo || accountFromSigner.algo,
    };
    const pubkey = account.algo == "eth_secp256k1" ?
      encodePubkey(encodeEthSecp256k1Pubkey(account.pubkey)) :
      encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.registry.encode(txBodyEncodeObject);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit);
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
    const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async signEIP712(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(isOfflineEIP712Signer(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account: any) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
    const { signature, pubkey, signed } = await this.signer.signEIP712(signerAddress, signDoc);
    const encodedPubkey = encodePubkey(encodeEthSecp256k1Pubkey(pubkey));
    const extension = ExtensionOptionsWeb3Tx.fromPartial({
      typedDataChainId: parseChainId(chainId),
      feePayer: signerAddress,
      feePayerSig: signature,
    });
    const extensionEncodeObject: EncodeObject = {
      typeUrl: "/ethermint.types.v1.ExtensionOptionsWeb3Tx",
      value: extension
    }
    const extensionBytes = this.registry.encode(extensionEncodeObject);
    const signedTxBody = {
      messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
      memo: signed.memo,
      extensionOptions: [Any.fromPartial({typeUrl: extensionEncodeObject.typeUrl, value: extensionBytes})],
    };
    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    };
    const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey: encodedPubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode,
    );
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [new Uint8Array(0)],
    });
  }
}
