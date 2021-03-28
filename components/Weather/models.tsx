import {AllInOneWeather} from "../../utils/weather/models";

export interface State {
  latitude: number,
  longitude: number,
  error: string,
  weather: AllInOneWeather,
  weatherUpdateTimeout: any,
  showZipModal: boolean | false,
  showLocReqModal: boolean | false,
}

export class ManualLocationProperties {
  zipCode = '';
  city = '';
  state = '';
  countryCode = '';
  cityOrZip : CityZipSelection = CityZipSelection.NOT_SELECTED;
}

export enum CityZipSelection {
  CITY,
  ZIP,
  NOT_SELECTED
}