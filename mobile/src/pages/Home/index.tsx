import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Feather as Icon } from "@expo/vector-icons"
import { StyleSheet, View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface IBGEStateResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [state, setState] = useState("0");
  const [stateInitials, setStateInitials] = useState<string[]>([]);
  const [city, setCity] = useState("0");
  const [selectedCity, setSelectedCity] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEStateResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
        const stateInitials = response.data.map(state => state.sigla);
        setStateInitials(stateInitials);
      })
  }, []);

  useEffect(() => {
    if (state === "0") {
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then(response => {
        const citiesName = response.data.map(city => city.nome);
        setSelectedCity(citiesName);
      })
  }, [state]);

  function handleSelectedState(event: ChangeEvent<HTMLSelectElement>) {
    const stateInitial = event.target.value;
    setState(stateInitial);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const cityName = event.target.value;
    setCity(cityName);
  }

  function navigationToPoints() {
    navigation.navigate("Points", {
      state,
      city
    });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}>
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>Your collection waste localized</Text>
            <Text style={styles.description}>We help people find collection points efficiently.</Text>
          </View>
        </View>
        <View>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: "Select a state"
            }}
            value={state}
            Icon={() => {
              return (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: 'gray',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    marginVertical: 30,
                    marginHorizontal: -35
                  }}
                />
              );
            }}
            onValueChange={state => setState(state)}
            items={stateInitials?.map(state => ({
              label: state,
              value: state
            }))} />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: "Select a city"
            }}
            value={city}
            Icon={() => {
              return (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: 'gray',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    marginVertical: 30,
                    marginHorizontal: -35
                  }}
                />
              );
            }}
            onValueChange={city => setCity(city)}
            items={selectedCity?.map(city => ({
              label: city,
              value: city
            }))} />
          <RectButton style={styles.button} onPress={navigationToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFFFFF" size={24} />
            </View>
            <Text style={styles.buttonText}>
              Access
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  input: {
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
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

export default Home;