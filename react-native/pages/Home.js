import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Month from "../components/Month";

const Home = props => {
  const xOffset = new Animated.Value(0);
  const month = [
    { key: 1, value: "Jan" },
    { key: 2, value: "Feb" },
    { key: 3, value: "Mar" },
    { key: 4, value: "Apr" },
    { key: 5, value: "May" },
    { key: 6, value: "Jan" },
    { key: 7, value: "Jul" },
    { key: 8, value: "Aug" },
    { key: 9, value: "Sep" },
    { key: 10, value: "Oct" },
    { key: 11, value: "Nov" },
    { key: 12, value: "Dec" }
  ];
  return (
    <View style={{ height: "10%", justifyContent: "center" }}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
      >
        {month.map(item => (
          <Month
            key={item.key}
            text={item.value}
            xOffset={xOffset}
            index={item.key - 1}
          />
        ))}
      </Animated.ScrollView>
      <TouchableOpacity
        style={[styles.monthButton, styles.monthButtonLeft]}
        onPress={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset - 1 } } }],
          { useNativeDriver: true }
        )}
      >
        <Text style={{ fontSize: 30 }}>{`<`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.monthButton, styles.monthButtonRight]}
        onPress={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset + 1 } } }],
          { useNativeDriver: true }
        )}
      >
        <Text style={{ fontSize: 30 }}>{`>`}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  monthButton: { position: "absolute" },
  monthButtonLeft: { marginLeft: "10%", alignSelf: "flex-start" },
  monthButtonRight: { marginRight: "10%", alignSelf: "flex-end" }
});
