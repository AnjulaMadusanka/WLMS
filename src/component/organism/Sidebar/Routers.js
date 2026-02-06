import { IMAGES } from '../../../assets/Images';

export const adminScreens = [
    {
      icon: <img src={IMAGES.sideNavIconDashbaord} alt='sidenav-dashboard' className='sidenav-icon' />,
      name: "Dashboard", link: "/admin-dashboard" , 
      aicon: <img src={IMAGES.actsideNavIconDashbaord} alt='sidenav-dashboard' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconStudent} alt='sidenav-student' className='sidenav-icon' />,
      name: "Students", link: "/admin-students",
      aicon: <img src={IMAGES.actsideNavIconStudent} alt='sidenav-student' className='sidenav-icon' />
    },
    {
      icon: <img src={IMAGES.sideNavIconUsers} alt='sidenav-users' className='sidenav-icon' />,
      name: "Users", link: "/admin-users",
      aicon: <img src={IMAGES.actsideNavIconUsers} alt='sidenav-users' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconCourseCatalog} alt='sidenav-courses' className='sidenav-icon' />,
      name: "Courses", link: "/admin-course",
      aicon: <img src={IMAGES.actsideNavIconCourseCatalog} alt='sidenav-courses' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconWebinar} alt='sidenav-webinar' className='sidenav-icon' />,
      name: "Webinar", link: "/admin-webinar",
      aicon: <img src={IMAGES.actsideNavIconWebinar} alt='sidenav-webinar' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconQuestions} alt='sidenav-report' className='sidenav-icon' />,
      name: "Questions", more: [{ name: "Subjects", link: "/admin-subject-main" }, { name: "Clusters", link: "/admin-category-main" },{ name: "Questions", link: "/admin-questions-main" }],
      aicon: <img src={IMAGES.actsideNavIconQuestions} alt='sidenav-report' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconQuiz} alt='sidenav-quiz' style={{ color: "#4A6375" }} className='sidenav-icon' />,
      name: "Quiz", link: "/admin-quiz",
      aicon: <img src={IMAGES.actsideNavIconQuiz} alt='sidenav-quiz' style={{ color: "#4A6375" }} className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconForum} alt='sidenav-forum' className='sidenav-icon' />,
      name: "Forum", link: "/admin-forum",
      aicon: <img src={IMAGES.actsideNavIconForum} alt='sidenav-forum' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconMessage} alt='sidenav-message' className='sidenav-icon' />,
      name: "Message", link: "/admin-view-message",
      aicon: <img src={IMAGES.actsideNavIconMessage} alt='sidenav-message' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconVideo} alt='sidenav-video' className='sidenav-icon' />,
      name: "Video", link: "/admin-video",
      aicon: <img src={IMAGES.actsideNavIconVideo} alt='sidenav-video' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconReports} alt='sidenav-report' className='sidenav-icon' />,
      name: "Reports", more: [{ name: "Student Reports", link: "/admin-student-report" }, { name: "Payment Reports", link: "/admin-payment-report" }],
      aicon: <img src={IMAGES.actsideNavIconReports} alt='sidenav-report' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconResourses} alt='sidenav-announcement' className='sidenav-icon' />,
      name: "Resources", link: "/admin-resources",
      aicon: <img src={IMAGES.actsideNavIconResourses} alt='sidenav-announcement' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconAnnouncement} alt='sidenav-announcement' className='sidenav-icon' />,
      name: "Notification", link: "/admin-notification",
      aicon: <img src={IMAGES.actsideNavIconAnnouncement} alt='sidenav-announcement' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconPromo} alt='sidenav-profile' className='sidenav-icon' />,
      name: "Promo Code", link: "/promo-code-view",
      aicon: <img src={IMAGES.actsideNavIconPromo} alt='sidenav-profile' className='sidenav-icon' />,
    },
    {
      icon: <img  src={IMAGES.sideNavIconNewsletter} alt='sidenav-profile' className='sidenav-icon' />,
      name: "News Letter", link: "/admin-newsletter",
      aicon: <img  src={IMAGES.actsideNavIconNewsletter} alt='sidenav-profile' className='sidenav-icon' />,
    },
    {
      icon: <img  src={IMAGES.sideNavIconDocument} alt='sidenav-profile' className='sidenav-icon' />,
      name: "Document", link: "/admin-document",
      aicon: <img  src={IMAGES.actsideNavIconDocument} alt='sidenav-profile' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconProfile} alt='sidenav-profile' className='sidenav-icon' />,
      name: "Profile", link: "/profile",
      aicon: <img src={IMAGES.actsideNavIconProfile} alt='sidenav-profile' className='sidenav-icon' />,
    },
  ];

  export const studentScreens = [
    {
      icon: <img src={IMAGES.sideNavIconDashbaord} alt='sidenav-dashboard' className='sidenav-icon' />,
      name: "Dashboard", link: "/dashboard",
      aicon: <img src={IMAGES.actsideNavIconDashbaord} alt='sidenav-dashboard' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconCourseCatalog} alt='sidenav-courses' className='sidenav-icon' />,
      name: "Course Catalog", link: "/course-catalog",
      aicon: <img src={IMAGES.sideNavIconCourseCatalog} alt='sidenav-courses' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconWebinar} alt='sidenav-webinar' className='sidenav-icon' />,
      name: "Webinar Archive", link: "/webinar",
      aicon: <img src={IMAGES.actsideNavIconWebinar} alt='sidenav-webinar' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconQuiz} alt='sidenav-quiz' className='sidenav-icon' />,
      name: "Quiz", link: "/quiz",
      aicon: <img src={IMAGES.actsideNavIconQuiz} alt='sidenav-quiz' className='sidenav-icon' />,
    },
    {
      icon: <img  src={IMAGES.sideNavIconDocument} alt='sidenav-profile' className='sidenav-icon' />,
      name: "Document", link: "/document",
      aicon: <img  src={IMAGES.actsideNavIconDocument} alt='sidenav-profile' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconForum} alt='sidenav-forum' className='sidenav-icon' />,
      name: "Forum", link: "/forum",
      aicon: <img src={IMAGES.actsideNavIconForum} alt='sidenav-forum' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconMessage} alt='sidenav-message' className='sidenav-icon' />,
      name: "Message", link: "/message",
      aicon: <img src={IMAGES.actsideNavIconMessage} alt='sidenav-message' className='sidenav-icon' />,
    },
    
    {
      icon: <img src={IMAGES.resourceIcon} alt='sidenav-announcement' className='sidenav-icon' />,
      name: "Resources", link: "/resources",
      aicon: <img src={IMAGES.actresourceIcon} alt='sidenav-announcement' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconAnnouncement} alt='sidenav-announcement' className='sidenav-icon' />,
      name: "Notification", link: "/StudentNotification",
      aicon: <img src={IMAGES.actsideNavIconAnnouncement} alt='sidenav-announcement' className='sidenav-icon' />,
    },
    {
      icon: <img src={IMAGES.sideNavIconProfile} alt='sidenav-profile' className='sidenav-icon' />,
      name: "Profile", link: "/profile",
      aicon: <img src={IMAGES.actsideNavIconProfile} alt='sidenav-profile' className='sidenav-icon' />,
    },
  ];