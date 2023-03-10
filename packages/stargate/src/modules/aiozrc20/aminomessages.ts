/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgConvertAIOZRC20, MsgConvertCoin } from "cosmjs-types/aioz/aiozrc20/v1/tx";

// eslint-disable-next-line import/no-cycle
import { AminoConverters } from "../../aminotypes";

export interface AminoMsgConvertCoin extends AminoMsg {
  readonly type: "aiozrc20/MsgConvertCoin";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Hex account address */
    readonly receiver: string;
    readonly coin?: Coin;
  };
}

export function isAminoMsgConvertCoin(msg: AminoMsg): msg is AminoMsgConvertCoin {
  return msg.type === "aiozrc20/MsgConvertCoin";
}

export interface AminoMsgConvertAIOZRC20 extends AminoMsg {
  readonly type: "aiozrc20/MsgConvertAIOZRC20";
  readonly value: {
    /** Hex account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly receiver: string;
    readonly contract_address: string;
    readonly amount: string;
  };
}

export function isAminoMsgConvertAIOZRC20(msg: AminoMsg): msg is AminoMsgConvertAIOZRC20 {
  return msg.type === "aiozrc20/MsgConvertAIOZRC20";
}

export function createAiozrc20AminoConverters(): AminoConverters {
  return {
    "/aioz.aiozrc20.v1.MsgConvertCoin": {
      aminoType: "aiozrc20/MsgConvertCoin",
      toAmino: ({ sender, receiver, coin }: MsgConvertCoin): AminoMsgConvertCoin["value"] => ({
        sender: sender,
        receiver: receiver,
        coin: coin,
      }),
      fromAmino: ({ sender, receiver, coin }: AminoMsgConvertCoin["value"]): MsgConvertCoin => ({
        sender: sender,
        receiver: receiver,
        coin: coin,
      }),
    },
    "/aioz.aiozrc20.v1.MsgConvertAIOZRC20": {
      aminoType: "aiozrc20/MsgConvertAIOZRC20",
      toAmino: ({
        sender,
        receiver,
        contractAddress,
        amount,
      }: MsgConvertAIOZRC20): AminoMsgConvertAIOZRC20["value"] => ({
        sender: sender,
        receiver: receiver,
        contract_address: contractAddress,
        amount: amount,
      }),
      fromAmino: ({
        sender,
        receiver,
        contract_address,
        amount,
      }: AminoMsgConvertAIOZRC20["value"]): MsgConvertAIOZRC20 => ({
        sender: sender,
        receiver: receiver,
        contractAddress: contract_address,
        amount: amount,
      }),
    },
  };
}
