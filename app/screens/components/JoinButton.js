import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import SignUp from './SignUp';

export default function JoinButton() {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
      <Text style={styles.text}>Join our community</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
	marginTop:20,
	marginBottom: 12,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: 'orange',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: 'white',
  },
});