import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, ScrollView } from 'react-native';



const GroupDetailsPage = ({ group, navigateTotransactions, navigateBack }) => {
  const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false);
  const [transactionName, setTransactionName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [isChoosePayerModalVisible, setIsChoosePayerModalVisible] = useState(false);
  const [isChooseParticipantsModalVisible, setIsChooseParticipantsModalVisible] = useState(false);
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [transactions,setTransactions] = useState([]);
  const [participants,setParticipants] = useState([]); 
  const [balances,setBalances] = useState([]); 
  
  const handleCreateTransaction = () => {
    
    const createTransaction = (tranasctionobj) =>{
      const apiUrl = "https://8861-119-161-98-68.ngrok-free.app/create_transaction";

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionobj),
      })
    }
       
    

    createTransaction({
      name: transactionName,
      amount: transactionAmount,
      payer: selectedPayer,
      participants: selectedParticipants,
    })

    // Reset the form and close the modals
    setTransactionName('');
    setTransactionAmount('');
    setSelectedPayer(null);
    setSelectedParticipants([]);
    setIsTransactionModalVisible(false);
    setIsChoosePayerModalVisible(false);
    setIsChooseParticipantsModalVisible(false);
  };

  const handleChoosePayer = () => {
    setIsChoosePayerModalVisible(true);
  };

  const handleChooseParticipants = () => {
    setIsChooseParticipantsModalVisible(true);
  };

  const handleChooseParticipant = (participant) => {
    // Toggle the selection of a participant
    setSelectedParticipants((prevParticipants) => {
      const participantIndex = prevParticipants.findIndex((p) => p.id === participant.id);

      if (participantIndex !== -1) {
        return prevParticipants.filter((p) => p.id !== participant.id);
      } else {
        // Participant is not selected, add them
        return [...prevParticipants, participant];
      }
    });
  };

 

  return (
    <View style={styles.container}>


      <Text style={styles.heading}>{group} Transactions</Text>


      <View style={styles.balancesContainer}>
        {participants.map(participant => (
          <Text key={participant.id} style={styles.balanceText}>
            {participant.name} owes {balances[participant.id]}
          </Text>
        ))}
      </View>

     

      <ScrollView style={styles.transactionList} contentContainerStyle={styles.transactionListContent}>
             {transactions.map((transaction, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.transactionItem}
                  onPress={() => navigateTotransactions(transaction)}
                >
                  <Text style={styles.transactionItemText}>{transaction.name}</Text>
                </TouchableOpacity>
              ))}
       </ScrollView>


      <TouchableOpacity style={styles.goBackButton} onPress={navigateBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createTransactionButton} onPress={() => setIsTransactionModalVisible(true)}>
        <Text style={styles.buttonText}>Create Transaction</Text>
      </TouchableOpacity>

      
      <Modal visible={isChoosePayerModalVisible} animationType="slide" >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Choose Payer</Text>

          <FlatList
            data={participants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chooseParticipantButton, selectedPayer === item && styles.selectedParticipant]}
                onPress={() => setSelectedPayer(item)}
              >
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.modalButton} onPress={() => setIsChoosePayerModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      
      <Modal visible={isChooseParticipantsModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Choose Participants</Text>

          <FlatList
            data={participants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chooseParticipantButton, selectedParticipants.includes(item) && styles.selectedParticipant]}
                onPress={() => handleChooseParticipant(item)}
              >
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.modalButton} onPress={() => setIsChooseParticipantsModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

  
      <Modal visible={isTransactionModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Create Transaction</Text>

          <TextInput
            style={styles.input}
            placeholder="Transaction Name"
            value={transactionName}
            onChangeText={(text) => setTransactionName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Transaction Amount"
            value={transactionAmount}
            onChangeText={(text) => setTransactionAmount(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.choosePayerButton} onPress={handleChoosePayer}>
            <Text style={styles.buttonText}>Choose Payer: {selectedPayer ? selectedPayer.name : 'Not Selected'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chooseParticipantsButton} onPress={handleChooseParticipants}>
            <Text style={styles.buttonText}>Choose Participants: {selectedParticipants.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={handleCreateTransaction}>
            <Text style={styles.modalButtonText}>Create Transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={() => setIsTransactionModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:100,
    color: 'white',
    fontWeight: 'bold',
  },
     transactionItem: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        alignItems: 'center',
      },
      transactionItemText: {
        color: '#fff',
        fontSize: 18,
     },
  goBackButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  createTransactionButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalHeading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    width: '80%',
    color: 'white'
  },
  choosePayerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  chooseParticipantsButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  chooseParticipantButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedParticipant: {
    backgroundColor: '#4CAF50',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    width: '80%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  balancesContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop:10,
    marginBottom:20
  },
  balanceText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GroupDetailsPage; 