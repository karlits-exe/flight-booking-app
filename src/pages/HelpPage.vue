<template>
  <!-- Page Header -->
  <div class="bg-primary text-white py-5">
    <div class="container px-4">
      <h1 class="mb-2">Help & Contact</h1>
      <p class="mb-0" style="color: #D2EA1F;">We're here to help you fly with confidence.</p>
    </div>
  </div>

  <div class="container px-4 my-5">

    <!-- FAQ Section -->
    <div class="row g-4 mb-5">
      <div class="col-12">
        <h2 class="h4 mb-4">Frequently Asked Questions</h2>

        <div class="accordion border" id="faqAccordion">

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How do I book a flight?
              </button>
            </h2>
            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                Go to <strong>Find Flights</strong> from the navigation menu, enter your origin, destination, travel dates, and number of passengers, then click Search. Select your preferred flight and follow the booking steps.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                Can I change or cancel my booking?
              </button>
            </h2>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                Yes. You can manage your booking by going to <strong>My Account</strong>. Changes and cancellations are subject to our fare rules. Cancellations made at least 24 hours before departure are eligible for a refund or travel credit.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                What is the baggage allowance?
              </button>
            </h2>
            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                Economy Class passengers are allowed 1 carry-on bag (7kg) and 1 checked bag (20kg). Additional baggage can be added as an add-on during the booking process.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                How early should I arrive at the airport?
              </button>
            </h2>
            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                We recommend arriving at least <strong>2 hours</strong> before your domestic flight. Online check-in opens 24 hours before departure and closes 1 hour before.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                How do I choose my seat?
              </button>
            </h2>
            <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                Seat selection is available during the booking process on the <strong>Select Seat</strong> step. You may also change your seat through <strong>My Account</strong> any time before check-in closes.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
                What payment methods are accepted?
              </button>
            </h2>
            <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body text-muted">
                We accept Visa, Mastercard, GCash, Maya, and bank transfers. All transactions are encrypted and secure.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <hr class="my-5" />

    <!-- Contact Section -->
    <div class="row g-5">

      <!-- Contact Info -->
      <div class="col-lg-5">
        <h2 class="h4 mb-4">Get in Touch</h2>
        <p class="text-muted mb-4">Our support team is available 7 days a week to assist you with your travel needs.</p>

        <div class="mb-4 d-flex align-items-start gap-3">
          <div class="contact-icon bg-primary text-white">
            <i class="bi bi-telephone-fill"></i>
          </div>
          <div>
            <div class="fw-bold mb-1">Phone Support</div>
            <div class="text-muted small">+63 2 8888 0000</div>
            <div class="text-muted small">Mon – Sun, 6:00 AM – 10:00 PM PHT</div>
          </div>
        </div>

        <div class="mb-4 d-flex align-items-start gap-3">
          <div class="contact-icon bg-primary text-white">
            <i class="bi bi-envelope-fill"></i>
          </div>
          <div>
            <div class="fw-bold mb-1">Email Support</div>
            <div class="text-muted small">support@worldclassair.com</div>
            <div class="text-muted small">Response within 24 hours</div>
          </div>
        </div>

        <div class="mb-4 d-flex align-items-start gap-3">
          <div class="contact-icon bg-primary text-white">
            <i class="bi bi-chat-dots-fill"></i>
          </div>
          <div>
            <div class="fw-bold mb-1">Live Chat</div>
            <div class="text-muted small">Available on our website and app</div>
            <div class="text-muted small">Mon – Sun, 8:00 AM – 8:00 PM PHT</div>
          </div>
        </div>

        <div class="mb-4 d-flex align-items-start gap-3">
          <div class="contact-icon bg-primary text-white">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div>
            <div class="fw-bold mb-1">Ticket Office</div>
            <div class="text-muted small">NAIA Terminal 1, Pasay City, Metro Manila</div>
            <div class="text-muted small">Open daily, 5:00 AM – 9:00 PM PHT</div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="col-lg-7">
        <h2 class="h4 mb-4">Send Us a Message</h2>

        <div v-if="submitted" class="alert alert-success py-3 mb-4">
          <i class="bi bi-check-circle-fill me-2"></i>
          Thank you! Your message has been sent. We'll get back to you within 24 hours.
        </div>

        <form @submit.prevent="handleSubmit" v-if="!submitted">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" v-model="form.firstName" placeholder="Juan" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" v-model="form.lastName" placeholder="Dela Cruz" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-control" v-model="form.email" placeholder="juan@example.com" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Booking Reference <span class="text-muted fw-normal">(optional)</span></label>
              <input type="text" class="form-control" v-model="form.bookingRef" placeholder="e.g. WC-20250301" />
            </div>
            <div class="col-12">
              <label class="form-label">Topic</label>
              <select class="form-select" v-model="form.topic" required>
                <option disabled value="">Select a topic</option>
                <option>Flight Booking</option>
                <option>Cancellation / Refund</option>
                <option>Seat Selection</option>
                <option>Baggage Inquiry</option>
                <option>Check-in Assistance</option>
                <option>Payment Issue</option>
                <option>Others</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label">Message</label>
              <textarea
                class="form-control"
                v-model="form.message"
                rows="5"
                placeholder="Describe your concern in detail..."
                required
                style="resize: vertical;"
              ></textarea>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary px-5 py-2">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const submitted = ref(false)

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  bookingRef: "",
  topic: "",
  message: ""
})

function handleSubmit() {
  // In a real app you'd send this to a backend
  console.log("Form submitted:", form)
  submitted.value = true
}
</script>

<style scoped>
.contact-icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.accordion-button:not(.collapsed) {
  background-color: #f0f3ff;
  color: #1C3197;
}

.accordion-button:focus {
  box-shadow: none;
}
</style>