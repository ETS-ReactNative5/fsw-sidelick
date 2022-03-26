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
import React, { useState, useRef } from "react";
import {Picker} from '@react-native-community/picker';
import RadioForm from 'react-native-simple-radio-button';
import * as yup from 'yup'
import { Formik } from 'formik'

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";
import PhoneInput from "react-native-phone-number-input";

const SignUp = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef(null);
  const [chosenOption, setChosenOption] = useState(''); //will store our current user options
  const options = [
    { label: 'Female ', value: 'female' },
    { label: 'Male ', value: 'male' },
  ]; //create our options for radio group
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
    } else {
      navigation.navigate("SignIn");
    }
    userData = await userData.json();
    console.log(userData.message);
  };

  return (
    <Formik
    initialValues={{ 
      fullName: '',
      email: '', 
      password: '' ,
      phoneNumber: '',
    }}
    onSubmit={values => Alert.alert(JSON.stringify(values))}
    validationSchema={yup.object().shape({
      fullName: yup
        .string()
        .required('Full name is required'),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .max(30, 'Password should not exceed 30 chars.')
        .required(),
      phoneNumber: yup
      .string()
      .required("This field is Required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
    })}
   >
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
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
        <TextInput
              value={values.fullName}
              style={styles.inputStyle}
              onChangeText={handleChange('fullName')}
              onBlur={() => setFieldTouched('fullName')}
              placeholder="Full Name"
            />
            {touched.fullName && errors.fullName &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.fullName}</Text>
            }      
            <TextInput
              value={values.email}
              style={styles.inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
              style={styles.inputStyle}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
            }
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              value={values.phoneNumber}
              defaultCode="US"
              layout="first"
              containerStyle={[styles.inputStyle, styles.phoneNumberView]}
              onChangeText={handleChange('phoneNumber')}
              onBlur={() => setFieldTouched('phoneNumber')}
              textContainerStyle={{ paddingVertical: 0, backgroundColor: "#f0f0f0" }}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
            />
            {touched.phoneNumber && errors.phoneNumber &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.phoneNumber}</Text>
            }
            <View style={{marginTop:"3%"}}>
      <RadioForm
       formHorizontal={true}
        radio_props={options}
        initial={0} //initial value of this group
        onPress={(value) => {
          setChosenOption(value);
        }} //if the user changes options, set the new value
      />
    </View>
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

export default SignUp;

console.disableYellowBox = true;
