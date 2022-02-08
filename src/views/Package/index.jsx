import React, { Fragment, useEffect, useState } from 'react';
import {
  Fab,
  Button,
  Typography,
  Box,
  Modal,
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
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PackageTable from './PackageTable';
import { smd_url, smd_temp } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CurrencyFormat from 'react-currency-format';

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

let panjang;
let lastitem;

function Package() {
  const [user, setUser] = useState([]);
  const [paket, setPaket] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [datacon, setDataCon] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [duration, setDuration] = useState('');
  const [durationedit, setDurationEdit] = useState('');

  const getPackage = async () => {
    await axios
      .get(smd_temp + 'paket')
      .then((res) => {
        setPaket(res.data);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
  };

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  const handleChangeEdit = (event) => {
    setDurationEdit(event.target.value);
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onChange2 = (e) => {
    setDataCon({
      ...datacon,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getPackage();
  }, []);

  const handleDialogDelete = (data) => {
    setOpenDialogDelete(data);
  };

  const showDialogDelete = (ID) => {
    setUserID(ID);
    handleDialogDelete(true);
  };

  const handleSave = async () => {
    await axios
      .post(smd_temp + 'paket', {
        name: data.package_name,
        user_limit: data.user_max,
        harga: data.price,
        duration: duration,
      })
      .then((res) => {
        console.log(res);
        getPackage();
        setOpen(false);
      });
  };

  const showEditModal = (DATA) => {
    setDataCon(DATA);
    setOpenEdit(true);
  };

  const handleEdit = async () => {
    await axios
      .put(smd_temp + 'paket', null, {
        params: {
          id: datacon.id,
          name: datacon.name,
          user_limit: datacon.user_limit,
          harga: datacon.harga,
          duration: durationedit,
        },
      })
      .then((res) => {
        console.log(res);
        getPackage();
        setOpenEdit(false);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('message : ' + e.message);
        }
      });
  };

  const handleDelete = async (ID) => {
    await axios.delete(smd_temp + 'paket', { params: { id: ID } }).then(() => {
      console.log(ID);
      getPackage();
      handleDialogDelete(false);
    });
  };

  const handleOpen = () => {
    if (paket.length === 0) {
      lastitem = 0;
    } else {
      panjang = paket.length - 1;
      lastitem = paket[panjang].id;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  // console.log(data.package_name);
  // console.log(data.user_max);
  // console.log(data.price);
  console.log(datacon);
  return (
    <Fragment>
      <Box
        sx={{
          '& > :not(style)': { m: 2 },
          display: 'flex',
          paddingTop: 1,
          paddingRight: 1,
          paddingLeft: 1,
          justifyContent: 'space-between',
        }}
      >
        <Button
          sx={{
            bgcolor: Color.BLUE_COLOR,
            textTransform: 'capitalize',
          }}
          onClick={handleOpen}
        >
          <i
            class="ri-add-circle-line"
            style={{ color: Color.WHITE_COLOR, fontSize: 25 }}
          ></i>
          <Typography sx={{ color: Color.WHITE_COLOR, ml: 1 }}>
            Add Package
          </Typography>
        </Button>
        <NavLink
          to="/master-data/package/log"
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
        <PackageTable
          data={paket}
          showDialogDelete={showDialogDelete}
          showEditModal={showEditModal}
        />
      </Box>
      <DeleteDialog
        open={opendDialogDelete}
        handleDialog={handleDialogDelete}
        handleDelete={handleDelete}
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
            Add Package
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  ID Package
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={lastitem + 1}
                  sx={{ width: 300, backgroundColor: Color.GRAY2_COLOR }}
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                  Package Name
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="packageName"
                  label="Package Name"
                  type="text"
                  name="package_name"
                  onChange={onChange}
                  value={
                    data.package_name !== undefined ? data.package_name : ''
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={6}>
              <Box>
                <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                  User Max
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="userMax"
                  label="User Max"
                  type="number"
                  name="user_max"
                  onChange={onChange}
                  value={data.user_max !== undefined ? data.user_max : ''}
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  Duration
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Duration
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={duration}
                    label="Duration"
                    onChange={handleChange}
                  >
                    <MenuItem value={3}>3 Hari</MenuItem>
                    <MenuItem value={15}>15 Hari</MenuItem>
                    <MenuItem value={30}>30 Hari</MenuItem>
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
                  Price
                </Typography>
                <FormControl fullWidth>
                  <OutlinedInput
                    id="price"
                    type="number"
                    name="price"
                    value={data.price !== undefined ? data.price : ''}
                    onChange={onChange}
                    startAdornment={
                      <InputAdornment position="start">Rp.</InputAdornment>
                    }
                  />
                </FormControl>
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
              onClick={handleSave}
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
      {/* Batas */}
      <Modal
        open={openEdit}
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
            Edit Package
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  ID Package
                </Typography>
                <TextField
                  disabled
                  id="outlined-disabled"
                  defaultValue={datacon.id !== undefined ? datacon.id : ''}
                  sx={{ width: 300, backgroundColor: Color.GRAY2_COLOR }}
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                  Package Name
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="packageName"
                  label="Package Name"
                  type="text"
                  name="name"
                  onChange={onChange2}
                  value={datacon.name !== undefined ? datacon.name : ''}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={6}>
              <Box>
                <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
                  User Max
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="userMax"
                  label="User Max"
                  type="number"
                  name="user_limit"
                  onChange={onChange2}
                  value={
                    datacon.user_limit !== undefined ? datacon.user_limit : ''
                  }
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  Duration
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Duration
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={durationedit}
                    label="Duration"
                    onChange={handleChangeEdit}
                  >
                    <MenuItem value={3}>3 Hari</MenuItem>
                    <MenuItem value={15}>15 Hari</MenuItem>
                    <MenuItem value={30}>30 Hari</MenuItem>
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
                  Price
                </Typography>
                {/* <FormControl fullWidth> */}
                <Box>
                  <OutlinedInput
                    id="price"
                    type="number"
                    name="harga"
                    value={datacon.harga !== undefined ? datacon.harga : ''}
                    onChange={onChange2}
                    startAdornment={
                      <InputAdornment position="start">Rp.</InputAdornment>
                    }
                  />
                </Box>
                {/* </FormControl> */}
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
              onClick={handleEdit}
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

export default Package;
