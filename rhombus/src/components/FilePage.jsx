import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Link, TextField, Typography, Card, MenuItem, Button } from "@mui/material"

const FilePage = () => {
  const [file, setFile] = useState({})
  const [dtype, setDtype] = useState({})
  const [val, setVal] = useState('')
  let { id } = useParams()
  const datatypes = [
    {
      value: 'string',
      label: 'string'
    },
    {
      value: 'Int64',
      label: 'Int64'
    },
    {
      value: 'Int32',
      label: 'Int32'
    },
    {
      value: 'Int16',
      label: 'Int16'
    },
    {
      value: 'Int8',
      label: 'Int8'
    },
    {
      value: 'Float32',
      label: 'Float32'
    },
    {
      value: 'Float64',
      label: 'Float64'
    },
    {
      value: 'datetime64[ns]',
      label: 'datetime64[ns]'
    },
    {
      value: 'timestamp',
      label: 'timestamp'
    },
    {
      value: 'category',
      label: 'category'
    },
    {
      value: 'complex',
      label: 'complex'
    }
  ]

  const getFileById = async () => {
    console.log('here')
    const response = await fetch(`http://127.0.0.1:8000/process/allfiles/display/${id}/`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
    if (response.status === 200) {
      const data = await response.json()
      setFile(data)
      const v = { ...dtype, dtype: JSON.parse(data['dtype']) }
      console.log(v)
      setDtype({ ...dtype, dtype: JSON.parse(data['dtype']) })
      console.log(data)
    }
    else {
      console.log(response.status)
    }
  }

  const handleUpdate = async () => {
    const response = await fetch(`http://127.0.0.1:8000/process/allfiles/update/${id}/`,{
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: {file}
    });
    if(response.status === 200){
      console.log('success')
      window.location.reload()
    }
    else{
      console.log(response.status)
    }
  }

  const handleChange = (event, key) => {
    setFile((prevData) => ({
      ...prevData,
      dtype: {
        ...prevData.dtype,
        [key]: event.target.value,
      },
    }));
  };

  React.useEffect(()=>{
    getFileById();
  },[])

  return (
    <>
      <Box margin={'10%'}>
        <Card>
          
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'}>
            {Object.entries(dtype.dtype).map(([k, v]) => (

              <>
                {console.log(dtype.dtype[k])}
                <Box display={'flex'} key={k}>
                  <Box m={'10px'}>
                    <Typography>
                      {k}
                    </Typography>
                  </Box>
                  <Box m={'10px'}>

                    <TextField
                      select

                      fullWidth
                      variant="outlined"
                      value={dtype.dtype[k]}
                      onChange={handleChange}
                    >
                      {datatypes.map((d) => (
                        <MenuItem key={d.label} value={d.value}>
                          {d.label}
                        </MenuItem>
                      ))}
                    </TextField>

                  </Box>

                </Box>
              </>
            ))}
          </Box>
          <Box>
            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default FilePage