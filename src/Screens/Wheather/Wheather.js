import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,TextInput ,TouchableOpacity,Keyboard,ActivityIndicator,ImageBackground} from 'react-native';
import Constant from '../../Constant';



const Weather = () => {
  const [city , SetCity] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });


  const getWeather = async () => {
    console.log(city,"city")
    Keyboard.dismiss();
    setIsLoading(true)
        try {
          var requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };
         await  fetch(`${Constant.base}weather?q=${city}&units=metric&APPID=${Constant.key}`, requestOptions)
              .then(response => response.text())
              .then(result =>{
                  const data = JSON.parse(result);
                  console.log("Whether",data)
                  const updatedWeatherData = {
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                    city: data.name,
                    temperatureC: Math.round(data.main.temp),
                    temperatureF: Math.round(data.main.temp * 1.8 + 32),
                    humidity: data.main.humidity,
                    description: data.weather[0].main,
                    country: data.sys.country,
                  };
                  console.log(updatedWeatherData,"update Whether")
                  setWeatherData(updatedWeatherData);
                  setIsLoading(false)
              })
              .catch(error => console.log('error', error));
        } catch (error) {
            setIsLoading(false)
          console.log(error,"error")
        }
   
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/background1.jpg')}  resizeMode="cover" style={{flex:1}}>
    <View style={styles.input}>
      <View style={{width:"80%"}}>
        <TextInput placeholder='Enter City Name' onChangeText={(val)=>SetCity(val)}/>
      </View>
      <View  style={{width:"20%",}}>
    <TouchableOpacity style={{backgroundColor:"black",height:30}} onPress={getWeather}>
      <Text style={{textAlign:"center",color:"#fff",paddingTop:5}}>Search</Text>
    </TouchableOpacity>
      </View>
  </View>
        <View style={styles.city}>
          <View style={styles.title}>
            <Text style={styles.header}>{weatherData?.city}</Text>
            <Text style={styles.country}>{weatherData?.country}</Text>
          </View>
          <View style={styles.mbIcon}>
            <Image source={require('../../assets/images/forecast.png')} resizeMode='cover' style={{height:50,width:50}}/>
            <Text style={styles.weatherDescription}>{weatherData?.description}</Text>
          </View>
          <View style={styles.dateTime}>
         
            <View style={styles.temperature}>
              <Text style={styles.temperatureText}>
                Temperature {weatherData?.temperatureC}°<Text style={styles.celsius}>C</Text>
              </Text>
              <Text style={styles.temperatureText}>
                {weatherData.temperatureF}°<Text style={styles.fahrenheit}>F</Text>
              </Text>
              <Text style={styles.temperatureText}>
              Humidity  {weatherData.humidity}<Text style={styles.fahrenheit}></Text>
              </Text>
               <Image source={require('../../assets/images/WeatherIcons.gif')} resizeMode='cover' style={{width:200,height:200}}/>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    marginBottom: 10,
    flexDirection:"row",
  },
  header: {
    fontSize: 24,
   paddingRight:5
  },
  country: {
    fontSize: 28,
  },
  mbIcon: {
    alignItems: 'center',
  },
  weatherDescription: {
    fontSize: 25,
    fontWeight:"bold"
  },
  dateTime: {
    alignItems: 'center',
    marginTop: 10,
  },
  dmy: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
  currentTime: {
    marginBottom: 10,
  },
  currentDate: {
    fontSize: 16,
  },
  temperature: {
    marginTop: 10,
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 24,
  },
  celsius: {
    fontSize: 18,
  },
  fahrenheit: {
    fontSize: 18,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: '50%',
  },
  loadingText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
  },
  input:{
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width:'93%',
    height:30,
    alignSelf:"center",
    margin:10

  }
});

export default Weather;
