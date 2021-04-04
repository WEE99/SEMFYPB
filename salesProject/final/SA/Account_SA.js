import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Settings from 'react-native-vector-icons/AntDesign';

export default class SalesPersonAccount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, padding: '10%', marginTop: 20 }}>
        <Settings
          name="setting"
          size={25}
          style={{ alignSelf: 'flex-end' }}
          onPress={() => this.props.navigation.navigate('Account Settings')}
        />
        <View style={styles.Direction}>
          <Image style={styles.profileImg} source={require('../img/sample.jpg')} />
          <View>
            <Text style={styles.Username}>John David</Text>
            <Text style={styles.designation}>Super Admin</Text>
          </View>
        </View>

      <View>
        <View style={styles.Direction}>
          <Text style={[styles.Text, {marginEnd: 22}]}>Name</Text>
          <Text style={styles.Info} numberOfLine={3}>John David Beckham</Text>
        </View>

        <View style={styles.Direction}>
          <Text style={[styles.Text, { marginEnd: 25 }]}>Email</Text>
          <Text style={styles.Info} numberOfLine={3}>
            abc@gmail.com
          </Text>
        </View>
        <View style={styles.Direction}>
          <Text style={[styles.Text, { marginEnd: 8 }]}>Contact</Text>
          <Text style={styles.Info}>+6 012 345 6789</Text>
        </View>
      </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Direction: {
    flexDirection: 'row',
    marginTop: 10,
  },
  profileImg: {
    borderRadius: 50,
    marginStart: 10,
    marginTop: 2.5,
    height: 70,
    width: 70,
    borderColor: 'black',
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
    marginTop: 5,
    marginBottom: 5,
  },
});
