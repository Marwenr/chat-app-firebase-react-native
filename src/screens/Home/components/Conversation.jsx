import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../../../firebase';

const Conversation = ({user, handleDissc}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', user.uid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const conversation = Object.entries(chats).map(chat => (
    <TouchableOpacity
      style={styles.chat}
      key={chat[0]}
      onPress={() =>
        handleDissc({disscId: chat[0], userData: chat[1].userInfo, user})
      }>
      <Image
        style={styles.logo}
        source={{
          uri: chat[1].userInfo.photoURL,
        }}
      />
      <View>
        <Text style={styles.name}>{chat[1].userInfo.displayName}</Text>
        <Text>last message</Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>{conversation}</ScrollView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
