/* eslint-disable @typescript-eslint/naming-convention */
import { QueryClientImpl, QueryParamsResponse } from "cosmjs-types/aioz/staking/v1beta1/query";

import { createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface StakingExtension {
  readonly staking: {
    params: () => Promise<QueryParamsResponse>;
  };
}

export function setupStakingExtension(base: QueryClient): StakingExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    staking: {
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
    },
  };
}
