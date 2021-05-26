import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import AdminLayout from "../components/AdminLayout";
import Typography from "@material-ui/core/Typography";
import {MyModal, MySnackBar, MyTable, pinkM} from "../helpers/mainHelpers";
import Edit from "@material-ui/icons/Edit";
import {auth, db,firebase} from "../helpers/firebase";
import Grid from "@material-ui/core/Grid";
import {Paper, TextField} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";




export default function Requests() {
    const router = useRouter();
    const [columns, setColumns] = useState([]);
    const [reqs, setReqs] = useState([]);
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
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [userId, setUserId] = useState("");

    const [salespersonId, setSalespersonId] = useState("");


    useEffect(() => {
        console.log(router);
        if(auth.currentUser !== null){
            setUserId(auth.currentUser.uid);
        }
        setColumns([
            { title: 'UserId', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Request Type', field: 'type' },
            { title: 'Date Submitted', field: 'date' },
            { title: 'Status', field: 'status',
                render: rowData => (
                    <Typography gutterBottom variant="subtitle2" style={{color: rowData.status==="pending"? "gold":"green"}}>
                        {rowData.status.toUpperCase()}
                    </Typography>
                ),
            }
        ])

        db.collection("requests")
            .onSnapshot(function(querySnapshot) {
                let reqArr = [];
                querySnapshot.forEach(function(doc) {
                    let r = doc.data();
                    r.id = doc.id;
                    r.date = r.dateSubmitted.toDate().toDateString();
                    reqArr.push(r);
                });
                setReqs(reqArr);
            });

    },[])

    const openEditor = () => {
        setPhoto("");
        setEmail("");
        setPhoneNum("");
        setAddress("");
        setEdit(false);
        setModal(true);
    }

    const handleEdit = (rowData) => {
        setCurrent(rowData);
        if(rowData.userId !== undefined){
            setSalespersonId(rowData.userId);
        }else{
            setSalespersonId("");
        }

        setEdit(true);
        setModal(true);
    }

    const handleUpdate = ()=> {
    }

    const handleRequest = ()=>{
    }

    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Grid container justify={"space-between"} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={10}>
                    <Typography variant="h5" gutterBottom style={{color: "grey", marginTop: 15}}>
                        Requests
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
                        {reqs.length !==0 && <MyTable title="" columns={columns} data={reqs} SColor={nMode?"#fff":"grey"} actions={[
                            {
                                icon: () => <Edit style={{color:nMode?"#fff":"grey"}}/>,
                                tooltip: 'Edit/View Lead',
                                onClick: (event, rowData) => {
                                    handleEdit(rowData)
                                }
                            }
                        ]}/>}
                    </Paper>
                </Grid>
            </Grid>
            <MyModal handleClose={() => {setModal(false)}} open={modal} title={edit?"Assign Leads":"Request New Leads"} clr={nMode? "#1b1c21":"#fff"} clrB={nMode? "#fff":"darkgrey"} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'}}>
                {edit?<Paper
                        style={{maxWidth: 400, margin: "auto", borderWidth: 0, backgroundColor: "rgba(255, 255, 255, 0)"}}
                        variant="outlined">

                        <Typography variant="body2" gutterBottom style={{color: "grey", marginTop: 15}}>
                            {salespersonId===""?"Please enter userId of salesperson you want to assign this lead to.":
                                "This lead has already been assigned to a user."}
                        </Typography>
                        <TextField
                            required
                            label="User Id"
                            variant="filled"
                            fullWidth
                            value={salespersonId}
                            disabled={salespersonId!==""}
                            style={{marginBottom: 10, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 5}}
                            onChange={(e) => {
                                setSalespersonId(e.target.value)
                            }}
                        />
                        {salespersonId===""&&<Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
                            Assign Lead
                        </Button>}
                    </Paper>:
                    <Paper style={{maxWidth:400, margin:"auto", borderWidth:0, backgroundColor:"rgba(255, 255, 255, 0)"}} variant="outlined">
                        <TextField
                            required
                            label="Number of Leads"
                            variant="filled"
                            type="number"
                            fullWidth
                            value={numLeads}
                            style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                            onChange={(e) => {setNumLeads(e.target.value)}}
                        />
                        <Button variant="contained" color="primary" fullWidth onClick={handleRequest}>
                            Send Request
                        </Button>
                    </Paper>}
            </MyModal>
            <MySnackBar open={snackBar} handleClose={() => setSnackbar(false)} severity={severity} msg={message}/>

        </AdminLayout>
    )
}