import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import {auth, db, storage} from "../components/firebase";
import firebase from  "firebase/app";
export default class App extends Component {
    constructor(){
        super();
        this.state = {
            Name: '',
            password: '',
            role: '',
            email: '',
            contact: '',
    }
}
    

    _onPressCancel() {
        alert('Cancel')
    }

    _onPressSave() {
        alert('Save')
    }

    updateInputVal = (val, prop) =>{
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () =>{
        var user = auth.currentUser
        console.log(user)
        var config = {
            apiKey: "AIzaSyDTp7kOq7aNbIPnBDLFzLzlTd_YWGLTifQ",
            authDomain: "salescustom-55472.firebaseapp.com",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
        };
        var user2 = firebase.initializeApp(config,"secondary")
        db.collection("users").where("UID", "==", user.uid)
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{
                var companyId = doc.data().companyID
                var companyName = doc.data().companyName
                user2.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(result => {
                        db.collection('users').add({
                            UID: result.user.uid,
                            name: this.state.Name,
                            email: this.state.email,
                            phoneNumber: this.state.contact,
                            address: '',
                            admin: false,
                            companyID: companyId,
                            companyName: companyName,
                            photoURL: '',
                            role:this.state.role
                        })
                        .then(function(x){
                            var id;
                            id = x.id;
                            var update = db.collection("users").doc(id)
                            return update.update({
                                userId : id
                            })
                            
                        }).
                        catch((error)=>{
                            console.log("Error creating user id:", error)
                        })
                        user2.auth().signOut();
                        user2.delete()
                        .then(function() {
                            console.log("App deleted successfully");
                          })
                          .catch(function(error) {
                            console.log("Error deleting app:", error);
                          });
                    })
                    .then(()=>{
                        alert('Salesperson Added');
                    })
                    .catch((error)=>{
                        console.log("Error adding document:", error);
                        alert("Error! Could not add Salesperson");
                    });
                })
            })
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
