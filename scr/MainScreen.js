import React, { useEffect, useState } from "react";
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
import Header from "./Componet/Header";

import { Ionicons, Feather, Entypo } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;

const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const TabTop = createMaterialTopTabNavigator();

function Email({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Email</Text>
      </View>
    </View>
  );
}
//-------------------------------------------------------------------------------------
function ISTUDY({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>i study infomation</Text>
      </View>
    </View>
  );
}
function Announcement({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>notification </Text>
      </View>
    </View>
  );
}
function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <View style={styles.profileContainer}>


  </View>
      </View>
    </View>
  );
}
//check if user is a student or a techer then locate them to the axect page
function TeachersAdminHome({ navigation }) {
  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Users/${userId}/PersonalData`)
      .on("value", (snapshot) => {
        setUserName(`${snapshot.val().userName}`); // ohh damn, here is the problem...............
        setUserEmail(`${snapshot.val().userEmailAdress}`);
        setPosition(`${snapshot.val().position}`);
        setSchoolName(`${snapshot.val().schoolName}`);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {/** */}
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={styles.headingbox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("VideosScreen")}
            style={styles.buttons}
          >
            <Image
              style={styles.buttonsimage}
              source={require("./Image/vedioicon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Documment")}
            style={styles.buttons}
          >
            <Image
              style={styles.buttonsimage}
              source={require("./Image/document.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Marks")}
            style={styles.buttons}
          >
            <Image
              style={styles.buttonsimage}
              source={require("./Image/marks.jpg")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.headingbox,
            {
              margin: 1,
              height: deviceHeight * 0.04,
              borderBottomWidth: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View style={styles.InstutlName}>
            <Text style={{ fontSize: 10 }}>{schoolName}</Text>
          </View>
          <View
            style={[
              styles.InstutlName,
              { borderColor: "black", borderLeftWidth: 1, borderRightWidth: 1 },
            ]}
          >
            <Text style={{ fontSize: 10 }}>{position}</Text>
          </View>
          <View style={styles.InstutlName}>
            <Text style={{ fontSize: 10 }}>{userName}</Text>
          </View>
        </View>
        {/**reapeating the style of the viewa couse the countating the same thing */}
        <View style={styles.writecontainer}>
          <View style={styles.writeBox}>
            <View style={styles.inputStylebox}>
              <TextInput
                style={styles.inputStyle}
                //onChangeText={}
                //value={}

                underlineColorAndroid="#f000"
                placeholder="Write the tittle of the Vedio"
                placeholderTextColor="#707070"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.inputStylebox}>
              <TextInput
                style={styles.inputStyle}
                //onChangeText={}
                //value={}
                placeholder="Paste the URL Link of the Vedio"
                placeholderTextColor="#707070"
              />
            </View>
          </View>
          <View style={styles.iconandbutton}>
            <Image
              style={styles.imagediscribe}
              source={require("./Image/vedioicon.png")}
            />
            <TouchableOpacity
             // onPress={() => }
              style={styles.buttonSubmitstyle}
            >
              <Text style={{ color: "white" }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/**reapeating the style of the viewa couse the countating the same thing */}

        <View style={styles.writecontainer}>
          <View style={styles.writeBox}>
            <View style={styles.inputStylebox}>
              <TextInput
                style={styles.inputStyle}
                //onChangeText={}
                //value={}

                underlineColorAndroid="#f000"
                placeholder="Name of the document"
                placeholderTextColor="#707070"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <Text></Text>
            <TouchableOpacity style={styles.inputDocument}>
              <Text> Choose a File</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconandbutton}>
            <Image
              style={styles.imagediscribe}
              source={require("./Image/document.jpg")}
            />
            <TouchableOpacity style={styles.buttonSubmitstyle}>
              <Text style={{ color: "white" }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/**reapeating the style of the viewa couse the countating the same thing */}

        <View style={styles.writecontainer}>
          <View style={styles.writeBox}>
            <View style={styles.inputStylebox}>
              <TextInput
                style={styles.inputStyle}
                //onChangeText={}
                //value={}

                underlineColorAndroid="#f000"
                placeholder="Name of the document"
                placeholderTextColor="#707070"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>

            <Text></Text>
            <TouchableOpacity style={styles.inputDocument}>
              <Text> Choose a File</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconandbutton}>
            <Image
              style={styles.imagediscribe}
              source={require("./Image/marks.jpg")}
            />
            <TouchableOpacity style={styles.buttonSubmitstyle}>
              <Text style={{ color: "white" }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Tab = createBottomTabNavigator();
// <Header navigation={navigation} />

const MainScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="TeachersAdminHome"
      // initialRouteName="TeachersAdminHome"
      //
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-infinite-sharp" : "home-outline";
          }
          <Ionicons name="md-infinite-sharp" size={24} color="black" />;
          if (route.name === "Send Email") {
            iconName = focused
              ? "md-chatbubble-ellipses-sharp"
              : "chatbubble-ellipses-outline";
          }
          if (route.name === "ISTUDY") {
            return (
              <Image
                style={{
                  height: deviceWidth * 0.14,
                  width: deviceWidth * 0.15,
                  borderRadius: 20,
                  marginBottom: 15,
                }}
                source={require("./Image/icon1.png")}
              />
            );
          }
          if (route.name === "Announcement") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!<Ionicons name="camera-outline" size={24} color="black" />

          return <Ionicons name={iconName} size={31} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TeachersAdminHome}
      />

      <Tab.Screen
        name="Send Email"
        options={{ headerShown: false }}
        component={Email}
      />

      <Tab.Screen
        name="ISTUDY"
        options={{ headerShown: false }}
        component={ISTUDY}
      />
      <Tab.Screen
        name="Announcement"
        options={{ headerShown: false }}
        component={Announcement}
      />

      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: DEVICE_HEIGHT * 0.03,
    backgroundColor: "#E7E7E7",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  text: {
    fontSize: 15,
    fontWeight: "300",
  },

  scrollView: {
    backgroundColor: "red",
    //flex: 1
  },
  headingbox: {
    height: deviceHeight * 0.09,
    width: deviceWidth * 0.99,
    // backgroundColor: "pink",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    margin: 2,
  },
  writecontainer: {
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.99,
    margin: 4,
    //backgroundColor: "pink",
    borderColor: "grey",
    borderTopWidth: 1.3,
    borderBottomWidth: 1.3,
    flexDirection: "row",
  },
  writeBox: {
    height: deviceHeight * 0.2,
    width: deviceWidth * 0.7,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  inputStylebox: {
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.6,
    //backgroundColor: "#ab4141",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    margin: 20,
  },
  inputDocument: {
    width: deviceWidth * 0.65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    height: deviceHeight * 0.05,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 4,
  },

  imagediscribe: {
    height: deviceHeight * 0.1,
    width: deviceWidth * 0.25,
    marginTop: 20,
  },
  iconandbutton: {
    height: deviceHeight * 0.23,
    width: deviceWidth * 0.27,
    alignItems: "center",
    // backgroundColor: "yellow",
    justifyContent: "space-between",
  },

  buttonSubmitstyle: {
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.26,
    backgroundColor: "#0A5EB3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 4,
  },

  buttons: {
    height: deviceWidth * 0.16,
    width: deviceWidth * 0.16,
    margin: 4,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 400,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsimage: {
    height: deviceWidth * 0.14,
    width: deviceWidth * 0.14,
    borderRadius: 400,
  },
  InstutlName: {
    height: deviceHeight * 0.037,
    width: deviceWidth * 0.33,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    borderRadius: 30,
  },
  subjectName: {
    height: deviceHeight * 0.036,
    width: deviceWidth * 0.3,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  //----------style for stodent page---------------------------
  itemContainer: {
    height: deviceHeight * 0.2,
    width: "97%",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,

    borderRadius: 16,
    shadowColor: "#312E2E",

    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 5,

    //alignItems: "center",
    // justifyContent: "center",
  },
  iconBox: {
    height: screenWidth * 0.15,

    marginTop: 5,

    width: screenWidth * 0.15,
    backgroundColor: "red",
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  discriptionBox: {
    height: "65%",
    width: "70%",
    //  backgroundColor: "green",
    margin: 4,
  },
  buttensContainer: {
    height: "40%",
    width: screenWidth * 0.97,
    borderTopWidth: 3,
    borderColor: "#F1F1F1",
    //backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttenBoxs: {
    margin: 3,
    height: deviceHeight * 0.06,
    width: screenWidth * 0.22,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  holdingTitleBox: {
    height: "30%",
    width: "98%",

    // backgroundColor: "yellow",
  },
  teacherNameAndSbuject: {
    height: "20%",
    width: "60%",
    backgroundColor: "white",
  },

  //------------------------------------------------
  headingbox: {
    height: deviceHeight * 0.09,
    width: screenWidth * 0.99,
    // backgroundColor: "pink",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    margin: 2,
  },
  InstutlName: {
    height: deviceHeight * 0.037,
    width: screenWidth * 0.33,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    borderRadius: 30,
  },
  profileContainer:{
    height: deviceHeight * 0.037,
    width: screenWidth * 0.33,
    backgroundColor: "green",

  }
});
