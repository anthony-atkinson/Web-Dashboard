import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles';
import {View} from 'react-native';
import Clock from "../../components/Clock";
import Slideshow from "../../components/Slideshow";
import Weather from "../../components/Weather";

export default function HomeScreen() {
  const [bottomRowLeft, setBottomRowLeft] = useState<any>();

  const handleChildAction = (action : string) => {
    switch (action) {
      case 'updateBottomRowLeft':
        setBottomRowLeft(15);
        break;
      default:
        console.log(`Action ${action} not yet mapped in handleChildAction`);
    }
  };

  return (
      <View style={styles.container}>
        <Slideshow/>
        <View style={[styles.rowButtons, styles.bottomRowButtons, {left: bottomRowLeft}]}>
          <Weather  updateParent={handleChildAction}/>
          <View style={styles.clock}>
            <Clock/>
          </View>
        </View>
      </View>
  );
}
