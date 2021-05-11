import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import {auth, db, storage } from "../components/firebase";
import Icon from 'react-native-vector-icons/AntDesign';

export default class LeadsAccountInSuperAdmin extends Component {
  state = {
    AccountData: [],
    SalesData: [],
    leadsID: '',
    salesName: '',
    salesCompany: ''
  }

  componentDidMount() {
    let accountData = [];

    this.setState({
      leadsID: this.props.route.params.leadID
    })

    let sales = ''
    db.collection("leads").where("name", "==", this.props.route.params.leadID)
      .onSnapshot((querySnapShot) => {
        accountData = [];
        querySnapShot.forEach((doc) => {
          accountData.push(doc.data());
          sales = doc.data().userId;

          db.collection("users").doc(sales).get()
            .then((doc) => {
              this.setState({
                salesName: doc.data().username,
                salesCompany: doc.data().companyName,
              })
            })
        })
        this.setState({ AccountData: accountData });
      })

  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '10%', backgroundColor: '#fff', }}>
        <FlatList
          data={this.state.AccountData}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.Name}>Lead's Detail</Text>

              <View>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Name</Text>
                  <Text style={styles.Info} numberOfLine={3}>{item.name}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Status</Text>
                  <Text style={styles.Info}>{item.result}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Email</Text>
                  <Text style={styles.Info} numberOfLine={3} >{item.email}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.company}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Interest</Text>
                  <Text style={styles.Info}>{item.interest}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Comment</Text>
                  <Text numberOfLines={5} style={styles.Info}>{item.comment}</Text>
                </View>

                {item.quote != '' ?
                  <View>
                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Quote Sent</Text>
                      <Text numberOfLines={5} style={styles.Info}>RM {item.quote}</Text>

                    </View>

                    {item.quoteAgreed != '' ?

                      <View style={styles.Direction}>
                        <Text style={styles.Text}>Quote Sent</Text>
                        <Text numberOfLines={5} style={styles.Info}>RM {item.quoteAgreed}</Text>
                      </View>

                      : <View />
                    }
                  </View> : <View />
                }
                <View />


              </View>

              <Text style={styles.Name}>Assigned Salesperson</Text>
              <View>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Name</Text>
                  <Text style={styles.Info}>{this.state.salesName}</Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{this.state.salesCompany}</Text>
                </View>
              </View>
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
    width: '20%',
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 3,
  },
  Info: {
    width: '50%',
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 14,
  },
});
