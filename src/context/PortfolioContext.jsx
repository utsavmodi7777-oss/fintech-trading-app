
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getPortfolio, buyStock as apiBuyStock, sellStock as apiSellStock } from '../api/portfolio';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState({
    balance: 0,
    investments: [],
    watchlist: [],
    transactionHistory: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch portfolio from backend
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPortfolio();
      setPortfolio({
        balance: data.balance,
        investments: data.investments,
        watchlist: data.watchlist || [],
        transactionHistory: data.transactionHistory || [],
      });
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchPortfolio();
    }
  }, [user, fetchPortfolio]);

  // Buy stock via backend
  const buyStock = useCallback(async (symbol, quantity, price) => {
    setIsLoading(true);
    try {
      await apiBuyStock(symbol, quantity, price);
      await fetchPortfolio();
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  }, [fetchPortfolio]);

  // Sell stock via backend
  const sellStock = useCallback(async (symbol, quantity, price) => {
    setIsLoading(true);
    try {
      await apiSellStock(symbol, quantity, price);
      await fetchPortfolio();
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  }, [fetchPortfolio]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        buyStock,
        sellStock,
        isLoading,
        fetchPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = React.useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
