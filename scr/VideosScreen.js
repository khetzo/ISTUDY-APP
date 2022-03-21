import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { AntDesign} from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Componet/Header";

const deviceHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const VideosData = [
  {
    title: "algebra",
    vediolink: "http//12-3u-htgr3-245/yt/ry/45-r/435php",
    id: "4-54-56-5-655-6",
  },
  {
    title: "exponentials",
    id: "2-12rty3-234-23-45",
    vediolink: "http//12-3u-htgr3-245/yt/ry/45-r/435php",
  },
];
const VideosScreen = ({ navigation }) => {
  const HoldingVideosInfo = ({ item, navigation }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        alert("commiiiii");
      }}
    >
        <View
        style={[
          styles.iconBox,
          {
            backgroundColor: "#483D8F",
            width: screenWidth * 0.13,
            height: screenWidth * 0.13,
            borderRadius: 80,
          },
        ]}
      >
        <AntDesign name="play" size={43} color="#D9D9D9" />
      </View>
     
      <View style={styles.discriptionBox}>
        <View style={styles.holdingTitleBox}>
          <Text
            numberOfLines={1}
            style={[styles.text, { fontSize: 18, fontWeight: "600" }]}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonToDownload}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              color: "#0546FA",
              textDecorationLine: "underline",
            }}
        
          >
            {item.vediolink}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconBox}>
        <Image
          style={{
            width: screenWidth * 0.13,
            height: screenWidth * 0.13,
          }}
          source={require("./Image/vedioicon.png")}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <FlatList
        data={VideosData}
        renderItem={HoldingVideosInfo}
        keyExtractor={(item) => item.id}
        //  extraData={selectedId}
      />
    </View>
  );
};
export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: "#E7E7E7",
    //  marginTop:20,
  },
  itemContainer: {
    height: deviceHeight * 0.09,
    width: "97%",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "#312E2E",

    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 5,

    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    height: "70%",
    width: "12%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  /*
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
    */
  discriptionBox: {
    height: "95%",
    width: "70%",
    // backgroundColor: "green",
    alignItems: "center",
    // justifyContent:"center",
  },

  holdingTitleBox: {
    height: "55%",
    width: "98%",
    margin: 3,
    // backgroundColor: "yellow",
    //  alignItems: "center",
    //justifyContent:"center",
  },
  buttonToDownload: {
    height: "35%",
    width: "99%",
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  //------------------------------------------------
});
