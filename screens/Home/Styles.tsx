import {StyleSheet} from "react-native";
import Colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  rowButtons: {
    zIndex: 1000,
    position: "absolute",
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  topRowButtons: {
    top: 0,
    padding: 10,
  },
  bottomRowButtons: {
    bottom: 15,
    left: 15,
    right: 15,
    padding: 0,
    paddingHorizontal: 10,
    minHeight: 100,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    borderColor: Colors.RED,
    borderStyle: "solid",
    borderWidth: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
    shadowRadius: 4,
    shadowColor: Colors.BLACK,
  },
  clock: {
    marginTop: 10,
    marginBottom: -10,
  },
  weather: {
    // left: 0,
  }
});