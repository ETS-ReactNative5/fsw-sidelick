import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

const Requests = ({ data }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [status, setStatus] = useState("Pending...");
  const [request, setRequest] = useState([
    {
      id: 1,
      time: "29/3/2022",
      client: "Hala Zbib",
      location: "Beirut",
    },
    {
      id: 2,
      time: "29/3/2022",
      client: "Charbel Daoud",
      location: "Beirut",
    },
    {
      id: 3,
      time: "29/3/2022",
      client: "Saad",
      location: "Jbeil",
    },
  ]);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: "10%",
        }}
      >
        <Text>No requests found</Text>
      </View>
    );
  };

  const deleteItemById = (id) => {
	const filteredData = this.state.request.filter(item => String(item.id) !== id);
	this.setState({ request: filteredData });}

  return (
    <SafeAreaView style={[styles.root, { height: height, width: width }]}>
		<Text style={styles.title}>Your Requests</Text>
      <FlatList
        style={{ paddingHorizontal: "5%" }}
        renderItem={({ item }) => (
          <View style={styles.container}>
			  <Pressable style={{alignItems:"flex-end"}} onPress={() => this.deleteItemById(item.id)}>
			  <Icon name="close" size={14}/>
			  </Pressable>
            <Text style={styles.text}>{item.client}
			</Text>
            <Text style={styles.subtext}>{status}</Text>
          </View>
        )}
        data={request}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 10,
    borderRadius: 30,
	backgroundColor: "white",
	shadowOpacity: 0.3,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  subtext: {
    color: "grey",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  title:{
	fontWeight: "700",
    fontStyle: "normal",
    fontSize: 36,
    lineHeight: 51,
    letterSpacing: 0.4,
	textAlign: "center",
	marginVertical: "2%",
  },
});

export default Requests;
