<template>
 <div id="results">
	<div id="book" class="container position-relative mt-5">
      <div class="bg-light p-4 shadow-sm border">

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
            <button class="btn btn-primary w-100" @click="searchFlight">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="departing" class="container my-5">
    	<h2 class="h4">1. Manila – Cebu</h2>

    	<div class="row mt-4">
	    	<div class="border p-4 col-sm-10">
	    		<div class="duration">Direct &bull; 1hr 30mins</div>
	    		<div class="result row">
	    			<div class="first-group col-sm-3">
			    		<div class="from">
			    			<h3 class="h5 pt-3">MNL 10:45 AM</h3>
			    			<p class="mb-1">Manila</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="second-group col-sm-3 d-flex align-items-center justify-content-center">
		    			<i class="bi bi-airplane-fill h3" style="transform: rotate(90deg);display: inline-block;color:#D2EA1F;"></i>
		    		</div>
		    		<div class="third-group col-sm-3">
			    		<div class="to">
			    			<h3 class="h5 pt-3">CEB 12:15 PM</h3>
			    			<p class="mb-1">Cebu</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="fourth-group col-sm-3">
			    		<div class="airline fw-bold pt-3">Cebu Pacific</div>
			    		<div class="flightNum mb-3">5J 585</div>
			    		<div class="more small">More Details</div>
			    	</div>
		    	</div>
	    	</div>
	    	<div class="border col-sm-2 p-0">
	    		<div class="class bg-primary p-2 text-white text-center text-uppercase small fw-bold">Economy</div>
	    		<div class="currency text-center pt-4 mt-3 pb-2">PHP</div>
	    		<div class="currency text-center p-0"><h3 class="h5">2,048.72</h3></div>
	    	</div>
    	</div>

    	<div class="row mt-4">
	    	<div class="border p-4 col-sm-10">
	    		<div class="duration">Direct &bull; 1hr 30mins</div>
	    		<div class="result row">
	    			<div class="first-group col-sm-3">
			    		<div class="from">
			    			<h3 class="h5 pt-3">MNL 10:45 AM</h3>
			    			<p class="mb-1">Manila</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="second-group col-sm-3 d-flex align-items-center justify-content-center">
		    			<i class="bi bi-airplane-fill h3" style="transform: rotate(90deg);display: inline-block;color:#D2EA1F;"></i>
		    		</div>
		    		<div class="third-group col-sm-3">
			    		<div class="to">
			    			<h3 class="h5 pt-3">CEB 12:15 PM</h3>
			    			<p class="mb-1">Cebu</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="fourth-group col-sm-3">
			    		<div class="airline fw-bold pt-3">Cebu Pacific</div>
			    		<div class="flightNum mb-3">5J 585</div>
			    		<div class="more small">More Details</div>
			    	</div>
		    	</div>
	    	</div>
	    	<div class="border col-sm-2 p-0">
	    		<div class="class bg-primary p-2 text-white text-center text-uppercase small fw-bold">Economy</div>
	    		<div class="currency text-center pt-4 mt-3 pb-2">PHP</div>
	    		<div class="currency text-center p-0"><h3 class="h5">2,048.72</h3></div>
	    	</div>
    	</div>

    	<div class="row mt-4">
	    	<div class="border p-4 col-sm-10">
	    		<div class="duration">Direct &bull; 1hr 30mins</div>
	    		<div class="result row">
	    			<div class="first-group col-sm-3">
			    		<div class="from">
			    			<h3 class="h5 pt-3">MNL 10:45 AM</h3>
			    			<p class="mb-1">Manila</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="second-group col-sm-3 d-flex align-items-center justify-content-center">
		    			<i class="bi bi-airplane-fill h3" style="transform: rotate(90deg);display: inline-block;color:#D2EA1F;"></i>
		    		</div>
		    		<div class="third-group col-sm-3">
			    		<div class="to">
			    			<h3 class="h5 pt-3">CEB 12:15 PM</h3>
			    			<p class="mb-1">Cebu</p>
			    			<p class="date">14 Feb (Sat)</p>
			    		</div>
			    	</div>
			    	<div class="fourth-group col-sm-3">
			    		<div class="airline fw-bold pt-3">Cebu Pacific</div>
			    		<div class="flightNum mb-3">5J 585</div>
			    		<div class="more small">More Details</div>
			    	</div>
		    	</div>
	    	</div>
	    	<div class="border col-sm-2 p-0">
	    		<div class="class bg-primary p-2 text-white text-center text-uppercase small fw-bold">Economy</div>
	    		<div class="currency text-center pt-4 mt-3 pb-2">PHP</div>
	    		<div class="currency text-center p-0"><h3 class="h5">2,048.72</h3></div>
	    	</div>
    	</div>
    </div>
 </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { getFlights } from "../services/flightService.js"

import { airports } from "../constants/airports.js"

const route = useRoute()
const flights = ref([])

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


const passengerOptions = ref(
  Array.from({ length: 10 }, (_, i) => i + 1)
)

onMounted(() => {
  const from = route.query.from
  const to = route.query.to

  function getFlights(from, to) {
	  if (from === "Manila" || to === "Manila") {
	    return directFlights[from + "-" + to]
	  }

	  // Otherwise connect via Manila
	  return buildConnectingFlight(from, "Manila", to)
	}
})
</script>