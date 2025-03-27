export interface Pair {
  info: {
    image: string;
    symbol: string;
    chain: string;
    address: string;
    tg?: string;
    x?: string;
  };
  created: Date;
  liquidity: {
    amount: number;
    amountUsd: number;
    differencePercentage: number;
  };
  initialLiquidity: {
    amount: number;
    amountUsd: number;
  };
  mktCap: {
    amountUsd: number;
    amount: number;
  };
  txns: {
    green: number;
    red: number;
  };
  vol: number;
  auditResults: {
    mintAuthDisabled: boolean;
    freezeAuthDisabled: boolean;
    top10Holders: boolean;
  };
  quickBuy?: {
    onClick: () => void;
  };
}

export interface MemescopeItem {
  symbol: string;
  name: string;
  address: string;
  tg?: string;
  x?: string;
  web?: string;
  top10Percent: number;
  created: Date;
  devHoldingsPercent: number;
  snipers: number;
  marketCap: number;
  volume: number;
  holders: number;
  bcprogress: number,
  image: string;
}

export interface History {
  token: string;
  tokens: number;
  trade_type: string;
  invested: number;
  chainSymbol: string;
  priceSOL: number;
  priceUSD: number;
  time: string;
  info: {
    address: string;
    amount: number;
  };
}

export interface Holding {
  token: string;
  invested: number;
  chainSymbol: string;
  remaining: {
    parent: number;
    token: number;
  };
  bought?: {
    parent: number;
    token: number;
  };
  sold?: {
    parent: number;
    token: number;
  };
  change: {
    percentage: number;
    amount: number;
  };
  type: "sold" | "bought";
}

export interface LeaderboardStats {
  ranking: number;
  tradingVol: number;
  totalPoints: number;
  traderRefs: number;
  weekPoints: number;
  shares: number;
}

export interface LeaderboardStats {
  ranking: number;
  tradingVol: number;
  totalPoints: number;
  traderRefs: number;
  weekPoints: number;
  shares: number;
}

export interface LeaderboardPlace {
  ranking: number;
  wallet: string;
  totalPoints: number;
  weekPoints: number;
}

export interface Task {
  title: string;
  points: number;
  desc: string;
  completed: boolean;
}

export interface HistoryEntry {
  date: Date;
  from: string;
  to: string;
  value: number;
  currency: string;
  txSig: string;
}

export interface HoldingStats {
  cumPnL: number | string;
  totalValue: number | string;
}

export interface TrendingStats {
  totalVol: number;
  timeframe: "24 hours" | "6 hours" | "hour" | "5 minutes";
  txns: number;
  latestBlock: { value: number; date: Date };
}

export interface ReferralsStats {
  referralsCount: number;
  totalEarningsSol: number;
  referralId: string;
  receiverWallet: string;
}

export interface Payout {
  payoutSol: number;
  date: Date;
  wallet: string;
}
