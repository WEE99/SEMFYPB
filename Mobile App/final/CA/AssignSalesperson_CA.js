import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/entypo';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,TextInput } from 'react-native';
import { auth, db, storage } from "../components/firebase";
import ModalSelector from 'react-native-modal-selector'

export default class Touchables extends Component {
  constructor(){
  super();
    this.state = {
      textInputValueDepartment: '',
      textInputValueSalesperson: '',
      textInputValueSalesperson2: '',
      salesID1: '',
      salesID2: '',
      Data: [],
    }
  }

  _onPressCancelButton() {
    alert('Cancel Salesperson')
  }

  _onPressAddButton() {
    alert('Add Salesperson')
  }

  _onPressConfirmButton() {
    alert('Confirm Assigned')
  }

  componentDidMount(){
    this.getSalesperson();
  }

  getSalesperson(){
    let data = [];
    let index=0;
    var user=auth.currentUser
    console.log(user)
    db.collection("users").where("UID", "==",user.uid)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("users").where("role","==","Salesperson").where("companyID", "==", doc.id)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  data.push({"uid":doc.id, "label":doc.data().name, "index": index++});
                });
                this.setState({ Data: data });
            })
        });
      })
  }

  assignSalesperson = (salesID1, textInputValueSalesperson)=> {
      var user=auth.currentUser
      db.collection("users").where("UID", "==",user.uid)
      .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection("leads").where("companyID", "==", doc.id)
            .get()
            .then(function(querySnapshot){
              querySnapshot.forEach((function(doc) {
                doc.ref.update({userId: salesID1.toString()});
                doc.ref.update({salesperson: textInputValueSalesperson.toString()});
              }))
              
            })
            .catch((error) => {
              console.log("Error adding document:", error);
              alert("Error! Could not assign Salesperson");
            });
          });
        })
  }

  assignSalesperson2 = (salesID2, textInputValueSalesperson2)=> {
    var user=auth.currentUser
    db.collection("users").where("UID", "==",user.uid)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("leads").where("companyID", "==", doc.id)
          .get()
          .then(function(querySnapshot){
            querySnapshot.forEach((function(doc) {
              doc.ref.update({userId2: salesID2.toString()});
              doc.ref.update({salesperson2: textInputValueSalesperson2.toString()});
              }))
          })
          .catch((error) => {
            console.log("Error adding document:", error);
            alert("Error! Could not assign Salesperson 2");
          });
        });
      })
}

assignDepartment = (textInputValueDepartment)=> {
  var user=auth.currentUser
  db.collection("users").where("UID", "==",user.uid)
  .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("leads").where("companyID", "==", doc.id)
        .get()
        .then(function(querySnapshot){
          querySnapshot.forEach((function(doc) {
            doc.ref.update({interest: textInputValueDepartment.toString()});           
          }))
        })
        .catch((error) => {
          console.log("Error adding document:", error);
          alert("Error! Could not assign Salesperson");
        });
      });
    })
}



  render() {
    let index = 0;
    const departmentData = [
      { key: index++, section: true, label: 'Department' },
      { key: index++, label: 'Human Resources' },
      { key: index++, label: 'Marketing' },
      { key: index++, label: 'IT' },
      { key: index++, label: 'Design' },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Department</Text>

        <View style={styles.dropdowndepartment}>
          <ModalSelector
            data={departmentData}
            initValue="Select a department"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => { this.setState({ textInputValueDepartment: option.label }) }}>

            <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Select a Department"
                        value={this.state.textInputValueDepartment} />

          </ModalSelector>
        </View>
        <View style={styles.salesrow}>
          <Text style={styles.text}>Salesperson </Text>
        </View>
        <View style={styles.dropdownsalesperson}>
          <ModalSelector
            data={this.state.Data}
            initValue="Select a Salesperson"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => { this.setState({  textInputValueSalesperson: option.label, salesID1: option.uid}) }}>

            <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Select a Salesperson"
                        value={this.state.textInputValueSalesperson} />

          </ModalSelector>
        </View>

        <View style={styles.salesrow}>
          <Text style={styles.text}>Salesperson </Text>
          <Text style={styles.text}>2 </Text>
        </View>
        <View style={styles.dropdownsalespersonextra}>
          <ModalSelector
            data={this.state.Data}
            initValue="Select a Salesperson"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => { this.setState({ textInputValueSalesperson2: option.label, salesID2:option.uid }) }}>

            <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        editable={false}
                        placeholder="Select something yummy!"
                        value={this.state.textInputValueSalesperson2} />

          </ModalSelector>

          <TouchableOpacity>
            <Icon name="remove" size={39} color="red" onPress={this._onPressCancelButton} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.AddButton}
            onPress={this._onPressAddButton}
          //disabled={!this.state.isFormValid}
          >
            <Text style={styles.Add}>+ SALES PERSON</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              style={styles.ConfirmButton}
              onPress={() => this.props.navigation.navigate('Dashboard', this.assignSalesperson(this.state.salesID1, this.state.textInputValueSalesperson), this.assignSalesperson2(this.state.salesID2, this.state.textInputValueSalesperson2), this.assignDepartment(this.state.textInputValueDepartment))}
            //disabled={!this.state.isFormValid}
            >
              <Text style={styles.Confirm}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10%',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  dropdowndepartment: {
    marginTop: 10,
    zIndex: 1000,
  },

  salesrow: {
    flexDirection: "row",
    marginTop: 10,
  },

  dropdownsalesperson: {
    marginTop: 10,
    zIndex: 999,
  },

  dropdownsalespersonextra: {
    marginTop: 10,
    flexDirection: "row",
    zIndex: 900,
  },

  AddButton: {
    backgroundColor: "black",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    width: "50%",
  },

  Add: {
    color: "white",
    fontWeight: "bold",
  },

  text: {
    color: "black",
    fontWeight: "bold",
  },

  ConfirmButton: {
    backgroundColor: "black",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
  },

  Confirm: {
    color: "white",
    fontWeight: "bold",
  },
});
