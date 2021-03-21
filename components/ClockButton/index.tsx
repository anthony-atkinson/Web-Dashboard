import {Text, Button, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import Colors from "../../constants/colors"

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderColor: Colors.RED,
    borderStyle: "solid",
    borderWidth: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
    shadowRadius: 4,
    shadowColor: Colors.BLACK
  },
  text: {
    marginTop: 5,
    color: Colors.RED,
    fontSize: 18,
    fontFamily: "DigitalCounter7",
  }
})

export default function ClockButton({
  onPressFunc, text
} : {onPressFunc: Function, text: string}) {
  return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => onPressFunc() }>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
  );
}