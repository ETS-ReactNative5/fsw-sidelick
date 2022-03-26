import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Routes from './Routes';
import Map from '../screens/components/Map';
import UserProfile from '../screens/components/UserProfile';

const Tab = createBottomTabNavigator()

const Tabs= () => {
  return (
    <>
        {/* <Form/> */}
        <Tab.Navigator
         screenOptions={{ headerShown: false }}
          tabBarOptions={{
            labelStyle:{fontSize:16},
            activeTintColor: 'orange'
          }}
        >
          <Tab.Screen
            name="Home"
            component={Map}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home-variant-outline" size={24} />
              ),
            }}
            />
          <Tab.Screen
            name="Profile"
            component={UserProfile}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="emoticon-neutral-outline" size={24} />
              ),
            }}
            />
          {/* <Tab.Screen
            name="Screen3"
            component={ThirdScreenNavigator}
          /> */}
        </Tab.Navigator>
    </>
  );
};

export default Tabs;


