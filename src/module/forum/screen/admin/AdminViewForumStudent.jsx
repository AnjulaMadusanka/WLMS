import React, { useEffect, useState, useRef } from "react";
import SendMessageForm from "../../../../component/molecule/Forms/SendMessageForm";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  ForumMessageComponent,
  SearchBarComponent,
} from "../../../../component/atom";
import PeopleIcon from "@mui/icons-material/People";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { IMAGE_URL, usePagination } from "../../../../core/Constant";
import { PopUpMessageComponent } from "../../../../component/molecule";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";

const AdminViewForumStudentScreen = ({
  participants,
  getParticipants,
  deleteAdminForumParticipent,
  verifyToken,
}) => {
  const location = useLocation();
  const [participantList, setParticipantList] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [allData, setAllData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedStuId, setselectedStuId] = useState(0);

  const [page, setPage] = useState(1);
  const perPage = 10;
  const [count, setCount] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  let forumDetails = location?.state?.selected_forum;
  let data = usePagination(filteredParticipants, perPage, searchValue);

  useEffect(() => {
    localStorage.setItem("forumId", forumDetails?.id);
    setAllData(participants[0]);
    setCount(Math.ceil(participants[0]?.forum_participants?.length / perPage));
    setParticipantList(participants[0]?.forum_participants);
    setFilteredParticipants(participants[0]?.forum_participants);
  }, [participants, selectedStuId]);

  useEffect(() => {
    getParticipants(forumDetails?.id);
  }, []);

  const searchInput = (value) => {
    setSearchValue(value);
    const filteredData = participantList?.filter((record) =>
      record?.user_name?.toLowerCase().includes(value?.toLowerCase())
    );
    setFilteredParticipants(filteredData);
  };

  const deleteStudent = () => {
    deleteAdminForumParticipent(selectedStuId);
    setAlertOpen(false);
  };

  const handleChange = (e, p) => {
    setPage(p);
    data?.jump(p);
  };

  return (
    <Box className="main-screen-container">
      <Grid container flexDirection={'column'}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <HeadingComponent
            text={"Forum"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
            backNavigation={true}
          />
        </Grid>
        <Grid item>
              <SearchBarComponent
                value={searchValue}
                onchange={(e) => searchInput(e.target.value)}
              />
            </Grid>
        </Grid>
       
        {/* <Grid item>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <TextButtonComponet
                onButtonClick={() => navigate(-1)}
                text={"Back"}
                classStyle="btn btn-secondary"
              />
            </Grid>
           
          </Grid>
        </Grid> */}
        <Grid item>
          <Box className="forum-wrap">
            <Box className="forum-top-wrap">
              <Box sx={{ width: "fit-content" }}>
                <img
                  src={IMAGE_URL + allData?.image}
                  alt="forum-img"
                  style={{
                    objectFit: "cover",
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                  }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    fontFamily: "Montserrat, sans serif",
                    color: "#4A6375",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {allData?.name}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                    fontFamily: "Montserrat, sans serif",
                    color: "#4A6375",
                  }}
                >
                  {allData?.description}
                </p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <PeopleIcon sx={{ color: "#4A6375", fontSize: 25 }} />
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    fontFamily: "Montserrat, sans serif",
                    color: "#4A6375",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {allData?.forum_participants?.length
                    .toString()
                    .padStart(2, "0")}
                </p>
              </Box>
            </Box>
            <Box className="forum-body">
              <Box
                sx={{
                  overflow: "auto",
                  maxHeight: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {data?.currentData()?.map((stu, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#fff",
                      borderStyle: "solid",
                      borderWidth: 0.5,
                      borderColor: "#9EAFBE",
                      borderRadius: 5,
                      p: 2,
                      m: 2,
                    }}
                    key={index}
                  >
                    <Box>
                      <p
                        style={{
                          fontWeight: 700,
                          margin: 0,
                          padding: 0,
                          fontSize: 20,
                          fontFamily: "Montserrat",
                          color: "#4A6375",
                        }}
                      >
                        {stu?.user_name}
                      </p>
                    </Box>
                    <Box sx={{ width: "max-content" }}>
                      <TextButtonComponet
                        text={"Remove"}
                        classStyle="btn btn-delete btn-delete.focus"
                        onButtonClick={() => {
                          setAlertOpen(true);
                          setselectedStuId(stu?.id);
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
              <Stack spacing={2}>
                <Pagination count={count} page={page} onChange={handleChange} />
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
      

      <PopUpMessageComponent
        open={alertOpen}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete Student?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        altonclick={() => setAlertOpen(false)}
        onclick={deleteStudent}
        onclose={() => setAlertOpen(false)}
      />
    </Box>
  );
};
export default connect(
  (state) => ({
    participants: state.forum.get("fetchForumParticipentsList"),
  }),
  {
    getParticipants: Actions.forum.getAdminForumParticipents,
    deleteAdminForumParticipent: Actions.forum.deleteAdminForumParticipent,
    verifyToken: Actions.auth.verifyToken,
  }
)(AdminViewForumStudentScreen);
