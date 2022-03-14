import react from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingScreen from './app/screens/components/OnBoardingScreen';
// import SignUp from './app/screens/components/SignUp';
// import SignIn from './app/screens/components/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen}/>
        {/* <Stack.Screen name="SignUp" component={SignUp}/> */}
        {/* <Stack.Screen name="SignIn" component={SignIn}/> */}
      </Stack.Navigator>
    </NavigationContainer>
   )
  };

