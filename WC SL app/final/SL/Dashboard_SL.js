import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity, ImageBackground,Image, ScrollView,LogBox} from 'react-native';
import {orange, TableRowDashboard} from "./TablesandTimeFormat";
import {auth, db, storage} from "../CA/firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';


// import React, { Component, useState } from 'react';
// import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
// import {auth, db, storage} from "../CA/firebase";
// import { ActivityIndicator } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AlertIcon from 'react-native-vector-icons/AntDesign';

// export default class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       leads_name: '',
//       sales_username: 'John David',
//       lastRefresh: Date(Date.now()).toString(),
//     }
//     this.refreshScreen = this.refreshScreen.bind(this)
//   }

//   refreshScreen() {
//     this.setState({ lastRefresh: Date(Date.now()).toString() })
//   }

//   componentDidMount() {
//     // this.setState({
//     //   sales_username: this.props.route.params.p1
//     // })
//     this._populateDashboard();
//     this.FocusSubscription = this.props.navigation.addListener(
//       'focus', () => {
//         this._populateDashboard();
//       }
//     );
//   }

//   _populateDashboard() {
//     return fetch('https://poggersfyp.mooo.com/Backend/PopulateSalesDashboard.php')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson
//         })
//       }).catch((error) => {
//         console.error(error);
//       });
//   }

//   navigateToDetail(lN, SN) {
//     this.props.navigation.navigate('Lead Detail',
//       {
//         leads_name: lN,
//         sales_username: SN,
//       })
//   }

//   navigateToRemarks(LD, status) {
//     if (status == "Lose") {
//       this.props.navigation.navigate('Remarks',
//         {
//           leads_id: LD
//         })
//     } else {
//       this.props.navigation.navigate('Set Quotation Agreed',
//         {
//           leads_id: LD
//         })
//     }
//   }

//   _setContactedStatus(LD, status, LS, QS) {
//     if (LS == 'Open') {
//       if (QS == "") {
//         if (status != "Yes") {
//           status = "Yes"
//           Alert.alert(
//             "Confirmation",
//             "Change lead's status to Contacted?",
//             [
//               {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//               },
//               { text: 'Confirm', onPress: () => this._updateLeadStatus(LD, status) }
//             ],
//             { cancelable: false }
//           );
//         } else {
//           status = "No"
//           Alert.alert(
//             "Confirmation",
//             "Change lead's status from 'Yes' to 'No'?",
//             [
//               {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//               },
//               { text: 'Confirm', onPress: () => this._updateLeadStatus(LD, status) }
//             ],
//             { cancelable: false }
//           );
//         }
//       }
//       else {
//         Alert.alert("Warning", "You can't change the contacted status if you have sent a quotation to the lead!");
//       }
//     }
//     else {
//       Alert.alert("Warning", "You can't change a " + LS + " lead status")
//     }
//   }

//   _updateLeadStatus(leadsID, updatedStatus) {
//     const url = 'https://poggersfyp.mooo.com/Backend/updateContactStatus.php';
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
//         this._populateDashboard();
//         this.refreshScreen();
//       }).catch((error) => {
//         console.log(error)
//       });
//   }

//   updateQuotation(leadsID, contactStatus, leadStatus) {
//     if (contactStatus != "Yes" && leadStatus == "Open") {
//       Alert.alert("Alert", "Contact this lead before deciding the amount of quotation sent")
//     }
//     else if (leadStatus != "Open") {
//       Alert.alert("Alert", "You can't change a " + leadStatus + " lead's quotation");
//     } else {
//       this.props.navigation.navigate('Set Quotation Sent',
//         {
//           leads_id: leadsID
//         })
//     }
//   }

//   setLeadStatus() {
//     Alert.alert(
//       "Confirmation",
//       "Please set the lead's status in the lead's detail page before setting up the remarks!"
//     );
//   }

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <ActivityIndicator />
//         </View>
//       )
//     }
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.areaTitle}>
//           <Text style={styles.title}>DASHBOARD</Text>
//           <Icon name="refresh" size={25} color={'black'} style={{ marginTop: 20 }} onPress={() => this.refreshScreen()} />
//         </View>
//         <View style={styles.header}>
//           <Text style={styles.fontSetting1}>Leads</Text>
//           <Text style={styles.fontSetting2}>Contacted</Text>
//           <Text style={styles.fontSetting2}>Quote Sent</Text>
//           <Text style={styles.fontSetting2}>Won / Lost</Text>
//         </View>
//         <FlatList
//           data={this.state.dataSource}
//           renderItem={({ item }) =>
//             <View style={styles.cardView}>
//               <Text style={styles.firstCol}
//                 onPress={() => this.navigateToDetail(item.lead_name, this.sales_username)}>{item.lead_name}   ({item.lead_company})</Text>

//               {item.Contacted == 'Yes' ?
//                 <Icon onPress={() => this._setContactedStatus(item.lead_id, item.Contacted, item.status, item.Quote_Sent)}
//                   name="done" size={20} color={'green'} style={styles.SecColtrue} />
//                 : item.Contacted == 'No' ?
//                   <Icon onPress={() => this._setContactedStatus(item.lead_id, item.Contacted, item.status, item.Quote_Sent)}
//                     name="close" size={20} color={'red'} style={styles.SecCol} />
//                   :
//                   <TouchableOpacity style={styles.SecCol} onPress={() =>
//                     this._setContactedStatus(item.lead_id, item.Contacted, item.status, item.Quote_Sent)} />
//               }

//               {item.Quote_Sent == "" ?
//                 <Text style={styles.SecColtrue} onPress={() => this.updateQuotation(item.lead_id, item.Contacted, item.status)}></Text>
//                 :
//                 <Text style={styles.SecColtrue}
//                   onPress={() => this.updateQuotation(item.lead_id, item.Contacted, item.status)}>RM{item.Quote_Sent}</Text>
//               }

//               {item.status == 'Won' && item.Quote_Agreed != "" ?
//                 <Text style={styles.SecColtrue}
//                   onPress={() => this.navigateToRemarks(item.lead_id, item.status)}>
//                   {item.status} (RM{item.Quote_Agreed})</Text>
//                 :
//                 item.status == 'Won' && item.Quote_Agreed == "" ?
//                   <Text style={styles.SecColtrue}
//                     onPress={() => this.navigateToRemarks(item.lead_id, item.status)}>
//                     {item.status} <AlertIcon name="exclamationcircleo" size={15} color="red" style={styles.icon} /></Text>
//                   :
//                   item.status == 'Lose' && item.remarks == "" ?
//                     <Text style={styles.SecCol}
//                       onPress={() => this.navigateToRemarks(item.lead_id, item.status)}>
//                       {item.status} <AlertIcon name="exclamationcircleo" size={15} color="red" style={styles.icon} /></Text>
//                     :
//                     item.status == 'Lose' && item.remarks != "" ?
//                       <Text style={styles.SecCol}
//                         onPress={() => this.navigateToRemarks(item.lead_id, item.status)}>
//                         {item.status}</Text>
//                       :
//                       <Text style={styles.SecColneutral}
//                         onPress={() => this.setLeadStatus()}></Text>
//               }
//             </View>
//           }
//         />
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     paddingTop: 30,
//     backgroundColor: '#fff',
//   },
//   areaTitle: {
//     flexDirection: 'row'
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 18,
//     paddingTop: 20,
//     paddingBottom: 10,
//     paddingLeft: 5,
//     flex: 1
//   },
//   cardView: {
//     marginLeft: 5,
//     marginRight: 5,
//     flexDirection: 'row',
//     borderColor: 'black',
//     borderWidth: 1,
//     borderTopWidth: 0,
//     textAlign: 'center'
//   },
//   header: {
//     marginLeft: 5,
//     marginRight: 5,
//     flexDirection: 'row',
//     borderColor: 'black',
//     borderWidth: 1,
//     backgroundColor: 'lightgrey',
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//   },
//   SecCol: {
//     width: '23%',
//     borderLeftColor: 'black',
//     borderLeftWidth: 1,
//     padding: 5,
//     textAlign: 'center',
//     color: '#ff0000'
//   },
//   firstCol: {
//     fontSize: 12,
//     width: '30%',
//     padding: 5,
//     textAlign: 'left',
//     paddingLeft: 15,
//   },
//   fontSetting1: {
//     color: 'black',
//     fontSize: 13,
//     width: '30%',
//     padding: 5,
//     textAlign: 'center',
//     fontWeight: 'bold'
//   },
//   fontSetting2: {
//     color: 'black',
//     fontSize: 13,
//     width: '23%',
//     padding: 5,
//     textAlign: 'center',
//     borderColor: 'black',
//     borderLeftWidth: 1,
//     fontWeight: 'bold'
//   },
//   SecColtrue: {
//     width: '23%',
//     borderLeftColor: 'black',
//     borderLeftWidth: 1,
//     padding: 5,
//     textAlign: 'center',
//     color: '#008000'
//   },
//   SecColneutral: {
//     fontSize: 12,
//     width: '23%',
//     borderLeftColor: 'black',
//     borderLeftWidth: 1,
//     padding: 5,
//     textAlign: 'left',
//   },
//   icon: {
//     padding: 5,
//     marginTop: 2,
//     marginLeft: 5
//   }
// });

export default ({navigation, route}) => {

  var data = db.collection("users");
  
  const [username, setUsername]=useState("");
  const [leads,setLeads]=useState([]);
  
  
  useEffect(() => {
      
    var user=auth.currentUser
    console.log(user)
    // if(user){
      // console.log(user.uid)
      // db.collection("users").where("UID", "==",user.uid)
      db.collection("users").where("UID", "==",user.uid)
      .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              db.collection("leads").where("userId", "==", doc.id)
              .onSnapshot((querySnapshot) => {
                let leadsArr= [];
                  querySnapshot.forEach((docLeads) => {
                      let leads = docLeads.data();
                      leads.id = docLeads.id;
                      leadsArr.push(leads);
                      // doc.data() is never undefined for query doc snapshots
                      console.log(docLeads.id, " => ", docLeads.data());
                  });
                  setLeads(leadsArr)
                  console.log("LeadsArr:"+ JSON.stringify(leadsArr));
              })
              // .catch((error) => {
              //     console.log("Error getting documents: ", error);
              // });
              
              console.log(doc.id, " => ", doc.data());
              setUsername(doc.data().name)
          });
       })
      // .catch((error) => {
      //     console.log("Error getting documents: ", error);
      // });

      LogBox.ignoreLogs(['Setting a timer']);
  // }
  // },[leads]);
},[]);
  
    const pressWon=()=>{
      alert("Set Quotation Agreed. js")
      navigation.navigate("Set Quotation Agreed");
    }
  
    const pressLost=()=>{
      alert("Lost nav Remarks. js")
      navigation.navigate("Remarks");
    }
  
    const pressQuote=()=>{
      alert("nav setQuotationSend .js")
      navigation.navigate("Set Quotation Sent");
    }
  
    const pressLead=()=>{
      alert("nav LeadsDetails .js")
      navigation.navigate("Details");
    }
  
    const pressNotification=()=>{
      alert("nav to Notification .js ");
      navigation.navigate('Notification');
  
    }

    return (    
      <View style={styles.container}> 
          {/* <Text>{username}</Text> */}
          {/* <ImageBackground source={require('./img/backgroundImg.png')}  style={styles.bgimage}> */}
          {/* <View style={styles.DashboardtitleContainer}>
          <Text style={styles.titleDashboard}>Dashboard</Text>
          <TouchableOpacity style={{marginLeft:10, padding:1}} onPress={pressNotification}>
          <Icon name='notifications' size={25}  color="orange"/> 
          </TouchableOpacity>
          </View> */}
    
    <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius:10, margin:"5%"}}>
    <Text style={styles.title}>DASHBOARD</Text>
    
        <View style={{paddingBottom:40, paddingTop:10}}>
            <View style={{ backgroundColor:"#fff",  marginHorizontal:15, borderWidth:1, borderColor:"black", elevation: 2, borderTopWidth:1}}>
    
                <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"black", backgroundColor:"lightgrey", paddingHorizontal:10,height:40}}>
                    <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color:"black", fontWeight:"bold",justifyContent:"center",alignItems:"center",textAlign:"center",borderRightWidth:1,paddingTop:10}}>
                        Name
                    </Text>
                    <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"center",justifyContent:"center",alignItems:"center",textAlign:"center", borderRightWidth:1,paddingTop:10}}>
                        Contacted
                    </Text>
                    <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "black", fontWeight:"bold",textAlign:"center",justifyContent:"center",alignItems:"center",textAlign:"center", borderRightWidth:1,paddingTop:10}}>
                        Quote Sent
                    </Text>
                    <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "balck", fontWeight:"bold",textAlign:"center", justifyContent:"center",alignItems:"center",textAlign:"center",paddingTop:10}}>
                        Status
                    </Text>
                </View>
    
                {/* <View style={{flexDirection:"row",borderTopWidth:1,  borderColor:"lightgrey", paddingHorizontal:10, paddingTop:2, marginBottom:3, alignItems:"center", height:myheight}}>
    
                  <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
                   onPress={pressLead}>
                  <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "grey", fontWeight:"bold",textAlign:"center"}}  numberOfLines={1}>
                        Siti Nur Alliahkjsdfsfsdfdsf sf dsfs fsf fd</Text><Text style={{fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"center"}}> Google.Co</Text>
                  
                  </TouchableOpacity>
    
                  <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"center"}}>
                        Contacted
                  </Text>
                    
    
                  <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
                   onPress={pressQuote}>
                  <Text style={{flex:0.25,fontSize: 13, paddingVertical: 2, color: "orange", fontWeight:"bold",textAlign:"center"}}>
                        RM 12000
                  </Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity style={{flex:0.25,fontSize: 13, paddingVertical: 2, fontWeight:"bold",textAlign:"center"}}
                    onPress={pressLost}>
                  <Text style={{color: "red", fontWeight:"bold", textAlign:"center",width:"100%"}}>
                        Lost
                  </Text>
                  </TouchableOpacity>
                </View> */}
    
                {leads.map((info) =>
                    <TableRowDashboard key={info.id} data={info} navigation={navigation} handlePressLead={pressLead} handlePressQuote={pressQuote} handlePressLost={pressLost} handlePressWon={pressWon}/>
                )}
    
    
                </View>
          {/* <StatusBar style="auto" /> */}
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
      </View>
        );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        // justifyContent: 'center',
        //padding:"20%"
      },

      title: {
            fontWeight: "bold",
            fontSize: 18,
            paddingTop: 20,
            paddingBottom: 10,
            paddingLeft: 5,
            flex: 1
          },
    
      DashboardtitleContainer:{
        marginTop:10,
        flexDirection:"row",
        justifyContent:"center"
      },
    
      titleDashboard:{
        fontWeight:"bold",
        fontSize:20,
        color:"black",
        alignItems:"flex-start",
      },
    
      bgimage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "flex-start"
      },
    });
    