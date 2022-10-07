import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import Header from "./Componet/Header";

import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Firebase Storage to upload file
import {
  getStorage,
  ref,
  storage,
  uploadBytes,
} from "@react-native-firebase/storage";
// To pick the file from local file system

import * as DocumentPicker from "expo-document-picker";
import { Ionicons, Feather,MaterialCommunityIcons, Entypo } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// To pick the file from local file system

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;


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
  const [inputMessage, setInputMessage] = useState(""); // state for input text
  // const [messagesData ,setMessagesData ]=useState([]);//state for data (array)
  const [keyboardIsOpened, setKeyboardIsOpened] = useState(false);
  const [fullNames, setUserName] = useState("Full Names");
 // const { item } = route.params;
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
    timeStamp: 1534672667723,
  },
  {
    senderID: "person1",
    message: "morning sire",
    time: "10:35",
    delivered: true,
    timeStamp: 1543634726672,
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

  const DefoultgroupMassege = ({item}) => (
    <View style={styles.headerMassegeCounteiner}>
      <TouchableOpacity style={styles.profile}>
        
      </TouchableOpacity>
      <View style={styles.boxHoldingMassege}>
      <Text style={{ fontStyle: "italic",fontSize:16, fontVariant:[ 'small-caps' ] }}>subject</Text>
        <Text style={{ fontStyle: "italic" }}>
          is the co-odinator of thise group chat
           all student under this subject are allowed to ask question, and sher thier idies
         
        </Text>
      </View>
    </View>
  );
  const EachMessage = ({ item}) =>
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
        <View style={styles.profileContainer}></View>
      </View>
    </View>
  );
}
//check if user is a student or a techer then locate them to the axect page
function TeachersAdminHome({ navigation }) {
  const [schoolName, setSchoolName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState("");
  const [position, setPosition] = useState("");
  useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Users/${userId}/PersonalData`)
      .on("value", (snapshot) => {
        setUserName(`${snapshot.val().userName}`);
        setUserEmail(`${snapshot.val().userEmailAdress}`);
        setPosition(`${snapshot.val().position}`);
        setSchoolName(`${snapshot.val().schoolName}`);
      });
  }, []);

  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.getDocumentAsync({
        // Provide which type of file you want user to pick
      //  type: "image/*",

         type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });
      console.log("file : " + JSON.stringify(fileDetails ));
      // Setting the state for selected File
      setFilePath(fileDetails );


    } catch (error) {
      
      setFilePath({});
      // If user canceled the document selection
     
      console.log(error);
    }
  };
  
  const _uploadFile = (fileDetails, ) => {
  
 
  
    try {
      //  Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert("Please Select any File");
      setLoading(true);
const nameOftheFile = (+new Date()) + '-' + filePath.name;
      const reference = firebase
        .storage()
        .ref("files/")
      
        const metadata = {
          contentType: filePath.mimeType
        };
      // Put File
       // reference.child("file/" + filePath.name )
      const task = reference.child(nameOftheFile).put(filePath, metadata);
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();
     console.log(filePath.type)
      task.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {

        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        setProcess(
          `${snapshot.bytesTransferred} transferred 
           out of ${snapshot.totalBytes}`
        );
        console.log(
          `${snapshot.bytesTransferred} transferred 
           out of ${snapshot.totalBytes}`
        );
      }, 
      (error) => {
        alert("Err0r>>>"+ error)
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
    
    } catch (error) {
      console.log("Error->", error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
    
 setFilePath({});
  };

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
              // onPress={}
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
              <Text
                style={styles.inputStyle}
                //onChangeText={}
                //value={}
              >
              {filePath.name}
              </Text>
            </View>
            <Text></Text>
            <TouchableOpacity
              style={styles.inputDocument}
              onPress={_chooseFile}
            >
              <Text> Choose a File</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconandbutton}>
            <Image
              style={styles.imagediscribe}
              source={require("./Image/document.jpg")}
            />
            <TouchableOpacity
              style={styles.buttonSubmitstyle}
              onPress={_uploadFile}
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
  profileContainer: {
    height: deviceHeight * 0.037,
    width: screenWidth * 0.33,
    backgroundColor: "green",
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
    height: screenWidth * 0.15,
    width: screenWidth * 0.15,
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
