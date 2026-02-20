<template>
  <div class="register-container d-flex justify-content-center py-5">
    <div class="register-card col-12 col-md-6">
      <h1 class="h4 fw-bold">Sign Up</h1>

      <form @submit.prevent="handleRegister">
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <h2 class="h5">Personal Information</h2>

        <!-- Title Dropdown -->
        <div class="form-group col-12 col-md-4">
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
        <div class="form-group col-12 col-md-4">
        	<label>Date of Birth</label>
          <input
            v-model="dob"
            type="date"
            placeholder="Date of Birth"
            required
          />
        </div>

        <h2 class="h5 mt-4">Contact Details</h2>

        <div class="form-group">
        	<label>Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter a valid email address"
            required
          />
        </div>

        <!-- Mobile Number -->
        <div class="form-group">
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

        <div class="form-group col-12 col-md-4">
        	<label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="At least 8 characters"
            required
            minlength="8"
          />
        </div>

        <div class="form-group col-12 col-md-4">
        	<label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Enter password again"
            required
            minlength="8"
          />
        </div>

         <div class="form-group col-12 col-md-4">
	        <button type="submit" class="btn btn-primary" :disabled="loading">
	          {{ loading ? "Registering..." : "Register" }}
	        </button>
	    </div>
      </form>
      
      <p class="mt-4 small">Already have an account? <router-link to="/login">Log in</router-link> now.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

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

h1 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

input,
select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #999;
}

.error {
  margin-top: 1rem;
  color: red;
  text-align: center;
}

.success {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
</style>