import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import { DatePickerIOS, } from "@react-native-community/datetimepicker";

const DatePicker = () => {

  const [chosenDate, setChosenDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setChosenDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DatePicker;