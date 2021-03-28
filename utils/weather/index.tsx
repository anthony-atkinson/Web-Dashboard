import {format} from "date-fns";
import {plainToClass} from "class-transformer";
import {AllInOneWeather} from "./models";

const BASE_URL = 'https://api.openweathermap.org';
const BASE_WEATHER_URL = `${BASE_URL}/data/2.5`;
const BASE_GEOCODE_URL = `${BASE_URL}/geo/1.0`;
const API_KEY = '865e82a956a9bbd334c8562f971a5477';

export function getWeather(lat : number, long : number) {
  const url = `${BASE_WEATHER_URL}/onecall?lat=${lat}&lon=${long}&` +
      `exclude=minutely,hourly&units=standard&appid=${API_KEY}`;
  return fetch(url)
      .then(response => response.json())
      .then(data => {
        return plainToClass(AllInOneWeather, data, { excludeExtraneousValues: true });
      });
}

export function getGeoCodedLatLong(city : string, state : string, countryCode : string, zip : string) {
  let url = ''
  if (zip && zip !== '') {
    url = `${BASE_GEOCODE_URL}/zip?zip=${zip}`;
  } else {
    url = `${BASE_GEOCODE_URL}/direct?q=${city}`;
    if (state && state !== '') {
      url += `,${state}`;
    }
  }
  if (countryCode && countryCode !== '') {
    url += `,${countryCode}`;
  }
  url += `&appid=${API_KEY}`;
  return fetch(url)
      .then(response => response.json())
      .then(data => {
        // The direct (city, state, country) URL will return an array of
        // results (even if there is only one) so we have to handle that.
        const latLongData = (Array.isArray(data) && data.length > 0) ? data[0] : data;
        return {
          lat: latLongData.lat,
          long: latLongData.lon,
        }
      });
}