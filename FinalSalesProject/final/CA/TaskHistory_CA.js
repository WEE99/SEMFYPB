import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { auth, db, storage } from "./firebase";

export default class TaskHistory_CA extends Component {
  state = {
    History: []
  }

  componentDidMount(){
    let history = [];
    var historyData = db.collection("tasks")
    historyData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        history.push(doc.data());
      });
      this.setState({ History : history});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.History}
          renderItem={({ item }) => (
            <View>
              <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>

                  <View style={styles.historyView}>
                    <Text style={styles.historyContent}> {item.title} </Text>
                    <Text style={styles.historyContent}> | </Text>
                    <Text style={styles.historyContent}> {new Date(item.date.toDate()).toDateString() }</Text>
                    <Text style={styles.historyContent}> - </Text>
                    <Text style={styles.historyContent}>{item.name}</Text>
                  </View>
{/* 
                  <View style={styles.historyView}>
                    <Text style={styles.historyContent}> Other </Text>
                    <Text style={styles.historyContent}> | </Text>
                    <Text style={styles.historyContent}> 05/09/2020</Text>
                    <Text style={styles.historyContent}> - </Text>
                    <Text style={styles.historyContent}>Wee Chien </Text>
                  </View>

                  <View style={styles.historyView}>
                    <Text style={styles.historyContent}> Other </Text>
                    <Text style={styles.historyContent}> | </Text>
                    <Text style={styles.historyContent}> 05/09/2020</Text>
                    <Text style={styles.historyContent}> - </Text>
                    <Text style={styles.historyContent}> Aliah </Text>
                  </View>


                  <View style={styles.historyView}>
                    <Text style={styles.historyContent}> Other </Text>
                    <Text style={styles.historyContent}> | </Text>
                    <Text style={styles.historyContent}> 05/09/2020</Text>
                    <Text style={styles.historyContent}> - </Text>
                    <Text style={styles.historyContent}> Cheyenne </Text>
                  </View> */}

                </ScrollView>
              </SafeAreaView>
              <StatusBar style="auto" />
            </View>

          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: "10%",
  },

  safeArea:{
      backgroundColor: '#fff',
      paddingRight: "3%",
      paddingLeft: "3%",
      paddingBottom: "5%"
  },

  historyView: {
    backgroundColor: "lightgrey",
    marginTop: 10,
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
  },

  historyContent: {
    flexDirection: "row",

    //fontWeight:"bold",

  },
});
