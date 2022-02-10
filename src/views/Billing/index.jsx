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
  Tabs,
  Tab,
  CardMedia,
  Paper,
  Radio,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BillingTable from './BillingTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PropTypes from 'prop-types';
// import CouponImg from '../../../public/assets/images/coupon.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 750,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

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
        <Box
          sx={{
            mt: 3,
            paddingBottom: 5,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* <Typography>{children}</Typography> */}
          {children}
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

function Billing() {
  const [user, setUser] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [opencoupon, setOpenCoupon] = useState(false);
  const [openpayment, setOpenPayment] = useState(false);
  const [data, setData] = useState('');
  const [pack, setPack] = useState('');
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [value, setValue] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState('');

  const handleChangeRadio = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenCoupon = () => {
    setOpenCoupon(true);
  };
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCoupon = () => {
    setOpenCoupon(false);
  };
  const handleClosePayment = () => {
    setOpenPayment(false);
  };

  const handleChange = (event) => {
    setPack(event.target.value);
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
          '& > :not(style)': { m: 1 },
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          py: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            // label="Basic example"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button variant="contained">
          <i class="ri-download-cloud-2-line" style={{ fontSize: 20 }}></i>
          <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
            Export
          </Typography>
        </Button>
        {/* <Fab
          size="medium"
          color="primary"
          aria-label="download"
          // onClick={downloadReport}
          onClick={handleDialogDownload}
        >
          <CloudDownloadIcon />
        </Fab>
        <Fab size="medium" color="primary" aria-label="filter">
          <FilterAltIcon />
        </Fab> */}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '100%', mt: 3, mx: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="UNPAID" {...a11yProps(0)} />
              <Tab label="PAID" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BillingTable
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BillingTable
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
          </TabPanel>
        </Box>
      </Box>
      {/* <Box
        sx={{
          mt: 1,
          paddingBottom: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <OrderTable
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
      </Box> */}
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
        <Box
          component="div"
          sx={{
            overflow: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 750,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}
          >
            Add Order
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  Order ID
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="P0012"
                  sx={{ width: '100%', backgroundColor: Color.GRAY2_COLOR }}
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
                  Customer Name
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="customerName"
                  label="Customer Name"
                  type="text"
                  name="customer_name"
                  onChange={onChange}
                  value={
                    data.customer_name !== undefined ? data.customer_name : ''
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  Customer ID
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="P0012"
                  sx={{ width: '100%', backgroundColor: Color.GRAY2_COLOR }}
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
                  Package
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Package</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pack}
                    label="Package"
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
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  User Max
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="P0012"
                  sx={{ width: '100%', backgroundColor: Color.GRAY2_COLOR }}
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
                  Duration
                  <Typography sx={{ color: Color.RED_COLOR }}>*</Typography>
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue="P0012"
                  sx={{ width: '100%', backgroundColor: Color.GRAY2_COLOR }}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3, mb: 1, borderStyle: 'dashed' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Price
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>IDR 200.000</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Coupon
            </Typography>
            <Button sx={{ fontFamily: 'Ubuntu' }} onClick={handleOpenCoupon}>
              Choose <i class="ri-arrow-right-s-line"></i>
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              PPn
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu', fontStyle: 'italic' }}>
              10%
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Unique Code
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>234</Typography>
          </Box>
          <Divider sx={{ mt: 1, mb: 2, borderStyle: 'dashed' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Payment Method
            </Typography>
            <Button sx={{ fontFamily: 'Ubuntu' }} onClick={handleOpenPayment}>
              Choose <i class="ri-arrow-right-s-line"></i>
            </Button>
          </Box>
          <Divider sx={{ mt: 1, mb: 2, borderStyle: 'dashed' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Price
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
          <Box sx={{ mt: 7, display: 'flex', justifyContent: 'flex-end' }}>
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
              <i class="ri-shopping-cart-2-fill"></i>
              Order
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Bates */}
      <Modal
        open={opencoupon}
        onClose={handleCloseCoupon}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="div"
          sx={{
            overflow: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 250,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}
            >
              Choose Coupon
            </Typography>
            <IconButton onClick={handleCloseCoupon}>
              <i class="ri-close-circle-fill"></i>
            </IconButton>
          </Box>
          {/* <Box sx={{ overflow: 'auto' }}> */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 3,
                ml: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontFamily: 'Ubuntu',
                }}
              >
                Choose
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  fontStyle: 'italic',
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  mt: 1,
                  fontFamily: 'Ubuntu',
                }}
              >
                <Typography sx={{ color: Color.RED_COLOR, mr: 0.5 }}>
                  *
                </Typography>
                30 Augst 2021 s.d 30 Jan 2022
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 2.5,
                ml: 24,
              }}
            >
              <Typography
                sx={{
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  fontFamily: 'Ubuntu',
                  ml: 8.5,
                  mb: 0.7,
                }}
              >
                Discount 22% s.d 50k
              </Typography>
              <Box
                sx={{
                  border: 1,
                  borderStyle: 'dashed',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Color.BLUE_COLOR,
                  borderRadius: 1,
                  p: 0.4,
                  ml: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    color: Color.BLUE_COLOR,
                  }}
                >
                  COUPON 1
                </Typography>
              </Box>
            </Box>
            <CardMedia
              component="img"
              alt="coupon"
              image="/assets/images/coupon.png"
            />
          </Box>
          {/* Batas */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 3,
                ml: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontFamily: 'Ubuntu',
                }}
              >
                Choose
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  fontStyle: 'italic',
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  mt: 1,
                  fontFamily: 'Ubuntu',
                }}
              >
                <Typography sx={{ color: Color.RED_COLOR, mr: 0.5 }}>
                  *
                </Typography>
                30 Augst 2021 s.d 30 Jan 2022
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 2.5,
                ml: 24,
              }}
            >
              <Typography
                sx={{
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  fontFamily: 'Ubuntu',
                  ml: 8.5,
                  mb: 0.7,
                }}
              >
                Discount 22% s.d 50k
              </Typography>
              <Box
                sx={{
                  border: 1,
                  borderStyle: 'dashed',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Color.BLUE_COLOR,
                  borderRadius: 1,
                  p: 0.4,
                  ml: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    color: Color.BLUE_COLOR,
                  }}
                >
                  COUPON 1
                </Typography>
              </Box>
            </Box>
            <CardMedia
              component="img"
              alt="coupon"
              image="/assets/images/coupon.png"
            />
          </Box>
          {/* Batas */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 3,
                ml: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontFamily: 'Ubuntu',
                }}
              >
                Choose
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  fontStyle: 'italic',
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  mt: 1,
                  fontFamily: 'Ubuntu',
                }}
              >
                <Typography sx={{ color: Color.RED_COLOR, mr: 0.5 }}>
                  *
                </Typography>
                30 Augst 2021 s.d 30 Jan 2022
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                // bgcolor: Color.RED_COLOR,
                mt: 2.5,
                ml: 24,
              }}
            >
              <Typography
                sx={{
                  color: Color.GRAY_COLOR,
                  fontSize: 11,
                  fontFamily: 'Ubuntu',
                  ml: 8.5,
                  mb: 0.7,
                }}
              >
                Discount 22% s.d 50k
              </Typography>
              <Box
                sx={{
                  border: 1,
                  borderStyle: 'dashed',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Color.BLUE_COLOR,
                  borderRadius: 1,
                  p: 0.4,
                  ml: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    color: Color.BLUE_COLOR,
                  }}
                >
                  COUPON 1
                </Typography>
              </Box>
            </Box>
            <CardMedia
              component="img"
              alt="coupon"
              image="/assets/images/coupon.png"
            />
          </Box>
          {/* </Box> */}
        </Box>
      </Modal>
      {/* Bates */}
      <Modal
        open={openpayment}
        onClose={handleClosePayment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="div"
          sx={{
            overflow: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 250,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}
            >
              Payment Method
            </Typography>
            <IconButton onClick={handleClosePayment}>
              <i class="ri-close-circle-fill"></i>
            </IconButton>
          </Box>
          <Typography
            sx={{
              color: Color.BLUE_COLOR,
              fontFamily: 'Ubuntu',
              fontSize: 15,
              mt: 2,
            }}
          >
            E-Money
          </Typography>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                Go-pay
              </Typography>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 13 }}>
                Tanpa Biaya
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'gopay'}
              onChange={handleChangeRadio}
              value="gopay"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'GOPAY' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                QRIS
              </Typography>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 13 }}>
                Tanpa Biaya
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'qris'}
              onChange={handleChangeRadio}
              value="qris"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'QRIS' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                Shopeepay
              </Typography>
              <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 13 }}>
                Tanpa Biaya
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'shopee'}
              onChange={handleChangeRadio}
              value="shopee"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'SHOPEE' }}
            />
          </Box>
          <Typography
            sx={{
              color: Color.BLUE_COLOR,
              fontFamily: 'Ubuntu',
              fontSize: 15,
              mt: 2,
            }}
          >
            Card
          </Typography>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                VISA
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'visa'}
              onChange={handleChangeRadio}
              value="visa"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'VISA' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                Mastercard
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'mastercard'}
              onChange={handleChangeRadio}
              value="mastercard"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'MASTERCARD' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                JCB
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'jcb'}
              onChange={handleChangeRadio}
              value="jcb"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'JCB' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                JCB
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'jcb2'}
              onChange={handleChangeRadio}
              value="jcb2"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'JCB2' }}
            />
          </Box>
          <Typography
            sx={{
              color: Color.BLUE_COLOR,
              fontFamily: 'Ubuntu',
              fontSize: 15,
              mt: 2,
            }}
          >
            Bank Transfer (03.00 - 21.00 WIB)
          </Typography>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                BCA
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'bca'}
              onChange={handleChangeRadio}
              value="bca"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'BCA' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                BNI
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'bni'}
              onChange={handleChangeRadio}
              value="bni"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'BNI' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                BRI
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'bri'}
              onChange={handleChangeRadio}
              value="bri"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'BRI' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderBottomColor: Color.GRAY_COLOR,
              py: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>Logo</Typography>
            </Box>
            <Box sx={{ pr: 18 }}>
              <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'Bold' }}>
                Mandiri
              </Typography>
            </Box>
            <Radio
              checked={selectedRadio === 'mandiri'}
              onChange={handleChangeRadio}
              value="mandiri"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'MANDIRI' }}
            />
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default Billing;
