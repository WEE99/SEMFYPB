import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth, db, storage } from "./firebase";

export default class a extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesInfo: [],
      salesId: ''
    };
  }

  componentDidMount() {
    let salesData = [];
    this.setState({ salesId: this.props.route.params.salesId })
    let salesID = this.props.route.params.salesId;
    salesID = salesID.toString();

    var employeeData = db.collection("users").where("UID", "==", salesID)
    employeeData.onSnapshot((querySnapShot) => {
      salesData = [];
      querySnapShot.forEach((doc) => {
        salesData.push(doc.data());
      });
      this.setState({ salesInfo: salesData });
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1, padding: '5%',margin:5, backgroundColor: 'white'
        }}>
        <FlatList
          data={this.state.salesInfo}
          renderItem={({ item }) => (
            <View>
              <View style={styles.Icon}>
                {item.photoURL != ''? 
                <Image style={styles.profileImg} source={{uri:item.photoURL}} />
                :
                <Icon name='user' size={15} style={styles.profileImg}/>
               }
                
                <View>
                  <Text style={styles.Username}>{item.name}</Text>
                  <Text style={styles.designation}>{item.role}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Salesperson Detail', {
                    salesId: this.state.salesId
                  })}
                  style={styles.cardActive}>
                  <Text style={styles.activeTitle}>Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Salesperson Report', {
                    salesId: this.state.salesId
                  })}
                  style={styles.nav}>
                  <Text style={styles.navTitle}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Salesperson Leads', {
                    salesId: this.state.salesId
                  })}
                  style={styles.nav}>
                  <Text style={styles.navTitle}>Leads</Text>
                </TouchableOpacity>
              </View>


              <View style={{marginTop: 10}}>
                <View style={styles.Direction}>
                  <Text style={styles.Text}>Company</Text>
                  <Text style={styles.Info}>{item.companyName}</Text>
                </View>

                <View style={styles.Address}>
                  <Text style={[styles.Text]}>Address</Text>
                  <Text style={styles.Info} numberOfLines={5}>
                    {item.address}
                  </Text>
                </View>

                <View style={styles.Direction}>
                  <Text style={[styles.Text]}>Email</Text>
                  <Text style={styles.Info} numberOfLine={3}>
                    {item.email}
                  </Text>
                </View>
                <View style={styles.Direction}>
                  <Text style={[styles.Text]}>Contact</Text>
                  <Text style={styles.Info}>{item.phoneNumber}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
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
  Direction: {
    flexDirection: 'row',
    // marginTop: 10,
    alignItems: 'baseline',
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5,
    width: '20%'
  },
  Info: {
    width: '50%',
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 14,
  },
  Address: {
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
});

