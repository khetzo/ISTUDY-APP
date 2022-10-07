import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  Image
} from "react-native";
import firebase from "firebase";

import Header from "../Componet/Header";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const screenWidth = Dimensions.get("window").width;
export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    if (email == "") {
      alert("Please enter the email adress you want to reset password for");
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.goBack();
          alert(
            `A link to reset your password for ${email} was sent to your mailbox, Please check your email and come back`
          );
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>

<Header navigation={navigation} />
                 <View style={styles.logostyle}>
             
                <Image
                  style={{
                    width: screenWidth * 0.38,
                    height: screenWidth * 0.38,

                    borderRadius: 47,
                  }}
                  source={require("../Image/icon1.png")}
                />
            
            </View>
      <Text style={styles.subHeaderText}>
        Please Enter the email adress you want to reset the password for
      </Text>
      <View style={styles.emailCont}>
        <TextInput
          style={{
            height: 40,
            flex: 1,
            color: "black",
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholder={"Enter email"}
          // style={{ marginLeft: 10, color: "black" }}
          keyboardType="email-address"
          placeholderTextColor={"black"}
        />
      </View>
      <Button title="Submit" color={"#c90860"} onPress={resetPassword} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "white",
    paddingTop: STATUSBAR_HEIGHT,
   justifyContent: "center",
    alignItems: "center",
  },
  emailCont: {
    // /backgroundColor: "red",
    height: "5%",
    width: "90%",
    justifyContent: "center",
    //alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  subHeaderText: {
    marginVertical: 10,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
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
});
