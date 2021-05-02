import React, { Component } from 'react';
import {
  Text, View, StyleSheet, FlatList, ActivityIndicator,ScrollView, TouchableOpacity, Image
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from '../CA/firebase';

export default class ListofEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmployeeList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.listofSalesperson();
  }

  listofSalesperson() {
    let listEmployee = [];
    var employeeData = db.collection("users").where("role", "==", "Salesperson")
    employeeData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        listEmployee.push(doc.data());
      });
      this.setState({ EmployeeList: listEmployee });
      this.setState({ isLoading: false })
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView style={{ flex: 1, padding: '5%', marginTop: 10, backgroundColor: 'white' }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
            horizontal={true}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Overall Report')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>
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
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={3}>
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
          <Text style={{ alignSelf: 'center', margin: 10 }}>Fetching data...</Text>

        </ScrollView>
      )
    }
    return (
      <ScrollView style={{ flex: 1, padding: '5%', marginTop: 10, backgroundColor: 'white' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
          horizontal={true}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Overall Report')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>
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
            style={styles.cardActive}>
            <Text style={styles.activeTitle} numberOfLine={3}>
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
          <FlatList
            data={this.state.EmployeeList}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate('Salesperson Detail', {
                    salesId: item.UID
                  })
                  
                }>
                <View style={styles.cardView}>
                  <Image style={styles.profileImg} source={item.photoURL} />
                  <View style={styles.texts}>
                    <Text style={styles.Name} numberOfLine={3}>{item.username}</Text>
                    <Text style={styles.CompanyName} numberOfLine={3}>({item.companyName})</Text>
                  </View>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
              </Card>
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
  displayContainer: {
    flexDirection: 'row',
  },
  profileImg: {
    borderRadius: 30,
    marginStart: 5,
    marginTop: 2.5,
    height: 40,
    width: 40,
    borderColor: 'black',
  },
  card: {
    margin: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    marginTop: 3,
    marginLeft: 10,
    flex: 1
  },
  Name: {
    fontSize: 14,
  },
  CompanyName: {
    fontSize: 14,
  },
  Designation: {
    fontSize: 12
  },
  icon: {
    marginTop: 5
  }
});
