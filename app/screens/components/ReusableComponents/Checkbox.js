import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";

const checkbox = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Walker</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

  export default checkbox;