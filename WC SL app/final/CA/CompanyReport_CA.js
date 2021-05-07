import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import {auth, db, storage} from "../components/firebase";
// import { PieChart } from 'react-native-svg-charts';
export default class ListofCompany extends Component {
    state=
    {
        sl:0,
        leads:0,
        won:0,
        lose:0,
    }

    componentDidMount() {
        this.totalNumberofSalesperson();
        this.totalNumberofWonLeads();
        this.totalNumberofLeads();
        this.totalNumberofLostLeads();
    }


    totalNumberofSalesperson() {
        var employeeData = db.collection("users").where("role", "==", "Salesperson").where("companyID", "==", "V4d1aKlbbQa9HXMPX6A1");
        employeeData.onSnapshot((querySnapShot) => {
            this.setState({ sl: querySnapShot.docs.length });
        });
    }

    totalNumberofWonLeads() {
        var employeeData = db.collection("leads").where("result", "==", "Won").where("companyID", "==", "V4d1aKlbbQa9HXMPX6A1");
        employeeData.onSnapshot((querySnapShot) => {
            this.setState({ won: querySnapShot.docs.length });
        });
    }

    totalNumberofLeads(){
        var employeeData = db.collection("leads").where("companyID", "==", "V4d1aKlbbQa9HXMPX6A1");
        employeeData.onSnapshot((querySnapShot) => {
            this.setState({ leads: querySnapShot.docs.length });
        });
    }

    totalNumberofLostLeads(){
        var employeeData = db.collection("leads").where("result", "==", "Lose").where("companyID", "==", "V4d1aKlbbQa9HXMPX6A1");
        employeeData.onSnapshot((querySnapShot) => {
            this.setState({ lose: querySnapShot.docs.length });
        });
    }

    render() {
        // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
 
        // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
 
        // const pieData = data
        //     .filter((value) => value > 0)
        //     .map((value, index) => ({
        //         value,
        //         svg: {
        //             fill: randomColor(),
        //             onPress: () => console.log('press', index),
        //         },
        //         key: `pie-${index}`,
        //     }))
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Company Report')}
                        style={styles.cardActive}>
                        <Text style={styles.activeTitle}>Company Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('List of Salesperson')}
                        style={styles.nav}>
                        <Text style={styles.navTitle}>Salesperson Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Leads Report')}
                        style={styles.nav}>
                        <Text style={styles.navTitle}>Leads Report</Text>
                    </TouchableOpacity>
                </View>
                {/* <View
            style={{
              paddingVertical: 15,
              flexDirection: 'row',
              width: 350,
              justifyContent: 'space-between',
            }}
          >
            <Pie
              radius={80}
              innerRadius={60}
              sections={[
                {
                  percentage: 10,
                  color: '#C70039',
                },
                {
                  percentage: 20,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              dividerSize={4}
              strokeCap={'round'}
            />
            </View> */}

                <View style={styles.pieChartArea}>
                {/* <PieChart style={{ height: 200 }} data={pieData}/> */}
                </View>
                <View style={{ marginLeft: 20 }}>
                    <View style={styles.Direction}>
                        <Text style={styles.TextSalesperson}>Total Number of Salesperson</Text>
                        <Text style={styles.Salesperson}>{this.state.sl}</Text>
                    </View>
                    <View style={styles.Direction}>
                        <Text style={styles.TextLeads}>Total Number of Leads</Text>
                        <Text style={styles.Leads}>{this.state.leads}</Text>
                    </View>
                    <View style={styles.Direction}>
                        <Text style={styles.WonLeadNo}>Total Number of Won Leads</Text>
                        <Text style={styles.Won}>{this.state.won}</Text>
                    </View>
                    <View style={styles.Direction}>
                        <Text style={styles.LostLeadNo}>Total Number of Lost Leads</Text>
                        <Text style={styles.Lost}>{this.state.lose}</Text>
                    </View>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        marginTop: 10
    },
    nav: {
        margin: 5,
        backgroundColor: 'lightgrey',
        padding: 5,
        textAlign: 'center',
        borderRadius: 5
    },
    navTitle: {
        fontSize: 12
    },
    cardActive: {
        margin: 5,
        backgroundColor: 'black',
        padding: 5,
        width: '20%',
        textAlign: 'center',
        borderRadius: 5
    },
    activeTitle: {
        color: 'white',
        fontSize: 12
    },
    pieChartArea: {
        height: '30%',
        borderColor: 1,
        borderWidth: 1,
        width: '60%',
        alignSelf: 'center'
    },
    Direction: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'baseline',
    },
    Text: {
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey',
        marginRight: 65,
    },
    TextAdmin: {
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey',
    },
    TextSalesperson: {
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey',
        marginRight: 25
    },
    TextLeads: {
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey',
        marginRight: 59
    },
    WonLeadNo: {
        marginRight: 32,
        marginTop: 2.5,
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey'
    },
    LostLeadNo: {
        marginRight: 34,
        marginTop: 2.5,
        marginLeft: 17,
        fontSize: 14,
        marginBottom: 5,
        fontSize: 12,
        color: 'grey'
    },
    User: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#dcdcdc',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
    },
    Admin: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#ffdead',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
    },
    Salesperson: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#f4a460',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5
    },
    Leads: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#a0522d',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5
    },
    Won: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#32cd32',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5
    },
    Lost: {
        marginTop: 2.5,
        marginStart: 35,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#ff0000',
        width: '15%',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5
    },
});