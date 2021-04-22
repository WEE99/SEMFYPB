import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Platform,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Feather';

export default ({navigation, route}) => {


const {address,date,description,LeadId,name,notes,outcome,status,title,call,userId} = route.params;

console.log("CallTaskDetail: "+ name +" "+title)
//export default class SalesPersonAccount extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         leads_name: '',
    //         sales_username: '',
    //         task_id: ''
    //     }
    // }

    // componentDidMount() {
    //     this.setState({
    //         leads_name: this.props.route.params.leads_name,
    //         sales_username: this.props.route.params.sales_username,
    //         task_id: this.props.route.params.task_Id
    //     });
    //     this._TaskDetails();
    //     this.FocusSubscription = this.props.navigation.addListener(
    //         'focus', () => {
    //             this._TaskDetails();
    //         }
    //     )
    // }

    // dialCall = () => {
    //     let phoneNumber = '';

    //     if (Platform.OS === 'android') {
    //         phoneNumber = 'tel:${phoneNumber}';
    //     }
    //     else {
    //         phoneNumber = 'telprompt:${phoneNumber}';
    //     }

    //     Linking.openURL(phoneNumber);
    // }

    // _TaskDetails() {
    //     return fetch(`https://poggersfyp.mooo.com/Backend/retrieveTaskDetails.php?task_id=${encodeURIComponent(this.props.route.params.task_Id)}`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 dataSource: responseJson
    //             });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    // _deleteTask(task_id) {
    //     const url = 'https://poggersfyp.mooo.com/Backend/deleteTask.php';
    //     fetch(url,
    //         {
    //             method: 'POST',
    //             headers:
    //             {
    //                 'Origin': '*',
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     id: task_id
    //                 })

    //         }).then((response) => response.json()).then((responseJsonFromServer) => {
    //             alert(responseJsonFromServer);
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     this.props.navigation.navigate("Lead Detail");
    // }

    // createDeleteAlert(task_id) {
    //     Alert.alert(
    //         "Confirmation",
    //         "Are you sure you want to delete this task?",
    //         [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "cancel"
    //             },
    //             { text: task_id, onPress: () => this._deleteTask(task_id) }
    //         ],
    //         { cancelable: false }
    //     );
    // }


return (
    
    <ScrollView>
        <View style={{ flex: 1,padding: '5%',}}>
            <Text style={styles.title}> {title.toUpperCase()}'S DETAIL</Text>
        

        <View  style={styles.LeadsContainer}>
        <View style={styles.row}>
          <Text style={styles.details}>Date</Text>
          <Text style={styles.info} >{date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.details}>With</Text>
          <Text style={styles.info} >{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.details}>Notes</Text>
          {notes!==""?
          <Text style={styles.info} >{notes}</Text>: <Text style={styles.info} >-</Text>}
        </View> 


        </View>
        </View>



    </ScrollView>
)

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
        flex: 1,
        paddingLeft:20
      },
    
    
      details: {
            width: "30%",
            color: "grey"
        },
            
      info: {
            fontWeight: "bold",
            width: '50%',
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


});