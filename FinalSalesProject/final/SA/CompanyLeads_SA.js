import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { auth, db, storage } from '../CA/firebase';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LeadList: [],
    };
  }

  componentDidMount() {
    this.listofLeads();
  }

  listofLeads() {
    let listLeads = [];
    var employeeData = db.collection("leads").where("companyID", "==", " V4d1aKlbbQa9HXMPX6A1")
    employeeData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        listLeads.push(doc.data());
      });
      this.setState({ LeadList: listLeads });
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', backgroundColor: 'white'}}>
        <View style={{marginTop: 10}}>
          <Text style={styles.CompanyName}>ABC Company</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Details')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Detail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Report')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Leads')}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={2}>
                Company Leads
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Text style={styles.firstCol}>Leads</Text>
            <Text style={styles.SecCol}>Remarks</Text>
          </View>
          <FlatList
            data={this.state.LeadList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Lead Detail')}>
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
    width: '96.5%',
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
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
  },
  firstCol: {
    fontSize: 12,
    width: '70%',
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
  },
});
