import React, { useEffect, useState } from "react";
// import { Box, Grid, styled } from "@mui/material";
import SidebarContainer from "../Sidebar/SidebarContainer";
// import HeaderContainer from "../Header/Header";
// import FooterContainer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { USER_ROLE } from "../../../core/Constant";
import LayoutStyle from "../../../assets/styles/layout/loggedLayoutStyle";
import { Actions } from "../../../core/modules/Actions";
import { useDispatch } from "react-redux";
import { NetwokIssueScreen } from "../../../module";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = ({ userRole }) => {
  const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    dispatch(Actions.common.getActiveFlag());
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(open ? false : true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ position: "relative", height: "100%", }}>
        <Box sx={{ position: "absolute", right: 15, top: 68, zIndex: 1300 }}>
          <div style={{ position: "fixed" }}>
            <IconButton
              onClick={handleDrawer}
              
              sx={{
                bgcolor: "#fff",
                ":hover": { bgcolor: "rgb(152, 52, 240);", color: "#fff" },
                width: 28,
                height: 28,
                boxShadow:'0 0px 0px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);'
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
        </Box>
        <SidebarContainer
          type={
            localStorage.getItem("userType") == USER_ROLE.admin
              ? "admin"
              : "student"
          }
          open={open}
          handleDrawer={handleDrawer}
        />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, pl: 3, pr: 3, pb: 2, pt: 0 }}>
        {isOnline ? <Outlet /> : <NetwokIssueScreen />}
      </Box>
    </Box>
  );
};

export default Layout;
