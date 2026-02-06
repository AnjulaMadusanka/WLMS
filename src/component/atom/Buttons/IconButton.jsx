import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { IMAGES } from "../../../assets/Images";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const IconButtonComponent = ({
  onclick,
  btnType,
  btnText,
  btntitle,
  disabled,
  backgroundColor= "#B6BBC4"
}) => {
  return (
    <Box>
      {btnType === "backbtn" ? (
        <Button
          sx={{
            marginBottom: 2,
            fontWeight: 600,
            textTransform: "capitalize",
            backgroundColor: "none",
            color: "#2D3945",
            fontSize: 16,
            "&:hover": {
              color: "#4a6375",
              backgroundColor: "#fff !important",
              boxShadow: 2,
              borderRadius: "10px !important",
            },
            "&:active": { backgroundColor: "#fff !important" },
          }}
          onClick={onclick}
          startIcon={<ArrowBackIosIcon style={{ width: 16, height: 16 }} />}
        >
          {btnText}
        </Button>
      ) : null}
      {btnType === "addIconbtn" ? (
        <IconButton
          onClick={onclick}
          sx={{
            backgroundColor: "#9834F0",
            color: "#fff",
            "&:hover": { color: "#fff", backgroundColor: "#a169ff !important" },
            "&:active": { backgroundColor: "#9834F0 !important" },
          }}
          aria-label="add-button"
        >
          <AddIcon />
        </IconButton>
      ) : null}

      {btnType === "viewIconbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            backgroundColor: "#9834F0",
            color: "#fff",
            "&:hover": { color: "#fff", backgroundColor: "#a169ff !important" },
            "&:active": { backgroundColor: "#9834F0 !important" },
          }}
          aria-label="add-button"
          disabled={disabled}
        >
          <VisibilityIcon />
        </IconButton>
      ) : null}

      {btnType === "deleteIconbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            backgroundColor: "#D06060",
            color: "#fff",
            "&:hover": { color: "#fff", backgroundColor: "#D96E6E !important" },
            "&:active": { backgroundColor: "#AD4E4E !important" },
          }}
          aria-label="delete-button"
        >
          <DeleteIcon />
        </IconButton>
      ) : null}

      {btnType === "closeIconbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          aria-label="close-button"
        >
          <img
            src={IMAGES.close}
            alt="close"
            style={{
              objectFit: "cover",
              width: "24px",
              height: "24px",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#D96E6E !important",
              },
            }}
          />
        </IconButton>
      ) : null}

      {btnType === "attachFilebtn" ? (
        <IconButton
          type="file"
          title={btntitle}
          onClick={onclick}
          sx={{
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          aria-label="attach-file-button"
        >
          <AttachFileIcon />
        </IconButton>
      ) : null}

      {btnType === "sendbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            backgroundColor: "#28B882",
            color: "#fff",
            "&:hover": { color: "#fff", backgroundColor: "#5ECAA1 !important" },
            "&:active": { backgroundColor: "#239E70 !important" },
          }}
          aria-label="send-button"
        >
          <SendIcon />
        </IconButton>
      ) : null}

      {btnType === "infobtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          aria-label="info-button"
        >
          <InfoIcon />
        </IconButton>
      ) : null}

      {btnType === "editbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            backgroundColor: backgroundColor,
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          disabled={disabled}
          aria-label="edit-button"
        >
          <EditIcon />
        </IconButton>
      ) : null}

      {btnType === "uploadbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          aria-label="upload-button"
        >
          <UploadIcon />
        </IconButton>
      ) : null}
      {btnType === "contentbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          disabled={disabled}
          aria-label="upload-button"
        >
          <AssignmentIcon />
        </IconButton>
      ) : null}

      {btnType === "announcementBtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          sx={{
            color: "#4A6375",
            "&:hover": { color: "#4A6375" },
            "&:active": { color: "#4A6375" },
          }}
          aria-label="announcement-button"
        >
          <CampaignIcon />
        </IconButton>
      ) : null}

      {btnType === "admin-backbtn" ? (
        <IconButton
          title={btntitle}
          onClick={onclick}
          aria-label="admin-back-btn"
        >
          <ArrowBackIosNewIcon  fontSize="medium"/>
        </IconButton>
      ) : null}
    </Box>
  );
};

export default IconButtonComponent;
