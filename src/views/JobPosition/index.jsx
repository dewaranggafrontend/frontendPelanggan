import React, { Fragment, useEffect, useState } from 'react';
import {
  Fab,
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobPositionTable from './JobPositionTable';
import { smd_url, smd_temp } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 300,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

let panjang;
let lastitem;

function JobPosition() {
  // const [user, setUser] = useState([]);
  const [jobposition, setJobPosition] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [datacon, setDataCon] = useState([]);
  // const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [searchUser, setSearchUser] = useState('');
  // const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState('');

  const getJobPosition = async () => {
    await axios
      .get(smd_temp + 'job-position')
      .then((res) => {
        setJobPosition(res.data);
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

  // const getUser = async () => {
  //   await axios
  //     .get(smd_url + 'users', {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       },
  //       params: {
  //         page: page,
  //         itemPerPage: rowsPerPage,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //     });
  // };

  // const handleSearchUser = async () => {
  //   await axios
  //     .get(smd_url + 'users/search', {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       },
  //       params: {
  //         param: searchUser,
  //         page: page,
  //         itemPerPage: rowsPerPage,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //     });
  // };

  // useEffect(() => {
  //   if (searchUser !== '') {
  //     const fieldSearchUser = setTimeout(() => {
  //       handleSearchUser();
  //     }, 500);
  //     return () => clearTimeout(fieldSearchUser);
  //   } else {
  //     getUser();
  //   }
  // }, [searchUser]);

  useEffect(() => {
    getJobPosition();
  }, []);

  const handleDialogDelete = (data) => {
    setOpenDialogDelete(data);
  };

  const showDialogDelete = (ID) => {
    setUserID(ID);
    handleDialogDelete(true);
  };

  const showEditModal = (DATA) => {
    setDataCon(DATA);
    setOpenEdit(true);
  };

  const handleDelete = async (ID) => {
    await axios
      .delete(smd_temp + 'job-position', { params: { id: ID } })
      .then(() => {
        console.log(ID);
        getJobPosition();
        handleDialogDelete(false);
      });
  };

  const handleSave = async () => {
    await axios
      .post(smd_temp + 'job-position', {
        job_name: data.job_position,
      })
      .then((res) => {
        console.log(res);
        getJobPosition();
        setOpen(false);
      });
  };

  const handleEdit = async () => {
    await axios
      .put(smd_temp + 'job-position', null, {
        params: {
          id: datacon.id,
          job_name: datacon.job_name,
        },
      })
      .then((res) => {
        console.log(res);
        getJobPosition();
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

  const handleOpen = () => {
    if (jobposition.length === 0) {
      lastitem = 0;
    } else {
      panjang = jobposition.length - 1;
      lastitem = jobposition[panjang].id;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  console.log(jobposition.length);
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
            Add Job Position
          </Typography>
        </Button>
        <NavLink
          to="/master-data/jobposition/log"
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
        <JobPositionTable
          data={jobposition}
          showDialogDelete={showDialogDelete}
          showEditModal={showEditModal}
          // handleUserSearch={(value) => {
          //   setSearchUser(value);
          // }}
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
            Add Job Position
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  ID Position
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
                  Position Name
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="jobPosition"
                  label="Position Name"
                  type="text"
                  name="job_position"
                  onChange={onChange}
                  value={
                    data.job_position !== undefined ? data.job_position : ''
                  }
                />
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
            <NavLink
              to="/master-data/jobposition"
              style={{ textDecoration: 'none' }}
            >
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
            </NavLink>
          </Box>
        </Box>
      </Modal>
      {/* Bates */}
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
            Edit Job Position
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Typography
                  sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 2 }}
                >
                  ID Position
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
                  Position Name
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  margin="normal"
                  id="jobName"
                  type="text"
                  name="job_name"
                  onChange={onChange2}
                  value={datacon.job_name !== undefined ? datacon.job_name : ''}
                />
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
            <NavLink
              to="/master-data/jobposition"
              style={{ textDecoration: 'none' }}
            >
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
            </NavLink>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}

export default JobPosition;
