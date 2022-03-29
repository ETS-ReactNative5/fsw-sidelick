// import React, { useState } from "react";
// import MapView, { Callout, Marker } from "react-native-maps";
// import { StyleSheet, Text, View, Dimensions,Pressable } from "react-native";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Icon from "react-native-vector-icons/Entypo";

// export default function Map() {
//   const [pin, setPin] = useState({
//     latitude: 33.890536626710244,
//     longitude: 35.489303601542964,
//   });
//   const [region, setRegion] = useState({
//     latitude: 33.890536626710244,
//     longitude: 35.489303601542964,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 33.890536626710244,
//           longitude: 35.489303601542964,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         provider="google"
//       >
//         <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} />
//         <Marker
//           coordinate={pin}
//           pinColor="purple"
//           draggable={true}
//           onDragStart={(e) => {
//             console.log("Drag start", e.nativeEvent.coordinate);
//           }}
//           onDragEnd={(e) => {
//             console.log("Drag end", e.nativeEvent.coordinate),
//             setPin({
//               latitude: e.nativeEvent.coordinate.latitude,
//               longitude: e.nativeEvent.coordinate.longitude,
//             });
//           }}
//         >
//           <Callout>
//             <Text>I'm here</Text>
//           </Callout>
//         </Marker>
//         <View style={{alignItems: "flex-end", marginTop: "90%", marginRight
//       : "5%",}}>
//         <Pressable style={{
//     backgroundColor: "white",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 14,}} onPress={LocateUser}>
//         <Icon name="direction" size={24} />
//       </Pressable>
//       </View>
//       </MapView>
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
// import Geolocation from "react-native-geolocation-service"
// import Constants from 'expo-constants';
import * as Location from "expo-location";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(JSON.stringify(position.coords.latitude));
        console.log(JSON.stringify(position.coords.longitude));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 30,
          longitude: 30,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
        showsUserLocation={true}
      />
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
});

export default Map;
