import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { firebase } from './firebase';
import Pie from 'react-native-pie'

export default class OR extends Component {
  constructor() {
    super();
    this.state = {
      size: ''
    };
  }

  componentDidMount() {
    // this.load_data();
    // this.setState({
    //   size: 4
    // })
  }

  load_data() {
    var db = firebase.firestore();
    db.collection('leads').get().then(snap => {
      this.state.size = snap.size
    })
      .catch((error) => {
        console.error("Error reading document: ", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <Text style={styles.text}>Report</Text>

          <View style={styles.bckground}>
            <Text>{this.state.size} ffsvf</Text>
            <Text style={styles.subTitle}>Overall Performance</Text>
            <View style={styles.row}>
              <View>
                <Pie
                  radius={70}
                  sections={[
                    {
                      percentage: 30,
                      color: '#0055FF',
                    },
                    {
                      percentage: 30,
                      color: '#19CB37',
                    },
                    {
                      percentage: 40,
                      color: '#F62727',
                    },
                  ]}
                  strokeCap={'butt'}
                />
              </View>
              <TouchableOpacity style={styles.openLead}
                onPress={() => this.props.navigation.navigate('TopNav5', { screen: 'Open' })}>
                <Text style={styles.no}>40</Text>
                <Text numberOfLines={2} style={styles.typeTitle}>Open Leads</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row2}>
              <TouchableOpacity style={styles.wonLead}
                onPress={() => this.props.navigation.navigate('TopNav5', { screen: 'Won' })}>
                <Text style={styles.no}>40</Text>
                <Text numberOfLines={2} style={styles.typeTitle}>Won Leads</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lostLead}
                onPress={() => this.props.navigation.navigate('TopNav5', { screen: 'Lost' })}>
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
    alignSelf: 'center',
    borderRadius: 10,
    paddingBottom: '5%',
    marginTop: '13%'
  },
  subTitle: {
    fontSize: 18,
    color: '#F8C018',
    textAlign: 'center',
    marginTop: '3%'
  },
  roundButton3: {
    width: 41,
    height: 41,
    borderRadius: 41,
    marginTop: "45%",
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
