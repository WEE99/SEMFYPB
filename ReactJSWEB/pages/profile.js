import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Paper, TextField} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {auth, db,firebase} from "../helpers/firebase";


export default function Profile() {
    const router = useRouter()
    const [userId, setUserId] = useState("");
    const [nMode, setNMode] = useState(true);
  
  const [SAprofileimage, setSAprofileimage] = useState("");
  const [SAname, setSAname] = useState("");
  const [SArole, setSArole] = useState("");
  const [SAcompany, setSAcompany] = useState("");
  const [SAphone, setSAphone] = useState("");
  const [SAemail, setSAemail] = useState("");


  useEffect(() => {
    db.collection("users").where("UID", "==", userId).get().then((querySnapshot) => {
    // db.collection("users").where("role", "==", "Salesperson")
        querySnapshot.forEach(function(doc) {
            setSAprofileimage(_.get(doc.data(), 'photoURL'));
            setSAname(_.get(doc.data(), 'name'));
            setSArole(_.get(doc.data(), 'role'));
            setSAcompany(_.get(doc.data(), 'companyName'));
            setSAphone(_.get(doc.data(), 'phoneNumber'));
            setSAemail(_.get(doc.data(), 'email'));
        });
    });   
},[userId])

    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Typography variant="h5" gutterBottom style={{color: "grey", marginTop:15}}>
                Profile
            </Typography>

            {/* <Grid item xs={2} style={{justifyItems:"flex-end", justifyContent:"flex-end", backgroundColor:"", borderRadius:10}}> */}
                <Grid item xs={10} md={10} style={{justifyItems:"center"}} >
                    <Paper style={{backgroundColor:"rgba(255, 255, 255, 0.6)",padding:20, color:"#fff", display:"flex"}}>
                    <Grid item xs={5} md={1}  style={{backgroundColor:"",marginRight:"auto"}}>
                    <Avatar alt="Super Admin" src={SAprofileimage} style={{width:200, height:200}}></Avatar>
                    </Grid>
                    <Grid item xs={5} md={9} style={{backgroundColor:"",marginTop:25}}>
                                <Typography variant="body1" style={{color: "black", fontWeight:600}}>
                                    {/* {userName !== ""? userName: "loading..."} */}
                                    {/* Wee Chien */}
                                    {SAname}
                                </Typography>
                                <Typography variant="caption" style={{color: "black"}} gutterBottom>
                                    {/* {role} */}
                                    {SArole}
                                </Typography>
                                <Typography variant="body1" style={{color: "black"}} gutterBottom>
                                    {/* {role} */}
                                    Company: {SAcompany}
                                </Typography>
                                <Typography variant="body1" style={{color: "black"}} gutterBottom>
                                    {/* {role} */}
                                    Phone: {SAphone}
                                </Typography>
                                <Typography variant="body1" style={{color: "black"}} gutterBottom>
                                    {/* {role} */}
                                    Email: {SAemail}
                                </Typography>
                </Grid>
                </Paper>
                </Grid>
                    
                    
                {/* </Grid> */}
        </AdminLayout>
    )
}