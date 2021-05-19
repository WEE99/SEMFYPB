import React, { useEffect, useState, Component, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import Settings from 'react-native-vector-icons/AntDesign';
import {auth, db, storage } from "./firebase";

export default class Account_CA extends Component {
  state = {
    AccountData: [],
    photo: '',
    username: '',
    role: '',
    address: '',
    companyname: '',
    contactNo: '',
    email: '',
    isLoading: true,
  }

  componentDidMount() {
    var user=auth.currentUser

    let a, b, c, d, e, f, g = "";
    var dashboardData = db.collection("users").where("UID", "==","molZQJeaw7SZPoGJsqlJuVpsZAR2")
    dashboardData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        a = doc.data().photoURL;
        b = doc.data().nickname;
        c = doc.data().role;
        d = doc.data().address;
        e = doc.data().companyName;
        f = doc.data().email;
        g = doc.data().phoneNumber;
      });
      this.setState({ photo: a });
      this.setState({ username: b });
      this.setState({ role: c });
      this.setState({ address: d });
      this.setState({ companyname: e });
      this.setState({ contactNo: g });
      this.setState({ email: f });
      this.setState({ isLoading: false })
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: '10%' }}>
          <ActivityIndicator />
          <Text style={{alignSelf:'center', margin: 10}}>Fetching data...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={{ flex: 1, padding: '5%', backgroundColor: 'white' , margin: 5}}>
        <Settings name='setting' size={25} style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('Account Settings')} />

        <View>
          <View style={styles.Icon}>
            <Image style={styles.profileImg} source={{uri:this.state.photo}} />
            <View>
              <Text style={styles.Username} numberOfLines={2}>{this.state.username}</Text>
              <Text style={styles.designation}>{this.state.role}</Text>
            </View>
          </View>

          <View>
            <View style={styles.Direction}>
              <Text style={styles.Text}>Company</Text>
              <Text style={styles.Info} numberOfLines={2}>{this.state.companyname}</Text>
            </View>

            <View style={styles.Direction}>
              <Text style={styles.Text}>Address</Text>
              <Text style={styles.Info} numberOfLines={5}>{this.state.address}</Text>
            </View>

            <View style={styles.Direction}>
              <Text style={styles.Text}>Email</Text>
              <Text style={styles.Info} numberOfLines={2}>{this.state.email}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text}>Contact</Text>
              <Text style={styles.Info}>{this.state.contactNo}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

    )
  }
};


const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
    marginStart: 5,
    height: 70,
    width: 70,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 11,
    paddingTop: 5
  },
  Username: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 20,
  },
  designation: {
    marginLeft: 15,
    fontSize: 12,
  },
  Icon: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5
  },
  Direction: {
    flexDirection: 'row',
    marginTop: 5,
  },
  Text: {
    width: '20%',
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5
  },
  Info: {
    width: '70%',
    marginTop: 2.5,
    marginStart: 15,
    fontSize: 14,
  },
  Address: {
    flexDirection: 'row',
    marginTop: 10,
  }
});
