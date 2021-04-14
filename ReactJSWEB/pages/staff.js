import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";
import {MyModal, MySnackBar, MyTable, pinkM} from "../helpers/mainHelpers";
import Edit from "@material-ui/icons/Edit";
import {auth, db, secondFirebase} from "../helpers/firebase";
import Grid from "@material-ui/core/Grid";
import {Paper, TextField} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




 
export default function Staff() {
    const router = useRouter();
    const [columns, setColumns] = useState([]);
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [current, setCurrent] = useState({});
    const [dropDown, setDropDown] = useState("");
    const [edit, setEdit] = useState(false);
    const [snackBar, setSnackbar] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");
    const [nMode, setNMode] = useState(true);
    const [userId, setUserId] = useState("");

    const [photo, setPhoto] = useState("");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [role, setRole] = useState("");


    const useStyles = makeStyles((theme) => ({
        formControl: {
        //   margin: theme.spacing(1),
          minWidth: 120,
          marginBottom:10
        },
        // selectEmpty: {
        //   marginTop: theme.spacing(2),
        // },
      }));
    const classes = useStyles();
    const handleChange = (event) => {
        setRole(event.target.value);}


    useEffect(() => {
        console.log(router);
        setColumns([
            {
                title: 'Avatar',
                // field: 'avatar',
                field: 'photoURL',
                render: rowData => (
                    <img
                        style={{ height: 36, borderRadius: '50%', width:36 }}
                        src={rowData.photoURL}
                        // src={rowData.photoURL}
                    />
                ),
            },
            { title: 'Name', field: 'name' },
            { title: 'Role', field: 'role'},
            { title: 'Company', field: 'companyName' },
            { title: 'Email', field: 'email' },
            { title: 'Phone Number', field: 'phoneNumber' }
        ])

        db.collection("users").where("role", "!=", "Super Admin")
        // db.collection("users").where("role", "==", "Salesperson")
        //.where("role", "==", "Company Admin")
        .onSnapshot(function(querySnapshot) {
            let usersArr = [];
            querySnapshot.forEach(function(doc) {
                let r = doc.data();
                r.id = doc.id;
                usersArr.push(r);
            });
            setUsers(usersArr);
        });

    },[])

    const openEditor = () => {
        setName("");
        setPhoto("");
        setEmail("");
        setCompany("");
        setPhoneNum("");
        setRole("");
        setAddress("");
        setEdit(false);
        setModal(true);
        setCurrent({});
    }

    const handleEdit = (rowData) => {
        setCurrent(rowData);

        setName(rowData.name);
        setEmail(rowData.email);
        setPhoneNum(rowData.phoneNumber);
        setAddress(rowData.address);
        setPhoto(rowData.photoURL);
        setRole(rowData.role);
        setCompany(rowData.companyName);

        setDropDown(rowData.status);
        setEdit(true);
        setModal(true);
    }

    const handleUpdate = ()=> {
        if(name===""||email===""||address===""||phoneNum===""){
            alert("Please complete all fields");
        }else {
            db.collection("users").doc(current.id).update({
                name: name,
                username: name,
                address: address,
                phoneNumber: phoneNum,
                email:email,
                companyName:company,
                role:role,
            })
            .then(function() {
                setSeverity("success");
                setMessage("User successfully updated");
                setSnackbar(true);
                setModal(false)
            })
            .catch(function(error) {
                setSeverity("error");
                setMessage("An Error Occurred. Please try again later");
                setSnackbar(true);
                setModal(false)
            });
        }
    }

    const handleCreate = ()=>{
        if(name===""||email===""||address===""||phoneNum===""){
            alert("Please complete all fields");
            
        }else{
            secondFirebase.auth().createUserWithEmailAndPassword(email, "1234567890").then(result => {
                db.collection('users').doc(result.user.uid).set({
                    UID:result.user.uid,
                    name: name,
                    nickname:"",
                    username: name,
                    address: address,
                    email:email,
                    companyName:company,
                    phoneNumber: phoneNum,
                    admin:false,
                    notification: false,
                    photoURL:"https://firebasestorage.googleapis.com/v0/b/salesmanagement-karuna.appspot.com/o/blankProfilePic.jpg?alt=media&token=540c87af-8cfb-49d7-b8ef-f921a3e60634",
                    role:role,
                    //salesperson:true,
                    theme:"#60cef4"
                })
                .then(function(docRef) {
                    setSeverity("success");
                    setMessage("User successfully created");
                    setSnackbar(true);
                    setModal(false);
                    secondFirebase.auth().signOut();
                });
            });

        //     db.collection("users").add({
        //         UID:"",
        //         name: name,
        //         username: name,
        //         address: address,
        //         email:email,
        //         companyName:company,
        //         phoneNumber: phoneNum,
        //         notification: false,
        //         photoUrl:"https://firebasestorage.googleapis.com/v0/b/salesmanagement-karuna.appspot.com/o/blankProfilePic.jpg?alt=media&token=540c87af-8cfb-49d7-b8ef-f921a3e60634",
        //         role:role,
        //         salesperson:true,
        //         theme:"#60cef4"
        //     })
        //     .then(function(docRef) {
        //         setSeverity("success");
        //         setMessage("User successfully created");
        //         setSnackbar(true);
        //         setModal(false)
        //     });
         }
    }

    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Grid container justify={"space-between"} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={10}>
                    <Typography variant="h5" gutterBottom style={{color: "grey", marginTop: 15}}>
                        User
                    </Typography>
                </Grid>
                <Grid item xs={2} style={{justifyItems:"flex-end", justifyContent:"flex-end"}}>
                    <IconButton onClick={openEditor} style={{marginTop: 8, backgroundColor:"#f50057", color:"#fff", borderRadius:5, marginLeft:40}}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={11}>
                    <Paper style={{backgroundColor:"rgba(255, 255, 255, 0)", marginBottom:20}} variant="outlined" >
                        {users.length !==0 && <MyTable title="" columns={columns} data={users} SColor={nMode?"#fff":"grey"} actions={[
                            {
                                icon: () => <Edit style={{color:nMode?"#fff":"grey"}}/>,
                                tooltip: 'Edit/View User',
                                onClick: (event, rowData) => {
                                    handleEdit(rowData)
                                }
                            }
                        ]}/>}
                    </Paper>
                </Grid>
            </Grid>
            <MyModal handleClose={() => {setModal(false)}} open={modal} title={edit?"Edit User":"Add New User"} clr={nMode? "#1b1c21":"#fff"} clrB={nMode? "#fff":"darkgrey"} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'}}>
                <Paper style={{maxWidth:400, margin:"auto", borderWidth:0, backgroundColor:"rgba(255, 255, 255, 0)"}} variant="outlined">

                    {photo!==""&&<Avatar alt="Profile Pic" src={photo} style={{alignSelf:"center", marginBottom:20, marginTop:10, marginLeft:"auto", marginRight:"auto", width:45, height:45}}/>}
                    <TextField
                    required
                    label="Name"
                    variant="filled"
                    fullWidth
                    value={name}
                    style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setName(e.target.value)}}
                />

                {edit&&<TextField
                    required
                    label="Email"
                    variant="filled"
                    fullWidth
                    value={email}
                    style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setEmail(e.target.value)}}
                />}

                {!edit&&<TextField
                    required
                    label="Email"
                    variant="filled"
                    fullWidth
                    value={email}
                    style={{backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setEmail(e.target.value)}}
                />}
                {!edit&&<Typography gutterBottom variant="subtitle2" style={{color: "red"}}>
                    *A Confirmation Email Will be Sent to this Email
                </Typography>}

                <TextField
                    required
                    label="Phone Number"
                    variant="filled"
                    fullWidth
                    value={phoneNum}
                    style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setPhoneNum(e.target.value)}}
                />

              {/* <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={role}
                onChange={handleChange}
                className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Salesperson"}>Salesperson</MenuItem>
                <MenuItem value={"Company Admin"}>Company Admin</MenuItem>
                
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl> */}

            {/* <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Role*</InputLabel>
                <Select
                
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleChange}
                label="Role"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Salesperson"}>Salesperson</MenuItem>
                <MenuItem value={"Company Admin"}>Company Admin</MenuItem>
                </Select>
            </FormControl> */}

                    <div>
                    <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={role}
                    onChange={handleChange}
                    >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem> */}
                    <MenuItem value={"Salesperson"}>Salesperson</MenuItem>
                    <MenuItem value={"Company Admin"}>Company Admin</MenuItem>
                    </Select>
                </FormControl>
                </div>

                <TextField
                    required
                    label="Company"
                    variant="filled"
                    fullWidth
                    value={company}
                    style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setCompany(e.target.value)}}
                />
                <TextField
                    required
                    label="Address"
                    variant="filled"
                    fullWidth
                    multiline
                    rows={4}
                    value = {address}
                    style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                    onChange={(e) => {setAddress(e.target.value)}}
                />

                <Grid container justify={"space-between"} style={{marginTop:10}}>
                    <Grid item xs={3}>
                        <Button onClick={()=> setModal(false)} variant="contained" color="secondary" fullWidth>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={5} style={{marginBottom:20}}>
                        {edit?
                            <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
                                Save Changes
                            </Button>:
                            <Button variant="contained" color="primary" fullWidth onClick={handleCreate}>
                                Create User
                            </Button>}
                    </Grid>
                </Grid>
                    <Typography  variant="subtitle2" style={{color:"grey"}} >
                        UID : {current.id}
                    </Typography>
                </Paper>
            </MyModal>
            <MySnackBar open={snackBar} handleClose={() => setSnackbar(false)} severity={severity} msg={message}/>

        </AdminLayout>
    )
}