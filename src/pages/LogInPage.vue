<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="h4 fw-bold">Log In</h1>

      <form @submit.prevent="handleLogin">
      	<p v-if="error" class="error">{{ error }}</p>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Emai / Membership ID"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="mt-4 small mb-0">Don't have an account? <router-link to="/signup">Sign up</router-link> now.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const email = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")

function handleLogin() {
  loading.value = true
  error.value = ""

  // Fake login simulation
  setTimeout(() => {
    if (email.value === "admin@test.com" && password.value === "123456") {
      alert("Login successful!")
    } else {
      error.value = "Invalid email or password"
    }

    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
}

.login-card {
  background: white;
  padding: 2rem;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

input {
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
  /*background: #2a5298;*/
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
</style>