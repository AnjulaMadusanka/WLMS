import React, { useEffect, useState } from "react";
import {
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../component/atom";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import TableComponent from "../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../component/atom/Dialog/Dialog";
import {
  ExpandableViewSubject,
  PopUpMessageComponent,
  ViewPromoByAmount,
} from "../../../component/molecule";
import { faTags, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AdminSubjectCreate, AdminSubjectEdit } from "../../../component/molecule/Forms";
import _ from "lodash";

const SubjectMainScreen = ({ getSubjectList, subjectList,deleteSubject }) => {


const sampleData = [
  {
    mainSubject: 'General Dentistry',
    subSubjects: ['Oral Anatomy', 'Dental Materials', 'Operative Dentistry'],
  },
  {
    mainSubject: 'Specialized Dentistry',
    subSubjects: ['Orthodontics', 'Periodontics', 'Endodontics'],
  },
];

   const  [open,setOpen] = useState(false)
   const [subjectData, setSubjectData] = useState()
   const [newSubjectData, setNewSubjectData] = useState([])
   const [subjectDetails, setSubjectDetails] = useState({})
   const [edit, setEdit] = useState(false)
   const [isdeleteSubject, setIsDeleteSubject] = useState(false);
   const [selectedSubject, setSelectedSubject] = useState("");
   const handleEdit = (item) => {
    const subject = _.find(subjectList, { id: item.id });
    setSubjectDetails(subject)
    setEdit(true)
    // alert(`Edit clicked for: ${item.name}`);
  };

  // const handleDelete = (item) => {
  //   alert(`Delete clicked for: ${item.name}`);
  // };

  const transformSubjects = (data) => {
    const mainSubjects = data.filter(item => item.parent_subject_id === null);
    const subSubjects = data.filter(item => item.parent_subject_id !== null);
    const newSubjectData = mainSubjects?.map(mainSubject => {
        return {
            id: mainSubject.id,
            name: mainSubject.name,
            sub_subjects: subSubjects
                .filter(sub => sub.parent_subject_id === mainSubject.id)
                .map(sub => ({
                    id: sub.id,
                    name: sub.name
                }))
        };
    });
    return newSubjectData;
}

  useEffect(() => {
    getSubjectList();
  }, []);

  useEffect(() => {
    setSubjectData(subjectList)
    const sampleData = transformSubjects(subjectList);
     console.log(sampleData)
    setNewSubjectData(sampleData)
  }, [subjectList]);

  const onDeleteSubject = () => {
    setIsDeleteSubject(false)
    // setSelectedQuiz('');
    deleteSubject(selectedSubject)
    onDeleteClose();
  };

  const onDeleteClose = () => {
    setIsDeleteSubject(false);
    setSelectedSubject("");
  };

  const handleDelete = (item) => {
    setSelectedSubject(item.id)
    setIsDeleteSubject(true)
  };




  return (
    <>
      <Box className="main-screen-container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Grid item>
            <HeadingComponent
              text={"Subject"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              btnText={"Add Subject"}
            //  icon={faTags}
             onclick={() => setOpen(true)}
            />
          </Grid>
        </Grid>

      </Box>
      <Box className="common-admin-content-wrap">

      <ExpandableViewSubject data={newSubjectData} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
      <DialogComponent
        isShowCloseButton={true}
        title={"Add Subject"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AdminSubjectCreate onClose={() => setOpen(false)} />
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Subject"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        <AdminSubjectEdit subjectDetials={subjectDetails} onClose={() => setEdit(false)} />
      </DialogComponent>
      <PopUpMessageComponent
        open={isdeleteSubject}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete Subject?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={onDeleteSubject}
        altonclick={onDeleteClose}
        onclose={onDeleteClose}
      />

    </>
  );
};

export default connect(
  (state) => ({
    promoDetails: state.promoCode.get("promoDetails"),
    subjectList: state.questions.get("subjectList"),
    // userStatus: state.users.get("userStatus"),
    // deleteUser: state.users.get("deleteUser"),
  }),
  {
    getSubjectList: Actions.questions.getSubjectList,
    updateStatus: Actions.promoCode.updatePromoStatus,
    deleteSubject: Actions.questions.deleteSubject,
    // deleteAdminUser: Actions.users.deleteAdminUser,
    // verifyToken: Actions.auth.verifyToken,
  }
)(SubjectMainScreen);
