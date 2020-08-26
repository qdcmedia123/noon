import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = (props) => {
  const [locationLoading, setLocationLoading] = useState(false);
  const readonly = props.navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [defaultLocation, setDefaultLocation] = useState({
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getCurrentLocation = useCallback(async () => {
    setLocationLoading(true);
    const location = await Location.getCurrentPositionAsync({ timeout: 5000 });   
    setDefaultLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setLocationLoading(false);
  }, [Location]);

  const savePickedLocationHandler = useCallback(async () => {

  
    props.navigation.navigate("EditShippingDetails", { pickedLocation: selectedLocation === undefined ? defaultLocation : selectedLocation });
  }, [selectedLocation]);


  useEffect(() => {
    getCurrentLocation();
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [getCurrentLocation, savePickedLocationHandler]);



  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

 

  let markerCordinates;

  if (selectedLocation) {
    markerCordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  } else {
    markerCordinates = {
      latitude: defaultLocation.latitude,
      longitude: defaultLocation.longitude,
    };
  }
  return locationLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <MapView
      style={styles.map}
      region={defaultLocation}
      onPress={selectLocationHandler}
      zoomEnabled={true}
      zoomControlEnabled={true}
    >
      {/* 25.07557 55.14536 */}
      {markerCordinates && (
        <Marker title="Picked Loation" coordinate={markerCordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");

  if (readonly) {
    return {};
  }

  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: "#000000",
  },
});

export default MapScreen;
