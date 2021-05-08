import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { auth, db, storage } from "../components/firebase";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      leads: 0,
      won: 0,
      lose: 0,
      salesInfo: [],
      salesId: ''
    }
  }

  componentDidMount() {
    let salesData = [];
    this.setState({ salesId: this.props.route.params.salesId })
    let salesID = this.props.route.params.salesId;
    salesID = salesID.toString();

    var employeeData = db.collection("users").where("UID", "==", salesID)
    employeeData.onSnapshot((querySnapShot) => {
      salesData = [];
      querySnapShot.forEach((doc) => {
        salesData.push(doc.data());
      });
      this.setState({ salesInfo: salesData });
    });
    this.totalNumberofWonLeads();
    this.totalNumberofLeads();
    this.totalNumberofLostLeads();
  }

  totalNumberofWonLeads() {
    db.collection("users").where("UID", "==", this.props.route.params.salesId)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          db.collection("leads").where("userId", "==", doc.id).where("result", "==", "Won")
            .onSnapshot((querySnapShot) => {
              this.setState({ won: querySnapShot.docs.length });
            })
        })
      })
  }

  totalNumberofLeads() {
    db.collection("users").where("UID", "==", this.props.route.params.salesId)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          db.collection("leads").where("userId", "==", doc.id)
            .onSnapshot((querySnapShot) => {
              this.setState({ leads: querySnapShot.docs.length });
            })
        })
      })
  }

  totalNumberofLostLeads() {
    db.collection("users").where("UID", "==", this.props.route.params.salesId)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          db.collection("leads").where("userId", "==", doc.id).where("result", "==", "Lose")
            .onSnapshot((querySnapShot) => {
              this.setState({ lose: querySnapShot.docs.length });
            })
        })
      })
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          padding: '10%',
          backgroundColor: 'white'
        }}>

        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View style={styles.Icon}>
              <Image style={styles.profileImg} source={item.photoURL} />
              <View>
                <Text style={styles.Username}>{item.nickname}</Text>
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
            style={styles.cardActive}>
            <Text style={styles.activeTitle}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Leads', {
              salesId: this.state.salesId
            })}
            style={styles.nav}>
            <Text style={styles.navTitle}>Leads</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.pieChartArea} /> */}
        <View style={{ marginLeft: 5, height: 600, width: '90%' }}>
          <View style={styles.Direction}>
            <Text style={styles.Text} numberOfLine={2}>Total Number of Leads</Text>
            <Text style={styles.Leads}>{this.state.leads}</Text>
          </View>
          <View style={styles.Direction}>
            <Text style={styles.Text} numberOfLine={2}>Total Number of Won Leads</Text>
            <Text style={styles.Won}>{this.state.won}</Text>
          </View>
          <View style={styles.Direction}>
            <Text style={styles.Text} numberOfLine={2}>Total Number of Lost Leads</Text>
            <Text style={styles.Lost}>{this.state.lose}</Text>
          </View>
        </View>

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
  pieChartArea: {
    height: '30%',
    borderColor: 1,
    borderWidth: 1,
    width: '60%',
    alignSelf: 'center',
  },
  Direction: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly'
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 16,
    marginBottom: 5,
    width: '65%',
  },
  Leads: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#a0522d',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Won: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#32cd32',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Lost: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  CompanyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 10,
  },
});
