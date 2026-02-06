import React, { useState, useEffect } from "react";
import _ from "lodash";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useLocation } from "react-router-dom";
import { adminScreens, studentScreens } from "./Routers";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { getSourcePath } from "../../../core/Constant";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IMAGES } from "../../../assets/Images";
import { Avatar, Stack } from "@mui/material";
import packageJson from "../../../../package.json";

const drawerWidth = 250;

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

const SidebarContainer = ({ window, type, open, handleDrawer }) => {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [clickReports, setReportClick] = React.useState(false);
  const location = useLocation();
  const [pathName, setPathName] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgPath, setImgPath] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeNestedIndex, setActiveNestedIndex] = useState(-1);

  const currentUser = useSelector((state) => state.profile.get("currentUser"));
  useEffect(() => {
    setImgPath(getSourcePath(_.get(currentUser, "profile_image", "")));
    setFName(_.get(currentUser, "first_name", ""));
    setLName(_.get(currentUser, "last_name", ""));
  }, [currentUser]);

  useEffect(() => {
    dispatch(Actions.profile.getUserData());
  }, []);

  const onLogOut = () => {
    navigate("/");
    dispatch(Actions.auth.logOut());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    setPathName(location?.pathname);
  }, [location]);

  const handleClickNav = (link, selectedIndex, nestedIndex = -1) => {
    if (nestedIndex === -1) {
      setIsActive(selectedIndex);
      setActiveIndex(selectedIndex);
      setActiveNestedIndex(-1); // Reset nested index when clicking top-level item
    } else {
      setActiveNestedIndex(nestedIndex);
    }
    navigate(link);
  };

  return (
    <Drawer variant="permanent" open={open} className="custom-scroll-sidebar">
      {/* Drawer content goes here */}
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        {!open ? (
          <Avatar
            alt={`${fName} ${lName}`}
            src={IMAGES.miniIconLogo}
            sx={{ width: 30, height: 30, borderRadius: 0 }}
          />
        ) : (
          <img
            src={IMAGES.winspertLandscapeLogo}
            style={{ objectFit: "contain", width: 175, height: 100 }}
            alt="sidebar-logo"
            className="sidebar-logo"
          />
        )}
      </Box>

      {/* User profile section */}
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Stack spacing={1}>
          {open && (
            <Box>
              <span className="sidebar-hellothere-text">Hello There</span>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: open ? 1 : 0,
            }}
          >
            <Avatar
              alt={`${fName} ${lName}`}
              src={imgPath}
              sx={{ width: 30, height: 30 }}
            />

            <Box sx={{ display: open ? "block" : "none", mr: 1 }}>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >{`${fName} ${lName}`}</span>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Divider */}
      <Divider />

      {/* Main navigation list */}
      <List>
        {type === "admin"
          ? adminScreens.map((text, index) => (
            <React.Fragment key={index}>
              {/* Top-level item */}
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handleClickNav(text.link, index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {isActive === index ? text.aicon : text.icon}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          opacity: open ? 1 : 0,
                          color: isActive === index ? "#9834F0" : "#778fa7",
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                        }}
                      >
                        {text.name}
                      </Typography>
                    }
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isActive === index ? "#9834F0" : "#778fa7",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>

                {/* Nested items under "Reports" */}
                {text.more && text.more.length > 0 && isActive === index && open && (
                  <List sx={{ paddingLeft: 3 }}>
                    {text.more.map((item, nestedIndex) => (
                      <ListItem key={nestedIndex} disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          onClick={() => handleClickNav(item.link, index, nestedIndex)}
                        >
                          {/* <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              {isActive === index && activeNestedIndex === nestedIndex ? text.aicon : text.icon}
                            </ListItemIcon> */}
                          <ListItemText
                            disableTypography
                            primary={
                              <Typography
                                sx={{
                                  opacity: open ? 1 : 0,
                                  color: isActive === index && activeNestedIndex === nestedIndex ? "#9834F0" : "#778fa7",
                                  fontFamily: "Montserrat",
                                  fontWeight: 500,
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            sx={{
                              opacity: open ? 1 : 0,
                              color: isActive === index && activeNestedIndex === nestedIndex ? "#9834F0" : "#778fa7",
                              fontFamily: "Montserrat",
                              fontWeight: 600,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </ListItem>
            </React.Fragment>
          ))
          : studentScreens.map((text, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => handleClickNav(text.link, index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {isActive === index ? text.aicon : text.icon}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          opacity: open ? 1 : 0,
                          color: isActive === index ? "#9834F0" : "#686D76",
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                        }}
                      >
                        {text.name}
                      </Typography>
                    }
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isActive === index ? "#9834F0" : "#686D76",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={onLogOut}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#E4003A",
              }}
            >
              <PowerSettingsNewIcon color="#E4003A" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#E4003A",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                >
                  Sign out
                </Typography>
              }
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={onLogOut}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    opacity: 1,
                    color: "#364e72",
                    fontFamily: "Montserrat",
                    fontWeight:'nrmal',
                  }}
                >
                 {(open ?'Version ' :'') + packageJson.version}
                </Typography>
              }
              sx={{ opacity: 1 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarContainer;
