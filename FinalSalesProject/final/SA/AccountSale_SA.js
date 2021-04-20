import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db, storage } from '../CA/firebase';

export default class a extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesInfo: [],
    };
  }

  componentDidMount() {
    this.info();
  }

  info() {
    db.collection("users").doc("Hu4WdS4HH4ugYVFmZexa").get()
      .then((doc) => {
        if (!doc.exists) return;
        console.log("Document data:", doc.data());
        salesData.push(doc.data());
      });
    this.setState({ salesInfo: salesData });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '10%', marginTop: 20 }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View>
              <View style={styles.Icon}>
                <Image
                  style={styles.profileImg}
                  source={require('./img/sample.jpg')}
                />
                <View>
                  <Text style={styles.Username}>{item.nickname}</Text>
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
