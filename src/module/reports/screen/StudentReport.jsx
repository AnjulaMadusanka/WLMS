import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import TableComponent from "../../../component/atom/Table/TableComponent";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import {
  DatePickerComponent,
  TextIconButtonComponent,
} from "../../../component/atom";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { AdminReportCard } from "../../../component/molecule";
import { IMAGES } from "../../../assets/Images";
import { getText } from "../../../core/Constant";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";

const StudentReportScreen = ({
  studentReportDataList,
  getAdminStudentReport,
  courseList,
  getCourseList,
  verifyToken,
}) => {
  const [reportData, setReportData] = useState([]);
  const [course, setCourse] = useState("0");
  const [rowCount, setRowCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date("2023/09/01"));
  const [endDate, setEndDate] = useState(
    new Date(moment().format("YYYY/MM/DD"))
  );

  useEffect(() => {
    setReportData(studentReportDataList);
    setRowCount(studentReportDataList.length);
  }, [studentReportDataList]);

  useEffect(() => {
    getAdminStudentReport({
      course_id: "",
      from_date: "2023-01-01",
      to_date: moment().format("YYYY-MM-DD"),
    });
    getCourseList();
  }, []);

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    reloadTable(Selectedvalue, startDate, endDate);
  };

  const onStartDateChange = (date) => {
    setStartDate(date);
    reloadTable(course, date, endDate);
  };
  const onEndDateChange = (date) => {
    setEndDate(date);
    reloadTable(course, startDate, date);
  };

  const reloadTable = (courseID, from, to) => {
    var course_id;
    if (courseID == 0) {
      course_id = "";
    } else {
      course_id = courseID;
    }
    getAdminStudentReport({
      course_id: course_id,
      from_date: moment(from).format("YYYY-MM-DD"),
      to_date: moment(to).format("YYYY-MM-DD"),
    });
  };

  const columns = [
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "payment_details",
      label: "Enrolled Course",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return value?.map((item) => (
            <>
              <ul>
                <li>{item?.course?.name}</li>
              </ul>
            </>
          ));
        },
      },
    },

    {
      name: "created_at",
      label: "Registered Date",
      type: "date",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      <Box className="main-screen-container">
        <Box>
          <HeadingComponent
            text={"Student Reports"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
          />
        </Box>

        <Box className="reports-form-card-wrap">
          <Box>
            <AdminReportCard
              type={"studnets"}
              value={rowCount}
              icon={IMAGES.totalStudents}
            />
          </Box>
          <Box sx={{ minWidth: 280, width: "40%" }}>
            <form>
              {/* <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                            <TextIconButtonComponent icon={faFileExport} btnText={"Export"} />
                        </Box> */}

              <Box sx={{ mb: 1 }}>
                <DropDownComponent
                  placeholder="Select Course"
                  onchange={onCourseChange}
                  list={courseList}
                  selectedValue={course}
                  dropdownLabel="Course"
                />
              </Box>

              <Box sx={{ flexGrow: 1, mb: 1, pr: 1, pl: 1 }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => onStartDateChange(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </Box>
              <Box sx={{ flexGrow: 1, mb: 1, pr: 1, pl: 1 }}>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => onEndDateChange(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                />
              </Box>
            </form>
          </Box>
        </Box>

        <Box pt={2}>
          <TableComponent columns={columns} data={reportData} />
        </Box>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    studentReportDataList: state.reports.get("studentReportDataList"),
    courseList: state.course.get("commonCourseList"),
  }),
  {
    getAdminStudentReport: Actions.reports.getAdminStudentReport,
    getCourseList: Actions.course.getCourseList,
    verifyToken: Actions.auth.verifyToken,
  }
)(StudentReportScreen);
