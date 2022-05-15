import LoginPage from "../components/LoginPage.vue";
import UserPage from "../components/UserPage.vue";
import AdminPage from "../components/AdminPage.vue";
import ManageUser from "../components/ManageUser.vue";
import LogPage from '../components/LogAdminPage.vue';
import NotFoundPage from '../components/NotFoundPage.vue';
import { baseRouteTo, hasAdminRole, isLogin } from "../utils/router-helper";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
    beforeEnter: [baseRouteTo],
  },
  { path: "/user", name: "user", component: UserPage, beforeEnter: [isLogin] },
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
    path: "/admin/log",
    component: LogPage,
    name: 'admin-log',
    beforeEnter: [hasAdminRole, isLogin],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
    name: "not-found"
  }
];

export default routes;
