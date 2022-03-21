//Studentpage
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
  
  const DocumentData = [
    {
     
      title: "Book-ANSWER SERIES",
  id:"4-54-56-5-65-6"
    },
    {
     
      title: "GRUP LIST",
      id:"2-123-234-23-45"
      
    },
  ];
  
  
  const Studentpage = ({ navigation }) => {
    const HoldingDocumentInfo = ({ item, navigation }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          alert("commiiiii");
        }}
      >
        <View style={styles.iconBox}>
          <Image
            style={{
              width: screenWidth * 0.15,
              height: screenWidth * 0.15,
            }}
            source={require("./Image/document.jpg")}
          />
        </View>
        <View style={styles.discriptionBox}>
          <View style={styles.holdingTitleBox}>
            <Text style={[styles.text, { fontSize: 18, fontWeight: "600" }]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonToDownload}>
            <Text style={{fontSize:11}}>DOWNLOAD PDF</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: "#DFDFDF",
              width: "10%",
              height: "50%",
              borderRadius: 9,
            },
          ]}
        ></View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
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
            <Text style={{ fontSize: 10 }}>Name of School</Text>
          </View>
          <View
            style={[
              styles.InstutlName,
              { borderColor: "black", borderLeftWidth: 1, borderRightWidth: 1 },
            ]}
          >
            <Text style={{ fontSize: 10 }}>Document page</Text>
          </View>
          <View style={styles.InstutlName}>
            <Text style={{ fontSize: 10 }}>subject</Text>
          </View>
        </View>
        <FlatList
          data={DocumentData}
          renderItem={HoldingDocumentInfo}
          keyExtractor={(item) => item.id}
          //  extraData={selectedId}
        />
      </View>
    );
  };
  export default Studentpage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      height: DEVICE_HEIGHT * 0.05,
      backgroundColor: "#E7E7E7",
      //  marginTop:20,
    },
    itemContainer: {
      height: deviceHeight * 0.1,
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
      width: "75%",
    //  backgroundColor: "green",
      alignItems: "center",
      // justifyContent:"center",
    },
  
    holdingTitleBox: {
      height: "55%",
      width: "98%",
      margin:3,
     // backgroundColor: "yellow",
    //  alignItems: "center",
      //justifyContent:"center",
    },
    buttonToDownload: {
      height: "35%",
      width: "50%",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      shadowColor: "#666666",
      shadowOffset: {
        width: 3,
        height: 6,
      },
      shadowOpacity: 3,
      shadowRadius: 5,
      elevation: 4,
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
  });
