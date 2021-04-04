import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeadList: [
        { Leads: 'Facebook', CompanyName: 'Facebook Co', Status: 'Won' },
        { Leads: 'Facebook', CompanyName: 'Facebook Co', Status: 'Lost' },
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
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>
              Salesperson Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Leads')}
            style={styles.cardActive}>
            <Text style={styles.activeTitle} numberOfLine={3}>
              Leads Report
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.firstCol}>Leads</Text>
            <Text style={styles.SecThirdCol}>Status</Text>
          </View>
          <FlatList
            data={this.state.LeadList}
            renderItem={({ item }) => (
              <View style={styles.cardView}>
                <Text
                  style={styles.firstCol}
                  onPress={() => this.props.navigation.navigate('Lead Detail')}
                  numberOfLine={5}>
                  {item.Leads} ({item.CompanyName})
                </Text>
                <Text
                  style={styles.SecThirdCol}
                  onPress={() => this.props.navigation.navigate('Lead Detail')}>
                  {item.Status}
                </Text>
              </View>
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
  container: {
    flex: 1,
    padding: '10%',
    marginTop: 20,
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
  },
  SecThirdCol: {
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
    width: '40%',
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
  },
});
