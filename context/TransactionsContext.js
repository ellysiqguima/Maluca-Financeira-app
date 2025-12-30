import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pm_finance_data';

const defaultTransactions = [
  {
    id: 't1',
    type: 'income',
    description: 'Vendas',
    category: 'Receita',
    amount: 150,
    date: '2024-04-21',
  },
  {
    id: 't2',
    type: 'expense',
    description: 'Contas',
    category: 'Fixas',
    amount: 120,
    date: '2024-04-22',
  },
  {
    id: 't3',
    type: 'expense',
    description: 'Ingredientes',
    category: 'Custo',
    amount: 50,
    date: '2024-04-23',
  },
  {
    id: 't4',
    type: 'income',
    description: 'Vendas',
    category: 'Receita',
    amount: 100,
    date: '2024-04-24',
  },
];

const TransactionsContext = createContext(undefined);

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTransactions(JSON.parse(stored));
        } else {
          setTransactions(defaultTransactions);
        }
      } catch (error) {
        console.warn('Erro ao carregar dados:', error);
        setTransactions(defaultTransactions);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)).catch((err) =>
        console.warn('Erro ao salvar dados:', err)
      );
    }
  }, [transactions, loading]);

  const addTransaction = (entry) => {
    setTransactions((prev) => [
      {
        id: `${Date.now()}`,
        ...entry,
      },
      ...prev,
    ]);
  };

  const resetData = async () => {
    setTransactions(defaultTransactions);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Erro ao limpar dados:', error);
    }
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    return {
      income,
      expense,
      balance: income - expense,
      progress: income > 0 ? Math.min(expense / income, 1) : 0,
    };
  }, [transactions]);

  const value = {
    loading,
    transactions,
    addTransaction,
    totals,
    resetData,
  };

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de TransactionsProvider');
  }
  return context;
};
