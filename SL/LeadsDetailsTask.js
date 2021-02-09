import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {

  const pressLeadsDetailsPage= ()=>{
    alert("nav to LeadsDetails .js"); 
  };

  const pressLeadsDetailsTasks= ()=>{
    alert("nav to LeadsDetailsTask .js"); 
  };

  const pressSpecifictTask= ()=>{
    alert("nav to TaskDetail .js"); 
  };

  const pressFilter= ()=>{
    alert("press to Filter"); 
  };

  const pressAdd= ()=>{
    alert("nav to NewCallTask .js"); 
  };

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Tasks</Text>
      </View>
      
      <View style={styles.flexrowAlignSelf}>
        <View >
          <TouchableOpacity style={styles.LeadsDetailsbutton} onPress={pressLeadsDetailsPage}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.LeadsTasksbutton} onPress={pressLeadsDetailsTasks}><Text> </Text></TouchableOpacity>
        </View>
      </View>

<ScrollView>
      <View style={{paddingBottom:1, paddingTop:10}}>
      <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}>
                    2/5/2021
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"right"}}>
                    Friday
                </Text>
            </View>
      </View>

      <TouchableOpacity  onPress={pressSpecifictTask}>
      <View style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
                    08:00    Call
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
                    John David
                </Text>
            </View>
      </View>
      </TouchableOpacity>

       <TouchableOpacity  onPress={pressSpecifictTask}>
      <View style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
                    08:00    Appoinment
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
                    John David
                </Text>
            </View>
      </View>
      </TouchableOpacity>
      
      </View>

      <View style={{paddingBottom:1, paddingTop:10}}>
      <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"left"}}>
                    2/6/2021
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"right"}}>
                    Saturday
                </Text>
            </View>
      </View>

      <TouchableOpacity  onPress={pressSpecifictTask}>
      <View style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
                    12:30    Others
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
                    Wilson
                </Text>
            </View>
      </View>
      </TouchableOpacity>

       <TouchableOpacity  onPress={pressSpecifictTask}>
      <View style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:"orange", paddingVertical:1, marginHorizontal:15, elevation: 2}}>
      <View style={{flexDirection:"row", paddingHorizontal:10, paddingBottom:2, marginBottom:3}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"left"}}>
                    08:00    Call
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color: "black",textAlign:"right"}}>
                    Alvin
                </Text>
            </View>
      </View>
      </TouchableOpacity>
      
      </View>
      </ScrollView>


      <View style={styles.flexrow2}>
        <View>
          <TouchableOpacity style={styles.BottomButton} onPress={pressFilter}>
          <Icon name='height' size={35} /> 
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressAdd}>
            <Icon name='add' size={35} />
            </TouchableOpacity>
        </View>
      </View>







      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems:"center",
    //alignContent:"center",
    justifyContent: 'center',
    //padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignSelf:"center",
    alignItems:"flex-start",
  },

  flexrowAlignSelf:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
    // justifyContent:"space-around"
  },


  LeadsDetailsbutton:{
    marginRight:25,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  LeadsTasksbutton:{
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  flexrow2:{
    marginTop:10,
    flexDirection:"row",
    alignSelf:"flex-end"
    // justifyContent:"space-around"
  },

  BottomButton:
{
  // alignSelf:"flex-end",
  backgroundColor:"orange",
  //borderRightWidth:1,
  borderRadius:100,
  marginRight:5,
  width:50,
  height:50,
  paddingTop:8,
  paddingLeft:7
},
  
});
