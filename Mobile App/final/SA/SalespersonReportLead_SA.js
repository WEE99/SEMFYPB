import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {auth, db, storage } from "../components/firebase";

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeadList: [],
      salesInfo: [],
      salesId: ''
    };
  }

  componentDidMount() {
    let salesData = [];
    let leadData = [];

    this.setState({ salesId: this.props.route.params.salesId })
    let salesID = this.props.route.params.salesId;
    salesID = salesID.toString();

    db.collection("users").where("UID", "==", salesID)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          db.collection("leads").where("userId", "==", doc.id)
            .onSnapshot((querySnapShot) => {
              leadData = [];
              querySnapShot.forEach((document) => {
                leadData.push(document.data());
              })
              this.setState({ LeadList: leadData });
            })
        })
      })

    var employeeData = db.collection("users").where("UID", "==", salesID)
    employeeData.onSnapshot((querySnapShot) => {
      salesData = [];
      querySnapShot.forEach((doc) => {
        salesData.push(doc.data());
      });
      this.setState({ salesInfo: salesData });
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          padding: '5%',
          margin: 5,
          backgroundColor: 'white'
        }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View style={styles.Icon}>
              {item.photoURL != ''? 
                <Image style={styles.profileImg} source={{uri:item.photoURL}} />
                :
                <Icon name='user' size={15} style={styles.profileImg}/>
               }
              <View>
                <Text style={styles.Username}>{item.name}</Text>
                <Text style={styles.designation}>{item.role}</Text>
              </View>
            </View>
          )}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Detail', {
              salesId: this.state.salesId
            })}
            style={styles.nav}>
            <Text style={styles.navTitle}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Report', {
              salesId: this.state.salesId
            })}
            style={styles.nav}>
            <Text style={styles.navTitle}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Leads', {
              salesId: this.state.salesId
            })}
            style={styles.cardActive}>
            <Text style={styles.activeTitle}>Leads</Text>
          </TouchableOpacity>
        </View>



        {this.state.LeadList.length == 0 ?
          <View>
            <Text style={{ alignSelf: 'center', fontStyle: 'italic', padding: '3%', color: 'grey' }}>No leads yet!</Text>
          </View>
          :
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "grey", fontSize: 10, fontStyle: 'italic', paddingLeft: 5 }}>*Tap the table cells for more actions</Text>
            <View style={styles.header}>
              <View style={styles.firstCol}>
                <Text style={{ fontSize: 12 }}>Leads</Text>
              </View>
              <Text style={styles.SecCol}>Status</Text>
            </View>

            <View>
              <FlatList
                data={this.state.LeadList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Lead Detail',
                      {
                        leadID: item.name
                      })}>
                    <View style={styles.cardView}>
                      <Text style={styles.firstCol} numberOfLine={5}>
                        {item.name} ({item.company})
                  </Text>
                      <Text style={styles.SecCol}>{item.result}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        }
      </ScrollView>
    );
  }
};

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
  nav: {
    margin: 5,
    backgroundColor: 'lightgrey',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    width: 88,
  },
  navTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  cardActive: {
    margin: 5,
    backgroundColor: 'black',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    width: 88,
  },
  activeTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  header: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },
  SecCol: {
    fontSize: 12,
    width: '35%',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
  },
  firstCol: {
    fontSize: 12,
    width: '65%',
    padding: 5,
    justifyContent: 'space-between',
    textAlign: 'left',
    paddingLeft: 15,
    flexDirection: 'row'
  },
  CompanyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 10,
  },
  cardView: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    textAlign: 'center',
  }
});
