import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
} from '@mui/material';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Color from '../../variable/Color';
import { menuAtom, openAtom, selectAtom } from '../../store/Recoil';

const menuSelector = selector({
  key: 'menu-selector',
  get: ({ get }) => {
    const menu = get(menuAtom);
    return menu;
  },
});

const selectSelector = selector({
  key: 'select-selector',
  get: ({ get }) => {
    const selected = get(selectAtom);
    return selected;
  },
});

function AppMenuItem(props) {
  const nomormenu = useRecoilValue(menuSelector);
  const selectedItem = useRecoilValue(selectSelector);
  // const openMenu = useRecoilValue(openSelector);
  // console.log(nomormenu);
  const { name, link, Icon, items, selectID } = props;
  const isExpandable = items && items.length > 0;
  // const [open, setOpen] = useState(false);
  const [open, setOpen] = useRecoilState(openAtom);
  const [isselect, setIsSelect] = useState('');
  const [select, setSelect] = useRecoilState(selectAtom);
  const [menu, setMenu] = useRecoilState(menuAtom);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = (choose) => {
    setOpen(!open);
    setMenu(choose);
    // setIsSelect('1');
    setSelect('1');
  };

  const MenuItemRoot = () => {
    return (
      <ListItemButton
        component={Link}
        to={`${!link ? '#' : link}`}
        onClick={() => handleClick2(selectID)}
      >
        {!!Icon && (
          <IconButton
            sx={{ display: 'flex', alignItems: 'center', ml: 3 }}
            onClick={handleClick}
          >
            <i
              class={Icon}
              style={{ fontSize: 15, color: Color.GRAY_COLOR }}
            ></i>
          </IconButton>
        )}
        <ListItemText inset={!Icon}>
          <Typography
            sx={{
              fontFamily: 'Ubuntu',
              ml: 2,
              fontWeight: 'bold',
              color: Color.GRAY_COLOR,
            }}
          >
            {name}
          </Typography>
        </ListItemText>
        {/* {isExpandable && !open && (
          <IconButton onClick={handleClick}>
            <ChevronLeftIcon sx={{ color: Color.GRAY_COLOR }} />
          </IconButton>
        )}
        {isExpandable && open && (
          <IconButton onClick={handleClick}>
            <ExpandMore sx={{ color: Color.GRAY_COLOR }} />
          </IconButton>
        )} */}
      </ListItemButton>
    );
  };

  const MenuItemChildren = () => {
    const handleThis = (number) => {
      setIsSelect(number);
      // setSelect(numberSelected);
    };

    return isExpandable ? (
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* <Divider /> */}
        {/* <List component="div" disablePadding>
          {items.map((item, index) => (
            <AppMenuItem {...item} key={index} />
          ))}
        </List> */}
        <Box sx={{ bgcolor: Color.WHITE_COLOR }}>
          {nomormenu === '1' ? (
            <>
              <ListItemButton
                // onClick={() => handleThis('1')}
                onClick={() => setSelect('1')}
                component={Link}
                to={items[0].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    // isselect === '1'
                    selectedItem === '1'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[0].name}
                </Typography>
              </ListItemButton>
              <ListItemButton
                onClick={() => setSelect('2')}
                component={Link}
                to={items[1].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    selectedItem === '2'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[1].name}
                </Typography>
              </ListItemButton>
              <ListItemButton
                onClick={() => setSelect('3')}
                component={Link}
                to={items[2].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    selectedItem === '3'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[2].name}
                </Typography>
              </ListItemButton>
              <ListItemButton
                onClick={() => setSelect('4')}
                component={Link}
                to={items[3].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    selectedItem === '4'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[3].name}
                </Typography>
              </ListItemButton>
              <ListItemButton
                onClick={() => setSelect('5')}
                component={Link}
                to={items[4].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    selectedItem === '5'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[4].name}
                </Typography>
              </ListItemButton>
            </>
          ) : nomormenu === '2' ? (
            <>
              <ListItemButton
                // onClick={() => handleThis('1')}
                onClick={() => setSelect('1')}
                component={Link}
                to={items[0].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    // isselect === '1'
                    selectedItem === '1'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[0].name}
                </Typography>
              </ListItemButton>
              <ListItemButton
                onClick={() => setSelect('2')}
                component={Link}
                to={items[1].link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                }}
              >
                <Typography
                  sx={
                    selectedItem === '2'
                      ? {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                          color: Color.SUBTHEME_COLOR,
                        }
                      : {
                          paddingLeft: 7,
                          fontFamily: 'Ubuntu',
                          fontWeight: 'bold',
                        }
                  }
                >
                  {items[1].name}
                </Typography>
              </ListItemButton>
            </>
          ) : (
            <List component="div" disablePadding>
              {items.map((item, index) => (
                <AppMenuItem {...item} key={index} />
              ))}
            </List>
          )}
        </Box>
      </Collapse>
    ) : null;
  };

  return (
    <Fragment>
      <MenuItemRoot />
      <MenuItemChildren />
    </Fragment>
  );
}

export default AppMenuItem;
