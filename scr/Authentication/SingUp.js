//Import React and Component                   firebase accounnt           istudy356@gail.com password ISTUDY356
import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import firebase from "firebase";

import Loader from "../Componet/Louder";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

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
  const [refCode, setRefCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [position, setPosition] = useState("");

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [getGrade, setGetGrade] = useState(false);
  //modal of chooseing a stream
 

  //selected grade and mejor subject must be stored to the useState
const [chooseGrade, setChooseGrade] = useState(" ");
 const[mejorsubject,setMejorsubject]=useState(" ");
  const emailInputRef = createRef();

  const phoneNumberInputRef = createRef();
  const passwordInputRef = createRef();
  const ConfpasswordInputRef = createRef();

  const schoolsRefs = [
    //SCHOOLS DATA 1
    {
      schoolName: "Mbilwi High School",
      learnerCode: "Mbilwi22",
      adminCode: "Admin@Mbilwi22",
      teacherCode: "Teacher@Mbilwi22",
    },
    //SCHOOLS DATA 2
    //Mbilwi22,Tshivhase-SS,MIS2022
    {
      schoolName: "Tshivhase Secondary School",
      learnerCode: "Tshivhase-SS",
      adminCode: "Admin@Tshivhase-SS",
      teacherCode: "Teacher@Tshivhase-SS",
    },
    {
      schoolName: "Mukula Integrated School",
      learnerCode: "MIS2022",
      adminCode: "Admin@MIS2022",
      teacherCode: "Teacher@MIS2022",
    },
  ];

  const handleSubmitButton = () => {
    // setErrortext('');
    console.log("kjhgfdghj")
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
      processRefCode();
     
    }
  };

  const processRefCode = () => {
  
    let learnerRef = schoolsRefs.find((o) => o.learnerCode === refCode);
    let teacherRef = schoolsRefs.find((o) => o.teacherCode === refCode);
    let adminRef = schoolsRefs.find((o) => o.adminCode === refCode);
    if (learnerRef) {
      signUpUser("Learner", learnerRef.schoolName);
    } else if (teacherRef) {
      signUpUser("Teacher", teacherRef.schoolName);
    } else if (adminRef) {
      signUpUser("Admin", adminRef.schoolName);
    } else {
      alert("Your reference code is invalid,to get your refCode please contact IT team 0767786789 ");
    }
  };

  const signUpUser = (position, schoolName) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail.trim(), userPassword.trim())
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        const timeStamp = Date.now();
        firebase
          .database()
          .ref(`Users/${userId}/PersonalData`)
          .update({
            userEmail,
            userName,
            phoneNumber,
            userPassword,
            dateJoined: timeStamp,
            lastSeen: timeStamp,
            userId,
            position,
            schoolName,
            chooseGrade,
            mejorsubject,
          })
          .then(() => {
            if (position == "learner") {
            navigation.navigate("UpDateUserInfo");
            } else if (position == "teacherCode") {
              navigation.navigate("MainScreen");
            } else {
              navigation.navigate("MainScreen");
            }
          });
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };
  // the funtion to select the grade the go the the spesefict= subject to select 9 subject
  


 

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
              // underlineColorAndroid="#f000"
              placeholder="Enter your name"
              placeholderTextColor="#AEAEAE"
              // autoCapitalize="sentences"
              // returnKeyType="next"
              // blurOnSubmit={false}
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
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setRefCode(text)}
              underlineColorAndroid="#f000"
              placeholder="Reference Code"
              placeholderTextColor="#AEAEAE"
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              //underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#AEAEAE"
              ref={passwordInputRef}
              returnKeyType="next"
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
              //onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
            />
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={
          
               
              handleSubmitButton
            }
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
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    // padding:5
  },
  buttonTextStyle: {
    color: "black",

    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputStyle: {
    flex: 1,
    color: "black",
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
    color: "black",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  flatlistgound: {
    marginTop: 30,
    height: "35%",
    width: "99%",
    //backgroundColor: "yellow",

    alignItems: "center",
  },
  gradeBox: {
    margin: 7,
    height: "90%",
    width: screenWidth * 0.4,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    borderRadius: 8,
  },
  gradeicon: {
    height: screenWidth * 0.3,
    width: screenWidth * 0.3,

    backgroundColor: "gray",
    borderRadius: 800,
  },
  gradeNumber: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.3,
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconToshowProgress: {
    width: screenWidth * 0.38,
    height: screenWidth * 0.36,
    resizeMode: "contain",
    margin: 20,
    backgroundColor: "white",

    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
  },
  subjectBox: {
    margin: 0.2,
    width: screenWidth * 0.99,
    height: screenWidth * 0.2,
    backgroundColor: "white",
    alignItems: "center",

    alignSelf: "center",
    borderRadius: 4,
    flexDirection: "row",
    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
  },
  subjectCountainer: {
    margin: 15,
    height: deviceHeight * 0.07,
    width: screenWidth * 0.8,
    //backgroundColor: "red",
    borderRadius: 10,
  },

  greatings: {
    height: deviceHeight * 0.3,
    width: screenWidth * 0.99,
    //backgroundColor: "red",
    alignItems: "center",
  },
  //
  modalcallsCuncell: {
    height: deviceHeight * 0.6,
    width: screenWidth * 0.98,
    //backgroundColor: "red",
  },
  modalStream: {
    height: deviceHeight * 0.4,
    width: screenWidth,

    backgroundColor: "rgb(201, 201, 201)",
    // alignItems: "center",
    // justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    height: "19%",
    width: "100%",
    backgroundColor: "gray",

    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
