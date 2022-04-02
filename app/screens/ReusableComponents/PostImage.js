import React, { useEffect, useState } from 'react';
import { View,Alert,StyleSheet, Modal,ScrollView, Text,SafeAreaView,TouchableOpacity, Image, } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from 'expo-image-picker';

const PostImage = () => {

const [img, setImg] = useState("https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png")

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

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

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
      if (!savedImage.ok || savedImage.status !== 201) {
        savedImage = await savedImage.json();
        const message = `An error has occured: ${savedImage.status}`;
        console.log("message: ",message);
      } else {
        savedImage = await savedImage.json();
        console.log("after fetch:", savedImage.location);
      }
    };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: "10%"}}>
<TouchableOpacity style={styles.header} onPress={() =>  PostImageHandler()}>
			  		  <View style={{ position:'absolute', top:0,right:130, }}>
			  <View style={{ backgroundColor: "#F0F0F0", borderRadius: 30, padding:8,}} >
	  <Icon name="edit" size={22}/>
	  </View>
	  </View>
			<Image
			  source={{
          uri: img,
        }}
			  style={styles.profilepicture}
			/>
			<Text style={styles.userName} >User Name</Text>
		  </TouchableOpacity>
      </View>
    )
};

const styles = StyleSheet.create({
	profilepicture: {
	  borderRadius: 100,
	  width: 165,
	  height: 165,
	  zIndex: -1,
	},
	userName: {
	  fontWeight: "700",
	  fontStyle: "normal",
	  fontSize: 34,
	  lineHeight: 51,
	  letterSpacing: -0.41,
	},
	header: {
		flex:1,
	  marginTop: "5%",
	  marginBottom: "5%",
	  justifyContent: "center",
	  alignItems: "center",
	},
})

export default PostImage;