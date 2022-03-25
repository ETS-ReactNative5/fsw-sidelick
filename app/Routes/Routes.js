import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/components/SignIn";
import SignUp from "../screens/components/SignUp";
import OnBoardingScreen from "../screens/components/OnBoardingScreen";
import Map from "../screens/components/Map";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoardingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
