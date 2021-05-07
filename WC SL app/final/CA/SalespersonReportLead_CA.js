import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {auth, db, storage} from "../components/firebase";

export default class ListofCompany extends Component {

    state = {
      LeadList: [
      ],
    }
  
    componentDidMount(){
      this.displayLeads();
    }


    displayLeads(){
      var user=auth.currentUser
      console.log(user)
      db.collection("users").where("UID", "==",user.uid)
      .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              db.collection("leads").where("companyID", "==", doc.id)
              .onSnapshot((querySnapshot) => {
                let leadsArr= [];
                  querySnapshot.forEach((docLeads) => {
                      let leads = docLeads.data();
                      leads.id = docLeads.id;
                      leadsArr.push(leads);
                      console.log(docLeads.id, " => ", docLeads.data());
                  });
                  this.setState({ LeadList: leadsArr });
                  console.log("LeadsArr:"+ JSON.stringify(leadsArr));
              })
              console.log(doc.id, " => ", doc.data());
          });
        })
    }
  render() {
    return (
      <View style={{ flex: 1, padding: "10%" }}>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Salespersons Profile')}
            style={styles.nav}>
            <Text style={styles.navTitle}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Salespersons Leads')}
            style={styles.active}>
            <Text style={styles.navTitle, styles.activeTitle}>Leads Assigned</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.firstCol}>Leads</Text>
            <Text style={styles.SecCol}>Status</Text>
          </View>
          <FlatList
            data={this.state.LeadList}
            renderItem={({ item }) =>
              <View style={styles.cardView}>
                <Text style={styles.firstCol}>{item.name}   ({item.company})</Text>
                <Text style={styles.SecCol}>{item.result}</Text>
              </View>
            }
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
    paddingTop: 5,
    width: '20%',
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
    width: '30%',
    textAlign: 'center',
    borderRadius: 5
  },
  activeTitle: {
    color: 'white',
    fontSize: 12
  },
  header: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'lightgrey'
  },
  SecCol: {
    fontSize: 12,
    width: '50%',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
    borderTopRightRadius: 5
  },
  firstCol: {
    fontSize: 12,
    width: '50%',
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15,
    borderTopLeftRadius: 5,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10
  },
  cardView: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    textAlign: 'center'
  }
});