import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function SignIn(){
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.loginText}> Login </Text>
      </View>
      <View style={styles.ltext}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText} >Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* INPUT */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon as={<FontAwesome name='user-secret' />}
              size='sm'
              m={2}
              _light={{
                color:'black',
              }}
              _dark={{
                color: 'gray.300',
              }}
              />
            }
            variant = "outline"
            placeholder = 'Username'
            _light={{
              placeholderTextColor: "blueGray.400"
            }}
           />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SignIn