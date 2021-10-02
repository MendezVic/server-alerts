/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
const example = [
  {
    server: 'xxxx',
    description: 'aaaaa',
    created_at: 'hh-mm-ss-dd-mm-yyyy',
    server_type: 'onprem/virtual',
  },
  {
    server: 'xxxx',
    description: 'bbbbb',
    created_at: 'hh-mm-ss-dd-mm-yyyy',
    server_type: 'onprem/virtual',
  },
  {
    server: 'xxxx',
    description: 'ccccc',
    created_at: 'hh-mm-ss-dd-mm-yyyy',
    server_type: 'onprem/virtual',
  },
  {
    server: 'xxxx',
    description: 'ddddd',
    created_at: 'hh-mm-ss-dd-mm-yyyy',
    server_type: 'onprem/virtual',
  },
  {
    server: 'xxxx',
    description: 'eeeee',
    created_at: 'hh-mm-ss-dd-mm-yyyy',
    server_type: 'onprem/virtual',
  },
];

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(example);
  }, []);
  const showData = () => {};
  return (
    <div>
      <TextField label='Ingrese descripcion del problema o nombre del server'></TextField>
      {/* <span>{JSON.stringify(data)}</span> */}
    </div>
  );
};

export default HomePage;
