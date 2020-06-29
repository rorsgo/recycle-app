import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons"
import { StyleSheet, View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./styles";
import pickerSelectStyles from "./components/pickerSelectStyles";
import selectIconStyle from "./components/selectIconStyles";

const selectIcon = Object.assign(selectIconStyle);

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
  const [zipCode, setZipCode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEStateResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
        const stateInitials = response.data.map(state => state.sigla);
        setStateInitials(stateInitials.sort());
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

  function navigationToPoints() {
    navigation.navigate("Points", {
      state,
      city,
      zipCode
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
              label: "Select a state",
            }}
            value={state}
            Icon={() => {
              return (
                <View style={selectIcon} />
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
                <View style={selectIcon} />
              );
            }}
            onValueChange={city => setCity(city)}
            items={selectedCity?.map(city => ({
              label: city,
              value: city
            }))} />
          <TextInput
            style={styles.input}
            maxLength={8}
            placeholder={"ZipCode"}
            keyboardType={"number-pad"}
            value={zipCode}
            onChangeText={setZipCode}
          />
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

export default Home;