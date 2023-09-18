import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';
import {Timestamp, arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../firebase';

const Input = ({dataDis}) => {
  const [text, setText] = useState('');

  const sendMessage = async () => {
    try {
      await updateDoc(doc(db, 'chats', dataDis.disscId), {
        messages: arrayUnion({
          id: uuid.v4(),
          text,
          senderId: dataDis.userData.uid,
          date: Timestamp.now(),
        }),
      });
      setText('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Your Message"
        style={styles.inputText}
        onChangeText={te => setText(te)}
        value={text}
      />
      <TouchableOpacity onPress={sendMessage}>
        <MaterialCommunityIcons name="send" color={'blue'} size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    width: '90%',
    marginRight: 8,
  },
});
