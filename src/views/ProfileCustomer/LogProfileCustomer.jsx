import React, { Fragment, useEffect, useState } from 'react';
import { Fab, Button, Typography, Box, Paper } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// import UserRoleTable from './UserRoleTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';

function LogProfileCustomer() {
  const [user, setUser] = useState([]);
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

  return (
    <Fragment>
      <Box
        sx={{
          mt: 3,
          paddingBottom: 5,
          px: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ width: '100%', boxShadow: 2 }}>
          <Box
            sx={{
              height: 60,
              bgcolor: Color.GRAY2_COLOR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Ubuntu',
                fontSize: 14,
                ml: 2,
              }}
            >
              PROFILE CUSTOMER
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              //   justifyContent: 'space-between',
              m: 2,
              pb: 2,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>19.03, 14-01-2022</Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>
              Andakara Prastawa
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1, fontWeight: 'bold' }}>
              menambahkan Profile Customer
            </Typography>
            <Typography sx={{ fontSize: 15, ml: 1 }}>Mira Lesmana</Typography>
          </Box>
        </Paper>
        {/* <UserRoleTable
          // data={user}
          // page={page}
          // rowsPerPage={rowsPerPage}
          // showDialogDelete={showDialogDelete}
          // setPage={(page) => setPage(page)}
          // setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
          handleUserSearch={(value) => {
            setSearchUser(value);
          }}
        /> */}
      </Box>
      <NavLink
        to="/customer/profilecustomer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          sx={{
            ml: 3,
            fontFamily: 'Ubuntu',
            color: Color.BLACK_COLOR,
            fontWeight: 'bold',
          }}
        >
          Back
        </Button>
      </NavLink>
    </Fragment>
  );
}

export default LogProfileCustomer;
