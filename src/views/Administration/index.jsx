import React, { Fragment, useEffect, useState } from 'react';
import { Fab, Button, Typography } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Box } from '@mui/system';
import AdministrationTable from './AdministrationTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';

function Administration() {
  const [user, setUser] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');

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
        <NavLink
          to="/master-data/administration/add"
          style={{ textDecoration: 'none' }}
        >
          <Button
            sx={{
              bgcolor: Color.BLUE_COLOR,
              textTransform: 'capitalize',
            }}
          >
            <i
              class="ri-add-circle-line"
              style={{ color: Color.WHITE_COLOR, fontSize: 25 }}
            ></i>
            <Typography sx={{ color: Color.WHITE_COLOR, ml: 1 }}>
              Add User Administrator
            </Typography>
          </Button>
        </NavLink>
        <NavLink
          to="/master-data/administration/log"
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
        <AdministrationTable
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
    </Fragment>
  );
}

export default Administration;
