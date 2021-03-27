import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-elements';
import {AllInOneWeather, ModalProps, State} from "./models";
import {plainToClass} from "class-transformer";
import styles from "./styles";
import {format} from "date-fns";
import {PermissionStatus} from 'unimodules-permissions-interface'
import * as Location from 'expo-location';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '865e82a956a9bbd334c8562f971a5477';
const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default class Weather extends Component<ModalProps, State> {
  getWeather(lat : number, long : number) {
    console.log('Refreshing weather');
    const url = `${BASE_WEATHER_URL}/onecall?lat=${lat}&lon=${long}&` +
        `exclude=minutely,hourly&units=standard&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          const nextUpdate = new Date(new Date().getTime() + FIVE_MINUTES_MS);
          console.log('Next weather update will be at ' +
              format(new Date(nextUpdate), "yyyy-MM-dd HH:mm:ss"));
          this.setState((prevState) => ({
            latitude: prevState.latitude,
            longitude: prevState.longitude,
            weather: plainToClass(AllInOneWeather, data, { excludeExtraneousValues: true }),
            weatherUpdateTimeout: setTimeout(() => this.getWeather(lat, long), FIVE_MINUTES_MS),
          }));
        });
  }

  async maybeDisplayWeatherModal() {
    const {status} = await Location.getPermissionsAsync();
    switch (status) {
      case PermissionStatus.UNDETERMINED:
        this.props.showLocationModalAction(this.getLocation);
        break;
      case PermissionStatus.DENIED:
        this.setState({error: 'Permission to access location was denied'});
        break;
      case PermissionStatus.GRANTED:
        this.getLocation().then();
        break;
    }
  }

  async getLocation() {
    const {status} = await Location.getPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      this.setState({error: 'Permission to access location was denied'});
    } else {
      let loc = (await Location.getLastKnownPositionAsync({ maxAge: 6 * 60 * 60 * 1000 })
          || await Location.getCurrentPositionAsync()
      );
      if ( loc && loc.coords) {
        this.setState(() => ({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            }), () => {
              this.getWeather(loc.coords.latitude, loc.coords.longitude);
            }
        );
      }
    }
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
          { this.state?.weather ? (
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