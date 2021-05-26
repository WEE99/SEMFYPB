import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
//import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
import TodoItem from '../components/TodoItem.js';
import AddTodo from '../components/AddTodo.js';
import { Divider } from 'react-native-elements';
import { auth, db, storage } from "../components/firebase";
export default class App extends Component {
  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>

          <Text style={styles.title}>LEAD'S DETAIL</Text>

          <View style={styles.row}>
            <Text style={styles.details}>Name</Text>
            <Text style={styles.info}>{this.props.route.params.paramName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Email</Text>
            <Text style={styles.info}>{this.props.route.params.paramEmail}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Contact</Text>
            <Text style={styles.info}>{this.props.route.params.paramContact}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Company</Text>
            <Text style={styles.info}>{this.props.route.params.paramCompany}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Interest</Text>
            <Text style={styles.info}>{this.props.route.params.paramInterest}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.details}>Comment</Text>
            <Text style={styles.info}>{this.props.route.params.paramComment}</Text>
          </View>
        </ScrollView>
        <ScrollView>
        <Divider style={{ backgroundColor: 'black', marginBottom:20 }} />
          <View style={{ marginBottom:130}}>
            <TouchableOpacity style={styles.WonButton} onPress={() => this.props.navigation.navigate('Assign Salesperson')}>
              <Text style={{ color: 'white' }}>ASSIGN SALESPERSON</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10%',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    //justifyContent: 'space-between',
  },

  WonButton: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  LoseButton: {
    backgroundColor: "red",
    marginLeft: 10,
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttoncontent: {
    borderWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },

  buttoncontent2: {
    borderWidth: 1,
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  details: {
    width: "30%",
    color: "grey"
    //fontWeight:"bold",
  },

  info: {
    fontWeight: "bold",
    width: '75%',
    //borderWidth:1,
  },

  border: {
    marginTop: 10,
    borderWidth: 1,
    padding: '3%',
  },

  bordertext: {
    fontWeight: "bold",
  },

  //inputadd:{
  //marginTop:5,
  //padding:5,
  //backgroundColor:"lightgrey",
  //borderTopLeftRadius: 5,
  //borderTopRightRadius: 5,
  //borderBottomLeftRadius: 5,
  //borderBottomRightRadius: 5,
  //},

  //CreateButton:{
  //backgroundColor:"black",
  //marginTop:10,
  //alignItems:"center",
  //padding:5,
  //borderTopLeftRadius: 5,
  //borderTopRightRadius: 5,
  //borderBottomLeftRadius: 5,
  //borderBottomRightRadius: 5,
  //},

  title2: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
  },


  list: {
    marginTop: 20,
  },
});
