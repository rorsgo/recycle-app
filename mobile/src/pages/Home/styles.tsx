import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 40,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
    marginBottom: 40
  },

  input: {
    height: 46,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderTopWidth: 0.9,
    borderBottomWidth: 0.9,
    borderRightWidth: 0.8,
    borderLeftWidth: 0.8,
    borderWidth: 1,
    color: '#322153',
    fontWeight: "bold",
    marginVertical: 10,
    paddingVertical: 8,
    paddingLeft: 10, // to ensure the text is never behind the icon
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default styles;