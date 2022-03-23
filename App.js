import Routes from './app/Routes/Routes';
// const App = () => {
//   return (
//       <>
//         <Routes/>
//       </>
//    )
//   };

// export default App;

import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {LoggingScreen, HomeScreen} from './app/Routes/Routes'

const Tab = createBottomTabNavigator()

const App= () => {
  return (
    <>
      <NavigationContainer>
        <LoggingScreen/>
        {/* <Tab.Navigator
         screenOptions={{ headerShown: false }}
          tabBarOptions={{
            labelStyle:{fontSize:16},
            activeTintColor: 'red'
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          /> */}
          {/* <Tab.Screen
            name="Screen2"
            component={SecondScreenNavigator}
          />
          <Tab.Screen
            name="Screen3"
            component={ThirdScreenNavigator}
          /> */}
        {/* </Tab.Navigator> */}
      </NavigationContainer>
    </>
  );
};

export default App;


