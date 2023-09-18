import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, storage, db} from '../../../firebase';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {useNavigation} from '@react-navigation/native';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setPhoto(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const registreFunc = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const response = await fetch(photo.path)
      const blob = await response.blob()
      const storageRef = ref(storage, name);

      const snapshot = await uploadBytesResumable(storageRef, blob);

      const userDocRef = doc(db, 'users', res.user.uid);
      const userDocData = {
        uid: res.user.uid,
        displayName: name,
        email: email,
        photoURL: await getDownloadURL(snapshot.ref),
      };
      await setDoc(userDocRef, userDocData);

      await updateProfile(res.user, {
        displayName: name,
        photoURL: userDocData.photoURL,
      });

      await setDoc(doc(db, 'userChats', res.user.uid), {});

      const userData = JSON.stringify({
        uid: res.user.uid,
        name,
        email,
        image: photo.path,
      });
      await AsyncStorage.setItem('user', userData);

      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        returnKeyType="next"
        onChangeText={setName}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
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
        onChangeText={setPassword}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {photo && (
          <View>
            <Image
              source={{uri: photo.path}}
              style={{width: 100, height: 100, borderRadius: 10000}}
            />
          </View>
        )}
        <Button onPress={handleChoosePhoto}>Choose Photo</Button>
      </View>

      <Button mode="contained" onPress={registreFunc}>
        Register
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
