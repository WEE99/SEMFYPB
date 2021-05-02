import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator, Alert
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from '../CA/firebase';

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
      accountAdd: ''
    };
  }

  componentDidMount() {
    this.setState({ companyId: this.props.route.params.compId })

    let compData = [];
    let ID = this.props.route.params.compId;
    ID = ID.toString();

    var Data = db.collection("company").where("companyID", "==", ID)
    Data.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        compData.push(data);
        console.log(data)
      });
      this.setState({ CompanyData: compData });

    });

    let compAdmin = [];
    var Data = db.collection("users").where("companyID", "==", ID).where("role", "==", "Company Admin")
    Data.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        compAdmin.push(data);
      });
      this.setState({ AdminList: compAdmin });
    });


    let employee = [];
    var Data = db.collection("users").where("companyID", "==", ID).where("role", "==", "Salesperson")
    Data.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        employee.push(data);
      });
      this.setState({ EmployeeList: employee });
    });

    this.setState({ isLoading: false })
  }

  addSalespersonAccount() {
    alert("JOJIJOJO")
    Alert.alert('Add New Salesperson Account',
      'Do you want to add a new salesperson account for this company?',
      [
        {
          text: 'Yes',
          onPress: () => console.log('Ask me later pressed')
        },
        {
          text: 'Cancel',
          onPress: () => this.promptAccNo(),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
    )
  }

  promptAccNo() {
    <Prompt
      title="Enter number of account(s) to add"
      placeholder="1/2/3"
      defaultValue="1"
      visible={this.state.promptVisible}
      onCancel={() => this.setState({
        promptVisible: false,
        message: "You cancelled"
      })}
      onSubmit={(value) =>
        this.setState({
          promptVisible: false,
          message: `"${value}" is added`,
          accountAdd: value
        })
      } 
      />

      if(accountAdd != 0){
        this.updateData();
      }
  }

  updateData(){
    db.collection("company").where("companyID", "==", this.state.companyId)
      .update({
        SalespersonAccountLimit: this.state.accountAdd,
      })
    this.setState({
      accountAdd: "",
    })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>
        <View style={{ marginTop: 10 }}>
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
                    <View style={styles.Direction}>
                      <Text style={[styles.Text, { marginEnd: 10 }]}>Address</Text>
                      <Text style={styles.Info} numberOfLine={5}>
                        {item.address}
                      </Text>
                    </View>

                    <View style={styles.Direction}>
                      <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
                      <Text style={styles.Info} numberOfLine={2}>
                        {item.defaultEmail}
                      </Text>
                    </View>
                    <View style={styles.Direction}>
                      <Text style={[styles.Text, { marginEnd: 8 }]}>Contact</Text>
                      <Text style={styles.Info}>{item.contact}</Text>
                    </View>
                  </View>
                )}
              />

              <Text style={styles.CompanyName}>Admin</Text>
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
                          source={item.photoURL}
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


              <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
                <Icon name='adduser' size={20} style={{ alignItems: 'flex-end' }}
                  onPress={() =>
                    this.props.navigation.navigate('Add Account', {
                      designation: "Company Admin",
                      ID: this.state.companyId
                    })
                  } />
              </View>

              <Text style={styles.CompanyName}>Employee</Text>

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
                          source={item.photoURL}
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


              <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
                <Icon name='adduser' size={20} style={{ alignItems: 'flex-end' }}
                  onPress={() =>
                    // this.props.navigation.navigate('Add Account', {
                    //   designation: "Salesperson"
                    
                    // })
                    this.addSalespersonAccount()
                  } />
              </View>
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
    marginTop: 10,
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
  },
  Info: {
    width: 200,
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
