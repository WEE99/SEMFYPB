// import { StatusBar } from 'expo-status-bar';
// import React, { Component, useState } from 'react';
// import {
//   StyleSheet, Text, RefreshControl, View, TouchableOpacity, Alert, SafeAreaView,
//   ScrollView, FlatList
// } from 'react-native';
// import { Card, ActivityIndicator } from 'react-native-paper';
// import ModalSelector from 'react-native-modal-selector'
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon2 from 'react-native-vector-icons/Feather';
// import moment from 'moment';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       leads_name: '',
//       textInputValue: '',
//       sales_username: '',
//       lead_contact: '',
//       task_id: '',
//       isLoading: true,
//       refreshing: false,
//       diffDate: '',
//       dataSource: '',
//       opacity: 1,
//       date: '',
//       CurrentYear: moment().format("YYYY"),
//       CurrentMonth: moment().format("MM"),
//       currentDay: moment().format("DD"),
//       lastRefresh: Date(Date.now()).toString(),
//     }
//     this.refreshScreen = this.refreshScreen.bind(this)
//   }

//   refreshScreen() {
//     this.setState({ lastRefresh: Date(Date.now()).toString() })
//   }

//   componentDidMount() {
//     this.setState({
//       leads_name: this.props.route.params.leads_name,
//       sales_username: this.props.route.params.sales_username,
//     });
//     this.LeadsDetailsItem();
//     this._retrieveLeadsTaskList();
//     this.FocusSubscription = this.props.navigation.addListener(
//       'focus', () => {
//         this.LeadsDetailsItem();
//         this._retrieveLeadsTaskList();
//         this.refreshScreen();
//       }
//     )
//   }

//   LeadsDetailsItem() {
//     const encodedValue = {
//       encodedName: this.props.route.params.leads_name,
//     }
//     return fetch(`https://poggersfyp.mooo.com/Backend/leadsDetails.php?lead_name=${encodeURIComponent(encodedValue.encodedName)}`)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson,
//         })
//       }).catch((error) => {
//         console.error(error);
//       });
//   }

//   _retrieveLeadsTaskList() {
//     const encodedValue = {
//       encodedName: this.props.route.params.leads_name,
//       encodedSalesName: this.props.route.params.sales_username
//     }
//     return fetch(`https://poggersfyp.mooo.com/Backend/retrieveLeadsTaskList.php?lead_name=${encodeURIComponent(encodedValue.encodedName)}&sales_username=${encodeURIComponent(encodedValue.encodedSalesName)}`)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           TaskList: responseJson,
//         });
//       }).catch((error) => {
//         console.log(error);
//       });
//   }

//   _updateTask(task_id) {
//     const url = 'https://poggersfyp.mooo.com/Backend/updateTaskStatus.php';
//     fetch(url,
//       {
//         method: 'POST',
//         headers:
//         {
//           'Origin': '*',
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//           {
//             id: task_id
//           })

//       }).then((response) => response.json()).then((responseJsonFromServer) => {
//         alert(responseJsonFromServer);
//         this.LeadsDetailsItem();
//         this._retrieveLeadsTaskList();
//         this.refreshScreen();
//       }).catch((error) => {
//         console.log(error)
//       });
//   }

//   _deleteTask(task_id) {
//     const url = 'https://poggersfyp.mooo.com/Backend/deleteTask.php';
//     fetch(url,
//       {
//         method: 'POST',
//         headers:
//         {
//           'Origin': '*',
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//           {
//             id: task_id
//           })

//       }).then((response) => response.json()).then((responseJsonFromServer) => {
//         alert(responseJsonFromServer);
//         this.LeadsDetailsItem();
//         this._retrieveLeadsTaskList();
//         this.refreshScreen();
//       }).catch((error) => {
//         console.log(error)
//       });
//   }

//   _updateLeadStatus(leadsID, updatedStatus) {
//     const url = 'https://poggersfyp.mooo.com/Backend/updateLeadStatus.php';
//     fetch(url,
//       {
//         method: 'POST',
//         headers:
//         {
//           'Origin': '*',
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//           {
//             id: leadsID,
//             status: updatedStatus
//           })

//       }).then((response) => response.json()).then((responseJsonFromServer) => {
//         alert(responseJsonFromServer);
//         this.LeadsDetailsItem();
//         this._retrieveLeadsTaskList();
//         this.refreshScreen();
//       }).catch((error) => {
//         console.log(error)
//       });
//   }

//   createStatusWonAlert(leads_id) {
//     Alert.alert(
//       "Confirmation",
//       "Change lead's status from OPEN to WON",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: 'Confirm', onPress: () => this._updateLeadStatus(leads_id, "Won") }
//       ],
//       { cancelable: false }
//     );
//   }

//   createStatusLoseAlert(leads_id) {
//     Alert.alert(
//       "Confirmation",
//       "Change lead's status from OPEN to LOSE",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: 'Confirm', onPress: () => this._updateLeadStatus(leads_id, "Lose") }
//       ],
//       { cancelable: false }
//     );
//   }

//   createStatusResetAlert(leads_id) {
//     Alert.alert(
//       "Confirmation",
//       "Reset lead's status to OPEN",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: 'Confirm', onPress: () => this._updateLeadStatus(leads_id, "Open") }
//       ],
//       { cancelable: false }
//     );
//   }

//   createDeleteAlert(task_id) {
//     Alert.alert(
//       "Confirmation",
//       "Are you sure you want to delete this task?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: 'Delete', onPress: () => this._deleteTask(task_id) }
//       ],
//       { cancelable: false }
//     );
//   }

//   createCompletionAlert(task_id) {
//     Alert.alert(
//       "Confirmation",
//       "Confirmation for completion of task",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: 'Confirm', onPress: () => this._updateTask(task_id) }
//       ],
//       { cancelable: false }
//     );
//   }

//   redirectTaskDetailPage(taskType, taskId) {
//     if (taskType == "Call") {
//       this.props.navigation.navigate('Call Task Detail',
//         {
//           leads_name: this.state.leads_name,
//           sales_username: this.state.sales_username,
//           task_Id: taskId
//         })
//     } else if (taskType == "Appointment") {
//       this.props.navigation.navigate('Appointment Task Detail',
//         {
//           leads_name: this.state.leads_name,
//           sales_username: this.state.sales_username,
//           task_Id: taskId
//         })
//     } else {
//       this.props.navigation.navigate('Other Task Detail',
//         {
//           leads_name: this.state.leads_name,
//           sales_username: this.state.sales_username,
//           task_Id: taskId
//         })
//     }
//   }

//   validateDate(taskDate) {
//     var day = taskDate.substr(0, 2);
//     var Month = taskDate.substr(3, 2);
//     var Year = taskDate.substr(6, 9);
//     var dateOne = moment([this.state.CurrentYear, this.state.CurrentMonth, this.state.currentDay]);
//     var dateTwo = moment([Year, Month, day]);
//     var result = dateTwo.diff(dateOne, 'days');
//     this.state.diffDate = result;
//   }

//   convert2Date(taskDate) {
//     var day = taskDate.substr(0, 2);
//     var Month = taskDate.substr(3, 2);
//     var Year = taskDate.substr(6, 9);
//     this.state.date = moment([Year, Month, day]);
//   }

//   render() {
//     const encodedValue = {
//       leads_name: this.state.leads_name,
//       sales_username: this.state.sales_username
//     }
//     let index = 0;
//     const data = [
//       { key: index++, section: true, label: 'Select Task' },
//       { key: index++, label: 'Call' },
//       { key: index++, label: 'Appointment' },
//       { key: index++, label: 'Other' },
//     ];

//     if (this.state.isLoading) {
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <ScrollView style={styles.container}>
//         <Text style={styles.title}>LEAD'S DETAIL</Text>
//         <FlatList
//           data={this.state.dataSource}
//           renderItem={({ item }) => {
//             return (
//               <View>

//                 {item.status == "Open"
//                   ? <View style={styles.row}>
//                     <TouchableOpacity
//                       style={styles.WonButton}
//                       onPress={() => { this.createStatusWonAlert(item.lead_id) }}
//                     >
//                       <Text style={styles.buttoncontent}>WON</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.LoseButton}
//                       onPress={() => { this.createStatusLoseAlert(item.lead_id) }}
//                     >
//                       <Text style={styles.buttoncontent}>LOSE</Text>
//                     </TouchableOpacity>
//                   </View>

//                   : item.status == "Won"
//                     ? <View style={{ flexDirection: 'row' }}>
//                       <View style={styles.row}>
//                         <TouchableOpacity
//                           style={styles.WonButton}
//                         >
//                           <Text style={styles.buttoncontent}>WON</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={styles.LoseButton2}
//                           onPress={() => { this.createStatusLoseAlert(item.lead_id) }}
//                         >
//                           <Text style={styles.buttoncontent}>LOSE</Text>
//                         </TouchableOpacity>
//                       </View>
//                       <TouchableOpacity style={{ marginTop: 5 }} onPress={() => { this.createStatusResetAlert(item.lead_id) }}>
//                         <Text style={{ backgroundColor: 'lightgrey', color: 'black', padding: 8, borderRadius: 5 }}>
//                           Reset Status
//                       </Text>
//                       </TouchableOpacity>
//                     </View>

//                     : <View style={{ flexDirection: 'row' }}>
//                       <View style={styles.row}>
//                         <TouchableOpacity
//                           style={styles.WonButton2}
//                           onPress={() => { this.createStatusWonAlert(item.lead_id) }}
//                         >
//                           <Text style={styles.buttoncontent}>WON</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={styles.LoseButton}
//                         >
//                           <Text style={styles.buttoncontent}>LOSE</Text>
//                         </TouchableOpacity>
//                       </View>
//                       <TouchableOpacity style={{ marginTop: 5 }} onPress={() => { this.createStatusResetAlert(item.lead_id) }}>
//                         <Text style={{ backgroundColor: 'lightgrey', color: 'black', padding: 8, borderRadius: 5 }}>
//                           Reset Status
//                       </Text>
//                       </TouchableOpacity>
//                     </View>
//                 }
//               </View>
//             )
//           }}
//         />

//         <FlatList
//           data={this.state.dataSource}
//           renderItem={({ item }) => {
//             return (
//               <View>
//                 <View style={styles.row}>
//                   <Text style={styles.details}>Name</Text>
//                   <Text style={styles.info} >{item.lead_name}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.details}>Email</Text>
//                   <Text style={styles.info}>{item.lead_email}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.details}>Contact</Text>
//                   <Text style={styles.info}>{item.lead_contact}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.details}>Company</Text>
//                   <Text style={styles.info}>{item.lead_company}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.details}>Interest</Text>
//                   <Text style={styles.info}>{item.interest}</Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.details}>Comment</Text>
//                   <Text style={styles.info}>{item.comments}</Text>
//                 </View>

//                 {item.Contacted != "" ?
//                   <View style={styles.row}>
//                     <Text style={styles.details}>Contacted</Text>
//                     <Text style={styles.info}>{item.Contacted}</Text>
//                   </View>
//                   : <View></View>}

//                 {item.Quote_Sent != "" ?
//                   <View style={styles.row}>
//                     <Text style={styles.details}>Quote Sent</Text>
//                     <Text style={styles.info}>{item.Quote_Sent}</Text>
//                   </View>
//                   : <View></View>}

//                 {item.Quote_Agreed != "" ?
//                   <View style={styles.row}>
//                     <Text style={styles.details}>Quote Agreed</Text>
//                     <Text style={styles.info}>{item.Quote_Agreed}</Text>
//                   </View>
//                   : <View></View>}

//                 {item.remarks != "" ?
//                   <View style={styles.row}>
//                     <Text style={styles.details}>Remarks</Text>
//                     <Text style={styles.info}>{item.remarks}</Text>
//                   </View>
//                   : <View></View>}

//                 {item.status == "Open" ? <ModalSelector
//                   data={data}
//                   initValue="Create New Task"
//                   onChange={(option) => {
//                     if (option.label == "Call") {
//                       this.props.navigation.navigate('Create Call Task',
//                         {
//                           leads_name: this.state.leads_name,
//                           sales_username: this.state.sales_username
//                         })
//                     } else if (option.label == "Appointment") {
//                       this.props.navigation.navigate('Create Appointment Task',
//                         {
//                           leads_name: this.state.leads_name,
//                           sales_username: this.state.sales_username
//                         })
//                     }
//                     else {
//                       this.props.navigation.navigate('Create Other Task',
//                         {
//                           leads_name: this.state.leads_name,
//                           sales_username: this.state.sales_username
//                         })
//                     }
//                   }} /> : <View></View>}
//               </View>
//             )
//           }} />

//         <Text style={styles.title2}>TASKS</Text>
//         <View style={styles.list}>
//           <FlatList
//             data={this.state.TaskList}
//             extraData={this.state}
//             renderItem={({ item }) => {
//               if (item.task_status == "Upcoming") {
//                 this.validateDate(item.task_date);
//                 this.convert2Date(item.task_date);
//                 if (this.state.diffDate > 0) {
//                   return (
//                     <Card style={styles.card}>
//                       <View style={styles.Task2}>
//                         {/* <Text>{this.state.date.format("DD-MM-YYYY")}</Text> */}
//                         <TouchableOpacity style={{ flex: 1 }} onPress={() => {
//                           this.redirectTaskDetailPage(item.task_title, item.task_id)
//                         }}>
//                           <View style={styles.Task}>
//                             <Text style={styles.Type}>{item.task_title}</Text>
//                             <Text style={styles.Date}> | </Text>
//                             <Text style={styles.Date}>{item.task_date}</Text>
//                           </View>
//                         </TouchableOpacity>
//                         <Icon2 name="trash-2" size={20} color={'black'} style={styles.icon} onPress={() => this.createDeleteAlert(item.task_id)} />
//                         <Icon name="done" size={20} color={'green'} style={styles.icon} onPress={() => { this.createCompletionAlert(item.task_id) }} />
//                       </View>
//                     </Card>
//                   )
//                 }
//                 else if (this.state.diffDate < 0) {
//                   return (
//                     <Card style={styles.card}>
//                       <View style={styles.Task2}>
//                         <TouchableOpacity style={{ flex: 1 }} onPress={() => {
//                           this.redirectTaskDetailPage(item.task_title, item.task_id)
//                         }}>
//                           <View style={styles.TaskOverdue}>
//                             <Text style={styles.TypeOverdue}>{item.task_title}</Text>
//                             <Text style={styles.DateOverdue}> | </Text>
//                             <Text style={styles.DateOverdue}>{item.task_date}</Text>
//                           </View>
//                         </TouchableOpacity>
//                         {/* <Text style={styles.icon}>Overdue!</Text> */}
//                         <Icon2 name="trash-2" size={20} color={'black'} style={styles.icon} onPress={() => this.createDeleteAlert(item.task_id)} />
//                         <Icon name="done" size={20} color={'green'} style={styles.icon} onPress={() => { this.createCompletionAlert(item.task_id) }} />
//                       </View>
//                     </Card>
//                   )
//                 }
//               }
//               else if (item.task_status == "Completed") {
//                 return (
//                   <Card style={styles.card}>
//                     <View style={styles.Task3}>
//                       <TouchableOpacity style={{ flex: 1 }} onPress={() => {
//                         this.redirectTaskDetailPage(item.task_title, item.task_id)
//                       }}>
//                         <View style={styles.TaskCompleted}>
//                           <Text style={styles.Type}>{item.task_title}</Text>
//                           <Text style={styles.Date}> | </Text>
//                           <Text style={styles.Date}>{item.task_date}</Text>
//                         </View>
//                       </TouchableOpacity>
//                       <Text style={styles.icon}>Completed!</Text>
//                     </View>
//                   </Card>
//                 )
//               }
//             }}
//           />

//         </View>
//         <StatusBar style="auto" />
//       </ScrollView>
//     );

//   }
// }



import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView, SafeAreaView,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import {Entypo} from 'react-native-vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import ModalSelector from 'react-native-modal-selector';
import {auth, db, storage} from "../CA/firebase";
import { orange, TableRowTask } from './TablesandTimeFormat';
//LeadsDetails

// export default function App() {
export default ({navigation, route}) => {

  const {comment,company,contactNumber,contacted,date,email,interest,name,quote,quoteSent,quoteAgreed,result,userId,id} = route.params;

  const arryOpen =[
    {id:1, Lname: "Call",company: "25/04/2021", Status:"New Leads"},
    {id:2, Lname: "Appointment",company: "25/04/2021", Status:"Contacted"},
    {id:3, Lname: "Others",company: "25/04/2021", Status:"New Leads"},
    {id:4, Lname: "Appointment",company: "25/04/2021", Status:"Contacted"},
  ];

  const [tasks,setTasks]=useState([]);
  const [modal,setModal]=useState(false);


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
    console.log("id: " +id +", "+name+" ,"+quoteAgreed)
    // db.collection("tasks").where("status", "==", "Not completed").where("leadId", "==", id).orderBy("date", "desc")
    db.collection("tasks").where("leadId", "==", id).orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
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
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  },[]);
  
  const pressWon= ()=>{
                  var wonstatus = db.collection("leads").doc(id);

                  // Set the "capital" field of the city 'DC'
                  return wonstatus.update({
                  result: "Won"
                  })
                  .then(() => {
                  console.log("Document successfully updated!");
                  alert("Won status updated")
                  })
                  .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  });
            }


  const pressLose= ()=>{
    var losestatus = db.collection("leads").doc(id);

    // Set the "capital" field of the city 'DC'
    return losestatus.update({
    result: "Lose"
    })
    .then(() => {
    console.log("Document successfully updated!");
    alert("Lose status updated")
    })
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  };

  const pressOpen= ()=>{
    var openstatus = db.collection("leads").doc(id);

    // Set the "capital" field of the city 'DC'
    return openstatus.update({
    result: "Open"
    })
    .then(() => {
    console.log("Document successfully updated!");
    alert("Reset status updated")
    })
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  };

  const pressCreate= ()=>{
    setModal(true)
    // return(
    //   <View><Text>Heelo</Text></View>
    // )
    // alert("Create new task"); 
    // console.log("result: "+result)
    // {result == "Open" ? <View><ModalSelector
    //                   data={["Call","Appointment","Other"]}
    //                   initValue="Create New Task"
    //                   onChange={(option) => {
    //                     if (option.label == "Call") {
    //                       navigation.navigate('Create Call Task',
    //                         {
    //                           userId:userId,
    //                           name:name,
    //                           leadId:id
    //                         })
    //                     } else if (option.label == "Appointment") {
    //                       navigation.navigate('Create Appointment Task',
    //                         {
    //                           userId:userId,
    //                           name:name,
    //                           leadId:id
    //                         })
    //                     }
    //                     else {
    //                       navigation.navigate('Create Other Task',
    //                         {
    //                           userId:userId,
    //                           name:name,
    //                           leadId:id
    //                         })
    //                     }
    //                   }} /></View> : <View></View>}
  
  };

  const pressMail= ()=>{
    alert("press to mail"); 
  };


  return (
    <View style={styles.container}>
      
      
      <Text style={styles.title}>LEAD'S DETAIL</Text>
      
      <ScrollView>
      <View  style={styles.LeadsContainer}>
      <View style={styles.row}>
         <TouchableOpacity style={{backgroundColor:"green",borderRadius:5, width:"15%",height:"150%", alignItems:"center",justifyContent:"center", marginRight:10}} onPress={pressWon}>
           <View >
           <Text style={{color:"white", fontWeight:"bold",alignSelf:"center"}}>WON</Text>
           </View>
        </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"red",borderRadius:5, width:"15%",height:"150%", alignItems:"center",justifyContent:"center", marginRight:"30%"}} onPress={pressLose}>
            <View>
            <Text style={{color:"white", fontWeight:"bold"}}>LOSE</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"lightgrey",borderRadius:5, width:"30%", height:"150%",alignItems:"center",justifyContent:"center",alignContent:"flex-end"}} onPress={pressOpen}>
            <View>
            <Text style={{color:"black", fontWeight:"bold"}}>RESET STATUS</Text>
            </View>
          </TouchableOpacity>
        
      </View>

      
      <View style={styles.row}>
          <Text style={styles.details}>Name</Text>
          <Text style={styles.info} >{name}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Email</Text>
          <Text style={styles.info} >{email}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Contact</Text>
          <Text style={styles.info} >{contactNumber}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Company</Text>
          <Text style={styles.info} >{company}</Text>
      </View>
      
      <View style={styles.row}>
          <Text style={styles.details}>Interest</Text>
          <Text style={styles.info} >{interest}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Comment</Text>
          <Text style={styles.info} >{comment}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Contacted</Text>
          {contacted? 
          <Text style={styles.info} >Contacted</Text>
           : 
          <Text style={styles.info} >-</Text>}  
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Quote Sent</Text>
          <Text style={styles.info} >RM {quote}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.details}>Quote Agreed</Text>
          {quoteAgreed? 
          <Text style={styles.info} >RM {quoteAgreed}</Text>
           : 
          <Text style={styles.info} >-</Text>}  
      </View>
      </View>

     {result=="Open"&&
            <View>
            {/* <Text style={{color:'rgba(192,192,192,0.9)', fontWeight:"bold"}}>CREATE NEW TASK</Text> */}
            <ModalSelector
            data={[
              {key:1,label:"Call"},
              {key:2,label:"Appointment"},
              {key:3,label:"Others"},
            ]

            }
            initValue="CREATE NEW TASK"
            onChange={(option) => {
                                  if (option.label == "Call") {
                                    navigation.navigate('Create Call Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  } else if (option.label == "Appointment") {
                                    navigation.navigate('Create Appointment Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  }
                                  else {
                                    navigation.navigate('Create Other Task',
                                      {
                                        userId:userId,
                                        name:name,
                                        leadId:id
                                      })
                                  }}}
            />
            </View>
}
        

      <Text style={styles.title}>TASKS</Text>

      <View>

      {tasks.map((info) =>
                <TableRowTask key={info.id} data={info} navigation={navigation} />
            )}


      </View>
      </ScrollView>
      


      
      

      
      
 
      <StatusBar style="auto" />
     
    </View>
  );
}

const styles = StyleSheet.create({
 

  container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
      },

  title: {
        fontWeight: "bold",
        fontSize: 20,
      },

  row: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },


  details: {
        width: "30%",
        color: "grey"
    },
        
  info: {
        fontWeight: "bold",
        width: '50%',
  },
        

  flexrowNAV:{
    marginTop:10,
    alignSelf:"center",
    flexDirection:"row",
  },

  flexrow:{
    marginTop:10,
    alignSelf:"flex-start",
    flexDirection:"row",
    // marginTop:10,
    // flexDirection:"row",
    // justifyContent:"space-around"
  },

  
  flexrow2:{
    // marginBottom:100,
    flexDirection:"row",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:0,
    // justifyContent:"flex-end"
  },

  LeadsDetailsbutton:{
    marginRight:25,
    backgroundColor:orange,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

  LeadsTasksbutton:{
    backgroundColor: "lightgrey",
    borderRadius: 100,
    //borderWidth:1,
    borderColor:"grey",
    width:10,
    height:10,
  },

LeadsContainer:{
  flex:1,
  marginTop:10,
  alignSelf:"center",
  //borderWidth:2,
  padding:5,
  // paddingLeft:"20%",
  // paddingRight:"20%",
  paddingTop:0,
  borderColor:"green",
  // backgroundColor:"red",
  height:"85%",
  width:'100%',
},

LeadsNameContainer:{
  marginTop:10,
  marginLeft:60,
  alignSelf:"flex-start",
  borderWidth:2,
  padding:5,
  //borderColor:"red",
  borderColor:orange,
  borderRadius:10,
  backgroundColor:orange,
  zIndex:2,
},

iconcontainer:{alignContent:"center"},


LeadsInfo:{
  //alignSelf:"flex-start",
  alignSelf:"center",
  borderWidth:2,
  marginTop:30,
  marginLeft:5,
  paddingTop:15,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  position:"absolute",
  width:296,
  // width:"95%",
  zIndex:1
},

LeadsDetailIcon:{marginRight:10, color:orange},
// LeadsDetailIcon2:{marginRight:10},

LeadsInterest:{
  alignSelf:"center",
  marginTop:10,
  marginLeft:5,
  borderWidth:2,
  padding:5,
  borderColor:"lightgrey",
  backgroundColor:"white",
  borderRadius:10,
  //backgroundColor:"red",
  // width:"98%",
  width:296,
  //position:"absolute"
},

textcontainer:{justifyContent:"center", width:"80%", paddingRight:5},

textintrustion:{fontWeight:'bold', color:"#B56118"},

BottomButton:
{
  // alignSelf:"flex-end",
  backgroundColor:orange,
  //borderRightWidth:1,
  borderRadius:100,
  marginRight:5,
  width:45,
  height:45,
  alignItems:"center",
  justifyContent:"center"
  // paddingTop:5,
  // paddingLeft:5
},


bgimage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: "cover",
  // padding:"5%",
  // paddingRight:0,
  // paddingTop:0,
  justifyContent: "flex-start"

},

// bgimage: {
//   flex: 1,
//   width: '100%',
//   height: '100%',
//   resizeMode: "cover",
//   justifyContent: "flex-start"
// },


});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: '5%',
//   },

//   title: {
//     fontWeight: "bold",
//     fontSize: 20,
//   },

//   row: {
//     flexDirection: "row",
//     marginTop: 10,
//     marginBottom: 10,
//     flex: 1
//   },

//   WonButton: {
//     backgroundColor: "green",
//     alignItems: "center",
//     padding: 5,
//     borderRadius: 5,
//   },

//   WonButton2: {
//     backgroundColor: "green",
//     alignItems: "center",
//     padding: 5,
//     borderRadius: 5,
//     opacity: 0.5
//   },

//   LoseButton: {
//     backgroundColor: "red",
//     marginLeft: 10,
//     alignItems: "center",
//     padding: 5,
//     borderRadius: 5,
//   },

//   LoseButton2: {
//     backgroundColor: "red",
//     marginLeft: 10,
//     alignItems: "center",
//     padding: 5,
//     borderRadius: 5,
//     opacity: 0.5
//   },

//   buttoncontent: {
//     color: "white",
//     fontWeight: "bold",
//   },

//   details: {
//     width: "30%",
//     color: "grey"
//   },

//   info: {
//     fontWeight: "bold",
//     width: '50%',
//   },

//   border: {
//     marginTop: 10,
//     borderWidth: 1,
//     padding: '3%',
//   },

//   bordertext: {
//     fontWeight: "bold",
//   },
//   title2: {
//     fontWeight: "bold",
//     fontSize: 20,
//     marginTop: 30,
//   },

//   list: {
//     marginTop: 10,

//   },

//   TaskTitle: {
//     fontFamily: 'Roboto',
//     fontSize: 16,
//     marginTop: 20,
//     marginStart: 15,
//     fontWeight: 'bold'
//   },
//   Task: {
//     flexDirection: 'row',
//     backgroundColor: 'palegreen',
//     paddingTop: 5,
//     paddingLeft: 10,
//     paddingRight: 5,
//     flex: 1,
//     borderRadius: 10,
//   },
//   TaskOverdue: {
//     flexDirection: 'row',
//     backgroundColor: 'red',
//     paddingTop: 5,
//     paddingLeft: 10,
//     paddingBottom: 5,
//     paddingRight: 5,
//     flex: 1,
//     borderRadius: 10,
//   },
//   Task2: {
//     flexDirection: 'row',
//   },
//   Task3: {
//     flexDirection: 'row',
//     backgroundColor: 'palegreen',
//     borderRadius: 10,
//   },
//   Date: {
//     marginStart: 5,
//   },
//   TypeOverdue: {
//     color: 'white',
//   },
//   DateOverdue: {
//     marginStart: 5,
//     color: 'white'
//   },
//   card: {
//     margin: 5,
//     borderRadius: 10,
//   },
//   TaskCompleted: {
//     flexDirection: 'row',
//     backgroundColor: 'lightgrey',
//     paddingTop: 5,
//     paddingLeft: 10,
//     paddingRight: 5,
//     flex: 1,
//     borderRadius: 10,
//   },
//   icon: {
//     padding: 5,
//     marginTop: 2,
//     marginLeft: 5
//   }
// });
