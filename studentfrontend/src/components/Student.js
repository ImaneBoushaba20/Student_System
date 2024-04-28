//import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper ,Button } from '@mui/material';
import React, {useEffect , useState} from 'react';

export default function Student() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])
    const handleClick = (e) => {
      e.preventDefault();
      const student = { name, address };
      console.log(student);
      fetch("http://localhost:9090/student/add", {
        method: "POST", // Corrected property name to "method"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      })
        .then(() => {
          console.log("New Student added");
        })
        .catch((error) => {
          console.error("Error adding new student:", error);
        });
    };
    
    useEffect(() => {
      fetch("http://localhost:9090/student/getAll")
        .then((res) => res.json())
        .then((result) => setStudents(result))
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }, []);
    

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)} />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>
      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"lrft"}} key={student.id}>
          Id:{student.id}<br/>
          Name:{student.name}<br/>
          Address:{student.address}<br/>
        </Paper>
      ))}

    </Paper>
    </Container>
  );
}
