import BigNumber from 'bignumber.js';
import { Token } from './lib/token';
import { SwapSide } from './constants';

type Symbol = string;
type Address = string;
type AddressOrSymbol = Address | Symbol;
type PriceString = string;
type NumberAsString = string;

type NetworkID = 1 | 3 | 42 | 4;

const ETHER_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const UNLIMITED_ALLOWANCE = new BigNumber(2).pow(256).minus(1).toFixed();

type APIQuery = {
  [name: string]: string | number | boolean;
};

type DexConf = { exchange: string; targetExchange?: string };

type Adapters = {
  augustus: { exchange: Address };
  [adapter: string]: DexConf;
};

type Allowance = {
  tokenAddress: Address;
  allowance: string;
};

type APIError = {
  message: string;
  status?: number;
};

type Transaction = {
  from: Address;
  to: Address;
  value: string;
  data: string;
  chainId: number;
};

type Rate = {
  destAmount: PriceString;
  exchange: string;
  percent: NumberAsString;
  srcAmount: PriceString;
  data?: any;
};

type OthersRate = {
  exchange: string;
  rate: NumberAsString;
  unit: NumberAsString;
};

type OnChainOptimalRates = {
  amount: PriceString;
  bestRoute: Rate[];
  others?: OthersRate[];
};

type SimpleComputedRate = {
  exchange: string;
  rate: NumberAsString;
  slippage?: NumberAsString;
  unit?: NumberAsString;
  data?: any;
};

type SimpleComputedRateWithFee = {
  exchange: string;
  rateWithoutFee: NumberAsString;
  rate: NumberAsString;
  slippage?: NumberAsString;
  unitWithoutFee?: NumberAsString;
  unit?: NumberAsString;
  data?: any;
};

type OptimalRate = {
  exchange: string;
  address?: string;
  srcAmount: NumberAsString;
  destAmount: NumberAsString;
  percent: NumberAsString;
  rate?: NumberAsString;
  data?: any;
};

type OptimalRateWithFee = {
  exchange: string;
  address?: string;
  srcAmountWithoutFee?: NumberAsString;
  srcAmount: NumberAsString;
  destAmountWithoutFee: NumberAsString;
  destAmount: NumberAsString;
  percent: NumberAsString;
  rate?: NumberAsString;
  data?: any;
};

type OptimalRates = {
  destAmount: string;
  srcAmount: string;
  multiPath?: boolean;
  bestRoute: OptimalRate[];
  multiRoute?: OptimalRate[][];
  others: SimpleComputedRate[];
  fromUSD?: NumberAsString;
  toUSD?: NumberAsString;
  side: SwapSide;
  details?: {
    tokenFrom: string;
    tokenTo: string;
    connector?: string;
    srcAmount: NumberAsString;
  };
};

type OptimalRatesWithPartnerFees = {
  srcAmountWithoutFee?: string;
  srcAmount: string;
  destAmountWithoutFee: string;
  destAmount: string;
  multiPath?: boolean;
  bestRoute: OptimalRateWithFee[];
  multiRoute?: OptimalRateWithFee[][];
  others: SimpleComputedRateWithFee[];
  fromUSDWithoutFee?: NumberAsString;
  fromUSD?: NumberAsString;
  toUSDWithoutFee?: NumberAsString;
  toUSD?: NumberAsString;
  side: SwapSide;
  details?: {
    tokenFrom: string;
    tokenTo: string;
    connector?: string;
    srcAmount: NumberAsString;
  };
};

class User {
  constructor(
    public address: Address,
    public network: NetworkID = 1,
    public tokens?: Token[],
  ) {}
}

enum EXCHANGES {
  UNISWAP = 'Uniswap',
  KYBER = 'Kyber',
  BANCOR = 'Bancor',
  OASIS = 'Oasis',
  COMPOUND = 'Compound',
  BZX = 'Fulcrum',
  ZEROX = '0x',
  MakerDAO = 'MakerDAO',
  CHAI = 'Chai',
  PARASWAPPOOL = 'ParaSwapPool',
  AAVE = 'Aave',
  MULTIPATH = 'MultiPath',
  CURVE = 'Curve',
  BDAI = 'BDai',
  IDLE = 'idle',
  WETH = 'Weth',
  BETH = 'Beth',
  UNISWAPV2 = 'UniswapV2',
  BALANCER = 'Balancer',
  ZEROX_RFQT = '0xApi',
  PARASWAPPOOL2 = 'ParaSwapPool2',
  SUSHISWAP = 'SushiSwap',
  SYNTHETIX = 'Synthetix',
  SYNTHETIX_DEPOT = 'SynthetixDepot',
}

type RateOptions = {
  excludeDEXS?: string;
  includeDEXS?: string;
  includeMPDEXS?: string;
  excludeMPDEXS?: string;
};

type TransactionRoute = {
  exchange: Address;
  targetExchange: Address | undefined;
  percent: NumberAsString;
  payload: string;
  networkFee: NumberAsString;
};

type TransactionSellPath = {
  to: Address;
  totalNetworkFee: NumberAsString;
  routes: TransactionRoute[];
};

type TransactionBuyRoute = {
  exchange: Address;
  targetExchange: Address | undefined;
  fromAmount: PriceString;
  toAmount: PriceString;
  payload: string;
  networkFee: NumberAsString;
};

type TransactionBuyParams = {
  value: PriceString;
  fromToken: Address | undefined;
  toToken: Address | undefined;
  fromAmount: PriceString;
  toAmount: PriceString;
  expectedAmount: PriceString;
  route: TransactionBuyRoute[];
  mintPrice: PriceString;
  beneficiary: Address;
  donationBasisPoints: NumberAsString;
  referrer: Address;
};

type TransactionSellParams = {
  value: PriceString;
  fromToken: Address;
  toToken: Address;
  fromAmount: PriceString;
  toAmount: PriceString;
  expectedAmount: PriceString;
  path: TransactionSellPath[];
  mintPrice: PriceString;
  beneficiary: Address;
  donationPercentage: NumberAsString;
  referrer: Address;
};

type TransactionData = {
  from: Address;
  to: Address;
  data: string;
  chainId: number;
  value: PriceString;
  gasPrice?: PriceString;
  gas?: NumberAsString;
};

type BuildOptions = {
  ignoreChecks?: boolean;
  onlyParams?: boolean;
  simple?: boolean;
  gasPrice?: PriceString;
};

export {
  Symbol,
  Address,
  AddressOrSymbol,
  PriceString,
  NumberAsString,
  NetworkID,
  ETHER_ADDRESS,
  UNLIMITED_ALLOWANCE,
  APIQuery,
  DexConf,
  Adapters,
  Allowance,
  APIError,
  Transaction,
  Rate,
  OthersRate,
  OnChainOptimalRates,
  SimpleComputedRate,
  SimpleComputedRateWithFee,
  OptimalRate,
  OptimalRateWithFee,
  OptimalRates,
  OptimalRatesWithPartnerFees,
  User,
  EXCHANGES,
  RateOptions,
  TransactionRoute,
  TransactionSellPath,
  TransactionBuyRoute,
  TransactionBuyParams,
  TransactionSellParams,
  TransactionData,
  BuildOptions,
};
