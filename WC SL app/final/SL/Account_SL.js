import React, {useEffect, useState, Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, Alert, ImageBackground, Image, LogBox} from 'react-native';
import { Card } from 'react-native-paper';
import Settings from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import {orange, TableRowDashboard,TableRowTaskProfile} from "./TablesandTimeFormat";
import {auth, db, storage} from "../CA/firebase";
import moment from 'moment';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Feather'



export default ({navigation, route}) => {

const [name,setname]=useState("");
const [email,setemail]=useState("");
const [phone,setphone]=useState("");
const [role,setrole]=useState("");
const [profileimage,setprofileImage]=useState("");
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcbiZWccEy7BaDQdfouPsE-0-9JUiDyTxMQg&usqp=CAU
const [tasks,setTasks]=useState([]);
const [datafor2,setdatafor2]=useState("");

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  


useEffect(() => {
      
    var user=auth.currentUser
    console.log(user)
    // if(user){
      // console.log(user.uid)
      // db.collection("users").where("UID", "==",user.uid)
      db.collection("users").where("UID", "==","HiVB7rApJqMSbGfLTPEbtVVdvXc2")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            var data=doc.data();
                            var data2=doc.id;
                            var name = setname(data.name);
                            var email = setemail(data.email);
                            var contactnumber = setphone(data.phoneNumber);
                            var photoURL = setprofileImage(data.photoURL);
                            var role = setrole(data.role);
                            console.log("datafor2 : "+datafor2)

                            // "Hu4WdS4HH4ugYVFmZexa"
                            db.collection("tasks").where("userId", "==",data2).where("status", "==","Not completed" ).orderBy("date", "desc")
                            .onSnapshot((querySnapshot) => {
                            let TaskArr= [];
                            querySnapshot.forEach((docTasks) => {
                            let task = docTasks.data();
                            task.id = docTasks.id;
                            task.time = formatAMPM(task.date.toDate());
                            console.log("Tname: "+task.title)

                            var m = task.date.toDate().getMonth()
                            task.date = monthArr[m] + " "+ task.date.toDate().getDate() + ", " + task.date.toDate().getFullYear();

                            TaskArr.push(task);
                            // doc.data() is never undefined for query doc snapshots
                            console.log(docTasks.id, " => ", docTasks.data());
                            });
                            setTasks(TaskArr);
                            console.log("TaskArr: "+JSON.stringify(TaskArr));
                            })
                            // .catch((error) => {
                            // console.log("Error getting documents: ", error);
                            // });

                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });

                    // "Hu4WdS4HH4ugYVFmZexa"
    // db.collection("tasks").where("userId", "==",datafor2).where("status", "==","Not completed" ).orderBy("date", "desc")
    //                 .get()
    //                 .then((querySnapshot) => {
    //                   let TaskArr= [];
    //                     querySnapshot.forEach((docTasks) => {
    //                         let task = docTasks.data();
    //                         task.id = docTasks.id;
    //                         task.time = formatAMPM(task.date.toDate());
    //                         console.log("Tname: "+task.title)
                  
    //                         var m = task.date.toDate().getMonth()
    //                         task.date = monthArr[m] + " "+ task.date.toDate().getDate() + ", " + task.date.toDate().getFullYear();
                  
    //                         TaskArr.push(task);
    //                         // doc.data() is never undefined for query doc snapshots
    //                         console.log(docTasks.id, " => ", docTasks.data());
    //                     });
    //                     setTasks(TaskArr);
    //                     console.log("TaskArr: "+JSON.stringify(TaskArr));
    //                 })
    //                 .catch((error) => {
    //                     console.log("Error getting documents: ", error);
    //                 });


    // db.collection("users").where("UID", "==","HiVB7rApJqMSbGfLTPEbtVVdvXc2")
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         db.collection("tasks").where("userid", "==",doc.data().id ).where("status", "==","Not Completed" ).orderBy("date", "desc")
    //         .get()
    //                         .then((querySnapshot) => {
    //                           let TaskArr= [];
    //                             querySnapshot.forEach((docTasks) => {
    //                                 let task = docTasks.data();
    //                                 task.id = docTasks.id;
    //                                 task.time = formatAMPM(task.date.toDate());
    //                                 console.log("Tname: "+task.title)
                          
    //                                 var m = task.date.toDate().getMonth()
    //                                 task.date = monthArr[m] + " "+ task.date.toDate().getDate() + ", " + task.date.toDate().getFullYear();
                          
    //                                 TaskArr.push(task);
    //                                 // doc.data() is never undefined for query doc snapshots
    //                                 console.log(docTasks.id, " => ", docTasks.data());
    //                             });
    //                             setTasks(TaskArr);
    //                             console.log("TaskArr: "+JSON.stringify(TaskArr));
    //                         })
    //                         .catch((error) => {
    //                             console.log("Error getting documents: ", error);
    //                         });
    //     });
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });


                    
      LogBox.ignoreLogs(['Setting a timer']);
  // }
  // },[leads]);
},[]);
  

    

// export default class SalesPersonAccount extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             designation: '',
//             sales_name: '',
//             sales_email: '',
//             sales_contact: '',
//             diffDate: '',
//             CurrentYear: moment().format("YYYY"),
//             CurrentMonth: moment().format("MM"),
//             currentDay: moment().format("DD"),
//             lastRefresh: Date(Date.now()).toString(),
//         }
//         this.refreshScreen = this.refreshScreen.bind(this)
//     }

//     refreshScreen() {
//         this.setState({ lastRefresh: Date(Date.now()).toString() })
//     }

//     componentDidMount() {
//         this._TaskList();
//         this._AccountDetails();
//         this.FocusSubscription = this.props.navigation.addListener(
//             'focus', () => {
//                 this._AccountDetails();
//                 this._TaskList();
//                 this.refreshScreen();
//             }
//         )
//     }

//     _AccountDetails() {
//         return fetch('https://poggersfyp.mooo.com/Backend/retrieveAccountInfo.php')
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 this.setState({
//                     dataSource: responseJson
//                 });
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     _TaskList() {
//         return fetch('https://poggersfyp.mooo.com/Backend/retrieveOverallTaskList.php')
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 this.setState({
//                     dataSource2: responseJson
//                 });
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     createDeleteAlert(task_id) {
//         Alert.alert(
//             "Confirmation",
//             "Are you sure you want to delete this task?",
//             [
//                 {
//                     text: "Cancel",
//                     onPress: () => console.log("Cancel Pressed"),
//                     style: "cancel"
//                 },
//                 { text: 'Delete', onPress: () => this._deleteTask(task_id) }
//             ],
//             { cancelable: false }
//         );
//     }

//     createCompletionAlert(task_id) {
//         Alert.alert(
//             "Confirmation",
//             "Confirmation for completion of task",
//             [
//                 {
//                     text: "Cancel",
//                     onPress: () => console.log("Cancel Pressed"),
//                     style: "cancel"
//                 },
//                 { text: 'Confirm', onPress: () => this._updateTask(task_id) }
//             ],
//             { cancelable: false }
//         );
//     }

//     _updateTask(task_id) {
//         const url = 'https://poggersfyp.mooo.com/Backend/updateTaskStatus.php';
//         fetch(url,
//             {
//                 method: 'POST',
//                 headers:
//                 {
//                     'Origin': '*',
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(
//                     {
//                         id: task_id
//                     })

//             }).then((response) => response.json()).then((responseJsonFromServer) => {
//                 alert(responseJsonFromServer);
//                 this.refreshScreen();
//                 this._TaskList();
//             }).catch((error) => {
//                 console.log(error)
//             });
//     }

//     _deleteTask(task_id) {
//         const url = 'https://poggersfyp.mooo.com/Backend/deleteTask.php';
//         fetch(url,
//             {
//                 method: 'POST',
//                 headers:
//                 {
//                     'Origin': '*',
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(
//                     {
//                         id: task_id
//                     })

//             }).then((response) => response.json()).then((responseJsonFromServer) => {
//                 alert(responseJsonFromServer);
//                 this.refreshScreen();
//                 this._TaskList();
//             }).catch((error) => {
//                 console.log(error)
//             });
//     }

//     redirectTaskDetailPage(taskType, taskId) {
//         if (taskType == "Call") {
//           this.props.navigation.navigate('Call Task Detail',
//             {
//               sales_username: this.state.username,
//               task_Id: taskId
//             })
//         } else if (taskType == "Appointment") {
//           this.props.navigation.navigate('Appointment Task Detail',
//             {
//               sales_username: this.state.username,
//               task_Id: taskId
//             })
//         } else {
//           this.props.navigation.navigate('Other Task Detail',
//             {
//               sales_username: this.state.username,
//               task_Id: taskId
//             })
//         }
//       }

//     validateDate(taskDate) {
//         var day = taskDate.substr(0, 2);
//         var Month = taskDate.substr(3, 2);
//         var Year = taskDate.substr(6, 9);
//         var dateOne = moment([this.state.CurrentYear, this.state.CurrentMonth, this.state.currentDay]);
//         var dateTwo = moment([Year, Month, day]);
//         var result = dateTwo.diff(dateOne, 'days');
//         this.state.diffDate = result;
//     }

const pressSetting =()=>{
    Alert.alert('Setting Button pressed',"pressed")
    navigation.navigate("Account Settings");
}



        return (
            <ScrollView styel={{ backgroundColor: 'white', margin: 5}}>
                <View style={{ flex: 1, padding: "5%", marginTop: 15}}>
                    
                    

                            <View>
                                <Settings name='setting' size={25} style={{ alignSelf: 'flex-end' }}
                               onPress={pressSetting}
                                    /> 
                                <View style={styles.Direction}>

                                    {profileimage!=""?
                                      
                                      <Image source={{uri:profileimage}} style={styles.image}/>
                                      :<Icon name='user' size={45} style={styles.profileImg} />
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

                    {/* {this.state.dataSource2 == "No upcoming task!" ?
                        <View>
                            <Text style={{margin: 5, padding : 5}}>No Upcoming Task!</Text>
                        </View> :
                        <FlatList
                            data={this.state.dataSource2}
                            renderItem={({ item }) => {
                                this.validateDate(item.task_date);
                                if (this.state.diffDate > 0) {
                                    return (
                                        <Card style={styles.card}>
                                            <View style={styles.Task2}>
                                                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                                    this.redirectTaskDetailPage(item.task_title, item.task_id)
                                                }}>
                                                    <View style={styles.Task}>
                                                        <Text style={styles.Type}>{item.task_title}</Text>
                                                        <Text style={styles.Date}> | </Text>
                                                        <Text style={styles.Date}>{item.task_date}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <Icon3 name="trash-2" size={20} color={'black'} style={styles.icon} onPress={() => this.createDeleteAlert(item.task_id)} />
                                                <Icon2 name="done" size={20} color={'green'} style={styles.icon} onPress={() => { this.createCompletionAlert(item.task_id) }} />
                                            </View>
                                        </Card>
                                    )
                                }
                                else if (this.state.diffDate < 0) {
                                    return (
                                        <Card style={styles.card}>
                                            <View style={styles.Task2}>
                                                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                                    this.redirectTaskDetailPage(item.task_title, item.task_id)
                                                }}>
                                                    <View style={styles.TaskOverdue}>
                                                        <Text style={styles.TypeOverdue}>{item.task_title}</Text>
                                                        <Text style={styles.DateOverdue}> | </Text>
                                                        <Text style={styles.DateOverdue}>{item.task_date}</Text>
                                                    </View>
                                                </TouchableOpacity> */}
                                                {/* <Text style={styles.icon}>Overdue!</Text> */}
                                                {/* <Icon3 name="trash-2" size={20} color={'black'} style={styles.icon} onPress={() => this.createDeleteAlert(item.task_id)} />
                                                <Icon2 name="done" size={20} color={'green'} style={styles.icon} onPress={() => { this.createCompletionAlert(item.task_id) }} />
                                            </View>
                                        </Card>
                                    )
                                }

                            }}
                        />
                    } */}
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
        paddingTop:5
    },

    image:{
        width: 60,
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:30,
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