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
import OrderTable from './OrderTable';
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

function Order() {
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
  // const [date2, setDate2] = useState(null);
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
      <Box sx={{ mx: 5 }}>
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
      </Box>
    </Fragment>
  );
}

export default Order;
