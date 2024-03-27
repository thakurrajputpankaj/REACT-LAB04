import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import firebase from '../firebase/firebaseConfig';

const db = firebase.database();

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionDate, setNewTransactionDate] = useState('');
  const [newTransactionCity, setNewTransactionCity] = useState('');
  const [newTransactionProvince, setNewTransactionProvince] = useState('');

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

  const addTransaction = () => {
  const newTransaction = {
    id: transactions.length + 1,
    name: newTransactionName,
    amount: newTransactionAmount,
    date: newTransactionDate,
    location: {
      city: newTransactionCity,
      province: newTransactionProvince
    }
  };

  db.ref('transactions/' + newTransaction.id).set(newTransaction);
  setModalVisible(false);
};


  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem} 
      onPress={() => navigation.navigate('TransactionDetailScreen', { transaction: item })}
    >
      <Text>{item.name}</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>${item.amount}</Text>
        <AntDesign name="right" size={20} color="#5F8CB9" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Transaction" onPress={() => setModalVisible(true)} />
      <FlatList 
        data={transactions} 
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setNewTransactionName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={text => setNewTransactionAmount(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              onChangeText={text => setNewTransactionDate(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              onChangeText={text => setNewTransactionCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Province"
              onChangeText={text => setNewTransactionProvince(text)}
            />
            <Button title="Add" onPress={addTransaction} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginRight: 10, 
    color : "#5F8CB9"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default TransactionsScreen;
