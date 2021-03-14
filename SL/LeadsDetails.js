import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import {Entypo} from 'react-native-vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import { orange } from './TablesandTimeFormat';
//LeadsDetails

// export default function App() {
export default ({navigation, route}) => {

  const {comment,company,contactNumber,contacted,date,email,interest,name,quote,quoteSent,result,userId,id} = route.params;

  const pressLeadsDetailsPage= ()=>{
    alert("nav to LeadsDetails .js"); 
    navigation.navigate("Details");
  };

  const pressLeadsDetailsTasks= ()=>{
    alert("nav to LeadsDetailsTask .js"); 
    navigation.navigate("Tasks",{id:id});
  };

  const pressEdit= ()=>{
    alert("press to edit details");
    navigation.navigate("Edit Details");
  };

  const pressCall= ()=>{
    alert("press to call"); 
  };

  const pressMail= ()=>{
    alert("press to mail"); 
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}>
     
      {/* <View>
      <Text style={styles.title}>Details</Text>
      </View> */}

  
      <View style={styles.flexrowNAV}>
        <View >
          <TouchableOpacity style={styles.LeadsDetailsbutton} onPress={pressLeadsDetailsPage}><Text> </Text></TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.LeadsTasksbutton} onPress={pressLeadsDetailsTasks}><Text> </Text></TouchableOpacity>
        </View>
      </View>


      {/* <View  style={styles.LeadsContainer}>
      <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10,  paddingBottom:"10%",padding:"10%",paddingTop:5, marginRight:"5%"}}>
      <View style={styles.LeadsNameContainer}>
        <Text style={{color:"black",fontWeight:"bold"}}>{name}</Text>
      </View> */}

      <View  style={styles.LeadsContainer}>
      <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, paddingTop:"5%", paddingBottom:"10%",padding:"1%",alignSelf:"center",marginLeft:"5%",marginRight:"5%"}}>
      <View style={{alignSelf:"center"}}>
      <View style={{width:310, alignSelf:"center",paddingLeft:15, zIndex:2, flexDirection:"row", justifyContent:"space-between"}}>
      <View style={{paddingVertical:5, marginVertical:3, backgroundColor:orange, borderRadius:10, maxWidth:100,flex:0.5, maxHeight:40}}>
        <Text style={{fontSize:20,color:"black",fontWeight:"bold",alignSelf:"center"}}>{name}</Text>
      </View>

      <View style={{borderRadius:50,backgroundColor:orange, width:100,height:100, alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
        <Text style={{color:"white",fontWeight:"bold",alignSelf:"center",fontSize:24}}>{result}</Text>
      </View>
      </View>
  
      
        {/* <Text style={styles.LeadsInfo}>J ohn David sasdad ad as dsdadadadsdaadsdadohn David sasdad ad as dsdadadadsdaadsdad</Text> */}
        <View style={styles.LeadsInfo}>
          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='call' size={30} style={styles.LeadsDetailIcon} />
          </View> 

          <View style={styles.textcontainer}>
          <Text>{contactNumber}</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='email' size={30} style={styles.LeadsDetailIcon} /> 
          </View>

          <View style={styles.textcontainer}>
          <Text>{email}</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='domain' size={30} style={styles.LeadsDetailIcon}/> 
          </View>

          <View style={styles.textcontainer}>
          <Text>{company}</Text>
          </View>
          </View>
        </View>

        <View style={{marginTop:"23%"}}></View>

      
        <View style={styles.LeadsInterest}>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          {/* <Icon name='book' size={30} style={styles.LeadsDetailIcon} /> */}
          <Ionicons name="search" size={30} style={styles.LeadsDetailIcon} />
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Interest</Text>
          <Text>{interest}</Text>
          </View>
          </View>
          

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          {/* <Icon name='message' size={30} style={styles.LeadsDetailIcon} /> */}
          <MaterialIcons name="comment" size={30} style={styles.LeadsDetailIcon}  />
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Comment</Text>
          <Text>{comment}</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='pending' size={30} style={styles.LeadsDetailIcon}/> 
          </View>
          
         <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Status</Text>
          <Text>{contacted? "Contacted":"Not Contacted"}</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='euro' size={30} style={styles.LeadsDetailIcon}/> 
          {/* <Foundation name="dollar" size={65} style={styles.LeadsDetailIcon} /> */}
          {/* <Fontisto name="dollar" size={50} style={styles.LeadsDetailIcon}/> */}
          {/* <FontAwesome5 name="dollar-sign" size={50}  style={styles.LeadsDetailIcon} /> */}
          </View>

          <View style={styles.textcontainer}>
          <Text style={styles.textintrustion}>Quotation Sent</Text>
          <Text>RM {quote}</Text>
          </View>
          </View>

          <View style={styles.flexrow}>
          <View style={styles.iconcontainer}>
          <Icon name='verified' size={30} style={styles.LeadsDetailIcon} /> 
          </View>

          <View style={styles.textcontainer}>
          <Text  style={styles.textintrustion}>Quotation Agreed</Text>
          <Text>{quoteSent? "Agreed":"Not Agreed"}</Text>
          </View>
          </View>
        </View>
        </View>
        </ScrollView>
      </View>
      
      

      <View style={styles.flexrow2}>
        <View>
          <TouchableOpacity style={styles.BottomButton} onPress={pressEdit}>
          {/* <Icon name='edit' size={35} style={styles.LeadsDetailIcon2} />  */}
          <FontAwesome5 name="edit" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressCall}>
            {/* <Icon name='call' size={35} style={styles.LeadsDetailIcon2} /> */}
            <Ionicons name="md-call-outline" size={28} color="black" />
            </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.BottomButton} onPress={pressMail}>
            {/* <Icon name='mail' size={35} style={styles.LeadsDetailIcon2} /> */}
            <Octicons name="mail" size={28} color="black" />
            </TouchableOpacity>
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
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    // padding:"20%",
  },

  title:{
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    alignSelf:"center",
    alignItems:"flex-start",
  },

  flexrowNAV:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
  },

  flexrow:{
    marginTop:10,
    alignSelf:"flex-start",
    flexDirection:"row",
    // marginTop:10,
    // flexDirection:"row",
    // justifyContent:"space-around"
  },

  
  flexrow2:{
    // marginBottom:100,
    flexDirection:"row",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:0,
    // justifyContent:"flex-end"
  },

  LeadsDetailsbutton:{
    marginRight:25,
    backgroundColor:orange,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  LeadsTasksbutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

LeadsContainer:{
  marginTop:10,
  alignSelf:"center",
  //borderWidth:2,
  padding:5,
  // paddingLeft:"20%",
  // paddingRight:"20%",
  paddingTop:0,
  borderColor:"green",
  // backgroundColor:"red",
  height:"85%",
  width:'100%',
},

LeadsNameContainer:{
  marginTop:10,
  marginLeft:60,
  alignSelf:"flex-start",
  borderWidth:2,
  padding:5,
  //borderColor:"red",
  borderColor:orange,
  borderRadius:10,
  backgroundColor:orange,
  zIndex:2,
},

iconcontainer:{alignContent:"center"},


LeadsInfo:{
  //alignSelf:"flex-start",
  alignSelf:"center",
  borderWidth:2,
  marginTop:30,
  marginLeft:5,
  paddingTop:15,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  position:"absolute",
  width:296,
  // width:"95%",
  zIndex:1
},

LeadsDetailIcon:{marginRight:10, color:orange},
// LeadsDetailIcon2:{marginRight:10},

LeadsInterest:{
  alignSelf:"center",
  marginTop:10,
  marginLeft:5,
  borderWidth:2,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  //backgroundColor:"red",
  // width:"98%",
  width:296,
  //position:"absolute"
},

textcontainer:{justifyContent:"center", width:"80%", paddingRight:5},

textintrustion:{fontWeight:'bold', color:"#B56118"},

BottomButton:
{
  // alignSelf:"flex-end",
  backgroundColor:orange,
  //borderRightWidth:1,
  borderRadius:100,
  marginRight:5,
  width:45,
  height:45,
  alignItems:"center",
  justifyContent:"center"
  // paddingTop:5,
  // paddingLeft:5
},


bgimage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: "cover",
  // padding:"5%",
  // paddingRight:0,
  // paddingTop:0,
  justifyContent: "flex-start"

},

// bgimage: {
//   flex: 1,
//   width: '100%',
//   height: '100%',
//   resizeMode: "cover",
//   justifyContent: "flex-start"
// },


});
