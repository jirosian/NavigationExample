import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);

  const fetchLocationData = async () => {
    try {
      const response = await fetch(
        `http://api.geonames.org/wikipediaSearch?q=${city}&maxRows=5&username=jirosian`
      );
      const result = await response.json();
      const locationData = result.geonames[0];
      if (locationData) {
        setLocation({
          latitude: parseFloat(locationData.lat),
          longitude: parseFloat(locationData.lng),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>MAP Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Location Data" onPress={fetchLocationData} />
      <MapView
        style={styles.map}
        region={location}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={city}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '60%',
    marginTop: 20,
  },
});
