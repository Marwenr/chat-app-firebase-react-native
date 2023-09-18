import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';

const Users = ({user, filteredData}) => {
  const allUsersChat =
    filteredData &&
    filteredData.map(userchat => (
      <View style={styles.users} key={userchat.uid}>
        <Image
          style={styles.logo}
          source={{
            uri: userchat.photoURL,
          }}
        />
      </View>
    ));

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.users}>
        {user && (
          <Image
            style={styles.logo}
            source={{
              uri: user.image,
            }}
          />
        )}
        <Text style={{textAlign: 'center'}}>{user.name}</Text>
      </View>
      {allUsersChat}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({
  users: {
    marginTop: 20,
    marginBottom: 30,
    marginRight: 8,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
