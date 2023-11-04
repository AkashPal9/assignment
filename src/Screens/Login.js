import React, { useState ,useEffect} from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {TextInput, Text, View, StyleSheet,TouchableOpacity, ActivityIndicator,Keyboard,} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

function LoginScreen({navigation}) {

    // const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordShow = () => setShowPassword(!showPassword)
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [name,setName] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState(null);
    const [clicked, setClicked] = useState(true);
    const [isLoading,setIsLoading] = useState(false);

    // const storeData = async (value) => {
    //     try {
    //       await AsyncStorage.setItem('token', value);
    //     } catch (e) {
    //       // saving error
    //     }
    //   };
  
    
    const api_calling_login = () =>{
        Keyboard.dismiss()
        setIsLoading(true)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
  "password": password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://crud-operation-hpxt.onrender.com/auth/login", requestOptions)
  .then(response => response.text())
  .then(result =>{ 

    console.log(JSON.parse(result),"check result")
    if(JSON.parse(result).token){
        setIsLoading(false)
        // storeData(result.token)
        navigation.navigate('Dashboard',{data:result})
    }
})
  .catch(error => console.log('error', error));
  }




// console.log(email,password,"email_______________password")
    return (
        <SafeAreaView style={styles.main_container}>

            <View style={styles.bottom_container}>
                        <View style={styles.form_wrapper}>
                            <View style={styles.login_text_container}>
                                <Text style={styles.login_text}>Log In</Text>
                            </View>

                            <View style={styles.inputfields}>
                                <MaterialIcons name='email' size={20} style={styles.inputfields_icons} />
                                <TextInput style={styles.textfields} placeholder='Email' placeholderTextColor={'black'} value={email} onChangeText={(text) => setEmail(text)}></TextInput>
                            </View>
                            {emailError && <Text style={styles.error_text} >Email must be filled out.</Text>}

                            <View style={styles.inputfields}>
                                <MaterialIcons name='lock' size={20} style={styles.inputfields_icons} />
                                <TextInput style={styles.textfields} placeholder='Password' secureTextEntry={showPassword ? false : true} placeholderTextColor={'black'} value={password} onChangeText={(text) => setPassword(text)}></TextInput>
                                <TouchableOpacity style={styles.inputfields_icons} onPress={handlePasswordShow} activeOpacity={0.8}>
                                    <Ionicons name={showPassword ? "eye" : "eye-off"} style={{ color: 'black' }} size={20} />
                                </TouchableOpacity>
                            </View>
                            {passwordError && <Text style={styles.error_text}>Password must be filled out.</Text>}

                           

                          <TouchableOpacity style={styles.submit_btn} activeOpacity={0.7}  onPress={api_calling_login}>

                                    <Text style={styles.submit_btn_text}>Log In</Text>

                                </TouchableOpacity>
                          {isLoading && <ActivityIndicator size="large" color={'white'} marginTop={20} />}

                            <View >
                                {loginError && <Text style={styles.login_error_text}>{loginError}</Text>}
                            </View>
                        </View>       
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    top_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom_container: {
        flex: 2,
        backgroundColor: 'black',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20
    },
    form_wrapper: {
        flex: 1,
        padding: 20,
    },
    inputfields: {
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textfields: {
        fontWeight: '900',
        fontSize: 15,
        flex: 1,
        color: 'black'
    },
    top_image: {
        height: 200,
        width: 330
    },
    login_text_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    login_text: {
        fontSize: 25,
        fontWeight: '900',
        color: 'white',
        fontStyle:"italic"
    },
    inputfields_icons: {
        color: 'black',
        padding: 6,
    },
    forgot_pass_text: {
        fontSize: 15,
        color: 'white',
        fontWeight: '800'
    },
    submit_btn: {
        backgroundColor: 'white',
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, borderRadius: 5
    },
    submit_btn_text: {
        color: 'black',
        fontWeight: '900',
        fontSize: 15
    },
    login_error_text: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 15
    },
    error_text:{
        color:'red',
        marginBottom:10
    }


})

export default LoginScreen;