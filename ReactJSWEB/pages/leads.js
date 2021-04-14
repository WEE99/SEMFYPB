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




export default function Leads() {
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
            { title: 'Name', field: 'name' },
            { title: 'Company', field: 'company'},
            { title: 'Assigned to ', field: "userId",
            render: rowData => (
                <Userinfo uid={rowData.userId}></Userinfo>
            ),
        },
            // { title: 'Handler', field: 'name'},
            { title: 'Quote', field:"quote",
            render: rowData => (
                <Typography >
                    { rowData.quote? "RM "+rowData.quote: "-"}
                </Typography>
            ),
        },
            { title: 'Interest', field: 'interest' },
            { title: 'Result', field: 'result' },
            { title: 'Status', field: 'assigned',
                render: rowData => (
                    <Typography gutterBottom variant="subtitle2" style={{color: rowData.assigned? "green":"red"}}>
                        {rowData.assigned? "ASSIGNED": "NOT ASSIGNED"}
                    </Typography>
                ),
            }
        ])
        console.log(auth.currentUser)
        if(userId!==""){
        // db.collection("leads").where("adminID", "==",userId)
        db.collection("leads")
        .get()
        .then((querySnapshot) => {
                let leadsArr = [];
                querySnapshot.forEach(function(doc) {
                    let r = doc.data();
                    r.id = doc.id;
                    leadsArr.push(r);
                });
                setLeads(leadsArr);
            });
        }
    },[userId])

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

    const handleCreate = () => {
        if(name===""||email===""||contactNum===""||company===""||interest===""||comment===""){
            alert("Please complete all fields");
        }else{
            db.collection("leads").add({
                adminID:"",
                name: name,
                company: company,
                comment: comment,
                email:email,
                contactNumber: contactNum,
                contacted: false,
                date:"",
                assigned:false,
                interest:interest,
                quoteSent:false,
                quote:"",
                result:"Open",
                userId:"",
            })
                .then(function(docRef) {
                    setSeverity("success");
                    setMessage("Lead successfully created");
                    setSnackbar(true);
                    setModal(false)
                });
        }
    }

    const handleUpdate = ()=> {
        db.collection("users").doc(salespersonId).get().then(function(doc) {
            if (doc.exists && doc.data().salesperson) {
                db.collection("leads").doc(current.id).update({
                    userId: salespersonId,
                })
                    .then(function() {
                        setSeverity("success");
                        setMessage("User successfully updated");
                        setSnackbar(true);
                        setModal(false)
                    })
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            setSeverity("error");
            setMessage("An Error Occurred. Please ensure the id is correct");
            setSnackbar(true);
            setModal(false)
        });
    }


    return (
        <AdminLayout setNMode={setNMode} setUserId={setUserId}>
            <Grid container justify={"space-between"} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={10}>
                    <Typography variant="h5" gutterBottom style={{color: "grey", marginTop: 15}}>
                        Leads
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
            <MyModal handleClose={() => {setModal(false)}} open={modal} title={edit?"Assign Leads":"Create New Leads"} clr={nMode? "#1b1c21":"#fff"} clrB={nMode? "#fff":"darkgrey"} style={{
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
                        label="Name"
                        variant="filled"
                        fullWidth
                        value={name}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <TextField
                        required
                        label="Company"
                        variant="filled"
                        fullWidth
                        value = {company}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setCompany(e.target.value)}}
                    />
                    <TextField
                        required
                        label="Contact Number"
                        variant="filled"
                        fullWidth
                        value = {contactNum}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setContactNum(e.target.value)}}
                    />
                    <TextField
                        required
                        label="Email"
                        variant="filled"
                        fullWidth
                        value = {email}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <TextField
                        required
                        label="Interest"
                        variant="filled"
                        fullWidth
                        value = {interest}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setInterest(e.target.value)}}
                    />
                    <TextField
                        required
                        label="Comment"
                        variant="filled"
                        multiline
                        fullWidth
                        row={3}
                        value = {comment}
                        style={{marginBottom:10, backgroundColor:"rgba(255, 255, 255, 0.1)", borderRadius:5}}
                        onChange={(e) => {setComment(e.target.value)}}
                    />

                    <Grid container justify={"space-between"} style={{marginTop:10}}>
                        <Grid item xs={3}>
                            <Button onClick={()=> setModal(false)} variant="contained" color="secondary" fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={5} style={{marginBottom:20}}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleCreate}>
                                Create Lead
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>}
            </MyModal>
            <MySnackBar open={snackBar} handleClose={() => setSnackbar(false)} severity={severity} msg={message}/>

        </AdminLayout>
    )
}