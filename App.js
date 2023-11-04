import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from "./src/Screens/Signup";
import LoginScreen from "./src/Screens/Login";
import Dashboard from './src/Screens/Dasboard';
import SearchPincode from "./src/Screens/Pincode/SearchPincode";
import Weather from './src/Screens/Wheather/Wheather';
import TextToSpeech from './src/Screens/TextToVoice';
import ChatBot from './src/Screens/Chatbot';
// import firebase from 'firebase/app';
// import 'firebase/database'; // You may also need 'firebase/auth' if you implement user authentication

// const firebaseConfig = {
//   apiKey: 'AIzaSyBPBzxG6txIY6dF2zR5mdAo7_NunMVkrH8',
//   // authDomain: 'YOUR_AUTH_DOMAIN',
//   databaseURL: 'https:// Dummy-app.firebaseio.com',
//   projectId: 'dummy-app-96b78',
//   storageBucket: 'dummy-app-96b78.appspot.com',
//   // messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: '1:334557311991:android:c28202120dfd66f5a2b4f2',
// };

// firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();



export default function App() {
  return (
  <>
  <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="SearchPincode" component={SearchPincode} options={{headerShown:true}}/>
        <Stack.Screen name="Weather" component={Weather} options={{headerShown:true}}/>
        <Stack.Screen name="chatBot" component={ChatBot} options={{headerShown:true}}/>
        <Stack.Screen name="Converter" component={TextToSpeech} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
}

