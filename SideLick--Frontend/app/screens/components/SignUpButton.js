import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SignUpButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Sign Up</Text>
    </TouchableOpacity>
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