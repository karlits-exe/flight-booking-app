import { createRouter, createWebHistory } from "vue-router"
import LogIn from "../pages/LogInPage.vue"
import SignUp from "../pages/SignUpPage.vue"
import Homepage from "../pages/HomePage.vue"
import FlightsResults from "../pages/FlightsResultsPage.vue"
import AccountPage from "../pages/AccountPage.vue"
import ChangePassword from "../pages/ChangePasswordPage.vue"
import SelectSeat from "../pages/SelectSeats.vue"
import HelpPage from "../pages/HelpPage.vue"

const routes = [
  { path: "/", component: Homepage, meta: { title: 'Home | World Class' } },
  { path: "/login", component: LogIn, meta: { title: 'Log In | World Class' } },
  { path: "/signup", component: SignUp, meta: { title: 'Sign Up | World Class' } },
  { path: "/results", component: FlightsResults, meta: { title: 'Find Flights | World Class' } },
  { path: "/account", component: AccountPage, meta: { title: 'My Account | World Class' } },
  { path: "/change-password", component: ChangePassword, meta: { title: 'Change Password | World Class' } },
  { path: "/select-seat", component: SelectSeat, meta: { title: 'Select Seat | World Class' } },
  { path: "/help", component: HelpPage, meta: { title: 'Help & Contact | World Class' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'World Class';
});

export default router