import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";
import {MyModal, MySnackBar, MyTable, Userinfo} from "../helpers/mainHelpers";
import Edit from "@material-ui/icons/Edit";
import {auth, db,firebase} from "../helpers/firebase";
import Grid from "@material-ui/core/Grid";
import {Paper, TextField} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";




export default function History() {
    const router = useRouter();
    const [columns, setColumns] = useState([]);
    const [leads, setLeads] = useState([]);
    const [modal, setModal] = useState(false);
    const [current, setCurrent] = useState({});
    const [dropDown, setDropDown] = useState("");
    const [edit, setEdit] = useState(false);
    const [snackBar, setSnackbar] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");
    const [nMode, setNMode] = useState(true);

    const [photo, setPhoto] = useState("");

    const [numLeads, setNumLeads] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [userId, setUserId] = useState("");

    const [company, setCompany] = useState("");
    const [comment, setComment] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState("");
    const [name, setName] = useState("");

    const [quote, setQuote] = useState("");


    const [salespersonId, setSalespersonId] = useState("");


    useEffect(() => {
    
        setColumns([
            { title: 'ID', field: 'leadsid' },
            { title: 'Leads Name', field: 'leadsname'},
            { title: 'Date', field: "date"},
            // { title: 'Handler', field: 'name'},
            { title: 'Status', field:"Status"},
           
        ])
        console.log(auth.currentUser)
        if(userId!==""){
        // db.collection("leads").where("adminID", "==",userId)
        db.collection("Tracking").orderBy("edited", "desc")
        .get()
        .then((querySnapshot) => {
                let TrackingArr = [];
                querySnapshot.forEach(function(doc) {
                    let r = doc.data();
                    r.id = doc.id;
                    TrackingArr.push(r);
                });
                setLeads(TrackingArr);
            });
        }
    },[userId])

   

    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Grid container justify={"space-between"} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={10}>
                    <Typography variant="h5" gutterBottom style={{color: "grey", marginTop: 15}}>
                        History
                    </Typography>
                </Grid>
                {/* <Grid item xs={2} style={{justifyItems:"flex-end", justifyContent:"flex-end"}}>
                    <IconButton onClick={openEditor} style={{marginTop: 8, backgroundColor:"#f50057", color:"#fff", borderRadius:5, marginLeft:40}}>
                        <AddIcon />
                    </IconButton>
                </Grid> */}
            </Grid>
            <Grid container>
                <Grid item xs={11}>
                    <Paper style={{backgroundColor:"rgba(255, 255, 255, 0)", marginBottom:20}} variant="outlined" >
                        {leads.length !==0 && <MyTable title="" columns={columns} data={leads} SColor={nMode?"#fff":"grey"}
                        // actions={[
                        //     {
                        //         icon: () => <Edit style={{color:nMode?"#fff":"grey"}}/>,
                        //         tooltip: 'Edit/View Lead',
                        //         onClick: (event, rowData) => {
                        //             handleEdit(rowData)
                        //         }
                        //     }
                        // ]} 


                        />}
                    </Paper>
                </Grid>
            </Grid>
           
           

        </AdminLayout>
    )
}