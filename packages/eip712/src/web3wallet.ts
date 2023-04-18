/* eslint-disable @typescript-eslint/naming-convention */

import { ethAddressChecksum, hexToAddress, StdSignDoc } from "@cosmjs/amino";
import { Secp256k1 } from "@cosmjs/crypto";
import { fromHex } from "@cosmjs/encoding";
import Web3 from "web3";
import { AbstractProvider } from "web3-core";

import { getMsgTypes } from "./message-types";
import { AccountData, EIP712SignResponse, OfflineEIP712Signer } from "./signer";
import { eip712Hash, MessageTypes, SignTypedDataVersion, TypedMessage } from "./typed-data";
import { parseChainId, recoverPublicKey } from "./utils";

function generateEIP712(types: MessageTypes, chainId: number, message: any): TypedMessage<MessageTypes> {
  return {
    types,
    primaryType: "Tx",
    domain: {
      name: "Cosmos Web3",
      version: "1.0.0",
      chainId,
      verifyingContract: "cosmos",
      salt: "0",
    },
    message,
  };
}

function generateTypes(msgValues: Record<string, unknown>): MessageTypes {
  const types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "string" },
      { name: "salt", type: "string" },
    ],
    Tx: [
      { name: "account_number", type: "string" },
      { name: "chain_id", type: "string" },
      { name: "fee", type: "Fee" },
      { name: "memo", type: "string" },
      { name: "msgs", type: "Msg[]" },
      { name: "sequence", type: "string" },
    ],
    Fee: [
      { name: "payer", type: "string" },
      { name: "amount", type: "Coin[]" },
      { name: "gas", type: "string" },
    ],
    Coin: [
      { name: "denom", type: "string" },
      { name: "amount", type: "string" },
    ],
    Msg: [
      { name: "type", type: "string" },
      { name: "value", type: "MsgValue" },
    ],
  };
  Object.assign(types, msgValues);
  return types;
}

export class Web3Wallet implements OfflineEIP712Signer {
  private readonly web3: Web3;
  private readonly prefix: string;

  public constructor(web3: Web3, prefix = "aioz") {
    this.web3 = web3;
    this.prefix = prefix;
  }

  private async address(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return hexToAddress(accounts[0], this.prefix);
  }

  private async addressHex(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return ethAddressChecksum(accounts[0]);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    const accounts = await this.web3.eth.getAccounts();
    return accounts.map((hexAddr: string) => {
      return {
        address: hexToAddress(hexAddr, this.prefix),
        addressHex: ethAddressChecksum(hexAddr),
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public async signEIP712(address: string, signDoc: StdSignDoc): Promise<EIP712SignResponse> {
    if (address !== (await this.address())) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    if (signDoc.msgs.length == 0) {
      throw new Error(`msgs is empty`);
    }
    if (signDoc.msgs.length != 1) {
      throw new Error(`signing eip712 currently support only 1 tx message`);
    }

    (signDoc as any).fee.payer = await this.address();

    const from = await this.addressHex();
    const types = generateTypes(getMsgTypes(signDoc.msgs[0].type));
    const chainId = parseChainId(signDoc.chain_id).toNumber();
    const msgParams = generateEIP712(types, chainId, signDoc);
    const params = [from, JSON.stringify(msgParams)];
    const method = "eth_signTypedData_v4";
    const signature = await (this.web3.currentProvider as AbstractProvider).request?.({
      method,
      params,
      from,
    });

    const messageHash = eip712Hash(msgParams, SignTypedDataVersion.V4);
    const pubkey = recoverPublicKey(messageHash, signature);

    return {
      signed: signDoc,
      signature: fromHex(signature.slice(2)),
      pubkey: Secp256k1.compressPubkey(Buffer.concat([Buffer.from([4]), pubkey])),
    };
  }
}
