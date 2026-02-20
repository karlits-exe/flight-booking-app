import { createRouter, createWebHistory } from "vue-router"
import LogIn from "../pages/LogInPage.vue"
import SignUp from "../pages/SignUpPage.vue"
import Homepage from "../pages/Homepage.vue"
import FlightsResults from "../pages/FlightsResultsPage.vue"

const routes = [
  { path: "/", component: Homepage },
  { path: "/login", component: LogIn },
  { path: "/signup", component: SignUp },
  { path: "/results", component: FlightsResults }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router