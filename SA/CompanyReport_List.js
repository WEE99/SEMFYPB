import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView
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

          <ScrollView style={styles.bckground}>
            <Text style={styles.subTitle}>Per Company Performance</Text>
              <TouchableOpacity style={styles.companyNameBox}
              onPress={() => this.props.navigation.navigate('Overall Company Report')}>
                <View style={{
                  width: '20%', height: '90%', backgroundColor: 'black',
                  marginLeft: '5%' , marginTop: '9%', marginBottom: '9%'
                }} />
                <Text style={styles.companyName}>Google.co</Text>
                <Icon2 name="arrow-right" size={15} color="black" />
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
  },
  bckground: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: "80%",
    height: "70%",
    alignSelf: 'center',
    marginTop: '13%',
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
    marginTop: "11%",
    backgroundColor: '#F8C018',
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: '6%'
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5
  },
  companyNameBox: {
    width: '85%',
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  companyName: {
    color: '#B56118',
    marginLeft: '5%',
    fontSize: 16,
    width: '58%'
  }
})
