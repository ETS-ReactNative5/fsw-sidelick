import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert, 
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { BlurView } from "expo-blur";

import Input from "./ReusableComponents/Input";
import CustomButton from "./ReusableComponents/CustomButton";

const WalkerProfile = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState(""); 
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <ImageBackground
          source={require("../assets/dog-walking.png")}
          style={[styles.root, { height: height * 0.5, width: width }]}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: "8%",
              justifyContent: "space-between",
            }}
          >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <BlurView
                intensity={15}
                tint="dark"
                style={[styles.blurContainer, { marginLeft: "5%" }]}
              >
                <Icon name="cross" size={30} color="#fff" />
              </BlurView>
            </TouchableWithoutFeedback>
            <BlurView intensity={10} tint="dark" style={styles.blurContainer}>
              <Text style={styles.blurText}>Walker Profile</Text>
            </BlurView>
            <View style={{ marginRight: "15%" }}></View>
          </View>
        </ImageBackground>
        <View style={[styles.card , {height: height, borderRadius: 15, shadowOpacity: 20 ,paddingHorizontal: "5%"}]}>
          <Text style={styles.userName}>Alex Murray</Text>
          <Text
            style={[
              styles.subText,
              {
                textAlign: "center",
              },
            ]}
          >
            <Text style={{ fontWeight: "bold", color: "black" }}>5$</Text>/hr |{" "}
            <Text style={{ fontWeight: "bold", color: "black" }}>10</Text> km
          </Text>
          {/* <View style={{ alignItems: "center" }}> */}
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "rgba(232, 232, 232, 1)",
              backgroundColor: "rgba(232, 232, 232, 1)",
              width: width * 0.9,
              marginVertical: "5%",
            }}
          />
          {/* </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#2b2b2b" }]}
            >
              <Text style={{ textAlign: "center", color: "white" }}>About</Text>
            </TouchableOpacity>
            {/* <Pressable style={[styles.btn, { backgroundColor: "#f5f5f5" }]}>
              <Text style={{ textAlign: "center", color: "#b0b0b0" }}>
                Location
              </Text>
            </Pressable> */}
          </View>
          <View>
            <Text style={[styles.subText, { marginTop: "5%" }]}>Age</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                lineHeight: 25.5,
                letterSpacing: -0.41,
              }}
            >
              30 Years
            </Text>
          </View>
          <View>
            <Text style={[styles.subText, { marginTop: "5%" }]}>
              Alex has loved dogs since childhood. He is currently a veterinary
              student. Visits the dog shelter we...
            </Text>
			{/* <Text style={{color: '#FB724C',}}>Read more</Text> */}
          </View>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Request Sent!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.btn, { backgroundColor: "#ff8500", marginVertical: "5%" }]}
        onPress={() => setModalVisible(true)}
      >
        <Text 
        style={styles.textStyle}
        >Book a walk</Text>
      </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
  },
  card: {
    backgroundColor: "#fbfbfb",
    paddingTop: "5%",
    alignItems: "center",
  },
  blurContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  blurText: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 25.5,
    letterSpacing: -0.41,
    textAlign: "center",
    color: "white",
  },
  userName: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 28,
    lineHeight: 42,
    letterSpacing: -0.41,
    textAlign: "center",
  },
  subText: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: -0.41,
    color: "#a1a1a1",
  },
  btn: {
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 29,
    borderRadius: 14,
    marginHorizontal: "5%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#ff8500",
  },
  buttonClose: {
    backgroundColor: "#e3e3e3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default WalkerProfile;
