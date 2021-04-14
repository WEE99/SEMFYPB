import React, {forwardRef, useEffect, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import {db} from "./firebase";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tableIcons  = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export const pinkM = "#e85eac";
export const blueM = "#25a7d9";
export const redM = "#f0505c";
export const greenM = "#22c3b3";

export const Userinfo = (props) => {

    const [user,setUser]=useState("");

    useEffect(() => {
        console.log(props.uid)
        if(props.uid !== undefined && props.uid !==""){
        var docRef = db.collection("users").doc(props.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUser(doc.data().name)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        }
        

    },[])

    return(
        <Typography>{user}</Typography>
    )
}

export const MyTable = (props) => {
    return(
        <MaterialTable
            title={props.title}
            columns={props.columns}
            icons={tableIcons}
            data={props.data}
            actions={props.actions}
            options={{
                pageSize: 10,
                pageSizeOptions: [10,20,30],
                actionsColumnIndex: -1,
                filtering: true,
                headerStyle: {
                    backgroundColor: 'rgba(255, 255, 255, 0)',color:props.SColor
                }
            }}
            style={{color:props.SColor, backgroundColor:"rgba(255, 255, 255, 0.1)"}}
        />
    );
}
export const MySnackBar = (props) => {
    return(
        <Snackbar open={props.open} autoHideDuration={2000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity}>
                {props.msg}
            </Alert>
        </Snackbar>
    );
}

export const MyModal = (props) => {
    let myStyle= {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
    };
    if (props.style !== undefined){
        myStyle = props.style;
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            style={myStyle}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Paper  style={{borderradius: "50%", padding: 20, margin:20,outline: 'none', backgroundColor:props.clr}}>
                    <Grid container justify="space-evenly" spacing={0}>
                        <Grid item container justify="flex-end" xs={12}>
                            <IconButton onClick={props.handleClose} size="small" aria-label="Cancel">
                                <Clear fontSize="small"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            {props.title !== null?
                                <Typography variant="h6" align="center" style={{marginBottom: "10px", color:props.clrB}}>
                                    {props.title}
                                </Typography>
                                : ""}
                        </Grid>
                        <Grid item xs={12}>
                            {props.children}
                        </Grid>

                    </Grid>
                </Paper>
            </Fade>
        </Modal>
    );
}


export const MyColumn = ({txta, txtb,uid,variant, color, type, title}) => {
    const [name, setName] = useState("...");
    const [id, setId] = useState("...");
    const [va, setVariant] = useState("body2");

    useEffect(() => {

        if(uid !== undefined) {

            db.collection(type).doc(uid).get().then(doc => {
                const userData = doc.data();
                setName(_.get(userData, title));
                setId(uid);
            })
        }
        if (variant !== undefined) {
            setVariant(variant);
        }
    }, [])

    return(
        // <div>
        <Typography color={color} variant={va}>
            {txta !== null? <span style={{fontWeight: "bold"}}>{txta}</span>: ""}{name}<br/>
            {txtb !== null? <span style={{fontWeight: "bold"}}>{txtb}</span>: ""}{id}
        </Typography>
        // </div>
    )
}