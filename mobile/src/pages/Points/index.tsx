import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Map, { Marker } from "react-native-maps";
import { SvgFromUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import api from "../../services/api";

interface Item {
  id: number,
  title: string,
  image_url: string
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    api.get("items").then(response => {
      setItems(response.data);
    });
  }, []);

  const navigation = useNavigation();

  function backToHome() {
    navigation.goBack;
  }

  function navigationToDetail() {
    navigation.navigate("Detail");
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
          <Map style={styles.map}
            initialRegion={{
              latitude: -23.6179527,
              longitude: -46.6367343,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006
            }}>
            <Marker
              style={styles.mapMarker}
              onPress={navigationToDetail}
              coordinate={{
                latitude: -23.6179527,
                longitude: -46.6367343
              }}>
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{ uri: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" }} />
                <Text style={styles.mapMarkerTitle}>Market</Text>
              </View>
            </Marker>
          </Map>
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
            <TouchableOpacity key={String(item.id)} style={styles.item} onPress={() => { }}>
              <SvgFromUri width={42} height={42} uri={item.image_url} />
          <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;