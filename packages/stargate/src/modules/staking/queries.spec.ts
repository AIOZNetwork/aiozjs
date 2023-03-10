/* eslint-disable @typescript-eslint/naming-convention */
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

import { QueryClient } from "../../queryclient";
import { pendingWithoutSimapp, simapp } from "../../testutils.spec";
import { setupStakingExtension, StakingExtension } from "./queries";

async function makeClientWithStaking(
  rpcUrl: string,
): Promise<[QueryClient & StakingExtension, Tendermint34Client]> {
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  return [QueryClient.withExtensions(tmClient, setupStakingExtension), tmClient];
}

describe("StakingExtension", () => {
  describe("params", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const [client, tmClient] = await makeClientWithStaking(simapp.tendermintUrl);

      const response = await client.staking.params();
      expect(response.params).toBeDefined();
      expect(response.params).not.toBeNull();

      tmClient.disconnect();
    });
  });
});
