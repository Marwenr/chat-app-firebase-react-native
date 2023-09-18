import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../firebase';
import {useNavigation} from '@react-navigation/native';
import Conversation from './components/Conversation';
import Users from './components/Users';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  const storeData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
        console.log(value);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    storeData();
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const colRef = collection(db, 'users');
    const snapshots = await getDocs(colRef);
    const allData = snapshots.docs.map(doc => doc.data());
    setUsers(allData);
  };

  const filteredData = users.filter(us => us.email !== user.email);

  const handleDissc = dataDis => {
    navigation.navigate('Chat', {dataDis});
  };

  return (
    <View style={styles.container}>
      <Users user={user} filteredData={filteredData} />
      <Conversation user={user} handleDissc={handleDissc} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
  },
});

export default HomeScreen;
