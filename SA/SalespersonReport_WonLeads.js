import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground,
  TouchableNativeFeedback, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class CR_WL extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <Text style={styles.text}>Report</Text>
          <View style={styles.nav}>
            <TouchableOpacity style={styles.roundButton2} />
            <TouchableOpacity style={styles.roundButton} />
            <TouchableOpacity style={styles.roundButton2} />
          </View>

          <ScrollView style={styles.bckground}>
            <View style={styles.header}>
              <Text style={styles.ttleheader}>Name</Text>
              <Text style={styles.verticalLine}>|</Text>
              <View style={{ marginTop: "2%" }}>
                <Text style={styles.ttleheader2}>Quote</Text>
                <Text style={styles.ttleheader2}>Sent</Text>
              </View>
              <Text style={styles.verticalLine}>|</Text>
              <View style={{ marginTop: "2%" }}>
                <Text style={styles.ttleheader2}>Quote</Text>
                <Text style={styles.ttleheader2}>Agreed</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.box}
              onPress={() => this.props.navigation.navigate('Lead Profle')}>
              <View style={styles.info}>
                <View style={styles.custInfo}>
                  <Text numberOfLines={1} style={styles.custName}>Siti Nur Aliah</Text>
                  <Text numberOfLines={1} style={styles.custCompany}>Google Inc</Text>
                </View>
                <Text style={styles.verticalLine2}>|</Text>
                <Text numberOfLines={1} style={styles.custPrice}>RM1200</Text>
                <Text style={styles.verticalLine2}>|</Text>
                <Text numberOfLines={1} style={styles.custPrice}>RM1200</Text>
              </View>
              <View style={styles.info2}>
                <Text style={styles.textSLinCharge}>Person In Charge: </Text>
                <Text style={styles.SLinCharge}>Siti Nur Aliah</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

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
    marginTop: '3%',
    flex: 1
  },
  backicon: {
    marginTop: '3%',
    marginLeft: '3%',
    position: 'absolute'
  },
  bckground: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: "80%",
    height: "70%",
    alignSelf: 'center',
    marginTop: '13%',
    borderRadius: 10,
    marginBottom: '6%'
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#F8C018',
    borderRadius: 10,
    marginTop: 10,
    width: "91%",
    justifyContent: 'space-evenly'
  },
  ttleheader: {
    fontSize: 16,
    margin: "4%"
  },
  ttleheader2: {
    fontSize: 16,
    alignSelf: 'center',
    margin: -3
  },
  verticalLine: {
    color: "white",
    fontSize: 27,
    marginTop: 3
  },
  info: {
    flexDirection: 'row',
  },
  info2: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: "1%"
  },
  custInfo: {
    margin: 5,
    width: "34.5%"
  },
  custCompany: {
    color: "#B56118",
  },
  custPrice: {
    margin: 5,
    width: "24%",
    alignSelf: 'center',
    textAlign: 'center',
    color: "#B56118",
  },
  verticalLine2: {
    color: "#F8C018",
    fontSize: 30,
    marginTop: 2,
  },
  box: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    width: "91%",
    maxHeight: "50%",
    justifyContent: 'space-evenly'
  },
  SLinCharge: {
    fontSize: 12,
    color: "#B56118",
  },
  textSLinCharge: {
    fontSize: 12
  },
  roundButton3: {
    width: 41,
    height: 41,
    borderRadius: 41,
    marginTop: "3%",
    marginRight: '5%',
    marginBottom: '6%',
    backgroundColor: '#F8C018',
    alignSelf: 'flex-end',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5
  }
})