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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";

import * as ImagePicker from "expo-image-picker";

import Input from "../ReusableComponents/Input";

const EditProfile = ({ navigation }) => {
  // const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(
    "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
  );

  const Update_URL = "http://192.168.1.108:3000/api/users/update-user";
  const Image_URL = "http://192.168.1.108:3000/api/users/post-image";

async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	return result;
  }

  // Upload to Cloudinary
const handleUpload = (image) => {
  const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', '_SideLick');
    data.append('cloud_name', 'hala');
  fetch('https://api.cloudinary.com/v1_1/hala/image/upload', {
    method: 'post',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      setImg(data.url);
      saveImageURL(data.url);
    });
};
  const PostImageHandler = async() => {
  let permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    return;
  }
  let data = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  if (data.cancelled) {
    return;
  }
  let selectedImage = {
    uri: data.uri,
    type: `profile/${data.uri.split('.')[1]}`,
    name: `profile.${data.uri.split('.')[1]}`,
  };
  handleUpload(selectedImage);
};

const saveImageURL = async(img_URL) => {
  let result;
      await getValueFor("userToken").then((value) => {
        result = value;
      });
      let savedImage = await fetch(Image_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": result
        },
        body: JSON.stringify({
          image: img_URL
        }),
      });
      if (!savedImage.ok) {
        const message = `Image: An error has occured`;
        console.log("message: ",message);
      } else {
        alert("Image changed successfully!")
      }
    };

  const UpdateProfile = async () => {
    let result;
    await getValueFor("userToken").then((value) => {
      result = value;
    });
    let userData = await fetch(Update_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": result,
      },
      body: JSON.stringify({
        fullName: name,
        email: email,
        password: password,
      }),
    });
    if (!userData.ok || userData.status !== 201) {
      const message = `An error has occured`;
      console.log("Message: ", message);
    } else {
      alert("Changes saved!");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={[styles.root, { height: height, width: width }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "5%",
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon name="chevron-thin-left" size={25} color="#000" />
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          style={styles.header}
          onPress={() => PostImageHandler()}
        >
          <View style={{ position: "absolute", top: 0, right: 130 }}>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                borderRadius: 30,
                padding: 8,
              }}
            >
              <Icon name="edit" size={22} />
            </View>
          </View>
          <Image
            source={{
              uri: img,
            }}
            style={styles.profilepicture}
          />
          <Text style={styles.userName} value={name}>
            {name}
          </Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Input placeholder={"Full Name"} value={name} setValue={setName} />
          <Input placeholder={"Email"} value={email} setValue={setEmail} />
          <Input
            placeholder={"Password"}
            value={password}
            setValue={setPassword}
          />
        </View>
        <View style={styles.footer}>
          <Pressable onPress={() => UpdateProfile()}>
            <Text style={styles.footerText}>
              <Icon name="download" size={22} color="orange" />
              <View style={{ paddingHorizontal: "3%" }} />
              Save
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  header: {
    flex: 1,
    marginTop: "5%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10%",
  },
  userName: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 34,
    lineHeight: 51,
    letterSpacing: -0.41,
  },
  subtext: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 19,
    color: "#7A7A7A",
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  footerText: {
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#7A7A7A",
    textAlign: "center",
  },
  inputContainer: {
    paddingVertical: "7%",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  inputStyle: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: "3%",
  },
  profilepicture: {
    borderRadius: 100,
    width: 165,
    height: 165,
    zIndex: -1,
  },
});

export default EditProfile;
