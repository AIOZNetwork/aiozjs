// window.process = Object.assign({}, window.process);

function show(a) {
  let t = document.createElement('pre');
  t.textContent = a;
  document.body.appendChild(t);
}

import { DirectEthSecp256k1HdWallet } from "@cosmjs/proto-signing";
import Web3 from "web3";
import { Web3Wallet } from "@cosmjs/eip712";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient, calculateFee } from "@cosmjs/stargate";
import { fromHex } from "@cosmjs/encoding";
import { hexToAddress } from "@cosmjs/amino";
import { MsgConvertCoin, MsgConvertAIOZRC20 } from "cosmjs-types/aioz/aiozrc20/v1/tx";

// const keplrHandle = async () => {
//   const chainId = "testnet_2-1";
//   const rpc = "http://10.0.0.77:26657";
//   await window.keplr.experimentalSuggestChain({
//     chainId: chainId,
//     chainName: "aioz-testnet",
//     rpc: rpc,
//     rest: "http://10.0.0.77:1317",
//     bip44: { coinType: 60 },
//     bech32Config: { bech32PrefixAccAddr: "aioz", bech32PrefixAccPub: "aioz" + "pub", bech32PrefixValAddr: "aioz" + "valoper", bech32PrefixValPub: "aioz" + "valoperpub", bech32PrefixConsAddr: "aioz" + "valcons", bech32PrefixConsPub: "aioz" + "valconspub" },
//     currencies: [{ coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },],
//     feeCurrencies: [{ coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },],
//     stakeCurrency: { coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },
//     coinType: 60,
//     gasPriceStep: { low: 1000000000, average: 1000000000, high: 1000000000, },
//     features: ["ibc-transfer", "stargate", "no-legacy-stdTx", "ibc-go"],
//   });

//   await window.keplr.enable(chainId);

//   const offlineSigner = window.keplr.getOfflineSigner(chainId);
//   const accounts = await offlineSigner.getAccounts();

//   const client = await SigningStargateClient.connectWithSigner(
//     rpc,
//     offlineSigner
//   )

//   const amount = {
//     denom: "attoaioz",
//     amount: "1000000000000000000",
//   };
//   const fee = calculateFee(5500000, "1000000000attoaioz");
//   const result = await client.signAndBroadcast(accounts[0].address, [msgConvertCoin], fee, "test keplr")
//   assertIsBroadcastTxSuccess(result)

//   if (result.code !== undefined &&
//     result.code !== 0) {
//     alert("Failed to send tx: " + result.log || result.rawLog);
//   } else {
//     alert("Succeed to send tx:" + result.transactionHash);
//   }
// }



async function main() {
  // const wallet1 = await DirectEthSecp256k1HdWallet.deserialize('{"type":"ethsecp256k1hdwallet-v1","kdf":{"algorithm":"argon2id","params":{"outputLength":32,"opsLimit":24,"memLimitKib":12288}},"encryption":{"algorithm":"xchacha20poly1305-ietf","params":null},"data":"oKFAFsGzIPUIfYVrxXinwQoyMEopU5K7YVFb4CfTE2u14/ed2O3phhfiS9U6uVNZBAhXbfHOIrrr7EWke6gVcTD1EzZJ/glIM3nbTM8CpsNwn6WnaCqYlFhlL57qGhPnvMJzz35RHFrA55H7IKkRNZ8gvy4trjnV5UDLcRWZKIZykl94npIs5iv4MY3PXJe48MJwjwoFyZ4scOVxiNRqAjLVi5ggeuN/FFBK/FU/fhe4AjpThs2krz90i3KwXOJbs6kPMnGeufcEThrEb44R6P+4l3dz/qyY+KaS7ciWfWCVxnZx6ip3ncy+xsFgBSK7Hxi2H5fwz7nUepDtwEoSwrzg6oxKXpZ5WDM="}', '12345678');
  // const [firstAccount1] = await wallet1.getAccounts();
  // show(firstAccount1.address);
  // show(firstAccount1.addressHex);
  // return;


  const mnemonic = "federal injury annual melt near scan daughter before nut catalog spend decade";
  // const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'aioz'});
  // const [firstAccount] = await wallet.getAccounts();

  // const keyStore = await wallet.serialize('123123123');
  // show(keyStore);
  // show((await (await DirectEthSecp256k1HdWallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);


  // const hexPriv = "1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db";
  // const wallet = await DirectEthSecp256k1Wallet.fromKey(fromHex(hexPriv));
  // const wallet = new Web3Wallet(new Web3(window.ethereum));
  // const [firstAccount] = await wallet.getAccounts();

  const chainId = "testnet_2-1";
  await window.keplr.experimentalSuggestChain({
    chainId: chainId,
    chainName: "aioz-testnet",
    rpc: "http://10.0.0.77:56657",
    rest: "http://10.0.0.77:51317",
    bip44: { coinType: 60 },
    bech32Config: { bech32PrefixAccAddr: "aioz", bech32PrefixAccPub: "aioz" + "pub", bech32PrefixValAddr: "aioz" + "valoper", bech32PrefixValPub: "aioz" + "valoperpub", bech32PrefixConsAddr: "aioz" + "valcons", bech32PrefixConsPub: "aioz" + "valconspub" },
    currencies: [{ coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },],
    feeCurrencies: [{ coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },],
    stakeCurrency: { coinDenom: "AIOZ", coinMinimalDenom: "attoaioz", coinDecimals: 18, coinGeckoId: "aioz-network", },
    coinType: 60,
    gasPriceStep: { low: 1000000000, average: 1000000000, high: 1000000000, },
    features: ["ibc-transfer", "stargate", "no-legacy-stdTx", "ibc-go", "eth-address-gen", "eth-key-sign"],
  });
  await window.keplr.enable(chainId);
  const wallet = window.keplr.getOfflineSigner(chainId);
  const [firstAccount] = await wallet.getAccounts();


  show(firstAccount.address);
  show(firstAccount.addressHex);

  // const keyStore = await wallet.serialize('123123123');

  // show(keyStore);

  // show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);
  // show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].addressHex);

  //const rpcEndpoint = "https://rpc-ds.testnet.aioz.network";
  const rpcEndpoint = "http://10.0.0.77:56657";
  // const rpcEndpoint = "http://157.245.144.55:26657";
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, {pubkeyAlgo: 'eth_secp256k1'});

  const recipient = "0x70207819eC28FB8cc692A4327C80282006E6476A";
  const ibcRecipient = "cosmos1davg4s96ulrya44njxgzdstlyau69fuvlyn2x4";
  const validator = "0xfFE6b1A63667c8c5BC4c804b898E20747C52C611";

  const amount = {
    denom: "attoaioz",
    amount: "1000000000000000000000000000000000000",
  };
  // const msg = {
  //   typeUrl: "/aioz.aiozrc20.v1.MsgConvertCoin",
  //   value: MsgConvertCoin.fromPartial({
  //     coin: amount,
  //     receiver: '0x9b595F28D783c587C48b3fFe58e0a3c7400d32F8',
  //     sender: firstAccount.address,
  //   }),
  // };
  const msg = {
    typeUrl: "/aioz.aiozrc20.v1.MsgConvertAIOZRC20",
    value: MsgConvertAIOZRC20.fromPartial({
      contractAddress: '0x36D42b40018351cd30fC40744716CD8d374cc17a',
      amount: '50000000000000000000',
      receiver: hexToAddress('0x9b595F28D783c587C48b3fFe58e0a3c7400d32F8', client.prefix),
      sender: firstAccount.addressHex,
    }),
  };
  const fee = calculateFee(200000, "1000000000attoaioz");
  const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, "Have fun with your star coins");
  // const result = await client.sendIbcTokens(
  //   firstAccount.address,
  //   ibcRecipient,
  //   amount,
  //   'transfer',
  //   'channel-8',
  //   0,
  //   Math.trunc(Date.now()/1000) + 5000,
  //   fee,
  //   "send ibc",
  // )
  // const result = await client.delegateTokens(firstAccount.address, validator, amount, fee, "Have fun with your star coins");
  // const result = await client.signAndBroadcast(firstAccount.address, [msg], fee, "Have fun with your star coins");
  console.log(result)
  assertIsBroadcastTxSuccess(result);
}

// await keplrHandle();
await main();