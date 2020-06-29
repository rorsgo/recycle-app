import React from "react";
import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#322153',
    fontWeight: "bold",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    color: '#322153',
    fontWeight: "bold",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
    marginVertical: 10
  },
});

export default pickerSelectStyles;