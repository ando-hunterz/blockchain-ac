import LoginPage from "../components/LoginPage.vue";
import UserPage from "../components/UserPage.vue";
import AdminPage from "../components/AdminPage.vue";
import ManageUser from "../components/ManageUser.vue";
import ErrorPage from '../components/404.vue'
import { baseRouteTo, hasAdminRole, isLogin } from "../utils/router-helper";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
    beforeEnter: [baseRouteTo],
  },
  { path: "/user", name: "user", component: UserPage, beforeEnter:[isLogin]},
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
    beforeEnter: [hasAdminRole, isLogin],
  },
  {
    path: "/admin/user",
    name: "manage-user",
    component: ManageUser,
    beforeEnter: [hasAdminRole, isLogin],
  },
  {
    path: "/404",
    component: ErrorPage
  }
];

export default routes;
