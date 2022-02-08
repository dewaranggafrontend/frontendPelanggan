import React, { Fragment, useEffect, useState } from 'react';
import {
  Fab,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Modal,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CouponTable from './CouponTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 550,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function Coupon() {
  const [user, setUser] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');
  const [duration, setDuration] = useState('');
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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

  useEffect(() => {
    const now = new Date();
    const date =
      now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();

    async function fetchData() {
      // const token = await AsyncStorage.getItem('token');
      const request = await axios
        .get(smd_url + 'attendances/get/435346456453/one-month', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            date: date,
          },
        })
        .then((res) => setAllData(res.data))
        .catch((e) => {
          if (e.response) {
            console.log(e.response);
          } else if (e.request) {
            console.log(e.request);
          } else {
            console.log('message : ' + e.message);
          }
        });
      return request;
    }
    fetchData();
  }, []);

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

  // console.log(alldata);

  return (
    <Fragment>
      {/* <Box sx={{ bgcolor: Color.GRAY2_COLOR }}> */}
      <Box
        sx={{
          '& > :not(style)': { m: 2 },
          display: 'flex',
          // justifyContent: 'flex-start',
          paddingTop: 1,
          paddingRight: 1,
          paddingLeft: 1,
          justifyContent: 'space-between',
        }}
      >
        {/* <NavLink to="/master-data/users/add">
            <Fab size="medium" color="primary" aria-label="add">
              <PersonAddIcon />
            </Fab>
          </NavLink>
          <Fab size="medium" color="primary" aria-label="download">
            <CloudDownloadIcon />
          </Fab>
          <Fab size="medium" color="primary" aria-label="filter">
            <FilterAltIcon />
          </Fab>
          <Fab size="medium" color="primary" aria-label="upload">
            <CloudUploadIcon />
          </Fab> */}
        <Button
          sx={{
            bgcolor: Color.BLUE_COLOR,
            textTransform: 'capitalize',
          }}
          onClick={() => handleOpen()}
        >
          <i
            class="ri-add-circle-line"
            style={{ color: Color.WHITE_COLOR, fontSize: 25 }}
          ></i>
          <Typography sx={{ color: Color.WHITE_COLOR, ml: 1 }}>
            Add Coupon
          </Typography>
        </Button>
        <NavLink
          to="/master-data/coupon/log"
          style={{ textDecoration: 'none' }}
        >
          <Button
            sx={{
              bgcolor: Color.BLUE_COLOR,
              textTransform: 'capitalize',
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>
              Log Activity
            </Typography>
          </Button>
        </NavLink>
      </Box>

      <Box
        sx={{
          mt: 1,
          paddingBottom: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CouponTable
          data={alldata}
          // page={page}
          // rowsPerPage={rowsPerPage}
          // showDialogDelete={showDialogDelete}
          // setPage={(page) => setPage(page)}
          // setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
          handleUserSearch={(value) => {
            setSearchUser(value);
          }}
        />
      </Box>
      {/* </Box> */}
      <DeleteDialog
        open={opendDialogDelete}
        handleDialog={handleDialogDelete}
        handleDelete={handleDelete}
        setPage={(page) => setPage(page)}
        setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
        id={userID}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}
          >
            Add Coupon
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  ID Coupon
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="P0012"
                  sx={{ width: 300, backgroundColor: Color.GRAY2_COLOR }}
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
                  Coupon Code
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="couponCode"
                  label="Coupon Code"
                  type="text"
                  name="coupon_code"
                  onChange={onChange}
                  value={data.coupon_code !== undefined ? data.coupon_code : ''}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={12}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    display: 'flex',
                  }}
                >
                  Coupon Name
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="couponName"
                  label="Coupon Name"
                  type="text"
                  name="coupon_name"
                  onChange={onChange}
                  value={data.coupon_name !== undefined ? data.coupon_name : ''}
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
                    mb: 2,
                  }}
                >
                  Start Date
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    // label="Basic example"
                    value={date1}
                    onChange={(newValue) => {
                      setDate1(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '100%' }} />
                    )}
                  />
                </LocalizationProvider>
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
                  End Date
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    // label="Basic example"
                    value={date2}
                    onChange={(newValue) => {
                      setDate2(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '100%' }} />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 14 }}>
            <Button
              sx={{
                mr: 3,
                fontWeight: 'bold',
                color: Color.BLACK_COLOR,
                fontFamily: 'Ubuntu',
              }}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleClose()}
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Ubuntu',
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default Coupon;
