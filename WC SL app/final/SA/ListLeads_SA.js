import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity, ActivityIndicator, TextInput, Button
} from 'react-native';
import {auth, db, storage } from "../components/firebase";
import { FlatList } from 'react-native-gesture-handler';
// import { CSVLink } from "react-csv";
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeadList: [],
      isLoading: true,
      text: '',
      fileName: 'List of Leads'
    };
  }

  componentDidMount() {
    this.listofLeads();
  }

  listofLeads() {
    let listLeads = [];
    var employeeData = db.collection("leads")
    employeeData.onSnapshot((querySnapShot) => {
      listLeads = [];
      querySnapShot.forEach((doc) => {
        listLeads.push(doc.data());
      });
      this.setState({ LeadList: listLeads });
      this.setState({ isLoading: false })
    });
  }

  searchData(text) {
    if (text == "") {
      this.listofLeads();
      this.state.text = ''
      return;
    }
    const newData = this.state.LeadList.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });


    this.setState({
      LeadList: newData,
      text: text
    })
    this.state.LeadList = newData;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView style={{ flex: 1, padding: '10%', backgroundColor: 'white' }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
            horizontal={true}>
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
          </ScrollView>

          <ActivityIndicator style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }} />
          <Text style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }}>Fetching data...</Text>

        </ScrollView>
      )
    }
    return (
      <ScrollView style={{ flex: 1, padding: '10%', backgroundColor: 'white' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'row' }}
          horizontal={true}>
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
        </ScrollView>

        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.MainContainer}>
              <View style={styles.textInputBox}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.searchData(text)}
                  value={this.state.text}
                  underlineColorAndroid='transparent'
                  placeholder="Search Lead" />
                <Icon2 name="search" size={20} style={{ marginTop: 3, paddingRight: 5, color: 'lightgrey' }} />
              </View>
            </View>

            {/* <CSVLink data={this.state.LeadList} filename={"LeadData.csv"} style={{ fontSize: 10, alignSelf: 'flex-end', paddingBottom: 10, paddingRight: 5 }}>
              <Icon name="download" size={15} style={{ paddingLeft: 5 }} /></CSVLink> */}
            <Icon name="infocirlceo" size={15} style={{ marginTop: 12, paddingLeft: 5, marginRight: 5 }}
              onPress={() =>
                alert("Tap the lead's name in the table for more details")
              } />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1, color: "grey", fontSize: 10, fontStyle: 'italic', paddingBottom: 10, paddingLeft: 5 }}>*Tap the table cells for more actions</Text>
          </View>

          <View style={styles.header}>
            <View style={styles.firstCol}>
              <Text style={{ fontSize: 12 }}>Leads</Text>
            </View>
            <Text style={styles.SecThirdCol}>Status</Text>
          </View>

          <FlatList
            data={this.state.LeadList}
            renderItem={({ item }) => (
              <View style={styles.cardView}>
                <Text
                  style={styles.firstCol}
                  onPress={() => this.props.navigation.navigate('Lead Detail',
                    {
                      leadID: item.name
                    })}
                  numberOfLine={5}>
                  {item.name} ({item.company})
                </Text>
                <Text
                  style={styles.SecThirdCol}
                  onPress={() => this.props.navigation.navigate('Lead Detail',
                    {
                      leadID: item.name
                    })}>
                  {item.result}
                </Text>
              </View>
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
    justifyContent: 'space-around'
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
    justifyContent: 'space-around'
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
    width: '65%',
    padding: 5,
    justifyContent: 'space-between',
    textAlign: 'left',
    paddingLeft: 15,
    flexDirection: 'row'
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  textInput: {
    textAlign: 'center',
    padding: 5,
    flex: 1,
    fontSize: 12
  },
  textInputBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
    flexDirection: 'row'
  }
});
