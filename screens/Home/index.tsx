import React from 'react';
import styles from './Styles';
import {View, Text} from 'react-native';
import Clock from "../../components/Clock";
import Slideshow from "../../components/Slideshow";
import Weather from "../../components/Weather";

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <Slideshow/>
        <View style={[styles.rowButtons, styles.bottomRowButtons]}>
        </View>
        <View style={[styles.rowButtons, styles.bottomRowButtons]}>
          <Weather style={styles.weather}/>
          <View style={styles.clock}>
            <Clock/>
          </View>
        </View>
      </View>
  );
}
