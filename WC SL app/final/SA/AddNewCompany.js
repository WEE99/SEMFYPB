import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import { auth, db, storage } from "../components/firebase";


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            CompanyAdminAccLimit: 0,
            SalespersonAccLimit: 0,
            address: '',
            companyName: '',
            contact: '',
            defaultEmail: ''
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    validation() {
        let isValid = true;
        let errorMessage = "Please enter: " + "\n";

        if (!this.state.companyName) {
            isValid = false;
            errorMessage += "Company Name" + "\n"
        }

        if (!this.state.address) {
            isValid = false;
            errorMessage += "Company Address " + "\n"
        }


        if (!this.state.defaultEmail) {
            isValid = false;
            errorMessage += "Email address" + "\n"
        }

        if (this.state.defaultEmail) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.defaultEmail)) {
                isValid = false;
                errorMessage += "Valid email address" + "\n"
            }
        }

        if (!this.state.contact) {
            isValid = false;
            errorMessage += "Phone number" + "\n"
        }

        if (this.state.contact) {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(this.state.contact)) {
                isValid = false;
                errorMessage += "Valid phone number" + "\n"
            }
            else if (this.state.contact.length != 10) {
                isValid = false;
                errorMessage += "Valid phone number" + "\n"
            }
        }

        if (isValid)
            this.registerUser();
        else
            alert(errorMessage);
    }

    registerUser() {
        db.collection("company").add({
            companyName: this.state.companyName,
            address: this.state.address,
            defaultEmail: this.state.defaultEmail,
            contact: this.state.contact,
            SalespersonAccLimit: this.state.SalespersonAccLimit,
            CompanyAdminAccLimit: this.state.CompanyAdminAccLimit,
        })
        this.setState({
            companyName: "",
            address: "",
            defaultEmail: "",
            contact: "",
        })

        let id = ''
        db.collection("company").where("companyName", "==", this.state.companyName)
            .onSnapshot((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    id = doc.id;
                    db.collection("company").doc(doc.id)
                        .update({
                            companyID: doc.id,
                        })
                })
            })

        this.props.navigation.goBack()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.instruction}>Company Name</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.companyName}
                        onChangeText={(val) => this.updateInputVal(val, 'companyName')}
                    />

                    <Text style={styles.instruction}>Address</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.address}
                        onChangeText={(val) => this.updateInputVal(val, 'address')}
                    />

                    <Text style={styles.instruction}>Contact Number</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.contact}
                        onChangeText={(val) => this.updateInputVal(val, 'contact')}
                    />

                    <Text style={styles.instruction}>Email</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        value={this.state.defaultEmail}
                        onChangeText={(val) => this.updateInputVal(val, 'defaultEmail')}
                    />

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.ButtonContent}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => this.validation()}
                        >
                            <Text style={styles.ButtonContent}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10%'
    },

    instruction: {
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },

    input: {
        backgroundColor: "lightgrey",
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 20,
    },

    row: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },

    Button: {
        backgroundColor: "black",
        padding: 10,
        width: 130,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },

    ButtonContent: {
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
    },

});
