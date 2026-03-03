<template>
  <!-- Steps Progress Bar -->
  <div id="steps" class="bg-secondary text-white small">
    <div class="">
      <ol class="m-0 text-uppercase">
        <li class="nav-item p-2 bg-secondary">
          <span class="d-none d-md-inline">Flights</span>
        </li>
        <li class="nav-item p-2 bg-secondary">
          <span class="d-none d-md-inline">Passengers</span>
        </li>
        <li class="nav-item p-2 current bg-light">
          <span class="d-none d-md-inline fw-bold">Seats</span>
        </li>
        <li class="nav-item p-2 bg-secondary">
          <span class="d-none d-md-inline">Add-ons</span>
        </li>
        <li class="nav-item p-2 bg-secondary">
          <span class="d-none d-md-inline">Payment</span>
        </li>
      </ol>
    </div>
  </div>

  <!-- Page Content -->
  <div class="container my-5 px-4">
    <h1 class="h3 mb-1">Select Your Seat</h1>
    <p class="text-muted mb-4">Choose a seat for each passenger. Click on an available seat to select it.</p>

    <div class="row g-4">
      <!-- Seat Map -->
      <div class="col-lg-8">
        <div class="border p-4 shadow-sm bg-white">
          <!-- Cabin Header -->
          <div class="text-center mb-4">
            <span class="badge bg-primary px-4 py-2 text-uppercase">Economy Class</span>
            <p class="small text-muted mt-2 mb-0">World Class Airlines &bull; Flight WC 201 &bull; MNL → CEB</p>
          </div>

          <!-- Legend -->
          <div class="d-flex gap-3 justify-content-center mb-4 flex-wrap">
            <div class="d-flex align-items-center gap-2">
              <div class="seat-demo available"></div>
              <span class="small">Available</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <div class="seat-demo selected"></div>
              <span class="small">Selected</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <div class="seat-demo occupied"></div>
              <span class="small">Occupied</span>
            </div>
          </div>

          <!-- Column Labels -->
          <div class="seat-row mb-2">
            <div class="row-num"></div>
            <div class="seat-group">
              <div class="seat-label">A</div>
              <div class="seat-label">B</div>
              <div class="seat-label">C</div>
            </div>
            <div class="aisle"></div>
            <div class="seat-group">
              <div class="seat-label">D</div>
              <div class="seat-label">E</div>
              <div class="seat-label">F</div>
            </div>
          </div>

          <!-- Seat Rows -->
          <div
            v-for="row in seatRows"
            :key="row"
            class="seat-row"
          >
            <div class="row-num small text-muted">{{ row }}</div>
            <div class="seat-group">
              <button
                v-for="col in ['A', 'B', 'C']"
                :key="col"
                class="seat"
                :class="getSeatClass(row, col)"
                :disabled="isSeatOccupied(row, col)"
                @click="toggleSeat(row, col)"
                :title="`Row ${row}, Seat ${col}`"
              >
              </button>
            </div>
            <div class="aisle"></div>
            <div class="seat-group">
              <button
                v-for="col in ['D', 'E', 'F']"
                :key="col"
                class="seat"
                :class="getSeatClass(row, col)"
                :disabled="isSeatOccupied(row, col)"
                @click="toggleSeat(row, col)"
                :title="`Row ${row}, Seat ${col}`"
              >
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Seat Summary -->
      <div class="col-lg-4">
        <div class="border p-4 shadow-sm bg-white mb-4">
          <h2 class="h5 mb-3">Passengers</h2>
          <p class="small text-muted">Please select {{ totalPassengers }} seat(s).</p>

          <div v-for="(passenger, index) in passengers" :key="index" class="mb-3 p-3 border rounded">
            <div class="fw-bold small text-uppercase text-muted mb-1">{{ passenger.type }} {{ index + 1 }}</div>
            <div class="fw-bold">{{ passenger.name }}</div>
            <div class="mt-2">
              <span v-if="selectedSeats[index]" class="badge bg-primary px-3 py-2">
                Seat {{ selectedSeats[index] }}
              </span>
              <span v-else class="badge bg-secondary px-3 py-2">No seat selected</span>
            </div>
          </div>

          <p class="small text-muted mt-2">
            Selecting seat for:
            <strong class="text-primary">{{ currentPassenger < totalPassengers ? passengers[currentPassenger].name : 'All assigned' }}</strong>
          </p>
        </div>

        <!-- Seat Fee Info -->
        <div class="border p-4 shadow-sm bg-white mb-4">
          <h2 class="h5 mb-3">Seat Fee</h2>
          <div class="d-flex justify-content-between small mb-2">
            <span>Window / Aisle seat</span>
            <span class="fw-bold">PHP 500</span>
          </div>
          <div class="d-flex justify-content-between small mb-2">
            <span>Middle seat</span>
            <span class="fw-bold">PHP 300</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between fw-bold">
            <span>Total Seat Fee</span>
            <span class="text-primary">PHP {{ totalSeatFee.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-grid gap-2">
          <button class="btn btn-primary py-2" :disabled="selectedSeats.filter(Boolean).length < totalPassengers">
            CONTINUE TO ADD-ONS
          </button>
          <button class="btn btn-outline-secondary py-2" @click="skipSeats">
            SKIP SEAT SELECTION
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// Sample passengers (in a real app, this would come from route/store)
const passengers = ref([
  { name: "Juan Dela Cruz", type: "Adult" },
  { name: "Maria Santos", type: "Adult" },
])

const totalPassengers = computed(() => passengers.value.length)
const currentPassenger = ref(0)
const selectedSeats = ref(Array(passengers.value.length).fill(null))

// Generate rows 1 to 20
const seatRows = Array.from({ length: 20 }, (_, i) => i + 1)

// Pre-occupied seats (random)
const occupiedSeats = ref([
  "2A", "2B", "3D", "3E", "5A", "5F", "7C", "8D",
  "10B", "10E", "12A", "12F", "14C", "14D", "16B", "17E",
  "18A", "18B", "19D", "20C"
])

function getSeatId(row, col) {
  return `${row}${col}`
}

function isSeatOccupied(row, col) {
  return occupiedSeats.value.includes(getSeatId(row, col))
}

function isSeatSelected(row, col) {
  return selectedSeats.value.includes(getSeatId(row, col))
}

function getSeatClass(row, col) {
  if (isSeatOccupied(row, col)) return "occupied"
  if (isSeatSelected(row, col)) return "selected"
  return "available"
}

function toggleSeat(row, col) {
  const seatId = getSeatId(row, col)

  // Check if this seat is already selected by any passenger
  const existingIndex = selectedSeats.value.indexOf(seatId)
  if (existingIndex !== -1) {
    // Deselect it
    selectedSeats.value[existingIndex] = null
    if (currentPassenger.value > existingIndex) {
      currentPassenger.value = existingIndex
    }
    return
  }

  // Assign to current passenger
  if (currentPassenger.value < totalPassengers.value) {
    selectedSeats.value[currentPassenger.value] = seatId
    // Move to next unassigned passenger
    const nextEmpty = selectedSeats.value.findIndex((s, i) => !s && i > currentPassenger.value)
    if (nextEmpty !== -1) {
      currentPassenger.value = nextEmpty
    } else {
      // Check from beginning
      const anyEmpty = selectedSeats.value.findIndex(s => !s)
      currentPassenger.value = anyEmpty !== -1 ? anyEmpty : totalPassengers.value
    }
  }
}

function getSeatFee(seatId) {
  if (!seatId) return 0
  const col = seatId.slice(-1)
  // A, C, D, F = window/aisle = 500 | B, E = middle = 300
  return ["A", "C", "D", "F"].includes(col) ? 500 : 300
}

const totalSeatFee = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + getSeatFee(seat), 0)
})

function skipSeats() {
  selectedSeats.value = Array(passengers.value.length).fill(null)
  alert("Seat selection skipped. You will be assigned a random seat.")
}
</script>

<style scoped>
.seat-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
}

.row-num {
  width: 24px;
  text-align: right;
  font-size: 12px;
}

.seat-group {
  display: flex;
  gap: 6px;
}

.aisle {
  width: 24px;
}

.seat {
  width: 36px;
  height: 36px;
  border-radius: 6px 6px 3px 3px;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.1s;
}

.seat.available {
  background-color: #D2EA1F;
  border-color: #b8cc10;
  color: #000;
}

.seat.available:hover {
  background-color: #c5d91a;
  transform: scale(1.1);
}

.seat.selected {
  background-color: #1C3197;
  border-color: #142580;
  color: #fff;
}

.seat.occupied {
  background-color: #D9D9D9;
  border-color: #bbb;
  cursor: not-allowed;
}

.seat-label {
  width: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #333;
}

/* Legend demos */
.seat-demo {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.seat-demo.available {
  background-color: #D2EA1F;
  border: 2px solid #b8cc10;
}

.seat-demo.selected {
  background-color: #1C3197;
  border: 2px solid #142580;
}

.seat-demo.occupied {
  background-color: #D9D9D9;
  border: 2px solid #bbb;
}
</style>