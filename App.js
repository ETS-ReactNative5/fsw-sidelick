import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import OnBoardingScreen from "./app/screens/components/OnBoardingScreen";
import SignIn from "./app/screens/components/SignIn";
import SignUp from "./app/screens/components/SignUp";
import Tabs from "./app/Routes/Tabs";
import WalkerProfile from "./app/screens/components/WalkerProfile";
import EditProfile from "./app/screens/components/EditProfile";
import EditWalkerProfile from "./app/screens/components/EditWalkerProfile";
import ImageUpload from "./app/screens/ReusableComponents/PostImage";
import UserProfile from "./app/screens/components/UserProfile";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoardingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
         <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} /> 
         <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="UserProfile" component={UserProfile} /> 
        <Stack.Screen name="EditProfile" component={EditProfile} /> 
        <Stack.Screen name="EditWalkerProfile" component={EditWalkerProfile} />
        <Stack.Screen name="WalkerProfile" component={WalkerProfile} />
        {/* <Stack.Screen name="ImageUpload" component={ImageUpload} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
