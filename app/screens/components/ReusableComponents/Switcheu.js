import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

const Switcheu = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
		<Text style={styles.text}>Walker?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "rgba(255, 151, 54, 1)" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
  },
  text:{
	fontSize: 18,
	fontWeight: "bold",
	marginRight: 5,
	color: "#3e3e3e"
  }
});

export default Switcheu;