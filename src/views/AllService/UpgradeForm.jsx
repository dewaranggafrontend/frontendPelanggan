import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Typography,
  Divider,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { smd_url } from '../../variable/BaseUrl';
import Color from '../../variable/Color';
import CheckIcon from '@mui/icons-material/Check';
import { NavLink } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

function UpgradeForm(props) {
  const [errorData, setErrorData] = useState('');
  const [data, setData] = useState('');
  const [position, setPosition] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState('1');

  // const handleStep = (opsi) => {
  //   setStep(opsi);
  // };

  const getDepartment = async () => {
    await axios
      .get(smd_url + 'departments', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const getPosition = async () => {
    await axios
      .get(smd_url + 'positions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setPosition(res.data);
      });
  };

  const getAdmin = async () => {
    await axios
      .get(smd_url + 'users/admin', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setAdmin(res.data);
      });
  };

  const getUser = async () => {
    await axios
      .get(`${smd_url}users/get/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getPosition();
    getAdmin();
    getDepartment();
    if (props.type === 'edit') {
      getUser();
    }
  }, []);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowCPassword = () => {
    setData({
      ...data,
      showCPassword: !data.showCPassword,
    });
  };

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('c_password', data.c_password);
    formData.append('admin', data.admin);
    formData.append('basic_salary', data.basic_salary);
    formData.append('company_name', data.company_name);
    formData.append('department', data.department);
    formData.append('employee_id', data.employee_id);
    formData.append('job_position', data.job_position);
    formData.append('join_date', data.join_date);
    formData.append('level', data.level);
    formData.append('allowance_1', data.allowance_1);
    formData.append('allowance_2', data.allowance_2);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);

    await axios
      .post(smd_url + 'users/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        console.log(formData);
        setStep('done');
      })
      .catch((err) => {
        setErrorData(err.response.data.errors.location);
      });
  };

  const handlePage2 = async (e) => {
    e.preventDefault();
    setStep('2');
  };
  const handlePage3 = async (e) => {
    e.preventDefault();
    setStep('3');
  };
  console.log(data);
  return (
    <Box>
      {/* <Box
        sx={{
          p: 0.7,
          bgcolor: Color.GRAY2_COLOR,
        }}
      /> */}
      <CardContent>
        {/* <form onSubmit={handleSubmit}> */}
        <Grid item md={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Box
                sx={
                  step === '1'
                    ? {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        bgcolor: Color.SUBTHEME_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        border: 2,
                        borderColor: Color.SUBTHEME_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                }
              >
                {step === '1' ? (
                  <Typography
                    sx={{ color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }}
                  >
                    1
                  </Typography>
                ) : (
                  <CheckIcon sx={{ color: Color.SUBTHEME_COLOR }} />
                )}
              </Box>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}>
                Package
              </Typography>
            </Box>
            <Box
              sx={{
                height: 2,
                width: 200,
                bgcolor: Color.GRAY_COLOR,
                mx: 1,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Box
                sx={
                  step === '2'
                    ? {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        // border: 2,
                        // borderColor: Color.GRAY_COLOR,
                        bgcolor: Color.SUBTHEME_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : step === '3' || step === 'done'
                    ? {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        border: 2,
                        borderColor: Color.BLUE_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        border: 2,
                        borderColor: Color.GRAY_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                }
              >
                {step === '3' || step === 'done' ? (
                  <CheckIcon sx={{ color: Color.SUBTHEME_COLOR }} />
                ) : (
                  <Typography
                    sx={
                      step === '2'
                        ? { color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }
                        : { color: Color.GRAY_COLOR, fontFamily: 'Ubuntu' }
                    }
                  >
                    2
                  </Typography>
                )}
              </Box>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}>
                Payment Method
              </Typography>
            </Box>
            <Box
              sx={{
                height: 2,
                width: 200,
                bgcolor: Color.GRAY_COLOR,
                mx: 1,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Box
                sx={
                  step === '3'
                    ? {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        // border: 2,
                        // borderColor: Color.GRAY_COLOR,
                        bgcolor: Color.SUBTHEME_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : step === 'done'
                    ? {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        border: 2,
                        borderColor: Color.BLUE_COLOR,
                        // bgcolor: Color.SUBTHEME_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    : {
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        border: 2,
                        borderColor: Color.GRAY_COLOR,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                }
              >
                {step === 'done' ? (
                  <CheckIcon sx={{ color: Color.SUBTHEME_COLOR }} />
                ) : (
                  <Typography
                    sx={
                      step === '3'
                        ? { color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }
                        : { color: Color.GRAY_COLOR, fontFamily: 'Ubuntu' }
                    }
                  >
                    3
                  </Typography>
                )}
                {/* <Typography
                    sx={
                      step === '3'
                        ? { color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }
                        : { color: Color.GRAY_COLOR, fontFamily: 'Ubuntu' }
                    }
                  >
                    3
                  </Typography> */}
              </Box>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}>
                Transaction
              </Typography>
            </Box>
          </Box>
        </Grid>
        {step === '1' ? (
          <form onSubmit={handlePage2}>
            <Box sx={{ px: 30, pt: 5 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu', fontSize: 20 }}
              >
                Package Info
              </Typography>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 12 }}>
                Fill all package information
              </Typography>
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
                    Package
                    <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    select
                    size="small"
                    error={errorData.package !== undefined ? true : false}
                    helperText={
                      errorData.package !== undefined
                        ? errorData.package[0]
                        : null
                    }
                    id="package"
                    // label="Department"
                    margin="normal"
                    name="package"
                    value={data.package !== undefined ? data.package : ''}
                    onChange={onChange}
                  >
                    {department.map((item) => (
                      <MenuItem value={item.department_name} key={item.id}>
                        {item.department_name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    User Max
                    <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    disabled
                    size="small"
                    // error={errorData.last_name !== undefined ? true : false}
                    // helperText={
                    //   errorData.last_name !== undefined
                    //     ? errorData.last_name[0]
                    //     : null
                    // }
                    margin="normal"
                    id="userMax"
                    // label="Last Name"
                    type="text"
                    name="user_max"
                    onChange={onChange}
                    // value={data.last_name !== undefined ? data.last_name : ''}
                    value={100}
                    sx={{ bgcolor: Color.DIS_COLOR }}
                  />
                </Grid>
              </Grid>
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
                    Duration
                    <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    disabled
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              // bgcolor: Color.DUST_COLOR,
                              pl: 2,
                              py: 1,
                              borderLeft: 1,
                              borderLeftColor: Color.GRAY_COLOR,
                            }}
                          >
                            <Typography sx={{ fontWeight: 'bold' }}>
                              month
                            </Typography>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    // error={errorData.last_name !== undefined ? true : false}
                    // helperText={
                    //   errorData.last_name !== undefined
                    //     ? errorData.last_name[0]
                    //     : null
                    // }
                    margin="normal"
                    id="duration"
                    // label="Last Name"
                    type="text"
                    name="duration"
                    onChange={onChange}
                    // value={data.last_name !== undefined ? data.last_name : ''}
                    value={100}
                    sx={{ bgcolor: Color.DIS_COLOR }}
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
                    Price
                    <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    disabled
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              // bgcolor: Color.DUST_COLOR,
                              pr: 1.5,
                              py: 1,
                              borderRight: 1,
                              borderRightColor: Color.GRAY_COLOR,
                            }}
                          >
                            <Typography sx={{ fontWeight: 'bold' }}>
                              Rp.
                            </Typography>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    // error={errorData.last_name !== undefined ? true : false}
                    // helperText={
                    //   errorData.last_name !== undefined
                    //     ? errorData.last_name[0]
                    //     : null
                    // }
                    margin="normal"
                    id="price"
                    // label="Last Name"
                    type="text"
                    name="price"
                    onChange={onChange}
                    // value={data.last_name !== undefined ? data.last_name : ''}
                    value={100}
                    sx={{ bgcolor: Color.DIS_COLOR }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                mt={3}
                // sx={{ bgcolor: Color.RED_COLOR }}
              >
                <Grid
                  item
                  xs={10}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <NavLink to="/all-service" style={{ textDecoration: 'none' }}>
                    <Button
                      // variant="contained"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        color: Color.BLACK_COLOR,
                      }}
                    >
                      Back
                    </Button>
                  </NavLink>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ justifyContent: 'flex-end', display: 'flex' }}
                >
                  {data.package != null ? (
                    <Button
                      // disabled
                      variant="contained"
                      type="submit"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        px: 5,
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      type="submit"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        px: 5,
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        ) : step === '2' ? (
          <form onSubmit={handlePage3}>
            <Box sx={{ px: 30, pt: 5 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu', fontSize: 20 }}
              >
                Payment Information
              </Typography>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 12 }}>
                Choose your payment method here
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Ubuntu',
                  display: 'flex',
                  fontWeight: 'bold',
                  mt: 5,
                }}
              >
                Choose Payment
                <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
              </Typography>
              <RadioGroup
                row
                required
                aria-label="gender"
                name="gender"
                value={data.gender !== undefined ? data.gender : ''}
                onChange={onChange}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ bgcolor: Color.GREEN_COLOR, mt: 2 }}
                  maxWidth={500}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 3,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    E-Money
                  </Typography>
                  <Grid item xs={4}>
                    <FormControlLabel
                      //   disabled
                      value="gopay"
                      control={<Radio />}
                      label={
                        <CardMedia
                          component="img"
                          image="/assets/images/minilogo/gopay.png"
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      //   disabled
                      value="qris"
                      control={<Radio />}
                      label={
                        <CardMedia
                          component="img"
                          image="/assets/images/minilogo/qris.png"
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      //   disabled
                      value="shopeepay"
                      control={<Radio />}
                      label={
                        <CardMedia
                          component="img"
                          image="/assets/images/minilogo/spay.png"
                        />
                      }
                    />
                  </Grid>
                </Grid>
                {/* <FormControlLabel
                  //   disabled
                  value="male"
                  control={<Radio />}
                  label={
                    <CardMedia
                      component="img"
                      image="/assets/images/minilogo/akulaku.png"
                    />
                  }
                />
                <FormControlLabel
                  //   disabled
                  value="female"
                  control={<Radio />}
                  label="Female"
                /> */}
              </RadioGroup>

              <Grid container spacing={2} sx={{ mt: 1.5 }}>
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
                    Basic Salary
                    <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    size="small"
                    error={errorData.basic_salary !== undefined ? true : false}
                    helperText={
                      errorData.basic_salary !== undefined
                        ? errorData.basic_salary[0]
                        : null
                    }
                    margin="normal"
                    id="basic_salary"
                    // label="Basic Salary"
                    type="number"
                    min="0"
                    name="basic_salary"
                    onChange={onChange}
                    value={
                      data.basic_salary !== undefined ? data.basic_salary : ''
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1.5 }}>
                <Grid item md={6}>
                  <Typography
                    sx={{
                      // color: Color.BLUE_COLOR,
                      fontFamily: 'Ubuntu',
                      fontSize: 15,
                      fontWeight: 'bold',
                      // mt: 3,
                    }}
                  >
                    Allowance 1
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    error={errorData.allowance_1 !== undefined ? true : false}
                    helperText={
                      errorData.allowance_1 !== undefined
                        ? errorData.allowance_1[0]
                        : null
                    }
                    margin="normal"
                    id="allowance_1"
                    // label="Allowance 1"
                    type="number"
                    min="0"
                    name="allowance_1"
                    onChange={onChange}
                    value={
                      data.allowance_1 !== undefined ? data.allowance_1 : ''
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography
                    sx={{
                      // color: Color.BLUE_COLOR,
                      fontFamily: 'Ubuntu',
                      fontSize: 15,
                      fontWeight: 'bold',
                      // mt: 3,
                    }}
                  >
                    Allowance 2
                  </Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    size="small"
                    error={errorData.allowance_2 !== undefined ? true : false}
                    helperText={
                      errorData.allowance_2 !== undefined
                        ? errorData.allowance_2[0]
                        : null
                    }
                    margin="normal"
                    id="allowance_2"
                    // label="Allowance 2"
                    type="number"
                    min="0"
                    name="allowance_2"
                    onChange={onChange}
                    value={
                      data.allowance_2 !== undefined ? data.allowance_2 : ''
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                mt={3}
                // sx={{ bgcolor: Color.RED_COLOR }}
              >
                <Grid
                  item
                  xs={10}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    // variant="contained"
                    sx={{
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 18,
                      color: Color.BLACK_COLOR,
                    }}
                    onClick={() => setStep('1')}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ justifyContent: 'flex-end', display: 'flex' }}
                >
                  {data.basic_salary &&
                  data.allowance_1 &&
                  data.allowance_2 != null ? (
                    <Button
                      // disabled
                      variant="contained"
                      type="submit"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        px: 5,
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      type="submit"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        px: 5,
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box sx={{ px: 30, pt: 5 }}>
              {step === 'done' ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 10,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      fontSize: 20,
                    }}
                  >
                    Your data has been saved successfully
                  </Typography>
                  <Box
                    sx={{
                      height: 131,
                      width: 131,
                      borderRadius: 131 / 2,
                      border: 2,
                      borderColor: Color.GREEN_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: 10,
                    }}
                  >
                    <CheckIcon
                      sx={{ color: Color.GREEN_COLOR, fontSize: 80 }}
                    />
                  </Box>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Ubuntu',
                        fontSize: 20,
                      }}
                    >
                      Submit Employee Data
                    </Typography>
                    <Typography
                      sx={{ fontFamily: 'Ubuntu', fontSize: 12, mt: 2 }}
                    >
                      You have successfully added employee data. To continue the
                      process, you
                    </Typography>
                    <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 12 }}>
                      can submit the employees data to access
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      py: 3,
                      px: 10,
                      bgcolor: Color.LIGHTGRAY2_COLOR,
                      mt: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontSize: 15,
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      User Role
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      select
                      // size="small"
                      error={errorData.level !== undefined ? true : false}
                      helperText={
                        errorData.level !== undefined
                          ? errorData.level[0]
                          : null
                      }
                      id="level"
                      // label="Department"
                      margin="normal"
                      name="level"
                      value={data.level !== undefined ? data.level : ''}
                      onChange={onChange}
                    >
                      <MenuItem value="1">Superadmin</MenuItem>
                      <MenuItem value="2">Admin</MenuItem>
                      <MenuItem value="3">Employee</MenuItem>
                    </TextField>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {data.level != null ? (
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            fontFamily: 'Ubuntu',
                            textTransform: 'capitalize',
                            fontSize: 18,
                            px: 5,
                            mt: 3,
                          }}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="contained"
                          // type="submit"
                          sx={{
                            fontFamily: 'Ubuntu',
                            textTransform: 'capitalize',
                            fontSize: 18,
                            px: 5,
                            mt: 3,
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </Box>
                  </Box>
                </>
              )}

              <Grid
                container
                spacing={2}
                mt={8}
                // sx={{ bgcolor: Color.RED_COLOR }}
              >
                <Grid
                  item
                  xs={8}
                  // sx={{
                  //   display: 'flex',
                  //   justifyContent: 'flex-end',
                  // }}
                >
                  <Button
                    // variant="contained"
                    sx={{
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 18,
                      color: Color.BLACK_COLOR,
                    }}
                    onClick={() => setStep('2')}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ justifyContent: 'flex-end', display: 'flex' }}
                >
                  {step === 'done' ? (
                    <NavLink
                      to="/master-data/users"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="contained"
                        // type="submit"
                        sx={{
                          fontFamily: 'Ubuntu',
                          textTransform: 'capitalize',
                          fontSize: 18,
                          px: 2,
                        }}
                      >
                        Add Another Employee
                      </Button>
                    </NavLink>
                  ) : (
                    <Button
                      variant="contained"
                      disabled
                      // type="submit"
                      sx={{
                        fontFamily: 'Ubuntu',
                        textTransform: 'capitalize',
                        fontSize: 18,
                        px: 2,
                      }}
                    >
                      Add Another Employee
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </CardContent>
    </Box>
  );
}

export default UpgradeForm;
