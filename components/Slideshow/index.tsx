import styles from "./styles";
import { Image, View } from "react-native";
import ClockButton from "../ClockButton";
import React, {useEffect, useState} from "react";
import {format, add} from "date-fns";
import Constants from "expo-constants";

const FIVE_MINUTES_MS = 5 * 60 * 1000;
const TEXT = {
  PAUSE_SLIDESHOW: ' PAUSE SLIDESHOW ',
  RESUME_SLIDESHOW: 'RESUME SLIDESHOW',
}
const BG_URL = Constants.manifest.extra.backgroundImagesBaseUrl;

export default function Slideshow() {
  const [bgTimeout, setBgTimeout] : any = useState(null);
  const [nextBackgroundUpdate, setNextBackgroundUpdate] = useState(-1);
  const [timeToUseForBackgroundUpdateTimeout, setTimeToUseForBackgroundUpdateTimeout] = useState(-1);
  const [backgroundUri, setBackgroundUri] = useState('');
  const [backgroundSizeStyle, setBackgroundSizeStyle] = useState({height: 0});
  const [slideshowStateText, setSlideshowStateText] = useState(TEXT.PAUSE_SLIDESHOW);

  const updateBackground = (uiTriggered : boolean = false) => {
    console.log('Updating Background');
    fetch(`${BG_URL}/random_background`).then(resp => resp.json()).then(respJson => {
      const imgUrl = `/${respJson.image}`;
      setBackgroundUri(imgUrl);
      if (uiTriggered) {
        clearTimeout(bgTimeout);
        setBgTimeout(null);
      }
    }).catch( (error) => {
      console.warn(error);
    }).finally( () => {
      const nextUpdate = add(new Date(), {minutes: 5});
      setNextBackgroundUpdate(nextUpdate.getTime());
      console.log(`Next Background refresh at ${format(new Date(nextUpdate), "yyyy-MM-dd HH:mm:ss")}`);
      setBgTimeout(setTimeout(updateBackground, (nextUpdate.getTime() - new Date().getTime()) ));
    });
  };

  const changeSlideshowState = () => {
    if (bgTimeout !== null) {
      console.log('Pausing Slideshow');
      setSlideshowStateText(TEXT.RESUME_SLIDESHOW);
      // Need to Pause
      const newTimoutTime = nextBackgroundUpdate - new Date().getTime();
      setTimeToUseForBackgroundUpdateTimeout((newTimoutTime > 0) ? newTimoutTime : FIVE_MINUTES_MS);
      clearTimeout(bgTimeout);
      setBgTimeout(null);
    } else {
      console.log('Resuming Slideshow');
      setSlideshowStateText(TEXT.PAUSE_SLIDESHOW);
      // Need to Resume
      setNextBackgroundUpdate(new Date().getTime() + timeToUseForBackgroundUpdateTimeout);
      console.log(`Next Background refresh at ${format(new Date(nextBackgroundUpdate), "yyyy-MM-dd HH:mm:ss")}`);
      setBgTimeout(setTimeout(updateBackground, timeToUseForBackgroundUpdateTimeout) );
    }
  }

  useEffect(updateBackground, []);

  return(
    <View style={styles.container}>
      <View style={[styles.rowButtons, styles.topRowButtons]}>
        <ClockButton
            text={slideshowStateText}
            onPressFunc={() => changeSlideshowState() }
        />
        <ClockButton
            text={'NEXT'}
            onPressFunc={() => updateBackground(true) }
        />
      </View>
      <Image
          style={styles.light}
          blurRadius={50}
          source={{ uri: backgroundUri }}
      />
      {(backgroundUri !== '') ?
          <Image
              style={[styles.background]}
              height={backgroundSizeStyle.height}
              source={{uri: backgroundUri}}
          /> : null
      }
    </View>
  )
}