import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';
import { auth, db, storage } from '../CA/firebase';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CompanyList: [],
      oj: []
    };
  }

  componentDidMount() { 
    this.listofCompany();
  }

  listofCompany() {
    let companyLeads = [];
    let c = [];
    var previousName = "";
    var employeeData = db.collection("users")
    employeeData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        var compName = data.companyName;
        companyLeads.push(companyName);
        // c.push(data.compName)
        // c.forEach((name, index) => {
        //   if(name == c.index)
        // })

      });
      this.setState({ CompanyList: companyLeads });
      this.setState({ oj: c });
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: '5%', marginTop: 10 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
          horizontal={true}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Overall Report')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>Overall Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Company')}
            style={styles.cardActive}>
            <Text style={styles.activeTitle} numberOfLine={3}>Company Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List of Salesperson')
            }
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>Salesperson Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Leads')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>Leads Report</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView>
          <FlatList
            data={this.state.CompanyList}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate('Company Details')
                }>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={styles.CompanyName} numberOfLine={3}>{item.companyName}</Text>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
              </Card>
            )}
          />


          <FlatList
            data={this.state.oj}
            renderItem={({ item }) => (
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={styles.CompanyName} numberOfLine={3}>{item.companyName}</Text>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
            )}
          />
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
  },
  activeTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  CompanyName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  card: {
    padding: 5,
    backgroundColor: 'lightgrey',
    margin: 5,
  },
  icon: {
    marginBottom: '20%'
  }
});
