import React, { useEffect, useState, Component, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Settings from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from '../CA/firebase';
import { FlatList } from 'react-native-gesture-handler';
export default class Account_CA extends Component {
  state = {
    AccountData: []
  }

  componentDidMount() {
    let accountData = [];
    var dashboardData = db.collection("users").where("UID", "==", "molZQJeaw7SZPoGJsqlJuVpsZAR2")
    dashboardData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        accountData.push(doc.data());
      });
      this.setState({ AccountData: accountData });
    });
  }


  render() {
    return (
      <View style={{ flex: 1, padding: "10%", }}>

        <Settings name='setting' size={25} style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('Account Setting')} />
        <FlatList
          data={this.state.AccountData}
          renderItem={({ item }) => (
            <View>
              <View style={styles.Icon}>
                <Image style={styles.profileImg} source={item.photoURL} />
                <View>
                  <Text style={styles.Username}>{item.name}</Text>
                  <Text style={styles.designation}>{item.role}</Text>
                </View>
              </View>

              <View>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.companyName}</Text>
                </View>

                <View style={styles.Address}>
                  <Text style={[styles.Text, { marginEnd: 10 }]}>Address</Text>
                  <Text style={styles.Info}>{item.address}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
                  <Text style={styles.Info}>{item.email}</Text>
                </View>
                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 8 }]}>Contact</Text>
                  <Text style={styles.Info}>{item.phoneNumber}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

    )
  }
};


const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
    marginStart: 10,
    marginTop: 2.5,
    height: 70,
    width: 70,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 13,
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
  },
  Direction: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'baseline'
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5
  },
  Info: {
    width: 200,
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 14,
  },
  Address: {
    flexDirection: 'row',
    marginTop: 10,
  }
});
