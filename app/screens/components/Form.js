import React, { useState, useRef } from "react";

import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,

} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import Icon from "react-native-vector-icons/Entypo";

export default function Form() {
  const { width, height } = Dimensions.get("window");
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneInput = useRef(null);

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
          <Text style={styles.text}>Little introduction</Text>
          <Text style={styles.subtext}>Tell us something about you and your furry fren</Text>
        </View>
        <View style={styles.MainContainer}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="IN"
            layout="first"
            withShadow
            autoFocus
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0 }}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  header: {
    paddingHorizontal: "5%",
  },
  MainContainer: {
	  marginVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
    color: "black",
  },
  phoneNumberView: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    width: "80%",
    padding: 8,
    backgroundColor: "#00B8D4",
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
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
