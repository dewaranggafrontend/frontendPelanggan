import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';

import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Drawer,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  CardMedia,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  InputBase,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import AppMenuItem from './AppMenuItem';
import { appMenuItems } from './MenuItems';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import { useNavigate } from 'react-router';
import {
  authentication,
  menuAtom,
  openAtom,
  selectAtom,
} from '../../store/Recoil';
import Color from '../../variable/Color';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { masterDataItems } from './MasterDataItems';
import { customerItems } from './CustomerItems';
import GroupsIcon from '@mui/icons-material/Groups';

const drawerWidth = 280;

const menuSelector = selector({
  key: 'menu-selector-2',
  get: ({ get }) => {
    const menu = get(menuAtom);
    return menu;
  },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  // backgroundColor: Color.WHITE_COLOR,
}));

// function AllReset() {
//   useResetRecoilState(openAtom);
//   useResetRecoilState(menuAtom);
// }

function DashboardTemplate(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useRecoilState(authentication);
  const token = localStorage.getItem('token');
  const [open2, setOpen2] = useRecoilState(openAtom);
  const [select, setSelect] = useRecoilState(selectAtom);
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [showsearch, setShowSearch] = useState(false);
  const [choose, setChoose] = useState('0');

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleSearchShow = () => {
    setShowSearch(!showsearch);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await axios
      .get(smd_url + 'logout', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        setAuth({
          auth: false,
          user: null,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('employee_id');
        navigate('/');
      });
  };

  const handleProfile = () => {
    navigate('/setting');
    handleCloseUserMenu();
    setMenu('none');
  };

  const settings = [
    {
      title: 'Setting',
      icon: 'ri-settings-2-fill',
      color: Color.BLACK_COLOR,
      action: handleProfile,
    },
    {
      title: 'Logout',
      icon: 'ri-logout-box-fill',
      color: Color.RED_COLOR,
      action: handleLogout,
    },
  ];

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.5),
    // backgroundColor: Color.BLACK2_COLOR,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.75),
    },
    marginRight: theme.spacing(30),
    marginLeft: theme.spacing(10),
    width: '38%',
    [theme.breakpoints.down('md')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      // width: '100%',
      width: 700,
      [theme.breakpoints.down('md')]: {
        width: '20ch',
      },
    },
  }));

  // const handleClick = () => {
  //   setOpen2(!open);
  //   setMenu('0');
  // };

  const handleClick = (pilih) => {
    // if (pilih === '1' || pilih === '2') {
    //   setOpen(true);
    // } else {
    //   setOpen2(!open);
    // }
    // setOpen2(!open2);
    setOpen2(true);
    setMenu(pilih);
    setSelect('1');
  };

  // const backToHome = useResetRecoilState(menuAtom);

  const nomormenu = useRecoilValue(menuSelector);

  console.log(nomormenu);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{ p: 3, bgcolor: Color.THEME_COLOR }}>
          <CardMedia
            component="img"
            image="/assets/images/logo-dewarangga.png"
            alt="login img"
          />
        </Box>
        <Box
          sx={{
            overflow: 'auto',
            bgcolor: Color.THEME_COLOR,
            height: '100%',
            color: Color.GRAY_COLOR,
          }}
        >
          <ListItemButton
            component={Link}
            to="/dashboard"
            sx={
              nomormenu === '0'
                ? {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    bgcolor: Color.WHITE_COLOR,
                  }
                : {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }
            }
            onClick={() => handleClick('0')}
          >
            <IconButton
              sx={{
                // width: 24,
                // height: 24,
                ml: 3,
              }}
            >
              <i
                class="ri-dashboard-3-fill"
                style={
                  nomormenu === '0'
                    ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                    : { fontSize: 15, color: Color.GRAY_COLOR }
                }
              ></i>
            </IconButton>
            <Typography
              sx={
                nomormenu === '0'
                  ? {
                      fontFamily: 'Ubuntu',
                      ml: 2,
                      fontWeight: 'bold',
                      color: Color.SUBTHEME_COLOR,
                    }
                  : {
                      fontFamily: 'Ubuntu',
                      ml: 2,
                      fontWeight: 'bold',
                    }
              }
            >
              Dashboard
            </Typography>
          </ListItemButton>

          {nomormenu === '0' ? (
            <>
              <ListItemButton
                component={Link}
                to="/master-data/userrole"
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('1')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-folder-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Master Data
                </Typography>
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/customer/profilecustomer"
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('2')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-group-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Customer
                </Typography>
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/finance"
                sx={
                  nomormenu === '3'
                    ? {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        bgcolor: Color.WHITE_COLOR,
                      }
                    : {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }
                }
                onClick={() => handleClick('3')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-line-chart-fill"
                    style={
                      nomormenu === '3'
                        ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                        : { fontSize: 15, color: Color.GRAY_COLOR }
                    }
                  ></i>
                </IconButton>
                <Typography
                  sx={
                    nomormenu === '3'
                      ? {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                        }
                  }
                >
                  Finance
                </Typography>
              </ListItemButton>
            </>
          ) : nomormenu === '1' ? (
            <>
              <List>
                {masterDataItems.map((item, index) => (
                  <AppMenuItem {...item} key={index} />
                ))}
              </List>
              <ListItemButton
                component={Link}
                to="/customer/profilecustomer"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('2')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-group-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Customer
                </Typography>
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/finance"
                sx={
                  nomormenu === '3'
                    ? {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        bgcolor: Color.WHITE_COLOR,
                      }
                    : {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }
                }
                onClick={() => handleClick('3')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-line-chart-fill"
                    style={
                      nomormenu === '3'
                        ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                        : { fontSize: 15, color: Color.GRAY_COLOR }
                    }
                  ></i>
                </IconButton>
                <Typography
                  sx={
                    nomormenu === '3'
                      ? {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                        }
                  }
                >
                  Finance
                </Typography>
              </ListItemButton>
            </>
          ) : nomormenu === '2' ? (
            <>
              <ListItemButton
                component={Link}
                to="/master-data/userrole"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('1')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-folder-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Master Data
                </Typography>
              </ListItemButton>
              <List>
                {customerItems.map((item, index) => (
                  <AppMenuItem {...item} key={index} />
                ))}
              </List>
              <ListItemButton
                component={Link}
                to="/finance"
                sx={
                  nomormenu === '3'
                    ? {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        bgcolor: Color.WHITE_COLOR,
                      }
                    : {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }
                }
                onClick={() => handleClick('3')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-line-chart-fill"
                    style={
                      nomormenu === '3'
                        ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                        : { fontSize: 15, color: Color.GRAY_COLOR }
                    }
                  ></i>
                </IconButton>
                <Typography
                  sx={
                    nomormenu === '3'
                      ? {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                        }
                  }
                >
                  Finance
                </Typography>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                component={Link}
                to="/master-data/userrole"
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('1')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-folder-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Master Data
                </Typography>
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/customer/profilecustomer"
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => handleClick('2')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-group-fill"
                    style={{ fontSize: 15, color: Color.GRAY_COLOR }}
                  ></i>
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: 'Ubuntu',
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Customer
                </Typography>
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/finance"
                sx={
                  nomormenu === '3'
                    ? {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        bgcolor: Color.WHITE_COLOR,
                      }
                    : {
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }
                }
                onClick={() => handleClick('3')}
              >
                <IconButton
                  sx={{
                    ml: 3,
                  }}
                >
                  <i
                    class="ri-line-chart-fill"
                    style={
                      nomormenu === '3'
                        ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                        : { fontSize: 15, color: Color.GRAY_COLOR }
                    }
                  ></i>
                </IconButton>
                <Typography
                  sx={
                    nomormenu === '3'
                      ? {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          fontFamily: 'Ubuntu',
                          ml: 2,
                          fontWeight: 'bold',
                        }
                  }
                >
                  Finance
                </Typography>
              </ListItemButton>
            </>
          )}

          {/* <List>
            {appMenuItems.map((item, index) => (
              <AppMenuItem {...item} key={index} />
            ))}
          </List> */}

          {/* <ListItemButton
            // component={Link}
            // to="/dashboard"
            sx={
              nomormenu === '0'
                ? {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    bgcolor: Color.WHITE_COLOR,
                  }
                : {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }
            }
            onClick={() => handleClick('1')}
            // onClick={() => setChoose('0')}
          >
            <IconButton
              sx={{
                // width: 24,
                // height: 24,
                ml: 3,
              }}
            >
              <i
                class="ri-dashboard-3-fill"
                style={
                  nomormenu === '0'
                    ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                    : { fontSize: 15 }
                }
              ></i>
            </IconButton>
            {nomormenu === '0' ? (
              <Typography
                sx={{
                  fontFamily: 'Ubuntu',
                  ml: 2,
                  fontWeight: 'bold',
                  color: Color.SUBTHEME_COLOR,
                }}
              >
                Dashboard2
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: 'Ubuntu',
                  ml: 2,
                  fontWeight: 'bold',
                }}
              >
                Dashboard2
              </Typography>
            )}
          </ListItemButton>

          <ListItemButton
            // component={Link}
            // to="/dashboard"
            sx={
              nomormenu === '0'
                ? {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    bgcolor: Color.WHITE_COLOR,
                  }
                : {
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }
            }
            onClick={() => handleClick('2')}
            // onClick={() => setChoose('0')}
          >
            <IconButton
              sx={{
                // width: 24,
                // height: 24,
                ml: 3,
              }}
            >
              <i
                class="ri-dashboard-3-fill"
                style={
                  nomormenu === '0'
                    ? { fontSize: 15, color: Color.SUBTHEME_COLOR }
                    : { fontSize: 15 }
                }
              ></i>
            </IconButton>
            {nomormenu === '0' ? (
              <Typography
                sx={{
                  fontFamily: 'Ubuntu',
                  ml: 2,
                  fontWeight: 'bold',
                  color: Color.SUBTHEME_COLOR,
                }}
              >
                Dashboard3
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: 'Ubuntu',
                  ml: 2,
                  fontWeight: 'bold',
                }}
              >
                Dashboard3
              </Typography>
            )}
          </ListItemButton> */}

          {/* <List>
            {nomormenu === '1'
              ? masterDataItems.map((item, index) => (
                  <AppMenuItem {...item} key={index} />
                ))
              : nomormenu === '2'
              ? customerItems.map((item, index) => (
                  <AppMenuItem {...item} key={index} />
                ))
              : null}
          </List> */}

          {/* <List>
            {customerItems.map((item, index) => (
              <AppMenuItem {...item} key={index} />
            ))}
          </List> */}
        </Box>
      </Drawer>

      <Main open={open}>
        {/* <DrawerHeader /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h4"
            color="initial"
            sx={{
              mb: 3,
              paddingLeft: 3,
              // width: 350,
              fontFamily: 'Ubuntu',
              // bgcolor: Color.RED_COLOR,
            }}
          >
            {props.title}
          </Typography>
          <Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                width: 1217,
                justifyContent: 'space-between',
                // bgcolor: Color.GREEN_COLOR,
                cursor: 'pointer',
              }}
              // onClick={handleOpenUserMenu}
            >
              {showsearch === true ? (
                <Search>
                  {/* <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper> */}
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              ) : (
                <Box />
              )}

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',

                  cursor: 'pointer',
                }}
              >
                <IconButton sx={{ mr: 1 }} onClick={() => handleSearchShow()}>
                  <SearchIcon />
                </IconButton>

                <IconButton sx={{ mr: 2 }}>
                  <i
                    class="ri-mail-fill"
                    // style={{ color: Color.WHITE_COLOR }}
                  ></i>
                </IconButton>
                <IconButton sx={{ p: 0 }}>
                  <Box
                    sx={{
                      borderLeft: 1,
                      borderLeftColor: Color.GRAY_COLOR,
                      mr: 1,
                    }}
                  >
                    <IconButton sx={{ ml: 2 }}>
                      <i
                        class="ri-user-fill"
                        // style={{ color: Color.GRAY_COLOR }}
                      ></i>
                    </IconButton>
                  </Box>
                </IconButton>
                <Typography sx={{ mx: 1, color: Color.BLACK2_COLOR }}>
                  {auth.user.first_name} {auth.user.last_name}
                </Typography>
                <IconButton onClick={handleOpenUserMenu}>
                  <KeyboardArrowDownIcon sx={{ color: Color.BLACK2_COLOR }} />
                </IconButton>
              </Box>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={setting.action}>
                  <i class={setting.icon} style={{ color: setting.color }} />
                  <Typography
                    textAlign="center"
                    sx={{
                      pl: 1,
                      pr: 5,
                      color: setting.color,
                      fontFamily: 'Ubuntu',
                    }}
                  >
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        {props.render}

        {/* <IconButton sx={{ mr: 1 }}>
          <SearchIcon />
        </IconButton>

        <IconButton sx={{ mr: 2 }}>
          <i
            class="ri-mail-fill"
            // style={{ color: Color.WHITE_COLOR }}
          ></i>
        </IconButton>
        <IconButton sx={{ p: 0 }}>
          <Box
            sx={{
              borderLeft: 1,
              borderLeftColor: Color.GRAY_COLOR,
              mr: 1,
            }}
          >
            <IconButton sx={{ ml: 2 }}>
              <i
                class="ri-user-fill"
                // style={{ color: Color.GRAY_COLOR }}
              ></i>
            </IconButton>
          </Box>
        </IconButton>
        <Typography sx={{ mx: 1, color: Color.BLACK2_COLOR }}>
          {auth.user.first_name} {auth.user.last_name}
        </Typography>
        <IconButton onClick={handleOpenUserMenu}>
          <KeyboardArrowDownIcon sx={{ color: Color.BLACK2_COLOR }} />
        </IconButton> */}
      </Main>
    </Box>
  );
}

export default DashboardTemplate;
