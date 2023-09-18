import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  ThemeProvider, createTheme
} from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  const cardStyle = {
    maxWidth: 300,
    margin: '0 auto',
    marginTop: 150,
    padding: 20,
    textAlign: 'center',
    borderRadius: 30,
    backgroundColor: 'lightgrey',
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  
  const inputStyle = {
    margin: 'auto',
    padding: 12,
    minWidth: 250,
  };
  
  const buttonStyle = {
    margin: 'auto',
    maxWidth: 100,
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Card elevation={24} style={cardStyle}>
        <CardContent>
          <Typography variant="h4" component="h2">
            Register
          </Typography>
          <form style={formStyle} onSubmit={registerUser}>
            <TextField
              style={inputStyle}
              placeholder="Username"
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              style={inputStyle}
              placeholder="Password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              style={buttonStyle}
              variant="contained"
              color="warning"
              type="submit"
              name="submit"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default RegisterForm;