//Import React and Component                   firebase accounnt           istudy356@gail.com password ISTUDY356
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
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

const SingUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [midleInputPressed, setMidleInputPressed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const emailInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const passwordInputRef = createRef();
  const ConfpasswordInputRef = createRef();

  const handleSubmitButton = () => {
    // setErrortext('');
    if (userName === "") {
      alert("Please enter your surname and full names before proceeding");
    } else if (userEmail === "") {
      alert("You must enter a valid Email Address ");
    } else if (phoneNumber === "") {
      alert("Phone number is required to contact you about your orders");
    } else if (userPassword === "") {
      alert("Please create your new password of at least 6 characters");
    } else if (userPassword.length < 6) {
      alert("Password should be more than 6 characters");
    } else if (confirmPassword === "") {
      alert("Confirm password");
    } else if (userPassword !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      //lets send data to the database
      firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail.trim(), userPassword.trim())
        .then(() => {
          //saving  each data to the spacefic Announcement email to useremail password to userpassword ect
         let SchoolName=userName
          firebase
            .database()
            .ref(
              `School/${SchoolName}/Grade/Users/${
                firebase.auth().currentUser.uid
              }/PersonalData`
            )
            .update({
              email: userEmail,
              name: userName,
              phoneNumber: phoneNumber,
              Password: userPassword,
              currentVersion: "1.00",
              dateJoined: Date.now(),
              lastSeen: Date.now(),
              uid: firebase.auth().currentUser.uid,
            });
        })
        .catch((error) => {
          if (error) {
            alert(error);
          } else {
            setLoading(true);
          }
        });

      setIsSignUpSuccess(true);
    }
  };

  if (isSignUpSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#307ecc",
          justifyContent: "center",
        }}
      >
        <View
          // source={require("../Image/aboutreact.png")}
          style={{
            width: screenWidth * 0.38,
            height: screenWidth * 0.36,
            resizeMode: "contain",
            margin: 20,
            backgroundColor: "gray",

            borderRadius: 30,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 100,

              color: "pink",
              fontWeight: "bold",
            }}
          >
            <EvilIcons name="check" size={104} color="black" />
          </Text>
        </View>

        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E7E7E7" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",

          // height: midleInputPressed
          // ?  DEVICE_HEIGHT * 0.25
          // : DEVICE_HEIGHT * 0.82,
        }}
      >
        <View
          style={{
            width: screenWidth * 0.38,
            height: screenWidth * 0.36,
            resizeMode: "contain",
            margin: 20,
            backgroundColor: "white",

            borderRadius: 47,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
             underlineColorAndroid="#f000"
              placeholder="School Name"
              placeholderTextColor="#AEAEAE"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#AEAEAE"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              underlineColorAndroid="#f000"
              placeholder="phone Number"
              placeholderTextColor="#AEAEAE"
              keyboardType="numeric"
              returnKeyType="next"
              ref={phoneNumberInputRef}
              onFocus={() => {
                setMidleInputPressed(true);
              }}
              onBlur={() => {
                setMidleInputPressed(false);
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              // underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#AEAEAE"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              returnKeyType="next"
              onFocus={() => {
                setMidleInputPressed(true);
              }}
              onBlur={() => {
                setMidleInputPressed(false);
              }}
              secureTextEntry={true}
              //blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="confirm Password"
              placeholderTextColor="#AEAEAE"
              ref={ConfpasswordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              onFocus={() => {
                setMidleInputPressed(true);
              }}
              onBlur={() => {
                setMidleInputPressed(false);
              }}
              //onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>NEXT</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SingUp;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 42,
   // backgroundColor: "yellow",

    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: "#15009A",
    borderWidth: 1,
    color: "#FFFFFF",
    borderColor: "black",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
