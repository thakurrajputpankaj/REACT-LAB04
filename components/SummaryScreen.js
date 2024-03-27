import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../firebase/firebaseConfig';

const db = firebase.database();

const SummaryScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactionsRef = db.ref('transactions');
    const handleData = (snapshot) => {
      const transactionsData = snapshot.val();
      if (transactionsData) {
        setTransactions(Object.values(transactionsData));
      } else {
        setTransactions([]);
      }
    };

    transactionsRef.on('value', handleData);

    return () => {
      transactionsRef.off('value', handleData);
    };
  }, []);

  const numberOfTransactions = transactions.length;

  const balance = transactions.reduce((total, transaction) => total + parseFloat(transaction.amount || 0), 0).toFixed(2);

  const highSpendingTitle = 'High Spending';
  const lowSpendingTitle = 'Low Spending';

  const highestSpendingTransaction = transactions.reduce((max, transaction) => parseFloat(transaction.amount || 0) > parseFloat(max.amount || 0) ? transaction : max, transactions[0]);

  const lowestSpendingTransaction = transactions.reduce((min, transaction) => parseFloat(transaction.amount || 0) < parseFloat(min.amount || 0) ? transaction : min, transactions[0]);

  const highSpendingBalance = highestSpendingTransaction ? highestSpendingTransaction.amount : 0;
  const lowSpendingBalance = lowestSpendingTransaction ? lowestSpendingTransaction.amount : 0;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Transactions</Text>
        <Text style={styles.value}>{numberOfTransactions}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.value}>${balance}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{highSpendingTitle}</Text>
        <View style={styles.itemContainer}>
          <Text>{highestSpendingTransaction ? highestSpendingTransaction.name : 'N/A'}</Text>
          <Text style={styles.highSpendingBalance}>${highSpendingBalance}</Text>
        </View>
      </View>
       <View>
        <Text style={styles.subtitle}>{lowSpendingTitle}</Text>
        <View style={styles.itemContainer}>
          <Text>{lowestSpendingTransaction ? lowestSpendingTransaction.name : 'N/A'}</Text>
          <Text style={styles.highSpendingBalance}>${lowSpendingBalance}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: 'grey'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#5F8CB9'
  },
  highSpendingBalance: {
    fontSize: 16,
    color: 'grey'
  },
});

export default SummaryScreen;
