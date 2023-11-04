import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Pressable,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginButton, AccessToken } from "react-native-fbsdk";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
  } from '@react-native-google-signin/google-signin';

function SignupScreen({ navigation }) {
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => setShowPassword(!showPassword);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setconfirmPasswordError] = useState(false);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {

  //     const configureGoogleSignIn = async () => {
  //         try {
  //             await GoogleSignin.configure({
  //               androidClientId: '334557311991-iho4k3bssrgva3mpthvi37hpakegmg7j.apps.googleusercontent.com'
  //             });
  //             // Additional code or logic after configuring Google Sign-In
  //         } catch (error) {
  //             // Handle any errors that occur during the configuration
  //             console.error('Error configuring Google Sign-In:', error);
  //         }
  //     };
  //     configureGoogleSignIn();
  // }, []);

 const signIn = async () => {
  console.log("Google Click")
  try {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      androidClientId: '334557311991-iho4k3bssrgva3mpthvi37hpakegmg7j.apps.googleusercontent.com',
 
  });
  GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
         GoogleSignin.signIn().then((userInfo) => {
                     console.log(JSON.stringify(userInfo))
           }).catch((e) => {
           console.log("ERROR IS: " + JSON.stringify(e));
           if(e?.userInfo === null){
            navigation.navigate('Dashboard')
           }
           })
      }
  }).catch((e) => {
  console.log("ERROR IS: " + JSON.stringify(e));
  })
  } catch (error) {
    console.log(error,"error")
  }
 
  };

  // const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('token');
  //       if (value !== null) {
  //           navigation.navigate('Dashboard')
  //       }
  //     } catch (e) {
  //       console.log(e,"error")
  //     }
  //   };

  const api_calling_signup = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://crud-operation-hpxt.onrender.com/admins", requestOptions)
      .then((response) => {
        const { status } = response;
        console.log(status, "status");
        if (status == 201) {
          setIsLoading(false);
          navigation.navigate("Login");
          // Alert.alert('SingUp',
          // 'You have Succesfully SignUp!',{text:'Ok',onPress:()=> navigation.navigate('Login')})
        }
        response.text();
      })
      .then((result) => {
        console.log("response..........", result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleNameChange = (text) => {
    setName(text);
    if (name !== "") {
      setNameError(false);
    }
  };


  

  const handleEmailChange = (text) => {
    setEmail(text);
    if (email !== "") {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (password !== "") {
      setPasswordError(false);
    }
  };

  const handleConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (password === text) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.login_text_container}>
        <Text style={styles.signup_text}>Create New Account</Text>
      </View>
      <View style={styles.inputfields}>
        <FontAwesome name="user" size={25} style={styles.inputfields_icons} />
        <TextInput
          style={styles.textfields}
          placeholder="Name"
          placeholderTextColor={"black"}
          value={name}
          onChangeText={handleNameChange}
        ></TextInput>
      </View>
      {nameError && (
        <Text style={styles.error_text}>Name must be filled out.</Text>
      )}

      <View style={styles.inputfields}>
        <MaterialIcons
          name="email"
          size={20}
          style={styles.inputfields_icons}
        />
        <TextInput
          style={styles.textfields}
          placeholder="Email"
          placeholderTextColor={"black"}
          value={email}
          onChangeText={handleEmailChange}
        ></TextInput>
      </View>
      {emailError && <Text style={styles.error_text}> eg: xyz@gmail.com</Text>}

      <View style={styles.inputfields}>
        <MaterialIcons name="lock" size={20} style={styles.inputfields_icons} />
        <TextInput
          style={styles.textfields}
          placeholder="Password"
          secureTextEntry={showPassword ? false : true}
          placeholderTextColor={"black"}
          value={password}
          onChangeText={handlePasswordChange}
        ></TextInput>
        <TouchableOpacity
          style={styles.inputfields_icons}
          onPress={handlePasswordShow}
          activeOpacity={0.8}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            style={{ color: "black" }}
            size={20}
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.error_text}>Password must be filled out.</Text>
      ) : password !== "" && password.length < 8 ? (
        <Text style={{ color: "red", marginBottom: 20 }}>
          Password must be contain 8 characters?
        </Text>
      ) : (
        ""
      )}

      <View style={styles.inputfields}>
        <MaterialIcons name="lock" size={20} style={styles.inputfields_icons} />
        <TextInput
          style={styles.textfields}
          placeholder="Confirm Password"
          secureTextEntry={showPassword ? false : true}
          placeholderTextColor={"black"}
          value={confirmPassword}
          onChangeText={handleConfirmPassword}
        ></TextInput>
        <TouchableOpacity
          style={styles.inputfields_icons}
          onPress={handlePasswordShow}
          activeOpacity={0.8}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            style={{ color: "black" }}
            size={20}
          />
        </TouchableOpacity>
      </View>
      {confirmpasswordError && (
        <Text style={styles.error_text}>
          ConfirmPassword must be filled out
        </Text>
      )}

      {isPasswordMatch && (
        <Text style={styles.error_text}>Password not Match</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Already have an Account ?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submit_btn]}
        activeOpacity={0.7}
        onPress={api_calling_signup}
      >
        <View>
          <Text style={styles.submit_btn_text}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    
      <Text style={{color: "#fff", fontWeight: "900",fontSize: 15,padding:10,textAlign:"center"}}>
        OR 
      </Text>
      <View style={{alignSelf:"center"}}>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                  console.log(data.accessToken.toString(), "User Data");
                });
            }
        }}
        onLogoutFinished={() => console.log("logout.")}
        />
         <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signIn();
        }}
        disabled={isSigninInProgress}
      />
        </View>
      
      
      {isLoading && (
        <ActivityIndicator size="large" color={"black"} marginTop={20} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "black",
    maxWidth: "90%",
  },
  top_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top_image: {
    height: 200,
    width: 330,
  },
  bottom_container: {
    flex: 3,
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  form_wrapper: {
    flex: 1,
    padding: 20,
  },
  signup_text_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  signup_text: {
    fontSize: 25,
    fontWeight: "900",
    color: "white",
    fontStyle: "italic",
  },
  inputfields: {
    backgroundColor: "white",
    marginBottom: 15,
    padding: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  textfields: {
    fontWeight: "900",
    fontSize: 15,
    flex: 1,
    color: "black",
  },
  inputfields_icons: {
    color: "black",
    padding: 6,
  },
  submit_btn: {
    backgroundColor: "white",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
  },
  submit_btn_text: {
    color: "black",
    fontWeight: "900",
    fontSize: 15,
  },
  error_text: {
    color: "red",
    marginBottom: 10,
  },
  terms_container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  terms_label: {
    fontSize: 14,
    color: "white",
    textAlign: "center",

    alignItems: "center",
  },
  disabled_submit_btn: {
    backgroundColor: "gray", // Style for the disabled button
  },
  profile_img_container: {
    flex: 1,
    alignItems: "center",
    height: 110,
  },
  profile_img_wrapper: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
  },
  profile_img: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },

  button: {
    borderWidth: 2,
    borderColor: "black",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  login_text_container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
  },
  login_text: {
    fontSize: 25,
    fontWeight: "900",
    color: "black",
  },
});

export default SignupScreen;
