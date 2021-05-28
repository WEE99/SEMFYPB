import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {auth, db, storage } from "../components/firebase";

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      ca: 0,
      sl: 0,
      leads: 0,
      won: 0,
      lose: 0,
      companyId: "",
      isLoading: true,
    }
  }

  componentDidMount() {
    this.setState({ companyId: this.props.route.params.compId })
    let ID = this.props.route.params.compId;
    ID = ID.toString();

    let compData = [];
    var Data = db.collection("company").where("companyID", "==", ID)
    Data.onSnapshot((querySnapShot) => {
      compData = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        compData.push(data);
      });
      this.setState({ CompanyData: compData });
    });

    this.totalNumberofCompanyAdmin();
    this.totalNumberofSalesperson();
    this.totalNumberofWonLeads();
    this.totalNumberofLeads();
    this.totalNumberofLostLeads();
    this.setState({ isLoading: false })
  }

  totalNumberofCompanyAdmin() {
    var employeeData = db.collection("users").where("companyID", "==", this.props.route.params.compId).where("role", "==", "Company Admin");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ ca: querySnapShot.docs.length });
    });
  }

  totalNumberofSalesperson() {
    var employeeData = db.collection("users").where("role", "==", "Salesperson").where("companyID", "==", this.props.route.params.compId);
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ sl: querySnapShot.docs.length });
    });
  }

  totalNumberofWonLeads() {
    var employeeData = db.collection("leads").where("result", "==", "Won").where("companyID", "==", this.props.route.params.compId);
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ won: querySnapShot.docs.length });
    });
  }

  totalNumberofLeads() {
    var employeeData = db.collection("leads").where("companyID", "==", this.props.route.params.compId);
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ leads: querySnapShot.docs.length });
    });
  }

  totalNumberofLostLeads() {
    var employeeData = db.collection("leads").where("result", "==", "Lose").where("companyID", "==", this.props.route.params.compId);
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ lose: querySnapShot.docs.length });
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%',margin: 5, backgroundColor: 'white' }}>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Details', {
                compId: this.state.companyId
              })}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Detail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Report', {
                compId: this.state.companyId
              })}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={2}>
                Company Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Leads', {
                compId: this.state.companyId
              })}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Leads
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.CompanyData}
            renderItem={({ item }) => (
              <Text style={styles.CompanyName}>{item.companyName}</Text>
            )}
          />

          {/* <View style={styles.pieChartArea} /> */}
          <View style={{ marginLeft: 5, height: 600, width: '90%' }}>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Company Admin</Text>

              {this.state.isLoading ?
                <ActivityIndicator />
                :
                <Text style={styles.Admin}>{this.state.ca}</Text>
              }

            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Salesperson </Text>
              <Text style={styles.Salesperson}>{this.state.sl}</Text>
            </View>
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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  Admin: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ffdead',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Salesperson: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f4a460',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
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
    marginLeft: 15,
    marginTop: 10,
  },
});