import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  SearchBarComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
  TextInputComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminQuestions,
  AdminQuestionView,
  AdminQuizForm,
  AdminQuizView,
  AdminwebinarForm,
  ExpandableViewQuestion,
  PopUpMessageComponent,
  QandACard,
} from "../../../../component/molecule";
import { useNavigate } from "react-router-dom";
import { faEye, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import _, { get, set } from "lodash";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import moment from "moment";
import { AdminQuizEdit } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import TextAreaComponent from "../../../../component/atom/Inputs/TextArea";
import { getText } from "../../../../core/Constant";

const AdminSelectQuestionScreen = ({
  getCategoryList,
  getQuestions,
  getsubjectList,
  subjectList,
  questionList,
  categoryList,
  addQuestiontoQuiz
}) => {
  const navigate = useNavigate();
  const [addQuestion, setAddQuestion] = useState(false);
  const [viewQuiz, setViewQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(false);
  const cQuizRef = useRef(null);
  const [subjectData, setSubjectData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [subject, setSubject] = useState(null);
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [categoryIds, setCategoryIds] = useState([])
  const [quizId, setQuizId] = useState(0);
    const [viewQuestion, setViewQuestion] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});



  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("newQuiz"))
    getsubjectList();
    getCategoryList();
    getQuestions();
    setQuizId(quiz.id)
  }, [])

  useEffect(() => {
    setSubjectData(subjectList)
  }, [subjectList])

  useEffect(() => {
    setCategoryData(categoryList)
  }, [categoryList])

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


  const handleEdit = (item) => {
    alert(`Edit clicked for: ${item.mainSubject}`);
  };

  const handleDelete = (item) => {
    alert(`Delete clicked for: ${item.mainSubject}`);
  };


  const onSubjectChange = (e) => {
    const selectedValue = getText(e);
    setSubject(selectedValue || null);
  };

  const onCategoryChange = (e) => {
    const selectedValue = getText(e);
    setCategory(selectedValue || null);
  };


  const handleCheckboxChange = (checked, question) => {
    setSelectedQuestions((prev) =>
      checked
        ? [...prev, question.id]
        : prev.filter((id) => id !== question.id)
    )
    setCategoryIds((prev) => checked ? [...prev, question.category_id] : prev.filter((id) => id !== question.category_id))
    console.log(question, 'question')
  }

  const onFilterClear = () => {
    setSubject(null);
    setCategory(null);
  };

  const onViewOff = () => {
    setViewQuestion(false);
    setSelectedItem({});
  };

  const handleViewQuestion = (question) => {
    setSelectedItem(question);
    setViewQuestion(true);
  };


  const onAdd = () => {
    addQuestiontoQuiz({ quiz_id: quizId, question_ids: selectedQuestions })
  }



  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={"Select Questions"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>

          <Grid item className="student-search-btn-section" columnGap={2}>
            {/* <Box className="student-search-btn-inner-section">
              <DropDownComponent
                list={courseList}
                initialValue={"All Courses"}
                selectedValue={courseId}
                radius={"15px"}
                onchange={(e) => filterCourse(e.target.value)}
                placeholder={"All Courses"}
              />
            </Box> */}
            {/* <TextIconButtonComponent
              btnText={"Add Quetion"}
              icon={faQuestionCircle}
              animation={"shake"}
              onclick={() => setAddQuestion(true)}
            />  */}
            {/* <TextIconButtonComponent
              btnText={"View Selected"}
              icon={faEye}
            // onclick={() => navigate("/admin-submission-history")}
            /> */}
          </Grid>
        </Grid>
        <Box className="common-admin-content-wrap">
          <Grid container>
            <Grid xs={4} item>
              <DropDownComponent
                //isError={isSelectedCourseError}
                error={'Please select a Subject'}
                placeholder="Select Subject"
                onchange={onSubjectChange}
                list={subjectData}
                selectedValue={subject}
                isShowZero={false}
                dropdownLabel="Subject" />
            </Grid>
            <Grid xs={4} item>
              <DropDownComponent
                //isError={isSelectedCourseError}
                error={'Please select a Cluster'}
                placeholder="Select Cluster"
                onchange={onCategoryChange}
                list={categoryData}
                selectedValue={category}
                isShowZero={false}
                dropdownLabel="Cluster" />
            </Grid>
            <Grid xs={2} item container justifyContent="flex-end" paddingBottom={'10px'} alignItems="flex-end">
  <TextIconButtonComponent
    btnText="Clear Filters"
    onclick={() => onFilterClear()}
  />
</Grid>
          </Grid>
          <Grid container>
            <ExpandableViewQuestion checked={true} isView={true} subjectid={subject} selectedQuestions={selectedQuestions}
              onCheckboxChange={handleCheckboxChange} data={questionData} onEdit={handleEdit} onDelete={handleDelete}           onView={handleViewQuestion}/>
          </Grid>


          <Grid mt={10} alignItems={'flex-end'} justifyContent={'flex-end'} container>
            <Grid item >

              <TextIconButtonComponent
                btnText={"Add"}
                // icon={faQuestionCircle}
                animation={"shake"}
                onclick={() => onAdd()}
              />
            </Grid>

          </Grid>


        </Box>


      </Box>

      <AdminQuestions
        open={addQuestion}
        onClose={() => setAddQuestion(false)}
      />
        <DialogComponent
        isShowCloseButton={true}
        title={"View Question"}
        maxwidth={"lg"}
        open={viewQuestion}
        onClose={onViewOff}
      >
        <AdminQuestionView item={selectedItem} onClose={() => onViewOff()} />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Quiz"}
        open={editQuiz}
        onClose={() => setEditQuiz(false)}
      >
        <AdminQuizEdit onClose={() => setEditQuiz(false)} />
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
    addQuestiontoQuiz: Actions.quizes.addQuestiontoQuiz
  }
)(AdminSelectQuestionScreen);
