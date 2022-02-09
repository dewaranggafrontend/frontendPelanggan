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
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  //   showPassword: false,
  //   showPasswordReset: false,
  //   old_password: '',
  //   new_password: '',
  // });
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleClickShowPasswordConfirm = () => {
    setData({
      ...data,
      showPasswordConfirm: !data.showPasswordConfirm,
    });
  };

  const handleMouseDownPasswordConfirm = (event) => {
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
        <Grid item xs={4}>
          <CardMedia component="img" image="/assets/images/banner-log.png" />
          {/* <Typography
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
          /> */}
        </Grid>
        <Grid item xs={8} sx={{ bgcolor: Color.THEME_COLOR }}>
          {opsi === '1' ? (
            <>
              <Box sx={{ p: 18 }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    fontFamily: 'Ubuntu',
                  }}
                >
                  Login Member
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      mt: 5,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Username
                  </Typography>
                  <FormControl
                    fullWidth
                    required
                    margin="normal"
                    // sx={{
                    //   '& .MuiTextField-root': { m: 1 },
                    // }}
                  >
                    <TextField
                      label="email"
                      type="email"
                      autoComplete="email"
                      //   name="email"
                      onChange={handleChange('email')}
                    />
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        mt: 2,
                        fontFamily: 'Ubuntu',
                      }}
                    >
                      Password
                    </Typography>
                    <FormControl variant="outlined" margin="normal">
                      <InputLabel htmlFor="outlined-adornment-password">
                        password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={data.showPassword ? 'text' : 'password'}
                        value={data.password}
                        // name="password"
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {data.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="password"
                      />
                    </FormControl>
                  </FormControl>
                  <Box
                    sx={{
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      m: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      // disableElevation
                      // fullWidth
                      sx={{
                        bgcolor: Color.SUBTHEME_COLOR,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        px: 5,
                        py: 1,
                        fontSize: 15,
                        '&:hover': {
                          bgcolor: Color.SUBTHEME_COLOR,
                        },
                      }}
                      type="submit"
                    >
                      Login
                    </Button>
                    <Box>
                      <Link href="#" onClick={() => setOpsi('forgot_1')}>
                        Forgot Password
                      </Link>
                    </Box>
                  </Box>
                </form>
                <Box
                  sx={{
                    display: 'flex',
                    // bgcolor: Color.GREEN_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 30,
                  }}
                >
                  <Typography sx={{ fontFamily: 'Ubuntu', mr: 2 }}>
                    Don't have any account?
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: Color.BLACK_COLOR,
                      borderRadius: 5,
                      px: 3,
                    }}
                    onClick={() => setOpsi('2')}
                  >
                    <Typography
                      sx={{
                        color: Color.BLACK_COLOR,
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                      }}
                    >
                      Register Now
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </>
          ) : opsi === '2' ? (
            <>
              <Box sx={{ py: 10, px: 40 }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    fontFamily: 'Ubuntu',
                  }}
                >
                  Register to Dewarangga
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} sx={{ mt: 1.5 }}>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        First Name
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        size="small"
                        margin="normal"
                        id="first_name"
                        // label="First Name"
                        type="text"
                        name="first_name"
                        onChange={onChange}
                        value={data.first_name}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Last Name
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        // error={errorData.last_name !== undefined ? true : false}
                        // helperText={
                        //   errorData.last_name !== undefined
                        //     ? errorData.last_name[0]
                        //     : null
                        // }
                        margin="normal"
                        id="last_name"
                        // label="Last Name"
                        type="text"
                        name="last_name"
                        onChange={onChange}
                        value={data.last_name}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Username
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        size="small"
                        margin="normal"
                        id="username"
                        // label="First Name"
                        type="text"
                        name="username"
                        onChange={onChange}
                        value={data.username}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Email
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        // error={errorData.last_name !== undefined ? true : false}
                        // helperText={
                        //   errorData.last_name !== undefined
                        //     ? errorData.last_name[0]
                        //     : null
                        // }
                        margin="normal"
                        id="email"
                        // label="Last Name"
                        type="email"
                        name="email"
                        onChange={onChange}
                        value={data.email}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item md={12}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Phone Number
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        size="small"
                        margin="normal"
                        id="phoneNumber"
                        // label="First Name"
                        type="number"
                        name="phone_number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                sx={{
                                  // bgcolor: Color.DUST_COLOR,
                                  pr: 2,
                                  py: 1,
                                  borderRight: 1,
                                  borderRightColor: Color.GRAY_COLOR,
                                }}
                              >
                                <Typography sx={{ fontWeight: 'bold' }}>
                                  +62
                                </Typography>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                        onChange={onChange}
                        value={data.phone_number}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Password
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        required
                        // error={errorData.password !== undefined ? true : false}
                        // helperText={
                        //   errorData.password !== undefined
                        //     ? errorData.password[0]
                        //     : null
                        // }
                        margin="normal"
                        id="password"
                        // label="password"
                        type={data.showPassword ? 'text' : 'password'}
                        name="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {data.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Confirm Password
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        required
                        // error={errorData.password !== undefined ? true : false}
                        // helperText={
                        //   errorData.password !== undefined
                        //     ? errorData.password[0]
                        //     : null
                        // }
                        margin="normal"
                        id="passwordConfirm"
                        // label="password"
                        type={data.showPasswordConfirm ? 'text' : 'password'}
                        name="password_confirm"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordConfirm}
                                onMouseDown={handleMouseDownPasswordConfirm}
                                edge="end"
                              >
                                {data.showPasswordConfirm ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={onChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                          // mt: 3,
                        }}
                      >
                        Company Name
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        size="small"
                        margin="normal"
                        id="companyName"
                        // label="First Name"
                        type="text"
                        name="company_name"
                        onChange={onChange}
                        value={data.company_name}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        sx={{
                          // color: Color.BLUE_COLOR,
                          fontFamily: 'Ubuntu',
                          fontSize: 15,
                          fontWeight: 'bold',
                          display: 'flex',
                        }}
                      >
                        Job Position
                        <Typography sx={{ color: Color.RED_COLOR }}>
                          *
                        </Typography>
                      </Typography>
                      <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        // error={errorData.last_name !== undefined ? true : false}
                        // helperText={
                        //   errorData.last_name !== undefined
                        //     ? errorData.last_name[0]
                        //     : null
                        // }
                        margin="normal"
                        id="jobPosition"
                        // label="Last Name"
                        type="text"
                        name="job_position"
                        onChange={onChange}
                        value={data.job_position}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      // disableElevation
                      // fullWidth
                      sx={{
                        bgcolor: Color.SUBTHEME_COLOR,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        px: 5,
                        py: 1,
                        fontSize: 15,
                        '&:hover': {
                          bgcolor: Color.SUBTHEME_COLOR,
                        },
                      }}
                      // type="submit"
                      onClick={() => setOpsi('1')}
                    >
                      Create Account
                    </Button>
                    <Box
                      sx={{
                        display: 'flex',
                        // bgcolor: Color.GREEN_COLOR,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontFamily: 'Ubuntu', mr: 0.5 }}>
                        Already a member?
                      </Typography>
                      <Button
                        // variant="outlined"
                        onClick={() => setOpsi('1')}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                          }}
                        >
                          Login
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </>
          ) : opsi === 'forgot_1' ? (
            <>
              <Box sx={{ p: 10 }}>
                <IconButton
                  sx={{ border: 1, borderColor: Color.GRAY_COLOR }}
                  onClick={() => setOpsi('1')}
                >
                  <i
                    class="ri-arrow-left-s-line"
                    style={{ fontWeight: 'bold' }}
                  ></i>
                </IconButton>
                <Box sx={{ py: 10, px: 25 }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Forgot Password
                  </Typography>
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      // fontSize: 30,
                      fontFamily: 'Ubuntu',
                      mt: 5,
                    }}
                  >
                    Enter the email address you used when you joined and we'll
                    send you instruction to reset your password
                  </Typography>
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      // fontSize: 30,
                      fontFamily: 'Ubuntu',
                      mt: 2,
                    }}
                  >
                    For security reasons, we do NOT store your password. So rest
                    assured that we will never send your password via email
                  </Typography>

                  <Typography
                    sx={{
                      // color: Color.BLUE_COLOR,
                      fontFamily: 'Ubuntu',
                      fontSize: 15,
                      fontWeight: 'bold',
                      // display: 'flex',
                      mt: 5,
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    size="small"
                    margin="normal"
                    id="username"
                    // label="First Name"
                    type="text"
                    name="username"
                    onChange={onChange}
                    value={data.username}
                  />
                  <Button
                    variant="contained"
                    // disableElevation
                    // fullWidth
                    sx={{
                      bgcolor: Color.SUBTHEME_COLOR,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      px: 5,
                      py: 1,
                      mt: 3,
                      fontSize: 15,
                      '&:hover': {
                        bgcolor: Color.SUBTHEME_COLOR,
                      },
                    }}
                    // type="submit"
                    onClick={() => setOpsi('forgot_2')}
                  >
                    Send Reset Instruction
                  </Button>
                </Box>
              </Box>
            </>
          ) : opsi === 'forgot_2' ? (
            <>
              <Box sx={{ p: 10 }}>
                <IconButton
                  sx={{ border: 1, borderColor: Color.GRAY_COLOR }}
                  onClick={() => setOpsi('forgot_1')}
                >
                  <i
                    class="ri-arrow-left-s-line"
                    style={{ fontWeight: 'bold' }}
                  ></i>
                </IconButton>
                <Box sx={{ py: 10, px: 25 }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Check your email
                  </Typography>
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      // fontSize: 30,
                      fontFamily: 'Ubuntu',
                      mt: 5,
                    }}
                  >
                    We sent a password reset link to sample@email.com
                  </Typography>
                  <a
                    href="https://mail.google.com/mail/u/0/#inbox"
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="contained"
                      // disableElevation
                      // fullWidth
                      sx={{
                        bgcolor: Color.SUBTHEME_COLOR,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        px: 5,
                        py: 1,
                        mt: 10,
                        fontSize: 15,
                        '&:hover': {
                          bgcolor: Color.SUBTHEME_COLOR,
                        },
                      }}
                      // type="submit"
                      onClick={() => setOpsi('forgot_3')}
                    >
                      Open Email App
                    </Button>
                  </a>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 10 }}>
                    <Typography sx={{ fontFamily: 'Ubuntu', mr: 0.5 }}>
                      Didn't receive the email?
                    </Typography>
                    <Button>
                      <Typography
                        sx={{
                          fontFamily: 'Ubuntu',
                          textTransform: 'capitalize',
                        }}
                      >
                        Click to resend
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ) : opsi === 'forgot_3' ? (
            <>
              <Box sx={{ p: 10 }}>
                <IconButton
                  sx={{ border: 1, borderColor: Color.GRAY_COLOR }}
                  onClick={() => setOpsi('forgot_2')}
                >
                  <i
                    class="ri-arrow-left-s-line"
                    style={{ fontWeight: 'bold' }}
                  ></i>
                </IconButton>
                <Box sx={{ py: 10, px: 25 }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Reset new password
                  </Typography>
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      // fontSize: 30,
                      fontFamily: 'Ubuntu',
                      mt: 5,
                    }}
                  >
                    Your new password must be different to previously used
                    password
                  </Typography>
                  <Typography
                    sx={{
                      // color: Color.BLUE_COLOR,
                      fontFamily: 'Ubuntu',
                      fontSize: 15,
                      fontWeight: 'bold',
                      // display: 'flex',
                      mt: 5,
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    required
                    // error={errorData.password !== undefined ? true : false}
                    // helperText={
                    //   errorData.password !== undefined
                    //     ? errorData.password[0]
                    //     : null
                    // }
                    margin="normal"
                    id="password"
                    // label="password"
                    type={data.showPassword ? 'text' : 'password'}
                    name="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {data.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                  />
                  <Typography
                    sx={{
                      // color: Color.BLUE_COLOR,
                      fontFamily: 'Ubuntu',
                      fontSize: 15,
                      fontWeight: 'bold',
                      // display: 'flex',
                      mt: 2,
                    }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    required
                    // error={errorData.password !== undefined ? true : false}
                    // helperText={
                    //   errorData.password !== undefined
                    //     ? errorData.password[0]
                    //     : null
                    // }
                    margin="normal"
                    id="passwordConfirm"
                    // label="password"
                    type={data.showPasswordConfirm ? 'text' : 'password'}
                    name="password_confirm"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirm}
                            onMouseDown={handleMouseDownPasswordConfirm}
                            edge="end"
                          >
                            {data.showPasswordConfirm ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                  />
                  <Button
                    variant="contained"
                    // disableElevation
                    // fullWidth
                    sx={{
                      bgcolor: Color.SUBTHEME_COLOR,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      px: 5,
                      py: 1,
                      mt: 5,
                      fontSize: 15,
                      '&:hover': {
                        bgcolor: Color.SUBTHEME_COLOR,
                      },
                    }}
                    // type="submit"
                    onClick={() => setOpsi('forgot_4')}
                  >
                    Reset Password
                  </Button>
                </Box>
              </Box>
            </>
          ) : opsi === 'forgot_4' ? (
            <>
              <Box sx={{ p: 10 }}>
                {/* <IconButton
                  sx={{ border: 1, borderColor: Color.GRAY_COLOR }}
                  onClick={() => setOpsi('forgot_1')}
                >
                  <i
                    class="ri-arrow-left-s-line"
                    style={{ fontWeight: 'bold' }}
                  ></i>
                </IconButton> */}
                <Box sx={{ py: 10, px: 25 }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 30,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Password Reset
                  </Typography>
                  <Typography
                    sx={{
                      // fontWeight: 'bold',
                      // fontSize: 30,
                      fontFamily: 'Ubuntu',
                      mt: 5,
                    }}
                  >
                    Your password has been successfully reset. Click below to
                    log in
                  </Typography>
                  <Button
                    variant="contained"
                    // disableElevation
                    // fullWidth
                    sx={{
                      bgcolor: Color.SUBTHEME_COLOR,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      px: 5,
                      py: 1,
                      mt: 7,
                      fontSize: 15,
                      '&:hover': {
                        bgcolor: Color.SUBTHEME_COLOR,
                      },
                    }}
                    // type="submit"
                    onClick={() => setOpsi('1')}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
