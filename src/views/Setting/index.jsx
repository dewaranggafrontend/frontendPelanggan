import React, { Fragment, useEffect, useState } from 'react';
import {
  Fab,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Setting() {
  const [user, setUser] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const [value, setValue] = useState(0);
  const [header, setHeader] = useState('0');
  const [data, setData] = useState('');
  // const [mode, setMode] = useState('view');
  const [paket, setPaket] = useState('');
  const [modeprofile, setModeProfile] = useState('view');
  const [modecompany, setModeCompany] = useState('view');
  const [modepass, setModePass] = useState('view');
  const [date, setDate] = useState(null);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const handleChangePackage = (event) => {
    setPaket(event.target.value);
  };

  const handleHeader = (choice) => {
    setHeader(choice);
  };

  const handleChange = (prop) => (event) => {
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

  const handleClickShowNewPassword = () => {
    setData({
      ...data,
      showNewPassword: !data.showNewPassword,
    });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfPassword = () => {
    setData({
      ...data,
      showConfPassword: !data.showConfPassword,
    });
  };

  const handleMouseDownConfPassword = (event) => {
    event.preventDefault();
  };

  // const handleMode = (choice) => {
  //   setMode(choice);
  // };
  const handleModeProfile = (choice) => {
    setModeProfile(choice);
  };
  const handleModeCompany = (choice) => {
    setModeCompany(choice);
  };
  const handleModePass = (choice) => {
    setModePass(choice);
  };

  const getUser = async () => {
    await axios
      .get(smd_url + 'users', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: page,
          itemPerPage: rowsPerPage,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  const handleSearchUser = async () => {
    await axios
      .get(smd_url + 'users/search', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          param: searchUser,
          page: page,
          itemPerPage: rowsPerPage,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  useEffect(() => {
    if (searchUser !== '') {
      const fieldSearchUser = setTimeout(() => {
        handleSearchUser();
      }, 500);
      return () => clearTimeout(fieldSearchUser);
    } else {
      getUser();
    }
  }, [searchUser]);

  useEffect(() => {
    getUser();
  }, [page, rowsPerPage]);

  const handleDialogDelete = (data) => {
    setOpenDialogDelete(data);
  };

  const showDialogDelete = (ID) => {
    setUserID(ID);
    handleDialogDelete(true);
  };

  const handleDelete = async (ID) => {
    await axios
      .delete(`${smd_url}users/delete/${ID}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        getUser();
        handleDialogDelete(false);
      });
  };

  console.log(data.customer_id);
  console.log(data.password);

  return (
    <Box sx={{ bgcolor: Color.DUST_COLOR, p: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={
            header === '0'
              ? {
                  py: 2,
                  px: 10,
                  bgcolor: Color.BLUE_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
              : {
                  py: 2,
                  px: 10,
                  bgcolor: Color.THEME_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
          }
          onClick={() => handleHeader('0')}
        >
          <i
            class="ri-user-3-fill"
            style={header === '0' ? { color: Color.WHITE_COLOR } : null}
          ></i>
          <Typography
            sx={
              header === '0'
                ? { fontFamily: 'Ubuntu', ml: 2, color: Color.WHITE_COLOR }
                : { fontFamily: 'Ubuntu', ml: 2 }
            }
          >
            Edit Profile
          </Typography>
        </Button>
        <Button
          sx={
            header === '1'
              ? {
                  py: 2,
                  px: 10,
                  bgcolor: Color.BLUE_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
              : {
                  py: 2,
                  px: 10,
                  bgcolor: Color.THEME_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
          }
          onClick={() => handleHeader('1')}
        >
          <i
            class="ri-building-2-fill"
            style={header === '1' ? { color: Color.WHITE_COLOR } : null}
          ></i>
          <Typography
            sx={
              header === '1'
                ? { fontFamily: 'Ubuntu', ml: 2, color: Color.WHITE_COLOR }
                : { fontFamily: 'Ubuntu', ml: 2 }
            }
          >
            Edit Company
          </Typography>
        </Button>
        <Button
          sx={
            header === '2'
              ? {
                  py: 2,
                  px: 10,
                  bgcolor: Color.BLUE_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
              : {
                  py: 2,
                  px: 10,
                  bgcolor: Color.THEME_COLOR,
                  color: Color.BLACK_COLOR,
                  textTransform: 'capitalize',
                  display: 'flex',
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: Color.BLUE_COLOR,
                    color: Color.WHITE_COLOR,
                    cursor: 'pointer',
                  },
                }
          }
          onClick={() => handleHeader('2')}
        >
          <i
            class="ri-lock-password-fill"
            style={header === '2' ? { color: Color.WHITE_COLOR } : null}
          ></i>
          <Typography
            sx={
              header === '2'
                ? { fontFamily: 'Ubuntu', ml: 2, color: Color.WHITE_COLOR }
                : { fontFamily: 'Ubuntu', ml: 2 }
            }
          >
            Password
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          py: 3,
          bgcolor: Color.WHITE_COLOR,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {header === '0' ? (
          <>
            <Box sx={{ width: 600 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu', fontSize: 25 }}
              >
                Edit Profile
              </Typography>
              <Box
                sx={{
                  // bgcolor: Color.RED_COLOR,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  mt: 3,
                }}
              >
                <Avatar sx={{ width: 60, height: 60 }}>N</Avatar>
                <IconButton
                  sx={{
                    bgcolor: Color.BLUE_COLOR,
                    width: 18,
                    height: 18,
                    ml: 5,
                    mt: -2,
                    '&:hover': {
                      bgcolor: Color.BLUE_COLOR,
                    },
                  }}
                >
                  <i
                    class="ri-edit-2-fill"
                    style={{ color: Color.WHITE_COLOR, fontSize: 12 }}
                  ></i>
                </IconButton>
              </Box>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={12}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                      }}
                    >
                      Customer ID
                    </Typography>
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        value={
                          data.customer_id !== undefined ? data.customer_id : ''
                        }
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        // required
                        margin="normal"
                        id="customerID"
                        label="Customer ID"
                        type="text"
                        name="customer_id"
                        onChange={onChange}
                        value={
                          data.customer_id !== undefined ? data.customer_id : ''
                        }
                      />
                    )}
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
                      First Name
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                        value={
                          data.first_name !== undefined ? data.first_name : ''
                        }
                      />
                    ) : (
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
                    )}
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
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                        value={
                          data.last_name !== undefined ? data.last_name : ''
                        }
                      />
                    ) : (
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
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item md={6}>
                  <FormControl>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                        mb: 2,
                      }}
                    >
                      Gender
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      {modeprofile === 'view' ? (
                        <>
                          <FormControlLabel
                            disabled
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            disabled
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                        </>
                      ) : (
                        <>
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                        </>
                      )}
                    </RadioGroup>
                  </FormControl>
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
                      Date of Birth
                      <Typography sx={{ color: Color.RED_COLOR, mb: 2 }}>
                        *
                      </Typography>
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {modeprofile === 'view' ? (
                        <DatePicker
                          value={date}
                          disabled
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: '100%' }} />
                          )}
                        />
                      ) : (
                        <DatePicker
                          value={date}
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: '100%' }} />
                          )}
                        />
                      )}
                    </LocalizationProvider>
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
                      Mobile
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        value={data.mobile !== undefined ? data.mobile : ''}
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        margin="normal"
                        id="mobile"
                        label="Mobile"
                        type="number"
                        name="mobile"
                        onChange={onChange}
                        value={data.mobile !== undefined ? data.mobile : ''}
                      />
                    )}
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
                      Email
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.email !== undefined ? data.email : ''}
                      />
                    ) : (
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
                        value={data.email !== undefined ? data.email : ''}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
                <Grid item md={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Job Position
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modeprofile === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          mb: 1,
                          mt: 2,
                        }}
                        value={
                          data.job_position !== undefined
                            ? data.job_position
                            : ''
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        margin="normal"
                        id="jobPosition"
                        label="Job Position"
                        type="text"
                        name="job_position"
                        onChange={onChange}
                        value={
                          data.job_position !== undefined
                            ? data.job_position
                            : ''
                        }
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              {modeprofile === 'view' ? (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleModeProfile('edit')}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleModeProfile('view');
                      console.log('mode change');
                    }}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </>
        ) : header === '1' ? (
          <>
            <Box sx={{ width: 600 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu', fontSize: 25 }}
              >
                Edit Company
              </Typography>
              <Box
                sx={{
                  // bgcolor: Color.RED_COLOR,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  mt: 3,
                }}
              >
                <Avatar sx={{ width: 60, height: 60 }}>N</Avatar>
                <IconButton
                  sx={{
                    bgcolor: Color.BLUE_COLOR,
                    width: 18,
                    height: 18,
                    ml: 5,
                    mt: -2,
                    '&:hover': {
                      bgcolor: Color.BLUE_COLOR,
                    },
                  }}
                >
                  <i
                    class="ri-edit-2-fill"
                    style={{ color: Color.WHITE_COLOR, fontSize: 12 }}
                  ></i>
                </IconButton>
              </Box>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={12}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                      }}
                    >
                      Company ID
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        value={
                          data.company_id !== undefined ? data.company_id : ''
                        }
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        // required
                        margin="normal"
                        id="companyID"
                        label="Company ID"
                        type="text"
                        name="company_id"
                        onChange={onChange}
                        value={
                          data.company_id !== undefined ? data.company_id : ''
                        }
                      />
                    )}
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
                      Company Name
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                        value={
                          data.company_name !== undefined
                            ? data.company_name
                            : ''
                        }
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        required
                        margin="normal"
                        id="companyName"
                        label="Company Name"
                        type="text"
                        name="company_name"
                        onChange={onChange}
                        value={
                          data.company_name !== undefined
                            ? data.company_name
                            : ''
                        }
                      />
                    )}
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
                      Package Name
                      <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                    </Typography>
                    {modecompany === 'view' ? (
                      <FormControl fullWidth disabled>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={paket}
                          // label="Age"
                          onChange={handleChangePackage}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={paket}
                          // label="Age"
                          onChange={handleChangePackage}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    )}
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
                      User Max
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.user_max !== undefined ? data.user_max : ''}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        margin="normal"
                        id="userMax"
                        label="User Max"
                        type="number"
                        name="user_max"
                        onChange={onChange}
                        value={data.user_max !== undefined ? data.user_max : ''}
                      />
                    )}
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
                      Duration
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.duration !== undefined ? data.duration : ''}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        margin="normal"
                        id="duration"
                        label="Duration"
                        type="number"
                        name="duration"
                        onChange={onChange}
                        value={data.duration !== undefined ? data.duration : ''}
                      />
                    )}
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
                      Phone
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          // mr: 30,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.phone !== undefined ? data.phone : ''}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        margin="normal"
                        id="phone"
                        label="Phone"
                        type="number"
                        name="phone"
                        onChange={onChange}
                        value={data.phone !== undefined ? data.phone : ''}
                      />
                    )}
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
                      Fax
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.fax !== undefined ? data.fax : ''}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        margin="normal"
                        id="fax"
                        label="Fax"
                        type="number"
                        name="fax"
                        onChange={onChange}
                        value={data.fax !== undefined ? data.fax : ''}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
                <Grid item md={12}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        display: 'flex',
                      }}
                    >
                      Address
                      {/* <Typography sx={{ color: Color.RED_COLOR }}>*</Typography> */}
                    </Typography>
                    {modecompany === 'view' ? (
                      <TextField
                        fullWidth
                        disabled
                        multiline
                        rows={4}
                        margin="normal"
                        sx={{
                          bgcolor: Color.THEME_COLOR,
                          mb: 1,
                          mt: 2,
                        }}
                        value={data.address !== undefined ? data.address : ''}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        autoFocus
                        // required
                        multiline
                        rows={4}
                        margin="normal"
                        id="address"
                        label="Address"
                        type="text"
                        name="address"
                        onChange={onChange}
                        value={data.address !== undefined ? data.address : ''}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              {modecompany === 'view' ? (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleModeCompany('edit')}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleModeCompany('view');
                      console.log('mode change');
                    }}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ width: 600, mb: 28 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu', fontSize: 25 }}
              >
                Password
              </Typography>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  mt: 5,
                  display: 'flex',
                }}
              >
                Password
                <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
              </Typography>
              {modepass === 'view' ? (
                <FormControl
                  sx={{ mt: 2, bgcolor: Color.THEME_COLOR }}
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                >
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
                  />
                </FormControl>
              ) : (
                <FormControl
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                  required
                >
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
                  />
                </FormControl>
              )}

              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  mt: 3,
                  display: 'flex',
                }}
              >
                New Password
                <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
              </Typography>
              {modepass === 'view' ? (
                <FormControl
                  sx={{ mt: 2, bgcolor: Color.THEME_COLOR }}
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={data.showNewPassword ? 'text' : 'password'}
                    value={data.newpassword}
                    onChange={handleChange('newpassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                          edge="end"
                        >
                          {data.showNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="password"
                  />
                </FormControl>
              ) : (
                <FormControl
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={data.showNewPassword ? 'text' : 'password'}
                    value={data.newpassword}
                    onChange={handleChange('newpassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                          edge="end"
                        >
                          {data.showNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="password"
                  />
                </FormControl>
              )}

              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  mt: 3,
                  display: 'flex',
                }}
              >
                Confirm Password
                <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
              </Typography>
              {modepass === 'view' ? (
                <FormControl
                  sx={{ my: 2, bgcolor: Color.THEME_COLOR }}
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={data.showConfPassword ? 'text' : 'password'}
                    value={data.confpassword}
                    onChange={handleChange('confpassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfPassword}
                          onMouseDown={handleMouseDownConfPassword}
                          edge="end"
                        >
                          {data.showConfPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="password"
                  />
                </FormControl>
              ) : (
                <FormControl
                  sx={{ my: 2 }}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={data.showConfPassword ? 'text' : 'password'}
                    value={data.confpassword}
                    onChange={handleChange('confpassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfPassword}
                          onMouseDown={handleMouseDownConfPassword}
                          edge="end"
                        >
                          {data.showConfPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="password"
                  />
                </FormControl>
              )}
              {modepass === 'view' ? (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleModePass('edit')}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleModePass('view');
                      console.log('mode change');
                    }}
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Ubuntu',
                      textTransform: 'capitalize',
                      color: Color.BLACK_COLOR,
                      ml: 2,
                      fontSize: 15,
                      px: 5,
                    }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
      {/* <Box sx={{ bgcolor: Color.WHITE_COLOR }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box> */}
    </Box>
  );
}

export default Setting;
