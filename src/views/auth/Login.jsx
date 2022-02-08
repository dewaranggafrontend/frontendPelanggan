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
      <Grid
        container
        spacing={5}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={20}
        sx={{
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 13,
          },
        }}
      >
        <Grid
          item
          xs={12}
          lg={3.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            image="/assets/images/logo-dewarangga.png"
            alt="login img"
            sx={{ width: 350 }}
          />
          {/* <Typography
            sx={{
              fontSize: 13,
              color: Color.BLACK2_COLOR,
            }}
          >
            HRIS simple untuk kelola bisnis yang fleksibel
          </Typography> */}
        </Grid>
        {
          opsi === '1' ? (
            <Grid item xs={12} lg={3.5}>
              <Card sx={{ boxShadow: 5 }}>
                <CardHeader
                  title={
                    <Typography
                      sx={{
                        color: Color.WHITE_COLOR,
                        fontSize: 30,
                        fontWeight: 'bold',
                        px: 15,
                      }}
                    >
                      Super User Login
                    </Typography>
                  }
                  sx={{
                    textAlign: 'center',
                    bgcolor: Color.BLACK_COLOR,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <CardContent sx={{ px: 5 }}>
                  {/* <Box
                  sx={{ display: 'flex', flexDirection: 'row', ml: 1, my: 1 }}
                >
                  <Typography sx={{ color: Color.RED_COLOR, mr: 0.5 }}>
                    *
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: Color.BLACK2_COLOR }}>
                    Pastikan Anda memiliki Username dan Password untuk Login
                    dari Tim HR Perusahaan Anda
                  </Typography>
                </Box> */}

                  <Typography
                    sx={{
                      color: red[500],
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {error}
                  </Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 'bold', ml: 1 }}>
                    Username
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      fullWidth
                      required
                      sx={{
                        '& .MuiTextField-root': { m: 1 },
                      }}
                    >
                      <TextField
                        label="email"
                        type="email"
                        autoComplete="email"
                        //   name="email"
                        onChange={handleChange('email')}
                      />
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 'bold', ml: 1 }}
                      >
                        Password
                      </Typography>
                      <FormControl sx={{ m: 1 }} variant="outlined">
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
                        justifyContent: 'flex-end',
                        m: 1,
                      }}
                    >
                      <Box>
                        <Link href="#" onClick={() => setOpsi('2')}>
                          Forgot Password
                        </Link>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      disableElevation
                      fullWidth
                      sx={{
                        bgcolor: Color.SUBTHEME_COLOR,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        fontSize: 15,
                        '&:hover': {
                          bgcolor: Color.SUBTHEME_COLOR,
                        },
                      }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            // opsi === '2' ?
            <Grid item xs={12} lg={3.5}>
              <Card sx={{ boxShadow: 5 }}>
                <CardHeader
                  title={
                    <Typography
                      sx={{
                        color: Color.WHITE_COLOR,
                        fontSize: 30,
                        fontWeight: 'bold',
                        px: 15,
                      }}
                    >
                      Forgot Password
                    </Typography>
                  }
                  sx={{
                    textAlign: 'center',
                    bgcolor: Color.BLACK_COLOR,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <CardContent sx={{ px: 5 }}>
                  <Typography
                    sx={{
                      color: red[500],
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {error}
                  </Typography>
                  <Typography sx={{ fontSize: 18, fontWeight: 'bold', ml: 1 }}>
                    Email
                  </Typography>
                  <form onSubmit={handleSubmit2}>
                    <FormControl
                      fullWidth
                      required
                      sx={{
                        '& .MuiTextField-root': { m: 1 },
                      }}
                    >
                      <TextField
                        label="email"
                        type="email"
                        autoComplete="email"
                        //   name="email"
                        onChange={handleChange('email')}
                      />
                    </FormControl>
                    <Box
                      sx={{
                        fontSize: 13,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        m: 1,
                      }}
                    ></Box>
                    <Button
                      variant="contained"
                      disableElevation
                      fullWidth
                      onClick={() => setOpsi('1')}
                      sx={{
                        bgcolor: Color.SUBTHEME_COLOR,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        fontSize: 15,
                        mb: 2,
                        '&:hover': {
                          bgcolor: Color.SUBTHEME_COLOR,
                        },
                      }}
                      type="submit"
                    >
                      Send
                    </Button>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Link
                        sx={{ fontSize: 13 }}
                        href="#"
                        onClick={() => setOpsi('1')}
                      >
                        Login
                      </Link>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          )
          // : (
          //   <Grid item xs={12} lg={3.5}>
          //     <Card sx={{ boxShadow: 5 }}>
          //       <CardHeader
          //         title={
          //           <Typography
          //             sx={{
          //               color: Color.WHITE_COLOR,
          //               fontSize: 30,
          //               fontWeight: 'bold',
          //               px: 15,
          //             }}
          //           >
          //             Reset Password
          //           </Typography>
          //         }
          //         sx={{
          //           textAlign: 'center',
          //           bgcolor: Color.THEME_COLOR,
          //           borderTopLeftRadius: 10,
          //           borderTopRightRadius: 10,
          //         }}
          //       />
          //       <CardContent sx={{ px: 5 }}>
          //         <Typography
          //           sx={{
          //             color: red[500],
          //             display: 'flex',
          //             justifyContent: 'center',
          //           }}
          //         >
          //           {error}
          //         </Typography>
          //         <form onSubmit={handleSubmit3}>
          //           <FormControl
          //             fullWidth
          //             required
          //             sx={{
          //               '& .MuiTextField-root': { m: 1 },
          //             }}
          //           >
          //             <Typography
          //               sx={{ fontSize: 18, fontWeight: 'bold', ml: 1 }}
          //             >
          //               Old Password
          //             </Typography>
          //             <FormControl sx={{ m: 1 }} variant="outlined">
          //               {/* <InputLabel htmlFor="outlined-adornment-password">
          //                 old password
          //               </InputLabel> */}
          //               <OutlinedInput
          //                 id="outlined-adornment-password"
          //                 type={data.showPassword ? 'text' : 'password'}
          //                 value={data.old_password}
          //                 // name="password"
          //                 onChange={handleChange('old_password')}
          //                 endAdornment={
          //                   <InputAdornment position="end">
          //                     <IconButton
          //                       aria-label="toggle password visibility"
          //                       onClick={handleClickShowPassword}
          //                       onMouseDown={handleMouseDownPassword}
          //                       edge="end"
          //                     >
          //                       {data.showPassword ? (
          //                         <VisibilityOff />
          //                       ) : (
          //                         <Visibility />
          //                       )}
          //                     </IconButton>
          //                   </InputAdornment>
          //                 }
          //                 label="password"
          //               />
          //             </FormControl>
          //             <Typography
          //               sx={{ fontSize: 18, fontWeight: 'bold', ml: 1 }}
          //             >
          //               New Password
          //             </Typography>
          //             <FormControl sx={{ m: 1 }} variant="outlined">
          //               {/* <InputLabel htmlFor="outlined-adornment-password">
          //                 new password
          //               </InputLabel> */}
          //               <OutlinedInput
          //                 id="outlined-adornment-password"
          //                 type={data.showPasswordReset ? 'text' : 'password'}
          //                 value={data.new_password}
          //                 // name="password"
          //                 onChange={handleChangeReset('new_password')}
          //                 endAdornment={
          //                   <InputAdornment position="end">
          //                     <IconButton
          //                       aria-label="toggle password visibility"
          //                       onClick={handleClickShowPasswordReset}
          //                       onMouseDown={handleMouseDownPasswordReset}
          //                       edge="end"
          //                     >
          //                       {data.showPasswordReset ? (
          //                         <VisibilityOff />
          //                       ) : (
          //                         <Visibility />
          //                       )}
          //                     </IconButton>
          //                   </InputAdornment>
          //                 }
          //                 label="password"
          //               />
          //             </FormControl>
          //           </FormControl>
          //           <Box
          //             sx={{
          //               fontSize: 13,
          //               display: 'flex',
          //               justifyContent: 'flex-end',
          //               m: 1,
          //             }}
          //           ></Box>
          //           <Button
          //             variant="contained"
          //             disableElevation
          //             fullWidth
          //             sx={{
          //               bgcolor: Color.SUBTHEME_COLOR,
          //               textTransform: 'capitalize',
          //               fontWeight: 'bold',
          //               fontSize: 15,
          //               mb: 2,
          //               '&:hover': {
          //                 bgcolor: Color.SUBTHEME_COLOR,
          //               },
          //             }}
          //             type="submit"
          //           >
          //             Reset Password
          //           </Button>
          //         </form>
          //       </CardContent>
          //     </Card>
          //   </Grid>)
        }
        {/* Bates */}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 16,
          position: 'absolute',
          top: 830,
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            width: '100%',
            height: '4%',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 16,
            position: 'absolute',
            top: 830,
          },
        }}
      >
        <Typography
          sx={{
            color: Color.GRAY_COLOR,
            fontSize: 10,
          }}
        >
          copyright©{currentYear.getFullYear()} | by Dewarangga Digital Solution
        </Typography>
      </Box>
    </>
  );
}

export default Login;
