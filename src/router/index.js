import { createRouter, createWebHistory } from "vue-router"
import LogIn from "../pages/LogInPage.vue"
import SignUp from "../pages/SignUpPage.vue"
import Homepage from "../pages/HomePage.vue"
import FlightsResults from "../pages/FlightsResultsPage.vue"
import MyDetails from "../pages/MyDetailsPage.vue"
import ChangePassword from "../pages/ChangePasswordPage.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/login", component: LogIn },
  { path: "/signup", component: SignUp },
  { path: "/results", component: FlightsResults },
  { path: "/my-details", component: MyDetails },
  { path: "/change-password", component: ChangePassword }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router