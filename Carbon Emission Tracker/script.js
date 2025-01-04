// script.js

const EMISSION_FACTOR = 2.68; // kg CO2 per liter of diesel
const FUEL_EFFICIENCY = 15;  // Fuel efficiency in km per liter (average)

// Elements
const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const calculateRouteBtn = document.getElementById("calculate-route-btn");
const distanceResult = document.getElementById("distance-result");
const fuelResult = document.getElementById("fuel-result");
const emissionsResult = document.getElementById("emissions-result");
const chartCanvas = document.getElementById("emissionsChart");

let map, directionsService, directionsRenderer, chart;

// Initialize Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.2961, lng: 85.8245 }, // Default location: Odisha
    zoom: 7,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const autocompleteStart = new google.maps.places.Autocomplete(startInput);
  const autocompleteEnd = new google.maps.places.Autocomplete(endInput);
}

// Calculate Route and Emissions
calculateRouteBtn.addEventListener("click", () => {
  const start = startInput.value;
  const end = endInput.value;

  if (!start || !end) {
    alert("Please enter both starting and ending locations.");
    return;
  }

  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
        const distance = calculateDistance(response);
        const fuel = distance / FUEL_EFFICIENCY;
        const emissions = fuel * EMISSION_FACTOR;

        // Update Results
        distanceResult.textContent = `Distance: ${distance.toFixed(2)} km`;
        fuelResult.textContent = `Fuel Consumption: ${fuel.toFixed(2)} liters`;
        emissionsResult.textContent = `Carbon Emissions: ${emissions.toFixed(2)} kg CO₂`;

        // Update Chart
        updateChart(distance, emissions);
      } else {
        alert("Directions request failed due to " + status);
      }
    }
  );
});

// Calculate Distance from Directions Response
function calculateDistance(response) {
  let totalDistance = 0;
  const route = response.routes[0];
  const legs = route.legs;

  legs.forEach((leg) => {
    totalDistance += leg.distance.value / 1000; // Convert meters to km
  });

  return totalDistance;
}

// Update Chart Visualization
function updateChart(distance, emissions) {
  const data = {
    labels: ["Distance (km)", "Emissions (kg CO₂)"],
    datasets: [
      {
        label: "Carbon Emissions Data",
        data: [distance, emissions],
        backgroundColor: ["#4caf50", "#ff5722"],
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };

  if (chart) {
    chart.destroy(); // Remove previous chart if exists
  }

  chart = new Chart(chartCanvas, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// Initialize Map on Load
window.onload = initMap;
