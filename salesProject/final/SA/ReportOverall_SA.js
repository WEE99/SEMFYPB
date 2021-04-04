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

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, padding: '10%', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
        </View>

        <ScrollView>
          <View style={styles.pieChartArea} />
          <View style={{ marginLeft: 5, height: 600, width: '90%' }}>
            <View style={styles.Direction}>
              <Text style={styles.Text}>Total Number of User</Text>
              <Text style={styles.User}>100</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Company Admin
              </Text>
              <Text style={styles.Admin}>80</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Salesperson{' '}
              </Text>
              <Text style={styles.Salesperson}>20</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Leads
              </Text>
              <Text style={styles.Leads}>20</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Won Leads
              </Text>
              <Text style={styles.Won}>80</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>
                Total Number of Lost Leads
              </Text>
              <Text style={styles.Lost}>20</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
