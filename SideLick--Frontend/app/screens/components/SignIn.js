import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";

import CustomButton from "../ReusableComponents/CustomButton";
import * as SecureStore from "expo-secure-store";
import * as yup from "yup";
import { Formik } from "formik";

const SignIn = ({ navigation }) => {
  // const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const Login_URL =
    "http://ec2-18-222-103-41.us-east-2.compute.amazonaws.com:3000/api/auth/login";

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        let userData = await fetch(Login_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        userData = await userData.json().then((data) => {
          const message = `An error has occured: ${userData.status}`;
          !userData.ok
            ? alert(data.message)
            : [
                save("userToken", data.token),
                resetForm({}),
                navigation.navigate("Tabs"),
              ];
        });

        async function save(key, value) {
          await SecureStore.setItemAsync(key, value);
        }
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
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
              <TextInput
                value={values.email}
                style={styles.inputStyle}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                placeholder="E-mail"
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                value={values.password}
                style={styles.inputStyle}
                onChangeText={handleChange("password")}
                placeholder="Password"
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.subtext}>
                  Don't have an account?
                  <Text style={{ color: "#ff8500" }}> Sign up</Text>
                </Text>
              </TouchableOpacity>
              <View style={{ marginVertical: "8%" }} />
              <CustomButton btnText={"Sign in"} onPress={handleSubmit} />
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
      )}
    </Formik>
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
  inputStyle: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: "3%",
  },
});

export default SignIn;
