import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";

const SignUp = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpPressed = () => {
    // navigation.navigate("")
    console.warn("signed up successfully");
  };
  const onSignInFacebook = () => {
    // navigation.navigate("")
    console.warn("Connect with Facebook");
  };
  const onSignInGoogle = () => {
    // navigation.navigate("")
    console.warn("Connect with Google");
  };

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
        <Input placeholder="Full Name" value={fullName} setValue={setFullName} />
        <Input placeholder="Email" value={email} setValue={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        {/* <CustomButton
          btnText={"Forgot password ?"}
          onPress={onForgotPwdPressed}
          type={"tertiary"}
        /> */}
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.subtext}>
            Already have an account?
            <Text style={{ color: "orange" }}> Sign in</Text>
          </Text>
        </Pressable>
        <View style={{ marginVertical: "2%" }} />
        <CustomButton btnText={"Sign up"} onPress={onSignUpPressed} />
        <Text style={{ marginVertical: "2%", fontSize: 20 }}>or</Text>
        <CustomButton
          btnText={"Connect with Facebook"}
          onPress={onSignInFacebook}
          bgColor="#3B5998"
        />
        <CustomButton
          btnText={"Connect with Google"}
          onPress={onSignInGoogle}
          bgColor="white"
          fgColor="black"
          type={"outline"}
        />
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
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
});

export default SignUp;
