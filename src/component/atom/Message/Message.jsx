import React, { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { ImageListCard } from "../ForumMessage/ImageCardList";
import { useEffect } from "react";
import {
  IMAGE_URL,
  USER_ROLE,
  getFileType,
  getSourcePath,
  onToast,
} from "../../../core/Constant";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { PopUpMessageComponent } from "../../molecule";
import { useLocation, useNavigate } from "react-router";
import DocumentViewerComponent from "../DocumentViewer/DocumentViewer";
import "../../../assets/styles/components/MessageComponent.scss";
import DialogFullScreen from "../Dialog/DialogFullScreen";

const MessageComponent = ({ type, item }) => {
  const [images, setImages] = useState([]);
  const [userRole, setUserRole] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(0);
  const dispatch = useDispatch();
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);
  const location = useLocation();
  const [openFile, setOpenFile] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState("");

  useEffect(() => {
    setImages(_.get(item, "attachment", []));
    setUserRole(parseInt(localStorage.getItem("userType")));
    setCurrentUserId(parseInt(localStorage.getItem("userId")));
    console.log("itemss: ", item);
  }, [item, currentUserId, userRole]);

  const deleteReply = () => {
    const userId = location?.state?.user_id;
    dispatch(
      Actions.message.deleteMessage(
        item?.id,
        userRole == USER_ROLE.student ? currentUserId : userId
      )
    );
    setConfirmDeleteMessage(false);
  };

  const onclickAttachment = (fileLink) => {
    const url = IMAGE_URL + fileLink;
    const fileType = getFileType(fileLink);

    if (!isImage(fileType) && fileType !== "pdf") {
      onToast("Success Notification", {
        message: "File Downloaded Successfully",
        status_code: 1,
      });
    }
    try {
      window.webkit.messageHandlers.openURL.postMessage(url);
    } catch {
      window.open(url);
    }
  };

  const isImage = (type) => {
   const fileType= type.split('.')[1]; 
    if (
      fileType == "jpg" ||
      fileType == "png" ||
      fileType == "svg" ||
      fileType == "bmp" ||
      fileType == "jpeg" ||
      fileType == "heic"
    ) {
      return true;
    } else {
      return false;
    }
  };


  return (
    <>
      {type === 1 ? (
        <Box>
          <Box
            sx={{ backgroundColor: "#2D3945", mt: 0.5, p: 1, borderRadius: 2 }}
          >
            <Grid container flexDirection={"column"}>
              <Grid item>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                    fontFamily: "Montserrat",
                    color: "#28B882",
                  }}
                >{`${_.get(item, "creator", "")}`}</span>
              </Grid>
              {}
              <Grid item>
                {images?.length > 0 ? (
                  <>
                    <Box>
                      {images.map((item, index) => {
                        return (
                          <Box key={index} sx={{ m: 1 }}>
                                {isImage(item) ? (
                            <img
                              src={`${getSourcePath(item)}`}
                              srcSet={`${getSourcePath(item)}`}
                              alt={`index`}
                              loading="lazy"
                              style={{
                                objectFit: "contain",
                                maxHeight: 200,
                                borderRadius: 15,
                                height: "auto",
                              }}
                            />):null}
                             <div
                            className="view-doc"
                            key={index + 1}
                            onClick={() => {
                              onclickAttachment(item);
                            }}
                          >
                            <p>
                              {item?.substring(
                                item?.lastIndexOf("/") + 1,
                                item?.length
                              )}
                            </p>
                          </div>
                          </Box>
                        );
                      })}
                    </Box>

                    
                  </>
                ) : null}
              </Grid>
              <Grid item>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 13,
                    fontFamily: "Montserrat",
                    color: "#FFFFFF",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {_.get(item, "message", "")}
                </span>
              </Grid>
              <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0,
                    mr: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      margin: 0,
                      padding: 0,
                      fontFamily: "Montserrat",
                      color: "#9EAFBE",
                    }}
                  >
                    {moment(
                      new Date(_.get(item, "created_at", new Date()))
                    ).format("DD/MM/YYYY hh:mm:A")}
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "#fff",
              mt: 0.5,
              width: "fit-content",
              p: 1,
              borderRadius: 2,
              borderStyle: "solid",
              borderWidth: 0.5,
              borderColor: "#9EAFBE",
            }}
          >
            <Grid container flexDirection={"column"}>
              <Grid item>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    margin: 0,
                    padding: 0,
                    fontFamily: "Montserrat",
                    color: "#28B882",
                  }}
                >{`${_.get(item, "creator", "")}`}</span>
              </Grid>
              <Grid item>
                {images?.length > 0 ? (
                  <>
                    <Box>
                      {images?.map((item, index) => (
                        <Box key={index} sx={{ m: 1 }}>
                          {isImage(item) ? (
                            <img
                              src={`${getSourcePath(item)}`}
                              srcSet={`${getSourcePath(item)}`}
                              alt={`index`}
                              loading="lazy"
                              style={{
                                objectFit: "contain",
                                maxHeight: 200,
                                borderRadius: 15,
                                height: "auto",
                                margin: "5px",
                              }}
                            />
                          ) : null}

                          <div
                            className="view-doc"
                            key={index + 1}
                            onClick={() => {
                              onclickAttachment(item);
                            }}
                          >
                            <p>
                              {item?.substring(
                                item?.lastIndexOf("/") + 1,
                                item?.length
                              )}
                            </p>
                          </div>
                        </Box>
                      ))}
                    </Box>
                  </>
                ) : null}
              </Grid>

              <Grid item>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 12,
                    fontFamily: "Montserrat",
                    color: "#4A6375",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {_.get(item, "message", "")}
                </span>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <Grid item>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 12,
                        margin: 0,
                        padding: 0,
                        fontFamily: "Montserrat",
                        color: "#9EAFBE",
                      }}
                    >
                      {moment(
                        new Date(_.get(item, "created_at", new Date()))
                      ).format("DD/MM/YYYY hh:mm:A")}
                    </span>
                  </Grid>
                  <Grid item>
                    <IconButton
                      style={{ background: "#fff", marginLeft: "20px" }}
                      aria-label="delete"
                      onClick={() => {
                        setConfirmDeleteMessage(true);
                      }}
                    >
                      <DeleteIcon sx={{ color: "#ff3323" }} fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <PopUpMessageComponent
        open={confirmDeleteMessage}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want to delete this message?"}
        btntext={"Yes, delete"}
        onclick={() => deleteReply(_.get(item, "id", ""))}
        altbtntext={"No"}
        altonclick={() => setConfirmDeleteMessage(false)}
        onclose={() => setConfirmDeleteMessage(false)}
      />

      <DialogFullScreen
        open={openFile}
        title={selectedFileName}
        data={selectedFilePath}
        onClose={() => setOpenFile(false)}
      />
    </>
  );
};
export default MessageComponent;
