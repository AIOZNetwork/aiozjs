// window.process = Object.assign({}, window.process);

function show(a) {
  const e = document.createElement("pre");
  e.textContent = a;
  document.body.appendChild(e);
}

import { DirectEthSecp256k1HdWallet, DirectEthSecp256k1Wallet, Registry } from "@cosmjs/proto-signing";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import { Web3Wallet } from "@cosmjs/eip712";
import {
  SigningStargateClient,
  StargateClient,
  parseChainId,
  calculateFee,
  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { fromHex, toHex } from "@cosmjs/encoding";
import { addressToHex, hexToAddress } from "@cosmjs/amino";
import { MsgConvertCoin, MsgConvertAIOZRC20 } from "cosmjs-types/aioz/aiozrc20/v1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import Long from "long";

const converterABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "bytes32", name: "chainName", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "AIOZCancelSendToEvmChain",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "uint256", name: "channelId", type: "uint256" },
      { indexed: false, internalType: "string", name: "recipient", type: "string" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "bytes", name: "extraData", type: "bytes" },
    ],
    name: "AIOZSendToAccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "bytes32", name: "chainName", type: "bytes32" },
      { indexed: false, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "bridgeFee", type: "uint256" },
      { indexed: false, internalType: "bytes", name: "extraData", type: "bytes" },
    ],
    name: "AIOZSendToEvmChain",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "id", type: "uint256" }],
    name: "AIOZSendToEvmChainResponse",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "previousAdmin", type: "address" },
      { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "beacon", type: "address" }],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "implementation", type: "address" }],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "chainName", type: "bytes32" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "cancelSendToEvmChain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "initialize", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "channelId", type: "uint256" },
      { internalType: "string", name: "recipient", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "extraData", type: "bytes" },
    ],
    name: "sendToAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bytes32", name: "chainName", type: "bytes32" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "bridgeFee", type: "uint256" },
      { internalType: "bytes", name: "extraData", type: "bytes" },
    ],
    name: "sendToEvmChain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newImplementation", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
const erc20ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];
const waiozABI = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "dst", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "previousAdminRole", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "newAdminRole", type: "bytes32" },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      { indexed: true, internalType: "address", name: "account", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "src", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEPOSIT_AGENT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WITHDRAW_AGENT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "deposit", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "getRoleMember",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleMemberCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

async function main() {
  //const rpcEndpoint = "https://rpc-ds.testnet.aioz.network";
  const rpcEndpoint = "http://10.0.0.77:26657";
  // const rpcEndpoint = "http://157.245.144.55:26657";

  // const wallet1 = await DirectEthSecp256k1HdWallet.deserialize('{"type":"ethsecp256k1hdwallet-v1","kdf":{"algorithm":"argon2id","params":{"outputLength":32,"opsLimit":24,"memLimitKib":12288}},"encryption":{"algorithm":"xchacha20poly1305-ietf","params":null},"data":"oKFAFsGzIPUIfYVrxXinwQoyMEopU5K7YVFb4CfTE2u14/ed2O3phhfiS9U6uVNZBAhXbfHOIrrr7EWke6gVcTD1EzZJ/glIM3nbTM8CpsNwn6WnaCqYlFhlL57qGhPnvMJzz35RHFrA55H7IKkRNZ8gvy4trjnV5UDLcRWZKIZykl94npIs5iv4MY3PXJe48MJwjwoFyZ4scOVxiNRqAjLVi5ggeuN/FFBK/FU/fhe4AjpThs2krz90i3KwXOJbs6kPMnGeufcEThrEb44R6P+4l3dz/qyY+KaS7ciWfWCVxnZx6ip3ncy+xsFgBSK7Hxi2H5fwz7nUepDtwEoSwrzg6oxKXpZ5WDM="}', '12345678');
  // const [firstAccount1] = await wallet1.getAccounts();
  // show(firstAccount1.address);
  // show(firstAccount1.addressHex);
  // return;

  // const mnemonic = "federal injury annual melt near scan daughter before nut catalog spend decade";
  // const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'aioz'});
  // const [firstAccount] = await wallet.getAccounts();

  // const keyStore = await wallet.serialize('123123123');
  // show(keyStore);
  // show((await (await DirectEthSecp256k1HdWallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);

  // const hexPriv = "0FD4124E2F2FA7ECE4C8179E1E581FA6B63387881BA04ED3DAAAB4D126A76C73";
  // const wallet = await DirectEthSecp256k1Wallet.fromKey(fromHex(hexPriv));
  // window.ethereum.enable();
  // const wallet = new Web3Wallet(new Web3(window.ethereum));
  // const [firstAccount] = await wallet.getAccounts();

  const chainId = "testnet_11-1";
  const chainIdNumber = 11;
  await window.keplr.experimentalSuggestChain({
    chainId: chainId,
    chainName: "aioz-testnet-local",
    rpc: rpcEndpoint,
    rest: "http://10.0.0.77:1317",
    bip44: { coinType: 60 },
    bech32Config: {
      bech32PrefixAccAddr: "aioz",
      bech32PrefixAccPub: "aioz" + "pub",
      bech32PrefixValAddr: "aioz" + "valoper",
      bech32PrefixValPub: "aioz" + "valoperpub",
      bech32PrefixConsAddr: "aioz" + "valcons",
      bech32PrefixConsPub: "aioz" + "valconspub",
    },
    currencies: [
      { coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network" },
    ],
    feeCurrencies: [
      { coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network" },
    ],
    stakeCurrency: {
      coinDenom: "AIOZ",
      coinMinimalDenom: "attoaioz",
      coinDecimals: 18,
      coinGeckoId: "aioz-network",
    },
    coinType: 60,
    gasPriceStep: { low: 1000000000, average: 1000000000, high: 1000000000 },
    features: ["ibc-transfer", "stargate", "no-legacy-stdTx", "ibc-go", "eth-address-gen", "eth-key-sign"],
  });
  await window.keplr.enable(chainId);
  const wallet = window.keplr.getOfflineSigner(chainId);
  const [firstAccount] = await wallet.getAccounts();

  show(firstAccount.address);
  show(firstAccount.addressHex);

  // const keyStore = await wallet.serialize("123123123");

  // show(keyStore);

  // show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);
  // show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].addressHex);

  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {
    pubkeyAlgo: "eth_secp256k1",
  });

  const queryClient = client.getQueryClient();
  const { converterAddress } = await queryClient.aiozrc20.converterAddress();
  show("converter addresss: " + converterAddress);
  show("converter ABI: " + JSON.stringify(converterABI));

  // const cpChainId = "gaia0-1";
  // const cpRpcEndpoint = "http://10.0.0.77:27757";
  // const cpClient = await StargateClient.connect(cpRpcEndpoint);

  const recipient = "0x70207819eC28FB8cc692A4327C80282006E6476A";
  const ibcRecipient = "cosmos1davg4s96ulrya44njxgzdstlyau69fuvlyn2x4";
  const validator = "0xfFE6b1A63667c8c5BC4c804b898E20747C52C611";

  const amount = {
    denom: "attoaioz",
    amount: "1000000000000000000",
  };
  // const msg = {
  //   typeUrl: "/aioz.aiozrc20.v1.MsgConvertCoin",
  //   value: MsgConvertCoin.fromPartial({
  //     coin: amount,
  //     receiver: '0x9b595F28D783c587C48b3fFe58e0a3c7400d32F8',
  //     sender: firstAccount.address,
  //   }),
  // };
  // const msg = {
  //   typeUrl: "/aioz.aiozrc20.v1.MsgConvertAIOZRC20",
  //   value: MsgConvertAIOZRC20.fromPartial({
  //     contractAddress: '0x36D42b40018351cd30fC40744716CD8d374cc17a',
  //     amount: '50000000000000000000',
  //     receiver: hexToAddress('0x9b595F28D783c587C48b3fFe58e0a3c7400d32F8', client.prefix),
  //     sender: firstAccount.addressHex,
  //   }),
  // };

  // const msg = {
  //   typeUrl: "/cosmos.bank.v1beta1.MsgSend",
  //   value: MsgSend.fromPartial({
  //     fromAddress: firstAccount.address,
  //     toAddress: hexToAddress(recipient, client.prefix),
  //     amount: [amount],
  //   }),
  // };
  // const memo = "Use your power wisely";
  // const gasUsed = Math.trunc((await client.simulate(firstAccount.address, [msg], memo)) * 1.5);

  const waiozContract = new Contract(waiozABI, "0x7eb9e4642AD81C2Ebb5AeB61555c1526575d0393");
  const data0 = waiozContract.methods.deposit().encodeABI();
  const gasUsed0 = 100000;
  const txData0 = {
    data: data0,
    gasLimit: Web3.utils.numberToHex(gasUsed0),
    maxPriorityFeePerGas: Web3.utils.numberToHex(1000000000),
    maxFeePerGas: Web3.utils.numberToHex(1000000000),
    // nonce: '0x00',
    to: "0x7eb9e4642AD81C2Ebb5AeB61555c1526575d0393",
    value: Web3.utils.numberToHex("100000000000000000"),
    // v: "0x01",
    // r: "0xafb6e247b1c490e284053c87ab5f6b59e219d51f743f7a4d83e400782bc7e4b9",
    // s: "0x479a268e0e0acd4de3f1e28e4fac2a6b32a4195e8dfa9d19147abe8807aa6f64",
    chainId: Web3.utils.numberToHex(chainIdNumber),
    accessList: [],
    type: "0x02",
  };
  const memo0 = "";
  const result0 = await client.sendWrappedEthereumTx(firstAccount.address, txData0, "attoaioz", memo0);
  console.log(result0);

  const convertContract = new Contract(converterABI, converterAddress);
  const data = convertContract.methods
    .sendToAccount(
      "0x7eb9e4642AD81C2Ebb5AeB61555c1526575d0393",
      0,
      firstAccount.address,
      "100000000000000000",
      [],
    )
    .encodeABI();
  const gasUsed = 200000;

  const txData = {
    data: data,
    gasLimit: Web3.utils.numberToHex(gasUsed),
    maxPriorityFeePerGas: Web3.utils.numberToHex(1000000000),
    maxFeePerGas: Web3.utils.numberToHex(1000000000),
    // nonce: '0x00',
    to: converterAddress,
    value: Web3.utils.numberToHex("0"),
    // v: "0x01",
    // r: "0xafb6e247b1c490e284053c87ab5f6b59e219d51f743f7a4d83e400782bc7e4b9",
    // s: "0x479a268e0e0acd4de3f1e28e4fac2a6b32a4195e8dfa9d19147abe8807aa6f64",
    chainId: Web3.utils.numberToHex(chainIdNumber),
    accessList: [],
    type: "0x02",
  };
  const memo = "";

  const fee = calculateFee(gasUsed, "1000000000attoaioz");
  // const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, "Have fun with your star coins");
  // const cpHeight = await cpClient.getHeight();
  // const cpRevision = parseChainId(cpChainId);
  // const result = await client.sendIbcTokens(
  //   firstAccount.address,
  //   ibcRecipient,
  //   amount,
  //   'transfer',
  //   'channel-14',
  //   {
  //     revisionNumber: Long.fromNumber(cpRevision),
  //     revisionHeight: Long.fromNumber(cpHeight + 1000)
  //   },
  //   Math.trunc(Date.now()/1000) + 5000,
  //   fee,
  //   "send ibc",
  // )
  // const result = await client.delegateTokens(firstAccount.address, validator, amount, fee, "Have fun with your star coins");
  const result = await client.sendWrappedEthereumTx(firstAccount.address, txData, "attoaioz", memo);
  // const result = await client.signAndBroadcast(firstAccount.address, [msg], fee, memo);

  console.log(result);
}

// await keplrHandle();
await main();
