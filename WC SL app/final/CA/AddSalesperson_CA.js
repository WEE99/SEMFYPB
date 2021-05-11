import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import { auth, firebase } from "../components/firebase";
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            Name: '',
            password: '',
            designation: '',
            email: '',
            contact: '',
            compID: '',
            compName: ''
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () => {
        let cID, cName = ''
        var user = auth.currentUser
        var userData = db.collection("users").where("UID", "==", user.uid)
        userData.onSnapshot((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                cID = doc.data().companyID
                cName = doc.data().c
            });
            this.setState({ compID: cID });
            this.setState({ compName: cName });
        });

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(result => {
                db.collection('users').doc(result.user.id).set({
                    UID: result.user.uid,
                    username: this.state.Name,
                    email: this.state.email,
                    designation: this.state.designation,
                    phoneNumber: this.state.contact,
                    address: '',
                    admin: false,
                    companyID: this.state.compID,
                    companyName: this.state.compName,
                    photoURL: ''
                })
            })
            .catch((error => {
                alert(error)
            }))

        this.props.navigation.goBack()

        // var db = firebase.firestore();
        // db.collection("users")
        //     .add({
        //         name: this.state.Name,
        //         password: this.state.password,
        //         role: this.state.role,
        //         email: this.state.email,
        //         contact: this.state.contact
        //     })
        //     .then(function (x) {
        //         var id;
        //         id = x.id;
        //         var update = db.collection("users").doc(id)
        //         return update.update({
        //             docId: id
        //         })
        //             .then(() => {
        //                 alert('Salesperson Added');
        //             })
        //     })
        //     .catch((error) => {
        //         console.log("Error adding document:", error);
        //         alert("Error! Could not add Salesperson");
        //     });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.instruction}>Name</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        onChangeText={(val) => this.updateInputVal(val, 'Name')}
                    />

                    <Text style={styles.instruction}>Password</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        secureTextEntry={true}
                    />

                    <Text style={styles.instruction}>Contact</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        onChangeText={(val) => this.updateInputVal(val, 'contact')}
                    />

                    <Text style={styles.instruction}>Email</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                    />

                    <Text style={styles.instruction}>Designation</Text>
                    <TextInput
                        //secureTextEntry={true} 
                        style={styles.input}
                        onChangeText={(val) => this.updateInputVal(val, 'role')}
                    />


                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.Button}
                            //onPress={this._onPressLoginButton}
                            //disabled={!this.state.isFormValid}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.ButtonContent}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.Button}
                            //onPress={this._onPressLoginButton}
                            //disabled={!this.state.isFormValid}
                            onPress={() => this.registerUser()}
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
        padding: "10%",
        //alignItems: 'center',
        //justifyContent: 'center',
    },

    instruction: {
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },

    input: {
        backgroundColor: "lightgrey",
        //width:'100%',
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
