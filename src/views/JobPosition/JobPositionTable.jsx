import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
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

function createData(position, employee) {
  return {
    position,
    employee,
  };
}

const rows = [
  createData('E Position', 1),
  createData('F Position', 2),
  createData('G Position', 3),
  createData('V Position', 4),
  createData('U Position', 5),
  createData('A Position', 6),
  createData('B Position', 999),
  createData('C Position', 60),
  createData('D Position', 50),
  createData('W Position', 40),
  createData('X Position', 30),
  createData('Y Position', 20),
  createData('Z Position', 10),
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
  // {
  //   id: 'test',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Test',
  // },
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID POSITION',
  },
  {
    id: 'job_name',
    numeric: true,
    disablePadding: false,
    label: 'POSITION',
  },
  // {
  //   id: 'fat',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Fat (g)',
  // },
  // {
  //   id: 'carbs',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Carbs (g)',
  // },
  // {
  //   id: 'protein',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Protein (g)',
  // },
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
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
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
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

// const EnhancedTableToolbar = (props) => {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

function JobPositionTable(perop) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [nomor, setNomor] = React.useState(null);

  // const handleClickMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleClickMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setNomor(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setNomor(null);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - perop.data.length) : 0;

  return (
    <Box sx={{ width: '100%', px: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(perop.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .map((row, index) => {
                //   const isItemSelected = isSelected(row.id);
                //   const labelId = `enhanced-table-checkbox-${index}`;
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      // hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      <StyledTableCell sx={{ p: 1 }}>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          // onClick={handleClickMenu}
                          onClick={(e) => handleClickMenu(e, row.id)}
                          // onClick={() => console.log(row.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          // open={open}
                          open={nomor === row.id}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              perop.showEditModal(row);
                              handleClose();
                            }}
                          >
                            <i
                              class="ri-edit-2-line"
                              style={{ color: Color.BLUE_COLOR, fontSize: 20 }}
                            />
                            <Typography sx={{ ml: 1 }}>Edit</Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              perop.showDialogDelete(row.id);
                              handleClose();
                            }}
                          >
                            <i
                              class="ri-delete-bin-6-line"
                              style={{ color: Color.BLUE_COLOR, fontSize: 20 }}
                            />
                            <Typography sx={{ ml: 1 }}>Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        // id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.job_name}
                      </StyledTableCell>
                      {/* <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
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
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => perop.showDialogDelete(perop.data.id)}>
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
      </Menu> */}
    </Box>
  );
}
export default JobPositionTable;

// const columns = [
//   { id: 'name', label: 'EMPLOYEE' },
//   // { id: 'employee_id', label: 'Employee ID' },
//   { id: 'postition', label: 'JOB POSITION' },
//   { id: 'department', label: 'DEPARTMENT' },
//   { id: 'status', label: 'EMPLOYEMENT STATUS' },
//   { id: 'email', label: 'EMAIL' },
//   { id: 'join_date', label: 'JOIN DATE' },
//   { id: 'end_date', label: 'END DATE' },
//   // { id: 'level', label: 'Level' },
//   // { id: 'status', label: 'Status' },
//   // { id: 'action', label: 'Action' },
// ];

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#f4f6fc',
//     // color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(even)': {
//     backgroundColor: '#f4f6fc',
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function UserRoleTable(props) {
//   const theme = useTheme();
//   const handleChangePage = (event, newPage) => {
//     props.setPage(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     props.setRowsPerPage(+event.target.value);
//     props.setPage(1);
//   };

//   return (
//     <Paper sx={{ width: '97%', overflow: 'hidden' }}>
//       {/* <Toolbar
//         sx={{
//           px: { sm: 2 },
//           py: 2,
//           // bgcolor: Color.GRAY_COLOR,
//           position: 'absolute',
//           top: 60,
//           right: 10,
//           width: 400,
//           [theme.breakpoints.down('md')]: {
//             display: 'none',
//           },
//         }}
//       >
//         <TextField
//           fullWidth
//           id="outlined-search"
//           label="Search data employee"
//           type="search"
//           onChange={(e) => {
//             props.handleUserSearch(e.target.value);
//           }}
//         />
//       </Toolbar> */}
//       <TableContainer sx={{ maxHeight: 580 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <StyledTableRow>
//               {columns.map((column) => (
//                 <StyledTableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     {column.label}
//                     {
//                       //    column.label !== '' ? <SortByAlphaIcon /> : null
//                     }
//                   </Box>
//                 </StyledTableCell>
//               ))}
//               <StyledTableCell>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}
//                 ></Box>
//               </StyledTableCell>
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {props.data.length !== 0 &&
//               props.data.data.map((item) => (
//                 <StyledTableRow
//                   // hover
//                   role="checkbox"
//                   tabIndex={-1}
//                   key={item.id}
//                 >
//                   {/* <TableCell align="left">
//                     {item.first_name} {item.last_name}
//                   </TableCell> */}
//                   <StyledTableCell align="left">
//                     <Box sx={{ display: 'flex' }}>
//                       <Box>
//                         <Avatar
//                           alt={`${item.first_name} ${item.last_name}`}
//                           src={
//                             'https://api.betterjob.id/storage/' +
//                             item.profile_images
//                           }
//                         />
//                       </Box>
//                       <Box
//                         sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}
//                       >
//                         <Link to="#" style={{ color: Color.BLUE_COLOR }}>
//                           {item.first_name} {item.last_name}
//                         </Link>
//                         <Box>{item.employee_id}</Box>
//                       </Box>
//                     </Box>
//                   </StyledTableCell>
//                   {/* <TableCell align="left"> {item.employee_id} </TableCell> */}
//                   <StyledTableCell align="left">
//                     {' '}
//                     {item.job_position}{' '}
//                   </StyledTableCell>
//                   <StyledTableCell align="left">
//                     {' '}
//                     {item.department}{' '}
//                   </StyledTableCell>
//                   <StyledTableCell align="left"> {item.level} </StyledTableCell>
//                   <StyledTableCell align="left"> {item.email} </StyledTableCell>
//                   <StyledTableCell align="left">
//                     {' '}
//                     {item.join_date}{' '}
//                   </StyledTableCell>
//                   <StyledTableCell align="left">
//                     {' '}
//                     {item.join_date}{' '}
//                   </StyledTableCell>
//                   {/* <TableCell align="right">
//                     <Box
//                       sx={{
//                         display: 'flex',
//                       }}
//                     >
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         sx={{ mr: 2 }}
//                         onClick={() => props.showDialogDelete(item.id)}
//                       >
//                         <DeleteIcon />
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         href={`/master-data/users/edit/${item.id}`}
//                       >
//                         <EditIcon />
//                       </Button>
//                     </Box>
//                   </TableCell> */}
//                 </StyledTableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={props.data.total}
//         rowsPerPage={props.data.per_page}
//         page={props.data.current_page - 1}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       {/* {props.data.length !== 0 && (
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={props.data.total}
//           rowsPerPage={props.data.per_page}
//           page={props.data.current_page - 1}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )} */}
//       {console.log(props.data.length)}
//     </Paper>
//   );
// }

// export default UserRoleTable;
