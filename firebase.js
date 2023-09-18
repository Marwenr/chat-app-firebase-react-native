import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyB0t6nPRooPdSinKFGvS51WtWSnME4Tqnc',
  authDomain: 'chat-app-react-native-ff453.firebaseapp.com',
  projectId: 'chat-app-react-native-ff453',
  storageBucket: 'chat-app-react-native-ff453.appspot.com',
  messagingSenderId: '94126856810',
  appId: '1:94126856810:web:cde5ff90a3fc5dcff48813',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
