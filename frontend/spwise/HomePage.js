import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, Image } from 'react-native';

const HomePage = ({ userInfo, groups, navigateToGroupDetails, navigateToTransactionDetails, createNewGroup }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  

  const handleCreateGroup = () => {
    if (newGroupName.trim() !== '') {
      createNewGroup(newGroupName.trim());
      setNewGroupName('');
      setIsModalVisible(false);
    }
  };

 
  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: userInfo.user.photo }} style={styles.profileImage} />
          <Text style={styles.userName}>{userInfo.user.name}</Text>
          <Text style={styles.userEmail}>{userInfo.user.email}</Text>
        </View>
      )}

     <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>


      <Text style={styles.heading}>Your Groups</Text>
      <ScrollView style={styles.groupList} contentContainerStyle={styles.groupListContent}>
        {groups.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={styles.groupButton}
            onPress={() => navigateToGroupDetails(group)}
          >
            <Text style={styles.groupButtonText}>{group}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.createGroupButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.createGroupButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Create a New Group</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter Group Name"
            value={newGroupName}
            onChangeText={(text) => setNewGroupName(text)}
          />
          <TouchableOpacity style={styles.modalCreateButton} onPress={handleCreateGroup}>
            <Text style={styles.createGroupButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalCancelButtonText}>Cancel</Text>
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
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop:90,
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  groupList: {
    flex: 1,
    width: '100%',
  },
  groupListContent: {
    alignItems: 'center',
  },
  groupButton: {
    backgroundColor: '#008080', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    width: '80%',
  },
  groupButtonText: {
    color: '#fff', 
    fontSize: 18,
  },
  createGroupButton: {
    backgroundColor: '#008080', 
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  createGroupButtonText: {
    color: '#fff', 
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  modalHeading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#333', 
  },
  modalCreateButton: {
    backgroundColor: '#3498db', 
    padding: 15,
    borderRadius:8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: '#e74c3c', 
    padding: 15,
    borderRadius:8,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    width: '60%',
    marginBottom:50
   
  },

  logoutButtonText: {
    color: '#fff', 
    fontSize: 18,
  },

});



export default HomePage;










