import React from 'react';
import { styled } from '@mui/material/styles';
import Color from '../../variable/Color';
import GroupIcon from '@mui/icons-material/Group';
import {
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  CardMedia,
} from '@mui/material';
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

function AllService() {
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
    <Box sx={{ py: 3, px: 5 }}>
      <Paper
        elevation={1}
        sx={{
          py: 2,
          px: 5,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          image="/assets/images/banner-service.png"
          sx={{ width: 300 }}
        />
        <Box
          sx={{
            borderRight: 1,
            borderRightColor: Color.DUST_COLOR,
            px: 4,
            py: 2,
          }}
        >
          <Typography sx={{ fontSize: 30 }}>Halo,</Typography>
          <Typography sx={{ fontSize: 30 }}>Mila Jesica</Typography>
        </Box>
        <Box
          sx={{
            borderRight: 1,
            borderRightColor: Color.DUST_COLOR,
            px: 4,
            py: 2,
          }}
        >
          <Typography>Saat ini Anda masih tergabung dengan Paket</Typography>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
            Package 1
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            untuk
            <Typography sx={{ fontSize: 30, fontWeight: 'bold', mx: 0.5 }}>
              100 Employee
            </Typography>
            selama
            <Typography sx={{ fontSize: 30, fontWeight: 'bold', ml: 0.5 }}>
              12 Month
            </Typography>
          </Typography>
        </Box>
        <Link to="/all-service/upgrade" style={{ textDecoration: 'none' }}>
          <Button
            sx={{
              borderRadius: 10,
              bgcolor: Color.GOLD_COLOR,
              ml: 3,
              textTransform: 'capitalize',
              fontSize: 30,
              px: 10,
              py: 1,
              color: Color.WHITE_COLOR,
            }}
          >
            Upgrade
          </Button>
        </Link>
      </Paper>
      <Typography sx={{ mt: 7, fontFamily: 'Ubuntu', fontSize: 28, mb: 3 }}>
        All Aplication
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={1.2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <a
              href="https://cms.betterjob.id/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Paper sx={{ px: 1, py: 3.5 }}>
                <CardMedia
                  component="img"
                  image="/assets/images/smol-betterjob.png"
                />
              </Paper>
            </a>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterJob
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterPay
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          <Box
            sx={{
              bgcolor: Color.BLACK_COLOR,
              position: 'absolute',
              opacity: 0.5,
              px: 4.5,
              py: 6.5,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: Color.WHITE_COLOR }}>On Going</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper sx={{ px: 2, py: 2.5 }}>
              <CardMedia component="img" image="/assets/images/error.png" />
            </Paper>
            <Typography sx={{ fontFamily: 'Ubuntu', mt: 2 }}>
              BetterCount
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllService;
