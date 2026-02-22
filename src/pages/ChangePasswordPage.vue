<template>
  <div class="change-password-container d-flex justify-content-center py-5 px-4">
    <div class="change-password-card col-12 col-md-8 col-lg-6">
      <!-- Header with Back Button -->
      <div class="d-flex align-items-center mb-4">
        <h1 class="h4 fw-bold mb-0">Change Password</h1>
      </div>

      <p class="text-muted mb-4">
        To set a new password, please enter your current one.
      </p>

      <form @submit.prevent="handleChangePassword">
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <!-- Current Password -->
        <div class="form-group">
          <label>Current Password</label>
          <div class="password-input-wrapper">
            <input
              v-model="currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter your current password"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              <i :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <!-- New Password -->
        <div class="form-group">
          <label>New Password</label>
          <div class="password-input-wrapper">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="At least 8 characters"
              required
              minlength="8"
              @input="checkPasswordStrength"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showNewPassword = !showNewPassword"
            >
              <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          
          <!-- Password Strength Indicator -->
          <div v-if="newPassword" class="password-strength mt-2">
            <div class="strength-bar">
              <div
                class="strength-fill"
                :class="strengthClass"
                :style="{ width: strengthWidth }"
              ></div>
            </div>
            <p class="strength-text small mt-1 text-white p-2 text-center" :class="strengthClass">
              {{ strengthText }}
            </p>
          </div>
        </div>

        <!-- Password Requirements -->
        <div class="password-requirements mb-3">
          <p class="small text-muted mb-2">Password must contain at least:</p>
          <ul class="small">
            <li :class="{ 'requirement-met': hasMinLength }">
              <i :class="hasMinLength ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle'"></i>
              Eight characters
            </li>
            <li :class="{ 'requirement-met': hasUpperCase }">
              <i :class="hasUpperCase ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle'"></i>
              One uppercase letter
            </li>
            <li :class="{ 'requirement-met': hasLowerCase }">
              <i :class="hasLowerCase ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle'"></i>
              One lowercase letter
            </li>
            <li :class="{ 'requirement-met': hasNumber }">
              <i :class="hasNumber ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle'"></i>
              One number
            </li>
          </ul>
        </div>

        <!-- Confirm New Password -->
        <div class="form-group">
          <label>Confirm New Password</label>
          <div class="password-input-wrapper">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Re-enter your new password"
              required
              minlength="8"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-4">
          <button type="submit" class="btn btn-primary w-100" :disabled="loading || !isPasswordValid">
            {{ loading ? "Changing Password..." : "Change Password" }}
          </button>
        </div>
      </form>

      <!-- Cancel Link -->
      <div class="mt-3 text-center">
        <router-link to="/account" class="text-muted small">
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const loading = ref(false)
const error = ref("")
const success = ref("")

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength
const passwordStrength = ref(0)

// Password requirements
const hasMinLength = computed(() => newPassword.value.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(newPassword.value))
const hasLowerCase = computed(() => /[a-z]/.test(newPassword.value))
const hasNumber = computed(() => /[0-9]/.test(newPassword.value))

const isPasswordValid = computed(() => {
  return hasMinLength.value && hasUpperCase.value && hasLowerCase.value && hasNumber.value
})

const strengthClass = computed(() => {
  if (passwordStrength.value <= 25) return "strength-weak"
  if (passwordStrength.value <= 50) return "strength-fair"
  if (passwordStrength.value <= 75) return "strength-good"
  return "strength-strong"
})

const strengthWidth = computed(() => `${passwordStrength.value}%`)

const strengthText = computed(() => {
  if (passwordStrength.value <= 25) return "Weak password"
  if (passwordStrength.value <= 50) return "Fair password"
  if (passwordStrength.value <= 75) return "Good password"
  return "Strong password"
})

function checkPasswordStrength() {
  let strength = 0
  
  if (newPassword.value.length >= 8) strength += 25
  if (/[A-Z]/.test(newPassword.value)) strength += 25
  if (/[a-z]/.test(newPassword.value)) strength += 25
  if (/[0-9]/.test(newPassword.value)) strength += 25
  
  // Bonus points for special characters and length
  if (/[^A-Za-z0-9]/.test(newPassword.value)) strength = Math.min(100, strength + 10)
  if (newPassword.value.length >= 12) strength = Math.min(100, strength + 10)
  
  passwordStrength.value = strength
}

function goBack() {
  router.push("/my-details")
}

function handleChangePassword() {
  loading.value = true
  error.value = ""
  success.value = ""

  // Simulate API call
  setTimeout(() => {
    // Validation
    if (!currentPassword.value) {
      error.value = "Please enter your current password"
    } else if (!isPasswordValid.value) {
      error.value = "New password does not meet requirements"
    } else if (newPassword.value !== confirmPassword.value) {
      error.value = "New passwords do not match"
    } else if (newPassword.value === currentPassword.value) {
      error.value = "New password must be different from current password"
    } else if (currentPassword.value !== "oldpassword123") {
      // Mock validation - checking current password
      error.value = "Current password is incorrect"
    } else {
      success.value = "Password changed successfully! Redirecting..."
      
      // Reset form
      currentPassword.value = ""
      newPassword.value = ""
      confirmPassword.value = ""
      passwordStrength.value = 0
      
      setTimeout(() => {
        router.push("/my-details")
      }, 2000)
    }

    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.change-password-container {
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
}

.change-password-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #1e3c72;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #495057;
}

.password-input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 0.6rem;
  padding-right: 2.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
}

.password-toggle:hover {
  color: #2a5298;
}


.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-weak {
  background-color: #dc3545;
  color: #dc3545;
}

.strength-fair {
  background-color: #ffc107;
  color: #ffc107;
}

.strength-good {
  background-color: #17a2b8;
  color: #17a2b8;
}

.strength-strong {
  background-color: #28a745;
  color: #28a745;
}

.strength-text {
  font-weight: 500;
  margin-top: 0.25rem;
}

/* Password Requirements */
.password-requirements ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.password-requirements li {
  padding: 0.25rem 0;
  color: #6c757d;
  transition: color 0.2s;
}

.password-requirements li.requirement-met {
  color: #28a745;
}

.password-requirements i {
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

button {
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.btn-link {
  color: #2a5298;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-link:hover {
  color: #1e3c72;
}

.error {
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
}

.success {
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #155724;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}


@media (max-width: 768px) {
  .change-password-card {
    padding: 1.5rem;
  }
}
</style>