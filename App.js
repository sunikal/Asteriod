/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [asteroid, setasteroid] = useState('');
  const [hazardous, sethazardous] = useState('');
  const [data, setdata] = useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const getAsteriodData=(from)=>{
    console.log("from",from);
    var url = '';
    if(from = "submit"){
      url = 'https://api.nasa.gov/neo/rest/v1/neo/'+asteroid+'/?api_key=AzySZe9ezXvnSgBmG6vmyh1KO97VZx6vfkcdfJrY';
    }else{
      url = 'https://api.nasa.gov/neo/rest/vl/neo/browse'+asteroid+'?api_key=AzySZe9ezXvnSgBmG6vmyh1KO97VZx6vfkcdfJrY';
    }

    console.log("url",url);
    
    
   fetch(url,{
      method:'get',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      }
    }).then((response) => response.json()).
    then((responseJson) => {
      console.log(responseJson);
      console.log("is_potentially_hazardous_asteroid",responseJson.is_potentially_hazardous_asteroid);
      if(responseJson.is_potentially_hazardous_asteroid == false){
        sethazardous("false");
      }else{
        sethazardous("true");
      }
      setdata(responseJson);
    }).
    catch((e)=> console.log(e)) 
  };


  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">

        <View style={{marginVertical: 10}} />

        <View style={{marginHorizontal: 10,backgroundColor:'#efefef',paddingVertical: 10}}>
            <TextInput 
              placeholder="Enter Asteroid ID"
              placeholderStyle={{color:'black',fontSize:13}}
              onChangeText={(text)=>{setasteroid(text)}}
              style={{height: 45,borderRadius: 10}}
            />
        </View>

        <View style={{flex:1,flexDirection:'row',marginVertical:30,justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> asteroid.length > 0 ?getAsteriodData("submit"):null}>
          <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <View style={{margin:20}}/>
        <TouchableOpacity onPress={()=> asteroid.length > 0 ?getAsteriodData("reandom"):null}>
          <View style={styles.buttonView}>
              <Text style={styles.buttonText}>Random Asteroid</Text>
          </View>
        </TouchableOpacity>
        </View>


        {data != null && data != ''?<View style={{marginHorizontal:10}}>
          <Text style={styles.textStyle}>{data.name}</Text>
          <Text style={styles.textStyle}>{data.nasa_jpl_url}</Text>
          <Text style={styles.textStyle}>{hazardous}</Text>
        </View>: <View></View>}

        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonView:{
    flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'
  },
  buttonText:{
    fontSize:22,backgroundColor:'#ececec',padding: 10,borderRadius:4
  },
  textStyle:{
    fontSize:17,
    padding:3
  }
});

export default App;
