import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView, ActivityIndicator
} from 'react-native';
import { Card } from 'react-native-paper';
import { auth, db, storage } from '../CA/firebase';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CompanyList: [],
      length: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.listofCompany();
  }

  listofCompany() {
    let companyName = [];
    var employeeData = db.collection("company")
    employeeData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        companyName.push(data);
      });
      this.setState({ CompanyList: companyName });
      this.setState({ isLoading: false })
    });

  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView style={{flex: 1, padding: '5%', marginTop: 10, backgroundColor: 'white' }}>
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

          <ActivityIndicator />
          <Text style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }}>Fetching data...</Text>

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
                  this.props.navigation.navigate('Company Details', {
                    compId: item.companyID
                  })
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
