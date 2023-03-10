/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryClientImpl,
  QueryDenomToERC20Response,
  QueryERC20ToDenomResponse,
  QueryParamsResponse,
  QueryPendingIbcAutoForwardsResponse,
  QueryPendingSendToEvmChainResponse,
} from "cosmjs-types/gravity/v1/query";

import { createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface GravityExtension {
  readonly gravity: {
    readonly params: () => Promise<QueryParamsResponse>;
    readonly erc20ToDenom: (chainName: string, erc20: string) => Promise<QueryERC20ToDenomResponse>;
    readonly denomToErc20: (chainName: string, denom: string) => Promise<QueryDenomToERC20Response>;
    readonly pendingSendToEvmChain: (
      chainName: string,
      sender: string,
    ) => Promise<QueryPendingSendToEvmChainResponse>;
    readonly pendingIbcAutoForwards: (limit: Long) => Promise<QueryPendingIbcAutoForwardsResponse>;
  };
}

export function setupGravityExtension(base: QueryClient): GravityExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    gravity: {
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
      erc20ToDenom: async (chainName: string, erc20: string) => {
        const response = await queryService.ERC20ToDenom({ chainName: chainName, erc20: erc20 });
        return response;
      },
      denomToErc20: async (chainName: string, denom: string) => {
        const response = await queryService.DenomToERC20({ chainName: chainName, denom: denom });
        return response;
      },
      pendingSendToEvmChain: async (chainName: string, sender: string) => {
        const response = await queryService.GetPendingSendToEvmChain({
          chainName: chainName,
          senderAddress: sender,
        });
        return response;
      },
      pendingIbcAutoForwards: async (limit: Long) => {
        const response = await queryService.GetPendingIbcAutoForwards({ limit: limit });
        return response;
      },
    },
  };
}
