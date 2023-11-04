import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity ,FlatList} from 'react-native';
import Constant from '../../Constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchPincode = () => {

  const [pincode,SetPincode] = React.useState('');
  const [data,SetData] = React.useState([]);

  const fetchPincode = async ()=>{
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(Constant.Pincode + pincode, requestOptions)
        .then(response => response.text())
        .then(result =>{
          const response = JSON.parse(result);
          console.log(response[0]?.PostOffice,"get result")
           SetData(response[0]?.PostOffice)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
     console.log(error,"error") 
    }
  }

  const ListView = ({item})=>{

    return (
 <View style={{flex:1,margin:20}}>
    <Text style={styles.title}>{item.Name}</Text>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Branch Type:</Text>
      <Text style={{ maxWidth: 100, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.BranchType}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Delivery Status:</Text>
      <Text>{item.DeliveryStatus}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Circle:</Text>
      <Text>{item.Circle}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>District:</Text>
      <Text>{item.District}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Division:</Text>
      <Text>{item.Division}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Region:</Text>
      <Text>{item.Region}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Block:</Text>
      <Text>{item.Block}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>State:</Text>
      <Text>{item.State}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Country:</Text>
      <Text>{item.Country}</Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.label}>Pincode:</Text>
      <Text>{item.Pincode}</Text>
    </View>
    </View>
  )}

  
    // const item =   {
    //     "Name": "Anandpuri (Muzaffarnagar)",
    //     "Description": null,
    //     "BranchType": "Sub Post Office",
    //     "DeliveryStatus": "Non-Delivery",
    //     "Circle": "Uttar Pradesh",
    //     "District": "Muzaffarnagar",
    //     "Division": "Muzaffarnagar",
    //     "Region": "Bareilly",
    //     "Block": "Muzaffarnagar",
    //     "State": "Uttar Pradesh",
    //     "Country": "India",
    //     "Pincode": "251001"
    // }

// console.log(data,"check data")
  return (
  <View>  
    <View style={styles.input}>
      <View style={{width:"80%"}}>
        <TextInput placeholder='Enter Pincode' onChangeText={(val)=>SetPincode(val)}/>
      </View>
      <View  style={{width:"20%",}}>
    <TouchableOpacity style={{backgroundColor:"black",height:30}} onPress={fetchPincode}>
      <Text style={{textAlign:"center",color:"#fff",paddingTop:5}}>Search</Text>
    </TouchableOpacity>
      </View>
  </View>
   
  <FlatList
        data={data}
        renderItem={({item,index}) => <ListView item={item}/>}
        keyExtractor={item => item.id}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  input:{
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width:'93%',
    height:30,
    alignSelf:"center",
    margin:10

  }

});

export default SearchPincode;
