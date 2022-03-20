import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/components/SignIn";
import SignUp from "../screens/components/SignUp";
import OnBoardingScreen from "../screens/components/OnBoardingScreen";
import Map from "../screens/components/Map";

// function Login() {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="SignIn" component={SignIn} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// ##################################################

const Stack = createNativeStackNavigator();

const LoggingScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    )
}
export {LoggingScreen}

const HomeScreen = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="HomeScreen"
                component={Map}
            />
        </Stack.Navigator>
    )
}
export {HomeScreen}

