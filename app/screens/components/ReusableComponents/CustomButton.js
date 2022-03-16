import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUp from "../SignUp";

const CustomButton = ({onPress, btnText}) => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{btnText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    alignItems: "center",
    width: "100%",
    marginVertical: "5%",
    paddingVertical: "5%",
    borderRadius: 14,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 25.5,
    letterSpacing: 0.5,
    color: "white",
  },
});

export default CustomButton;

