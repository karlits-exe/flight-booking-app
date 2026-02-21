<template>
 <div id="results">

<!--  	<div id="steps" class="bg-white p-4">
 		
 	</div> -->
 	<div id="search-summary" class="bg-light p-3 text-dark text-center text-uppercase fw-bold">
 		<span class="me-3">{{ searchData.from }}
 			&nbsp;
 			<span v-if="!searchData.oneWay"><i class="bi bi-arrow-repeat"></i></span>
 			<span v-else><i class="bi bi-arrow-right"></i></span>

 			&nbsp;
 			{{ searchData.to }}
 		</span>
 		<span class="me-3">&bull;</span>
 		<span class="me-3">
		  {{ searchData.adults }} {{ searchData.adults === 1 ? 'Adult' : 'Adults' }};
		  {{ searchData.children }} {{ searchData.children === 1 ? 'Child' : 'Children' }}
		</span>
		<span class="me-3">&bull;</span>
		<span class="me-3">Departure: {{ formatDate(searchData.depart) }}</span>
		<span class="me-3" v-if="!searchData.oneWay">&bull;</span>
		<span class="me-3" v-if="!searchData.oneWay">Return: {{ formatDate(searchData.return) }}</span>

		<span><button class="btn btn-sm btn-outline-dark text-uppercase fw-bold" @click="toggleBook">Edit Search</button></span>
 	</div>
 	
	<div id="book" class="container position-relative mt-5" v-show="showBook">
      <div class="bg-light p-4 shadow-sm border">
      <form @submit.prevent="handleSearch">
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
            <button class="btn btn-primary w-100">
              SEARCH
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>

    <div id="departing" class="container my-5">
    	<div v-if="loading" class="text-center py-5">
    		<div class="spinner-border text-primary" role="status">
    			<span class="visually-hidden">Loading...</span>
    		</div>
    		<p class="mt-3">Fetching flights...</p>
    	</div>

    	<div v-else>
    		<div v-if="flights.length">
    			<h2 class="h4">1. {{ searchData.from }} → {{ searchData.to }}</h2>
    			<div class="row mt-4" v-for="(flight, index) in flights" :key="index">
    				<div class="border p-4 col-sm-10">
    					<div class="duration">
    						{{ flight.stops === 0 ? 'Direct' : flight.stops + ' Stop' }} &bull;
    						{{ flight.totalDuration || flight.duration }}
    					</div>
    					<div class="result row">
    						<div class="first-group col-sm-3">
    							<div class="from">
    								<h3 class="h5 pt-3">{{ getAirportCode(flight.from) }} {{ flight.departureTime }}</h3>
    								<p class="mb-1">{{ flight.from }}</p>
    								<p class="date">{{ formatDate(searchData.depart) }}</p>
    							</div>
    						</div>

    						<div class="second-group col-sm-3 d-flex align-items-center justify-content-center">
    							<i class="bi bi-airplane-fill h3" style="transform: rotate(90deg); display:inline-block; color:#D2EA1F;"></i>
    						</div>

    						<div class="third-group col-sm-3">
    							<div class="to">
    								<h3 class="h5 pt-3">{{ getAirportCode(flight.to) }} {{ flight.arrivalTime }}</h3>
    								<p class="mb-1">{{ flight.to }}</p>
    								<p class="date">{{ formatDate(searchData.depart) }}</p>
    							</div>
    						</div>

    						<div class="fourth-group col-sm-3">
    							<div class="airline fw-bold pt-3">{{ flight.airline }}</div>
    							<div class="flightNum mb-3">{{ flight.flightNumber }}</div>
    							<div class="more small">More Details</div>
    						</div>
    					</div>
    				</div>

    				<div class="border col-sm-2 p-0">
    					<div class="class bg-primary p-2 text-white text-center text-uppercase small fw-bold">
    						{{ searchData.travelClass }}
    					</div>
    					<div class="currency text-center pt-2 mt-2 pb-1">PHP</div>
    					<div class="amount text-center p-0">
    						<h3 class="h5">{{ flight.price.toLocaleString() }}</h3>
    					</div>
    					<div class="text-center text-uppercase small pb-2">per person</div>
    					<div class="text-center text-uppercase small mt-2 mb-3">
    						<button class="btn btn-outline-primary btn-sm px-4 py-2 fw-bold text-uppercase">Select</button>
    					</div>
    				</div>
    			</div>
    		</div>

    		<div v-else>
    			<h2 class="h4">{{ searchData.from }} → {{ searchData.to }}</h2>
    			<p>Sorry, no flights found for this route.</p>
    		</div>
    	</div>
    </div>

    <div id="returns" class="container my-5">
  <div v-if="loading"></div>
  <div v-else>
	  <div v-if="flights.length && flights[0].returns && flights[0].returns.length && !searchData.oneWay" class="mt-5">
	    <h2 class="h4">2. {{ searchData.to }} → {{ searchData.from }}</h2>

	    <div
	      class="row mt-4"
	      v-for="(flight, index) in flights[0].returns"
	      :key="'return-' + index"
	    >
	      <div class="border p-4 col-sm-10">
	        <div class="duration">
	          {{ flight.stops === 0 ? 'Direct' : flight.stops + ' Stop' }} &bull;
	          {{ flight.totalDuration || flight.duration }}
	        </div>
	        <div class="result row">
	          <div class="first-group col-sm-3">
	            <div class="from">
	              <h3 class="h5 pt-3">{{ getAirportCode(searchData.to) }} {{ flight.departureTime }}</h3>
	              <p class="mb-1">{{ searchData.to }}</p>
	              <p class="date">{{ formatDate(searchData.return) }}</p>
	            </div>
	          </div>

	          <div class="second-group col-sm-3 d-flex align-items-center justify-content-center">
	            <i class="bi bi-airplane-fill h3" style="transform: rotate(90deg); display:inline-block; color:#D2EA1F;"></i>
	          </div>

	          <div class="third-group col-sm-3">
	            <div class="to">
	              <h3 class="h5 pt-3">{{ getAirportCode(searchData.from) }} {{ flight.arrivalTime }}</h3>
	              <p class="mb-1">{{ searchData.from }}</p>
	              <p class="date">{{ formatDate(searchData.return) }}</p>
	            </div>
	          </div>

	          <div class="fourth-group col-sm-3">
	            <div class="airline fw-bold pt-3">{{ flight.airline }}</div>
	            <div class="flightNum mb-3">{{ flight.flightNumber }}</div>
	            <div class="more small">More Details</div>
	          </div>
	        </div>
	      </div>

	      <div class="border col-sm-2 p-0">
	        <div class="class bg-primary p-2 text-white text-center text-uppercase small fw-bold">
	          {{ searchData.travelClass }}
	        </div>
	        <div class="currency text-center pt-2 mt-2 pb-1">PHP</div>
			<div class="amount text-center p-0">
				<h3 class="h5">{{ flight.price.toLocaleString() }}</h3>
			</div>
			<div class="text-center text-uppercase small pb-2">per person</div>
			<div class="text-center text-uppercase small mt-2 mb-3">
				<button class="btn btn-outline-primary btn-sm px-4 py-2 fw-bold text-uppercase">Select</button>
			</div>
	      </div>
	    </div>
	  </div>
	</div>
</div>
 </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getFlights } from "../services/flightService.js"

import { airports } from "../constants/airports.js"

import { destinations } from "../data/flights.json"

const searchData = reactive({
  from: "",
  to: "",
  depart: "",
  return: "",
  travelClass: "",
  adults: 1,
  children: 0
});

// Hide form initially
const showBook = ref(false);

// Toggle on click of Edit Search
function toggleBook() {
  showBook.value = !showBook.value;
}

function getAirportCode(name) {
  const dest = destinations.find(d => d.name === name)
  return dest ? dest.code : name
}

const route = useRoute()
const router = useRouter();

const flights = ref([])

const form = reactive({
  from: "Manila",
  to: "",
  depart: "",
  return: "",
  travelClass: "Economy",
  adults: 1,
  children: 0
})

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

function formatDate(dateStr) {
  if (!dateStr) return 'TBD'

  const date = new Date(dateStr)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
  const formatted = date.toLocaleDateString('en-US', options)

  return `${formatted} (${dayName})`
}

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

const loading = ref(false)

// Update the values when Edit Search is performed
// Watch route query to update form and searchData initially
watch(
  () => route.query,
  async (newQuery) => {
    const { from, to, depart, return: ret, travelClass, adults, children, oneWay } = newQuery;

    loading.value = true;

    Object.assign(searchData, {
      from: from || '',
      to: to || '',
      depart: depart || '',
      return: ret || '',
      travelClass: travelClass || 'Economy',
      adults: adults ? parseInt(adults) : 1,
      children: children ? parseInt(children) : 0,
      oneWay: oneWay === 'true'
    });

    Object.assign(form, {
      from: searchData.from,
      to: searchData.to,
      depart: searchData.depart,
      return: searchData.return,
      travelClass: searchData.travelClass,
      adults: searchData.adults,
      children: searchData.children,
      oneWay: searchData.oneWay
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (searchData.from && searchData.to) {
      flights.value = getFlights(searchData.from, searchData.to);
    }

    loading.value = false;
  },
  { immediate: true }
);

// Reset the destination when origin is changed
watch(() => form.from, (newFrom) => {
  if (form.to === newFrom) {
    form.to = ""
  }
})

// Watch form.depart to update form.return automatically (+3 days)
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

onMounted(() => {
  const { from, to, depart, return: ret, travelClass, adults, children, oneWay } = route.query;

  // Populate searchData so your template can display it
  Object.assign(searchData, {
    from: from || '',
    to: to || '',
    depart: depart || '',
    return: ret || '',
    travelClass: travelClass || 'Economy',
    adults: adults ? parseInt(adults) : 1,
    children: children ? parseInt(children) : 0,
    oneWay: oneWay === 'true'
  });

  // Get flights for this route
  if (searchData.from && searchData.to) {
    flights.value = getFlights(searchData.from, searchData.to);
    console.log('Flights:', flights.value);
  }
});
</script>