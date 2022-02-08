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

function AddJobPosition(props) {
  const [errorData, setErrorData] = useState('');
  const [data, setData] = useState('');
  const [position, setPosition] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedRead, setCheckedRead] = useState(false);
  const [checkedAdd, setCheckedAdd] = useState(false);
  const [checkedEdit, setCheckedEdit] = useState(false);
  const [checkedDelete, setCheckedDelete] = useState(false);

  const handleChangeRead = (event) => {
    setCheckedRead(event.target.checked);
  };
  const handleChangeAdd = (event) => {
    setCheckedAdd(event.target.checked);
  };
  const handleChangeEdit = (event) => {
    setCheckedEdit(event.target.checked);
  };
  const handleChangeDelete = (event) => {
    setCheckedDelete(event.target.checked);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props.type === 'add') {
      let formData = new FormData();
      formData.append('user_role', data.user_role);

      await axios
        .post(smd_url + 'users/create', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(() => {
          navigate('/master-data/users');
        })
        .catch((err) => {
          setErrorData(err.response.data.errors.location);
        });
    } else if (props.type === 'edit') {
      await axios
        .put(
          `${smd_url}users/update/${data.id}`,
          {
            username: data.username,
            email: data.email,
            admin: data.admin,
            basic_salary: data.basic_salary,
            company_name: 'Dewarangga',
            department: data.department,
            employee_id: data.employee_id,
            job_position: data.job_position,
            join_date: data.join_date,
            level: data.level,
            allowance_1: data.allowance_1,
            allowance_2: data.allowance_2,
            first_name: data.first_name,
            last_name: data.last_name,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then(() => {
          navigate('/master-data/users');
        })
        .catch((err) => {
          setErrorData(err.response.data.errors.location);
        });
    }
  };
  console.log(errorData.email);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log(data.user_role);
  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
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
                <Button
                  variant="outlined"
                  fullWidth
                  href="/master-data/userrole"
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
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ bgcolor: Color.GRAY2_COLOR }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      APPLICATIONS
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                      READ
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                      ADD
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                      EDIT
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                      DELETE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: 'none' }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left" sx={{ borderBottom: 'none' }}>
                        <Checkbox
                          checked={checkedRead}
                          onChange={handleChangeRead}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ borderBottom: 'none' }}>
                        <Checkbox
                          checked={checkedAdd}
                          onChange={handleChangeAdd}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ borderBottom: 'none' }}>
                        <Checkbox
                          checked={checkedEdit}
                          onChange={handleChangeEdit}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ borderBottom: 'none' }}>
                        <Checkbox
                          checked={checkedDelete}
                          onChange={handleChangeDelete}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddJobPosition;
