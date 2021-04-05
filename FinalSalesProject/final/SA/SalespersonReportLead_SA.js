import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SalespersonAccountSuperAdmin = () => {

    this.state = {
      LeadList: [
        { Leads: 'Facebook', Company: 'Facebook Co', Status: 'Won' },
        { Leads: 'Facebook', Company: 'Facebook Co', Status: 'Lost' },
      ],
    };
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
                    {item.Leads} ({item.Company}) 
                  </Text>
                  <Text style={styles.SecCol}>{item.Status}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

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
