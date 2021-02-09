import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

export default class CR_L extends Component {
    render() {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('./img/backgroundImg.png')}
            style={styles.backgroundImage}>
            <Text style={styles.text}>Report</Text>
            <View style={styles.nav}>
            <TouchableOpacity style={styles.roundButton2} 
              onPress={() => this.props.navigation.navigate('Report')}/>
              <TouchableOpacity style={styles.roundButton} 
              onPress={() => this.props.navigation.navigate('Company List')}/>
              <TouchableOpacity style={styles.roundButton2} 
              onPress={() => this.props.navigation.navigate('Salesperson List')}/>
            </View>
  
            <TouchableOpacity style={styles.bckground}>
              <Text style={styles.subTitle}>Per Company Performance</Text>
              <View style={styles.companyNameBox}>
                <View style={{width: '20%', height: '80%', backgroundColor: 'black',
                 marginLeft: '5%'}}/>
                 <Text style={styles.companyName}>Google.co</Text>
                 <Icon2 name="arrow-right" size={15} color="black"/>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.roundButton3} >
              <Icon name="filter" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>
  
          </ImageBackground>
        </View>
      );
    }
  }
  
  let styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover"
    },
    nav: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: "center",
      maxHeight: 11,
      marginTop: '5%',
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: '3%',
    },
    roundButton: {
      width: 11,
      height: 11,
      borderRadius: 11,
      margin: "4%",
      backgroundColor: '#F8C018',
      alignSelf: 'center',
    },
    roundButton2: {
      width: 11,
      height: 11,
      borderRadius: 11,
      margin: "4%",
      backgroundColor: 'white',
      alignSelf: 'center'
    },
    bckground: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      width: "80%",
      height: "70%",
      alignSelf: 'center',
      marginTop: '5%',
      borderRadius: 10
    },
    subTitle: {
      fontSize: 18,
      color: '#F8C018',
      textAlign: 'center',
      marginTop: '3%',
      marginBottom: '5%'
    },
    roundButton3: {
      width: 41,
      height: 41,
      borderRadius: 41,
      marginTop: "15%",
      backgroundColor: '#F8C018',
      alignSelf: 'flex-end',
      marginRight: '5%'
    },
    icon: {
      alignSelf: 'center',
      marginTop: 5
    },
    companyNameBox: {
      width: '85%',
      height: '13%',
      backgroundColor: 'white',
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    companyName: {
      color: '#B56118',
      marginLeft: '5%',
      fontSize: 16,
      width: '58%'
    }
  })
  