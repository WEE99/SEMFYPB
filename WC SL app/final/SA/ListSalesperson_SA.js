import React, { Component } from 'react';
import {
  Text, View, StyleSheet, FlatList, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { auth, db, storage } from "../components/firebase";
import { Tooltip } from 'react-native-elements';

export default class ListofEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmployeeList: [],
      isLoading: true,
      text: '',
      fileName: ''
    };
  }

  componentDidMount() {
    this.listofSalesperson();
  }

  listofSalesperson() {
    let listEmployee = [];
    var employeeData = db.collection("users").where("role", "==", "Salesperson")
    employeeData.onSnapshot((querySnapShot) => {
      listEmployee = [];
      querySnapShot.forEach((doc) => {
        listEmployee.push(doc.data());
      });
      this.setState({ EmployeeList: listEmployee });
      this.setState({ isLoading: false })
    });
  }

  searchData(text) {
    if (text == "") {
      this.listofSalesperson();
      this.state.text = ''
      return;
    }
    const newData = this.state.EmployeeList.filter(item => {
      const itemData = item.username.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });


    this.setState({
      EmployeeList: newData,
      text: text
    })
    this.state.EmployeeList = newData;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScrollView style={{ flex: 1, padding: '5%', margin: 5, backgroundColor: 'white' }}>
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
          </ScrollView>

          <ActivityIndicator style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }} />
          <Text style={{ alignSelf: 'center', margin: 10, paddingTop: 10 }}>Fetching data...</Text>

        </ScrollView>
      )
    }
    return (
      <ScrollView style={{ flex: 1, padding: '5%', margin: 5, backgroundColor: 'white' }}>
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
        </ScrollView>

        <View style={{ height: '93%', marginTop: 5, marginBottom: 15, flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.MainContainer}>
              <View style={styles.textInputBox}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.searchData(text)}
                  value={this.state.text}
                  underlineColorAndroid='transparent'
                  placeholder="Search Salesperson" />
                <Icon2 name="search" size={20} style={{ alignSelf: 'center', paddingRight: 5, color: 'lightgrey' }} />
              </View>
            </View>
            
            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <Tooltip popover={
                <Text style={{ padding: 5, color: 'white' }}>
                  Tap the salesperson's name for more details
                    </Text>} width={250} height={50}>
                <Icon name="infocirlceo" size={15} style={{ alignSelf: 'center', margin: 3 }} />
              </Tooltip>
            </TouchableOpacity>

          </View>

          <FlatList
            data={this.state.EmployeeList}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate('Salesperson Detail', {
                    salesId: item.UID
                  })

                }>
                <View style={styles.cardView}>
                  {item.photoURL != '' ?
                    <Image style={styles.profileImg} source={{ uri: item.photoURL }} />
                    :
                    <Icon name="user" size={15} style={styles.profileImg} />}

                  <View style={styles.texts}>
                    <Text style={styles.Name} numberOfLine={3}>{item.name}</Text>
                    <Text style={styles.CompanyName} numberOfLine={3}>({item.companyName})</Text>
                  </View>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
              </Card>
            )}
          />
        </View>
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
  icon: {
    marginTop: 5
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
