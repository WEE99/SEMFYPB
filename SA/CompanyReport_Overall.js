import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

export default class CR_O extends Component {
    render() {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('./backgroundImg.png')}
            style={styles.backgroundImage}>
            <Text style={styles.text}>Report</Text>
  
            <View style={styles.companyNameBox}>
              <Text numberOfLines={2} style={styles.companyName}>Google Co.</Text>
            </View>
            <TouchableOpacity style={styles.bckground}>
              <View style={styles.row}>
                <View style={styles.openLead}>
                  <Text></Text>
                </View>
                <View style={styles.openLead}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Open Leads</Text>
                </View>
              </View>
  
              <View style={styles.row2}>
                <View style={styles.wonLead}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Won Leads</Text>
                </View>
                <View style={styles.lostLead}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Lost Leads</Text>
                </View>
              </View>
            </TouchableOpacity>
  
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.companyAdminTitle}>Company Admin</Text>
                <TouchableOpacity style={styles.roundButton4} >
                  <Icon name="plus" size={25} color="black" style={styles.icon2} />
                </TouchableOpacity>
              </View>
  
              <View style={styles.companyAdminBox}>
                <View style={styles.salesNameBox}>
                  <View style={{
                    width: 34, height: 34, borderRadius: 34,
                    backgroundColor: 'black', marginLeft: '5%'
                  }}></View>
                  <View style={styles.companyName2}>
                    <Text numberOfLines={1}>Siti Nur Aliah</Text>
                    <Text numberOfLines={1} style={styles.compName2}>Google.co</Text>
                  </View>
                  <Icon2 name="arrow-right" size={15} color="black" />
                </View>
              </View>
            </View>
  
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.salespersonTitle}>Salesperson</Text>
                <TouchableOpacity style={styles.roundButton4} >
                  <Icon name="plus" size={25} color="black" style={styles.icon2} />
                </TouchableOpacity>
              </View>
  
              <View style={styles.companyAdminBox}>
                <View style={styles.salesNameBox}>
                  <View style={{
                    width: '15%', height: '100%', backgroundColor: 'black',
                    marginLeft: '5%'
                  }} />
                  <View style={{
                    width: 34, height: 34, borderRadius: 34,
                    backgroundColor: 'black', marginLeft: '5%'
                  }}></View>
                  <View style={styles.companyName3}>
                    <Text numberOfLines={1}>Siti Nur Aliah</Text>
                    <Text numberOfLines={1} style={styles.compName2}>Google.co</Text>
                  </View>
                  <Icon2 name="arrow-right" size={15} color="black" />
                </View>
              </View>
            </View>
  
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
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: '5%'
    },
    bckground: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      width: "80%",
      height: 315,
      alignSelf: 'center',
      marginTop: -10,
      zIndex: 0,
      borderRadius: 10
    },
    icon: {
      alignSelf: 'center',
      marginTop: 5
    },
    openLead: {
      width: '45%',
      height: 130,
      borderRadius: 10,
      backgroundColor: '#0055FF',
      justifyContent: 'center',
      alignContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '5%',
      padding: '2%',
      marginBottom: 10
    },
    row2: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: '2%',
      marginTop: -10,
      paddingBottom: -5
    },
    no: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      marginTop: 15
    },
    typeTitle: {
      color: 'white',
      fontSize: 18,
      width: '45%',
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: '5%'
    },
    wonLead: {
      width: '45%',
      height: 130,
      borderRadius: 10,
      backgroundColor: '#19CB37',
      justifyContent: 'center',
      alignContent: 'center'
    },
    lostLead: {
      width: '45%',
      height: 130,
      borderRadius: 10,
      backgroundColor: '#F62727',
      justifyContent: 'center',
      alignContent: 'center'
    },
    companyName: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    companyNameBox: {
      alignSelf: 'flex-start',
      marginLeft: '13%',
      borderRadius: 10,
      backgroundColor: '#F8C018',
      padding: '2%',
      zIndex: 1
    },
    roundButton3: {
      width: 41,
      height: 41,
      borderRadius: 41,
      marginTop: "3%",
      marginRight: '8%',
      backgroundColor: '#F8C018',
      alignSelf: 'flex-end'
    },
    roundButton4: {
      width: 30,
      height: 30,
      borderRadius: 30,
      marginLeft: 175,
      marginTop: "3%",
      marginRight: '8%',
      backgroundColor: '#F8C018',
      alignSelf: 'flex-end',
      zIndex: 1
    },
    icon: {
      alignSelf: 'center',
      marginTop: 5
    },
    companyAdminTitle: {
      color: '#F8C018',
      marginLeft: '15%',
      marginTop: '3%',
      fontSize: 16,
      zIndex: 1
    },
    salespersonTitle: {
      color: '#F8C018',
      marginLeft: '15%',
      marginTop: '3%',
      fontSize: 16,
      zIndex: 1,
      marginRight: '7%'
    },
    companyAdminBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginTop: -10,
      width: "80%",
      alignSelf: 'center',
      zIndex: 0,
      borderRadius: 10,
      paddingTop: 15,
      paddingBottom: 15
    },
    salesNameBox: {
      width: '90%',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    companyName2: {
      marginLeft: '5%',
      fontSize: 16,
      width: '73%'
    },
    compName2: {
      color: '#B56118',
    },
    icon2: {
      alignSelf: 'center',
      marginTop: 2
    },
    companyName3: {
      marginLeft: '5%',
      fontSize: 16,
      width: '52.5%'
    },
  })
  