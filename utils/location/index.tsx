import {Platform} from "react-native";
import * as Location from 'expo-location';

export class LatLong {
  latitude: number;
  longitude: number;

  constructor(lat : number, long : number) {
    this.latitude = lat;
    this.longitude = long;
  }
}

function handleBrowser() {
  return new Promise<LatLong>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((loc) => {
      resolve(new LatLong(loc.coords.latitude, loc.coords.longitude));
    }, reject, { enableHighAccuracy: false })
  });
}

async function handleEverythingElse() {
  const {status} = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    throw 'Permission to access location was denied';
  } else {
    const loc = (await Location.getLastKnownPositionAsync({ maxAge: 6 * 60 * 60 * 1000 })
        || await Location.getCurrentPositionAsync()
    );
    return new LatLong(loc.coords.latitude, loc.coords.longitude);
  }
}

export async function getLocation() : Promise<LatLong> {
  switch (Platform.OS) {
    case 'web':
      return await handleBrowser();
    default:
      return await handleEverythingElse();
  }
}