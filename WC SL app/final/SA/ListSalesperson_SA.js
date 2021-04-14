import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ListofEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmployeeList: [
        { Image: '', SalespersonName: 'John David', CompanyName: 'Facebook' },
        { Image: '', SalespersonName: 'John David', CompanyName: 'Facebook' },
      ],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, padding: '10%', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
        </View>
        
        <ScrollView>
          <FlatList
            data={this.state.EmployeeList}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate('Salesperson Detail')
                }>
                <View style={styles.cardView}>
                  <Image style={styles.profileImg} sourzce={require('../img/sample.jpg')} />
                  <View style={styles.texts}>
                    <Text style={styles.Name} numberOfLine={3}>{item.SalespersonName}</Text>
                    <Text style={styles.CompanyName} numberOfLine={3}>({item.CompanyName})</Text>
                  </View>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
              </Card>
            )}
          />
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
  icon:{
    marginBottom: 15  
  }
});
