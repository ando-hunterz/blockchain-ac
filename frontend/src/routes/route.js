import LoginPage from "../components/LoginPage.vue";
import UserPage from "../components/UserPage.vue";
import AdminPage from "../components/AdminPage.vue";
import ManageUser from "../components/ManageUser.vue";
import { baseRouteTo, hasAdminRole, isLogin } from "../utils/router-helper";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
    beforeEnter: [isLogin, baseRouteTo],
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
];

export default routes;
