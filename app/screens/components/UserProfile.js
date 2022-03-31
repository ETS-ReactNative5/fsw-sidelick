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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';

import CustomButton from "../ReusableComponents/CustomButton";

const UserProfile = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [name, setName] = useState('User Name');

  const onLogOut = async() => {
	  await deleteToken("userToken")
	  .then(
		  navigation.navigate("SignIn"));
	  }
		async function deleteToken(key) {
			await SecureStore.deleteItemAsync(key);
		  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={[styles.root, { height: height, width: width }]}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.profilepicture}
          />
		  <Text style={styles.userName} value={name} setValue={setName} >{name}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton btnText={
            // [<Icon
            //   name="emoji-happy"
            //   size={20}
            //   color="orange"
            // />,
            "Edit User"} type="outline" onPress={() => navigation.navigate("EditProfile")} />
			<View style={{marginVertical: '2%'}}/> 
		  <CustomButton btnText={
        // [<Icon
        //       name="baidu"
        //       size={20}
        //       color="orange"
        //     />,
            "Edit Pets"} type="outline" />
        </View>
		<View style={styles.footer}>
			<Pressable onPress={onLogOut}>
          <Text style={styles.footerText}>
            <Icon name="log-out"
              size={15}
			  color='orange' /><View style={{paddingHorizontal: '2%'}}/>Logout
          </Text>
		  </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  header: {
    marginTop: "10%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
	  flex:1,
	  justifyContent: "flex-end",
    alignItems: "center",
	marginBottom: "25%",
  },
  userName: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 34,
    lineHeight: 51,
    letterSpacing: -0.41,
  },
  subtext: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 19,
    color: "#7A7A7A",
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  footerText: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#7A7A7A",
    textAlign: "center",
  },
  buttonContainer: {
    paddingVertical: "7%",
    paddingHorizontal: "5%",
    alignItems: "center",
	marginTop: "10%",
  },
  inputStyle: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: "3%",
  },
  profilepicture: {
    borderRadius: 100,
    width: 165,
    height: 165,
  },
});

export default UserProfile;
