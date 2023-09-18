import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Input from './components/Input';
import Messages from './components/Messages';

const ChatScreen = () => {
  const route = useRoute();
  const {dataDis} = route.params;

  return (
    <View style={styles.container}>
      <Messages dataDis={dataDis} />
      <Input dataDis={dataDis} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    height: '95%',
  },
});
