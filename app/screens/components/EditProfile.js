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
  
  import Input from "../ReusableComponents/Input";
  
  const EditProfile = () => {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("window");
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
	  <ScrollView showsVerticalScrollIndicator={false}>
		<SafeAreaView style={[styles.root, { height: height, width: width }]}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: "5%"}}>
			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-thin-left"
              size={25}
              color="#000"
            />
          </TouchableWithoutFeedback>
	  </View>
		  <View style={styles.header}>
			  <View style={{marginLeft: "20%"}}>
			  		  <Pressable>
	  <Icon name="edit" size={24} style={{ position: 'absolute'}}/>
	  </Pressable>
	  </View>
			<Image
			  source={require("../../../assets/avatar.png")}
			  style={styles.profilepicture}
			/>
			<Text style={styles.userName} value={name} >{name}</Text>
		  </View>
		  <View style={styles.inputContainer}>
			<Input placeholder={"Full Name"} value={name} setValue={setName} />
			<Input placeholder={"Email"} value={email} setValue={setEmail} />
			<Input placeholder={"Password"} value={password} setValue={setPassword} />
		  </View>
		  <View style={styles.footer}>
			  <Pressable>
			<Text style={styles.footerText}>
			  <Icon name="download"
				size={22}
				color='orange' /><View style={{paddingHorizontal: '3%'}}/>Save
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
		flex:1,
	  marginTop: "5%",
	  marginBottom: "5%",
	  justifyContent: "center",
	  alignItems: "center",
	},
	footer: {
		flex:1,
		justifyContent: "flex-end",
	  alignItems: "center",
	  marginBottom: "10%",
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
	  fontSize: 20,
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
	  zIndex: -1,
	},
  });
  
  export default EditProfile;
  