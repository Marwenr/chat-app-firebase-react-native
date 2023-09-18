import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import LogoutButton from './src/components/LogoutButton';
import ChatScreen from './src/screens/Chat/ChatScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'Your App',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
