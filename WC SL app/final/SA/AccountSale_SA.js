import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db, storage } from "../components/firebase";

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
      <ScrollView style={{ flex: 1, padding: '10%', backgroundColor: 'white' }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View>
              <View style={styles.Icon}>
                {item.photoURL != null ?
                  <Image style={styles.profileImg} source={item.photoURL} />
                  :
                  <Icon name="user" size={10} style={styles.profileImg} />
                }
                <View>
                  <Text style={styles.Username}>{item.username}</Text>
                  <Text style={styles.designation}>{item.name}</Text>
                </View>
              </View>

              <View>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.companyName}</Text>
                </View>

                <View style={styles.Address}>
                  <Text style={[styles.Text, { marginEnd: 10 }]}>Address</Text>
                  <Text style={styles.Info} numberOfLines={5}>{item.address}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
                  <Text style={styles.Info} numberOfLine={3}>{item.email}</Text>
                </View>
                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 8 }]}>Contact</Text>
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
    marginTop: 10,
    alignItems: 'baseline',
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5,
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
  },
});
