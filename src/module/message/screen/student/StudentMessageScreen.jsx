import React, { useEffect, useState, useCallback, useRef } from "react";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import { useNavigate } from "react-router-dom";
import SendMessageForm from "../../../../component/molecule/Forms/SendMessageForm";
import { Avatar, Box, Grid, Badge } from "@mui/material";
import {
  IconButtonComponent,
  MessageComponent,
} from "../../../../component/atom";
import CircleIcon from "@mui/icons-material/Circle";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { getFileType, getText, setText } from "../../../../core/Constant";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import MessageTop from "../../../../component/atom/Message/MessageTop";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";

const StudentMessageScreen = ({
  getChatRoomData,
  messageList,
  sendMessage,
  recipent,
  verifyToken,
}) => {
  const navigate = useNavigate();

  const [imgList, setImgList] = useState([]);
  const [imgValid, setImgValid] = useState(false);
  const [user, setUser] = useState({});
  const [messsage, setMessage] = useState("");
  const [isMessageValid, setIsMessageValid] = useState(false);

  const [chatList, setChatList] = useState([]);
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

  useEffect(() => {
    const id = localStorage.getItem("userId");
    getChatRoomData(id);
  }, []);

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
    setChatList(list);
    console.log(list, "messages list");
    console.log("File Type: ", getFileType('..bb/./asd/someText.jpg'));
  }, [messageList]);

  useEffect(() => {
    setUser(recipent);
  }, [recipent]);

  const onMessage = (e) => {
    const text = getText(e);
    setMessage(text);
    setIsMessageValid(text.length > 0);
  };

  const onClean = () => {
    onMessage(setText(""));
    setImgList([]);
    setImgValid(false);
  };

  const onSend = () => {
    const fd = new FormData();
    fd.append("message", messsage);
    for (const data of imgList) {
      const image = data.file;
      fd.append("attachment[]", image);
    }

    sendMessage(fd);

    onClean();
  };

  return (
    <Box {...getRootProps()} className="main-screen-container">
      <Box mt={3}>
          <HeadingComponent
            text={"Message"}
            fontweigth={600}
            size={26}
            fontfamily={"Montserrat"}
          />
        </Box>
      <Box className="forum-wrap forum-student-align">
        <MessageTop user={user} />
        <Box className="forum-body" style={{ height: "calc(100vh - 250px)" }}>
          <Box
            sx={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", p: 1.8 }}>
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
                Today
              </span>
            </Box>

            {chatList.map((i, id) => {
             
              return (
                <div key={`student_message_List_GROUP_${id}`}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", p: 1.8 }}
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
                        new Date(_.get(i[0], "date", new Date()))
                      ).format("DD/MM/YYYY")}
                    </span>
                  </Box>
                  {i.map((item, index) => {
                    
                    return (
                      <Box key={index + "std_message"}>
                        {item?.role != "student" ? (
                          <Box
                            p={1}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Box>
                              <MessageComponent item={item} type={1} />
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            p={1}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
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
            {/* {chatList.map((item, index) => (
                        <Box key={index} >

                            {item.user == 1 ? <Box p={1} sx={{ display: "flex", justifyContent: "flex-start" }}>
                                <Box>
                                    <MessageComponent message={item.message} type={1} />
                                </Box>
                            </Box> : <Box p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Box>
                                    <MessageComponent message={item.message} type={2} />
                                </Box>
                            </Box>}
                        </Box>
                    ))} */}
          </Box>

          <Box sx={{ backgroundColor: "fff", marginTop: "auto" }}>
            <Box>
              <Grid spacing={1} container>
                {imgList.map((item, index) => {
                  return (
                    <Grid key={`forum-upload-list_${index}`} item xs={1}>
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
              value={messsage}
              onSend={onSend}
              isValid={imgValid || isMessageValid}
              onchange={onMessage}
              onPress={open}
            />
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
)(StudentMessageScreen);
