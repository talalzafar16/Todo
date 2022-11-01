import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {signup} from "../config/firebasemethods"
import {useState} from "react";
import {  useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup() {
  let [email,setEmail]=useState("")
  let [pass,setpass]=useState("")
  let [contact,setcontact]=useState("")
  let [age,setage]=useState("")
  let [loader,setloader]=useState(false)
  const Navigate=useNavigate();

  let submit=()=>{
    setloader(true)
    signup({email,pass,contact,age})
    .then((success) => {    
      setloader(false)
      console.log(success )
      alert("successfully Signed Up")
      Navigate("/Login")
    })
    .catch((err) => {
      setloader(false)
    alert(err)

  });}
  return (<>
  
  <div className="main">
      <Typography sx={{fontFamily: 'Times, "Times New Roman", Times',
            fontSize: "4em",
            color: "dark black",
            fontWeight: "bold",
            marginLeft: "499px",
            marginTop: "10px",
            textDecoration: "underline 4px"}} variant="h2">SignUp Portal</Typography>
      <Box sx={{ borderRadius: "22px", position: "absolute", marginTop: "66px", height: "400px", width: "400px", marginLeft: "470px", backgroundImage: "linear-gradient(to bottom left,rgb(116, 210, 223),rgb(211, 206, 206))" }}>
        <Typography variant="h6" sx={{ marginTop: "36px", marginLeft: "40px" }}>Email<TextField onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="abc@gmail.com" size="small" sx={{ marginLeft: "60px", width: "200px" }} /></Typography>
        <Typography variant="h6" sx={{ marginTop: "36px", marginLeft: "40px" }}>Password<TextField onChange={(e)=>{setpass(e.target.value)}} type="password" placeholder="enter here" size="small" sx={{ marginLeft: "23px", width: "200px" }} /></Typography>
        <Typography variant="h6" sx={{ marginTop: "36px", marginLeft: "40px" }}>Age<TextField onChange={(e)=>{setage(e.target.value)}} type="number" placeholder="enter here" size="small" sx={{ marginLeft: "74px", width: "200px" }} /></Typography>
        <Typography variant="h6" sx={{ marginTop: "36px", marginLeft: "40px" }}>Contact<TextField onChange={(e)=>{setcontact(e.target.value)}} placeholder="03xx-xxxxxxx" size="small" sx={{ marginLeft: "40px", width: "200px" }} /></Typography>
        <Button variant="contained" sx={{ marginTop: "43px", marginLeft: "160px" }} disabled={loader} onClick={submit}>{loader?<CircularProgress/>:"SignUp"}</Button>
      </Box>
            </div>
      </>
    
  );
}
