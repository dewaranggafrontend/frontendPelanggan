import React from 'react';
import { styled } from '@mui/material/styles';
import Color from '../../variable/Color';
import GroupIcon from '@mui/icons-material/Group';
import { Button, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { menuAtom, openAtom, selectAtom } from '../../store/Recoil';
import { Link } from 'react-router-dom';

const Hilang = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  // [theme.breakpoints.up('lg')]: {},
}));

const Muncul = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const Item3 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 194,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  height: 600,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  height: 100,
  borderRadius: 5,
  boxShadow: 3,
  alignItems: 'center',
  display: 'flex',
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  // textAlign: 'center',
  height: 100,
  color: theme.palette.text.secondary,
  // boxShadow: 5,
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
}));

function Dashboard() {
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [select, setSelect] = useRecoilState(selectAtom);
  const theme = useTheme();
  const [open, setOpen] = useRecoilState(openAtom);

  const handleClick = (number, selectedNumber) => {
    setOpen(!open);
    setMenu(number);
    setSelect(selectedNumber);
  };

  return (
    <Box sx={{ pt: 3, pl: 5, pr: 130 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total User Admin</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <i
                class="ri-admin-fill"
                style={{ color: Color.ICON_COLOR, fontSize: 50 }}
              ></i>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                10 User
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>New Customer</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <i
                class="ri-user-add-fill"
                style={{ color: Color.ICON2_COLOR, fontSize: 50 }}
              ></i>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                5 Customer
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Customer</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <i
                class="ri-group-fill"
                style={{ color: Color.ICON3_COLOR, fontSize: 50 }}
              ></i>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                55 Customer
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Package</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <i
                class="ri-archive-fill"
                style={{ color: Color.ICON4_COLOR, fontSize: 50 }}
              ></i>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                5 Package
              </Typography>
            </Box>
          </Item>
        </Grid>
      </Grid>
      {/* <Grid container spacing={5}>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total User Admin</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>
              10 User
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <i
                class="ri-arrow-right-up-line"
                style={{ fontSize: 20, color: Color.GREEN_COLOR }}
              ></i>
              <Typography sx={{ color: Color.GREEN_COLOR, ml: 0.5 }}>
                20.33%
              </Typography>
              <Typography
                sx={{ color: Color.GRAY_COLOR, fontSize: 13, ml: 1.5 }}
              >
                from last week
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total Customer</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>
              55 Customer
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <i
                class="ri-arrow-right-up-line"
                style={{ fontSize: 20, color: Color.GREEN_COLOR }}
              ></i>
              <Typography sx={{ color: Color.GREEN_COLOR, ml: 0.5 }}>
                20.33%
              </Typography>
              <Typography
                sx={{ color: Color.GRAY_COLOR, fontSize: 13, ml: 1.5 }}
              >
                from last week
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>New Customer</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>
              5 Customer
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <i
                class="ri-arrow-left-down-line"
                style={{ fontSize: 20, color: Color.RED_COLOR }}
              ></i>
              <Typography sx={{ color: Color.RED_COLOR, ml: 0.5 }}>
                20.33%
              </Typography>
              <Typography
                sx={{ color: Color.GRAY_COLOR, fontSize: 13, ml: 1.5 }}
              >
                from last week
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>New Customer</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>
              5 Customer
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <i
                class="ri-arrow-left-down-line"
                style={{ fontSize: 20, color: Color.RED_COLOR }}
              ></i>
              <Typography sx={{ color: Color.RED_COLOR, ml: 0.5 }}>
                20.33%
              </Typography>
              <Typography
                sx={{ color: Color.GRAY_COLOR, fontSize: 13, ml: 1.5 }}
              >
                from last week
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Total User Admin</Typography>
              <Typography sx={{ color: Color.GRAY_COLOR, fontSize: 13 }}>
                12-12-2021
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 2 }}>
              10 User
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <i
                class="ri-arrow-right-up-line"
                style={{ fontSize: 20, color: Color.GREEN_COLOR }}
              ></i>
              <Typography sx={{ color: Color.GREEN_COLOR, ml: 0.5 }}>
                20.33%
              </Typography>
              <Typography
                sx={{ color: Color.GRAY_COLOR, fontSize: 13, ml: 1.5 }}
              >
                from last week
              </Typography>
            </Box>
          </Item>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default Dashboard;
