import {StyleSheet} from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  weatherIcon: {
    width: 100,
    height: 100,
    margin: 0,
    marginLeft: -50,
    marginRight: 85,
  },
  dynamicText: {
    fontFamily: "DigitalCounter7",
    fontSize: 30,
    color: Colors.RED,
    // This is to have the text line up like normal
    marginTop: 8,
    textAlign: "right",
    width: 55,
  },
  textCurrent: {
    fontSize: 16,
    color: Colors.RED,
    width: 75,
    marginTop: 4,
    textAlign: "left",
  },
  textFeelsLike: {
    fontSize: 16,
    color: Colors.RED,
    width: 75,
    // lineHeight: 18,
  },
  textMinMax: {
    fontSize: 20,
    color: Colors.RED,
    width: 40,
    marginLeft: 10,
  },
  staticTextDegree: {
    fontSize: 30,
    color: Colors.RED,
  },
  tempUnit: {
    fontSize: 16,
    color: Colors.RED,
    textAlignVertical: "top",
    marginTop: 4,
    marginLeft: -3,
  },
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-start",
    textAlignVertical: "center",
  },
  currentWeatherContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    // This was the only way to make this element
    // not take up far more space than it should
    width: 120,
  },
  weatherRowCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  weatherRow: {
    flex: 1,
    flexDirection: "row",
  },
  forecastRow: {
    marginTop: -5,
  },
  forecastContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "flex-start",
    marginLeft: 20,
  },
  forecastDayName: {
    textAlign: "center",
    color: Colors.RED,
    fontSize: 18,
  },
  dynamicForecastText: {
    fontFamily: "DigitalCounter7",
    fontSize: 16,
    color: Colors.RED,
    // This is to have the text line up like normal
    // marginTop: 8,
    textAlign: "right",
    width: 30,
  },
  staticForecastText: {
    fontSize: 16,
    color: Colors.RED,
    width: 20,
    marginTop: 4,
  },
  staticForecastTextDegree: {
    fontSize: 16,
    color: Colors.RED,
    marginTop: 8,
  },
  forecastTempUnit: {
    fontSize: 12,
    color: Colors.RED,
    textAlignVertical: "top",
    marginTop: 8,
    marginLeft: -3,
  },
  forecastWeatherIcon: {
    width: '100%',
    height: 40,
    resizeMode: "center",
  },
  forecastCol: {
    marginHorizontal: 5,
  },
});