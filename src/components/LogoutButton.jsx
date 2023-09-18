import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {theme} from '../core/theme';

const LogoutButton = ({navigation}) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text
        style={{color: theme.colors.error, fontWeight: 'bold', fontSize: 18}}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
