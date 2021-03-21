import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import { format } from "date-fns";

export default function Clock() {
  const formatDate = (date : Date) => format(date, "HH:mm:ss");
  const [time, setTime] = useState(formatDate( new Date() ));

  const updateTime = () => {
    setTime('');
    setTime(formatDate( new Date() ));
    setTimeout(updateTime, 1000);
  }

  useEffect(updateTime, []);

  return(
      <View>
        <Text style={styles.container}>{time}</Text>
      </View>
  );
}