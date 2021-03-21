import "reflect-metadata";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styles from './screens/Home/Styles';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

function DetailsScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      "DigitalCounter7": require("./assets/fonts/DigitalCounter7.ttf")
    }).catch(console.warn);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync().then();
  }

  render() {
    if ( !this.state.fontsLoaded ) {
      return (
          <View>
            <AppLoading />
          </View>
      );
    } else {
      return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
              />
              <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
      );
    }
  }
}
