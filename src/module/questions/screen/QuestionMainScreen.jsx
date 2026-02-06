import React, { use, useEffect, useState } from "react";
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
  AdminQuestions,
  AdminQuestionView,
  ExpandableViewQuestion,
} from "../../../component/molecule";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import { getText } from "../../../core/Constant";
import { get } from "lodash";
import { AdminQuestionsEdit } from "../../../component/molecule/Forms";

const QuestionsMainScreen = ({ getsubjectList, subjectList, getQuestions, questionList ,categoryList,getCategoryList}) => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [subject, setSubject] = useState(null);
  const [category, setCategory] = useState(null);
  const [viewQuestion, setViewQuestion] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [questionData, setQuestionData] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);

  useEffect(() => {
    getsubjectList();
    getQuestions();
    getCategoryList();
  }, []);

  useEffect(() => {
    setSubjectData(subjectList);
  }, [subjectList]);

  useEffect(() => {
    setCategoryData(categoryList);
  }, [categoryList]);

  useEffect(() => {
    getQuestions({   category_id: category,
      subject_id : subject});
  }, [subject, category]);


  const transformQuestions = (questionList = [], subjectList = []) => {
    if (!Array.isArray(questionList) || !Array.isArray(subjectList)) {
      console.error("Invalid input data:", { questionList, subjectList });
      return [];
    }

    const mainSubjects = subjectList.filter((subject) => !subject.parent_subject_id);
    const subSubjectsMap = subjectList.reduce((acc, subject) => {
      if (subject.parent_subject_id) {
        const parentId = subject.parent_subject_id;
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(subject);
      }
      return acc;
    }, {});

    return mainSubjects.map((mainSubject) => {
      const mainSubjectQuestions = questionList.filter(
        (q) => q.subject_id === mainSubject.id
      );

      const subSubjects = (subSubjectsMap[mainSubject.id] || []).map((subSubject) => {
        const subSubjectQuestions = questionList.filter(
          (q) => q.subject_id === subSubject.id
        );

        return {
          id: subSubject.id,
          name: subSubject.name,
          questions: subSubjectQuestions,
        };
      });

      return {
        mainSubject: mainSubject.name,
        id: mainSubject.id,
        questions: mainSubjectQuestions,
        subSubjects,
      };
    });
  };

  useEffect(()=>{
    const data = transformQuestions(questionList,subjectList)
    setQuestionData(data)
  },[questionList,subjectList])


  

  const onSubjectChange = (e) => {
    const selectedValue = getText(e);
    setSubject(selectedValue || null);
  };

  const onCategoryChange = (e) => {
    const selectedValue = getText(e);
    setCategory(selectedValue || null);
  };

  const handleEdit = (question) => {
    setSelectedItem(question);
    setEditQuestion(true);
  };

  const handleDelete = (item) => {
    alert(`Delete clicked for: ${item.mainSubject}`);
  };

  const onViewOff = () => {
    setViewQuestion(false);
    setSelectedItem({});
  };

  const handleViewQuestion = (question) => {
    setSelectedItem(question);
    setViewQuestion(true);
  };
  
  
  const onFilterClear = () => {
    setSubject(null);
    setCategory(null);
  };



  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <HeadingComponent
              text="Questions"
              fontweigth={600}
              size={40}
              fontfamily="Montserrat"
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              btnText="Add Questions"
              onclick={() => setAddQuestion(true)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="common-admin-content-wrap">
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <DropDownComponent
              isShowPlaceholder={true}
              isShowZero={subjectData.length > 0 ? false : true}
              initialValue="Select Main Subject"
              radius="15px"
              onchange={onSubjectChange}
              dropdownLabel="Select Subject"
              list={subjectData}
              selectedValue={subject}
            />
          </Grid>
          <Grid xs={4} item>
            <DropDownComponent
              isShowPlaceholder={true}
              isShowZero={categoryData.length > 0 ? false : true}
              initialValue="Select Cluster"
              radius="15px"
              onchange={onCategoryChange}
              dropdownLabel="Select Cluster"
              list={categoryData}
              selectedValue={category}
            />
          </Grid>
          <Grid xs={2} item container justifyContent="flex-end" paddingBottom={'10px'} alignItems="flex-end">
  <TextIconButtonComponent
    btnText="Clear Filters"
    onclick={() => onFilterClear()}
  />
</Grid>

        </Grid>
        <ExpandableViewQuestion
          data={questionData}
          isEdit={true}
          isView={true}
          subjectid = {subject}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleViewQuestion}
        />
      </Box>
      <AdminQuestions open={addQuestion} onClose={() => setAddQuestion(false)} />
      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Question"}
        maxwidth={"lg"}
        open={editQuestion}
        onClose={() => setEditQuestion(false)}
      >
        {/* <AdminQuestionView item={selectedItem} onClose={() => setEditQuestion()} /> */}
        <AdminQuestionsEdit
          questionDetails={selectedItem}
          onClose={() => setEditQuestion(false)}
        />
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={true}
        title={"View Question"}
        maxwidth={"lg"}
        open={viewQuestion}
        onClose={onViewOff}
      >
        <AdminQuestionView item={selectedItem} onClose={() => onViewOff()} />
      </DialogComponent>

    </>
  );
};

export default connect(
  (state) => ({
    subjectList: state.questions.get("subjectList"),
    questionList: state.questions.get("questionList"),
    categoryList: state.questions.get("categoryList"),
  }),
  {
    getQuestions: Actions.questions.getQuestions,
    getsubjectList: Actions.questions.getSubjectList,
    getCategoryList: Actions.questions.getCategoryList,
  }
)(QuestionsMainScreen);
