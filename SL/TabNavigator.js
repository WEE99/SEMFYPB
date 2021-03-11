import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import {auth} from './firebase';
import {useRoute} from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//bottom nav main
import Dashboard from "./Dashboard";
import TaskMainPage from "./TasksMainPage";
import ReportGraph from "./ReportGraph";
import ProfileMain from "./ProfileMain";

//Dashboard
import Notification from "./Notification";
import LeadsDetails from "./LeadsDetails";
import LeadsDetailsTask from "./LeadsDetailsTask";
import Quotation from './Quotation';
import Remarks from './Remarks';
import EditDetails from "./EditDetails";
import NewCallTask from './NewCallTask';
import TasksDetail from "./TasksDetail";
import NewCallTaskEdit from "./NewCallTaskEdit";
//TaskMainPage
import HistoryPage from "./HistoryPage";
import OverdueTask from './OverdueTask';
import CallTask from './CallTask';
import AppointmentTask from './AppointmentTask';
import OtherTask from './OtherTask';
import CallHistory from './CallHistory';
import AppoinmentHistory from './AppointmentHistory';
import OtherHistory from './OtherHistory';

//ReportGraph
import OpenLeads from "./OpenLeads";
import LostLeads from "./LostLeads";
import WonLeads from "./WonLeads";
//ProfileMain
import ProfileSetting from "./ProfileSetting";
import EditNotification from "./EditNotification";
import EditPassword from "./EditPassword";
import LoginPage from "./LoginPage";
import EditProfile from "./EditProfile";
//LoginPage
import ForgotPassword from "./ForgotPassword"
import { orange, white } from './TablesandTimeFormat';


// const DashboardStack = createStackNavigator();
// const TaskStack = createStackNavigator();
// const ReportStack = createStackNavigator();
// const AccountStack = createStackNavigator();

const Stack= createStackNavigator();


const Tab = createBottomTabNavigator()

export const LoginNavigator= () =>{
 
    return(
      <Tab.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeTintColor:orange,
        style: { backgroundColor: 'black' }
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginStackNav}
        options={{tabBarVisible:false}}
      />
    </Tab.Navigator>
    )
  
}


export const TabNavigator= () =>{
//   return <Tab.Navigator>
//     <Tab.Screen name="Dashboard" component={Dashboard}/>
//     <Tab.Screen name="Task" component={TaskMainPage}/>
//     <Tab.Screen name="Report" component={ReportGaph}/>
//     <Tab.Screen name="Account" component={ProfileMain}/>
//     </Tab.Navigator>

// if (auth.currentUser === null){
//   return(
//     <Tab.Navigator
//     initialRouteName="Login"
//     tabBarOptions={{
//       activeTintColor: '#FF8C00',
//       style: { backgroundColor: 'black' }
//     }}
//   >
//     <Tab.Screen
//       name="Login"
//       component={LoginStackNav}
//       options={{tabBarVisible:false}}
//     />
//   </Tab.Navigator>
//   )
// }
// else {

return (
  <Tab.Navigator
    initialRouteName="Dashboard"
    tabBarOptions={{
      activeTintColor:orange,
      style: { backgroundColor: 'black' }
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardStackNav}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Tasks"
      component={TaskStackNav}
      options={{
        tabBarLabel: 'Task',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="briefcase" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Report"
      component={ReportStackNav}
      options={{
        tabBarLabel: 'Report',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chart-pie" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountStackNav}
      options={{
        tabBarLabel: 'Account',
        //tabBarVisible: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} style={{ transform: [{ rotateY: '180deg' }] }} />
        ),
      }}
    />
  </Tab.Navigator>

);
}
//}


function DashboardStackNav ({ navigation, route }) {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Quotation" || routeName ==="Remarks" || routeName ==="Edit Details" || routeName ==="New Call Task" || routeName ==="Task Detail" ||routeName ==="Edit Task"){
            navigation.setOptions({tabBarVisible: false});
        }else {
            navigation.setOptions({tabBarVisible: true});
        }
    }, [navigation, route]); 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard}
      options={({ navigation,route }) => ({
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerRight: () => (
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{backgroundColor:orange,borderRadius:100, padding:5,alignContent:"center", marginRight:60}}  onPress={() => navigation.navigate('Notification')}>
          {/* <Icon
              style={{
               marginRight:60
              }}
              name="notifications"
              size={25}
              color={orange}
              // onPress={() => navigation.navigate('Notification')}
          /> */}
          <MaterialIcons name="notifications-active" size={24} borderColor="black" />
          </TouchableOpacity>
          </View>
      ),
    })}
     />
      <Stack.Screen name="Notification" component={Notification}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Details" component={LeadsDetails}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Tasks" component={LeadsDetailsTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Edit Details" component={EditDetails}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Quotation" component={Quotation}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Remarks" component={Remarks}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
       <Stack.Screen name="Task Detail" component={TasksDetail}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="New Call Task" component={NewCallTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Edit Task" component={NewCallTaskEdit}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />


    </Stack.Navigator>
  )
}


function TaskStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TaskMainPage}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      <Stack.Screen name="Tasks History" component={HistoryPage}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Overdue Task" component={OverdueTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Call Task" component={CallTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Appointment Task" component={AppointmentTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Other Task" component={OtherTask}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
       <Stack.Screen name="Call History" component={CallHistory}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
       <Stack.Screen name="Appointment History" component={AppoinmentHistory}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
       <Stack.Screen name="Other History" component={OtherHistory}
      options={{
        headerStyle:{backgroundColor:"black"},
        // headerLeft: null,
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
    </Stack.Navigator>
  )
}


function ReportStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Report" component={ReportGraph}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      <Stack.Screen name="Open Leads" component={OpenLeads}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Lost Leads" component={LostLeads}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
      <Stack.Screen name="Won Leads" component={WonLeads}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }} />
    </Stack.Navigator>
  )
}

function AccountStackNav ({ navigation, route }) {
  React.useLayoutEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === "Logout" || routeName ==="Password" || routeName==="Notifications" || routeName==="Edit Profile"){
          navigation.setOptions({tabBarVisible: false});
      }else {
          navigation.setOptions({tabBarVisible: true});
      }
  }, [navigation, route]); 

  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={ProfileMain}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerRight: () => (
          <View style={{flexDirection:"row"}}>
          <MaterialCommunityIcons
              style={{
               marginRight:10
              }}
              name="cog-outline"
              size={25}
              color="lightgrey"
              onPress={() => navigation.navigate("Settings")}
          />
          </View>
      ),
      }}/>
      <Stack.Screen name="Settings" component={ProfileSetting}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      <Stack.Screen name="Notifications" component={EditNotification}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      <Stack.Screen name="Password" component={EditPassword}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      <Stack.Screen name="Edit Profile" component={EditProfile}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/>
      {/* <AccountStack.Screen name="Logout" component={LoginPage}
      options={{
        headerStyle:{backgroundColor:"black"},
        headerTitleAlign:"center",
        headerTintColor:"white",
      }}/> */}
      <Stack.Screen options={{headerShown: false, tabBarVisible: false}} name="Logout" component={LoginPage} />
    </Stack.Navigator>
  )
}


function LoginStackNav() {
  return (
    <Stack.Navigator>
       <Stack.Screen options={{headerShown: false, tabBarVisible: false}} name="Login" component={LoginPage} />
       <Stack.Screen options={{headerShown: false, tabBarVisible: false}} name="Forgot Password" component={ForgotPassword} />
    </Stack.Navigator>
  )
}



