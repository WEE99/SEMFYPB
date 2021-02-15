import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';

export default class OR extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <Text style={styles.text}>Profile</Text>

          <View style={styles.nav}>
            <TouchableOpacity style={styles.roundButton} />
            <TouchableOpacity style={styles.roundButton2} />
          </View>

          <TouchableOpacity style={styles.bckground}>
            <View style={styles.picture}>
              <Image
                style={styles.tinyLogo}
                source={require('./img/backgroundImg.png')}
              />
            </View>

            <Text numberOfLines={2} style={styles.name}>Siti Nur Aliah</Text>
            <Text style={styles.username}>Kibboby</Text>
            <View style={styles.info}>
              <View style={styles.row}>
                <Icon name="call" size={30} color="#F8C018" />
                <Text style={styles.information}>010 203 6027</Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" size={30} color="#F8C018" />
                <Text numberOfLines={3} style={styles.information}>nrozunan@gmail.com</Text>
              </View>
              <View style={styles.row}>
                <Icon name="work" size={30} color="#F8C018" />
                <Text numberOfLines={2} style={styles.information}>Salesperson</Text>
              </View>
              <View style={styles.row}>
                <Icon name="business" size={30} color="#F8C018" />
                <Text numberOfLines={2} style={styles.information}>Google</Text>
              </View>
            </View>

          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: '8%' }}>
            <TouchableOpacity style={styles.roundButton3} >
              <Icon2 name="trash" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundButton3} >
              <Icon2 name="edit" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>

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
    marginBottom: '5%',
    marginTop: '3%',
  },
  bckground: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: "80%",
    height: "70%",
    alignSelf: 'center',
    marginTop:"5%",
    borderRadius: 10
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5
  },
  roundButton3: {
    width: 41,
    height: 41,
    borderRadius: 41,
    marginTop: "20%",
    backgroundColor: '#F8C018',
    alignSelf: 'flex-end',
    marginLeft: '2%'
  },
  picture: {
    width: '40%',
    height: '25%',
    alignSelf: 'center',
    borderColor: '#F8C018',
    borderWidth: 1,
    marginTop: '10%'
  },
  tinyLogo: {
    width: '90%',
    height: '105%',
    borderRadius: 5,
    margin: '5%'
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8C018',
    margin: '2%'
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginBottom: '5%'
  },
  info: {
    borderRadius: 40,
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    padding: '5%',
  },
  information: {
    marginLeft: '10%',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginBottom: '5%'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: "center",
    maxHeight: 11,
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
})
