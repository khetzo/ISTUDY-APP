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
//import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const screenWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});

const DAtaForGrade = [
  {
    gradeLogo:
      "https://www.careersportal.co.za/sites/default/files/images/Bronwyn/grade9.png",

    schoolName: "Mukula Integrated School",
    grade: 9,
  },
  {
    gradeLogo: "https://blikbrein.tv/wp-content/uploads/Grade-10.jpg",

    schoolName: "Mukula Integrated School",
    grade: 10,
  },
  {
    gradeLogo:
      "https://s3.amazonaws.com/readingvine-prod/uploads/production/category_value/image/12/11th-Grade-Reading-Comprehension.jpg",

    schoolName: "Mukula Integrated School",
    grade: 11,
  },
  {
    gradeLogo:
      "https://play-lh.googleusercontent.com/w3g2rX3oTFcKwh0i3bMpY8yYriVP2g6o48cayjTPp7FoRIiEE8KHdePf-f37uZmVRg",
    schoolName: "Mukula Integrated School",
    grade: 12,
  },
];
const DAtaForSubjects = [
  {
    subjectName: "math and science stream",
    streamName2: "Science",

    totalSubject: 9,
    id: "122-28-44-45",
  },
  {
    subjectName: "Economics and bussiness stream",
    streamName2: "Economics",

    totalSubject: 9,

    id: "122-66-44-45",
  },
  {
    subjectName: "history stream",
    streamName2: "history",

    totalSubject: 9,
    id: "122-23-99-45",
  },
];
const UpDateUserInfo = ({ navigation }) => {
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
  const [chooseStream, setChooseStream] = useState(false);

  //selected grade and mejor subject must be stored to the useState
  const [chooseGrade, setChooseGrade] = useState(" ");
  const [mejorsubject, setMejorsubject] = useState(" ");


  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Users/${userId}/PersonalData`)
      .on("value", (snapshot) => {
        setChooseGrade(`${snapshot.val().chooseGrade}`); // ohh damn, here is the problem...............
        setMejorsubject(`${snapshot.val().mejorsubject}`);
       
      });
  }, []);

  const markGrade = (item,chooseGrade) => {
    let userId = firebase.auth().currentUser.uid;
    // chooseGrade = item.grade;

    firebase.database().ref(`Users/${userId}/PersonalData`).update({
      gender: chooseGrade,
    });
  };

  const selectStream = (item) => {
    let selectedMejorSubject = item.streamName2;
    //console.log(item.grade)

    setMejorsubject(selectedMejorSubject);
    setChooseStream(false);

    if (selectedMejorSubject === "math") {
      console.log("you selected math  in grade");
    } else if (selectedMejorSubject === "Economics") {
      console.log("you not doing math");
      setChooseStream(false);
    } else if (selectedMejorSubject === "Economics") {
      console.log("you not doing math");
      setChooseStream(false);
    }
  };

  const selectGrade = ({ item }) => (
    <TouchableOpacity
      style={styles.gradeBox}
      activeOpacity={0.5}
      onPress={() => {
        setChooseStream(!chooseStream);
       // markGrade(item);
      }}
    >
      <View style={styles.gradeicon}>
        <Image style={styles.gradeicon} source={{ uri: item.gradeLogo }} />
      </View>

      <View style={styles.gradeNumber}>
        <Text style={[styles.text, { fontSize: 18, fontWeight: "600" }]}>
          GRADE {item.grade}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const markSubjects = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectBox}
      activeOpacity={5}
      onPress={() => {
        // setChooseStream(!chooseStream);
        selectStream(item);
        navigation.navigate("Studentpage");
      }}
    >
      <View
        style={[
          styles.gradeicon,
          {
            width: screenWidth * 0.16,
            height: screenWidth * 0.16,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      ></View>

      <View style={styles.subjectCountainer}>
        <Text
          style={[
            styles.text,
            { fontSize: 15, fontWeight: "900", fontVariant: ["small-caps"] },
          ]}
        >
          {item.subjectName}
        </Text>

        <Text style={[styles.text, { fontSize: 10, fontWeight: "600" }]}>
          total subject:{item.totalSubject}
        </Text>
        <View
          style={[
            styles.gradeicon,
            {
              width: screenWidth * 0.3,
              borderWidth: 0.04,
              backgroundColor: "white",
              height: deviceHeight * 0.05,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 11,
            },
          ]}
        >
          <Text style={[styles.text, { fontSize: 19, fontWeight: "800" }]}>
            Join now
          </Text>
        </View>
      </View>

      <View style={styles.subjectCountainerForMark}></View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        // height: midleInputPressed
        // ?  DEVICE_HEIGHT * 0.25
        // : DEVICE_HEIGHT * 0.82,
      }}
    >
      <View
        style={{
          // backgroundColor: "#307ecc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.iconToshowProgress}>
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
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 15,
            padding: 1,
          }}
        >
          2 out of 3
        </Text>
        <Text style={styles.successTextStyle}>CHOOSE YOUR GRADE</Text>

        {/**PUT THE FLATLIST */}
        <View style={styles.flatlistgound}>
          <FlatList
            data={DAtaForGrade}
            renderItem={selectGrade}
            keyExtractor={(item) => item.grade}
            //  extraData={selectedId}
            horizontal={true}
          />
        </View>

        <View style={styles.greatings}>
          <Text style={styles.buttonTextStyle}>Hello yourname</Text>
          <Text style={styles.buttonTextStyle}>wellcome to schoolName </Text>
          <Text style={styles.buttonTextStyle}>
            complite the task as a position
          </Text>
        </View>
        <Modal animationType="slide" transparent={true} visible={chooseStream}>
          <SafeAreaView>
            <TouchableOpacity
              style={styles.modalcallsCuncell}
              activeOpacity={5}
              onPress={() => {
                setChooseStream(!chooseStream);
              }}
            ></TouchableOpacity>
            <View style={styles.modalStream}>
              <View style={styles.heading}>
                <Text
                  style={{ fontSize: 23, fontWeight: "300", marginVertical: 2 }}
                >
                  Choose your stream:
                </Text>
                <Text
                  style={{ fontSize: 13, fontWeight: "300", marginVertical: 2 }}
                >
                  wellcome to Grade {chooseGrade}
                </Text>
              </View>
              <FlatList
                data={DAtaForSubjects}
                renderItem={markSubjects}
                keyExtractor={(item) => item.subjectName}
                //  extraData={selectedId}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default UpDateUserInfo;
const styles = StyleSheet.create({
  buttonTextStyle: {
    color: "black",

    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  successTextStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
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
    margin: 1,
    backgroundColor: "gray",
    borderRadius: 800,
    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
   // elevation: 4,
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
    margin: 5,
    width: screenWidth * 0.95,
    height: screenWidth * 0.25,
    backgroundColor: "white",
    alignItems: "center",

    alignSelf: "center",
    borderRadius: 9,
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
    margin: 5,

    height: deviceHeight * 0.1,
    width: screenWidth * 0.6,
    // backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },

  greatings: {
    height: deviceHeight * 0.1,
    width: screenWidth * 0.99,
    // backgroundColor: "red",
    alignItems: "center",
  },
  //
  modalcallsCuncell: {
    height: deviceHeight * 0.5,
    width: screenWidth * 0.98,
    //backgroundColor: "red",
  },
  modalStream: {
    height: deviceHeight * 0.55,
    width: screenWidth,

    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    height: "15%",
    width: "100%",
    backgroundColor: "rgba(231, 231, 211, 0.9)",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 20,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
