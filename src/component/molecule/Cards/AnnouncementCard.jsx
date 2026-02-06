import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DialogComponent,
  IconButtonComponent,
  VideoListView,
} from "../../atom";
import moment from "moment";
import _ from "lodash";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IMAGE_URL, USER_ROLE, onToast } from "../../../core/Constant";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import PopUpMessageComponent from "../PopupMessage/PopUpMessage";
import { AdminAnnouncemntUpdateForm } from "../Forms";

const AnnouncementCard = ({
  icon,
  onclick,
  size,
  item,
  copyLinkBtn = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onToast(
          "Link successfully copied to clipboard",
          { message: text, status_code: 1 },
          false
        );
      })
      .catch((err) => {
        onToast(
          "Link not copied to clipboard",
          { message: text, status_code: 0 },
          false
        );
      });
  },
}) => {
  const [userType, setUserType] = useState(0);
  const dispatch = useDispatch();
  const [confirmDelete, setConformDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [annoucementId, setAnnoucementIdId] = useState(0);
  useEffect(() => {
    setUserType(parseInt(localStorage.getItem("userType")));
  }, []);

  const deleteAnnouncement = () => {
    dispatch(Actions.announcement.deleteAnnouncementForAdmin(item?.id));
    setConformDelete(false);
  };
  return (
    <>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        rowGap={1}
      >
        <Grid item sm={12} md={2} lg={2} xl={2}>
          <Avatar
            alt="L"
            src={IMAGE_URL + item?.image}
            sx={{
              width: { sm: "100%", md: 130, lg: 130, xl: 130, xs: "100%" },
              height: { sm: 180, md: 130, lg: 130, xl: 130, xs: 180 },
              borderRadius: 4,
            }}
          />
        </Grid>

        <Grid item lg={8} xl={8} md={7} sm={12}>
          <Grid container sx={{ flexDirection: "column" }}>
            <Grid item>
              <p className="announcement-text">{_.get(item, "title", "")}</p>
            </Grid>
            <Grid item>
              <Box style={{ textAlign: "justify", textJustify: "inter-word" }}>
                <span className="announcement-subtext">
                  {_.get(item, "message", "")}
                </span>
              </Box>
            </Grid>
            <Grid item>
              <Grid container spacing={1} alignItems={"center"} mt={1}>
                <Grid item>
                  <Box>
                    <span className="announcement-studytext">Link</span>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className="announcement-link-text-wrap">
                    {item?.material_link ? (
                      <span
                        className="announcement-link"
                        title={_.get(item, "material_link", "")}
                      >
                        <a target="_blank" href={item?.material_link}>
                          {_.get(item, "material_link", "")}
                        </a>
                      </span>
                    ) : (
                      "Not available"
                    )}
                  </Box>
                </Grid>
                <Grid item>
                  {item?.material_link ? (
                    <IconButton
                      aria-label="ContentCopyIcon"
                      onClick={() =>
                        copyLinkBtn(_.get(item, "material_link", ""))
                      }
                      className="copy-icon"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          md={2}
          lg={2}
          xl={2}
          
          height={{ sm: "unset", md: "100%", lg: "100%", xl: "100%" }}
          sx={{ textAlign: "right" }}
        >
          <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={{ sm: "unset", md: "100%", lg: "100%", xl: "100%" }}
          >
            <Grid item width={'max-content'}>
              <span className="announcement-subtext-date">
                {moment(new Date(_.get(item, "updated_at", new Date()))).format(
                  "Do MMM YYYY"
                )}
              </span>
            </Grid>
            {userType == USER_ROLE.admin ? (
              <Grid item>
                <Grid container spacing={1} justifyContent={"flex-end"}>
                  <Grid item>
                    <IconButtonComponent
                      btnType={"editbtn"}
                      onclick={() => {
                        setEdit(true);
                        setAnnoucementIdId(item?.id);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButtonComponent
                      btnType={"deleteIconbtn"}
                      onclick={() => setConformDelete(true)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>

      <PopUpMessageComponent
        open={confirmDelete}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want to delete?"}
        btntext={"Yes, delete"}
        onclick={() => deleteAnnouncement()}
        altbtntext={"No"}
        altonclick={() => setConformDelete(false)}
        onclose={() => setConformDelete(false)}
      />

      <DialogComponent
        isShowCloseButton={true}
        title={"Update Announcement"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        <AdminAnnouncemntUpdateForm
          open={edit}
          onClose={() => setEdit(false)}
          item={item}
          id={annoucementId}
        />
      </DialogComponent>
    </>
  );
};

export default AnnouncementCard;
