function show(a) {
    let t = document.createElement('pre');
    t.textContent = a;
    document.body.appendChild(t);
}

import { DirectEthSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient, calculateFee } from "@cosmjs/stargate";

const mnemonic = "federal injury annual melt near scan daughter before nut catalog spend decade";
const wallet = await DirectEthSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'aioz'});
const [firstAccount] = await wallet.getAccounts();

show(firstAccount.address);

const rpcEndpoint = "http://10.0.0.77:16657";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

const recipient = "0x2d8C4f1b322Fb51C7b0C10EE266074b28925383E";
const amount = {
  denom: "atoz",
  amount: "1234567",
};
const fee = calculateFee(80000, "0atoz");
const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);