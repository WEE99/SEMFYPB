import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import { useRouter } from 'next/router'
import LinearProgress from "@material-ui/core/LinearProgress";
import {auth} from "../helpers/firebase";
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

  const handleLogin = () => {
    router.push('index');
  }

  return (
      <AdminLayout setNMode={setNMode}  setUserId={setUserId}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={5} style={{borderRadius: 20, border: '1px solid lightgrey', marginTop: 200, padding:60}}>

            <h1>Try again</h1>
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin} style={{marginTop: 20}}>
              TRY AGAIN
            </Button>
            <LinearProgress style={{display: loader? "block" : "none"}}/>
          </Grid>

        </Grid>

      </AdminLayout>
  )
}