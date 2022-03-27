import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { BlurView } from "expo-blur";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";

const WalkerProfile = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
		<View>
		  <ImageBackground
            source={require("../assets/dog-walking.png")}
			style={[styles.root, { height: height*0.65, width: width }]}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "5%",
            marginVertical: "8%",
			justifyContent: "space-between"
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
		  <BlurView
            intensity={15}
            tint="dark"
            style={styles.blurContainer}
          ><Icon name="cross" size={30} color="#fff" />
		  </BlurView>
          </TouchableWithoutFeedback>
          <BlurView
            intensity={10}
            tint="dark"
            style={styles.blurContainer}
          >
			  <Text style={styles.blurText} >Walker Profile</Text>
		  </BlurView>
		  <View style={{marginRight: "12%"}}>
		  </View>
        </View>
		</ImageBackground>
		<View style={styles.card}>
			<Text>
				Name
			</Text>
		</View>
		</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
	display:"flex",
  },
  card: {
	alignItems: "center",
	backgroundColor: "#fbfbfb",
	borderRadius: 30,
	
  },
  blurContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
	borderRadius: 50,
	justifyContent: "center",
  },
  blurText: {
	fontWeight: "bold",
	fontStyle: "normal",
	fontSize: 17,
	lineHeight: 25.5,
	letterSpacing: -0.41,
	textAlign: "center",
	color: "white",
  },	
});

export default WalkerProfile;
