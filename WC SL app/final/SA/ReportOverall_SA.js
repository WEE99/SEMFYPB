import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import {auth, db, storage } from "./firebase";

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      user: 0,
      ca: 0,
      sl: 0,
      leads: 0,
      won: 0,
      lose: 0,
      isLoading: true,
      LeadList: [],
      EmployeeList: [],
      CompanyList: [],
      fileName: ''
    }
  }

  componentDidMount() {
    this.totalNumberUser();
    this.totalNumberofCompanyAdmin();
    this.totalNumberofSalesperson();
    this.totalNumberofWonLeads();
    this.totalNumberofLeads();
    this.totalNumberofLostLeads();
    this.setState({ isLoading: false })

    this.listofLeads();
    this.listofCompany();
    this.listofSalesperson();
  }

  listofCompany() {
    let companyName = [];
    var employeeData = db.collection("company")
    employeeData.onSnapshot((querySnapShot) => {
      companyName = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        companyName.push(data);
      });
      this.setState({ CompanyList: companyName });
    });

  }

  listofSalesperson() {
    let listEmployee = [];
    var employeeData = db.collection("users").where("role", "==", "Salesperson")
    employeeData.onSnapshot((querySnapShot) => {
      listEmployee = [];
      querySnapShot.forEach((doc) => {
        listEmployee.push(doc.data());
      });
      this.setState({ EmployeeList: listEmployee });
    });
  }

  listofLeads() {
    let listLeads = [];
    var employeeData = db.collection("leads")
    employeeData.onSnapshot((querySnapShot) => {
      listLeads = [];
      querySnapShot.forEach((doc) => {
        listLeads.push(doc.data());
      });
      this.setState({ LeadList: listLeads });
    });
  }

  totalNumberUser() {
    var employeeData = db.collection("users").where("role","!=", "Super Admin");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ user: querySnapShot.docs.length });
    });
  }

  totalNumberofCompanyAdmin() {
    var employeeData = db.collection("users").where("role", "==", "Company Admin");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ ca: querySnapShot.docs.length });
    });
  }

  totalNumberofSalesperson() {
    var employeeData = db.collection("users").where("role", "==", "Salesperson");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ sl: querySnapShot.docs.length });
    });
  }

  totalNumberofWonLeads() {
    var employeeData = db.collection("leads").where("result", "==", "Won");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ won: querySnapShot.docs.length });
    });
  }

  totalNumberofLeads() {
    var employeeData = db.collection("leads");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ leads: querySnapShot.docs.length });
    });
  }

  totalNumberofLostLeads() {
    var employeeData = db.collection("leads").where("result", "==", "Lose");
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({ lose: querySnapShot.docs.length });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView style={{ flex: 1, padding: '5%',margin: 5, backgroundColor: 'white' }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
            horizontal={true}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Overall Report')}
              style={styles.cardActive, { justifyContent: 'center' }}>
              <Text style={styles.activeTitle, { textAlign: 'center' }} numberOfLine={3}>
                Overall Report
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('List of Company')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>
                Company Report
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('List of Salesperson')
              }
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>
                Salesperson Report
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('List of Leads')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>
                Leads Report
            </Text>
            </TouchableOpacity>
          </ScrollView>

          <ActivityIndicator />
          <Text style={{ alignSelf: 'center', paddingTop: 10 }}>Fetching data...</Text>

        </ScrollView>
      )
    }

    return (
      <ScrollView style={{ flex: 1, padding: '5%',margin: 5,backgroundColor: 'white' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
          horizontal={true}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Overall Report')}
            style={styles.cardActive}>
            <Text style={styles.activeTitle} numberOfLine={3}>
              Overall Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Company')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>
              Company Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List of Salesperson')
            }
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>
              Salesperson Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Leads')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>
              Leads Report
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView>
          {/* <View style={styles.pieChartArea} /> */}
          <View style={{ marginLeft: 5, height: 600, width: '90%' }}>
            <View style={styles.Direction}>
              <Text style={styles.Text}>Total Number of User</Text>
              <Text style={styles.User}>{this.state.user}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Company Admin
              </Text>
              <Text style={styles.Admin}>{this.state.ca}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Salesperson{' '}
              </Text>
              <Text style={styles.Salesperson}>{this.state.sl}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Leads
              </Text>
              <Text style={styles.Leads}>{this.state.leads}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Won Leads
              </Text>
              <Text style={styles.Won}>{this.state.won}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Lost Leads
              </Text>
              <Text style={styles.Lost}>{this.state.lose}</Text>
            </View>
          </View>
        </ScrollView>
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
    width: '23%',
    justifyContent: 'space-around'
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
    width: '23%',
    justifyContent: 'space-around'
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
    justifyContent: 'space-evenly',
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
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
  Salesperson: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f4a460',
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
  Leads: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#a0522d',
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
  Won: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#32cd32',
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
  Lost: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
  CompanyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 10,
  },
  User: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#dcdcdc',
    width: '25%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%',
  },
});
