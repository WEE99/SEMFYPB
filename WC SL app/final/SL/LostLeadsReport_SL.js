
import AlertIcon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, ScrollView,LogBox} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {auth, db, storage} from "../CA/firebase";
import {orange, TableRowDashboard, TableRowLost} from "./TablesandTimeFormat";



export default ({navigation, route}) => {

  const [leads,setLeads]=useState([]);
  

  useEffect(() => {
      
    var user=auth.currentUser
    console.log(user)
    // if(user){
      // console.log(user.uid)
      // db.collection("users").where("UID", "==",user.uid)
      db.collection("users").where("UID", "==","HiVB7rApJqMSbGfLTPEbtVVdvXc2")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              db.collection("leads").where("userId", "==", doc.id).where("result", "==", "Lose")
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
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      LogBox.ignoreLogs(['Setting a timer']);
  // }
  // },[leads]);
},[]);
    // useEffect(() => {
    //   db.collection("leads").where("result", "==", "Lose").where("UID", "==","HiVB7rApJqMSbGfLTPEbtVVdvXc2")
    //   .get()
    //   .then((querySnapshot) => {
    //     let TaskHistoryArr= [];
    //       querySnapshot.forEach((docTasks) => {
    //           let tasks = docTasks.data();
    //           tasks.id = docTasks.id;
    //           tasks.time = formatAMPM(tasks.date.toDate());
    
    //           var m = tasks.date.toDate().getMonth()
    //           tasks.date = monthArr[m] + " "+ tasks.date.toDate().getDate() + ", " + tasks.date.toDate().getFullYear();
  
    
    //           TaskHistoryArr.push(tasks);
    //           // doc.data() is never undefined for query doc snapshots
    //           console.log(docTasks.id, " => ", docTasks.data());
    //       });
    //       setTaskHistory(TaskHistoryArr);
    //       console.log(TaskHistoryArr);
    //   })
    //   .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //   });
    // },[]);
  
    return (
    <ScrollView style={styles.container}>
    
    <View style={{paddingBottom:40, paddingTop:10}}>
        <View style={{ backgroundColor:"#fff",  marginHorizontal:15, borderWidth:1, borderColor:"black", elevation: 2, borderTopWidth:1}}>

            <View style={{flexDirection:"row",borderBottomWidth:1, borderColor:"black", backgroundColor:"lightgrey", paddingHorizontal:10,height:40}}>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2, color:"black", fontWeight:"bold",borderRightWidth:1,paddingTop:10}}>
                    Leads
                </Text>
                <Text style={{flex:0.5,fontSize: 13, paddingVertical: 2,paddingHorizontal:10, color:"black", fontWeight:"bold",paddingTop:10}}>
                    Remarks
                </Text>
            </View>

            
            {leads.map((info) =>
                <TableRowLost key={info.id} data={info} />
            )}


            </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  </ScrollView>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    paddingTop: 30,
    backgroundColor: '#fff',
    marginTop:10
  },
  cardView: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    textAlign: 'center'
  },
  header:{
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize : 16,
    backgroundColor: 'lightgrey'
  },
  SecCol: {
    fontSize: 12,
    width: '40%',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15
  },
  firstCol:{
    fontSize: 12,
    width: '40%',
    padding: 5,
    textAlign: 'left',
    paddingLeft: 15
  },
  icon: {
    padding: 5,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 60
  },
  SecColEmpty: {
    fontSize: 12,
    width: '40%',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
});