import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Map() {
  const [pin, setPin] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
  });
  const [region, setRegion] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={{marginTop: 50, flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        }}
        query={{
          key: "AIzaSyBQbUZXq9s1xVzE3MdYWftxwuFXdnZwNxs",
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
         container: { flex:0, position:"absolute", width:"100%", zIndex:1 },
         listView: { backgroundColor: "white"}
        }}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.890536626710244,
          longitude: 35.489303601542964,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} />
        <Marker
          coordinate={pin}
          pinColor="purple"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate),
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
