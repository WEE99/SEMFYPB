import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from '../CA/firebase';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AdminList: [
        { AdminName: 'John David', Designation: 'Salesperson' },
        { AdminName: 'John David', Designation: 'Salesperson' },
      ],
      EmployeeList: [
        { EmployeeName: 'John David', Designation: 'Salesperson' },
        { EmployeeName: 'John David', Designation: 'Salesperson' },
      ],
    };
  }


  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>
        <View style={{marginTop: 10}}>
          <Text style={styles.CompanyName}>ABC Company</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Company Details')}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={2}>
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
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={2}>
                Company Leads
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.Direction}>
              <Text style={[styles.Text, { marginEnd: 10 }]}>Address</Text>
              <Text style={styles.Info} numberOfLine={5}>
                123, Lot 1234, Lorong ABC, Jalan ABC, 93350 Kuching, Sarawak
              </Text>
            </View>

            <View style={styles.Direction}>
              <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
              <Text style={styles.Info} numberOfLine={2}>
                abc@gmail.com
              </Text>
            </View>
            <View style={styles.Direction}>
              <Text style={[styles.Text, { marginEnd: 8 }]}>Address</Text>
              <Text style={styles.Info}>+6 012 345 6789</Text>
            </View>
          </View>

          <Text style={styles.CompanyName}>Admin</Text>
          <FlatList
            data={this.state.AdminList}
            renderItem={({ item }) => (
              <Card
                style={styles.card2}
                onPress={() =>
                  this.props.navigation.navigate('Company Admin Account Detail')
                }>
                <View style={styles.cardView2}>
                  <Image
                    style={styles.profileImg}
                    source={require('./img/sample.jpg')}
                  />
                  <View style={styles.texts}>
                    <Text style={styles.AdminName}>{item.AdminName}</Text>
                    <Text style={styles.Designation}>{item.Designation}</Text>
                  </View>
                  <View style={{ paddingTop: 13 }}>
                    <Icon name="right" size={15} />
                  </View>
                </View>
              </Card>
            )}
          />

          <Text style={styles.CompanyName}>Employee</Text>
          <FlatList
            data={this.state.EmployeeList}
            renderItem={({ item }) => (
              <Card
                style={styles.card2}
                onPress={() =>
                  this.props.navigation.navigate('Salesperson Account Detail')
                }>
                <View style={styles.cardView2}>
                  <Image
                    style={styles.profileImg}
                    source={require('./img/sample.jpg')}
                  />
                  <View style={styles.texts}>
                    <Text style={styles.AdminName}>{item.EmployeeName}</Text>
                    <Text style={styles.Designation}>{item.Designation}</Text>
                  </View>
                  <View style={{ paddingTop: 13 }}>
                    <Icon name="right" size={15} />
                  </View>
                </View>
              </Card>
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
