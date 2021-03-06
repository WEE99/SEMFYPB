import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';

//export default function App() {
  export default ({navigation, route}) => {

  const  pressReportOpen= ()=>
  {
  alert( "nav to OpenLeads .js")
  navigation.navigate('Open Leads');
  };

  const  pressReportWon= ()=>
  {
    alert( "nav to WonLeads .js")
    navigation.navigate('Won Leads');
  };
  

  const  pressReportLost= ()=>
  {
    alert( "nav to LostLeads .js")
    navigation.navigate('Lost Leads');
  };
  


  return (
    <View style={styles.container}>
    <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
      {/* <View>
      <Text style={styles.title}>Report</Text>
      </View> */}
    <View style={{ alignSelf:"center", alignItems:"center", marginTop:30 }}>
      <View style={{ marginTop:10 }}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.Button} onPress={pressReportOpen}>
           <View style={styles.OpenButtonBorder}>
           <Text style={styles.ReportText}>1</Text>
           <Text style={styles.ReportText}>Open Leads</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>


      <View style={styles.flexrow}>
        <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.Button} onPress={pressReportWon}>
           <View style={styles.WonButtonBorder}>
           <Text style={styles.ReportText} >50</Text>
           <Text style={styles.ReportText}>Won Leads</Text>
           </View>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.Button} onPress={pressReportLost}>
           <View style={styles.LostButtonBorder}> 
           <Text style={styles.ReportText} >10</Text>
           <Text style={styles.ReportText}>Lost Leads</Text>
           </View>
        </TouchableOpacity>
        </View>
      </View>
      </View>


    



      <StatusBar style="auto" />
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'flex-start',
    // padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignItems:"flex-start",
  },

  flexrow:{
    marginTop:10,
    flexDirection:"row",
    // justifyContent:"space-around"
  },


  iconContainer:{
    marginRight:10,
  },

  OpenButtonBorder:{
    borderWidth:2,
    borderColor:"#0055FF",
    borderRadius:10,
    padding:"10%",
    justifyContent:"center",
    textAlign:"center",
    alignItems:"center",
    backgroundColor:"#0055FF",
    width:110,
    height:100
  },

  WonButtonBorder:{
    borderWidth:2,
    borderColor:"#19CB37",
    borderRadius:10,
    padding:"10%",
    justifyContent:"center",
    textAlign:"center",
    alignItems:"center",
    backgroundColor:"#19CB37",
    width:110,
    height:100
  },

  LostButtonBorder:{
    borderWidth:2,
    borderColor:"#F62727",
    borderRadius:10,
    padding:"10%",
    justifyContent:"center",
    textAlign:"center",
    alignItems:"center",
    backgroundColor:"#F62727",
    width:110,
    height:100
  },

  ReportText:{
    textAlign:"center",
    color:"white",
    fontSize:18,
    fontWeight:"bold",
  },
  

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },


});
