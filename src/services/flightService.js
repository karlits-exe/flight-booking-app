import flightsData from "../data/flights.json"

const { directFlights } = flightsData

export function getFlights(from, to) {
	const routeKey = `${from}-${to}`

	// If direct route exists (Manila routes)
	if (directFlights[routeKey]) {
		return directFlights[routeKey].map(flight => ({
			...flight,
			from,
			to,
			stops: 0,
			totalDuration: flight.duration
		}))
	}

// Otherwise build 1-stop via Manila
	return buildConnectingFlights(from, to)
}

function buildConnectingFlights(from, to) {
	const firstLegKey = `${from}-Manila`
	const secondLegKey = `Manila-${to}`

	const firstLegs = directFlights[firstLegKey]
	const secondLegs = directFlights[secondLegKey]

	if (!firstLegs || !secondLegs) return []

		const results = []

	firstLegs.forEach(first => {
		secondLegs.forEach(second => {
			results.push({
				flightNumber: `${first.flightNumber}-${second.flightNumber}`,
				airline: `${first.airline} / ${second.airline}`,
				from,
				to,
				stops: 1,
totalDuration: first.duration + second.duration + 90, // 90min layover
price: first.price + second.price,
segments: [
	{ ...first, from, to: "Manila" },
	{ ...second, from: "Manila", to }
]
})
		})
	})

	return results
}