import { Box, Button, Chip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const Navigate = useNavigate();
  let Login=()=>{ Navigate("/Login")}
  let Signup=()=>{ Navigate("/Signup")}
  return (<>
    <div className="main">
      <div>
        <Typography sx={{
          fontFamily: 'Times, "Times New Roman", Times',
          fontSize: "6em",
          color: "	aliceblue",
          fontWeight: "bold",
          marginLeft: "482px"
        }} variant="h2">Todo App</Typography>
      </div>
      <div className="box">
        <div>
          <Button variant="contained" sx={{ fontFamily: 'Times, "Times New Roman", Times',
          fontSize: "2em",
          fontWeight: "bold",
          borderRadius:"133px",
          width:"200px",
          height:"90px",
          marginLeft: "149px",
          marginTop: "60px" }} onClick={Login} >Login</Button><br />
          <Button variant="contained" sx={{ fontFamily: 'Times, "Times New Roman", Times',
          fontSize: "2em",
          fontWeight: "bold",
          borderRadius:"133px",
          width:"200px",
          height:"90px", 
          marginLeft: "149px",
          marginTop: "70px" }} onClick={Signup} >SignUp</Button>
        </div>
      </div>
    </div>
  </>
  )
}
