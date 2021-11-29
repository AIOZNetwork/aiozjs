function show(a) {
    let t = document.createElement('pre');
    t.textContent = a;
    document.body.appendChild(t);
}

import { DirectEthSecp256k1Wallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient, calculateFee } from "@cosmjs/stargate";
import { fromHex } from "@cosmjs/encoding";


// const mnemonic = "federal injury annual melt near scan daughter before nut catalog spend decade";
// const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'aioz'});
// const [firstAccount] = await wallet.getAccounts();

// show(firstAccount.address);

// const keyStore = await wallet.serialize('123123123');

// show(keyStore);

// show((await (await DirectEthSecp256k1HdWallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);


const hexPriv = "1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db";
const wallet = await DirectEthSecp256k1Wallet.fromKey(fromHex(hexPriv));
const [firstAccount] = await wallet.getAccounts();

show(firstAccount.address);
show(firstAccount.addressHex);

const keyStore = await wallet.serialize('123123123');

show(keyStore);

show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].address);
show((await (await DirectEthSecp256k1Wallet.deserialize(keyStore, '123123123')).getAccounts())[0].addressHex);

const rpcEndpoint = "http://10.0.0.77:46657";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

const recipient = "0x2d8C4f1b322Fb51C7b0C10EE266074b28925383E";
const amount = {
  denom: "attoaioz",
  amount: "1234567",
};
const fee = calculateFee(200000, "1000000000attoaioz");
const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);