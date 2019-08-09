import React from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Month = props => {
  const transitionAnimation = index => {
    return {
      transform: [
        { perspective: 800 },
        {
          scale: props.xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: [0.25, 1, 0.25]
          })
        },
        {
          rotateX: props.xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ["300deg", "0deg", "300deg"]
          })
        },
        {
          rotateY: props.xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ["-300deg", "0deg", "300deg"]
          })
        }
      ]
    };
  };

  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};
export default Month;

const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 35,
    fontWeight: "bold"
  }
});
