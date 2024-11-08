/* eslint-disable */
import { BaseAccount } from "../../../cosmos/auth/v1beta1/auth";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.types.v1";
/**
 * EthAccount implements the authtypes.AccountI interface and embeds an
 * authtypes.BaseAccount type. It is compatible with the auth AccountKeeper.
 */
export interface EthAccount {
  /** base_account is an authtypes.BaseAccount */
  baseAccount?: BaseAccount;
  /** code_hash is the hash calculated from the code contents */
  codeHash: string;
}
function createBaseEthAccount(): EthAccount {
  return {
    baseAccount: undefined,
    codeHash: "",
  };
}
export const EthAccount = {
  typeUrl: "/ethermint.types.v1.EthAccount",
  encode(message: EthAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
    }
    if (message.codeHash !== "") {
      writer.uint32(18).string(message.codeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EthAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEthAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.codeHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EthAccount {
    const obj = createBaseEthAccount();
    if (isSet(object.baseAccount)) obj.baseAccount = BaseAccount.fromJSON(object.baseAccount);
    if (isSet(object.codeHash)) obj.codeHash = String(object.codeHash);
    return obj;
  },
  toJSON(message: EthAccount): JsonSafe<EthAccount> {
    const obj: any = {};
    message.baseAccount !== undefined &&
      (obj.baseAccount = message.baseAccount ? BaseAccount.toJSON(message.baseAccount) : undefined);
    message.codeHash !== undefined && (obj.codeHash = message.codeHash);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EthAccount>, I>>(object: I): EthAccount {
    const message = createBaseEthAccount();
    if (object.baseAccount !== undefined && object.baseAccount !== null) {
      message.baseAccount = BaseAccount.fromPartial(object.baseAccount);
    }
    message.codeHash = object.codeHash ?? "";
    return message;
  },
};
