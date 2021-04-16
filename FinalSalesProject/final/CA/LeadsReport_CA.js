import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {auth, db, storage} from "./firebase";

export default class ListofCompany extends Component {
  state = {
    LeadList: [],
  }
  

  componentDidMount(){
    this.displayLeads();
  }

  displayLeads(){
    let leadList = [];
    var dashboardData = db.collection("leads").where("adminID", "==", "HiVB7rApJqMSbGfLTPEbtVVdvXc2");
    dashboardData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        leadList.push(doc.data());
      });
      this.setState({ LeadList : leadList});
    });
  }


  render() {
    return (
      <View style={{ flex: 1, padding: 5 }}>

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