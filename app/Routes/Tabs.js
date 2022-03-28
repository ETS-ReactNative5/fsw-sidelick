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
        <Tab.Navigator
         screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="Home"
            component={Map}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home-variant-outline" color={color} size={24} />
              ),
            }}
            />
          <Tab.Screen
            name="Profile"
            component={UserProfile}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="emoticon-neutral-outline" color={color} size={24} />
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


