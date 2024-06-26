use super::CoinType;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ChainId {
    Ethereum,
    Polygon,
    Optimism,
    Arbitrum,
    Gnosis,
    BinanceSmartChain,
    Avalanche,
    Fantom,
    Celo,
    Moonbeam,
    Other(u64),
}

impl ChainId {
    pub fn as_chain_id(&self) -> u64 {
        match self {
            Self::Ethereum => 1,
            Self::Optimism => 10,
            Self::BinanceSmartChain => 56,
            Self::Gnosis => 100,
            Self::Polygon => 137,
            Self::Fantom => 250,
            Self::Moonbeam => 1287,
            Self::Arbitrum => 42161,
            Self::Avalanche => 43114,
            Self::Celo => 42220,
            Self::Other(id) => id.to_owned(),
        }
    }

    pub fn as_ensip11(&self) -> u64 {
        self.as_chain_id() | 0x8000_0000
    }
}

impl From<ChainId> for CoinType {
    fn from(val: ChainId) -> Self {
        Self::Evm(val)
    }
}

impl ToString for ChainId {
    fn to_string(&self) -> String {
        match self {
            ChainId::Ethereum => "eth".to_string(),
            ChainId::Optimism => "optimism".to_string(),
            ChainId::BinanceSmartChain => "bsc".to_string(),
            ChainId::Gnosis => "gnosis".to_string(),
            ChainId::Polygon => "polygon".to_string(),
            ChainId::Fantom => "fantom".to_string(),
            ChainId::Moonbeam => "moonbeam".to_string(),
            ChainId::Arbitrum => "arbitrum".to_string(),
            ChainId::Avalanche => "avalanche".to_string(),
            ChainId::Celo => "celo".to_string(),
            ChainId::Other(id) => format!("SLIP44:{}", id),
        }
    }
}
