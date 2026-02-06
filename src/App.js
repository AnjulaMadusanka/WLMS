import React, { useEffect, useState, version } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom';
// import StudentScreenContainer from './component/organism/Screens/StudentScreenContainer';
import LoginScreen from './module/auth/screen/LoginScreen';
import LoginScreenContainer from './component/organism/Screens/LoginScreenContainer';
import WelcomeScreen from './module/auth/screen/WelcomeScreen';
import CourseViewScreen from './module/auth/screen/CourseViewScreen';
import CourseDetailsScreen from './module/course/screen/CourseDetailsScreen';
import ResetPasswordScreen from './module/auth/screen/ResetPasswordScreen';
import Layout from './component/organism/Screens/Layout';
import DashboardAdminScreen from './module/home/screen/DashboardAdminScreen';
import {
  AddPromoCode, AdminAnnouncementView, AdminCourseStudentProgressScreen, AdminDocumentScreen, AdminMainNewsLetterScreen, AdminNewsLetterEditScreen, AdminNewsLetterScreen, AdminNewsletterViewScreen, AdminNotification, AdminPromoCodeScreen, AdminQuizEditFirstScreen, AdminQuizEditSecondScreen, AdminQuizFirstScreen, AdminQuizGradeScreen, AdminQuizSecondScreen, AdminQuizViewScreen, AdminSelectQuestionScreen, AdminWebinarSuccess, CategoryMainScreen, CourseScreen,
  DocumentMainScreen,
  DocumentViewScreen,
  EditPromoCode, ForumMessageScreen, InitialScreen, LiveClassScreen, PageNotFound, ProfileScreen,
  QuestionMainScreen,
  QuizAttemptFormScreen, QuizAttemptScreen, SplashScreen, StudentAlertScreen, StudentAnnouncementScreen,
  StudentMessageScreen, StudentNotification, ResultInGraphScreen,
  SubjectMainScreen
} from './module';
import _ from "lodash";
import StudentsScreen from './module/students/screen/StudentsScreen';
import AdminCourseScreen from './module/course/screen/admin/AdminCourseScreen';
import StudentReportScreen from './module/reports/screen/StudentReport';
import { USER_ROLE } from './core/Constant';
import { Provider } from "react-redux"
import { store, appHistory } from "./core/modules/StoreCreator";
import { Router } from "react-router";
import AdminCourseContentEdit from './module/course/screen/admin/AdminCourseContentEdit';


import {
  SampleClassScreen,
  SampleVideoScreen,
  DashboardScreen,
  CourseVideoScreen,
  QuizStartScreen,
  QuizMainScreen,
  ForumMainScreen,
  WebinarMainScreen,
  UsersScreen,
  ReviewScreen,
  AdminWebinarMainScreen,
  AdminQuizMainScreen,
  AdminQuestionsScreen,
  AdminSubmissionHistoryScreen,
  AdminMainForumScreen,
  AdminViewForumScreen,
  AdminViewForumStudentScreen,
  AdminMessageMainScreen,
  AdminChatScreen,
  PaymentReportScreen,
  AdminAnnouncementScreen,
  VideoScreen,
  AdminNonApprovedReview,
  AdminCourseStudentManageScreen
} from './module';
import { Actions } from './core/modules/Actions';
import QuizDoneScreen from './module/quizes/screen/QuizDoneScreen';
import { AdminRoutes, PrivateRoutes, StudentRoutes } from './component/organism';
import AdminCourseRegisteredStudentAddScreen from './module/course/screen/admin/AdminCourseRegisteredStudentAddScreen';
import AdminCourseNewStudentAdd from './module/course/screen/admin/AdminCourseNewStudentAdd';
import AddCourseScreen from './module/course/screen/admin/AddCourseScreen';
import EditCourseScreen from './module/course/screen/admin/EditCourseScreen';
import DeleteAccountScreen from './module/profile/screen/DeleteAccountScreen';
import { pdfjs } from "react-pdf";
import packageJson from '../package.json';
import { CommonRepository } from './core/repository';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#5771ea",
    },
    secondary: {
      main: "#0r6ab4",
    },
  },
  typography: {
    fontFamily: `Montserrat`,
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&&::before": {
            borderBottom: "none",
          },
          "&&:hover::before": {
            borderBottom: "none",
          },
          "&&::after": {
            borderBottom: "none",
          },
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
          // boxShadow: "none",
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#fff",
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "black"
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&&:hover": {
            backgroundColor: "rgba(131, 29, 220, 0.2)",
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // "&&:hover": {
          // },
          "&&:focused": {
            borderColor: 'red',
            borderWidth: 2,
          },

        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '&:hover': {
            backgroundColor: "#5ECAA1 !important"
          },
          '&:active': {
            backgroundColor: "#9834F0 !important"
          },
        }),
      },
    },

  }
});


function App() {
  const [loading, setLoading] = useState(true);
  // const [userType, setUSerType] = useState(USER_ROLE.student);
  const [version,setVersion] = useState('')

  const onGetAppVersion = async()=>{
    const response = await CommonRepository.getVersionNumber();
    const v = _.get(response,'data[0].version','');
    setVersion(v);
    const storedVersion = localStorage.getItem('app-version');
    if(v?.length>0 && v != storedVersion){
      //  onRefresh(v)
    }
  }

  useEffect(() => {
    handleClearCache()
    onGetAppVersion()
    _.delay(() => {
      setLoading(false)
    }, 3000)
  }, []);




  const handleClearCache = () => {
    const storedVersion = localStorage.getItem('app-version');
    const currentVersion = packageJson.version;

    if (storedVersion != currentVersion) {
      // onRefresh(currentVersion)
    } else {

    }
  };



  const onRefresh = (currentVersion) => {
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        ).then(() => {
          // console.log('All caches cleared!');
          // alert('Cache has been cleared. Reloading the page...');
          // Reload the page
          // window.location.reload();
          window.location.href = '/secondory.html';
        });
      }).catch((error) => {
        console.error('Error clearing cache:', error);
      });
    }
    localStorage.setItem('app-version', currentVersion);

  }

  return (
    <Provider store={store}>
      {loading ?
        <SplashScreen />
        : <>
          <ThemeProvider theme={theme}>
            <BrowserRouter history={appHistory}>
              <Routes>
                <Route path="/">
                  <Route element={<LoginScreenContainer />}>
                    {/* <Route index element={<InitialScreen />} /> */}
                    {/* Todo when deploy admin use below line and when deploying student please comment below line  */}
                    {/* if admin comment line number 179   */}

                    {/* <Route index element={<LoginScreen />} /> */}
                    {/* Todo comment below line when deploying admin and uncomment below line */}

                    {/* if student comment line number 176 */}
                    <Route index element={<WelcomeScreen />} />
                    <Route path="/welcome" element={<WelcomeScreen />} />
                    <Route path="/login"  element={<LoginScreen />} />
                    <Route path="/courseview/:id" element={<CourseViewScreen />} />
                    <Route path="/sampleclass" element={<SampleClassScreen />} />
                    <Route path="/samplevideo" element={<SampleVideoScreen />} />
                    <Route path="/reset-password" element={<ResetPasswordScreen />} />
                    <Route path="/course-video-free" element={<CourseVideoScreen />} />
                  </Route>

                  <Route element={<PrivateRoutes />}>
                    <Route element={<AdminRoutes />}>
                      <Route element={<Layout />}>
                        <Route path="/admin-dashboard" element={<DashboardAdminScreen />} />
                        <Route path="/admin-students" element={<StudentsScreen />} />
                        <Route path="/admin-users" element={<UsersScreen />} />
                        <Route path="/admin-course" element={<AdminCourseScreen />} />
                        <Route path="/admin-add-course" element={<AddCourseScreen />} />
                        <Route path="/admin-edit-course" element={<EditCourseScreen />} />
                        <Route path="/admin-course-student" element={<AdminCourseStudentManageScreen />} />
                        <Route path="/admin-course-student-add-registered" element={<AdminCourseRegisteredStudentAddScreen />} />
                        <Route path="/admin-course-student-new-add-registered" element={<AdminCourseNewStudentAdd />} />
                        <Route path="/admin-courseContent-edit/:id" element={<AdminCourseContentEdit />} />
                        <Route path="/admin-review" element={<ReviewScreen />} />
                        <Route path="/admin-webinar" element={<AdminWebinarMainScreen />} />
                        <Route path="/admin-quiz" element={<AdminQuizMainScreen />} />
                        <Route path="/admin-add-questions/:id" element={<AdminQuestionsScreen />} />
                        <Route path="/admin-submission-history" element={<AdminSubmissionHistoryScreen />} />
                        <Route path="/admin-forum" element={<AdminMainForumScreen />} />
                        <Route path="/admin-view-forum" element={<AdminViewForumScreen />} />
                        <Route path="/admin-view-forum-student" element={<AdminViewForumStudentScreen />} />
                        <Route path="/admin-view-message" element={<AdminMessageMainScreen />} />
                        <Route path="/admin-chat" element={<AdminChatScreen />} />
                        <Route path="/admin-student-report" element={<StudentReportScreen />} />
                        <Route path="/admin-payment-report" element={<PaymentReportScreen />} />
                        <Route path="/admin-resources" element={<AdminAnnouncementScreen />} />
                        <Route path="/admin-video" element={<VideoScreen />} />
                        <Route path="/admin-non-approved-reviews" element={<AdminNonApprovedReview />} />
                        <Route path="/admin-quiz-assessment/:id/:name" element={<QuizAttemptFormScreen />} />
                        <Route path="/admin-webinar-create/:status" element={<AdminWebinarSuccess />} />
                        <Route path="/admin-resources-view" element={<AdminAnnouncementView />} />
                        <Route path="/promo-code-view" element={<AdminPromoCodeScreen />} />
                        <Route path="/add-promo-code" element={<AddPromoCode />} />
                        <Route path="/edit-promo-code" element={<EditPromoCode />} />
                        <Route path="/admin-newsletter" element={<AdminMainNewsLetterScreen />} />
                        <Route path="/admin-newsletter-history" element={<AdminNewsLetterScreen />} />
                        <Route path="/admin-view-newsletter" element={<AdminNewsletterViewScreen />} />
                        <Route path="/admin-edit-newsletter" element={<AdminNewsLetterEditScreen />} />
                        <Route path="/admin-course-student-progress" element={<AdminCourseStudentProgressScreen />} />
                        <Route path="/admin-document" element={<AdminDocumentScreen />} />
                        <Route path="/admin-notification" element={<AdminNotification />} />
                        <Route path="/admin-subject-main" element={<SubjectMainScreen />} />
                        <Route path="/admin-category-main" element={<CategoryMainScreen />} />
                        <Route path="/admin-questions-main" element={<QuestionMainScreen />} />
                        <Route path="/admin-quiz-first" element={<AdminQuizFirstScreen />} />
                        <Route path="/admin-quiz-second" element={<AdminQuizSecondScreen />} />
                        <Route path="/admin-quiz-edit-first" element={<AdminQuizEditFirstScreen />} />
                        <Route path="/admin-quiz-edit-second" element={<AdminQuizEditSecondScreen />} />
                        <Route path="/admin-question-select" element={<AdminSelectQuestionScreen />} />
                        <Route path="/admin-quiz-grade" element={<AdminQuizGradeScreen />} />
                        <Route path="/admin-quiz-view" element={<AdminQuizViewScreen />} />
                        <Route path='/admin-quiz-attempt-result' element={<ResultInGraphScreen />} />
                      </Route>
                    </Route>

                    <Route element={<StudentRoutes />}>
                      <Route element={<Layout />}>
                        <Route path="/webinar" element={<WebinarMainScreen />} />
                        <Route path="/dashboard" element={<DashboardScreen />} />
                        <Route path="/course-catalog" element={<CourseScreen />} />
                        <Route path="/course-details" element={<CourseDetailsScreen />} />
                        <Route path="/quiz" element={<QuizStartScreen />} />
                        <Route path="/quiz-main" element={<QuizMainScreen />} />
                        <Route path="/quiz-attempt" element={<QuizAttemptScreen />} />
                        <Route path="/quiz-attempt-result" element={<ResultInGraphScreen />} />
                        <Route path="/quiz-attempt-form" element={<QuizAttemptFormScreen />} />

                        <Route path="/LiveClassScreen" element={<LiveClassScreen />} />
                        <Route path="/forum" element={<ForumMainScreen />} />
                        <Route path="/forum-message" element={<ForumMessageScreen />} />
                        <Route path="/message" element={<StudentMessageScreen />} />
                        <Route path="/course-video" element={<CourseVideoScreen />} />
                        <Route path="/resources" element={<StudentAnnouncementScreen />} />
                        <Route path="/DeleteAccountScreen" element={<DeleteAccountScreen />} />
                        <Route path="/StudentNotification" element={<StudentAlertScreen />} />
                        <Route path="/view-document" element={<DocumentViewScreen />} />
                        <Route path="/document" element={<DocumentMainScreen />} />

                      </Route>
                    </Route>

                    <Route element={<Layout />}>
                      <Route path="/profile" element={<ProfileScreen />} />
                      <Route path="/quiz-done" element={<QuizDoneScreen />} />
                    </Route>

                  </Route>
                  <Route path="/secondory.html"  />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </>}
      <CssBaseline />
    </Provider>
  );

}

export default App;

