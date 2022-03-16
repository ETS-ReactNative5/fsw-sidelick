import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  btnText,
  type = "primary",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      style={[styles.container, styles[`container_${type}`], 
      bgColor ? {backgroundColor: bgColor} : {} ,
    ]
  }
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`text_${type}`],
      fgColor ? {color: fgColor} : {}
    ]}>{btnText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: "5%",
    borderRadius: 14,
    marginVertical: 10,
  },
  container_primary: {
    backgroundColor: "orange",
  },
  container_tertiary: {},
  container_outline:{
    borderWidth:1,
    borderColor:'rgba(176, 176, 176, 1)',
  },  
  text: {
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 25.5,
    letterSpacing: 0.5,
    color: "white",
  },
  text_tertiary: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 15,
    color: "#7A7A7A",
    lineHeight: 26,
    letterSpacing: 0.25,
  },
});

export default CustomButton;
