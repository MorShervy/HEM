import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItems } from "react-navigation";

const headerTitle = [
  { key: "Home", value: "Home" },
  { key: "MyProfile", value: "My Profile" },
  { key: "CameraScreen", value: "Camera" }
];

const DrawerWithLogoutButton = props => {
  const [getUser, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(user => setUser(JSON.parse(user)))
      .then();
  }, []);

  const onChangeHeaderBar = r => {
    const [titleToShow] = headerTitle.filter(item => item.key === r.route.key);
    //console.log("title=", titleToShow.value);
    props.navigation.setParams({ otherParam: titleToShow.value });
    props.navigation.navigate(r.route.key, {
      otherParam: titleToShow.value
    });
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <View style={styles.user}>
          <Image
            source={
              (getUser.url === "" && require("./assets/user.png")) || {
                uri: getUser.url
              }
            }
            style={styles.img}
          />
          <Text style={styles.label}>{getUser.email}</Text>
        </View>
        <DrawerItems
          {...props}
          onItemPress={r => {
            onChangeHeaderBar(r);
          }}
        />
        <TouchableOpacity
          onPress={() =>
            AsyncStorage.removeItem("user").then(
              props.navigation.replace("AuthNav")
            )
          }
        >
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Ionicons name="ios-log-out" size={25} />
            </View>
            <Text style={{ fontWeight: "bold" }}> Sign Out</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  user: {
    backgroundColor: "#2C3E50",
    paddingTop: 10
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5
  },
  iconContainer: {
    width: 24
  },
  img: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60
  },
  label: {
    alignSelf: "center",
    marginBottom: 48,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#fff"
  }
});

export default DrawerWithLogoutButton;
