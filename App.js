import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";

// Import all available files for navigation parpose
import LandingPage from "./scr/Authontication/LandingPage";
import LogIn from "./scr/Authontication/LogIn";
import SignUp from "./scr/Authontication/SingUp";
import Splash from "./scr/Componet/Splash";
import MainScreen from "./scr/MainScreen";
import VideosScreen from "./scr/VideosScreen";
import Documment from "./scr/Documment";
import Marks from "./scr/Marks";

//thise page might not be used
import Studentpage from "./scr/Studentpage";

//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPsCql9__xc1ctRAbvMmc1b40_disItRQ",
  authDomain: "istudy-eb3f5.firebaseapp.com",
  projectId: "istudy-eb3f5",
  storageBucket: "istudy-eb3f5.appspot.com",
  messagingSenderId: "516243921916",
  appId: "1:516243921916:web:f2d12828ceb3ab266ab079",
  measurementId: "G-ZJEJPMBBM3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingUp"
        component={SignUp}
        options={{
          title: "SignUp", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideosScreen"
          component={VideosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Documment"
          component={Documment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Marks"
          component={Marks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Studentpage"
          component={Studentpage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
