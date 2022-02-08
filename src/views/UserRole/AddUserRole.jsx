import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { smd_url } from '../../variable/BaseUrl';
import { styled } from '@mui/material/styles';
import Color from '../../variable/Color';
import { NavLink } from 'react-router-dom';
import { fontSize } from '@mui/system';
function createData(name, readRole, addRole, editRole, deleteRole) {
  return { name, readRole, addRole, editRole, deleteRole };
}

const rows = [
  createData('User Role', '', '', '', ''),
  createData('Job Position', '', '', '', ''),
  createData('User Administration', '', '', '', ''),
  createData('Customer', '', '', '', ''),
  createData('Package', '', '', '', ''),
  createData('Menu 1', '', '', '', ''),
  createData('Menu 2', '', '', '', ''),
  createData('Menu 3', '', '', '', ''),
  createData('Menu 4', '', '', '', ''),
];

function AddUserRole(props) {
  const [errorData, setErrorData] = useState('');
  const [data, setData] = useState('');
  const [position, setPosition] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedRead, setCheckedRead] = useState({
    user_role_read: false,
    job_position_read: false,
    user_admin_read: false,
    customer_read: false,
    paket_read: false,
    menu1_read: false,
    menu2_read: false,
    menu3_read: false,
    menu4_read: false,
  });
  const [checkedAdd, setCheckedAdd] = useState({
    user_role_add: false,
    job_position_add: false,
    user_admin_add: false,
    customer_add: false,
    paket_add: false,
    menu1_add: false,
    menu2_add: false,
    menu3_add: false,
    menu4_add: false,
  });
  const [checkedEdit, setCheckedEdit] = useState({
    user_role_edit: false,
    job_position_edit: false,
    user_admin_edit: false,
    customer_edit: false,
    paket_edit: false,
    menu1_edit: false,
    menu2_edit: false,
    menu3_edit: false,
    menu4_edit: false,
  });
  const [checkedDelete, setCheckedDelete] = useState({
    user_role_delete: false,
    job_position_delete: false,
    user_admin_delete: false,
    customer_delete: false,
    paket_delete: false,
    menu1_delete: false,
    menu2_delete: false,
    menu3_delete: false,
    menu4_delete: false,
  });

  const handleChangeRead = (event) => {
    setCheckedRead({
      ...checkedRead,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeAdd = (event) => {
    setCheckedAdd({
      ...checkedAdd,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeEdit = (event) => {
    setCheckedEdit({
      ...checkedEdit,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeDelete = (event) => {
    setCheckedDelete({
      ...checkedDelete,
      [event.target.name]: event.target.checked,
    });
  };

  const getDepartment = async () => {
    await axios
      .get(smd_url + 'departments', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setDepartment(res.data);
      });
  };

  const getPosition = async () => {
    await axios
      .get(smd_url + 'positions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setPosition(res.data);
      });
  };

  const getAdmin = async () => {
    await axios
      .get(smd_url + 'users/admin', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setAdmin(res.data);
      });
  };

  const getUser = async () => {
    await axios
      .get(`${smd_url}users/get/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getPosition();
    getAdmin();
    getDepartment();
    if (props.type === 'edit') {
      getUser();
    }
  }, []);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const {
    user_role_read,
    job_position_read,
    user_admin_read,
    customer_read,
    paket_read,
    menu1_read,
    menu2_read,
    menu3_read,
    menu4_read,
  } = checkedRead;

  const {
    user_role_add,
    job_position_add,
    user_admin_add,
    customer_add,
    paket_add,
    menu1_add,
    menu2_add,
    menu3_add,
    menu4_add,
  } = checkedAdd;

  const {
    user_role_edit,
    job_position_edit,
    user_admin_edit,
    customer_edit,
    paket_edit,
    menu1_edit,
    menu2_edit,
    menu3_edit,
    menu4_edit,
  } = checkedEdit;

  const {
    user_role_delete,
    job_position_delete,
    user_admin_delete,
    customer_delete,
    paket_delete,
    menu1_delete,
    menu2_delete,
    menu3_delete,
    menu4_delete,
  } = checkedDelete;

  // console.log(checkedRead);
  // console.log(checkedAdd);
  // console.log(checkedEdit);
  // console.log(checkedDelete);
  return (
    <Box sx={{ p: 3 }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid
              item
              md={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography>Add User Role</Typography>
            </Grid>
            <Grid
              item
              md={9}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                autoFocus
                required
                margin="normal"
                id="userRole"
                label="User Role"
                type="text"
                name="user_role"
                onChange={onChange}
                value={data.user_role !== undefined ? data.user_role : ''}
                value={data.user_role !== undefined ? data.user_role : ''}
              />
            </Grid>
            <Grid
              item
              md={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <NavLink
                to="/master-data/userrole"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: Color.RED_COLOR,
                    borderColor: Color.RED_COLOR,
                    color: Color.WHITE_COLOR,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: Color.RED_COLOR,
                    },
                  }}
                >
                  Cancel
                </Button>
              </NavLink>
            </Grid>
            <Grid
              item
              md={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  color: Color.WHITE_COLOR,
                  fontWeight: 'bold',
                }}
              >
                <i class="ri-save-3-line"></i>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: '100%', boxShadow: 2, mb: 10 }}>
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
                  fontStyle: 'Ubuntu',
                  fontSize: 14,
                  ml: 2,
                }}
              >
                APPLICATIONS
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'Ubuntu',
                  fontSize: 14,
                  ml: 4,
                }}
              >
                READ
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'Ubuntu',
                  fontSize: 14,
                }}
              >
                ADD
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'Ubuntu',
                  fontSize: 14,
                }}
              >
                EDIT
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'Ubuntu',
                  fontSize: 14,
                  mr: 10,
                }}
              >
                DELETE
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                User Role
              </Typography>
              <Checkbox
                checked={user_role_read}
                onChange={handleChangeRead}
                name="user_role_read"
                sx={{ ml: 8 }}
              />
              <Checkbox
                checked={user_role_add}
                onChange={handleChangeAdd}
                name="user_role_add"
              />
              <Checkbox
                checked={user_role_edit}
                onChange={handleChangeEdit}
                name="user_role_edit"
              />
              <Checkbox
                checked={user_role_delete}
                onChange={handleChangeDelete}
                name="user_role_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Job Position
              </Typography>
              <Checkbox
                checked={job_position_read}
                onChange={handleChangeRead}
                name="job_position_read"
                sx={{ ml: 6 }}
              />
              <Checkbox
                checked={job_position_add}
                onChange={handleChangeAdd}
                name="job_position_add"
              />
              <Checkbox
                checked={job_position_edit}
                onChange={handleChangeEdit}
                name="job_position_edit"
              />
              <Checkbox
                checked={job_position_delete}
                onChange={handleChangeDelete}
                name="job_position_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                User Administration
              </Typography>
              <Checkbox
                checked={user_admin_read}
                onChange={handleChangeRead}
                name="user_admin_read"
              />
              <Checkbox
                checked={user_admin_add}
                onChange={handleChangeAdd}
                name="user_admin_add"
              />
              <Checkbox
                checked={user_admin_edit}
                onChange={handleChangeEdit}
                name="user_admin_edit"
              />
              <Checkbox
                checked={user_admin_delete}
                onChange={handleChangeDelete}
                name="user_admin_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Customer
              </Typography>
              <Checkbox
                checked={customer_read}
                onChange={handleChangeRead}
                name="customer_read"
                sx={{ ml: 8.5 }}
              />
              <Checkbox
                checked={customer_add}
                onChange={handleChangeAdd}
                name="customer_add"
              />
              <Checkbox
                checked={customer_edit}
                onChange={handleChangeEdit}
                name="customer_edit"
              />
              <Checkbox
                checked={customer_delete}
                onChange={handleChangeDelete}
                name="customer_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Package
              </Typography>
              <Checkbox
                checked={paket_read}
                onChange={handleChangeRead}
                name="paket_read"
                sx={{ ml: 9.3 }}
              />
              <Checkbox
                checked={paket_add}
                onChange={handleChangeAdd}
                name="paket_add"
              />
              <Checkbox
                checked={paket_edit}
                onChange={handleChangeEdit}
                name="paket_edit"
              />
              <Checkbox
                checked={paket_delete}
                onChange={handleChangeDelete}
                name="paket_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Menu 1
              </Typography>
              <Checkbox
                checked={menu1_read}
                onChange={handleChangeRead}
                name="menu1_read"
                sx={{ ml: 10.5 }}
              />
              <Checkbox
                checked={menu1_add}
                onChange={handleChangeAdd}
                name="menu1_add"
              />
              <Checkbox
                checked={menu1_edit}
                onChange={handleChangeEdit}
                name="menu1_edit"
              />
              <Checkbox
                checked={menu1_delete}
                onChange={handleChangeDelete}
                name="menu1_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Menu 2
              </Typography>
              <Checkbox
                checked={menu2_read}
                onChange={handleChangeRead}
                name="menu2_read"
                sx={{ ml: 10.5 }}
              />
              <Checkbox
                checked={menu2_add}
                onChange={handleChangeAdd}
                name="menu2_add"
              />
              <Checkbox
                checked={menu2_edit}
                onChange={handleChangeEdit}
                name="menu2_edit"
              />
              <Checkbox
                checked={menu2_delete}
                onChange={handleChangeDelete}
                name="menu2_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Menu 3
              </Typography>
              <Checkbox
                checked={menu3_read}
                onChange={handleChangeRead}
                name="menu3_read"
                sx={{ ml: 10.5 }}
              />
              <Checkbox
                checked={menu3_add}
                onChange={handleChangeAdd}
                name="menu3_add"
              />
              <Checkbox
                checked={menu3_edit}
                onChange={handleChangeEdit}
                name="menu3_edit"
              />
              <Checkbox
                checked={menu3_delete}
                onChange={handleChangeDelete}
                name="menu3_delete"
                sx={{ mr: 8 }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                m: 2,
                pb: 2,
              }}
            >
              <Typography sx={{ fontStyle: 'Ubuntu', fontSize: 15 }}>
                Menu 4
              </Typography>
              <Checkbox
                checked={menu4_read}
                onChange={handleChangeRead}
                name="menu4_read"
                sx={{ ml: 10.5 }}
              />
              <Checkbox
                checked={menu4_add}
                onChange={handleChangeAdd}
                name="menu4_add"
              />
              <Checkbox
                checked={menu4_edit}
                onChange={handleChangeEdit}
                name="menu4_edit"
              />
              <Checkbox
                checked={menu4_delete}
                onChange={handleChangeDelete}
                name="menu4_delete"
                sx={{ mr: 8 }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddUserRole;
