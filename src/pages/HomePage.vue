<template>
  <div>
    <!-- HERO SECTION -->
    <section id="landing" class="hero d-flex align-items-center text-white text-md-start text-center">
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
      <ul class="nav nav-tabs bg-dark text-white flex-wrap">
        <li class="nav-item col-6 col-md-auto" v-for="(tab, index) in tabs" :key="index">
          <button
            class="nav-link me-2 w-100 text-center"
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

      <form @submit.prevent="handleSearch">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">From</label>
            <select class="form-select" v-model="form.from" required>
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
            <select class="form-select" v-model="form.to" required>
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
              required
            />
          </div>

          <div class="col-md-3">
            <label class="form-label">Return Date <input 
              class="form-check-input ms-3 me-1" 
              type="checkbox" 
              id="oneWayCheck" 
              v-model="form.oneWay"
            /> One way</label>
            <input
              type="date"
              class="form-control"
              v-model="form.return"
              :min="form.depart || today"
              :disabled="form.oneWay"
              :required="!form.oneWay"
            />
          </div>

          <div class="col-md-2">
            <label class="form-label">Class</label>
            <select class="form-select" v-model="form.travelClass">
              <option value="Economy">Economy</option>
            </select>
          </div>

          <!-- PASSENGERS -->
          <div class="col-md-6">
            <label class="form-label">Passengers</label>

            <div class="row g-2">
              <div class="col-6">
                <select class="form-select" v-model="form.adults">
                  <option value="" disabled>12 years and older</option>
                  <option v-for="num in adultOptions" :key="'a'+num" :value="num">
                    {{ num }} Adult{{ num > 1 ? 's' : '' }}
                  </option>
                </select>
              </div>

              <div class="col-6">
                <select class="form-select" v-model="form.children">
                  <option value="" disabled>2 to 11 years old</option>
                  <option v-for="num in childOptions" :key="'c'+num" :value="num">
                    {{ num }} Child{{ num === 1 ? '' : 'ren' }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-md-4 d-flex align-items-end">
            <button type="submit" class="btn btn-primary w-100">
              SEARCH
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>

    <!-- DISCOVER SECTION -->
    <section id="discover" class="container my-5">
      <h5 class="fw-bold border-start border-3 ps-2 mb-4">
        Discover our destinations
      </h5>

      <div class="row g-4">
        <div
          class="col-md-3 col-sm-6 col-12"
          v-for="(place, index) in destinations"
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <a :href="place.url"><img :src="place.image" class="card-img-top" /></a>
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
import { reactive, ref, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { airports } from "../constants/airports.js"

const router = useRouter()

// NAVIGATION
const navLinks = ref(["Link", "Link", "Link", "Link"])


// BOOKING BOX
const tabs = ref([
  "BOOK TRIP",
  "MANAGE BOOKING",
  "CHECK IN",
  "FLIGHT STATUS",
  // "FLIGHT SCHEDULE"
])

// Disable past dates
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split("T")[0]
})

// Default values for Depature and Return Dates
function formatDateForInput(date) {
  return date.toISOString().split("T")[0]  // "YYYY-MM-DD"
}

const todayDate = new Date()
const departDate = formatDateForInput(todayDate)

const returnDateObj = new Date()
returnDateObj.setDate(todayDate.getDate() + 3)  // +3 days
const returnDate = formatDateForInput(returnDateObj)

// Adult and Children - limited to 10
const adultOptions = Array.from({ length: 10 }, (_, i) => i + 1)   // 1–9
const childOptions = Array.from({ length: 11 }, (_, i) => i)      // 0–9

// Set values in the form
const form = reactive({
  from: "Manila",
  to: "Cebu",
  depart: departDate,
  return: returnDate, 
  travelClass: "Economy",
  adults: 1,
  children: 0,
  oneWay: false
})

// DISCOVER
const destinations = ref([
  { name: "Manila", image: "images/Manila.jpg", url: "/results?from=Manila" },
  { name: "Cebu", image: "images/Cebu.jpg", url: "/results?from=Cebu" },
  { name: "Bohol", image: "images/Bohol.jpg", url: "/results?from=Bohol" },
  { name: "Puerto Princesa", image: "images/Palawan.jpg", url: "/results?from=Puerto+Princesa" },
  { name: "Davao", image: "images/Davao.jpg", url: "/results?from=Davao" },
  { name: "Ilocos Norte", image: "images/Ilocos.jpg", url: "/results?from=Ilocos+Norte" },
  { name: "Albay", image: "images/Albay.jpg", url: "/results?from=Albay" },
  { name: "Siargao", image: "images/Siargao.jpg", url: "/results?from=Siargao" }
])

const activeTab = ref(0)

// Reset the destination when origin is changed
watch(() => form.from, (newFrom) => {
  if (form.to === newFrom) {
    form.to = ""
  }
})

// Automatically update return date when departure changes
watch(
  () => form.depart,
  (newDepart) => {
    if (!newDepart || form.oneWay) return; // <-- skip if oneWay

    const departDate = new Date(newDepart);
    const returnDateObj = new Date(departDate);
    returnDateObj.setDate(departDate.getDate() + 3);

    form.return = returnDateObj.toISOString().split("T")[0];
  }
);

// Check if one way
watch(() => form.oneWay, (isOneWay) => {
  if (isOneWay) form.return = ""
  else {
    // restore default return date +3 days
    const departDateObj = new Date(form.depart)
    departDateObj.setDate(departDateObj.getDate() + 3)
    form.return = departDateObj.toISOString().split("T")[0]
  }
})

// Search button to redirect to /results
const handleSearch = () => {
  router.push({
    path: "/results",
    query: {
      from: form.from,
      to: form.to,
      depart: form.depart,
      return: form.return,
      travelClass: form.travelClass,
      adults: form.adults,
      children: form.children,
      oneWay: form.oneWay
    }
  })
}
</script>
