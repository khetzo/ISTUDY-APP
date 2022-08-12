import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";

import Header from "./Componet/Header";
import firebase from "firebase";


import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;


const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
//data..............array................array
const messagesData = [
  {
    senderID: "person1",
    message: "hey sire",
    time: "10:33",
    delivered: true,
    timeStamp: 15367266772,
  },
  {
    senderID: "person1",
    message: "morning sire",
    time: "10:35",
    delivered: true,
    timeStamp: 15363472672,
  },
  {
    senderID: "person1",
    message: "seems like is offline",
    time: "10:39",
    delivered: true,
    timeStamp: 15367352672,
  },
  {
    senderID: "person2",
    message:
      "last tme we spoke to hime he said on today we dnt hv class",
    time: "10:40",
    delivered: true,
    timeStamp: 15364572672,
  },
  {
    senderID: "person1",
    message: "ow cool i remember",
    time: "10:55",
    delivered: true,
    timeStamp: 1536456267256,
  },

  {
    senderID: "person2",
    message:
      "awe budahhh",
    time: "10:30",
    delivered: true,
    timeStamp: 15367267255,
  },
  {
    senderID: "person1",
    message: "when are we writing then??",
    time: "10:33",
    delivered: true,
    timeStamp: 153672667726,
  },
  {
    senderID: "person2",
    message:
      "im not xo yet, but 4xo when he come back he will let us noq ",
    time: "10:35",
    delivered: true,
    timeStamp: 1536347267267,
  },
 
];
export default function Chat({ route, navigation }) {
  const [inputMessage, setInputMessage] = useState(""); // state for input text
  // const [messagesData ,setMessagesData ]=useState([]);//state for data (array)
  const [keyboardIsOpened, setKeyboardIsOpened] = useState(false);
  const [fullNames, setUserName] = useState("Full Names");
  const { item } = route.params;
//const scroll = useRef()
const [texting, SetTexting] = useState(" ");
const [ message, SetMessage] = useState(" ");
const [ delivered, SetDelivered] = useState(true);
const [time, SetTime] = useState(" ");
const [timeStamp, SetTimeStamp] = useState(" ");
const [ senderID, SetSenderID] = useState(" ");


const [messagesData, setMessagesData] = useState([
  {
    senderID: "person2",
    message: "hey sire",
    time: "10:33",
    delivered: true,
    timeStamp: 15367266772,
  },
  {
    senderID: "person1",
    message: "morning sire",
    time: "10:35",
    delivered: true,
    timeStamp: 15363472672,
  },
 
])

  useEffect(() => {
    firebase
      .database()
      .ref(`Users/${firebase.auth().currentUser.uid}/PersonalData`)
      .on("value", (snapshot) => {
        setUserName(snapshot.val().userName);
       
      });
  });

  const hangleState = () => {
    let time = new Date().getHours()+ ":" + new Date().getMinutes()
    let senderID= "person1"
    
    const newObject = {
      senderID: senderID,
      message:message,
      time:time,
      delivered: delivered,
      timeStamp: Math.random(),
     
    };
    setMessagesData([...messagesData, newObject]);
    SetMessage(message)

console.log(message)

SetMessage("")
  };
  const mark = (item) => {
    console.log(item);
  };


  const DefoultgroupMassege = () => (
    <View style={styles.headerMassegeCounteiner}>
      <TouchableOpacity style={styles.profile}>
        
      </TouchableOpacity>
      <View style={styles.boxHoldingMassege}>
      <Text style={{ fontStyle: "italic",fontSize:16, fontVariant:[ 'small-caps' ] }}>{item.subject}</Text>
        <Text style={{ fontStyle: "italic" }}>
          {item.title} |_{item.nameofTheTeacher}  is the co-odinator of thise group chat
           all student under this subject are allowed to ask question, and sher thier idies
         
        </Text>
      </View>
    </View>
  );
  const EachMessage = ({ item }) =>
    item.senderID == "person1" ? (
      <TouchableOpacity
        style={[
          styles.messageContainer,
          {
            alignSelf: "flex-end",
            backgroundColor: "rgba(231, 231, 231, 0.1)",
          },
        ]}
      >
        
        <View style={[styles.actualMessage,]}>
          <Text
            style={{
              fontSize: 16,
              color: "rgba(187,223,225,0.99)",
              marginTop: 10,
            }}
          >
            {item.message}
          </Text>
        </View>

        <View style={[styles.timeCont, { alignSelf: "flex-start" }]}>
          <Text style={{ fontSize: 10 }}>{item.time}</Text>
          <Ionicons name="ios-checkmark-done-outline" size={15} color="blue" />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[
          styles.messageContainer,
          {
            justifyContent:"center",
            alignItems:"center",
            alignSelf: "flex-start",
            backgroundColor: "rgba(84, 84, 84, 0.23)",
          },
        ]}
         
      >
         <Text style={{ alignSelf: "center", fontSize: 10,   color: "rgba(0, 0, 0, 0.66)" }}>{item.senderID}</Text>
        <View
          style={[
            styles.actualMessage,
         
          ]}
        >
          <Text style={{ alignSelf: "center", fontSize: 15,   color: "rgba(0, 0, 0, 0.66)" }}>
            {item.message}
          </Text>
        </View>

        <View style={styles.timeCont}>
          <Text style={{ fontSize: 10, marginRight: 10 }}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <View
        style={[
          styles.chatsContainer,
          {
            height: keyboardIsOpened
              ? DEVICE_HEIGHT * 0.42
              : DEVICE_HEIGHT * 0.78,
          },
        ]}
      >
        <FlatList
          data={messagesData} //caling funtion
          renderItem={EachMessage} //calling funtion
          keyExtractor={(item) => `${item.timeStamp}`} // unick id or proparty
          ListHeaderComponent={DefoultgroupMassege}
        />
      </View>
      <View style={styles.chatsInput}>
        <TextInput
          style={styles.input}
          //
          value={message}
          onChangeText={(message) =>  SetMessage( message)}
          placeholder="Type message"
          keyboardType="default"
          fontSize={20}
          onFocus={() => setKeyboardIsOpened(true)}
          onBlur={() => setKeyboardIsOpened(false)}
        />

        <TouchableOpacity
          onPress={() => {
            hangleState()
           
            
          }}
        >
          <MaterialCommunityIcons name="send-circle" size={37} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(61, 76, 108, 0.8)",
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: "center",
  },

  headerMassegeCounteiner: {
    height: ScreenHeight * 0.13,
    width: "100%",
    // backgroundColor: "green",
    //justifyContent:"center",
    alignItems: "center",
    flexDirection: "row",
  },
  chatsContainer: {
    height:ScreenHeight*0.80,
    width: "96%",
   // backgroundColor: "pink",
  },
  profile: {
   // marginTop:4,
    height: ScreenWidth * 0.15,
    width: ScreenWidth * 0.15,
    borderRadius: 50,
    backgroundColor: "rgba(225,225,225,0.1)",
  },
  boxHoldingMassege: {
    height: "74%",
    width: "80%",
      //backgroundColor: "yellow",
    backgroundColor: "rgba(225,225,225,0.3)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    minHeight: 35,
    minWidth: "20%",
    maxWidth: "60%",
    backgroundColor: "green",
    borderRadius: 20,
  //  elevation: 2,

    marginBottom: 4,
  },

  chatsInput: {
    //backgroundColor: "white",
    height: DEVICE_HEIGHT * 0.072,
    width: "98%",
    flexDirection: "row",
    justifyContent: "center",
    //borderRadius:20,
    alignItems: "center",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2.5,
  },
  actualMessage: {
    minHeight: 40,
    minWidth: "15%",

    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderTopRightRadius: 15,
    // borderBottomRightRadius:15,
    borderTopLeftRadius: 15,
  },
  timeCont: {
    height: 15,
    width: "30%",
    //backgroundColor:'red',
    alignSelf: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    minHeight: 40,
    width: "85%",
    //backgroundColor: "red",
    marginLeft:10
  },
});
