import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { auth, db, storage } from '../CA/firebase';

export default class LeadsAccountInSuperAdmin extends Component {
  state = {
    AccountData: [],
    SalesData: [],
    salesID: ""
  }

  componentDidMount() {
    let accountData = [];
    let salesData = [];
    var salesId = "";
    let test = [];

    var dashboardData = db.collection("leads").where("name", "==", "Walson")
    dashboardData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        accountData.push(doc.data());
        var data = doc.data();
        salesId = data.userId;
      });
      this.setState({ AccountData: accountData });
      this.setState({ salesID: salesId });
    });

    var dashboardData = db.collection("users").where("name", "==", "Joo")
    dashboardData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        test.push(doc.data());
      });
      this.setState({ SalesData: test });
    });
    
    // db.collection("users").doc("Hu4WdS4HH4ugYVFmZexa").get()
    //   .then((doc) => {
    //     if (!doc.exists) return;
    //     console.log("Document data:", doc.data());
    //     salesData.push(doc.data());
    //   });
    // this.setState({ SalesData: salesData });

  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', marginTop: 10, backgroundColor: '#fff', }}>
        {/* <Text>{this.state.salesID}</Text> */}
        <FlatList
          data={this.state.AccountData}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.Name}>Lead's Detail</Text>

              <View>
                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 23 }]}>Name</Text>
                  <Text style={styles.Info} numberOfLine={3}>{item.name}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 23 }]}>Status</Text>
                  <Text style={styles.Info}>{item.result}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 28 }]}>Email</Text>
                  <Text style={styles.Info} numberOfLine={3} >{item.email}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.company}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 17 }]}>Interest</Text>
                  <Text style={styles.Info}>{item.interest}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text, { marginEnd: 4 }]}>Comment</Text>
                  <Text numberOfLines={5} style={styles.Info}>{item.comment}</Text>
                </View>

                {item.quoteSent == 'true' ?

                  <View style={styles.Direction}>
                    <Text style={[styles.Text, { marginEnd: 4 }]}>Quote Sent</Text>
                    <Text numberOfLines={5} style={styles.Info}>{item.quoteSent}</Text>
                  </View> : <View />
                }

              </View>

              <Text style={styles.Name}>Assigned Salesperson</Text>
              <FlatList
                data={this.state.SalesData}
                renderItem={({ item }) => (
                  <View>
                    <View style={styles.Direction}>
                      <Text style={[styles.Text, { marginEnd: 23 }]}>Name</Text>
                      <Text style={styles.Info}>{item.name}</Text>
                    </View>

                    <View style={styles.Direction}>
                      <Text style={[styles.Text, { marginEnd: 3 }]}>Company</Text>
                      <Text style={styles.Info}>{item.companyName}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  Name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
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
    marginBottom: 3,
  },
  Info: {
    width: 200,
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 14,
  },
});
