import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class OR extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <View flexDirection='row'>
            <Text style={styles.text}>Report</Text>
            <TouchableOpacity style={styles.backicon}
              onPress={() => this.props.navigation.navigate('Setting')}>
              <Icon name='settings' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bckground}>
            <View style={styles.picture}>
              <Image
                style={styles.tinyLogo}
                source={require('./img/sample.jpg')}
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
            </View>

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
    flex: 1,
    marginLeft: '10%'
  },
  backicon: {
    marginTop: '3%',
    marginRight: '3%',
  },
  bckground: {
    marginTop: '13%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: "80%",
    height: "70%",
    alignSelf: 'center',
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
  }
})
