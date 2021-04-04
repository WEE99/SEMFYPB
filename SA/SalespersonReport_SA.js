import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SalespersonAccountSuperAdmin = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: '10%',
        marginTop: 20,
      }}>
      <View style={styles.Icon}>
        <Image style={styles.profileImg} source={require('../img/sample.jpg')} />
        <View>
          <Text style={styles.Username}>John David</Text>
          <Text style={styles.designation}>Salesperson</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Salesperson Detail')}
          style={styles.nav}>
          <Text style={styles.navTitle}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Salesperson Report')}
          style={styles.cardActive}>
          <Text style={styles.activeTitle}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Salesperson Leads')}
          style={styles.nav}>
          <Text style={styles.navTitle}>Leads</Text>
        </TouchableOpacity>
      </View>

<View style={styles.pieChartArea} />
          <View style={{ marginLeft: 5 , height:600, width: '90%'}}>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Salesperson </Text>
              <Text style={styles.Salesperson}>20</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Leads</Text>
              <Text style={styles.Leads}>20</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Won Leads</Text>
              <Text style={styles.Won}>80</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.Text} numberOfLine={2}>Total Number of Lost Leads</Text>
              <Text style={styles.Lost}>20</Text>
            </View>
          </View>

    </View>
  );
};

export default SalespersonAccountSuperAdmin;

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
    justifyContent: 'space-evenly'
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 16,
    marginBottom: 5,
    width: '65%',
  },
  Salesperson: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f4a460',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Leads: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#a0522d',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Won: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#32cd32',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  Lost: {
    marginTop: 2.5,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    width: '15%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    marginLeft: '15%'
  },
  CompanyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 10,
  },
});
