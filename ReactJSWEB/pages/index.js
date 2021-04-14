import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import { useRouter } from 'next/router'
import LinearProgress from "@material-ui/core/LinearProgress";
import {auth, db} from "../helpers/firebase";
import AdminLayout from "../components/AdminLayout";


export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [nMode, setNMode] = useState(true);
  const [userId, setUserId] = useState("");

  const handleTextChange = (e) => {
    if(e.target.name === "email"){
      setEmail(e.target.value);
    }else{
      setPassword(e.target.value);
    }
  }

  const wrongRole =() => {
    auth.signOut().then(function() {
        alert("You are not logged in as Super Admin!")
    }).catch(function(error) {
        alert(error.message);
        // alert("Wrong role !")
    });
    
}

  const handleLogin = () => {
    setLoader(true);
    let r = email;
    if(password !== '' && email !== ''){
      let em = email.substr(email.length - 1);
      if (em === ' ') {
        r= r.slice(0, -1);
      }
      auth.signInWithEmailAndPassword(r, password)
          .then(function(firebaseUser) {
            db.collection("users").where("UID", "==", firebaseUser.user.uid).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  console.log(doc.data());
                          if(_.get(doc.data(), 'admin')) {
                              console.log("Welcome Admin")
                          }else{
                               wrongRole()
                          }
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
            setLoader(false);
          })
          .catch(function(error) {
            console.log(error);
            window.alert("Incorrect email or password");
            setLoader(false);
          });

    }else{
      window.alert("Please fill both fields");
      setLoader(false);
    }
  }

  return (
      <AdminLayout setNMode={setNMode}  setUserId={setUserId}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={5} style={{borderRadius: 20, border: '1px solid lightgrey', marginTop: 200, padding:60}}>

            <h1>Login</h1>
            <TextField fullWidth name="email" label="Email" variant="outlined" value={email} onChange={handleTextChange}/>
            <TextField fullWidth name="password" label="Password" type="password" value={password} variant="outlined" style={{marginTop: 20}} onChange={handleTextChange}/>
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin} style={{marginTop: 20}}>
              Login
            </Button>
            <LinearProgress style={{display: loader? "block" : "none"}}/>
          </Grid>

        </Grid>

      </AdminLayout>
  )
}