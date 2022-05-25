import { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, Image, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getMapPreview } from '../../util/location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // 1. Handle Coordinate from Map Piccker
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  // Will not work in Stack Navigation because 'No new rendor' just 'put the stack upfront'
  // So we add isFocused to dependency array
  // REMEMBER ! THIS IS PATTERN for stack navigation
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
      onPickLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  //useEffect(() => {
  //  onPickLocation(pickedLocation);
  //}, [pickedLocation]); // Just try to be cool !

  // 2. Handle Coordinate from user current location (GPS)

  // 2.1. Permission ( Management ), Need this step for both iOS / Android
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  // 2.2. Get Current Location ( Worker )
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    //console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    onPickLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  // 3. Display Map picture via the above coordinate

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
