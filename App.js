import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Entypo} from 'react-native-vector-icons';

export default function App() {

  const pressDetailsPage= ()=>{
    alert("nav to Details .js"); 
  };

  const pressTasks= ()=>{
    alert("nav to DetailsTask .js"); 
  };

  const pressEdit= ()=>{
    alert("press to edit details"); 
  };

  const pressCall= ()=>{
    alert("press to call"); 
  };

  const pressMail= ()=>{
    alert("press to mail"); 
  };


  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Details</Text>
      </View>

      <View style={styles.flexrow}>
        <View >
          <TouchableOpacity style={styles.Detailsbutton} onPress={pressDetailsPage}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.Tasksbutton} onPress={pressTasks}><Text> </Text></TouchableOpacity>
        </View>
      </View>



      <View  style={styles.LeadsContainer}>

      <View style={styles.LeadsNameContainer}>
        <Text>John David</Text>
      </View>
  
      
        {/* <Text style={styles.LeadsInfo}>J ohn David sasdad ad as dsdadadadsdaadsdadohn David sasdad ad as dsdadadadsdaadsdad</Text> */}
        
        <View style={styles.LeadsInfo}>
          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='call' size={30} style={styles.LeadsDetailIcon} />
          </View> 

          <View style={styles.textcontainer}>
          <Text>011 51600456</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='email' size={30} style={styles.LeadsDetailIcon} /> 
          </View>

          <View style={styles.textcontainer}>
          <Text>Google@gmail.com</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='domain' size={30} style={styles.LeadsDetailIcon}/> 
          </View>

          <View style={styles.textcontainer}>
          <Text>GOOGLE.Co</Text>
          </View>
          </View>
        </View>

        <View style={{marginTop:130}}></View>

        
        <View style={styles.LeadsInterest}>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='book' size={30} style={styles.LeadsDetailIcon} />
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Interest</Text>
          <Text>Website</Text>
          </View>
          </View>
          

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='message' size={30} style={styles.LeadsDetailIcon} />
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Comment</Text>
          <Text>Wwalao ehhh</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='pending' size={30} style={styles.LeadsDetailIcon}/> 
          </View>
          
         <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Status</Text>
          <Text>Contacted</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='euro' size={30} style={styles.LeadsDetailIcon}/> 
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Quotation Sent</Text>
          <Text>RM 2000</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='verified' size={30} style={styles.LeadsDetailIcon} /> 
          </View>

          <View style={styles.textcontainer}>
          <Text  style={styles.textintrustion}>Quotation Agreed</Text>
          <Text>RM 2000</Text>
          </View>
          </View>
        </View>

      </View>

      <View style={styles.flexrow2}>
        <View>
          <TouchableOpacity style={styles.BottomButton} onPress={pressEdit}>
          <Icon name='edit' size={35} style={styles.LeadsDetailIcon} /> 
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressCall}>
            <Icon name='call' size={35} style={styles.LeadsDetailIcon} />
            </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressMail}>
            <Icon name='mail' size={35} style={styles.LeadsDetailIcon} />
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
    alignItems:"center",
    justifyContent: 'flex-start',
    padding:"20%",
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

  
  flexrow2:{
    marginTop:10,
    flexDirection:"row",
    alignSelf:"flex-end"
    // justifyContent:"space-around"
  },

  Detailsbutton:{
    marginRight:25,
    backgroundColor: "orange",
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  Tasksbutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

LeadsContainer:{
  marginTop:10,
  alignSelf:"flex-start",
  //borderWidth:2,
  padding:5,
  // paddingLeft:"20%",
  // paddingRight:"20%",
  paddingTop:0,
  borderColor:"green",
  width:'100%',
},

LeadsNameContainer:{
  marginTop:10,
  marginLeft:10,
  alignSelf:"flex-start",
  borderWidth:2,
  padding:5,
  //borderColor:"red",
  borderColor:"lightgrey",
  borderRadius:10,
  backgroundColor:"white",
  zIndex:2,
},

iconcontainer:{alignContent:"center"},


LeadsInfo:{
  //alignSelf:"flex-start",
 // alignItems:"flex-start",
  borderWidth:2,
  marginTop:30,
  marginLeft:5,
  paddingTop:15,
  padding:5,
  borderColor:"lightgrey",
  borderRadius:10,
  position:"absolute",
  width:"100%",
  zIndex:1
},

LeadsDetailIcon:{marginRight:10},

LeadsInterest:{
  //alignSelf:"flex-start",
  marginTop:10,
  marginLeft:"1.5%",
  borderWidth:2,
  padding:5,
  borderColor:"lightgrey",
  borderRadius:10,
  //backgroundColor:"red",
  width:"100%",
  //position:"absolute"
},

textcontainer:{justifyContent:"center", width:"80%", paddingRight:5},

textintrustion:{fontWeight:'bold', color:"orange"},

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
