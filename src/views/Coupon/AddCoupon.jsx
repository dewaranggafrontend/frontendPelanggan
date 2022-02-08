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
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Divider,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { smd_url } from '../../variable/BaseUrl';
import { styled } from '@mui/material/styles';
import Color from '../../variable/Color';
import { NavLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function createData(name, readRole, addRole, editRole, deleteRole) {
  return { name, readRole, addRole, editRole, deleteRole };
}

const rows = [
  createData('User Role', '', '', '', ''),
  createData('Job Position', '', '', '', ''),
  createData('User Administration', '', '', '', ''),
  createData('Customer', '', '', '', ''),
  createData('Package', '', '', '', ''),
  createData('Menu 1', '', '', '', ''),
  createData('Menu 2', '', '', '', ''),
  createData('Menu 3', '', '', '', ''),
  createData('Menu 4', '', '', '', ''),
];

function AddCoupon(props) {
  const [errorData, setErrorData] = useState('');
  const [data, setData] = useState('');
  const [position, setPosition] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedRead, setCheckedRead] = useState(false);
  const [checkedAdd, setCheckedAdd] = useState(false);
  const [checkedEdit, setCheckedEdit] = useState(false);
  const [checkedDelete, setCheckedDelete] = useState(false);
  const [userrole, setUserRole] = useState('');
  const [jobposition, setJobPosition] = useState('');
  const [step, setStep] = useState('1');

  const handleChangePass = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
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

  const handleClickShowPasswordConf = () => {
    setData({
      ...data,
      showPasswordConf: !data.showPasswordConf,
    });
  };

  const handleMouseDownPasswordConf = (event) => {
    event.preventDefault();
  };

  const handleChangeRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleChange = (event) => {
    setJobPosition(event.target.value);
  };

  const handleStep = (opsi) => {
    setStep(opsi);
  };

  const handleChangeRead = (event) => {
    setCheckedRead(event.target.checked);
  };
  const handleChangeAdd = (event) => {
    setCheckedAdd(event.target.checked);
  };
  const handleChangeEdit = (event) => {
    setCheckedEdit(event.target.checked);
  };
  const handleChangeDelete = (event) => {
    setCheckedDelete(event.target.checked);
  };

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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (props.type === 'add') {
  //       let formData = new FormData();
  //       formData.append('username', data.username);
  //       formData.append('email', data.email);
  //       formData.append('password', data.password);
  //       formData.append('c_password', data.c_password);
  //       formData.append('admin', data.admin);
  //       formData.append('basic_salary', data.basic_salary);
  //       formData.append('company_name', 'Dewarangga');
  //       formData.append('department', data.department);
  //       formData.append('employee_id', data.employee_id);
  //       formData.append('job_position', data.job_position);
  //       formData.append('join_date', data.join_date);
  //       formData.append('level', data.level);
  //       formData.append('allowance_1', data.allowance_1);
  //       formData.append('allowance_2', data.allowance_2);
  //       formData.append('first_name', data.first_name);
  //       formData.append('last_name', data.last_name);

  //       await axios
  //         .post(smd_url + 'users/create', formData, {
  //           headers: {
  //             Authorization: 'Bearer ' + token,
  //           },
  //         })
  //         .then(() => {
  //           navigate('/master-data/users');
  //         })
  //         .catch((err) => {
  //           setErrorData(err.response.data.errors.location);
  //         });
  //     } else if (props.type === 'edit') {
  //       await axios
  //         .put(
  //           `${smd_url}users/update/${data.id}`,
  //           {
  //             username: data.username,
  //             email: data.email,
  //             admin: data.admin,
  //             basic_salary: data.basic_salary,
  //             company_name: 'Dewarangga',
  //             department: data.department,
  //             employee_id: data.employee_id,
  //             job_position: data.job_position,
  //             join_date: data.join_date,
  //             level: data.level,
  //             allowance_1: data.allowance_1,
  //             allowance_2: data.allowance_2,
  //             first_name: data.first_name,
  //             last_name: data.last_name,
  //           },
  //           {
  //             headers: {
  //               Authorization: 'Bearer ' + token,
  //             },
  //           }
  //         )
  //         .then(() => {
  //           navigate('/master-data/users');
  //         })
  //         .catch((err) => {
  //           setErrorData(err.response.data.errors.location);
  //         });
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props.type === 'add') {
      let formData = new FormData();
      formData.append('user_role', data.user_role);

      await axios
        .post(smd_url + 'users/create', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(() => {
          navigate('/master-data/users');
        })
        .catch((err) => {
          setErrorData(err.response.data.errors.location);
        });
    } else if (props.type === 'edit') {
      await axios
        .put(
          `${smd_url}users/update/${data.id}`,
          {
            username: data.username,
            email: data.email,
            admin: data.admin,
            basic_salary: data.basic_salary,
            company_name: 'Dewarangga',
            department: data.department,
            employee_id: data.employee_id,
            job_position: data.job_position,
            join_date: data.join_date,
            level: data.level,
            allowance_1: data.allowance_1,
            allowance_2: data.allowance_2,
            first_name: data.first_name,
            last_name: data.last_name,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then(() => {
          navigate('/master-data/users');
        })
        .catch((err) => {
          setErrorData(err.response.data.errors.location);
        });
    }
  };
  console.log(errorData.email);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    // <Card>
    //   <CardContent>
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {step === '1' ? (
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
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 50 / 2,
                      bgcolor: Color.SUBTHEME_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{ color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }}
                    >
                      1
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}
                  >
                    Personal Data
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
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 50 / 2,
                      border: 2,
                      borderColor: Color.GRAY_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{ color: Color.GRAY_COLOR, fontFamily: 'Ubuntu' }}
                    >
                      2
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}
                  >
                    Credential
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ) : (
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
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 50 / 2,
                      border: 2,
                      borderColor: Color.SUBTHEME_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CheckIcon sx={{ color: Color.SUBTHEME_COLOR }} />
                  </Box>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}
                  >
                    Personal Data
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
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: 50 / 2,
                      // border: 2,
                      // borderColor: Color.GRAY_COLOR,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: Color.SUBTHEME_COLOR,
                    }}
                  >
                    <Typography
                      sx={{ color: Color.WHITE_COLOR, fontFamily: 'Ubuntu' }}
                    >
                      2
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}
                  >
                    Credential
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Bates */}
          <Grid item md={12}>
            <Box sx={{ px: 40, pt: 10 }}>
              {step === '1' ? (
                <>
                  <Typography
                    sx={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Personal Data
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontFamily: 'Ubuntu' }}>
                    Fill all personal data information
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
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
                          margin="normal"
                          id="firstName"
                          label="First Name"
                          type="text"
                          name="first_name"
                          onChange={onChange}
                          value={
                            data.first_name !== undefined ? data.first_name : ''
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                          }}
                        >
                          Last Name
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <TextField
                          fullWidth
                          autoFocus
                          required
                          margin="normal"
                          id="lastName"
                          label="Last Name"
                          type="text"
                          name="last_name"
                          onChange={onChange}
                          value={
                            data.last_name !== undefined ? data.last_name : ''
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
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
                          required
                          margin="normal"
                          id="email"
                          label="Email"
                          type="email"
                          name="email"
                          onChange={onChange}
                          value={data.name !== undefined ? data.name : ''}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
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
                          margin="normal"
                          id="phoneNumber"
                          label="Phone Number"
                          type="tel"
                          name="phone_number"
                          onChange={onChange}
                          value={
                            data.phone_number !== undefined
                              ? data.phone_number
                              : ''
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                          }}
                        >
                          Employee ID
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <TextField
                          fullWidth
                          autoFocus
                          required
                          margin="normal"
                          id="employeeID"
                          label="Employee ID"
                          type="text"
                          name="employee_id"
                          onChange={onChange}
                          value={
                            data.employee_id !== undefined
                              ? data.employee_id
                              : ''
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                            mb: 2,
                          }}
                        >
                          Job Position
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={jobposition}
                            // label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    Credential
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontFamily: 'Ubuntu' }}>
                    Fill all credential data
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
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
                          margin="normal"
                          id="username"
                          label="Username"
                          type="text"
                          name="username"
                          onChange={onChange}
                          value={
                            data.username !== undefined ? data.username : ''
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                            width: '100%',
                            mb: 2,
                          }}
                        >
                          Password
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={data.showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={handleChangePass('password')}
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
                            label="Password"
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                            mb: 2,
                          }}
                        >
                          Confirm Password
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={data.showPasswordConf ? 'text' : 'password'}
                            value={data.passwordConf}
                            onChange={handleChangePass('passwordConf')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPasswordConf}
                                  onMouseDown={handleMouseDownPasswordConf}
                                  edge="end"
                                >
                                  {data.showPasswordConf ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Confirm Password"
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Ubuntu',
                            fontWeight: 'bold',
                            display: 'flex',
                            mb: 2,
                          }}
                        >
                          User Role
                          <Typography sx={{ color: Color.RED_COLOR }}>
                            *
                          </Typography>
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userrole}
                            // label="Age"
                            onChange={handleChangeRole}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
              {/* <Typography
                sx={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'Ubuntu' }}
              >
                Personal Data
              </Typography>
              <Typography sx={{ fontSize: 13, fontFamily: 'Ubuntu' }}>
                Fill all personal data information
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      First Name
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      margin="normal"
                      id="firstName"
                      label="First Name"
                      type="text"
                      name="first_name"
                      onChange={onChange}
                      value={
                        data.first_name !== undefined ? data.first_name : ''
                      }
                    />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Last Name
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      margin="normal"
                      id="lastName"
                      label="Last Name"
                      type="text"
                      name="last_name"
                      onChange={onChange}
                      value={data.last_name !== undefined ? data.last_name : ''}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Email
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      margin="normal"
                      id="email"
                      label="Email"
                      type="email"
                      name="email"
                      onChange={onChange}
                      value={data.name !== undefined ? data.name : ''}
                    />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Phone Number
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      margin="normal"
                      id="phoneNumber"
                      label="Phone Number"
                      type="tel"
                      name="phone_number"
                      onChange={onChange}
                      value={
                        data.phone_number !== undefined ? data.phone_number : ''
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Employee ID
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      margin="normal"
                      id="employeeID"
                      label="Employee ID"
                      type="text"
                      name="employee_id"
                      onChange={onChange}
                      value={
                        data.employee_id !== undefined ? data.employee_id : ''
                      }
                    />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                        mb: 2,
                      }}
                    >
                      Job Position
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={jobposition}
                        // label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid> */}
              <Grid container spacing={2} mt={5}>
                <Grid item md={1.5}>
                  {step === '1' ? (
                    <NavLink
                      to="/master-data/administration"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        fullWidth
                        sx={{ color: Color.BLACK2_COLOR, fontFamily: 'Ubuntu' }}
                      >
                        Back
                      </Button>
                    </NavLink>
                  ) : (
                    <Button
                      fullWidth
                      sx={{ color: Color.BLACK2_COLOR, fontFamily: 'Ubuntu' }}
                      onClick={() => handleStep('1')}
                    >
                      Back
                    </Button>
                  )}
                </Grid>
                <Grid item md={1.5}>
                  {step === '1' ? (
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        fontFamily: 'Ubuntu',
                        bgcolor: Color.GRAY_COLOR,
                        '&:hover': {
                          bgcolor: Color.GRAY_COLOR,
                        },
                      }}
                      onClick={() => handleStep('2')}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{ fontFamily: 'Ubuntu' }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {console.log(step)}
        {/* <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                autoFocus
                required
                error={errorData.first_name !== undefined ? true : false}
                helperText={
                  errorData.first_name !== undefined
                    ? errorData.first_name[0]
                    : null
                }
                margin="normal"
                id="first_name"
                label="First Name"
                type="text"
                name="first_name"
                onChange={onChange}
                value={data.first_name !== undefined ? data.first_name : ''}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                autoFocus
                error={errorData.last_name !== undefined ? true : false}
                helperText={
                  errorData.last_name !== undefined
                    ? errorData.last_name[0]
                    : null
                }
                margin="normal"
                id="last_name"
                label="Last Name"
                type="text"
                name="last_name"
                onChange={onChange}
                value={data.last_name !== undefined ? data.last_name : ''}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            autoFocus
            required
            error={errorData.username !== undefined ? true : false}
            helperText={
              errorData.username !== undefined ? errorData.username[0] : null
            }
            margin="normal"
            id="username"
            label="Username"
            type="text"
            name="username"
            onChange={onChange}
            value={data.username !== undefined ? data.username : ''}
          />

          <TextField
            fullWidth
            autoFocus
            required
            error={errorData.email !== undefined ? true : false}
            helperText={
              errorData.email !== undefined ? errorData.email[0] : null
            }
            margin="normal"
            id="email"
            label="Email"
            type="email"
            name="email"
            onChange={onChange}
            value={data.email !== undefined ? data.email : ''}
          />

          <TextField
            fullWidth
            autoFocus
            required
            error={errorData.employee_id !== undefined ? true : false}
            helperText={
              errorData.employee_id !== undefined ? errorData.email[0] : null
            }
            margin="normal"
            id="employeeID"
            label="Employee ID"
            type="text"
            name="employee_id"
            onChange={onChange}
            value={data.employee_id !== undefined ? data.employee_id : ''}
          />

          <TextField
            fullWidth
            autoFocus
            required
            select
            error={errorData.department !== undefined ? true : false}
            helperText={
              errorData.department !== undefined
                ? errorData.department[0]
                : null
            }
            id="department"
            label="Department"
            margin="normal"
            name="department"
            value={data.department !== undefined ? data.department : ''}
            onChange={onChange}
          >
            {department.map((item) => (
              <MenuItem value={item.department_name} key={item.id}>
                {item.department_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            autoFocus
            required
            select
            error={errorData.job_position !== undefined ? true : false}
            helperText={
              errorData.job_position !== undefined
                ? errorData.job_position[0]
                : null
            }
            id="job_position"
            label="Job Position"
            margin="normal"
            name="job_position"
            onChange={onChange}
            value={data.job_position !== undefined ? data.job_position : ''}
          >
            {position.map((item) => (
              <MenuItem key={item.id} value={item.position_name}>
                {item.position_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            autoFocus
            required
            error={errorData.join_date !== undefined ? true : false}
            helperText={
              errorData.join_date !== undefined ? errorData.email[0] : null
            }
            margin="normal"
            id="join_date"
            label="Join Date"
            type="date"
            name="join_date"
            onChange={onChange}
            value={data.join_date !== undefined ? data.join_date : ''}
          />

          <TextField
            fullWidth
            autoFocus
            required
            error={errorData.basic_salary !== undefined ? true : false}
            helperText={
              errorData.basic_salary !== undefined
                ? errorData.basic_salary[0]
                : null
            }
            margin="normal"
            id="basic_salary"
            label="Basic Salary"
            type="number"
            min="0"
            name="basic_salary"
            onChange={onChange}
            value={data.basic_salary !== undefined ? data.basic_salary : ''}
          />

          <TextField
            fullWidth
            autoFocus
            error={errorData.allowance_1 !== undefined ? true : false}
            helperText={
              errorData.allowance_1 !== undefined
                ? errorData.allowance_1[0]
                : null
            }
            margin="normal"
            id="allowance_1"
            label="Allowance 1"
            type="number"
            min="0"
            name="allowance_1"
            onChange={onChange}
            value={data.allowance_1 !== undefined ? data.allowance_1 : ''}
          />

          <TextField
            fullWidth
            autoFocus
            error={errorData.allowance_1 !== undefined ? true : false}
            helperText={
              errorData.allowance_1 !== undefined
                ? errorData.allowance_1[0]
                : null
            }
            margin="normal"
            id="allowance_2"
            label="Allowance 2"
            type="number"
            min="0"
            name="allowance_2"
            onChange={onChange}
            value={data.allowance_2 !== undefined ? data.allowance_2 : ''}
          />

          <FormControl component="fieldset" sx={{ marginY: 2 }}>
            <FormLabel component="legend">Level</FormLabel>
            <RadioGroup
              row
              required
              aria-label="level"
              name="level"
              value={data.level !== undefined ? data.level : ''}
              onChange={onChange}
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Employee"
              />
              <FormControlLabel value="1" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            autoFocus
            required
            select
            error={errorData.admin !== undefined ? true : false}
            helperText={
              errorData.admin !== undefined ? errorData.admin[0] : null
            }
            id="admin"
            label="Choose Admin"
            margin="normal"
            name="admin"
            onChange={onChange}
            value={data.admin !== undefined ? data.admin : ''}
          >
            {admin.map((item, index) => (
              <MenuItem key={index} value={item.username}>
                {item.username}
              </MenuItem>
            ))}
          </TextField>
          {props.type === 'add' ? (
            <Fragment>
              <TextField
                fullWidth
                autoFocus
                required
                error={errorData.password !== undefined ? true : false}
                helperText={
                  errorData.password !== undefined
                    ? errorData.password[0]
                    : null
                }
                margin="normal"
                id="password"
                label="password"
                type="password"
                name="password"
                onChange={onChange}
              />

              <TextField
                fullWidth
                autoFocus
                required
                error={errorData.c_password !== undefined ? true : false}
                helperText={
                  errorData.c_password !== undefined
                    ? errorData.c_password[0]
                    : null
                }
                margin="normal"
                id="c_password"
                label="Confirm Password"
                type="password"
                name="c_password"
                onChange={onChange}
              />
            </Fragment>
          ) : null}

          <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth href="/master-data/userrole">
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth type="submit">
                Save
              </Button>
            </Grid>
          </Grid> */}
      </form>
    </Box>
  );
}

export default AddCoupon;
