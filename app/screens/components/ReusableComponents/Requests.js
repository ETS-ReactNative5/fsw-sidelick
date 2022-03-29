import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
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
      date: "10:45 • 29/3/2022",
      walker: "Hala Zbib",
      age: '21',
      location: "Beirut",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd7SeoDA2PxCcdbtBxBAHYw1xiP_CpXmRFyKSyyiC2Pr_A_vf34p816fwajWCCR9eHBo&usqp=CAU'
    },
    {
      id: 2,
      date: "16:20 • 29/3/2022",
      walker: "Charbel Daoud",
      age: '32',
      location: "Beirut",
      image: 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg'
    },
    {
      id: 3,
      date: "9:13 • 29/3/2022",
      walker: "Saad",
      age: '30',
      location: "Jbeil",
      image: 'https://e7.pngegg.com/pngimages/341/821/png-clipart-art-rick-sanchez-adult-swim-meeseeks-and-destroy-pickle-rick-rick-and-morty-portal-food-vehicle.png'
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

  return (
    <SafeAreaView style={[styles.root, { height: height, width: width }]}>
		<Text style={styles.title}>Your Requests</Text>
      <FlatList
        style={{ paddingHorizontal: "5%" }}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image style={{width:80, height:80, borderRadius: 50, shadowOpacity: 0.3, marginHorizontal: 10, }}source={{uri: item.image}}/>
			  {/* <Pressable style={{alignItems:"flex-end"}} >
			  <Icon name="close" size={14}/>
			  </Pressable> */}
        <View style={{justifyContent:'center'}}>
            <Text style={styles.text}>{item.walker}, {item.age}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.subtext}>{status}</Text>
            </View>
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
    flexDirection: "row",
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
    fontWeight: "500",
    letterSpacing: 1,
  },
  subtext: {
    color: "grey",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  title:{
	fontWeight: "400",
    fontStyle: "normal",
    fontSize: 36,
    lineHeight: 51,
    letterSpacing: 0.4,
	marginVertical: "2%",
  marginHorizontal: '5%',
  },
  date:{
    fontSize: 14,
    letterSpacing: 0.5,
  },  
});

export default Requests;
