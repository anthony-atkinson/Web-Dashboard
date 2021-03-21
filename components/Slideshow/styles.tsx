import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    padding: 0,
    margin: 0,
    zIndex: 1,
    resizeMode: "center",
  },
  rowButtons: {
    zIndex: 1000,
    padding: 10,
    position: "absolute",
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  topRowButtons: {
    top: 0,
  },
  bottomRowButtons: {
    bottom: 0,
  },
  clock: {
    right: 0,
  },
  light: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.75,
    flex: 1,
    zIndex: -1,
    resizeMode: "cover",
  },
});