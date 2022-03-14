import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";
import SignUpButton from "./SignUpButton";

const SignUp = () => {
  const [text, onChangeText] = React.useState("Cristian");

  return (
    <SafeAreaView>
      <Text> Let's start here </Text>
      <Text> Fill in your details to begin </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
	  <SignUpButton/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUp;
