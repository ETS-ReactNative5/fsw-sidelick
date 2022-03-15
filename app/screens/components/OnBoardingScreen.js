import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  View,
  Image,
  Text,
  Button,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import JoinButton from "./JoinButton";
import SignIn from "./SignIn";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const COLORS = { Primary: "#ff8400", white: "#fff" };

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/dog-walker.png")}
    >
      <View style={styles.container}>
        <BlurView intensity={15} tint="light" style={styles.blurContainer}>
          <Text style={styles.text}>Too tired to walk your dog?</Text>
          <Text style={styles.text}>Let us help you!</Text>
          <JoinButton />
          <View>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.subtext}>
                Already a member?
                <Text style={{ color: "orange" }}>
                  {" "}
                  Sign in
                </Text>
              </Text>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.3,
  },
  text: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 5,
    textAlign: "center",
  },
  subtext: {
    color: COLORS.white,
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  blurContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
});
export default OnBoardingScreen;
