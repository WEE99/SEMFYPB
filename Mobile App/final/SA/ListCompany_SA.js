import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView, ActivityIndicator, TextInput
} from 'react-native';
import { Card } from 'react-native-paper';
import { auth, db, storage } from "../components/firebase";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Tooltip } from 'react-native-elements';

export default class ListofCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CompanyList: [],
      length: 0,
      isLoading: true,
      text: '',
      fileName: ''
    };
  }

  componentDidMount() {
    this.listofCompany();
  }

  listofCompany() {
    let companyName = [];
    var employeeData = db.collection("company")
    employeeData.onSnapshot((querySnapShot) => {
      companyName = [];
      querySnapShot.forEach((doc) => {
        var data = doc.data();
        companyName.push(data);
      });
      this.setState({ CompanyList: companyName });
      this.setState({ isLoading: false })
    });

  }

  searchData(text) {
    if (text == "") {
      this.listofCompany();
      this.state.text = ''
      return;
    }
    const newData = this.state.CompanyList.filter(item => {
      const itemData = item.companyName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });


    this.setState({
      CompanyLists: newData,
      text: text
    })
    this.state.CompanyList = newData;
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
              <Text style={styles.navTitle} numberOfLine={3}>Overall Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('List of Company')}
              style={styles.cardActive}>
              <Text style={styles.activeTitle} numberOfLine={3}>Company Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('List of Salesperson')
              }
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>Salesperson Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('List of Leads')}
              style={styles.nav}>
              <Text style={styles.navTitle} numberOfLine={3}>Leads Report</Text>
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
            <Text style={styles.navTitle} numberOfLine={3}>Overall Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Company')}
            style={styles.cardActive}>
            <Text style={styles.activeTitle} numberOfLine={3}>Company Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List of Salesperson')
            }
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>Salesperson Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List of Leads')}
            style={styles.nav}>
            <Text style={styles.navTitle} numberOfLine={3}>Leads Report</Text>
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
                  placeholder="Search Company" />
                <Icon2 name="search" size={20} style={{ alignSelf: 'center', paddingRight: 5, color: 'lightgrey' }} />
              </View>
            </View>

            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() =>
              this.props.navigation.navigate('Add Company')
            }>
              <Icon2 name="business" size={20} style={{ alignSelf: 'center' }} />
              <Icon2 name="add" size={15} style={{ alignSelf: 'center', marginLeft: -5 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf:'center'}}>
              <Tooltip popover={
                <Text style={{ padding: 5, color: 'white' }}>
                  Tap the business icon to register a new company
                    </Text>} width={250} height={50}>
                <Icon name="infocirlceo" size={15} style={{ alignSelf: 'center', margin: 3}} />
              </Tooltip>
            </TouchableOpacity>

          </View>
          <FlatList
            data={this.state.CompanyList}
            renderItem={({ item }) => (
              <Card
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate('Company Details', {
                    compId: item.companyID
                  })
                }>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center', alignItems: 'baseline'
                }}>
                  <Text style={styles.CompanyName} numberOfLine={3}>{item.companyName}</Text>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name="right" size={15} style={styles.icon} />
                  </View>
                </View>
              </Card>
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
  CompanyName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  card: {
    padding: 5,
    backgroundColor: 'lightgrey',
    margin: 5,
  },
  icon: {
    marginBottom: '20%'
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
