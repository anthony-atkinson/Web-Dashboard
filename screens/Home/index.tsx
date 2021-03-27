import React, {useReducer} from 'react';
import styles from './styles';
import {View} from 'react-native';
import Clock from "../../components/Clock";
import Slideshow from "../../components/Slideshow";
import Weather from "../../components/Weather";
import Modal from "../../components/Modal";
import {ACTION_TYPES, reducer as modalReducer} from "../../components/Modal/reducer"

export default function HomeScreen() {
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    show: false,
    content: '',
    confirmButtonText: '',
  });

  return (
      <View style={styles.container}>
        <Modal
            confirmButtonText={modalState.confirmButtonText}
            content={modalState.content}
            show={modalState.show}
        />
        <Slideshow/>
        <View style={[styles.rowButtons, styles.bottomRowButtons]}>
        </View>
        <View style={[styles.rowButtons, styles.bottomRowButtons]}>
          <Weather
              style={styles.weather}
              showLocationModalAction={(closeAction : Function) => {

              }}/>
          <View style={styles.clock}>
            <Clock/>
          </View>
        </View>
      </View>
  );
}
