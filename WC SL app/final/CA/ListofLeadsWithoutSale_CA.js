import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from "../components/firebase";

export default class ListofUnassignedLeads extends Component {
    state = {
        LeadListWithoutSalesperson:[]
    }
    
    componentDidMount(){
        this.leadList();
    }

    leadList(){
        var user=auth.currentUser
        console.log(user)
        db.collection("users").where("UID", "==",user.uid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("leads").where("userId", "==", "")
                .onSnapshot((querySnapshot) => {
                  let leadsArr= [];
                    querySnapshot.forEach((docLeads) => {
                        let leads = docLeads.data();
                        leads.id = docLeads.id;
                        leadsArr.push(leads);
                        console.log(docLeads.id, " => ", docLeads.data());
                    });
                    this.setState({ LeadListWithoutSalesperson: leadsArr });
                    console.log("LeadsArr:"+ JSON.stringify(leadsArr));
                })
                console.log(doc.id, " => ", doc.data());
            });
          })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: '10%' }}>
                <ScrollView>
                    <FlatList
                        data={this.state.LeadListWithoutSalesperson}
                        renderItem={({ item }) =>

                            <Card style={styles.card} onPress={() => this.props.navigation.navigate('Leads Without Salesperson', {paramName: item.name, paramEmail:item.email, paramContact: item.contactNumber, paramInterest:item.interest, paramCompany:item.company, paramComment: item.comment, paramId: item.UID})}>
                                <View style={styles.cardView}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.Name}>{item.name}  ({item.company})</Text>
                                    </View>
                                    <View style={{ justifyContent: "flex-end" }}>
                                        <Icon name="right" size={15} style={styles.icon} onPress={() => this.props.navigation.navigate('Leads Without Salesperson')} />
                                    </View>
                                </View>
                            </Card>
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayContainer: {
        flexDirection: 'row',
    },
    profileImg: {
        borderRadius: 50,
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
        paddingStart: 6
    },
    card: {
        margin: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 10
    },
    cardView: {
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10
    },
    texts: {
        marginLeft: 10
    },
    Name: {
        fontSize: 14
    },
    CompanyName: {
        fontSize: 14,
        marginLeft: 10,
    },
    icon: {
        paddingTop: 3,
        paddingLeft: 5,
        textAlign: 'right',
        paddingRight: 5
    }
})