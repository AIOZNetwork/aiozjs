/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryClientImpl,
  QueryConverterAddressResponse,
  QueryParamsResponse,
  QueryTokenPairResponse,
  QueryTokenPairsResponse,
} from "cosmjs-types/aioz/aiozrc20/v1/query";

import { createPagination, createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface Aiozrc20Extension {
  readonly aiozrc20: {
    readonly converterAddress: () => Promise<QueryConverterAddressResponse>;
    readonly tokenPairs: (paginationKey?: Uint8Array) => Promise<QueryTokenPairsResponse>;
    readonly tokenPair: (token: string) => Promise<QueryTokenPairResponse>;
    readonly params: () => Promise<QueryParamsResponse>;
  };
}

export function setupAiozrc20Extension(base: QueryClient): Aiozrc20Extension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    aiozrc20: {
      converterAddress: async () => {
        const response = await queryService.ConverterAddress({});
        return response;
      },
      tokenPairs: async (paginationKey?: Uint8Array) => {
        const response = await queryService.TokenPairs({
          pagination: createPagination(paginationKey),
        });
        return response;
      },
      tokenPair: async (token: string) => {
        const response = await queryService.TokenPair({ token: token });
        return response;
      },
      params: async () => {
        const response = await queryService.Params({});
        return response;
      },
    },
  };
}
