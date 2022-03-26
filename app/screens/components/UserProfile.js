import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	Pressable,
	ScrollView,
	Switch,
	TextInput,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import Icon from "react-native-vector-icons/Entypo";
  import React, { useState } from "react";

  import CustomButton from "./ReusableComponents/CustomButton";
  import PhoneInput from "react-native-phone-number-input";
  
  const UserProfile = () => {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("window");
  
	return (
	  <ScrollView showsVerticalScrollIndicator={false}>
		<SafeAreaView style={[styles.root, { height: height, width: width }]}>
		  <View style={styles.header}>
			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
			  <Icon
				style={{ marginBottom: "3%" }}
				name="chevron-thin-left"
				size={25}
				color="#000"
			  />
			</TouchableWithoutFeedback>
			<Text style={styles.text}>Let's start here</Text>
			<Text style={styles.subtext}>Fill in your details to begin</Text>
		  </View>
		  <View style={styles.inputContainer}>
		  
			<CustomButton btnText={"Sign up"}
				onPress={handleSubmit} />
			<Pressable onPress={() => navigation.navigate("SignIn")}>
			  <Text style={styles.subtext}>
				Already have an account?
				<Text style={{ color: "#ff8500" }}> Sign in</Text>
			  </Text>
			</Pressable>
		  </View>
		  <View style={styles.footer}>
			<Text style={styles.footerText}>
			  By signing in, I agree with
			  <Text style={{ fontWeight: "bold", color: "black" }}>
				{" "}
				Terms of Use{" "}
			  </Text>
			  {"\n"}and
			  <Text style={{ fontWeight: "bold", color: "black" }}>
				{" "}
				Privacy Policy
			  </Text>
			</Text>
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
	  paddingHorizontal: "5%",
	},
	footer: {
	  alignItems: "center",
	},
	text: {
	  fontWeight: "700",
	  fontStyle: "normal",
	  fontSize: 36,
	  lineHeight: 51,
	  letterSpacing: 0.4,
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
	  fontSize: 13,
	  lineHeight: 20,
	  letterSpacing: 0.25,
	  fontWeight: "400",
	  fontStyle: "normal",
	  color: "#7A7A7A",
	  textAlign: "center",
	},
	inputContainer: {
	  paddingVertical: "7%",
	  paddingHorizontal: "5%",
	  alignItems: "center",
	},
	switcheucontainer: {
	  flexDirection: "row",
	  marginTop: 15,
	  marginBottom: 20,
	},
	switchContainer: {
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "center",
	},
	switchText: {
	  fontSize: 18,
	  fontWeight: "bold",
	  fontStyle: "normal",
	  letterSpacing: 0.3,
	  marginRight: 5,
	  color: "#3e3e3e",
	},
	phoneNumberView: {
		  paddingVertical: 12,
	},
	inputStyle:{
	  width:'100%',
		  backgroundColor: "#F0F0F0",
		  borderRadius: 14,
		  paddingHorizontal: 15,
		  paddingVertical: 20,
		  marginVertical: "3%",
	},
  });
  
  export default UserProfile;
  