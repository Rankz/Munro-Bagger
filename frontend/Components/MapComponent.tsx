import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useHistory } from 'react-router-native';
import { styles, customMap } from '../styles/mapStyles';
import { getMountains } from '../store/getAllMountains.store';
import GreenMountain from '../assets/greenMountain.png';
import RedMountain from '../assets/redMountain.png';

const MapComponent = () => {
  const mountainList: MountainInfo[] = useSelector((state:any) => state.allMountains.mountainList);
  const dispatch = useDispatch();
  const history = useHistory();

  const listOfMarkers = mountainList ? mountainList.map((location: any) => {
    const markerLocation = {
      latitude: location.Peak.latitude,
      longitude: location.Peak.longitude,
    };
    return (
      <Marker
        onPress={() => history.push(`/mountain/${location.id}`)}
        key={location.id}
        coordinate={markerLocation}
        image={location.Statuses[0]?.climbed ? GreenMountain : RedMountain}
      >
        <Callout>
          <Text>{location.name}</Text>
        </Callout>
      </Marker>
    );
  }) : null;

  useEffect(() => {
    dispatch(getMountains());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        region={{
          latitude: 57.3017,
          longitude: -4.60763,
          latitudeDelta: 4.5,
          longitudeDelta: 1,
        }}
        style={styles.map}
        customMapStyle={customMap}
      >
        {listOfMarkers}
      </MapView>
    </SafeAreaView>
  );
};

export default MapComponent;
