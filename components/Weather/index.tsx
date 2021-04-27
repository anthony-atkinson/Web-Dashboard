import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ManualLocationProperties, State} from "./models";
import styles from "./styles";
import {format, add} from "date-fns";
import {getLocation, LatLong} from "../../utils/location";
import ManualLocationModal from "./manualLocationModal";
import {getGeoCodedLatLong, getWeather as getWeatherData} from '../../utils/weather';
import * as Location from 'expo-location';
import {PermissionStatus} from 'unimodules-permissions-interface'
import RequestLocationModal from "./requestLocationModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  updateParent: Function,
}

export default class Weather extends Component<Props, State> {
  getWeather(lat : number, long : number) {
    this.props.updateParent('updateBottomRowLeft');
    console.log('Refreshing weather');
    getWeatherData(lat, long).then(weatherData => {
      this.setState(() => ({
        weather: weatherData,
      }));
    }).finally ( () => {
      const nextUpdate = add(new Date(), {minutes: 5});
      console.log('Next weather update will be at ' +
          format(new Date(nextUpdate), "yyyy-MM-dd HH:mm:ss"));
      if (this.state.weatherUpdateTimeout) {
        clearTimeout(this.state.weatherUpdateTimeout);
      }
      this.setState(() => ({
        weatherUpdateTimeout: setTimeout(() => this.getWeather(lat, long),
            (nextUpdate.getTime() - new Date().getTime()) ),
      }));
    });
  }

  // Using that since the standard this isn't in scope when this is ran.
  getLocationInfoAfterModal(that : Weather, confirmed : boolean) {
    if (confirmed) {
      AsyncStorage.setItem('LocationNeedAcked', 'granted').then(() => {
        that.maybeDisplayWeatherModal().then();
      });
    } else {
      AsyncStorage.setItem('LocationNeedAcked', 'denied').then();
    }
  }

  async handleManualLocationInfoGather() {
    const lat = await AsyncStorage.getItem('cachedLat');
    const long = await AsyncStorage.getItem('cachedLong');
    if (!lat && !long) {
      this.setState({
        showZipModal: true,
      });
    } else {
      console.log(`Using cached latitude and longitude. Latitude: ${lat}; Longitude: ${long}`);
      this.getWeather( Number(lat), Number(long) );
    }
  }

  async getLocationInfo() {
    const lat = await AsyncStorage.getItem('cachedLat');
    const long = await AsyncStorage.getItem('cachedLong');

    if (lat && long) {
      // We'll jump straight to getting weather info since we already have the info cached.
      this.getWeather(Number(lat), Number(long));
    }

    let useManualLocHandled = false;
    const useManualLoc = (e : Error) => {
      if ( !useManualLocHandled ) {
        console.log(e);
        this.handleManualLocationInfoGather().then();
      }
      useManualLocHandled = true;
    };
    const locPromise = getLocation();
    let timeoutId : any;
    const locTimeoutPromise = new Promise( (resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject('Timeout while waiting for standard location retrieval. Getting lat/long from cache or from user.');
      }, 10 * 1000);
    });
    locPromise.then( (coords : LatLong) => {
      // We do not want to handle the result of this if we've already timed out.
      if ( !useManualLocHandled ) {
        clearTimeout(timeoutId);
        this.setState(() => ({
              latitude: coords.latitude,
              longitude: coords.longitude,
            }), () => {
              this.getWeather(coords.latitude, coords.longitude);
            }
        );
      }
    });
    Promise.race([
        locPromise,
        locTimeoutPromise,
    ]).catch(useManualLoc);
  }

  async maybeDisplayWeatherModal() {
    // There are some browsers that will always return this so we have to
    // check out own variable as well to make sure we don't annoy the user
    const modalAlreadyAcked = await AsyncStorage.getItem('LocationNeedAcked');
    if (modalAlreadyAcked === null) {
      this.setState({
        showLocReqModal: true
      });
    } else if (modalAlreadyAcked === 'granted') {
      const {status} = await Location.getPermissionsAsync();
      switch (status) {
        case PermissionStatus.UNDETERMINED:
          await this.getLocationInfo();
          break;
        case PermissionStatus.DENIED:
          console.log('DENIED');
          this.setState({error: 'Permission to access location was denied'});
          break;
        case PermissionStatus.GRANTED:
          console.log('GRANTED');
          await this.getLocationInfo();
          break;
      }
    }
  }

  // Using that since the standard this isn't in scope when this is ran.
  getLocationUsingManualData(val : ManualLocationProperties, that : Weather) {
    const langLongResp = getGeoCodedLatLong(val.city, val.state, val.countryCode, val.zipCode);
    langLongResp.then( async (latLong) => {
      if (latLong && latLong.lat && latLong.long) {
        await AsyncStorage.setItem('cachedLat', `${latLong.lat}`);
        await AsyncStorage.setItem('cachedLong', `${latLong.long}`);
        that.setState({
          latitude: latLong.lat,
          longitude: latLong.long,
        });
        that.getWeather(latLong.lat, latLong.lat);
      }
    }).catch( e => {
      console.log(e);
      that.setState({
        error: 'An error occurred while getting location information.'
      })
    });
  }

  componentDidMount() {
    this.maybeDisplayWeatherModal().then();
  }

  componentWillUnmount() {
    if (this.state.weatherUpdateTimeout) {
      clearTimeout(this.state.weatherUpdateTimeout);
    }
  }

  render() {
    return (
        <View>
          { this.state?.showZipModal ? (
              <View>
                <ManualLocationModal
                    runOnComplete={ (val : ManualLocationProperties) => this.getLocationUsingManualData(val, this)}
                    showModal={this.state.showZipModal}
                />
              </View>
          ) : null}
          { this.state?.showLocReqModal ? (
              <View>
                <RequestLocationModal
                    runOnComplete={ () => this.getLocationInfoAfterModal(this, true)}
                    runOnCancel={ () => this.getLocationInfoAfterModal(this, false)}
                    showModal={this.state.showLocReqModal}
                />
              </View>
          ) : null}
          { this.state?.weather?.daily ? (
              <View style={styles.weatherContainer}>
                <View style={styles.currentWeatherContainer}>
                  <View style={styles.weatherRow}>
                    <Text style={styles.textCurrent}>Current</Text>
                    <Text style={styles.dynamicText}>
                      {this.state.weather.current?.temp?.getFahrenheit()}
                    </Text>
                    <Text style={styles.staticTextDegree}>&#730;</Text>
                    <Text style={styles.tempUnit}>F</Text>

                    <Text style={styles.textMinMax}>Max</Text>
                    <Text style={styles.dynamicText}>
                      {this.state.weather.daily[0].temp?.max.getFahrenheit()}
                    </Text>
                    <Text style={styles.staticTextDegree}>&#730;</Text>
                    <Text style={styles.tempUnit}>F</Text>
                  </View>

                  <View style={styles.weatherRow}>
                    <Text style={styles.textFeelsLike}>Feels Like</Text>
                    <Text style={styles.dynamicText}>
                      {this.state.weather.current?.feels_like?.getFahrenheit()}
                    </Text>
                    <Text style={styles.staticTextDegree}>&#730;</Text>
                    <Text style={styles.tempUnit}>F</Text>

                    <Text style={styles.textMinMax}>Min</Text>
                    <Text style={styles.dynamicText}>
                      {this.state.weather.daily[0].temp?.min.getFahrenheit()}
                    </Text>
                    <Text style={styles.staticTextDegree}>&#730;</Text>
                    <Text style={styles.tempUnit}>F</Text>

                  </View>
                </View>
                <Image style={styles.weatherIcon} source={{uri: this.state.weather.current?.weather[0].getIconUri()}} />

                { this.state?.weather?.daily ? (
                    <View style={styles.forecastContainer}>
                      {this.state.weather.daily.map( item => (
                          <View key={item.dt?.getTime()} style={styles.forecastCol}>
                            <Text style={styles.forecastDayName}>{item.getWeatherDay()}</Text>
                            <Image style={styles.forecastWeatherIcon} source={{uri: item.weather[0].getIconUri()}} />
                            <Text style={styles.forecastRow}>
                              <Text style={styles.dynamicForecastText}>{item.temp?.max.getFahrenheit()}</Text>
                              <Text style={styles.staticForecastText}> / </Text>
                              <Text style={styles.dynamicForecastText}>{item.temp?.min.getFahrenheit()}</Text>
                              <Text style={styles.staticForecastTextDegree}>&#730;</Text>
                              <Text style={styles.forecastTempUnit}>F</Text>
                            </Text>
                          </View>
                      ))}
                    </View>
                ) : null }
              </View>
          ) : null}
        </View>
    )
  }
}