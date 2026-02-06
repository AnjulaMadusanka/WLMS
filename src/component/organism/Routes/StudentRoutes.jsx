import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { USER_ROLE } from "../../../core/Constant";
import { useEffect, useState } from "react";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { NotificationAlert } from "../../molecule";

const StudentRoutes = ({ getcourseProgress, courseprogress, getNotifications, notifications }) => {
  const [initialCourse, setInitialCourse] = useState([]);
  const [unreadNotify, setUnread] = useState([]);
  const [read, setRead] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    getcourseProgress();
  }, [location]);


  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"));
    if (userId) {
      getNotifications(userId);
    }
  }, [location]); 


  useEffect(() => {
    const unread = notifications.filter((notification) => notification.is_read === 0);
    setUnread(unread);
  }, [notifications]);


  useEffect(() => {
    setInitialCourse(courseprogress[0] || {});
    localStorage.setItem("firstcourse", initialCourse?.course_id);
  }, [courseprogress, initialCourse]);


  const handleClose = () => {
    setRead(false);
    navigate("/StudentNotification");
  };

  const user = parseInt(localStorage.getItem("userType"));
  return (
    <>
      {user === USER_ROLE.student ? <Outlet /> : <Navigate to="*" />}
      {unreadNotify.length > 0 && (
        <NotificationAlert
          handleClose={handleClose}
          isread={read}
          data={{
            title: "Notification",
            message: unreadNotify.length > 1 ? `You have ${unreadNotify.length} Unread Notifications` : "You have Unread Notification",
          }}
        />
      )}
    </>
  );
};

export default connect(
  (state) => ({
    courseprogress: state.home.get("courseprogress"),
    notifications: state.notification.get("notifications"),
  }),
  {
    getcourseProgress: Actions.home.getcourseProgress,
    getNotifications: Actions.notification.getNotifications,
  }
)(StudentRoutes);
