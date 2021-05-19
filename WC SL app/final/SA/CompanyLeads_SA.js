import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {auth, db, storage } from "./firebase";
import Icon from 'react-native-vector-icons/AntDesign';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LeadList: [],
      companyId: "",
      isLoading: true
    };
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

    this.listofLeads();
  }

  listofLeads() {
    let listLeads = [];
    var employeeData = db.collection("leads").where("companyID", "==", this.props.route.params.compId)
    employeeData.onSnapshot((querySnapShot) => {
      listLeads = [];
      querySnapShot.forEach((doc) => {
        listLeads.push(doc.data());
      });
      this.setState({ LeadList: listLeads });
      this.setState({ isLoading: false })
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', margin: 5,backgroundColor: 'white' }}>
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
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Leads', {
                compId: this.state.companyId
              })}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={2}>
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

          {this.state.LeadList.length == 0 ?
            <Text style={{ alignSelf: 'center', fontStyle: 'italic', padding: '3%', color: 'grey' }}>No leads yet!</Text>
            :
            <View style={{marginTop: 10,}}>
              <Text style={{ color: "grey", fontSize: 10, fontStyle: 'italic', paddingLeft: 5 }}>*Tap the table cells for more actions</Text>
              <View style={{padding: 5}}>
                <View style={styles.header}>
                  <View style={styles.firstCol}>
                    <Text style={{ fontSize: 12 }}>Leads</Text>
                  </View>
                  <Text style={styles.SecCol}>Status</Text>
                </View>
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
    textAlign: 'left',
    paddingLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
});
