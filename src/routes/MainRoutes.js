import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

// const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const CourseForm = Loadable(lazy(() => import('../views/CourseForm')));
const CourseTable = Loadable(lazy(() => import('../views/CourseTable/CourseTable.jsx')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '/',
    //   element: <DashboardDefault />
    // },
    // { path: '/utils/util-typography', element: <UtilsTypography /> },
    // {
    //   path: '/dashboard/default',
    //   element: <DashboardDefault />
    // },
    // {
    //   path: '/dashboard/default',
    //   element: <DashboardDefault />
    // },
    { path: '/course-form', element: <CourseForm /> },
    { path: '/course-table', element: <CourseTable /> }
  ]
};

export default MainRoutes;
