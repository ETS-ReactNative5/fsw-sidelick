import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";
import * as SecureStore from 'expo-secure-store';
import Tabs from "../../Routes/Tabs";

const SignIn = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login_URL = 'http://192.168.1.234:3000/api/user/login';

  const onSignInPressed = async() => {
    let userData = await fetch(Login_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    userData = await userData.json().then(data => {
      const message = `An error has occured: ${userData.status}`;
    !userData.ok ? 
      console.log(message) :
      [save('userToken', data.token), navigation.navigate("Home")];
      });
}
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

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
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.subtext}>
              Don't have an account?
              <Text style={{ color: "#ff8500" }}> Sign up</Text>
            </Text>
          </Pressable>
          <View style={{ marginVertical: "8%" }} />
          <CustomButton btnText={"Sign in"} onPress={onSignInPressed} />
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
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
});

export default SignIn;
