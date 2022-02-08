import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Button,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  IconButton,
  Avatar,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Color from '../../variable/Color';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // backgroundColor: Color.BLACK2_COLOR,
    // color: Color.WHITE_COLOR,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: Color.THEME_COLOR,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ProfileCustomerTable(perop) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // console.log(perop.data.length);

  //----------------------------------------------------------
  function createData(
    idpackage,
    packagename,
    usermax,
    duration,
    packagecounter
  ) {
    return {
      idpackage,
      packagename,
      usermax,
      duration,
      packagecounter,
    };
  }

  const rows = [
    createData('0001', 'Package 1', 10, 1, 1000),
    createData('0002', 'Package 2', 20, 2, 1200),
    createData('0003', 'Package 3', 30, 3, 1300),
    createData('0004', 'Package 4', 40, 4, 1400),
    createData('0005', 'Package 5', 50, 5, 1500),
    createData('0006', 'Package 6', 60, 6, 1600),
    createData('0007', 'Package 7', 999, 7, 1700),
    createData('0008', 'Package 8', 1, 8, 1800),
    createData('0009', 'Package 9', 2, 9, 1900),
    createData('0010', 'Package 10', 3, 10, 2000),
    createData('0011', 'Package 11', 4, 11, 2100),
    createData('0012', 'Package 12', 5, 12, 2200),
    createData('0013', 'Package 13', 6, 13, 2300),
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID COSTUMER',
    },
    {
      id: 'name',
      numeric: true,
      disablePadding: false,
      label: 'EMPLOYEE',
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: 'EMAIL',
    },
    {
      id: 'created_at',
      numeric: true,
      disablePadding: false,
      label: 'PHONE NUMBER',
    },
    {
      id: 'updated_at',
      numeric: true,
      disablePadding: false,
      label: 'USERNAME',
    },
  ];

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ py: 2, fontWeight: 'bold' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  //----------------------------------------------------------

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = perop.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - perop.data.length) : 0;

  return (
    <Box sx={{ width: '100%', px: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={perop.data.length}
            />
            <TableBody>
              {stableSort(perop.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <StyledTableCell sx={{ p: 1 }}>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClickMenu}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <NavLink
                          to="/customer/profilecustomer/detail"
                          style={{ color: Color.BLUE_COLOR }}
                        >
                          <Button sx={{ textTransform: 'capitalize' }}>
                            {row.id}
                          </Button>
                        </NavLink>
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">{row.name}</StyledTableCell> */}
                      <StyledTableCell align="left">
                        <Box sx={{ display: 'flex' }}>
                          <Box>
                            <Avatar
                              alt={`${row.name}`}
                              src={
                                'https://api.betterjob.id/storage/' +
                                row.image_in
                              }
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              ml: 2,
                            }}
                          >
                            {/* <Link to="#" style={{ color: Color.BLUE_COLOR }}> */}
                            {row.name}
                            {/* </Link> */}
                            <Box>{row.employee_id}</Box>
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.date}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.created_at}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.updated_at}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={perop.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <i
            class="ri-edit-2-line"
            style={{ color: Color.BLUE_COLOR, fontSize: 20 }}
          />
          <Typography sx={{ ml: 1 }}>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <i
            class="ri-delete-bin-6-line"
            style={{ color: Color.BLUE_COLOR, fontSize: 20 }}
          />
          <Typography sx={{ ml: 1 }}>Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default ProfileCustomerTable;
