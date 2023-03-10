import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgConvertAIOZRC20, MsgConvertCoin } from "cosmjs-types/aioz/aiozrc20/v1/tx";

export const aiozrc20Types: ReadonlyArray<[string, GeneratedType]> = [
  ["/aioz.aiozrc20.v1.MsgConvertCoin", MsgConvertCoin],
  ["/aioz.aiozrc20.v1.MsgConvertAIOZRC20", MsgConvertAIOZRC20],
];

export interface MsgConvertCoinEncodeObject extends EncodeObject {
  readonly typeUrl: "/aioz.aiozrc20.v1.MsgConvertCoin";
  readonly value: Partial<MsgConvertCoin>;
}

export function isMsgConvertCoinEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgConvertCoinEncodeObject {
  return (encodeObject as MsgConvertCoinEncodeObject).typeUrl === "/aioz.aiozrc20.v1.MsgConvertCoin";
}

export interface MsgConvertAIOZRC20EncodeObject extends EncodeObject {
  readonly typeUrl: "/aioz.aiozrc20.v1.MsgConvertAIOZRC20";
  readonly value: Partial<MsgConvertAIOZRC20>;
}

export function isMsgConvertAIOZRC20EncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgConvertAIOZRC20EncodeObject {
  return (encodeObject as MsgConvertAIOZRC20EncodeObject).typeUrl === "/aioz.aiozrc20.v1.MsgConvertAIOZRC20";
}
