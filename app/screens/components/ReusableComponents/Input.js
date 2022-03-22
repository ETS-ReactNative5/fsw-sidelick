import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({value,setValue, placeholder,secureTextEntry}) => {
  return (
	<View style={styles.container}>
	  <TextInput
	  value={value}
	  onChangeText={setValue}
	   placeholder={placeholder} style={styles.input} 
	   secureTextEntry= {secureTextEntry} />
	</View>
  )
}

const styles = StyleSheet.create({
	container:{
		width:'100%',
		backgroundColor: "#F0F0F0",
		borderRadius: 14,
		paddingHorizontal: 15,
		paddingVertical: 22,
		marginVertical: "3%",
	}
})

export default Input;