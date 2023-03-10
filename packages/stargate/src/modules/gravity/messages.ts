import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgCancelSendToEvmChain, MsgSendToEvmChain } from "cosmjs-types/gravity/v1/msgs";

export const gravityTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/gravity.v1.MsgSendToEvmChain", MsgSendToEvmChain],
  ["/gravity.v1.MsgCancelSendToEvmChain", MsgCancelSendToEvmChain],
];

export interface MsgSendToEvmChainEncodeObject extends EncodeObject {
  readonly typeUrl: "/gravity.v1.MsgSendToEvmChain";
  readonly value: Partial<MsgSendToEvmChain>;
}

export function isMsgSendToEvmChainEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgSendToEvmChainEncodeObject {
  return (encodeObject as MsgSendToEvmChainEncodeObject).typeUrl === "/gravity.v1.MsgSendToEvmChain";
}

export interface MsgCancelSendToEvmChainEncodeObject extends EncodeObject {
  readonly typeUrl: "/gravity.v1.MsgCancelSendToEvmChain";
  readonly value: Partial<MsgCancelSendToEvmChain>;
}

export function isMsgCancelSendToEvmChainEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCancelSendToEvmChainEncodeObject {
  return (
    (encodeObject as MsgCancelSendToEvmChainEncodeObject).typeUrl === "/gravity.v1.MsgCancelSendToEvmChain"
  );
}
