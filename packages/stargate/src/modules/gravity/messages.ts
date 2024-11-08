import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgCancelSendToEvmChain, MsgSendToEvmChain } from "cosmjs-types/gravity/gravity/v1/msgs";

export const gravityTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/gravity.gravity.v1.MsgSendToEvmChain", MsgSendToEvmChain],
  ["/gravity.gravity.v1.MsgCancelSendToEvmChain", MsgCancelSendToEvmChain],
];

export interface MsgSendToEvmChainEncodeObject extends EncodeObject {
  readonly typeUrl: "/gravity.gravity.v1.MsgSendToEvmChain";
  readonly value: Partial<MsgSendToEvmChain>;
}

export function isMsgSendToEvmChainEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgSendToEvmChainEncodeObject {
  return (encodeObject as MsgSendToEvmChainEncodeObject).typeUrl === "/gravity.gravity.v1.MsgSendToEvmChain";
}

export interface MsgCancelSendToEvmChainEncodeObject extends EncodeObject {
  readonly typeUrl: "/gravity.gravity.v1.MsgCancelSendToEvmChain";
  readonly value: Partial<MsgCancelSendToEvmChain>;
}

export function isMsgCancelSendToEvmChainEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCancelSendToEvmChainEncodeObject {
  return (
    // eslint-disable-next-line prettier/prettier
    (encodeObject as MsgCancelSendToEvmChainEncodeObject).typeUrl === "/gravity.gravity.v1.MsgCancelSendToEvmChain"
  );
}
