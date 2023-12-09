// components/TransactionDetailsPage.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionDetailsPage = ({ transaction, navigateBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{`Transaction Details - ${transaction}`}</Text>
      <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
        <Text>Back to Groups</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default TransactionDetailsPage;
