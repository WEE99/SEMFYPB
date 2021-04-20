import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db, storage } from '../CA/firebase';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeadList: [],
      salesInfo: [],
    };
  }

  componentDidMount() {
    let salesData = [];
    let leadData = []; 

    var employeeData = db.collection("users").where("name", "==", "Joo")
    employeeData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        salesData.push(doc.data());
      });
      this.setState({ salesInfo: salesData });
    });

    var leadList = db.collection("leads").where("userId", "==", "Hu4WdS4HH4ugYVFmZexa")
    leadList.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        leadData.push(doc.data());
      });
      this.setState({ LeadList: leadData });
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          padding: '5%',
          marginTop: 10,
          backgroundColor: 'white'
        }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View style={styles.Icon}>
              <Image style={styles.profileImg} source={require('./img/sample.jpg')} />
              <View>
                <Text style={styles.Username}>{item.nickname}</Text>
                <Text style={styles.designation}>{item.role}</Text>
              </View>
            </View>
          )}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Detail')}
            style={styles.nav}>
            <Text style={styles.navTitle}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Report')}
            style={styles.nav}>
            <Text style={styles.navTitle}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Salesperson Leads')}
            style={styles.cardActive}>
            <Text style={styles.activeTitle}>Leads</Text>
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
