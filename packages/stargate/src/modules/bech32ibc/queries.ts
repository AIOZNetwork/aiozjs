/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryClientImpl,
  QueryHrpIbcRecordResponse,
  QueryHrpIbcRecordsResponse,
  QueryNativeHrpResponse,
} from "cosmjs-types/bech32ibc/v1beta1/query";

import { createProtobufRpcClient, QueryClient } from "../../queryclient";

export interface Bech32ibcExtension {
  readonly bech32ibc: {
    readonly hrpIbcRecords: () => Promise<QueryHrpIbcRecordsResponse>;
    readonly hrpIbcRecord: (hrp: string) => Promise<QueryHrpIbcRecordResponse>;
    readonly nativeHrp: () => Promise<QueryNativeHrpResponse>;
  };
}

export function setupBech32ibcExtension(base: QueryClient): Bech32ibcExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    bech32ibc: {
      hrpIbcRecords: async () => {
        const response = await queryService.HrpIbcRecords({});
        return response;
      },
      hrpIbcRecord: async (hrp: string) => {
        const response = await queryService.HrpIbcRecord({ hrp: hrp });
        return response;
      },
      nativeHrp: async () => {
        const response = await queryService.NativeHrp({});
        return response;
      },
    },
  };
}
