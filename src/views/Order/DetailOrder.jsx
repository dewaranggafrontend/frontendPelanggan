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

function DetailOrder() {
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
          py: 5,
          px: 10,
          // display: 'flex',
          // justifyContent: 'center',
          // flexDirection: 'column',
          // bgcolor: Color.GREEN_COLOR,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ fontFamily: 'Ubuntu' }}>
            Order ID: INV0987
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Customer Name
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>Mira Lesmana</Typography>
          </Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Ubuntu',
              fontSize: 25,
              mt: 1,
            }}
          >
            Package 1
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              User Max
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>100 Employee</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Package Duration
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>12 Month</Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed', mt: 1.5 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Price
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>IDR 200.000</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Ubuntu',
                color: Color.GRAY_COLOR,
                display: 'flex',
              }}
            >
              Coupon
              <Typography sx={{ fontStyle: 'italic', ml: 0.5 }}>
                (COUPON 1)
              </Typography>
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.RED_COLOR }}>
              -IDR 50.000
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              PPn
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>10%</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Unique Code
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>234</Typography>
          </Box>
          <Divider sx={{ mt: 1.5 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Total
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Ubuntu',
                color: Color.GREEN_COLOR,
                fontSize: 23,
                fontWeight: 'bold',
              }}
            >
              IDR 170.234
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3, bgcolor: Color.GRAY2_COLOR }}>
          <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
            Payment Information
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Payment Method
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
              Bank Transfer (BCA)
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Paid Date
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu' }}>-</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Due Date
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.RED_COLOR }}>
              16/12/2021
            </Typography>
          </Box>
          <Divider sx={{ mt: 1.5 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.GRAY_COLOR }}>
              Status Payment
            </Typography>
            <Typography sx={{ fontFamily: 'Ubuntu', color: Color.RED_COLOR }}>
              Unpaid
            </Typography>
          </Box>
        </Paper>
      </Box>
      <NavLink to="/customer/order" style={{ textDecoration: 'none' }}>
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

export default DetailOrder;
