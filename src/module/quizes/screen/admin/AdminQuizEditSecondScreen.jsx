import React, { useEffect, useState, useRef, use } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
    IconButtonComponent,
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
    PopUpMessageComponent,
    QandACard,
} from "../../../../component/molecule";
import { useLocation, useNavigate } from "react-router-dom";
import { faEye, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import _, { set } from "lodash";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import moment from "moment";
import { AdminQuizEdit } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import TextAreaComponent from "../../../../component/atom/Inputs/TextArea";

const AdminQuizEditSecondScreen = ({
    getQuizeList,
    quizList,
    upDateQuizState,
    getQuizById,
    deleteQuize,
    verifyToken,
    getAllStateCourseList,
    getCourseList,
    courseList,
    getQuizQuestionAndAnswerByQuizId,
    questionAndAnswersList,
    getCategoryList,
    getSubjectList,
    removeQuestionfromQuiz
}) => {
    const navigate = useNavigate();
    const [addQuestion, setAddQuestion] = useState(false);
    const [viewQuiz, setViewQuiz] = useState(false);
    const [deleteQuiz, setDeleteQuiz] = useState(false);
    const [selectQuiz, setSelectedQuiz] = useState("");
    const [editQuiz, setEditQuiz] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const cQuizRef = useRef(null);
    const [list, setList] = useState([]);
    const [originalList, setOriginalList] = useState();
    const [questionsList, setQuestionsList] = useState([]);
    const [viewQuestion, setViewQuestion] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [categoryIds, setCategoryIds] = useState([]);
    const [quizData, setQuizData] = useState({});
    const location = useLocation();
    const [quizid, setQuizId] = useState(0);

    const [onDeletePopup, setOnDeletePopUp] = useState(false);

    const [allQuiz, setAllQuiz] = useState([]);


    useEffect(() => {
        const quizdata = JSON.parse(localStorage.getItem('newQuiz'))
        setQuizData(quizdata)
        getQuizQuestionAndAnswerByQuizId(quizdata.id);
        setQuizId(quizdata.id)
        getCategoryList();
        getSubjectList();
    }, []);


    useEffect(() => {
        setQuestionsList(questionAndAnswersList)
    }, [questionAndAnswersList])

    useEffect(() => {
        if (questionsList?.length > 0) {
            const ids = questionsList.map((question) => question.category_id);
            setCategoryIds(ids);
        }
    }, [questionsList]);

    useEffect(() => {
        if (courseId == 0) {
            const list = _.map(quizList, (item) => {
                const createdDate = moment(_.get(item, "created_at", new Date())).format(
                    "DD/MM/YYYY HH:mm:ss"
                );
                return { ...item, createdDate };
            });
            setAllQuiz(list);
        }
    }, [quizList]);

    useEffect(() => {
        getQuizeList();
        getAllStateCourseList();
        getCourseList();
    }, []);

    useEffect(() => {

    }, [courseList])

    const statusUpdate = (tableMeta, value) => {
        const updatedQuiz = allQuiz?.map((item) => {
            if (item?.id == tableMeta?.rowData[0]) {
                const currentStatus = item?.status;
                const status = currentStatus == 1 ? 0 : 1;
                upDateQuizState({ quiz_id: tableMeta?.rowData[0], status });
                return { ...item, status };
            }
            return item;
        });
        setAllQuiz(updatedQuiz);
    };


    useEffect(() => {
        const foundObject = _.filter(quizList, ({ id }) => id === courseId);
        setList(foundObject);
        setOriginalList(foundObject)
    }, [quizList]);

    const filterCourse = (courseId) => {
        setCourseId(courseId);
        if (courseId === 0) {
            setAllQuiz(quizList)
        }
        else {
            const foundObject = _.filter(quizList, ({ course_id }) => course_id === courseId);
            setAllQuiz(foundObject)
        }
        // getAdminUserDetails({
        //   course: courseId == 0 ? "" : courseId,
        //   type: 2,
        // });
    };

    const onPressDelete = (tableMeta, value) => {
        setSelectedQuiz(tableMeta.rowData[0]);
        setDeleteQuiz(true);
    };

    const onDeleteQuize = () => {
        deleteQuize(selectQuiz);
        // setDeleteQuiz(false)
        // setSelectedQuiz('');
        onDeleteClose();
    };

    const onDeleteClose = () => {
        setDeleteQuiz(false);
        setSelectedQuiz("");
    };

    const onViewOff = () => {
        setViewQuestion(false);
        setSelectedItem({});
    };

    const onDelete = () => {
        setOnDeletePopUp(false);
        const { quiz_id, id } = selectedItem;
        // deleteQuestion(id, quiz_id);
        removeQuestionfromQuiz({
            quiz_id: quizid,
            question_id: selectedItem?.id
        })
        _.delay(() => {
            setSelectedItem({});
        }, 1000);
    };

    const onNotDelete = () => {
        setOnDeletePopUp(false);
        setSelectedItem({});
    };


    return (
        <>
            <Box className="main-screen-container">
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <HeadingComponent
                            text={"Edit Quiz"}
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
                        <TextIconButtonComponent
                            btnText={"Add Quetion"}
                            icon={faQuestionCircle}
                            animation={"shake"}
                            onclick={() => setAddQuestion(true)}
                        />
                        <TextIconButtonComponent
                            btnText={"Select Question"}
                            icon={faEye}
                            onclick={() => navigate("/admin-question-select")}
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
                                text={
                                    "Selected Questions"
                                }
                            />

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={12}>
                            {
                                questionsList.map((item, index) => (
                                    <QandACard isView={true} isDelete={true} onclick={() => {
                                        setViewQuestion(true);
                                        setSelectedItem(item);
                                    }}
                                        onPressDelete={() => {
                                            setOnDeletePopUp(true);
                                            setSelectedItem(item);
                                        }}
                                        index={index} item={item} />
                                ))
                            }
                        </Grid>
                    </Grid>


                    <Grid mt={10} alignItems={'flex-end'} justifyContent={'flex-end'} container>
                        <Grid item >

                            <TextIconButtonComponent
                                btnText={"Next"}
                                // icon={faQuestionCircle}
                                animation={"shake"}
                                onclick={() => navigate('/admin-quiz-grade', { state: { categoryIds: categoryIds } })}
                            />
                        </Grid>

                    </Grid>


                </Box>


            </Box>
            <PopUpMessageComponent
                open={deleteQuiz}
                type={"other"}
                title={"Delete!"}
                message={"Are you sure you want delete quiz?"}
                btntext={"Yes, delete"}
                altbtntext={"No"}
                onclick={onDeleteQuize}
                altonclick={onDeleteClose}
                onclose={onDeleteClose}
            />

            <AdminQuestions
                open={addQuestion}
                quizData={quizData}
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

            {/* <DialogComponent
        isShowCloseButton={true}
        title={"Edit Question"}
        maxwidth={"lg"}
        open={editQuestion}
        onClose={() => setEditQuestion(false)}
      >
        <AdminQuestionsEdit
          questionDetails={question}
          onClose={() => setEditQuestion(false)}
        />
      </DialogComponent> */}

            <PopUpMessageComponent
                open={onDeletePopup}
                type={"other"}
                title={"Delete!"}
                message={"Are you sure you want delete this question ?"}
                btntext={"Yes, delete"}
                altbtntext={"No"}
                altonclick={onNotDelete}
                onclick={onDelete}
                onclose={onNotDelete}
            />
        </>
    );
};

export default connect(
    (state) => ({
        quizList: state.quizes.get("quizList"),
        courseList: state.students.get("commonCourseList"),
        questionAndAnswersList: state.quizes.get("questionAndAnswersList"),
    }),
    {
        getQuizeList: Actions.quizes.getQuizeList,
        upDateQuizState: Actions.quizes.upDateQuizState,
        getQuizById: Actions.quizes.getQuizById,
        deleteQuize: Actions.quizes.deleteQuize,
        verifyToken: Actions.auth.verifyToken,
        getAllStateCourseList: Actions.course.getAllStateCourseList,
        getCourseList: Actions.quizes.getCourseListByQuiz,
        getQuizQuestionAndAnswerByQuizId:
            Actions.quizes.getQuizQuestionAndAnswerByQuizId,
        getCategoryList: Actions.questions.getCategoryList,
        getSubjectList: Actions.questions.getSubjectList,
        removeQuestionfromQuiz: Actions.quizes.removeQuestionfromQuiz,
    }
)(AdminQuizEditSecondScreen);
