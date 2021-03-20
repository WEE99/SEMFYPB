import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ImageBackground } from 'react-native';
import { orange } from './TablesandTimeFormat';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundImg.png')} style={styles.bgimage}>
        <Text style={styles.title}>Notification</Text>
        <TouchableOpacity style={styles.backicon}
          onPress={() => navigation.navigate('dashboard')}>
          <Icon2 name='arrow-back' size={30} color='white' />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.notification}>
            <Text style={styles.notificationContent}>New Leads had been added </Text>
            <Text style={styles.notificationtime}>1:45 pm</Text>
          </View>

          <View style={styles.notification}>
            <Text style={styles.notificationContent}>New Leads had been added sdadasdasda da dada sdas dasdas sdada asd adadad sAS sASa s sS  aadasd</Text>
            <Text style={styles.notificationtime}>1:45 pm</Text>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'flex-start',
    // padding:"20%",
  },


  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    alignItems: "flex-start",
  },
  backicon: {
    marginTop: '3%',
    marginLeft: '3%',
    position: 'absolute'
  },

  notification: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: orange,
    padding: 5,
    width: 250
  },

  notificationContent: {
    textAlign: "left",
    color: "white",
    fontWeight: "bold"
  },

  notificationtime: {
    fontWeight: "bold",
    color: orange,
    alignSelf: "flex-end",
  },

  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "flex-start"
  },
});
