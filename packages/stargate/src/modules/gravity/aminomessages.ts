/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgCancelSendToEvmChain, MsgSendToEvmChain } from "cosmjs-types/gravity/v1/msgs";

// eslint-disable-next-line import/no-cycle
import { AminoConverters } from "../../aminotypes";

export interface AminoMsgSendToEvmChain extends AminoMsg {
  readonly type: "gravity/MsgSendToEvmChain";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    readonly chain_name: string;
    readonly evm_dest: string;
    readonly amount?: Coin;
    readonly bridge_fee?: Coin;
    readonly chain_fee?: Coin;
  };
}

export function isAminoMsgSendToEvmChain(msg: AminoMsg): msg is AminoMsgSendToEvmChain {
  return msg.type === "gravity/MsgSendToEvmChain";
}

export interface AminoMsgCancelSendToEvmChain extends AminoMsg {
  readonly type: "gravity/MsgCancelSendToEvmChain";
  readonly value: {
    /** Hex account address */
    readonly sender: string;
    readonly chain_name: string;
    readonly transaction_id: Long;
  };
}

export function isAminoMsgCancelSendToEvmChain(msg: AminoMsg): msg is AminoMsgCancelSendToEvmChain {
  return msg.type === "gravity/MsgCancelSendToEvmChain";
}

export function createGravityAminoConverters(): AminoConverters {
  return {
    "/gravity.v1.MsgSendToEvmChain": {
      aminoType: "gravity/MsgSendToEvmChain",
      toAmino: ({
        sender,
        chainName,
        evmDest,
        amount,
        bridgeFee,
        chainFee,
      }: MsgSendToEvmChain): AminoMsgSendToEvmChain["value"] => ({
        sender: sender,
        chain_name: chainName,
        evm_dest: evmDest,
        amount: amount,
        bridge_fee: bridgeFee,
        chain_fee: chainFee,
      }),
      fromAmino: ({
        sender,
        chain_name,
        evm_dest,
        amount,
        bridge_fee,
        chain_fee,
      }: AminoMsgSendToEvmChain["value"]): MsgSendToEvmChain => ({
        sender: sender,
        chainName: chain_name,
        evmDest: evm_dest,
        amount: amount,
        bridgeFee: bridge_fee,
        chainFee: chain_fee,
      }),
    },
    "/gravity.v1.MsgCancelSendToEvmChain": {
      aminoType: "gravity/MsgCancelSendToEvmChain",
      toAmino: ({
        sender,
        chainName,
        transactionId,
      }: MsgCancelSendToEvmChain): AminoMsgCancelSendToEvmChain["value"] => ({
        sender: sender,
        chain_name: chainName,
        transaction_id: transactionId,
      }),
      fromAmino: ({
        sender,
        chain_name,
        transaction_id,
      }: AminoMsgCancelSendToEvmChain["value"]): MsgCancelSendToEvmChain => ({
        sender: sender,
        chainName: chain_name,
        transactionId: transaction_id,
      }),
    },
  };
}
