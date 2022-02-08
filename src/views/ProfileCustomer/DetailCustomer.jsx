import React, { Fragment, useEffect, useState } from 'react';
import {
  Fab,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  TextField,
  CardMedia,
} from '@mui/material';
import Uploady from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';
import UploadPreview from '@rpldy/upload-preview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled2 from 'styled-components';
// import UserRoleTable from './UserRoleTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';
import Color from '../../variable/Color';

function DetailCustomer() {
  const [user, setUser] = useState([]);
  const [opendDialogDelete, setOpenDialogDelete] = useState(false);
  const [userID, setUserID] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchUser, setSearchUser] = useState('');
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);

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

  const filterBySize = (file) => {
    // return file.size < 102400;
    return file.size < 5242880;
  };

  const DivUploadButton = asUploadButton((props) => {
    return (
      <div
        {...props}
        style={{
          cursor: 'pointer',
          height: 120,
          width: 120,
          border: 1,
          borderRadius: 5,
          borderStyle: 'dashed',
          borderColor: Color.BLUE_COLOR,
          backgroundColor: Color.THEME_COLOR,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <i class="ri-upload-cloud-2-line" style={{ fontSize: 25 }}></i>
        <Typography sx={{ fontFamily: 'Ubuntu', fontSize: 15, mt: 1 }}>
          Upload Image
        </Typography>
      </div>
    );
  });

  const PreviewContainer = styled2.div`
  margin-left: 20px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 5px;
  }
`;

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          mt: 3,
          paddingBottom: 5,
          px: 10,
          // display: 'flex',
          // justifyContent: 'center',
          // flexDirection: 'column',
          // bgcolor: Color.GREEN_COLOR,
          // textAlign: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
          Customer Data
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ px: 2 }}>
          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
            Personal Data
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={6}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  // borderRadius: 5,
                  // bgcolor: Color.GREEN_COLOR,
                }}
              >
                <CardMedia
                  component="img"
                  image="/assets/images/user.jpeg"
                  height="150"
                  sx={{ borderRadius: 5 }}
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
                  Customer ID
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>CS6493832</Typography>
                </Box>
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
                  First Name
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>Nero</Typography>
                </Box>
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
                  Last Name
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>Gama</Typography>
                </Box>
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
                  Gender
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>Male</Typography>
                </Box>
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
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>UI/UX Designer</Typography>
                </Box>
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
                  Date of Birth
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>12-12-2022</Typography>
                </Box>
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
                  Phone Number
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>02179187676</Typography>
                </Box>
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
                  Email
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>nero@gmail</Typography>
                </Box>
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
                  Username
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>nerogama</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ px: 2 }}>
          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
            Company Data
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={6}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  // borderRadius: 5,
                  // bgcolor: Color.GREEN_COLOR,
                }}
              >
                <CardMedia
                  component="img"
                  image="/assets/images/logo.jpeg"
                  height="150"
                  sx={{ borderRadius: 5 }}
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
                  Company Name
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>PT. Life Foundation</Typography>
                </Box>
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
                  Package
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>Package 1</Typography>
                </Box>
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
                  User Max
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>100</Typography>
                </Box>
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
                  Package Duration
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>302147809</Typography>
                </Box>
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
                  Price
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>Rp. 1.000.000</Typography>
                </Box>
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
                  Fax
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>0214802509</Typography>
                </Box>
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
                  Phone Number
                </Typography>
                <Box sx={{ bgcolor: Color.THEME_COLOR, p: 2, borderRadius: 2 }}>
                  <Typography>02179187676</Typography>
                </Box>
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
                    mb: 2,
                  }}
                >
                  Address
                </Typography>
                <Box
                  sx={{
                    bgcolor: Color.THEME_COLOR,
                    p: 2,
                    borderRadius: 2,
                    height: 200,
                  }}
                >
                  <Typography>Jl. Sukapurapura</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <NavLink
        to="/customer/profilecustomer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          sx={{
            ml: 3,
            mt: 3,
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

export default DetailCustomer;
