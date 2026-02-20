<template>
  <div>
    <!-- HERO SECTION -->
    <section id="landing" class="hero d-flex align-items-center text-white">
      <div class="container">
        <h1 class="fw-bold text-white">Welcome to World Class</h1>
        <p class="lead">
          Explore the skies, embrace new adventures, and plan your perfect local getaway effortlessly.
        </p>
        <a href="#discover"><button class="btn btn-primary">DISCOVER</button></a>
      </div>
    </section>

    <!-- BOOKING TABS -->
    <div id="book" class="container mt-n5 position-relative">
      <ul class="nav nav-tabs bg-dark text-white">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <button
            class="nav-link me-2"
            :class="['nav-link', activeTab === index ? 'active bg-light' : 'text-white']"
            :style="activeTab === index ? 'color: black;' : ''"
            @click="activeTab = index"
          >
            {{ tab }}
          </button>
        </li>
      </ul>

      <div class="bg-light p-4 shadow border">
        <h5 class="fw-bold">Where would you like to go?</h5>
        <hr />

        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">From</label>
            <select class="form-select" v-model="form.from">
              <option disabled value="">Select origin</option>
              <option
                v-for="(airport, index) in airports"
                :key="index"
                :value="airport"
              >
                {{ airport }}
              </option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">To</label>
            <select class="form-select" v-model="form.to">
              <option disabled value="">Select destination</option>
              <option
                v-for="(airport, index) in airports"
                :key="index"
                :value="airport"
                :disabled="airport === form.from"
              >
                {{ airport }}
              </option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Depart Date</label>
            <input
              type="date"
              class="form-control"
              v-model="form.depart"
              :min="today"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label">Return Date</label>
            <input
              type="date"
              class="form-control"
              v-model="form.return"
              :min="form.depart || today"
            />
          </div>

          <div class="col-md-4">
            <label class="form-label">Class</label>
            <select class="form-select" v-model="form.travelClass">
              <option value="Economy">Economy</option>
            </select>
          </div>

          <!-- PASSENGERS -->
          <div class="col-md-4">
            <label class="form-label">Passengers</label>
            <select class="form-select" v-model="form.passengers">
              <option
                v-for="(num, index) in passengerOptions"
                :key="index"
                :value="num"
              >
                {{ num }}
              </option>
            </select>
          </div>

          <div class="col-md-4 d-flex align-items-end">
            <router-link to="/results" custom v-slot="{ navigate }">
              <!-- <button class="btn btn-primary w-100" @click="searchFlight"> -->
              <button class="btn btn-primary w-100" @click="() => { searchFlight(); navigate(); }">
              SEARCH
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- DISCOVER SECTION -->
    <section id="discover" class="container my-5">
      <h5 class="fw-bold border-start border-3 ps-2 mb-4">
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


  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue"

import { airports } from "../constants/airports.js"

const navLinks = ref(["Link", "Link", "Link", "Link"])

const form = reactive({
  from: "Manila",
  to: "",
  depart: "",
  return: "",
  travelClass: "Economy",
  passengers: 1
})

const today = computed(() => {
  const date = new Date()
  return date.toISOString().split("T")[0]
})

const destinations = ref([
  { name: "Manila", image: "images/Manila.jpg" },
  { name: "Cebu", image: "images/Cebu.jpg" },
  { name: "Bohol", image: "images/Bohol.jpg" },
  { name: "Palawan", image: "images/Palawan.jpg" },
  { name: "Davao", image: "images/Davao.jpg" },
  { name: "Ilocos", image: "images/Ilocos.jpg" },
  { name: "Albay", image: "images/Albay.jpg" },
  { name: "Siargao", image: "images/Siargao.jpg" }
])

const tabs = ref([
  "BOOK TRIP",
  "MANAGE BOOKING",
  "CHECK IN",
  "FLIGHT STATUS",
  "FLIGHT SCHEDULE"
])

const activeTab = ref(0)

const passengerOptions = ref(
  Array.from({ length: 10 }, (_, i) => i + 1)
)

const searchFlight = () => {
  console.log("Searching flight:", form)
}

function getFlights(from, to) {
  if (from === "Manila" || to === "Manila") {
    return directFlights[from + "-" + to]
  }

  // Otherwise connect via Manila
  return buildConnectingFlight(from, "Manila", to)
}
</script>
