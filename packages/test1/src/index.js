window.process = Object.assign({}, window.process);

function show(a) {
  let t = document.createElement('pre');
  t.textContent = a;
  document.body.appendChild(t);
}

import { DirectEthSecp256k1Wallet } from "@cosmjs/proto-signing";
import Web3 from "web3";
import { Web3Wallet } from "@cosmjs/eip712";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient, calculateFee } from "@cosmjs/stargate";
import { fromHex } from "@cosmjs/encoding";


// const mnemonic = "federal injury annual melt near scan daughter before nut catalog spend decade";
// const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'aioz'});
// const [firstAccount] = await wallet.getAccounts();

// show(firstAccount.address);

// const keyStore = await wallet.serialize('123123123');

// show(keyStore);

// show((await (await DirectEthSecp256k1HdWallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);


// const hexPriv = "1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db";
// const wallet = await DirectEthSecp256k1Wallet.fromKey(fromHex(hexPriv));
const wallet = new Web3Wallet(new Web3(window.ethereum));
const [firstAccount] = await wallet.getAccounts();

show(firstAccount.address);
show(firstAccount.addressHex);

// const keyStore = await wallet.serialize('123123123');

// show(keyStore);

// show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);
// show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].addressHex);

//const rpcEndpoint = "https://rpc-ds.testnet.aioz.network";
const rpcEndpoint = "http://10.0.0.77:26657";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

const recipient = "0x70207819eC28FB8cc692A4327C80282006E6476A";
const validator = "0xc9fA7046d2A898180Be8D8Dd5227591Db9298823";

const amount = {
denom: "attoaioz",
amount: "1000000000000000000",
};
const fee = calculateFee(200000, "1000000000attoaioz");
// const result = await client.sendTokens(firstAccount.address, recipient, amount, fee, "Have fun with your star coins");
const result = await client.delegateTokens(firstAccount.address, validator, amount, fee, "Have fun with your star coins");
console.log(result)
assertIsBroadcastTxSuccess(result);

