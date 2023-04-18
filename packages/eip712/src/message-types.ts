/* eslint-disable @typescript-eslint/naming-convention */

export const MsgSendTypes = {
  MsgValue: [
    { name: "from_address", type: "string" },
    { name: "to_address", type: "string" },
    { name: "amount", type: "TypeAmount[]" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgMultiSendTypes = {
  MsgValue: [
    { name: "inputs", type: "TypeInput[]" },
    { name: "outputs", type: "TypeOutput[]" },
  ],
  TypeInput: [
    { name: "address", type: "string" },
    { name: "coins", type: "TypeAmount[]" },
  ],
  TypeOutput: [
    { name: "address", type: "string" },
    { name: "coins", type: "TypeAmount[]" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgDelegateTypes = {
  MsgValue: [
    { name: "delegator_address", type: "string" },
    { name: "validator_address", type: "string" },
    { name: "amount", type: "TypeAmount" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgBeginRedelegateTypes = {
  MsgValue: [
    { name: "delegator_address", type: "string" },
    { name: "validator_src_address", type: "string" },
    { name: "validator_dst_address", type: "string" },
    { name: "amount", type: "TypeAmount" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgUndelegateTypes = {
  MsgValue: [
    { name: "delegator_address", type: "string" },
    { name: "validator_address", type: "string" },
    { name: "amount", type: "TypeAmount" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgFundCommunityPoolTypes = {
  MsgValue: [
    { name: "amount", type: "TypeAmount[]" },
    { name: "depositor", type: "string" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgSetWithdrawAddressTypes = {
  MsgValue: [
    { name: "delegator_address", type: "string" },
    { name: "withdraw_address", type: "string" },
  ],
};

export const MsgWithdrawDelegatorRewardTypes = {
  MsgValue: [
    { name: "delegator_address", type: "string" },
    { name: "validator_address", type: "string" },
  ],
};

export const MsgWithdrawValidatorCommissionTypes = {
  MsgValue: [{ name: "validator_address", type: "string" }],
};

export const MsgDepositTypes = {
  MsgValue: [
    { name: "proposal_id", type: "uint64" },
    { name: "depositor", type: "string" },
    { name: "amount", type: "TypeAmount[]" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgVoteTypes = {
  MsgValue: [
    { name: "proposal_id", type: "uint64" },
    { name: "voter", type: "string" },
    { name: "option", type: "int32" },
  ],
};

export const MsgIbcTransferTypes = {
  MsgValue: [
    { name: "source_port", type: "string" },
    { name: "source_channel", type: "string" },
    { name: "token", type: "TypeToken" },
    { name: "sender", type: "string" },
    { name: "receiver", type: "string" },
    { name: "timeout_height", type: "TypeTimeoutHeight" },
    { name: "timeout_timestamp", type: "uint64" },
  ],
  TypeToken: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
  TypeTimeoutHeight: [
    { name: "revision_number", type: "uint64" },
    { name: "revision_height", type: "uint64" },
  ],
};

export const MsgConvertCoinTypes = {
  MsgValue: [
    { name: "coin", type: "TypeCoin" },
    { name: "receiver", type: "string" },
    { name: "sender", type: "string" },
  ],
  TypeCoin: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const MsgConvertAIOZRC20Types = {
  MsgValue: [
    { name: "contract_address", type: "string" },
    { name: "amount", type: "string" },
    { name: "receiver", type: "string" },
    { name: "sender", type: "string" },
  ],
};

export function getMsgTypes(type: string): Record<string, unknown> {
  switch (type) {
    case "cosmos-sdk/MsgSend":
      return MsgSendTypes;
    case "cosmos-sdk/MsgMultiSend":
      return MsgMultiSendTypes;
    case "cosmos-sdk/MsgFundCommunityPool":
      return MsgFundCommunityPoolTypes;
    case "cosmos-sdk/MsgModifyWithdrawAddress":
      return MsgSetWithdrawAddressTypes;
    case "cosmos-sdk/MsgWithdrawDelegationReward":
      return MsgWithdrawDelegatorRewardTypes;
    case "cosmos-sdk/MsgWithdrawValidatorCommission":
      return MsgWithdrawValidatorCommissionTypes;
    case "cosmos-sdk/MsgDeposit":
      return MsgDepositTypes;
    case "cosmos-sdk/MsgVote":
      return MsgVoteTypes;
    case "cosmos-sdk/MsgBeginRedelegate":
      return MsgBeginRedelegateTypes;
    case "cosmos-sdk/MsgDelegate":
      return MsgDelegateTypes;
    case "cosmos-sdk/MsgUndelegate":
      return MsgUndelegateTypes;
    case "cosmos-sdk/MsgTransfer":
      return MsgIbcTransferTypes;
    case "aiozrc20/MsgConvertCoin":
      return MsgConvertCoinTypes;
    case "aiozrc20/MsgConvertAIOZRC20":
      return MsgConvertAIOZRC20Types;
    default:
      throw new Error(`type '${type}' is not supported`);
  }
}
