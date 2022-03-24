import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./app/screens/components/SignIn";
import SignUp from "./app/screens/components/SignUp";
import OnBoardingScreen from "./app/screens/components/OnBoardingScreen";
import Tabs from "./app/Routes/Tabs";
import Form from "./app/screens/components/Form";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="OnBoardingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
