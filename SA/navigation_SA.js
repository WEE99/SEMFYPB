import {View} from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';

import OverallReport from './layout/OverallReport.js';
import CompanyList from './layout/CompanyReport_List.js';
import SalespersonList from './layout/SalespersonReport_List.js';
import Profile from './layout/Profile_SA.js';
import LeadProfile from './layout/LeadDetails.js';

import OverallOpen from './layout/Overall_OpenLeads.js';
import OverallWon from './layout/Overall_WonLeads.js';
import OverallLost from './layout/Overall_LostLeads.js';

import PerCompanyReport from './layout/CompanyReport_Overall.js';
import OpenLead_Company from './layout/CompanyReport_OpenLeads.js';
import WonLead_Company from './layout/CompanyReport_WonLeads.js';
import LostLead_Company from './layout/CompanyReport_LostLead.js';
import CompanyAdminProfile from './layout/CompanyAdminProfile.js';

import SalespersonProfile from './layout/SalespersonProfile.js';
import OverallReport_Salesperon from './layout/SalespersonReport_Overall.js';
import OpenLead_Salesperson from './layout/SalespersonReport_OpenLead.js';
import WonLead_Salesperson from './layout/SalespersonReport_WonLeads.js';
import LostLead_Salesperson from './layout/SalespersonReport_LostLead.js';

const BottomTab = createBottomTabNavigator();
const ReportStack = createStackNavigator();
const AccountStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const OverallLeadTopTab = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Overall"
      tabBarOptions={{
        activeTintColor: '#F8C018',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          position: 'absolute',
          top: 45,
          left: 110,
          right: 0,
          width: '50%',
          alignSelf: 'center'
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >

      <TopTab.Screen
        name="Open"
        component={OverallOpen}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />
      <TopTab.Screen
        name="Won"
        component={OverallWon}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

      <TopTab.Screen
        name="Lost"
        component={OverallLost}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

    </TopTab.Navigator>
  )
}

const SalespersonTopTab = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: '#F8C018',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          position: 'absolute',
          top: 45,
          left: 145,
          right: 0,
          width: '30%',
          alignSelf: 'center'
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >

      <TopTab.Screen
        name="Profile"
        component={SalespersonProfile}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />
      <TopTab.Screen
        name="Overall"
        component={OverallReport_Salesperon}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

    </TopTab.Navigator>
  )
}

const SalespersonReportTopTab = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Open"
      tabBarOptions={{
        activeTintColor: '#F8C018',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          position: 'absolute',
          top: 45,
          left: 110,
          right: 0,
          width: '50%',
          alignSelf: 'center'
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >

      <TopTab.Screen
        name="Open"
        component={OpenLead_Salesperson}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />
      <TopTab.Screen
        name="Won"
        component={WonLead_Salesperson}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

      <TopTab.Screen
        name="Lost"
        component={LostLead_Salesperson}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

    </TopTab.Navigator>
  )
}

const CompanyTopTab = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#F8C018',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          position: 'absolute',
          top: 45,
          left: 110,
          right: 0,
          width: '50%',
          alignSelf: 'center'
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >

      <TopTab.Screen
        name="Open"
        component={OpenLead_Company}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />
      <TopTab.Screen
        name="Won"
        component={WonLead_Company}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

      <TopTab.Screen
        name="Lost"
        component={LostLead_Company}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

    </TopTab.Navigator>
  )
}

const OverallReportTopTab = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Overall"
      tabBarOptions={{
        activeTintColor: '#F8C018',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        style: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          position: 'absolute',
          top: 45,
          left: 110,
          right: 0,
          width: '50%',
          alignSelf: 'center'
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >

      <TopTab.Screen
        name="Overall"
        component={OverallReport}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />
      <TopTab.Screen
        name="Company"
        component={CompanyList}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

      <TopTab.Screen
        name="Salesperson"
        component={SalespersonList}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <View>
              <Icon3 name="circle" color={color} size={11} focused={focused} />
            </View>
          )
        }}
      />

    </TopTab.Navigator>
  )
}

const BottomTabNav = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Report"
        tabBarOptions={{
          activeTintColor: '#F8C018',
          inactiveTintColor: 'white',
          style: {
            backgroundColor: 'black',
            borderColor: 'black'
          },
          indicatorStyle: {
            backgroundColor: 'transparent',
            borderColor: 'black'
          },
        }}
      >
        <BottomTab.Screen
          name="Report"
          component={ReportStackNav}
          options={{
            tabBarLabel: 'Report',
            tabBarIcon: ({ color, focused }) => (
              <Icon name="piechart" color={color} size={26} focused={focused} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Account"
          component={AccountStackNav}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <Icon2 name="circle" color={color} size={26} focused={focused} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

function ReportStackNav() {
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <ReportStack.Screen name="TopNav1" component={OverallReportTopTab} />
      <ReportStack.Screen name="TopNav2" component={CompanyTopTab} />
      <ReportStack.Screen name="TopNav3" component={SalespersonTopTab} />
      <ReportStack.Screen name="TopNav4" component={SalespersonReportTopTab} />
      <ReportStack.Screen name="TopNav5" component={OverallLeadTopTab} />
      <ReportStack.Screen name="Overall Company Report" component={PerCompanyReport} />
      <ReportStack.Screen name="CA Profile" component={CompanyAdminProfile} />
      <ReportStack.Screen name="Lead Profle" component={LeadProfile} />
    </ReportStack.Navigator>
  )
}

function AccountStackNav() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <AccountStack.Screen name="Account" component={Profile} />
    </AccountStack.Navigator>
  )
}

export default BottomTabNav;

