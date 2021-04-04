import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,ImageBackground, ScrollView, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Pie from 'react-native-pie'
import { firebase } from './firebase';

export default class CR_O extends Component {

  constructor() {
    super();
    this.state = {
      UID: '',
      admin: false,
      companyName: '',
      email: '',
      name: '',
      nickname: '',
      password: '',
      phoneNumber: '',
      photoURL: '',
      role: ''
    };
  }

  alertAddNewUser(role){
    this.state.role = role;
    Alert.alert(
      "Confirmation",
      "Add A New " + role,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: 'Confirm', onPress: () => this.createNewUser() }
      ],
      { cancelable: false }
    );
  }

  createNewUser = (role) => {
    
    this.generate_random_username_password();
    var db = firebase.firestore();
    db.collection("users").add({
      nickname: this.state.nickname,
      password: this.state.password,
      UID: this.state.UID,
      admin: false,
      companyName: this.state.companyName,
      email: this.state.email,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      photoURL: this.state.photoURL,
      role: this.state.role
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  generate_random_username_password() {
    this.state.nickname = Math.random().toString(36).substr(2, 5);
    this.state.password = Math.random().toString(36).substr(2, 8);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./img/backgroundImg.png')}
          style={styles.backgroundImage}>
          <View flexDirection='row'>
            <Text style={styles.text}>Report</Text>
            <TouchableOpacity style={styles.backicon}
              onPress={() => this.props.navigation.navigate('TopNav1', { screen: 'Company' })}>
              <Icon3 name='arrow-back' size={30} color='white' />
            </TouchableOpacity>
          </View>

          <ScrollView marginTop='5%' paddingTop='5%' paddingBottom='5%'>
            <View style={styles.companyNameBox}>
              <Text numberOfLines={2} style={styles.companyName}>Google Co.</Text>
            </View>
            <View style={styles.bckground}>
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
                  onPress={() => this.props.navigation.navigate('TopNav2', { screen: 'Open' })}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Open Leads</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row2}>
                <TouchableOpacity style={styles.wonLead}
                  onPress={() => this.props.navigation.navigate('TopNav2', { screen: 'Won' })}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Won Leads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lostLead}
                  onPress={() => this.props.navigation.navigate('TopNav2', { screen: 'Lost' })}>
                  <Text style={styles.no}>40</Text>
                  <Text numberOfLines={2} style={styles.typeTitle}>Lost Leads</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.companyAdminTitle}>Company Admin</Text>
                <TouchableOpacity style={styles.roundButton4} onPress={() => this.alertAddNewUser('Company Admin')}>
                  <Icon name="plus" size={25} color="black" style={styles.icon2} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.companyAdminBox}
                onPress={() => this.props.navigation.navigate('CA Profile')}>
                <View style={styles.salesNameBox}>
                  <Image
                    style={{ width: 34, height: 34, borderRadius: 34, marginLeft: '5%', marginTop: '1%', marginBottom: '1%' }}
                    source={require('./img/sample.jpg')}
                  />
                  <View style={styles.companyName2}>
                    <Text numberOfLines={1}>Siti Nur Aliah</Text>
                    <Text numberOfLines={1} style={styles.compName2}>Google.co</Text>
                  </View>
                  <Icon2 name="arrow-right" size={15} color="black" />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.salespersonTitle}>Salesperson</Text>
                <TouchableOpacity style={styles.roundButton4} onPress={() => this.alertAddNewUser('Salesperson')}>
                  <Icon name="plus" size={25} color="black" style={styles.icon2} />
                </TouchableOpacity>
              </View>

              <View style={styles.companyAdminBox}>
                <TouchableOpacity style={styles.salesNameBox}
                  onPress={() => this.props.navigation.navigate('TopNav3')}>
                  <View style={{
                    marginLeft: '5%', marginTop: '1%', marginBottom: '1%'
                  }} >
                    <Pie
                      radius={20}
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
                  <Image
                    style={{ width: 34, height: 34, borderRadius: 34, marginLeft: '5%', marginTop: '1%', marginBottom: '1%' }}
                    source={require('./img/sample.jpg')}
                  />
                  <View style={styles.companyName3}>
                    <Text numberOfLines={1}>Siti Nur Aliah</Text>
                    <Text numberOfLines={1} style={styles.compName2}>Google.co</Text>
                  </View>
                  <Icon2 name="arrow-right" size={15} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.roundButton3} >
              <Icon name="filter" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>

          </ScrollView>

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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: "80%",
    alignSelf: 'center',
    zIndex: 0,
    marginTop: '-10%',
    borderRadius: 10,
    paddingBottom: '5%'
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
    zIndex: 1,
    marginBottom: '5%'
  },
  roundButton3: {
    width: 41,
    height: 41,
    borderRadius: 41,
    marginTop: "5%",
    marginRight: '5%',
    backgroundColor: '#F8C018',
    alignSelf: 'flex-end',
    marginBottom: '10%'
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
  },
  salesNameBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    paddingTop: 5,
    paddingBottom: 15
  },
  companyName2: {
    marginLeft: '5%',
    fontSize: 16,
    width: '70%'
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
    width: '49%'
  },
})
