import MyAccountPage from "../pages/Account/MyAccountPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import PostPage1 from "../pages/Post/PostPage1";
import PostPage2 from "../pages/Post/PostPage2";
import PostPage3 from "../pages/Post/PostPage3.jsx";
import RoomDetailPage from "../pages/Room/RoomDetailPage";
import RoomPage from "../pages/Room/RoomPage";
import CleaningServicePage from "../pages/Service/CleaningServicePage";
import UtilitiesPage from "../pages/Utils/UtilitiesPage";
import AboutPage from "../pages/About/AboutPage";

export const homeRoutes = [
  {
    path: "/",
    component: <HomePage />,
    exact: true,
  },
  {
    path: "/login",
    component: <LoginPage />,
  },
  {
    path: "/rooms",
    component: <RoomPage />,
  },
  {
    path: "/room/:id",
    component: <RoomDetailPage />,
  },
  {
    path: "/post/1",
    component: <PostPage1 />,
  },
  {
    path: "/post/2",
    component: <PostPage2 />,
  },
  {
    path: "/post/3",
    component: <PostPage3 />,
  },
  {
    path: "/about",
    component: <AboutPage />,
  },
  {
    path: "/utils",
    component: <UtilitiesPage />,
  },
  {
    path: "/service-clean",
    component: <CleaningServicePage />,
  },
  {
    path: "/my-account",
    component: <MyAccountPage />,
  },
];

export const dashboardRoutes = [];
