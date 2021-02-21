import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default class OR extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <View flexDirection='row'>
            <Text style={styles.text}>Report</Text>
            <TouchableOpacity style={styles.backicon}
              onPress={() => this.props.navigation.navigate('Overall Company Report')}>
              <Icon2 name='arrow-back' size={30} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.bckground}>
            <View style={styles.row}>
              <View style={styles.openLead}>
                <Text></Text>
              </View>
              <TouchableOpacity style={styles.openLead}
                onPress={() => this.props.navigation.navigate('TopNav4', { screen: 'Open' })}>
                <Text style={styles.no}>40</Text>
                <Text numberOfLines={2} style={styles.typeTitle}>Open Leads</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row2}>
              <TouchableOpacity style={styles.wonLead}
                onPress={() => this.props.navigation.navigate('TopNav4', { screen: 'Open' })}>
                <Text style={styles.no}>40</Text>
                <Text numberOfLines={2} style={styles.typeTitle}>Won Leads</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lostLead}
                onPress={() => this.props.navigation.navigate('TopNav4', { screen: 'Open' })}>
                <Text style={styles.no}>40</Text>
                <Text numberOfLines={2} style={styles.typeTitle}>Lost Leads</Text>
              </TouchableOpacity>
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
    flex: 1
  },
  backicon: {
    marginTop: '3%',
    marginLeft: '3%',
    position: 'absolute'
  },
  bckground: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: "80%",
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    paddingBottom: '5%',
    marginTop: '13%'
  },
  roundButton3: {
    width: 41,
    height: 41,
    borderRadius: 41,
    marginTop: "53%",
    marginRight: '2%',
    backgroundColor: '#F8C018',
    alignSelf: 'flex-end',
    marginRight: '5%'
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
})
