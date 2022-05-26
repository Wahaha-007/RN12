import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
    // navigation.navigate('AllPlaces', { // Old version before using Db
    //   place: place,
    // });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
