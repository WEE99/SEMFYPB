import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { auth, db, storage } from "../components/firebase";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TaskList: [],
    };
  }

  componentDidMount() {
    let taskList = [];
    var taskData = db.collection("tasks").where("status", "==", "Completed")
    taskData.onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        taskList.push(doc.data());
      });
      this.setState({ TaskList: taskList });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.TaskList}
          renderItem={({ item }) => (
            <ScrollView style={styles.scrollView}>
              <View style={styles.historyView}>
                <Text style={styles.historyContent}>{item.title}</Text>
                <Text style={styles.historyContent}> | </Text>
                <Text style={styles.historyContent}></Text>
                <Text style={styles.historyContent}> - </Text>
                <Text style={styles.historyContent}>{item.name} </Text>
              </View>
            </ScrollView>
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
    padding: '5%',
    marginTop: 10
  },

  historyView: {
    backgroundColor: 'lightgrey',
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },

  historyContent: {
    flexDirection: 'row',
  },
});
