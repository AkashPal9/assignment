import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground ,Image} from 'react-native';

const Dashboard = ({navigation}) => {
  return (
    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.container}>
      <Text style={{fontSize:25,fontWeight:"bold",paddingBottom:10,textAlign:"center",fontStyle:"italic",marginBottom:30}}>Our Services</Text>
      <View style={styles.gridRow}>
   
        {/* <Image source={require('../assets/images/Location-icon-PNG.png')} style={{width:10,height:10}}/> */}
        <TouchableOpacity style={styles.gridItem} onPress={()=>navigation.navigate('SearchPincode')}>
          <Text style={styles.gridItemText}> 
           Search Pincodes</Text>
        </TouchableOpacity>
   
        <TouchableOpacity style={styles.gridItem} onPress={()=>navigation.navigate('Weather')} >
          <Text style={styles.gridItemText}>Wheather Info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridRow}>
        <TouchableOpacity style={styles.gridItem} onPress={()=>navigation.navigate('chatBot')}>
          <Text style={styles.gridItemText}>ChatBot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={()=>navigation.navigate('Converter')}>
          <Text style={styles.gridItemText}>Text To Speech</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  gridItem: {
    width: '48%', 
    height: 150,
    backgroundColor: '#708090',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
