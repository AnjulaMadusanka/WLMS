import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  TextIconButtonComponent,
} from "../../../../component/atom";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminQuestions,
  ExpandableViewGrade,
} from "../../../../component/molecule";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";

const AdminQuizGradeScreen = ({ getCategoryList, categoryList, fetchGrades, gradeList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryIds = location?.state?.categoryIds || [];
  const [quizData, setQuizData] = useState({});
  const [quizId, setQuizId] = useState(null);

  const [filteredCategories, setFilteredCategories] = useState([]);


  useEffect(() => {
    const quizdata = JSON.parse(localStorage.getItem('newQuiz'))
    setQuizData(quizdata)
    setQuizId(quizdata.id)
    getCategoryList();
  }, []);

  useEffect(() => {
    if (categoryList?.length && categoryIds?.length) {
      const filtered = categoryList
        .filter((category) => categoryIds.includes(category.id))
        .map((category) => ({
          category
        }));

      setFilteredCategories(filtered);
    }
  }, [categoryList, categoryIds]);

  useEffect(() => {

  }, [categoryIds])

  const onsubmit = () => {
    localStorage.removeItem('newQuiz')
    navigate("/admin-quiz");
  }

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={"Cluster Grades"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <Grid container>
            <Grid item>
              <HeadingComponent
                fontfamily={"Montserrat"}
                size={24}
                color={"#4e657c"}
                text={"Question Categories"}
              />
            </Grid>
          </Grid>

          {/* Pass filtered categories to the component */}
          <Grid container>
            <ExpandableViewGrade quiz={quizData} data={filteredCategories} />
          </Grid>

          <Grid
            mt={10}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            container
          >
            <Grid item>
              <TextIconButtonComponent
                btnText={"Submit"}
                animation={"shake"}
                onclick={() => onsubmit()}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Dialogs */}
        <AdminQuestions open={false} onClose={() => { }} />
        <DialogComponent
          isShowCloseButton={true}
          title={"View Quiz"}
          open={false}
          onClose={() => { }}
        />
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    categoryList: state.questions.get("categoryList"),
    gradeList: state.quizes.get('gradeList')
  }),
  {
    getCategoryList: Actions.questions.getCategoryList,
    fetchGrades: Actions.quizes.fetchGrades
  }
)(AdminQuizGradeScreen);
