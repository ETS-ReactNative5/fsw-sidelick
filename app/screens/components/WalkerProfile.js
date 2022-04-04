import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { BlurView } from "expo-blur";

const WalkerProfile = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = route.params;
  const [ name , setName ] = useState();
  const [ image, setImage ] = useState();
  const [ age, setAge ] = useState();

  useEffect(() => {
    setName(item[1].fullName);
    setImage(item[4].image);
    setAge(item[5].age);
  }, [])

  const sendRequest_URL = "http://192.168.1.108:3000/api/users/send-request";

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const sendRequest = async () => {
    let result;
    await getValueFor("userToken").then((value) => {
      result = value;
    });
    let requestInfo = await fetch(sendRequest_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": result,
      },
      body: JSON.stringify({
        to: name
      }),
    });
    if (requestInfo.status === 200 || requestInfo.status === 201) {
      setModalVisible(true);
    } 
    else {
      requestInfo = await requestInfo.json();
      alert(requestInfo);
    }
  };

  const DirectToWhatsapp = () => {
    // Using 961 for Lebanon
    // You can change 961 with your country code
    const whatsAppMsg= "Hello, I found you on SideLick!";
    const mobileNumber = item[6].phoneNumber;
    let url =
      'whatsapp://send?text=' + 
       whatsAppMsg +
      '&phone=961' + mobileNumber;
    Linking.openURL(url)
      .then(
        console.log('WhatsApp Opened')
      )
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <ImageBackground
          // source={require("../../../assets/dog-walking.png")}
          source={{uri: image}}
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
        <View
          style={[
            styles.card,
            {
              height: height,
              borderRadius: 15,
              shadowOpacity: 20,
              paddingHorizontal: "5%",
            },
          ]}
        >
          <Text style={styles.userName}>{item[1].fullName}</Text>
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
            <Text style={[styles.subText, { marginTop: "4%" }]}>Age</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                lineHeight: 25.5,
                letterSpacing: -0.41,
              }}
            >
            {age}{" "}Years
            </Text>
          </View>
          <View>
            <Text style={[styles.subText, { marginTop: "4%" }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
                <Text style={styles.modalText}>Request Sent to {item[1].fullName}!</Text>
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
            style={[
              styles.btn,
              { backgroundColor: "#ff8500", marginTop: "3%", marginBottom:"2%" },
            ]}
            onPress={
              sendRequest
              // () => setModalVisible(true)
            }
          >
            <Text style={styles.textStyle}>Book a walk</Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: "#A25400", },
            ]}
            onPress={
              DirectToWhatsapp
            }
          >
            <Text style={styles.textStyle}>Connect with {item[1].fullName}</Text>
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
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WalkerProfile;
