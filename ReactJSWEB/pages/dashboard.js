import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import MyChart from "../helpers/myChart";
import {blueM, greenM, pinkM, redM} from "../helpers/mainHelpers";
import {auth, db} from "../helpers/firebase";


import {
    Chart,
    PieSeries,
    Title,
  } from '@devexpress/dx-react-chart-material-ui';
  
import { Animation, Palette } from '@devexpress/dx-react-chart';
  

export default function Dashboard() {
    const router = useRouter();
    const [nMode, setNMode] = useState(true);
    const [userId, setUserId] = useState("");

  const [WON,setWON]=useState([]);
  const [countWON,setcountWON]=useState("");

  const [LOST,setLOST]=useState([]);
  const [countLOST,setcountLOST]=useState("");

  const [OPEN,setOPEN]=useState([]);
  const [countOPEN,setcountOPEN]=useState("");

 

    // const [data, setData] = useState([
    //     {
    //         date: '1', wins: 2, loss: 2, new: 1,
    //     }, {
    //         date: '2', wins: 3, loss: 3, new: 3,
    //     }, {
    //         date: '3', wins: 5, loss: 1, new: 2,
    //     }, {
    //         date: '4', wins: 6, loss: 2, new: 4,
    //     }, {
    //         date: '5', wins: 5, loss: 4, new: 2,
    //     }, {
    //         date: '6', wins: 7, loss: 5, new: 5,
    //     }, {
    //         date: '7', wins: 10, loss: 4, new: 7,
    //     }]);

    
      

    const [data, setData] = useState([]);
   console.log(data);



    useEffect(() => {
        db.collection("leads").where("result", "==", "Open")
        .get()
        .then((querySnapshot) => {
          let OPENArr= [];
            querySnapshot.forEach((docTasks) => {
                let OPEN = docTasks.data();
                OPEN.id = docTasks.id;
                OPENArr.push(OPEN);
                // doc.data() is never undefined for query doc snapshots
                console.log(docTasks.id, " => ", docTasks.data());
            });
            setOPEN(OPENArr);
            let open =   { state: 'Open', amount: OPENArr.length}
            // let open =   { state: 'Open', amount: 1}
            let tempARR = data
            tempARR.push(open)
            setData(tempARR)
            setcountOPEN(OPENArr.length)
            console.log(OPENArr);
            console.log(OPENArr.length);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        db.collection("leads").where("result", "==", "Lost")
        .get()
        .then((querySnapshot) => {
          let LOSTArr= [];
            querySnapshot.forEach((docTasks) => {
                let LOST = docTasks.data();
                LOST.id = docTasks.id;
                LOSTArr.push(LOST);
                // doc.data() is never undefined for query doc snapshots
                console.log(docTasks.id, " => ", docTasks.data());
            });
            setLOST(LOSTArr);
            let lost =   { state: 'Lose', amount: LOSTArr.length }
            // let lost =   { state: 'Lose', amount: 5 }
            let tempARR = data
            tempARR.push(lost)
            setData(tempARR)
            setcountLOST(LOSTArr.length)
            console.log(LOSTArr);
            console.log(LOSTArr.length);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    

        db.collection("leads").where("result", "==", "Won")
        .get()
        .then((querySnapshot) => {
          let WONArr= [];
            querySnapshot.forEach((docTasks) => {
                let WON = docTasks.data();
                WON.id = docTasks.id;
                WONArr.push(WON);
                // doc.data() is never undefined for query doc snapshots
                console.log(docTasks.id, " => ", docTasks.data());
            });
            setWON(WONArr);
            let won =   { state: 'Win', amount: WONArr.length}
            // let won =   { state: 'Win', amount: 13}
            let tempARR = data
            tempARR.push(won)
            setData(tempARR)
            setcountWON(WONArr.length)
            console.log(WONArr);
            console.log(WONArr.length);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    
        // db.collection("tasks").where("status", "==", "Not completed").where("date", ">", new Date()).where("type","==","Call")
        // .get()
        // .then((querySnapshot) => {
        //   let callTaskArr= [];
        //     querySnapshot.forEach((docTasks) => {
        //         let calltasks = docTasks.data();
        //         calltasks.id = docTasks.id;
        //         calltasks.mytype="Call";
                
        //         callTaskArr.push(calltasks);
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(docTasks.id, " => ", docTasks.data());
        //     });
        //     setcallTasks(callTaskArr);
        //     setcountcallTasks(callTaskArr.length)
        //     console.log(callTaskArr);
        //     console.log(callTaskArr.length);
        // })
        // .catch((error) => {
        //     console.log("Error getting documents: ", error);
        // });
    
        
      },[]);

     

 
    return (
        <AdminLayout setNMode={setNMode}  setUserId={setUserId}>
            <Typography variant="h5" gutterBottom style={{color: "grey", marginTop:15, marginBottom:20}}>
                Dashboard
            </Typography>
            <Grid container spacing={0} justify="space-evenly" style={{paddingRight:30}}>
                <Grid item xs={4} >
                    <Paper style={{backgroundColor:"#9ccc65", padding:20, color:"#fff", marginRight:15}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <AcUnitIcon />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="h2" style={{textAlign:"right"}}>
                                    Wins
                                </Typography>
                                <Typography variant="h4" component="h2" style={{textAlign:"right"}}>
                                    {countWON}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4} >
                    <Paper style={{backgroundColor:"#ff7043", padding:20, color:"#fff", marginRight:15}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <AcUnitIcon />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="h2" style={{textAlign:"right"}}>
                                    Losses
                                </Typography>
                                <Typography variant="h4" component="h2" style={{textAlign:"right"}}>
                                    {countLOST}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{backgroundColor:"#42a5f5", padding:20, color:"#fff", marginRight:15}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <AcUnitIcon />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="h2" style={{textAlign:"right"}}>
                                    Open
                                </Typography>
                                <Typography variant="h4" component="h2" style={{textAlign:"right"}}>
                                    {countOPEN}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* <Grid item xs={3} >
                    <Paper style={{backgroundColor:greenM, padding:20, color:"#fff", marginRight:15}}>
                        <Grid container>
                            <Grid item xs={6}>
                                <AcUnitIcon />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="h2" style={{textAlign:"right"}}>
                                    Pending
                                </Typography>
                                <Typography variant="h4" component="h2" style={{textAlign:"right"}}>
                                    30
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid> */}
            </Grid>

            {/* <Grid container spacing={0} justify="space-evenly" style={{paddingRight:30, paddingTop:30, alignItems:"stretch"}} >
                <Grid item xs={8} >
                    <Paper style={{backgroundColor:"rgba(255, 255, 255, 0.1)", color:"#fff", marginRight:15}}>
                        <MyChart data={data} clr={nMode? "#fff": "darkgrey"}></MyChart>
                    </Paper>
                </Grid> */}

                <Grid container spacing={0} justify="space-evenly" style={{paddingRight:30, paddingTop:30, alignItems:"stretch"}} >
                <Grid item xs={7} >
                <Paper>
                    {data.length===3 && <Chart
                    data={data}
                    >
                    <PieSeries
                        valueField="amount"
                        argumentField="state"
                        // pointComponent={green}
                        //innerRadius={0.6}
                    />
                    <Title
                        text="Overall statistic"
                    />
                    <Animation />
                    </Chart>}
                </Paper>
                </Grid>

                <Grid item xs={3} >
               
                </Grid>
                {/* <Grid item xs={4} >
                    <Paper style={{backgroundColor:"rgba(255, 255, 255, 0.1)", padding:20, color:nMode? "#fff": "darkgrey", marginRight:15}}>
                        <Typography variant="h6" component="h2">
                            Latest Completed Leads
                        </Typography>
                        <Paper variant="outlined" style={{backgroundColor:"rgba(225,225,225,0.1)", color:nMode? "#fff": "darkgrey", borderColor:"rgba(225,225,225,0.4)", marginTop:10, padding:10}}>
                            <Typography variant="body2" component="h2" style={{color:"#fff",padding:10, backgroundColor:greenM, width:"60px", borderRadius:10, textAlign:"center"}}>
                                WIN
                            </Typography>
                            <Typography variant="subtitle2"  style={{color:nMode? "#fff": "darkgrey", marginTop:5}}>
                                Lead Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                SalesPerson Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                Date Completed:
                            </Typography>
                        </Paper>
                        <Paper variant="outlined" style={{backgroundColor:"rgba(225,225,225,0.1)", color:nMode? "#fff": "darkgrey", borderColor:"rgba(225,225,225,0.4)", marginTop:10, padding:10}}>
                            <Typography variant="body2" component="h2" style={{color:"#fff",padding:10, backgroundColor:redM, width:"60px", borderRadius:10, textAlign:"center"}}>
                                LOSS
                            </Typography>
                            <Typography variant="subtitle2"  style={{color:nMode? "#fff": "darkgrey", marginTop:5}}>
                                Lead Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                SalesPerson Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                Date Completed:
                            </Typography>
                        </Paper> */}
                        {/* <Paper variant="outlined" style={{backgroundColor:"rgba(225,225,225,0.1)", color:nMode? "#fff": "darkgrey", borderColor:"rgba(225,225,225,0.4)", marginTop:10, padding:10}}>
                            <Typography variant="body2" component="h2" style={{color:"#fff",padding:10, backgroundColor:greenM, width:"60px", borderRadius:10, textAlign:"center"}}>
                                WIN
                            </Typography>
                            <Typography variant="subtitle2"  style={{color:nMode? "#fff": "darkgrey", marginTop:5}}>
                                Lead Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                SalesPerson Name:
                            </Typography>
                            <Typography variant="subtitle2" style={{color:nMode? "#fff": "darkgrey"}}>
                                Date Completed:
                            </Typography>
                        </Paper> */}

                    {/* </Paper>
                </Grid> */}
            </Grid>
        </AdminLayout>
    )
}