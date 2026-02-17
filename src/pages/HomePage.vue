<template>
  <div>

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-warning" href="#">Logo</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto ms-4">
            <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
              <a class="nav-link text-white" href="#">{{ link }}</a>
            </li>
          </ul>

          <div>
            <button class="btn btn-outline-light me-2">Login</button>
            <button class="btn btn-light text-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero d-flex align-items-center text-white">
      <div class="container">
        <h1 class="fw-bold">Welcome to World Class</h1>
        <p class="lead">
          Explore the skies, embrace new adventures, and plan your perfect local getaway effortlessly.
        </p>
        <button class="btn btn-primary">DISCOVER MORE</button>
      </div>
    </section>

    <!-- BOOKING TABS -->
    <div class="container mt-n5 position-relative">
      <div class="bg-dark text-white p-3 d-flex justify-content-between">
        <span v-for="(tab, index) in tabs" :key="index" class="px-3">
          {{ tab }}
        </span>
      </div>

      <div class="bg-light p-4 shadow border">
        <h5 class="fw-bold text-primary">Where would you like to go?</h5>
        <hr />

        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">From</label>
            <input type="text" class="form-control" v-model="form.from" />
          </div>

          <div class="col-md-3">
            <label class="form-label">To</label>
            <input type="text" class="form-control" v-model="form.to" />
          </div>

          <div class="col-md-2">
            <label class="form-label">Depart Date</label>
            <input type="date" class="form-control" v-model="form.depart" />
          </div>

          <div class="col-md-2">
            <label class="form-label">Return Date</label>
            <input type="date" class="form-control" v-model="form.return" />
          </div>

          <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-primary w-100" @click="searchFlight">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DISCOVER SECTION -->
    <section class="container my-5">
      <h5 class="fw-bold text-primary border-start border-3 ps-2 mb-4">
        Discover
      </h5>

      <div class="row g-4">
        <div
          class="col-md-3"
          v-for="(place, index) in destinations"
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <img :src="place.image" class="card-img-top" />
            <div class="card-body">
              <h6 class="fw-bold">{{ place.name }}</h6>
              <small class="text-muted">Economy</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-primary text-white pt-4 pb-3">
      <div class="container">
        <div class="row">

          <div class="col-md-4">
            <h6 class="fw-bold">About Us</h6>
            <p class="small mb-1">Developers</p>
            <p class="small mb-1">Legal Notices</p>
            <p class="small mb-1">Special offers</p>
            <p class="small">Help Center</p>
          </div>

          <div class="col-md-4">
            <h6 class="fw-bold">Contact Us</h6>
            <p class="small mb-1">02-4321-8769</p>
            <p class="small">+63 9123 123 4321</p>
          </div>

          <div class="col-md-4">
            <h6 class="fw-bold">Connect with us</h6>
            <div class="d-flex gap-3 fs-5">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-linkedin"></i>
              <i class="bi bi-instagram"></i>
            </div>
          </div>

        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

const navLinks = ref(["Link", "Link", "Link", "Link"])

const tabs = ref([
  "BOOK TRIP",
  "MANAGE BOOKING",
  "CHECK IN",
  "FLIGHT STATUS",
  "FLIGHT SCHEDULE"
])

const form = reactive({
  from: "Manila",
  to: "",
  depart: "",
  return: ""
})

const destinations = ref([
  { name: "Manila", image: "https://source.unsplash.com/400x300/?city" },
  { name: "Cebu", image: "https://source.unsplash.com/400x300/?island" },
  { name: "Bohol", image: "https://source.unsplash.com/400x300/?hills" },
  { name: "Palawan", image: "https://source.unsplash.com/400x300/?beach" },
  { name: "Davao", image: "https://source.unsplash.com/400x300/?river" },
  { name: "Ilocos", image: "https://source.unsplash.com/400x300/?windmill" },
  { name: "Albay", image: "https://source.unsplash.com/400x300/?volcano" },
  { name: "Siargao", image: "https://source.unsplash.com/400x300/?tropical" }
])

const searchFlight = () => {
  console.log("Searching flight:", form)
}
</script>

<style scoped>
.hero {
  height: 450px;
  background: url("https://source.unsplash.com/1600x900/?travel,airport")
    center/cover no-repeat;
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero .container {
  position: relative;
  z-index: 2;
}

.mt-n5 {
  margin-top: -50px;
}
</style>
