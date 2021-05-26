import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { ScrollView, State } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabRouter } from 'react-navigation';
import {auth, db, storage} from "../components/firebase";


export default class SalespersonReportProfile extends Component{
  state = 
  {
    Count: 0,
    won: 0,
    lose:0,
  };

  componentDidMount() {
    this.getTotalNumberofLeadsAssigned();
    this.TotalNumberofWonLeads();
    this.TotalNumberofLostLeads();
  }

  getTotalNumberofLeadsAssigned(){
    
    var employeeData = db.collection("leads").where("companyID", "==", this.props.route.params.paramId).where("userId", "==", this.props.route.params.paramUserID);
    employeeData.onSnapshot((querySnapShot) => {
      this.setState({Count:querySnapShot.docs.length});
    });
  }

  TotalNumberofWonLeads(){
  
    var employeeData = db.collection("leads").where("companyID", "==", this.props.route.params.paramId).where("result", "==", "Won").where("userId", "==", this.props.route.params.paramUserID);
    employeeData.onSnapshot((querySnapShot) => {
        this.setState({won:querySnapShot.docs.length});
      });
  }

  TotalNumberofLostLeads(){
    var employeeData = db.collection("leads").where("companyID", "==", this.props.route.params.paramId).where("result", "==", "Lose").where("userId", "==", this.props.route.params.paramUserID);
    employeeData.onSnapshot((querySnapShot) => {
        this.setState({lose:querySnapShot.docs.length});
      });
  }


  render(){
    return (
      <View style={{ flex: 1, padding: "10%" }}>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                 <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Salespersons Profile')}
                  style={styles.active}>
                  <Text style={styles.navTitle, styles.activeTitle}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Salespersons Leads',{paramsUserId2:this.props.route.params.paramUserID})}
                  style={styles.nav}>
                  <Text style={styles.navTitle}>Leads Assigned</Text>
                </TouchableOpacity>
              </View>


        <View style={styles.Icon}>
          <Icon
            name='user'
            size={45}
            style={styles.profileImg} />
          <View>
            <Text style={styles.Username}>{this.props.route.params.paramName}</Text>
            <Text style={styles.designation}>
              Salesperson
                    </Text>
          </View>
        </View>

        <View>
          <View style={styles.Direction}>
            <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
            <Text style={styles.Info}>{this.props.route.params.paramEmail}</Text>
          </View>
          <View style={styles.Direction}>
            <Text style={[styles.Text, { marginEnd: 8 }]}>Contact</Text>
            <Text style={styles.Info}>{this.props.route.params.paramContact}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>LEADS REPORT</Text>
            <View style={styles.Direction}>
              <Text style={styles.Text}>Total Number of Leads Assigned</Text>
              <Text style={styles.No}>{this.state.Count}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.WonLeadNo}>Total Number of Won Leads</Text>
              <Text style={styles.No}>{this.state.won}</Text>
            </View>
            <View style={styles.Direction}>
              <Text style={styles.LostLeadNo}>Total Number of Lost Leads</Text>
              <Text style={styles.No}>{this.state.lose}</Text>
            </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  nav: {
    margin: 5,
    backgroundColor: 'lightgrey',
    padding: 5,
    paddingTop: 5,
    width: '30%',
    textAlign: 'center',
    borderRadius: 5
  },
  navTitle: {
    fontSize: 12
  },
  active: {
    margin: 5,
    backgroundColor: 'black',
    padding: 5,
    paddingTop: 5,
    width: '20%',
    textAlign: 'center',
    borderRadius: 5
  },
  activeTitle: {
    color: 'white',
    fontSize: 12
  },
  profileImg: {
    borderRadius: 50,
    marginStart: 10,
    marginTop: 2.5,
    height: 55,
    width: 55,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 11,
    paddingTop: 2
  },
  Username: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 16,
  },
  designation: {
    marginLeft: 15,
    fontSize: 10,
  },
  Icon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  Direction: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'baseline',
  },
  Text: {
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5,
    fontSize: 12,
    color: 'grey'
  },
  Info: {
    width: 200,
    marginTop: 2.5,
    marginStart: 35,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 15
  },
  No:{
    //width: 200,
    marginTop: 2.5,
    marginStart: 25,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
    width: 80,
    textAlign: 'center',
    borderRadius: 5,
    padding: 5
  },
  WonLeadNo:{
    marginRight: 23,
    marginTop: 2.5,
    marginLeft: 15,
    fontSize: 14,
    marginBottom: 5,
    fontSize: 12,
    color: 'grey'
  },
  LostLeadNo:{
    marginRight: 24,
    marginTop: 2.5,
    marginLeft: 17,
    fontSize: 14,
    marginBottom: 5,
    fontSize: 12,
    color: 'grey'
  }
});