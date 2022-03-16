import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUp from "../SignUp";

const CustomButton = ({onPress, btnText}) => {
  const navigation = useNavigation();
  return (
    // <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
    //   <Text style={styles.text}>Join our community</Text>
    // </Pressable>

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
    marginTop: 20,
    marginBottom: 12,
    paddingVertical: 15,
    borderRadius: 14,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
});

export default CustomButton;

// const styles = StyleSheet.create({
//   button: {
// 	marginTop:20,
// 	marginBottom: 12,
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderRadius: 14,
//     backgroundColor: 'orange',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     letterSpacing: 0.5,
//     color: 'white',
//   },
// });
