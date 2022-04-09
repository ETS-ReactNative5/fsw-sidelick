import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Map from "../screens/components/Map";
import UserProfile from "../screens/components/UserProfile";
import Requests from "../screens/components/Requests";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Map}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="home-variant-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Requests"
          component={Requests}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bell"
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="emoticon-neutral-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;
