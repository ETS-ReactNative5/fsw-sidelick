import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignInPressed = () => {
    // navigation.navigate("")
    console.warn("signed in successfully")
  }
  const onForgotPwdPressed = () => {
    // navigation.navigate("")
    console.warn("Forgot Password")
  }
  const onSignInFacebook = () => {
    // navigation.navigate("")
    console.warn("Connect with Facebook")
  }
  const onSignInGoogle = () => {
    // navigation.navigate("")
    console.warn("Connect with Google")
  }
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.text}>Sign in</Text>
        <Text style={styles.subtext}>Enter your email and password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input placeholder="Email" value={email} setValue={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton btnText={"Forgot password ?"} onPress={onForgotPwdPressed} type={"tertiary"} />
        <View style={{margin: "8%"}}/>
        <CustomButton btnText={"Sign in"} onPress={onSignInPressed} />
        <Text style={{fontSize: 20,}}>or</Text>
        <CustomButton btnText={"Connect with Facebook"} onPress={onSignInFacebook} bgColor="#3B5998" fgColor="" />
        <CustomButton btnText={"Connect with Google"} onPress={onSignInGoogle} bgColor="white" fgColor="black" type={"outline"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: "#FCFCFC",
  },
  header: {
    paddingHorizontal: "5%",
  },
  text: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 34,
    lineHeight: 51,
    letterSpacing: 0.4,
  },
  subtext: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 17,
    color: "#7A7A7A",
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  inputContainer: {
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
});

export default SignIn;
