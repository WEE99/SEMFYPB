import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import {auth, db, storage } from "../components/firebase";


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            Name: '',
            password: '',
            designation: '',
            email: '',
            contact: '',
            companyName: '',
            Username: '',
            address: '',
            companyId: '',
            caAccountLimit: ''
        }
    }

    componentDidMount() {
        this.setState({
            designation: this.props.route.params.designation,
            companyId: this.props.route.params.ID
        })
        this.retrieveCompanyData();
        this.generatePassword();
        this.generateUsername();
    }

    retrieveCompanyData() {
        var data = db.collection("company").where("companyID", "==", this.props.route.params.ID)
        data.onSnapshot((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                this.setState({ address: doc.data().address });
                this.setState({ companyId: doc.data().companyID });
                this.setState({ companyName: doc.data().companyName });
                this.setState({ email: doc.data().defaultEmail });
                this.setState({ contact: doc.data().contact });
                this.setState({ caAccountLimit: doc.data().CompanyAdminAccLimit })
            })
        })
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    generatePassword() {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let str = '';
        for (let i = 0; i < 10; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.setState({ password: str });
    }

    generateUsername() {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let str = '';
        for (let i = 0; i < 8; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.setState({ Username: str });
    }



    validation() {
        let isValid = true;
        let errorMessage = "Please enter: " + "\n";

        if (!this.state.Name) {
            isValid = false;
            errorMessage += "Name" + "\n"
        }

        if (!this.state.password) {
            isValid = false;
            errorMessage += "Password " + "\n"
        }

        if (this.state.password.length < 6) {
            isValid = false;
            errorMessage += "Password must contain at least 6 characters " + "\n"
        }

        if (!this.state.email) {
            isValid = false;
            errorMessage += "Email address" + "\n"
        }

        if (this.state.email) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isValid = false;
                errorMessage += "email address" + "\n"
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
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(result => {
                db.collection('users').doc(result.user.id).set({
                    UID: result.user.uid,
                    address: this.state.address,
                    admin: false,
                    companyID: this.state.companyId,
                    companyName: this.state.companyName,
                    email: this.state.email,
                    username: this.state.Username,
                    name: this.state.Name,
                    role: this.state.designation,
                    phoneNumber: this.state.contact,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/salesmanagement-karuna.appspot.com/o/blankProfilePic.jpg?alt=media&token=540c87af-8cfb-49d7-b8ef-f921a3e60634",
                })

                this.state.caAccountLimit = (+  this.state.caAccountLimit);
                let limit = Number(1 + this.state.caAccountLimit);
                db.collection("company").where("companyID", "==", this.state.companyId)
                    .onSnapshot((querySnapShot) => {
                        querySnapShot.forEach((doc) => {
                            db.collection("company").doc(doc.id)
                                .update({
                                    CompanyAdminAccLimit: limit,
                                })
                            this.setState({
                                accountAdd: "",
                            })
                        })
                    })
            })
            .catch((error => {
                alert(error)
            }))


        this.props.navigation.goBack()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, width: '50%', alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>*Automatically generated input boxes</Text>
                        <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>**The company's contact person's detail is automatically filled in the boxes.</Text>
                        <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}> Tap on the boxes to make changes</Text>
                    </View>

                    <Text style={styles.instruction}>*Username</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.Username}
                        onChangeText={(val) => this.updateInputVal(val, 'Username')}
                    />

                    <Text style={styles.instruction}>*Name</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.Name}
                        onChangeText={(val) => this.updateInputVal(val, 'Name')}
                    />

                    <Text style={styles.instruction}>*Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                    />

                    <Text style={styles.instruction}>**Contact</Text>
                    <TextInput
                        type="text"
                        style={styles.input}
                        value={this.state.contact}
                        onChangeText={(val) => this.updateInputVal(val, 'contact')}
                    />

                    <Text style={styles.instruction}>**Email</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                    />

                    <Text style={styles.instruction}>Designation</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        value={this.state.designation}
                        onChangeText={(val) => this.updateInputVal(val, 'role')}
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
