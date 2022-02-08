import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Box, fontSize } from '@mui/system';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import Color from '../../variable/Color';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authentication, menuAtom } from '../../store/Recoil';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';

function Login() {
  const theme = useTheme();
  const [auth, setAuth] = useRecoilState(authentication);
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [opsi, setOpsi] = useState('1');
  const [data, setData] = useState({
    email: '',
    password: '',
    showPassword: false,
    showPasswordReset: false,
    old_password: '',
    new_password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleChangeReset = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const currentYear = new Date();

  //   const handleChange = (e) => {
  //     setData({
  //       ...data,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordReset = () => {
    setData({
      ...data,
      showPasswordReset: !data.showPasswordReset,
    });
  };

  const handleMouseDownPasswordReset = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    await axios
      .post(smd_url + 'login', formData)
      .then((res) => {
        setAuth({
          auth: true,
          user: res.data.success.user,
        });
        let data = res.data.success;
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('employee_id', data.user.employee_id);
        navigate('/dashboard');
        setMenu('0');
      })
      .catch((err) => {
        let responseError = err.response.data;
        if (responseError.error === 'error') {
          setError('invalid email or passwod');
        }
        console.log(responseError);
      });
  };

  const handleSubmit2 = async (e) => {
    setOpsi('3');
  };

  const handleSubmit3 = async (e) => {
    navigate('/');
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ bgcolor: Color.RED_COLOR }}>
          <CardMedia
            component="img"
            height="892"
            image="/assets/images/sample_bg.jpeg"
            // alt="green iguana"
          />
          <Typography
            sx={{ position: 'absolute', color: Color.WHITE_COLOR, top: 5 }}
          >
            Hello
          </Typography>
          <CardMedia
            component="img"
            // height="892"
            image="/assets/images/logo-dewarangga.png"
            // alt="green iguana"
            sx={{
              position: 'absolute',
              color: Color.WHITE_COLOR,
              top: 20,
              width: 100,
            }}
          />
        </Grid>
        <Grid item xs={8} sx={{ bgcolor: Color.GREEN_COLOR }}>
          <Typography>Hello2</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
