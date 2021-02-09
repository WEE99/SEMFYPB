import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View>
      <Text style={styles.title}>Notification</Text>
      </View>
<ScrollView>
      <View style={styles.notification}>
        <Text style={styles.notificationContent}>New Leads had been added sdadasdasda da dada sdas dasdas sdada asd adadad sAS sASa s sS  aadasd</Text>
        <Text style={styles.notificationtime}>1:45 pm</Text>
      </View>

      <View style={styles.notification}>
        <Text style={styles.notificationContent}>New Leads had been added sdadasdasda da dada sdas dasdas sdada asd adadad sAS sASa s sS  aadasd</Text>
        <Text style={styles.notificationtime}>1:45 pm</Text>
      </View>
</ScrollView>
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

  notification:{
    marginTop:10,
    borderWidth:1,
    borderRadius:10,
    borderColor:"orange",
    padding:5,
    width:"100%"
  },

  notificationContent:{
    textAlign:"left",
    fontWeight:"bold"
  },

  notificationtime:{
    fontWeight:"bold",
    color:"orange",
    alignSelf:"flex-end",
  },
});
