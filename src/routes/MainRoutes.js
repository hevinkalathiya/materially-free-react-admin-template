import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

// const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const CourseForm = Loadable(lazy(() => import('../views/CourseForm/CourseForm.js')));
const CourseTable = Loadable(lazy(() => import('../views/CourseTable/CourseTable.jsx')));
const UpdateCourse = Loadable(lazy(() => import('../views/UpdateCourse/UpdateCourse.jsx')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/course-form', element: <CourseForm /> },
    { path: '/course-table', element: <CourseTable /> },
    { path: '/updated-course/:course-id', element: <UpdateCourse /> }
  ]
};

export default MainRoutes;
