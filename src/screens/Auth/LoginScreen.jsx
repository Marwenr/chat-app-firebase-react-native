import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebase';
import {useNavigation} from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginFunc = async () => {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);

      const userData = JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      if (user) {
        await AsyncStorage.setItem('user', userData);
      }
      navigation.navigate('Home');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: theme.colors.error}}>{error}</Text>
      <Button mode="contained" onPress={loginFunc}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: '#414757',
  },
  link: {
    fontWeight: 'bold',
    color: '#560CCE',
  },
});
