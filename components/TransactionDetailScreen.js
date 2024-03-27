import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailScreen = ({ route, navigation }) => {
  const { transaction } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Transaction Detail" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label4}>${transaction.amount}</Text>
        <Text style={styles.label}>{transaction.name}</Text>
        <Text style={styles.label}>{transaction.location.city}, {transaction.location.province}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.label2}>Transaction Date</Text>
        <Text style={styles.label3}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "#5F8CB9",
    padding : 20
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color : "white"
  },
  label2: {
    fontSize: 16,
    marginBottom: 10,
    color : "black",
    padding : 10
  },
  label3: {
    fontSize: 16,
    marginBottom: 10,
    color : "grey",
    padding : 10
  },
  label4: {
    fontSize: 25,
    marginBottom: 10,
    color : "white",
    fontWeight : "bold"
  },
});

export default TransactionDetailScreen;
