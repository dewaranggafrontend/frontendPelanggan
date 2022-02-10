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
  Paper,
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
  const handlePage4 = async (e) => {
    e.preventDefault();
    console.log('done');
    navigate('/all-service');
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
                aria-label="payment"
                name="payment"
                value={data.payment !== undefined ? data.payment : ''}
                onChange={onChange}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    E-Money
                  </Typography>
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
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    Card
                  </Typography>
                  <FormControlLabel
                    //   disabled
                    value="visa"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/visa.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="mastercard"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/mastercard.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="jcb"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/jcb.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="americaexpress"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/amex.png"
                      />
                    }
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    Bank Transfer
                  </Typography>
                  <FormControlLabel
                    //   disabled
                    value="bca"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/bca.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="bni"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/bni.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="briva"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/briva.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="mandiri"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/mandiri.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="permata"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/perma.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="atmbersama"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/atmb.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="alto"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/alto.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="prima"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/prima.png"
                      />
                    }
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    Over the Counter
                  </Typography>
                  <FormControlLabel
                    //   disabled
                    value="indomart"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/indmar.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="isaku"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/isaku.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="alfamidi"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/alfmid.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="alfamart"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/alfmar.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="dandan"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/dan.png"
                      />
                    }
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    Direct Debit
                  </Typography>
                  <FormControlLabel
                    //   disabled
                    value="bcaklikpay"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/bcakl.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="octo"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/octo.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="brimo"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/brimo.png"
                      />
                    }
                  />
                  <FormControlLabel
                    //   disabled
                    value="danamon"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/danamon.png"
                      />
                    }
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      mt: 5,
                      color: Color.GRAY_COLOR,
                    }}
                  >
                    Cardless Debit
                  </Typography>
                  <FormControlLabel
                    //   disabled
                    value="akulaku"
                    control={<Radio />}
                    label={
                      <CardMedia
                        component="img"
                        image="/assets/images/minilogo/akulaku.png"
                      />
                    }
                  />
                </Box>
              </RadioGroup>
              <Divider sx={{ mt: 4 }} />
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
                  {data.payment != null ? (
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
          <form onSubmit={handlePage4}>
            <Box sx={{ px: 45, pt: 5 }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  fontSize: 20,
                  mb: 3,
                }}
              >
                Transaction
              </Typography>
              <Paper sx={{ py: 3, px: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>
                    Order ID: INV0987
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: Color.GOLD_COLOR,
                      borderRadius: 5,
                      color: Color.WHITE_COLOR,
                      fontSize: 13,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 2,
                    }}
                  >
                    Upgrade
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Customer Name
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                    Mila Jesica
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    my: 2,
                    fontWeight: 'bold',
                    fontFamily: 'Ubuntu',
                    fontSize: 20,
                  }}
                >
                  Package 2
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    User Max
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>
                    100 Employee
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Package Duration
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>
                    12 Month
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Price
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>
                    IDR 200.000
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      color: Color.GRAY_COLOR,
                      display: 'flex',
                    }}
                  >
                    Coupon
                    <Typography sx={{ fontStyle: 'italic' }}>
                      (COUPON1)
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.ICON_COLOR }}
                  >
                    IDR -50.000
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    PPn
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>10%</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Unique Code
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}>234</Typography>
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Ubuntu',
                      color: Color.GREEN_COLOR,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    IDR 200.000
                  </Typography>
                </Box>
              </Paper>
              <Box
                sx={{
                  py: 3,
                  px: 6,
                  bgcolor: Color.DUST_COLOR,
                  mt: 3,
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{
                    my: 2,
                    fontWeight: 'bold',
                    fontFamily: 'Ubuntu',
                    // fontSize: 20,
                  }}
                >
                  Payment Information
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Payment Method
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                    Bank Transfer (BCA)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Paid Date
                  </Typography>
                  <Typography sx={{ fontFamily: 'Ubuntu' }}></Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Due Date
                  </Typography>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.ICON_COLOR }}
                  >
                    16/12/2021
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}
                  >
                    Status Payment
                  </Typography>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', color: Color.ICON_COLOR }}
                  >
                    Unpaid
                  </Typography>
                </Box>
              </Box>
              {/* <Divider sx={{ mt: 4 }} /> */}
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
                      color: Color.GRAY_COLOR,
                    }}
                    onClick={() => setStep('2')}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ justifyContent: 'flex-end', display: 'flex' }}
                >
                  {data.payment != null ? (
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
                      <i class="ri-shopping-cart-2-fill"></i>
                      Order
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
                      <i class="ri-shopping-cart-2-fill"></i>
                      Order
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
