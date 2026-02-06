import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Popover,
} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import { USER_ROLE, getSourcePath } from "../../../core/Constant";
import { ImageListCard } from "./ImageCardList";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { PopUpMessageComponent } from "../../molecule";

const ForumMessageComponent = ({ item }) => {
  const [images, setImages] = useState([]);
  const [openAlertBox, setAlertBox] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRole, setUserRole] = useState(0);
  const [currentUserid, setCurrentUserId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);

  useEffect(() => {
    setUserRole(parseInt(localStorage.getItem("userType")));
    setCurrentUserId(parseInt(localStorage.getItem("userId")));
    setImages(_.get(item, "images", []));
    setUserId(item?.id);
  }, [item, userRole, currentUserid]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteReply = () => {
    if (userRole) {
      dispatch(Actions.forum.deleteStudentForumReply(item?.id, item?.forum_id));
      setConfirmDeleteMessage(false);
    } else {
      dispatch(Actions.forum.deleteAdminForumReply(item?.id, item?.forum_id));
      setConfirmDeleteMessage(false);
    }
    handleClose();
  };

  const onclickAttachment = (url) => {
    try {
      window.webkit.messageHandlers.openURL.postMessage(url);
    } catch {
      window.open(url);
    }
  };

  return (
    <>
      {item?.type === 1 ? (
        <Box className="forum-message-width" sx={{ width: "85%" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box>
              <Avatar
                alt={_.get(item, "user.last_name", "")}
                src={getSourcePath(_.get(item, "user.profile_image", ""))}
                sx={{ width: 30, height: 30 }}
              />
            </Box>
            <Box>
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#2D3945",
                    mt: 0.5,
                    p: 2,
                    borderRadius: 2,
                  }}
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
                      >{`${_.get(item, "user.first_name", "")}`}</span>
                    </Grid>
                    <Grid item>
                      {images?.length > 0 ? (
                        <>
                          <Box>
                            {images.map((item, index) => (
                              <Box key={index} sx={{ m: 1 }}>
                                <img
                                  onClick={() => onclickAttachment(getSourcePath(item))}
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
                                />

                                <div  onClick={() => onclickAttachment(getSourcePath(item))} className="view-doc">
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
                          fontSize: 13,
                          fontFamily: "Montserrat",
                          color: "#FFFFFF",
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {_.get(item, "reply", "")}
                      </span>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        justifyContent={"flex-end"}
                        alignItems={"center"}
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
                        <Grid item sx={{ paddingInlineStart: 1 }}>
                          {userRole == USER_ROLE.student ? (
                            <>
                              {item?.created_by == currentUserid ? (
                                <IconButton
                                  style={{ background: "#fff" }}
                                  aria-label="delete"
                                  onClick={() => {
                                    setConfirmDeleteMessage(true);
                                  }}
                                  size="small"
                                >
                                  <DeleteIcon
                                    sx={{ color: "#ff3323" }}
                                    fontSize="small"
                                  />
                                </IconButton>
                              ) : null}
                            </>
                          ) : (
                            <IconButton
                              style={{ background: "#fff" }}
                              aria-label="delete"
                              onClick={() => {
                                setConfirmDeleteMessage(true);
                              }}
                            >
                              <DeleteIcon
                                sx={{ color: "#ff3323" }}
                                fontSize="small"
                              />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          margin: 0,
                          padding: 0,
                          fontFamily: "Montserrat",
                          color: "#28B882",
                        }}
                      >{`${_.get(item, "user.first_name", "")}`}</span>

                      {images?.length > 0 ? (
                        <>
                          <Box>
                            {images.map((item, index) => (
                              <Box key={index} sx={{ m: 1 }}>
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
                                />
                              </Box>
                            ))}
                          </Box>
                        </>
                      ) : null}

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
                        {_.get(item, "reply", "")}
                      </span>
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
                    </div>

                    {userRole == USER_ROLE.student ? (
                      <>
                        {item?.created_by == currentUserid ? (
                          <IconButton
                            style={{ background: "#fff", marginLeft: "20px" }}
                            aria-label="delete"
                            onClick={() => {
                              setConfirmDeleteMessage(true);
                            }}
                          >
                            <DeleteIcon
                              sx={{ color: "#ff3323" }}
                              fontSize="small"
                            />
                          </IconButton>
                        ) : null}
                      </>
                    ) : (
                      <IconButton
                        style={{ background: "#fff", marginLeft: "20px" }}
                        aria-label="delete"
                        onClick={() => {
                          setConfirmDeleteMessage(true);
                        }}
                      >
                        <DeleteIcon
                          sx={{ color: "#ff3323" }}
                          fontSize="small"
                        />
                      </IconButton>
                    )}
                  </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="forum-message-width" sx={{ width: "85%" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                  margin: 0,
                  padding: 0,
                  fontFamily: "Montserrat",
                  color: "#9EAFBE",
                }}
              >{`${_.get(item, "user.first_name", "")}`}</p>
              <Avatar
                alt={_.get(item, "user.last_name", "")}
                src={getSourcePath(_.get(item, "user.profile_image", ""))}
                sx={{ width: 30, height: 30 }}
              />
            </Box>
            <Box>
              {images?.length > 0 ? <ImageListCard images={images} /> : null}
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderStyle: "solid",
                  borderWidth: 0.5,
                  borderColor: "#9EAFBE",
                  mt: 2.5,
                  p: 1.2,
                  borderTopRightRadius: 15,
                  borderEndStartRadius: 15,
                  borderBottomRightRadius: 15,
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                    fontFamily: "Montserrat",
                    color: "#4A6375",
                  }}
                >
                  {_.get(item, "reply", "")}
                </p>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mr: 1.5,
                  justifyContent: "flex-end",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                    fontFamily: "Montserrat",
                    color: "#9EAFBE",
                  }}
                >
                  08/01/2023
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 12,
                    margin: 0,
                    padding: 0,
                    fontFamily: "Montserrat",
                    color: "#9EAFBE",
                  }}
                >
                  10.00 AM
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
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
    </>
  );
};
export default ForumMessageComponent;
