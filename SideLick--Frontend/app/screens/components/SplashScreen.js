import { StyleSheet, SafeAreaView, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
	const navigation = useNavigation();
  // setTimeout(() => {
  //   navigation.navigate('OnBoardingScreen')
  // }, 3000); 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={require("../../../assets/LOGO.png")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});