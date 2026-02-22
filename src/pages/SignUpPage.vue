<template>
  <div class="register-container d-flex justify-content-center py-5 px-4">
    <div class="register-card col-12 col-md-6">
      <h1 class="h4 fw-bold mb-4">Sign Up</h1>

      <form @submit.prevent="handleRegister">
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <h2 class="h5">Personal Information</h2>

        <!-- Title Dropdown -->
        <div class="form-group col-12 col-md-6">
        	<label>Title</label>
          <select v-model="title" required>
            <option value="" disabled>Select Title</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
            <option>Mdm</option>
            <option>Ms</option>
            <option>Mstr</option>
            <option>Dr</option>
            <option>Prof</option>
          </select>
        </div>

        <div class="form-group">
        	<label>First Name</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="First / Given Name (as in passport)"
            required
          />
        </div>

        <div class="form-group">
        	<label>Last Name</label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last / Family Name (as in passport)"
            required
          />
        </div>

        <!-- Date of Birth -->
        <div class="form-group col-12 col-md-6">
        	<label>Date of Birth</label>
          	<div class="row g-2">
			  <div class="col-md-4">
			    <select class="form-select" v-model="selectedDay" required>
			      <option value="" disabled>Day</option>
			      <option v-for="day in days" :key="day" :value="day">
			        {{ day }}
			      </option>
			    </select>
			  </div>

			  <div class="col-md-4">
			    <select class="form-select" v-model="selectedMonth" required>
			      <option value="" disabled>Month</option>
			      <option
			        v-for="month in months"
			        :key="month.value"
			        :value="month.value"
			      >
			        {{ month.label }}
			      </option>
			    </select>
			  </div>

			  <div class="col-md-4">
			    <select class="form-select" v-model="selectedYear" required>
			      <option value="" disabled>Year</option>
			      <option v-for="year in years" :key="year" :value="year">
			        {{ year }}
			      </option>
			    </select>
			  </div>
			</div>
        </div>

        <h2 class="h5 mt-4">Contact Details</h2>

        <div class="form-group col-12 col-md-6">
        	<label>Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter a valid email address"
            required
          />
        </div>

        <!-- Mobile Number -->
        <div class="form-group col-12 col-md-6">
        	<label>Mobile Number</label>
          <input
            v-model="mobile"
            type="tel"
            placeholder="11 digits"
            pattern="[0-9]{11}"
            required
            minlength="11"
          />
        </div>

        <h2 class="h5 mt-4">Set Password</h2>

        <div class="form-group col-12 col-md-6">
        	<label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="At least 8 characters"
            required
            minlength="8"
          />
        </div>

        <div class="form-group col-12 col-md-6">
        	<label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Enter password again"
            required
            minlength="8"
          />
        </div>

         <div class="form-group col-12 col-md-6">
	        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
	          {{ loading ? "Registering..." : "Register" }}
	        </button>
	    </div>
      </form>

      <p class="mt-4 small mb-0">Already have an account? <router-link to="/login">Log in</router-link> now.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const title = ref("")
const firstName = ref("")
const lastName = ref("")
const dob = ref("")
const email = ref("")
const mobile = ref("")
const password = ref("")
const confirmPassword = ref("")
const loading = ref(false)
const error = ref("")
const success = ref("")

const selectedDay = ref("")
const selectedMonth = ref("")
const selectedYear = ref("")

const currentYear = new Date().getFullYear()

// Allow 100 years back, but minimum age 2
const years = computed(() => {
  const arr = []
  for (let y = currentYear - 2; y >= currentYear - 100; y--) {
    arr.push(y)
  }
  return arr
})

const months = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" }
]

// Simple 1–31 list
const days = computed(() => {
  return Array.from({ length: 31 }, (_, i) => i + 1)
})

function handleRegister() {
  loading.value = true
  error.value = ""
  success.value = ""

  setTimeout(() => {
    // Basic validations
    if (!title.value) {
      error.value = "Please select a title"
    } else if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match"
    } else if (!email.value.includes("@")) {
      error.value = "Invalid email"
    } else if (!/^\d{10,15}$/.test(mobile.value)) {
      error.value = "Mobile number must be 10-15 digits"
    } else {
      success.value = "Registration successful!"
      // Reset fields
      title.value = ""
      firstName.value = ""
      lastName.value = ""
      dob.value = ""
      email.value = ""
      mobile.value = ""
      password.value = ""
      confirmPassword.value = ""
    }
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.register-container {
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>