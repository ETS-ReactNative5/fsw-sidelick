import { ImageBackground,View, TouchableWithoutFeedback, StyleSheet, Text, SafeAreaView, Dimensions, Image } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

const PetsProfile = ({navigation}) => {
	const { width, height } = Dimensions.get("window");
  return (
      <SafeAreaView style={[styles.root, { height: height, width: width }]}>
		            <TouchableWithoutFeedback style={styles.header} onPress={() => navigation.goBack()}>
            <Icon
              style={{ margin: "5%" }}
              name="arrow-back-ios"
              size={30}
              color="#000"
            />
          </TouchableWithoutFeedback>
		  <View style={{flexDirection:'column', alignItems:'center', marginVertical:"45%",shadowOpacity:0.25, shadowColor: "#ff8500"}}>
			  <Text style={{marginVertical:"3%"}}>
			  <Icon name="construction" size={80}/>
			  </Text>
			  <Text style={{fontSize:30, textAlign:'center', letterSpacing: 0.5}}>
				  PAGE UNDER CONSTRUCTION!
			  </Text>
		  </View>
	  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	root:{
		flex:1,
	},
})

export default PetsProfile;
