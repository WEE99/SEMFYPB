import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from '@material-ui/icons/Group';
import FaceIcon from '@material-ui/icons/Face';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Link from 'next/link'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from "@material-ui/core/IconButton";
import {auth, db} from "../helpers/firebase";
import _ from 'lodash';
import {useRouter} from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import LinearProgress from "@material-ui/core/LinearProgress";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import {Switch} from "@material-ui/core";
import {MyModal, MySnackBar, MyTable, Userinfo} from "../helpers/mainHelpers";

const darkBack = "#1b1c21";
const darkHeader = "#1b1c21";

const lightBack = "#fff";
const greyFont = "#afb0b5";

const drawerWidth = 240;


const AdminLayout = (props) => {
    const router = useRouter()
    const [nightMode, setNightMode] = useState(false);
    const [height, setHeight] = useState(1000);
    const [userName, setUsername] = useState("");
    const [theme, setTheme] = useState("#25a7d9");
    const [role, setRole] = useState("");
    const [userImg, setUserImg] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loader, setLoader] = useState(false);
    const [path, setPath] = useState("");
    const [uid, setUid] = useState("");


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: nightMode? darkHeader: lightBack,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: nightMode? darkHeader: lightBack
        },
        drawerContainer: {
            // overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            paddingLeft: theme.spacing(3),
        },
    }));

    const classes = useStyles();

    useEffect( () => {
        console.log(props);
        const pathname = window.location.pathname;
        console.log(pathname);
        setPath(pathname);
        setHeight(window.innerHeight);

        auth.onAuthStateChanged(async user => {
            if(user) {
                props.setUserId(user.uid)
                await db.collection("users").where("UID", "==", user.uid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                                setLoaded(true);
                                if(_.get(doc.data(), 'admin')) {
                                    if(pathname === '/'){
                                        router.push('/dashboard');
                                    }
                                    setUserImg(_.get(doc.data(), 'photoURL'));
                                    setUsername(_.get(doc.data(), 'name'));
                                    setRole(_.get(doc.data(), 'role'));
                                    setUid(doc.id);
                                    setTheme(_.get(doc.data(), 'theme'));
                                    setNightMode(_.get(doc.data(),'nightMode'));
                                    if(props.setNMode!== undefined){
                                        props.setNMode(_.get(doc.data(),'nightMode'));
                                    }
                                }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
                   
            } else {
                setLoaded(true);
                setLoader(false);
                if(pathname !== '/'){
                    await router.push('/');
                }
            }
        })

    },[])

   

    const handleNightMode = () => {
        db.collection("users").doc(uid).update({
            nightMode: !nightMode
        })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        setNightMode(!nightMode);
        props.setNMode(!nightMode);
    }

    const handleLogout = () => {
        let r = confirm("Are you sure you want to logout?");

        if (r == true) {
            setLoader(true);
            auth.signOut().then(function() {
                setLoader(false);
            }).catch(function(error) {
                alert(error.message);
                setLoader(false);
            });
        }
    }

    if(!loaded){
        return(
            <div style={{backgroundColor: "#828282", height: height,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={60} style={{display:"block", backgroundColor:"#828282"}}/>
            </div>
        )
    }

    if(path === "/"){
        return(
            <div>
                {props.children}
            </div>
        )
    }

    return(
        <div className={classes.root} style={{backgroundColor:nightMode? darkBack: lightBack, minHeight: height+300, height: "100%"}}>
            <CssBaseline />
            <AppBar elevation={1} position="fixed" className={classes.appBar} style={{backgroundColor:nightMode? darkHeader: lightBack}}>
                <Toolbar>
                    <Grid container spacing={0} >
                        <Grid item xs={10}>
                            {/* <img style={{height: "30px", marginTop: 8}} src={"https://image.flaticon.com/icons/png/512/84/84583.png"}alt="logo"/> */}
                            <IconButton style={{height: "30px", marginTop: 8, color: nightMode? greyFont: ""}}>
                                <AcUnitIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2}>

                            <Switch
                                checked={nightMode}
                                onChange={handleNightMode}
                                color="secondary"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                aria-controls="menu-appbar"
                                style={{marginRight:20, color: nightMode? greyFont: ""}}
                            >
                                <Brightness2Icon />
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                aria-controls="menu-appbar"
                                onClick={handleLogout}
                                style={{color: nightMode? greyFont: ""}}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>

                <LinearProgress style={{display: loader? "block" : "none"}}/>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                style={{backgroundColor:darkBack}}
            >
                <Toolbar />
                <div className={classes.drawerContainer}  style={{backgroundColor: nightMode? darkHeader: lightBack, height:"100%", borderWidth:0}}>
                    <Paper style={{backgroundColor:theme, borderRadius: '0'}}>
                        <Grid container justify="center" style={{paddingTop: "20px", paddingBottom: "40px"}}>
                            <Grid item xs={3}>
                                <Avatar alt={userName} src={userImg} ></Avatar>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body1" style={{color: "#FFFFFF", fontWeight:600}}>
                                    {userName !== ""? userName: "loading..."}
                                </Typography>
                                <Typography variant="caption" style={{color: "#FFFFFF"}} gutterBottom>
                                    {role}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <List>

                        <Link href="/dashboard" >
                            {nightMode?
                                <ListItem button key="Dashboard" selected={path === "/dashboard" ? true : false}>
                                    <ListItemIcon><DashboardIcon style={{color:path === "/dashboard" ?"#fff":greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Dashboard" style={{color:path === "/dashboard" ?"#fff":greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Dashboard" selected={path === "/dashboard" ? true : false}>
                                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                            }
                        </Link>

                        {/* <Link href="/staff">
                            {nightMode?
                                <ListItem button key="Staff" selected={path === "/staff" ? true : false}>
                                    <ListItemIcon><GroupIcon style={{color:greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Staff" style={{color:greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Staff" selected={path === "/staff" ? true : false}>
                                    <ListItemIcon><GroupIcon/></ListItemIcon>
                                    <ListItemText primary="Staff"/>
                                </ListItem>
                            }
                        </Link> */}

                        <Link href="/staff">
                            {nightMode?
                                <ListItem button key="User" selected={path === "/staff" ? true : false}>
                                    <ListItemIcon><GroupIcon style={{color:greyFont}}/></ListItemIcon>
                                    <ListItemText primary="User" style={{color:greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Staff" selected={path === "/staff" ? true : false}>
                                    <ListItemIcon><GroupIcon/></ListItemIcon>
                                    <ListItemText primary="User"/>
                                </ListItem>
                            }
                        </Link>

                        <Link href="/leads">
                            {nightMode?
                                <ListItem button key="Leads" selected={path === "/leads" ? true : false}>
                                    <ListItemIcon><ThumbsUpDownIcon style={{color: greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Leads" style={{color: greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Leads" selected={path === "/leads" ? true : false}>
                                    <ListItemIcon><ThumbsUpDownIcon /></ListItemIcon>
                                    <ListItemText primary="Leads" />
                                </ListItem>
                            }
                        </Link>
                        {/* <Link href="/requests">
                            {nightMode?
                                <ListItem button key="Requests" selected={path === "/requests" ? true : false}>
                                    <ListItemIcon><ChatBubbleIcon style={{color: greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Requests" style={{color: greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Requests" selected={path === "/requests" ? true : false}>
                                    <ListItemIcon><ChatBubbleIcon /></ListItemIcon>
                                    <ListItemText primary="Requests" />
                                </ListItem>
                            }
                        </Link> */}
                        <Link href="/profile">
                            {nightMode?
                                <ListItem button key="Profile" selected={path === "/profile" ? true : false}>
                                    <ListItemIcon><FaceIcon style={{color:greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Profile" style={{color:greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Profile" selected={path === "/profile" ? true : false}>
                                    <ListItemIcon><FaceIcon/></ListItemIcon>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                            }
                        </Link>
                        {/* <Link href="/settings">
                            {nightMode?
                                <ListItem button key="Settings" selected={path === "/settings" ? true : false}>
                                    <ListItemIcon><SettingsIcon style={{color:greyFont}}/></ListItemIcon>
                                    <ListItemText primary="Settings" style={{color:greyFont}}/>
                                </ListItem>
                            :
                                <ListItem button key="Settings" selected={path === "/settings" ? true : false}>
                                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                                    <ListItemText primary="Settings"/>
                                </ListItem>
                            }
                        </Link> */}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {props.children}
            </main>
        </div>
    )
};

export default AdminLayout;