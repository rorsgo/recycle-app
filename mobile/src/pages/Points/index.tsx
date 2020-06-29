import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import Map, { Marker } from "react-native-maps";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import * as Location from "expo-location";
import api from "../../services/api";
import styles from "./styles";

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface RouteParam {
  state: string;
  city: string;
  zipCode: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const navigation = useNavigation();
  const route = useRoute();

  const {city, state, zipCode} = route.params as RouteParam;

  useEffect(() => {
    api.get("points", {
      params: {
        state: state,
        city: city,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    })
  }, [selectedItems]);

  useEffect(() => {
    api.get("items").then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      if (state === "0" && city === "0" || state === "undefined" && city === "undefined") {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("Ops!", "We need the location permission to load your position.")
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = userLocation.coords;

        setInitialPosition([
          latitude,
          longitude
        ]);
      }

      const data = {
        city,
        state,
        zipCode
      }

      const location = await api.post("location", data);
      setInitialPosition([
        location.data.latitude,
        location.data.longitude
      ]);
    }

    loadPosition();
  }, []);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function backToHome() {
    navigation.goBack();
  }

  function navigationToDetail(id: number) {
    navigation.navigate("Detail", { pointID: id });
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={backToHome}>
          <Icon name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>Find on the map one or more collection waste point.</Text>
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <Map style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}>
              {points.map(point => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => navigationToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}>
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </Map>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20
          }}>
          {items.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={
                [
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {}]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}>
              <SvgFromUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
};

export default Points;