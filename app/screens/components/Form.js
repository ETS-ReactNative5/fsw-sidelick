// import React, { useState, useRef } from "react";

// import {
//   View,
//   Text,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   SafeAreaView,
//   TouchableWithoutFeedback,
//   Pressable,
// } from "react-native";

// import Input from "./ReusableComponents/Input";
// import CustomButton from "./ReusableComponents/CustomButton";

// import PhoneInput from "react-native-phone-number-input";
// import Icon from "react-native-vector-icons/Entypo";

// const Form = () => {
//   const { width, height } = Dimensions.get("window");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const phoneInput = useRef(null);
//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <SafeAreaView style={[styles.root, { height: height, width: width }]}>
//         <View style={styles.header}>
//           <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
//             <Icon
//               style={{ marginBottom: "5%" }}
//               name="chevron-thin-left"
//               size={25}
//               color="#000"
//             />
//           </TouchableWithoutFeedback>
//           <Text style={styles.text}>Little introduction</Text>
//           <Text style={styles.subtext}>
//             Tell us something about you and your furry fren
//           </Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <Input
//             placeholder="Full Name"
//             value={fullName}
//             setValue={setFullName}
//           />
//           <Input placeholder="Email" value={email} setValue={setEmail} />
//           <Input
//             placeholder="Password"
//             value={password}
//             setValue={setPassword}
//             secureTextEntry
//           />
//           <Pressable onPress={() => navigation.navigate("SignIn")}>
//             <Text style={styles.subtext}>
//               Already have an account?
//               <Text style={{ color: "#ff8500" }}> Sign in</Text>
//             </Text>
//           </Pressable>
//           <View style={{ marginVertical: "2%" }} />
//           <CustomButton btnText={"Sign up"} onPress={onSignUpPressed} />
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#FCFCFC",
//   },
//   header: {
//     paddingHorizontal: "5%",
//   },
//   footer: {
//     alignItems: "center",
//   },
//   text: {
//     fontWeight: "700",
//     fontStyle: "normal",
//     fontSize: 36,
//     lineHeight: 51,
//     letterSpacing: 0.4,
//   },
//   subtext: {
//     fontWeight: "500",
//     fontStyle: "normal",
//     fontSize: 19,
//     color: "#7A7A7A",
//     lineHeight: 26,
//     letterSpacing: 0.4,
//   },
//   footerText: {
//     fontSize: 13,
//     lineHeight: 20,
//     letterSpacing: 0.25,
//     fontWeight: "400",
//     fontStyle: "normal",
//     color: "#7A7A7A",
//     textAlign: "center",
//   },
//   inputContainer: {
//     paddingVertical: "10%",
//     paddingHorizontal: "5%",
//     alignItems: "center",
//   },
// });

// export default Form;

// ################################################


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
import SignIn from "./SignIn";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";

const Form = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [age, setAge] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const Register_URL = "http://192.168.1.234:3000/api/user/register";

  const onSubmit = async () => {
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
    }else{
      navigation.navigate("SignIn");
    }
    userData = await userData.json();
    console.log(userData.message);
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
          <Text style={styles.text}>Introduction</Text>
          <Text style={styles.subtext}>Tell us about you and your furry fren</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Age"
            value={age}
            setValue={setAge}
            keyboardType="number-pad"
          />
          <Input placeholder="Phone Number" value={phonenumber} setValue={setPhoneNumber} keyboardType="number-pad" />
          <View style={{ marginVertical: "2%" }} />
          <CustomButton btnText={"Submit"} onPress={onSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
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

export default Form;


// ################################################

 // MainContainer: {
  //   marginVertical: "10%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // heading: {
  //   fontSize: 24,
  //   textAlign: "center",
  //   paddingBottom: 20,
  //   color: "black",
  // },
  // phoneNumberView: {
  //   width: "80%",
  //   height: 50,
  //   backgroundColor: "white",
  // },

{/* <View style={styles.MainContainer}>
  <PhoneInput
    ref={phoneInput}
    defaultValue={phoneNumber}
    defaultCode="US"
    layout="first"
    withShadow
    autoFocus
    containerStyle={styles.phoneNumberView}
    textContainerStyle={{ paddingVertical: 0 }}
    onChangeFormattedText={(text) => {
      setPhoneNumber(text);
    }}
  />
  <View>

  </View>
</View> */}