import { BaseAccount } from "../../../cosmos/auth/v1beta1/auth";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export declare const protobufPackage = "ethermint.types.v1";
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
export declare const EthAccount: {
    typeUrl: string;
    encode(message: EthAccount, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EthAccount;
    fromJSON(object: any): EthAccount;
    toJSON(message: EthAccount): JsonSafe<EthAccount>;
    fromPartial<I extends Exact<DeepPartial<EthAccount>, I>>(object: I): EthAccount;
};
