import { createRouter, createWebHistory } from "vue-router"
import LogIn from "../pages/LogInPage.vue"
import SignUp from "../pages/SignUpPage.vue"
import Homepage from "../pages/HomePage.vue"
import FlightsResults from "../pages/FlightsResultsPage.vue"

const routes = [
  { path: "/", component: Homepage, meta: { title: 'Home | World Class' } },
  { path: "/login", component: LogIn, meta: { title: 'Log In | World Class' } },
  { path: "/signup", component: SignUp, meta: { title: 'Sign Up | World Class' } },
  { path: "/results", component: FlightsResults, meta: { title: 'Find Flights | World Class' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'World Class';
});

export default router