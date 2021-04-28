import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Platform,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Feather';

export default ({navigation, route}) => {


const {address,date,description,LeadId,name,notes,outcome,status,title,call,userId} = route.params;

console.log("CallTaskDetail: "+ name +" "+title)



return (
    
    <ScrollView>
        <View style={{ flex: 1,padding: '5%',}}>
            <Text style={styles.title}> {title.toUpperCase()}'S DETAIL</Text>
        

        <View  style={styles.LeadsContainer}>
        <View style={styles.row}>
          <Text style={styles.details}>Date</Text>
          <Text style={styles.info} >{date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.details}>With</Text>
          <Text style={styles.info} >{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.details}>Notes</Text>
          {notes!==""?
          <Text style={styles.info} >{notes}</Text>: <Text style={styles.info} >-</Text>}
        </View> 


        </View>
        </View>



    </ScrollView>
)

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
      },

    title: {
        fontWeight: "bold",
        fontSize: 20,
    },

    row: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        paddingLeft:20
      },
    
    
      details: {
            width: "30%",
            color: "grey"
        },
            
      info: {
            fontWeight: "bold",
            width: '50%',
      },

      LeadsContainer:{
        flex:1,
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


});