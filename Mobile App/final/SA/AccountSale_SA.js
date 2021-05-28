import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db, storage } from "../components/firebase";

export default class a extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesInfo: [],
      UID: ''
    };
  }

  componentDidMount() {
    let UID = this.props.route.params.salesID;
    this.setState({UID: UID})
    let accountData = []

    var dashboardData = db.collection("users").where("UID", "==", UID)
    dashboardData.onSnapshot((querySnapShot) => {
      accountData = [];
      querySnapShot.forEach((doc) => {
        accountData.push(doc.data());
      });
      this.setState({ salesInfo: accountData });
    });
  }


  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', margin: 5,backgroundColor: 'white' }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View>
              <View style={styles.Icon}>
                {item.photoURL != null ?
                  <Image style={styles.profileImg} source={{uri:item.photoURL}} />
                  :
                  <Icon name="user" size={10} style={styles.profileImg} />
                }
                <View>
                  <Text style={styles.Username}>{item.name}</Text>
                  <Text style={styles.designation}>{item.role}</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.companyName}</Text>
                </View>

                <View style={styles.Address}>
                  <Text style={[styles.Text]}>Address</Text>
                  <Text style={styles.Info} numberOfLines={5}>{item.address}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text]}>Email</Text>
                  <Text style={styles.Info} numberOfLine={3}>{item.email}</Text>
                </View>
                <View style={styles.Direction}>
                  <Text style={[styles.Text]}>Contact</Text>
                  <Text style={styles.Info}>{item.phoneNumber}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
    marginStart: 10,
    marginTop: 2.5,
    height: 70,
    width: 70,
    borderColor: 'black',
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
    // marginTop: 10,
    alignItems: 'baseline',
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5,
    width: '30%'
  },
  Info: {
    width: '50%',
    marginTop: 2.5,
    marginStart: 5,
    fontSize: 14,
  },
  Address: {
    flexDirection: 'row',
    marginTop: 10,
  },
});