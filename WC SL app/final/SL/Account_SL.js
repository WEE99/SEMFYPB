import React, { useEffect, useState, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, ImageBackground, Image, LogBox } from 'react-native';
import { Card } from 'react-native-paper';
import Settings from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { orange, TableRowDashboard, TableRowTaskProfile } from "./TablesandTimeFormat";
import { auth, db, storage } from "../components/firebase";
import moment from 'moment';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Feather'



export default ({ navigation, route }) => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [role, setrole] = useState("");
    const [profileimage, setprofileImage] = useState("");
    // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbiZWccEy7BaDQdfouPsE-0-9JUiDyTxMQg&usqp=CAU
    const [tasks, setTasks] = useState([]);
    const [datafor2, setdatafor2] = useState("");

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



    useEffect(() => {

        var user = auth.currentUser
        console.log(user)

        db.collection("users").where("UID", "==", user.uid)
            // .get()
            // .then(function(querySnapshot) {
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var data = doc.data();
                    var data2 = doc.id;
                    var name = setname(data.name);
                    var email = setemail(data.email);
                    var contactnumber = setphone(data.phoneNumber);
                    var photoURL = setprofileImage(data.photoURL);
                    var role = setrole(data.role);
                    console.log("datafor2 : " + datafor2)

                    // "Hu4WdS4HH4ugYVFmZexa"
                    db.collection("tasks").where("userId", "==", data2).where("status", "==", "Not completed").orderBy("date", "desc")
                        .onSnapshot((querySnapshot) => {
                            let TaskArr = [];
                            querySnapshot.forEach((docTasks) => {
                                let task = docTasks.data();
                                task.id = docTasks.id;
                                task.time = formatAMPM(task.date.toDate());
                                console.log("Tname: " + task.title)

                                var m = task.date.toDate().getMonth()
                                task.date = monthArr[m] + " " + task.date.toDate().getDate() + ", " + task.date.toDate().getFullYear();

                                TaskArr.push(task);
                                // doc.data() is never undefined for query doc snapshots
                                console.log(docTasks.id, " => ", docTasks.data());
                            });
                            setTasks(TaskArr);
                            console.log("TaskArr: " + JSON.stringify(TaskArr));
                        })
                    // .catch((error) => {
                    // console.log("Error getting documents: ", error);
                    // });

                });
            })




        LogBox.ignoreLogs(['Setting a timer']);

    }, []);


    const pressSetting = () => {
        // Alert.alert('Setting Button pressed',"pressed")
        navigation.navigate("Account Settings");
    }



    return (
        <ScrollView styel={{ backgroundColor: 'white', margin: 5 }}>
            <View style={{ flex: 1, padding: "5%", marginTop: 15 }}>



                <View>
                    <Settings name='setting' size={25} style={{ alignSelf: 'flex-end' }}
                        onPress={pressSetting}
                    />
                    <View style={styles.Direction}>

                        {profileimage != "" ?

                            <Image source={{ uri: profileimage }} style={styles.image} />
                            : <Icon name='user' size={45} style={styles.profileImg} />
                        }

                        <View>
                            <Text style={styles.Username}>{name}</Text>
                            <Text style={styles.designation}>{role}</Text>
                        </View>
                    </View>

                    <View style={styles.Direction}>
                        <View style={styles.Text}>
                            <Text style={styles.TextMargin}>Name</Text>
                            <Text style={styles.TextMargin}>Email</Text>
                            <Text style={styles.TextMargin}>Contact</Text>
                        </View>
                        <View style={styles.Info}>
                            <Text style={styles.TextMargin}>{name}</Text>
                            <Text style={styles.TextMargin}>{email}</Text>
                            <Text style={styles.TextMargin}>{phone}</Text>
                        </View>
                    </View>
                </View>



                <Text style={styles.TaskTitle}>UPCOMING TASKS</Text>

                <View>

                    {tasks.map((info) =>
                        <TableRowTaskProfile key={info.id} data={info} navigation={navigation} />
                    )}


                </View>
            </View>
        </ScrollView>
    )

}



const styles = StyleSheet.create({
    Direction: {
        flexDirection: 'row',
        marginTop: 10
    },
    profileImg: {
        borderRadius: 30,
        marginStart: 10,
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
        // alignSelf:"center",
        // justifyContent:"center",
        // alignItems:"center",
        paddingStart: 13,
        paddingTop: 5
    },

    image: {
        width: 60,
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 30,
    },

    Username: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 20,
    },
    designation: {
        marginLeft: 15,
        fontSize: 12,
    },
    Info: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 14,
    },
    Text: {
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
    },
    TextMargin: {
        marginBottom: 5
    },
    TaskTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        marginTop: 20,
        marginStart: 15,
        fontWeight: 'bold'
    },
    Task: {
        flexDirection: 'row',
        backgroundColor: 'palegreen',
        padding: 10,
        flex: 1,
        borderRadius: 5
    },
    TaskOverdue: {
        flexDirection: 'row',
        backgroundColor: 'red',
        padding: 10,
        flex: 1,
        borderRadius: 5
    },
    Task2: {
        flexDirection: 'row',
    },
    Task3: {
        flexDirection: 'row',
        backgroundColor: 'palegreen',
        borderRadius: 10,
    },
    Date: {
        marginStart: 5,
    },
    TypeOverdue: {
        color: 'white',
    },
    DateOverdue: {
        marginStart: 5,
        color: 'white'
    },
    card: {
        margin: 5,
        borderRadius: 10,
    },
    TaskCompleted: {
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        padding: 10,
        flex: 1,
        margin: 10,
        borderRadius: 5
    },
    icon: {
        padding: 5,
        marginTop: 2,
        marginLeft: 5
    }
});