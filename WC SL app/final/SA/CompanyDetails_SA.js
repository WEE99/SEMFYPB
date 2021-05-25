import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator, Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from "../components/firebase";
import { Tooltip } from 'react-native-elements';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AdminList: [],
      EmployeeList: [],
      companyId: "",
      CompanyData: [],
      isLoading: true,
      promptVisible: true,
      message: '',
      accountAdd: '',
      salesAccountNoLimit: 0,
      activeAdminAccount: 0,
      activeSalesAccount: 0
    };
  }

  componentDidMount() {
    this.setState({ companyId: this.props.route.params.compId })

    let compData = [];
    let ID = this.props.route.params.compId;
    ID = ID.toString();

    let compAdmin = [];
    let employee = [];
    let adminAccountNoDatabase = 0;
    let employeeAccountNoDabase = 0;

    var Data = db.collection("company").where("companyID", "==", ID)
    Data.onSnapshot((querySnapShot) => {
      compData = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        compData.push(data);
        console.log(data)
      });
      this.setState({ CompanyData: compData });

    });

    var Data = db.collection("users").where("companyID", "==", ID).where("role", "==", "Company Admin")
    Data.onSnapshot((querySnapShot) => {
      compAdmin = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        compAdmin.push(data);
        this.setState({ activeAdminAccount: querySnapShot.docs.length });
      });
      this.setState({ AdminList: compAdmin });
    });

    var Data = db.collection("users").where("companyID", "==", ID).where("role", "==", "Salesperson")
    Data.onSnapshot((querySnapShot) => {
      employee = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        employee.push(data);
        this.setState({ activeSalesAccount: querySnapShot.docs.length });
      });
      this.setState({ EmployeeList: employee });
    });


    var Data = db.collection("company").where("companyID", "==", ID)
    Data.onSnapshot((querySnapShot) => {
      adminAccountNoDatabase = 0;
      employeeAccountNoDabase = 0;
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        adminAccountNoDatabase = data.CompanyAdminAccLimit;
        employeeAccountNoDabase = data.SalespersonAccLimit;
      });
      this.setState({ admiAccountNoLimit: adminAccountNoDatabase });
      this.setState({ salesAccountNoLimit: employeeAccountNoDabase });
    });

    this.setState({ isLoading: false })
  }

  addSalespersonAccount() {
    this.updateData();
  }

  updateData() {
    this.state.accountAdd = 1;
    this.state.salesAccountNoLimit = (+ this.state.salesAccountNoLimit)
    db.collection("company").where("companyID", "==", this.state.companyId)
      .onSnapshot((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          db.collection("company").doc(doc.id)
            .update({
              SalespersonAccLimit: Number(this.state.accountAdd + this.state.salesAccountNoLimit),
            })
          this.setState({
            accountAdd: "",
          })
        })
      })

  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', margin: 5, backgroundColor: 'white' }}>
        <View style={{ paddingTop: 10, marginBottom: 5, height: '95%' }}>
          <FlatList
            data={this.state.CompanyData}
            renderItem={({ item }) => (
              <Text style={styles.CompanyName}>{item.companyName}</Text>
            )}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Details', {
                compId: this.state.companyId
              })}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={2}>
                Company Detail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Report', {
                compId: this.state.companyId
              })}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
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

          {this.state.isLoading != true ?
            <View>
              <FlatList
                data={this.state.CompanyData}
                renderItem={({ item }) => (
                  <View>
                    <Text style={styles.CompanyName}>{item.companyName}</Text>
                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Address</Text>
                      <Text style={styles.Info} numberOfLine={5}>
                        {item.address}
                      </Text>
                    </View>

                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Email</Text>
                      <Text style={styles.Info} numberOfLine={2}>
                        {item.defaultEmail}
                      </Text>
                    </View>
                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Contact</Text>
                      <Text style={styles.Info}>{item.contact}</Text>
                    </View>
                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Admin Account</Text>
                      <Text style={styles.Info}>{this.state.activeAdminAccount}</Text>
                    </View>
                    <View style={styles.Direction}>
                      <Text style={styles.Text}>Salesperson Account (Limit)</Text>
                      <Text style={styles.Info2}>{this.state.salesAccountNoLimit}</Text>

                      <Tooltip popover={
                        <Text style={{ padding: 5, color: 'white' }}>
                          Number of salesperson account(s) is limited to the shown number
                    </Text>} width={250} height={50}>
                        <Icon name="infocirlceo" size={15} style={{ marginTop: 5, paddingLeft: 5 }} />
                      </Tooltip>

                    </View>
                    <View style={styles.Direction} >
                      <Text style={styles.Text}>Salesperson Account (Active)</Text>
                      <Text style={styles.Info2}>{this.state.activeSalesAccount}</Text>
                      <Tooltip popover={
                        <Text style={{ padding: 5, color: 'white' }}>
                          Number of active account
                    </Text>} width={250} height={50}>
                        <Icon name="infocirlceo" size={15} style={{ marginTop: 5, paddingLeft: 5 }} />
                      </Tooltip>
                    </View>

                  </View>
                )}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.CompanyName}>Admin</Text>
                <View style={{ justifyContent: 'flex-end', marginTop: 5, flexDirection: 'row', alignSelf: 'flex-end', marginEnd: 7 }}>
                  <Icon name='adduser' size={20} style={{ alignItems: 'flex-end' }}
                    onPress={() =>
                      this.props.navigation.navigate('Add Account', {
                        designation: "Company Admin",
                        ID: this.state.companyId
                      })
                    } />
                  <Tooltip popover={
                    <Text style={{ padding: 5, color: 'white' }}>
                      Tap on the add icon to create a new company admin's account
                    </Text>} width={230} height={50}>
                    <Icon name="infocirlceo" size={15} style={{ marginTop: 3, paddingLeft: 5 }} />
                  </Tooltip>
                </View>
              </View>
              {this.state.AdminList.length == 0 ?
                <View>
                  <Text style={{ alignSelf: 'center', fontStyle: 'italic', padding: '3%', color: 'grey' }}>No admin yet!</Text>
                </View>
                :
                <FlatList
                  data={this.state.AdminList}
                  renderItem={({ item }) => (
                    <Card
                      style={styles.card2}
                      onPress={() =>
                        this.props.navigation.navigate('Company Admin Account Detail',
                          { companyAdminID: item.UID })
                      }>
                      <View style={styles.cardView2}>
                        <Image
                          style={styles.profileImg}
                          source={{ uri: item.photoURL }}
                        />
                        <View style={styles.texts}>
                          <Text style={styles.AdminName}>{item.name}</Text>
                          <Text style={styles.Designation}>{item.role}</Text>
                        </View>
                        <View style={{ paddingTop: 13 }}>
                          <Icon name="right" size={15} />
                        </View>
                      </View>
                    </Card>
                  )}
                />
              }

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.CompanyName}>Employee</Text>
                <View style={{ justifyContent: 'flex-end', marginTop: 5, flexDirection: 'row', alignSelf: 'flex-end', marginEnd: 7 }}>
                  <Icon name='adduser' size={20} style={{ alignItems: 'flex-end' }}
                    onPress={() =>
                      this.addSalespersonAccount()
                    } />

                  <Tooltip popover={
                    <Text style={{ padding: 5, color: 'white' }}>
                      Tap on the add icon to increase the salesperson's account limit
                    </Text>} width={230} height={50}>
                    <Icon name="infocirlceo" size={15} style={{ marginTop: 3, paddingLeft: 5 }} />
                  </Tooltip>

                </View>
              </View>

              {this.state.EmployeeList.length == 0 ?
                <View>
                  <Text style={{ alignSelf: 'center', fontStyle: 'italic', padding: '3%', color: 'grey' }}>No employee yet!</Text>
                </View>
                :
                <FlatList
                  data={this.state.EmployeeList}
                  renderItem={({ item }) => (
                    <Card
                      style={styles.card2}
                      onPress={() =>
                        this.props.navigation.navigate('Salesperson Account Detail',
                          { salesID: item.UID }
                        )
                      }>
                      <View style={styles.cardView2}>
                        <Image
                          style={styles.profileImg}
                          source={{ uri: item.photoURL }}
                        />
                        <View style={styles.texts}>
                          <Text style={styles.AdminName}>{item.name}</Text>
                          <Text style={styles.Designation}>{item.role}</Text>
                        </View>
                        <View style={{ paddingTop: 13 }}>
                          <Icon name="right" size={15} />
                        </View>
                      </View>
                    </Card>
                  )}
                />
              }
            </View>
            :

            <View>
              <ActivityIndicator />
              <Text style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }}>Fetching data...</Text>
            </View>
          }

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
    justifyContent: 'center'
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
    justifyContent: 'center'
  },
  activeTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  AdminName: {
    fontSize: 12,
    flex: 1,
  },
  card: {
    backgroundColor: 'lightgrey',
    margin: 5,
    padding: 10,
  },
  cardView1: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
  },
  CompanyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 15,
  },
  Direction: {
    flexDirection: 'row',
    marginTop: 10,
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
    marginStart: 35,
    fontSize: 14,
  },
  Info2: {
    width: '5%',
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 14,
  },
  profileImg: {
    borderRadius: 40,
    marginTop: 2.5,
    height: 35,
    width: 35,
    borderColor: 'black',
  },
  texts: {
    marginTop: 5,
    marginLeft: 10,
    flex: 1,
  },
  Designation: {
    fontSize: 10,
    paddingBottom: 3,
  },
  cardView2: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 5,
    marginEnd: 5,
    backgroundColor: 'lightgrey',
  },
  card2: {
    margin: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
});
