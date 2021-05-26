import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component} from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, 
  FlatList, TouchableOpacity,LogBox } from 'react-native';
import {auth, db, storage} from "../components/firebase";
import {orange, TableRowDashboard, TableRowTask, TableHistoryTask} from "./TablesandTimeFormat";
  
export default ({navigation, route}) => {

  var data = db.collection("users");
  
  const [username, setUsername]=useState("");
  const [TaskHistory,setTaskHistory]=useState([]);

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
    
    db.collection("users").where("UID", "==",user.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
    db.collection("tasks").where("status", "==", "Completed").where("userId", "==",doc.id).orderBy("date", "desc")
    .onSnapshot((querySnapshot) => {
      let TaskHistoryArr= [];
        querySnapshot.forEach((docTasks) => {
            let tasks = docTasks.data();
            tasks.id = docTasks.id;
            tasks.time = formatAMPM(tasks.date.toDate());
  
            var m = tasks.date.toDate().getMonth()
            tasks.date = monthArr[m] + " "+ tasks.date.toDate().getDate() + ", " + tasks.date.toDate().getFullYear();

  
            TaskHistoryArr.push(tasks);
            // doc.data() is never undefined for query doc snapshots
            console.log(docTasks.id, " => ", docTasks.data());
        });
        setTaskHistory(TaskHistoryArr);
        console.log(TaskHistoryArr);
    })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });
  });
})
.catch((error) => {
    console.log("Error getting documents: ", error);
});

LogBox.ignoreLogs(['Setting a timer']);
  },[]);

    return (
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>
          <Text style={styles.title}>TASK HISTORY</Text>
           <SafeAreaView>

           <View>
                {TaskHistory.map((info) =>
                      <TableHistoryTask key={info.id} data={info} navigation={navigation}/>
                  )}
          </View>
         
          </SafeAreaView>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
  }
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 5,
    marginBottom: 5
  },
  TaskTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 20,
    marginStart: 15,
    fontWeight: 'bold'
  },
  Date: {
    marginStart: 5,
  },
  card: {
    margin: 5,
    borderRadius: 10,
  },
  TaskCompleted: {
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 10,
    flex: 1,
    borderRadius: 10,
  }
});
