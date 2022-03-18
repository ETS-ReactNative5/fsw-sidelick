import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/components/SignIn";
import SignUp from "../screens/components/SignUp";
import OnBoardingScreen from "../screens/components/OnBoardingScreen";
import Map from "../screens/components/Map";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={Map} />
        {/* <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
