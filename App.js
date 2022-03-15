import react from 'react';
import OnBoardingScreen from './app/screens/components/OnBoardingScreen';
import SignUp from './app/screens/components/SignUp';
import SignIn from './app/screens/components/SignIn';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function App() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn}/>
      </Stack.Navigator>
   )
  };

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

