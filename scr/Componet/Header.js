import * as React from "react";
import {
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});

export default function Header({ navigation, headerTitle }) {
  return (
    <View style={styles.screenHeader}>
      <View style={styles.backArrowContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="md-arrow-back"
            size={DEVICE_HEIGHT * 0.03}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconBox}>
        
        <View style={styles.icon}>
          <Image
            style={{
              width: screenWidth * 0.12,
              height: screenWidth * 0.12,
              borderRadius: 30,
            }}
            source={require("../Image/icon1.png")}
          />
        </View>
      </View>
      <View style={styles.headerContainer}>
        
        <Image
          style={{
            width: screenWidth * 0.7,
            height: deviceHeight * 0.06,
            marginRight:16,
          }}
          source={require("../Image/icon2.png")}
        />
        
      </View>
    </View>
  );
}

/*    

*/
const styles = StyleSheet.create({
  screenHeader: {
    height: DEVICE_HEIGHT * 0.09,
    width: screenWidth,
    flexDirection: "row",
    zIndex: 2,
    elevation: 2,
    alignItems: "flex-end",

    backgroundColor: "white",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    shadowColor: "#666666",

    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 4,
  
  },
  backArrowContainer: {
    height: "75%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",

    //backgroundColor: "pink",
  },
  icon: {
    width: screenWidth * 0.11,
    height: screenWidth * 0.11,

    //backgroundColor: "white",
    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 4,
    justifyContent: "center",

    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  iconBox: {
   
    height: "75%",
    width: "12%",
    justifyContent: "center",
    alignItems: "center",

    //backgroundColor: "blue", 
   
  },
  headerContainer: {

    height: "75%",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",

    //backgroundColor: "green", 
  },
  
});
