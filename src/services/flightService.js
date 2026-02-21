import flightsData from "../data/flights.json"

const { directFlights } = flightsData

// export function getFlights(from, to) {
//   const route = flightsData.routes.find(r => r.from === from && r.to === to)

//   if (!route) return [] // no route found

//   let departures = []

//   if (route.direct) {
//     // Return direct departures
//     departures = route.departures.map(f => ({
//       ...f,
//       from,
//       to,
//       stops: f.stops || 0,
//       totalDuration: f.duration
//     }))
//   } else if (route.connectingViaManila) {
//     departures = route.connectingViaManila.map(f => ({
//       flightNumber: f.flightNumber,
//       from,
//       to,
//       stops: f.stops,
//       totalDuration: f.totalDuration,
//       price: f.price,
//       segments: f.segments
//     }))
//   }

//   // Attach returns separately so they can be used in template
//   const returns = route.returns
//     ? route.returns.map(f => ({
//         ...f,
//         from: route.to, // reverse direction for return flight
//         to: route.from,
//         stops: f.stops || 0,
//         totalDuration: f.duration
//       }))
//     : []

//   return departures.map(f => ({ ...f, returns })) // attach returns to each departure
// }

export function getFlights(from, to) {
  // Try to find a direct route from 'from' → 'to'
  const route = flightsData.routes.find(r => r.from === from && r.to === to);
  if (route) {
    return route.departures.map(f => ({
      ...f,
      from,
      to,
      stops: f.stops || 0,
      totalDuration: f.duration || f.totalDuration,
      price: f.price,
      segments: f.segments || [],
      returns: route.returns || [] // keep returns if any
    }));
  }

  // If no direct route, try reverse route: swap departures/returns
  const reverse = flightsData.routes.find(r => r.from === to && r.to === from);
  if (reverse) {
    // map original "returns" as departures for reverse search
    return reverse.returns?.map(f => ({
      ...f,
      from,
      to,
      stops: f.stops || 0,
      totalDuration: f.duration || f.totalDuration,
      price: f.price,
      segments: f.segments || [],
      returns: reverse.departures || [] // original departures become "returns"
    })) || [];
  }

  // no flights at all
  return [];
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