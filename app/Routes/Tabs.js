import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Routes from './Routes';
import Map from '../screens/components/Map';

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
          />
          {/* <Tab.Screen
            name="Screen2"
            component={SecondScreenNavigator}
          />
          <Tab.Screen
            name="Screen3"
            component={ThirdScreenNavigator}
          /> */}
        </Tab.Navigator>
    </>
  );
};

export default Tabs;


