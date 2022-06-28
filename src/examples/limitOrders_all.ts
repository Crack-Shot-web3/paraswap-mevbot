/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { ethers } from 'ethers';
import {
  // swap methods
  constructPartialSDK,
  constructEthersContractCaller,
  constructAxiosFetcher,
  // limitOrders methods
  constructAllLimitOrdersHandlers,
  // extra types
  LimitOrderFromApi,
} from '..';

const account = '0x1234...';

const fetcher = constructAxiosFetcher(axios);

// provider must have write access to account
// this would usually be wallet provider (Metamask)
const provider = ethers.getDefaultProvider(1);
const contractCaller = constructEthersContractCaller(
  {
    ethersProviderOrSigner: provider,
    EthersContract: ethers.Contract,
  },
  account
);

// type BuildLimitOrderFunctions
// & SignLimitOrderFunctions
// & CancelLimitOrderFunctions<ethers.ContractTransaction>
// & ApproveTokenFunctions<ethers.ContractTransaction>
const paraSwapLimitOrderSDK = constructPartialSDK(
  {
    chainId: 1,
    fetcher,
    contractCaller,
  },
  constructAllLimitOrdersHandlers
);

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const HEX = '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39';

const orderInput = {
  nonce: 1,
  expiry: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // week from now, in sec
  makerAsset: DAI,
  takerAsset: HEX,
  makerAmount: (1e18).toString(10),
  takerAmount: (8e18).toString(10),
  maker: account,
};

async function run() {
  // approve token for the limit order
  const tx1: ethers.ContractTransaction =
    await paraSwapLimitOrderSDK.approveMakerTokenForLimitOrder(
      orderInput.makerAmount,
      orderInput.makerAsset
    );

  // builds + signs + posts order to API
  // new limit order returned from API
  const newLimitOrder: LimitOrderFromApi =
    await paraSwapLimitOrderSDK.submitLimitOrder(orderInput);

  // to act as order taker
  const anotherAccount = '0x5678...';

  const paraswapLimitOrdersSDKForTaker = constructPartialSDK(
    {
      chainId: 1,
      fetcher,
      contractCaller: constructEthersContractCaller(
        {
          ethersProviderOrSigner: provider,
          EthersContract: ethers.Contract,
        },
        anotherAccount
      ),
    },
    constructAllLimitOrdersHandlers
  );

  const tx2: ethers.ContractTransaction =
    await paraswapLimitOrdersSDKForTaker.approveTakerTokenForLimitOrder(
      orderInput.takerAmount,
      orderInput.takerAsset
    );

  const tx3: ethers.ContractTransaction =
    await paraswapLimitOrdersSDKForTaker.fillDirectLimitOrder({
      orderData: newLimitOrder,
      signature: newLimitOrder.signature,
    });
}
