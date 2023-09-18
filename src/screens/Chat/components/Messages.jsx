import {StyleSheet, ScrollView, View, Image, Text} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../../../firebase';

const Messages = ({dataDis}) => {
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getData = () => {
      const unSub = onSnapshot(doc(db, 'chats', dataDis.disscId), doc => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    };

    dataDis.disscId && getData();
    scrollToBottom();
  }, [dataDis.disscId]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
    }
  };

  const fetchMessages = messages.map(message => {
    const styleMessage =
      message.senderId === dataDis.user.uid
        ? [styles.owner, styles.message]
        : styles.message;
    const image =
      message.senderId === dataDis.user.uid
        ? dataDis.userData.photoURL
        : dataDis.user.image;
    const content =
      message.senderId === dataDis.user.uid
        ? styles.contentOwner
        : styles.content;
    return (
      <View key={message.id} style={styleMessage}>
        <View style={content}>
          <Image
            style={styles.logo}
            source={{
              uri: image,
            }}
          />
          <View>
            <Text style={styles.mess}>{message.text}</Text>
            <Text style={styles.time}>
              {message.date.toDate().toDateString() +
                ' ' +
                message.date.toDate().toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      onContentSizeChange={scrollToBottom}>
      {fetchMessages}
    </ScrollView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
  },
  owner: {
    alignItems: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    gap: 10,
  },
  contentOwner: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  mess: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  time: {
    fontSize: 13,
  },
});
