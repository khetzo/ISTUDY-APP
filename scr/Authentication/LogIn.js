import React, { useState, useRef, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

import Loader from "../Componet/Louder";

const screenWidth = Dimensions.get("window").width;

const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});
const LogIn = ({ navigation }) => {
  const [existEmail, setExistEmail] = useState("");
  const [existPassword, setExistPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [inputPressed, setInputpressed] = useState(false);
  const passwordInputRef = createRef();

  const handleSubmition = () => {
    if (existEmail.length == 0 || existPassword.length == 0) {
      alert("invalid email or password ");
      setLoading(false);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(existEmail, existPassword)
        .then(() => {
          let userId = firebase.auth().currentUser.uid;
          firebase.database().ref(`Users/${userId}/PersonalData`).update({
            lastSeen: Date.now(),
          });
          
              //taking a snapshot from the firebase
          firebase
            .database()
            .ref(`Users/${userId}/PersonalData`)
            .once("value", (snapshot) => {
              const { position } = snapshot.val();


              if (position == "Learner") {
                navigation.navigate("Studentpage");
              } else if (position == "teacherCode") {
                navigation.navigate("MainScreen");
              } else {
                alert("unrecognised from database")
                //navigation.navigate("Studentpage");
              }
              setLoading(false);
            });
        })
        .catch((error) => {
          alert(error);

          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.countaner}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          //alignContent: "center",
          // backgroundColor:"green"
        }}
      >
        <View
          style={{
            height: inputPressed ? DEVICE_HEIGHT * 0.89 : DEVICE_HEIGHT * 0.99,
            //backgroundColor:"red",
            justifyContent: "center",
          }}
        >
          <KeyboardAvoidingView>
            <View style={styles.logostyle}>
              {loading ? (
                <ActivityIndicator animating={true} size="large" color="pink" />
              ) : (
                <Image
                  style={{
                    width: screenWidth * 0.38,
                    height: screenWidth * 0.38,

                    borderRadius: 47,
                  }}
                  source={require("../Image/icon1.png")}
                />
              )}
            </View>
            <View style={styles.logostyle2}>
              <Image
                style={{
                  width: screenWidth * 0.8,
                  height: screenWidth * 0.15,
                }}
                source={require("../Image/icon2.png")}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your Email"
                placeholderTextColor="#AEAEAE"
                onChangeText={(existEmail) => setExistEmail(existEmail)}
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                blurOnSubmit={true}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(existPassword) =>
                  setExistPassword(existPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#AEAEAE"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                onBlur={() => {
                  setInputpressed(false);
                }}
                onFocus={() => {
                  setInputpressed(true);
                }}
                returnKeyType="next"
              />
            </View>
            <Text
              style={[
                styles.registerTextStyle,
                { color: "black", alignSelf: "flex-start", marginLeft: 40 },
              ]}
             onPress={() => navigation.navigate("ForgortPassword") }
            >
              Forgot Password ?
            </Text>
            <View>
              {error != "" ? (
                <Text style={styles.errorTextStyle}>{error}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={[styles.buttonStyle]}
              activeOpacity={0.5}
              onPress={() => {
                setLoading(true);
                handleSubmition();
                setInputpressed(false);
              }}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("SingUp")}
            >
              New Here ? Register
            </Text>
           
          </KeyboardAvoidingView>
        
          
        </View>
       
      </ScrollView>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  countaner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 46,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  logostyle: {
    width: screenWidth * 0.38,
    height: screenWidth * 0.36,
    resizeMode: "contain",
    margin: 20,
    backgroundColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    borderRadius: 47,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logostyle2: {
    width: screenWidth * 0.8,
    height: deviceHeight * 0.07,
    //  backgroundColor: "yellow",
    alignSelf: "center",
    marginBottom: 20,
    //alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    flex: 1,
    color: "#707070",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#707070",
  },
  buttonStyle: {
    backgroundColor: "#15009A",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    width: screenWidth * 0.45,
    alignItems: "center",
    alignSelf: "center",

    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    //padding: 10,
  },
});
