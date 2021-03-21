import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {AllInOneWeather, State} from "./models";
import {plainToClass} from "class-transformer";
import styles from "./styles";
import {format} from "date-fns";

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '865e82a956a9bbd334c8562f971a5477';
const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default class Weather extends Component<any, State> {
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
          this.setState((prevState, props) => ({
            latitude: prevState.latitude,
            longitude: prevState.longitude,
            weather: plainToClass(AllInOneWeather, data, { excludeExtraneousValues: true }),
            weatherUpdateTimeout: setTimeout(() => this.getWeather(lat, long), FIVE_MINUTES_MS),
          }));
        });
  }

  getLocation() {
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState((prevState, props) => ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }), () => {
                this.getWeather(position.coords.latitude, position.coords.longitude);
              }
          );
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidMount() {
    this.getLocation();
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