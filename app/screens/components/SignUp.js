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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const Register_URL = "http://192.168.1.108:3000/api/user/register";

  const onSignUpPressed = async () => {
    let userData = await fetch(Register_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
        status: isEnabled,
      }),
    });
    if (!userData.ok) {
      const message = `An error has occured: ${userData.status}`;
      // throw new Error(message);
      console.log(message);
    }
    userData = await userData.json();
    console.log(userData);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={[styles.root, { height: height, width: width }]}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              style={{ marginBottom: "5%" }}
              name="chevron-thin-left"
              size={25}
              color="#000"
            />
          </TouchableWithoutFeedback>
          <Text style={styles.text}>Let's start here</Text>
          <Text style={styles.subtext}>Fill in your details to begin</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            value={fullName}
            setValue={setFullName}
          />
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
              <Text style={{ color: "#ff8500" }}> Sign in</Text>
            </Text>
          </Pressable>
          <View style={styles.switcheucontainer}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Walker</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(255, 151, 54, 1)" }}
                thumbColor={isEnabled ? "#f5dd40" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={{ marginVertical: "2%" }} />
          <CustomButton btnText={"Sign up"} onPress={onSignUpPressed} />
          {/* <Text style={{ marginVertical: "2%", fontSize: 20 }}>or</Text>
          <SocialMediaButtons /> */}
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
});

export default SignUp;
