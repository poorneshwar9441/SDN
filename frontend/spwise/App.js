// export default App;
import React, { useState } from 'react';
import HomePage from './HomePage';
import GroupDetailsPage from './GroupDetails';
import TransactionDetailsPage from './TransactionDetails';
import LoginPage from './Login';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Login');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [groups, setGroups] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigateToGroupDetails = (group) => {
    setSelectedGroup(group);
    setCurrentPage('GroupDetails');
  };

  const navigateToTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setCurrentPage('TransactionDetails');
  };

  const navigateBack = () => {
    setCurrentPage('Home');
  };

  const navigateToHome = (user) => {
    setUserInfo(user);
    setCurrentPage('Home');
  };

  const createNewGroup = (groupName) => {
    // Update the list of groups
    setGroups([...groups, groupName]);
  };

  return (
    <React.Fragment>
      {currentPage === 'Login' && (
        <LoginPage navigateToHome={navigateToHome} />
      )}

      {currentPage === 'Home' && (
        <HomePage
          userInfo={userInfo}
          groups={groups}
          navigateToGroupDetails={navigateToGroupDetails}
          navigateToTransactionDetails={navigateToTransactionDetails}
          createNewGroup={createNewGroup}
        />
      )}

      {currentPage === 'GroupDetails' && (
        <GroupDetailsPage
          group={selectedGroup}
          navigateToTransactionDetails={navigateToTransactionDetails}
          navigateBack={navigateBack}
        />
      )}

      {currentPage === 'TransactionDetails' && (
        <TransactionDetailsPage
          transaction={selectedTransaction}
          navigateBack={navigateBack}
        />
      )}
    </React.Fragment>
  );
};

export default App;










