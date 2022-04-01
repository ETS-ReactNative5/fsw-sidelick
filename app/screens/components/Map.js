import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Pressable,
  Image,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
// import Geolocation from "react-native-geolocation-service"
// import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";

const Map = () => {
  const [location, setLocation] = useState({lat:30, long:30, latDelta: 20, longDelta:20 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  
  const navigation = useNavigation();

  const Location_URL = "http://192.168.1.108:3000/api/users/location";
  const Walkers_URL = "http://192.168.1.108:3000/api/users/get-walkers";

  const handleLocationPermission = async () => {
    if (Platform.OS === "android") {
      setErrorMsg(
        "Oops, this will not work on an Android emulator. Try it on your device!"
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const getLocation = () => {
    let result;
    Location.getCurrentPositionAsync({}).then(
      async (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLocation({ lat, long, latDelta: 0.05, longDelta: 0.05 });
        await getValueFor("userToken").then((value) => {
          result = value;
        });
        let getUserLocation = await fetch(Location_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": result
          },
          body: JSON.stringify({
            latitude: lat,
            longitude: long,
          }),
        });
        if (!getUserLocation.ok || getUserLocation.status !== 201) {
          getUserLocation = await getUserLocation.json();
          const message = `An error has occured: ${getUserLocation.status}`;
          console.log("message: ",message);
        } else {
          getUserLocation = await getUserLocation.json();
          console.log("after fetch:", getUserLocation.location);
        }
      },
      { enableHighAccuracy: true, timeout: 500, maximumAge: 1000 }
    );
  };

  // // to render the walkers on log in
  // useEffect(() => {
  //   // write the code
  // }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const getWalkers = async () => {
    let result;
    await getValueFor("userToken").then((value) => {
      result = value;
    });
    try {
     const response = await fetch(Walkers_URL,  {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": result,
      }});
      if(!response.ok || response.status !== 201){
        response = await response.json();
        alert(response);
      }
     const data = await response.json();
     console.log("db data: ",data);
     setMarkers(data); 
   } catch (error) {
     console.error(error);
   }
 }
  
  // to render the walkers on log in
  useEffect(() => {
    getWalkers();
  }, []);  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: location.latDelta,
          longitudeDelta: location.longDelta,
        }}
        showsUserLocation={true}
        
      >

{markers &&
          markers.map(item => {
            console.log("LIST OF ITEMS :",item)
            return (
              <View key={item[0].id}>
                <Marker
                  pinColor="#FF8500"
                  coordinate={{
                    latitude: item[2].latitude,
                    longitude: item[3].longitude,
                  }}
                  title={item[1].fullName}
                />
              </View>
            );
          })} 

        <Marker
          description="Hooman"
          coordinate={{ latitude: 33.890532761432226, longitude: 35.48 }}
          image={require("../../../assets/human-figure.png")}
        >
          <Callout tooltip onPress={() => navigation.navigate("WalkerProfile")}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Alex Murray</Text>
                  {/* <Image 
                    style={styles.image}
                    source={require('../../../assets/image2.jpg')}
                  /> */}
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
        </Marker>

        <Marker
          description="Hooman"
          coordinate={{ latitude: 33.890532761432226, longitude: 35.5 }}
          image={require("../../../assets/human-figure.png")}
        >
          <Callout tooltip onPress={() => navigation.navigate("WalkerProfile")}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Alex Murray</Text>
                  {/* <Image 
                    style={styles.image}
                    source={require('../../../assets/image2.jpg')}
                  /> */}
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
        </Marker>

        <Marker
          description="Hooman"
          coordinate={{ latitude: 33.890532761432226, longitude: 35.55 }}
          image={require("../../../assets/human-figure.png")}
        >
            <Callout tooltip onPress={() => navigation.navigate("WalkerProfile")}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Alex Murray</Text>
                  {/* <Image 
                    style={styles.image}
                    source={require('../../../assets/image2.jpg')}
                  /> */}
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
        </Marker>
      </MapView>
      <Pressable
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 18,
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: "white",
          borderRadius: 30,
          shadowOpacity: 0.5,
        }}
        onPress={getLocation}
      >
        <Icon name="direction" size={24} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 // Callout bubble
 bubble: {
  flexDirection: 'column',
  alignSelf: 'flex-start',
  backgroundColor: '#fff',
  borderRadius: 6,
  borderColor: '#ccc',
  borderWidth: 0.5,
  padding: 15,
  width: 150,
},
// Arrow below the bubble
arrow: {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderTopColor: '#fff',
  borderWidth: 16,
  alignSelf: 'center',
  marginTop: -32,
},
arrowBorder: {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderTopColor: '#007a87',
  borderWidth: 16,
  alignSelf: 'center',
  marginTop: -0.5,
  // marginBottom: -15
},// Character name
name: {
  fontSize: 16,
  marginBottom: 5,
  textAlign: 'center',
},
// Character image
image: {
  width: "100%",
  height: 80,
},
});

export default Map;
