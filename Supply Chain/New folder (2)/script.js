let map, directionsService, directionsRenderer;

function initMap() {
    // Initialize the Google Map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },  // Default center (San Francisco)
        zoom: 10,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

document.getElementById("optimize-route").addEventListener("click", function() {
    let startLocation = document.getElementById("start-location").value;
    let endLocation = document.getElementById("end-location").value;

    // Get the directions between the start and end location
    let request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,  // Optional: Request multiple route options
    };

    directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            
            let route = result.routes[0]; // Get the first route
            let distance = route.legs[0].distance.text;
            let fuelConsumed = calculateFuelConsumption(route.legs[0].distance.value / 1000); // Convert meters to km
            let carbonEmission = calculateCarbonEmission(fuelConsumed);

            document.getElementById("optimized-distance").textContent = `Optimized Distance: ${distance}`;
            document.getElementById("fuel-consumed").textContent = `Fuel Consumed: ${fuelConsumed} liters`;
            document.getElementById("carbon-emission").textContent = `Carbon Emission: ${carbonEmission} kg CO2`;
        } else {
            alert("Directions request failed due to " + status);
        }
    });
});

function calculateFuelConsumption(distance) {
    // Assume fuel consumption is 10 liters per 100 km
    return (distance * 10) / 100;
}

function calculateCarbonEmission(fuelConsumed) {
    // Assume 2.31 kg CO2 per liter of fuel
    return (fuelConsumed * 2.31).toFixed(2);
}

document.getElementById("generate-report").addEventListener("click", function() {
    // Generate a dummy sustainability report
    const reportContent = `
        <h4>Carbon Emissions Report</h4>
        <p>Total Emissions: 1000 kg CO2</p>
        <p>Emissions Reduction: 15%</p>
        <p>Goals Achieved: Yes</p>
    `;
    document.getElementById("emissions-report").innerHTML = reportContent;
});

// Initialize the map
function initializeMap() {
    initMap();
}

initializeMap();
