import { useState, useEffect } from "react";
import React from 'react'
import { Box, TextField, Link, Typography, Card } from "@mui/material"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [allFiles, setAllFiles] = useState([])
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    console.log(e.target.files)
    setSelectedFile(e.target.files[0])

  }

  const getAllFiles = async () => {
    console.log('here')
    const response = await fetch('http://127.0.0.1:8000/process/allfiles/', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    console.log('here too')

    if (response.status === 200) {

      const data = await response.json()
      console.log(data)
      setAllFiles(data)

    }
    else {
      console.log(response)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('File not selected')
    }
    const formData = new FormData()
    formData.append('file', selectedFile)
    const response = await fetch('http://127.0.0.1:8000/process/upload/', {
      method: 'POST',
      // headers: {'Content-Type': 'multipart/form-data'},
      body: formData
    });

    if (response.status === 200) {
      console.log('Uploaded file')
      window.location.reload();
    }
    else {
      console.log(`Error: ${response.status}`)
    }
  }

  React.useEffect(() => {
    getAllFiles()
  }, [])

  return (
    <div >
      <div style={{ display: 'flex', marginLeft: '5px' }}>
        <div>
          <h2>Upload a CSV File</h2>
        </div>

      </div>
      <div style={{ display: 'flex', marginLeft: '5px', }}>
        <input type="file" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload</button>
      </div>
      <Box>
        <Box mr={'10%'} ml={'10%'} mt={'20px'}>
          {allFiles.map((s) => (
            <>
              <Card elevation={3} style={{ margin: '10px' }}>

                <Link to={`/allfiles/${s.id}/`} onClick={() => { navigate(`/allfiles/${s.id}`) }} style={{ textDecoration: "none" }}>
                  <Box display={'flex'} justifyContent={'center'} m={'10px'}>

                    <Box>
                      <Typography variant="h6">
                        {s.filepath}
                      </Typography>
                    </Box>

                  </Box>
                </Link>

              </Card>
            </>
          ))}
        </Box>
      </Box>
    </div>
  )
}

export default LandingPage