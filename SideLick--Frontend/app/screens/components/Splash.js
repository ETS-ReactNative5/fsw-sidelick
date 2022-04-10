import { StyleSheet, SafeAreaView, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
	const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate('OnBoardingScreen')
  }, 3000); 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={require("../../../assets/LOGO.png")} style={{ marginBottom: 20 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A7FCC',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
  },
});