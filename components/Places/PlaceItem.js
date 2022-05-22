import { Pressable, Image, Text, View, StyleSheet } from 'react-native';

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable onPRess={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
