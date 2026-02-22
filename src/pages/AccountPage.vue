<template>
  <div class="mydetails-container d-flex justify-content-center py-5 px-4">
    <div class="mydetails-card col-12 col-md-8 col-lg-6">
      <!-- Header with Back Button -->
      <!-- <div class="d-flex align-items-center mb-3">
        <button @click="goBack" class="btn btn-link text-decoration-none p-0 me-3">
          <i class="bi bi-arrow-left"></i> Back
        </button>
      </div> -->

      <!-- Profile Picture Section -->
      <div class="text-center mt-0 mb-5">
        <div class="profile-picture-wrapper">
          <img 
            :src="userData.profilePicture || '/images/pilot2.jpg'" 
            alt="Profile Picture"
            class="profile-picture"
          />
          <button 
            v-if="isEditing" 
            @click="triggerFileUpload"
            class="change-photo-btn"
            type="button"
          >
            <i class="bi bi-camera"></i>
          </button>
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*"
            @change="handleFileUpload"
            style="display: none"
          />
        </div>
        <p class="fw-bold h5 mt-2 mb-2">{{ userData.firstName }} {{ userData.lastName }}</p>
        <p class="h6"><strong>Membership ID:</strong> {{ userData.membershipId }}</p>
        <p class="h6"><strong>Member since:</strong> {{ userData.memberSince }}</p>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h4 fw-bold mb-0">My Account</h1>
        <button 
          v-if="!isEditing" 
          @click="toggleEdit" 
          class="btn btn-outline-primary btn-sm"
        >
          <i class="bi bi-pencil"></i> Edit Profile
        </button>
      </div>

      <form @submit.prevent="handleSave">
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <!-- Personal Information Section -->
        <div class="section-header">
          <h2 class="h5 mb-3">Personal Information</h2>
        </div>

        <div class="row">
          <!-- Title -->
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label>Title</label>
              <select v-model="formData.title" :disabled="!isEditing" required>
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
          </div>
        </div>

        <!-- First Name -->
        <div class="form-group">
          <label>First Name</label>
          <input
            v-model="formData.firstName"
            type="text"
            placeholder="First / Given Name (as in passport)"
            :disabled="!isEditing"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label>Last Name</label>
          <input
            v-model="formData.lastName"
            type="text"
            placeholder="Last / Family Name (as in passport)"
            :disabled="!isEditing"
            required
          />
        </div>

        <!-- Date of Birth -->
        <div class="form-group">
          <label>Date of Birth</label>
          <div class="row g-2">
            <div class="col-4">
              <select class="form-select" v-model="formData.day" :disabled="!isEditing" required>
                <option value="" disabled>Day</option>
                <option v-for="day in days" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>

            <div class="col-4">
              <select class="form-select" v-model="formData.month" :disabled="!isEditing" required>
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

            <div class="col-4">
              <select class="form-select" v-model="formData.year" :disabled="!isEditing" required>
                <option value="" disabled>Year</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Contact Details Section -->
        <div class="section-header mt-4">
          <h2 class="h5 mb-3">Contact Details</h2>
        </div>

        <!-- Email Address -->
        <div class="form-group">
          <label>Email Address</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Enter a valid email address"
            :disabled="!isEditing"
            required
          />
        </div>

        <!-- Mobile Number -->
        <div class="form-group">
          <label>Mobile Number</label>
          <input
            v-model="formData.mobile"
            type="tel"
            placeholder="11 digits"
            pattern="[0-9]{11}"
            :disabled="!isEditing"
            required
            minlength="11"
          />
        </div>

        <!-- Account Settings Section -->
        <div class="section-header mt-4">
          <h2 class="h5 mb-3">Account Settings</h2>
        </div>

        <div class="password-section">
          <p class="mb-2">
            <i class="bi bi-lock"></i> 
            <strong>Password</strong>
          </p>
          <p class="text-muted small mb-3">Last changed: {{ userData.lastPasswordChange }}</p>
          <router-link to="/change-password" class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-key"></i> Change Password
          </router-link>
        </div>

        <!-- Last Login Info -->
        <div class="login-info mt-3 p-3 bg-light rounded">
          <p class="mb-1">
            <i class="bi bi-clock-history"></i>
            <strong class="ms-2">Last Login</strong>
          </p>
          <p class="text-muted small mb-0">{{ userData.lastLogin }}</p>
        </div>

        <!-- Action Buttons (Only show in edit mode) -->
        <div v-if="isEditing" class="action-buttons mt-4">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? "Saving..." : "Save Changes" }}
          </button>
          <button type="button" @click="cancelEdit" class="btn btn-outline-secondary ms-2">
            Cancel
          </button>
        </div>
      </form>

      <!-- Additional Actions -->
      <div class="mt-4 pt-3 border-top">
        <p class="small text-muted mb-0">Need help? <a href="#">Contact support</a> now.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

// Mock user data 
const userData = reactive({
  membershipId: "WC2024-12345",
  profilePicture: "",
  title: "Mr",
  firstName: "John",
  lastName: "Doe",
  day: 15,
  month: 6,
  year: 1990,
  email: "john.doe@example.com",
  mobile: "09171234567",
  memberSince: "January 2024",
  lastPasswordChange: "December 15, 2024",
  lastLogin: "February 21, 2026 at 7:15 PM"
})

// Form data (for editing)
const formData = reactive({
  title: userData.title,
  firstName: userData.firstName,
  lastName: userData.lastName,
  day: userData.day,
  month: userData.month,
  year: userData.year,
  email: userData.email,
  mobile: userData.mobile
})

const isEditing = ref(false)
const loading = ref(false)
const error = ref("")
const success = ref("")
const fileInput = ref(null)

// Date dropdowns
const currentYear = new Date().getFullYear()

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

const days = computed(() => {
  return Array.from({ length: 31 }, (_, i) => i + 1)
})

function goBack() {
  router.push("/") // Can change to trip page (if the page is created)
}

function triggerFileUpload() {
  fileInput.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      error.value = "Image must be smaller than 2MB"
      return
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      error.value = "Please upload an image file"
      return
    }
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.profilePicture = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function toggleEdit() {
  isEditing.value = true
  error.value = ""
  success.value = ""
}

function cancelEdit() {
  // Reset form data to original values
  formData.title = userData.title
  formData.firstName = userData.firstName
  formData.lastName = userData.lastName
  formData.day = userData.day
  formData.month = userData.month
  formData.year = userData.year
  formData.email = userData.email
  formData.mobile = userData.mobile
  
  isEditing.value = false
  error.value = ""
  success.value = ""
}

function handleSave() {
  loading.value = true
  error.value = ""
  success.value = ""

  // Simulate API call
  setTimeout(() => {
    // Basic validation
    if (!formData.email.includes("@")) {
      error.value = "Invalid email address"
    } else if (!/^\d{11}$/.test(formData.mobile)) {
      error.value = "Mobile number must be exactly 11 digits"
    } else {
      // Update user data
      userData.title = formData.title
      userData.firstName = formData.firstName
      userData.lastName = formData.lastName
      userData.day = formData.day
      userData.month = formData.month
      userData.year = formData.year
      userData.email = formData.email
      userData.mobile = formData.mobile

      success.value = "Profile updated successfully!"
      isEditing.value = false

      setTimeout(() => {
        success.value = ""
      }, 3000)
    }

    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.mydetails-container {
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
}

.mydetails-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #1e3c72;
}

.btn-link {
  color: #2a5298;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-link:hover {
  color: #1e3c72;
}

/* Profile Picture */
.profile-picture-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #2a5298;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.change-photo-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2a5298;
  color: white;
  border: 3px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.change-photo-btn:hover {
  background: #1e3c72;
  transform: scale(1.1);
}

.change-photo-btn i {
  font-size: 1rem;
}

.section-header {
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.section-header h2 {
  color: #2a5298;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #495057;
}

input,
select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

input:disabled,
select:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.disabled-field {
  background-color: #e9ecef !important;
  font-weight: 500;
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

.btn-outline-primary {
  border: 1px solid #2a5298;
  color: #2a5298;
  background: white;
}

.btn-outline-primary:hover {
  background: #2a5298;
  color: white;
}

.btn-outline-secondary {
  border: 1px solid #6c757d;
  color: #6c757d;
  background: white;
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-buttons .btn-primary {
  flex: 1;
}

.password-section {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 5px;
  border-left: 3px solid #2a5298;
}

.login-info {
  font-size: 0.9rem;
}

.login-info i {
  color: #2a5298;
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

/* Responsive */
@media (max-width: 768px) {
  .mydetails-card {
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .btn {
    width: 100%;
  }
}
</style>