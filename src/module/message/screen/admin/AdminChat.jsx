import React, { useEffect, useState, useCallback, useRef } from "react";
import SendMessageForm from "../../../../component/molecule/Forms/SendMessageForm";
import { Avatar, Box, Badge, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  MessageComponent,
} from "../../../../component/atom";
import CircleIcon from "@mui/icons-material/Circle";
import { useLocation, useNavigate } from "react-router";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import {
  IMAGE_URL,
  convertDateTime,
  getSourcePath,
} from "../../../../core/Constant";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { getText, setText } from "../../../../core/Constant";
import moment from "moment";
import MessageTop from "../../../../component/atom/Message/MessageTop";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";

const AdminChatScreen = ({
  getChatRoomData,
  messageList,
  recipent,
  sendMessage,
  verifyToken,
}) => {
  const location = useLocation();
  const [messages, setMessage] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [imgList, setImgList] = useState([]);
  const [imgValid, setImgValid] = useState(false);

  const [text, setmText] = useState("");
  const [isMessageValid, setIsMessageValid] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const list = _.map(acceptedFiles, (file) => {
        const imgUrl = URL.createObjectURL(file);
        return {
          file,
          imgUrl,
        };
      });
      const newList = [...imgList, ...list];
      if (newList.length < 5) {
        setImgList(newList);
        setImgValid(true);
      } else {
        setImgValid(false);
      }
    },
    [imgList]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
  });

  const onClean = () => {
    onMessage(setText(""));
    setImgList([]);
    setImgValid(false);
  };

  const onMessage = (e) => {
    const text = getText(e);
    setmText(text);
    setIsMessageValid(text.length > 0);
  };

  const onSend = () => {
    const fd = new FormData();
    fd.append("message", text);
    fd.append("to_user", user.id);

    for (const data of imgList) {
      const image = data.file;
      fd.append("attachment[]", image);
    }

    sendMessage(fd);
    onClean();
  };

  useEffect(() => {
    setUser(recipent);
  }, [recipent]);

  useEffect(() => {
    const list = _(messageList)
      .map((i, id) => {
        const date = moment(new Date(_.get(i, "created_at", ""))).format(
          "YYYY-MM-DD"
        );
        const timeStamp = new Date(
          moment(new Date(_.get(i, "created_at", "")))
        ).getTime();
        return { ...i, date, time: timeStamp };
      })
      .sortBy((i) => i.time)
      .groupBy((i) => i.date)
      .values()
      .value();
    setMessage(list);
  }, [messageList]);

  useEffect(() => {
    const userId = location?.state?.user_id;
    getChatRoomData(userId);
  }, [location]);

  return (
    <Box {...getRootProps()} className="main-screen-container">
      <Box>
        <HeadingComponent
          text={"Message"}
          fontweigth={600}
          size={30}
          fontfamily={"Montserrat"}
          backNavigation={true}
        />
      </Box>
      <Box  mt={3}>
        <Box className="forum-wrap" mt={3}>
          <MessageTop user={user} />
          <Box className="forum-body" >
            <Box
              sx={{
                overflow: "auto",
                maxHeight: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {messages?.map((i, id) => {
                return (
                  <div key={`admin_message_List_GROUP_${id}`}>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", p:0.5 }}
                    >
                      <span
                        style={{
                          fontWeight: 500,
                          margin: 0,
                          padding: 0,
                          fontSize:13,
                          fontFamily: "Montserrat",
                          color: "#9EAFBE",
                        }}
                      >
                        {i[0]?.date}
                      </span>
                    </Box>
                    {i.map((item, index) => {
                      return (
                        <Box key={index + "admin_message"}>
                          {item?.role == "student" ? (
                            <Box
                              
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                paddingInlineStart:1
                              }}
                            >
                              <Box>
                                <MessageComponent item={item} type={1} />
                              </Box>
                            </Box>
                          ) : (
                            <Box
                             
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box>
                                <MessageComponent item={item} type={2} />
                              </Box>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </div>
                );
              })}
            </Box>

            <Box sx={{ backgroundColor: "fff", marginTop: "auto" }}>
              <Box p={1}>
                <Grid spacing={1} container>
                  {imgList.map((item, index) => {
                    return (
                      <Grid key={`forum-upload-list_${index}`} item xs={2}>
                        <Badge
                          onClick={() => {
                            const newList = _.filter(
                              imgList,
                              (item, id) => id != index
                            );
                            setImgList(newList);
                            setImgValid(newList.length > 0);
                          }}
                          badgeContent={"X"}
                          color="primary"
                        >
                          <img
                            className="squareImg forumAvatar"
                            src={item?.imgUrl}
                            alt={`upload-forum-img`}
                          />
                        </Badge>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <SendMessageForm
                value={text}
                onSend={onSend}
                isValid={imgValid || isMessageValid}
                onchange={onMessage}
                onPress={open}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <input {...getInputProps()} style={{ display: "none" }} type={"file"} />
    </Box>
  );
};
export default connect(
  (state) => ({
    messageList: state.message.get("messageList"),
    recipent: state.message.get("recipent"),
  }),
  {
    getChatRoomData: Actions.message.getChatRoomData,
    sendMessage: Actions.message.sendMessage,
    verifyToken: Actions.auth.verifyToken,
  }
)(AdminChatScreen);
