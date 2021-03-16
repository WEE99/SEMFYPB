import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import {auth} from "./firebase";

//export default function App() {
// export default ({navigation, route}) => {

// //   const pressEditProfile=()=>{
//     alert('nav to EditProfile .js')
//     navigation.navigate('Edit Profile');
//   };


//   const pressEditNotify=()=>{
//     alert('nav to EditNotification .js')
//     navigation.navigate('Notifications');
//   };

//   const pressEditPassword=()=>{
//     alert('nav to EditPassword .js')
//     navigation.navigate('Password');
//   };

//   const pressHelp=()=>{
//     alert('nav to Help .js')
//   };

//   const pressLogout=()=>{
//     // var r = confirm("Are you sure you want to Logout?");
//     var r=true;
//     if (r == true) {
//       auth.signOut().then(() => {
//         console.log("Logout Successfully");
//         // Sign-out successful.
//       }).catch((error) => {
//         alert("An Error Occured. Try Again Later")
//         // An error happened.
//       });
//     } 
//   };

export default class OR extends Component {
    render() {

        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/backgroundImg.png')} style={styles.bgimage}>
                    <View flexDirection='row'>
                        <Text style={styles.text}>Settings</Text>
                        <TouchableOpacity style={styles.backicon}
                            onPress={() => this.props.navigation.navigate('Account')}>
                            <Icon name='arrow-back' size={30} color='white' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30, alignSelf: "center" }}>
                        <View style={styles.flexrow}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity style={styles.iconButton} >
                                    <View style={styles.iconButtonBorder}>
                                        <Icon name='person' size={40} color={'#F8C018'} />
                                        <Text style={styles.icontext}>Profile</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.iconButton} >
                                    <View style={styles.iconButtonBorder}>
                                        <Icon name='notifications' size={40} color={'#F8C018'} />
                                        <Text style={styles.icontext}>Notification</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.flexrow}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity style={styles.iconButton} >
                                    <View style={styles.iconButtonBorder}>
                                        <Icon2 name='key' size={40} color={'#F8C018'} />
                                        <Text style={styles.icontext}>Password</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.iconButton} >
                                    <View style={styles.iconButtonBorder}>
                                        <Icon name='help' size={40} color={'#F8C018'} />
                                        <Text style={styles.icontext}>Help</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, alignSelf: "center" }}>
                            <TouchableOpacity style={styles.iconButton}>
                                <View style={styles.iconButtonBorder}>
                                    <Icon name='logout' size={40} color={'#F8C018'} />
                                    <Text style={styles.icontext}>Logout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: '3%',
        flex: 1
    },
    backicon: {
        marginTop: '3%',
        marginLeft: '3%',
        position: 'absolute'
    },
    flexrow: {
        margin: '2%',
        alignSelf: "center",
        flexDirection: "row",
    },

    iconContainer: {
        marginRight: 20,
    },

    iconButtonBorder: {
        borderWidth: 2,
        borderColor: '#F8C018',
        borderRadius: 10,
        padding: "10%",
        alignItems: "center",
        width: 120,
        height: 110,
    },

    icontext: {
        color: "white",
        fontWeight: "bold",
        marginTop: '15%',
        fontSize: 16
    },

    bgimage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "flex-start"
    },

});
