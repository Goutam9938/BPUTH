let map, emissionHotspotMarkers = [];
let userMarker = null;

// Initialize Google Maps and the Dashboard
function initMap() {
    // Initialize the map centered on a default location (Odisha)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.2961, lng: 85.8189 },  // Odisha
        zoom: 8,
    });

    // Add event listener to the "Add Place" button
    document.getElementById('add-place-btn').addEventListener('click', function() {
        const placeName = document.getElementById('place-input').value;
        if (!placeName) {
            alert('Please enter a place name.');
            return;
        }
        geocodePlace(placeName);
    });
}

// Geocode place name to get latitude and longitude
function geocodePlace(placeName) {
    const geocoder = new google.maps.Geocoder();

    // Geocode the place
    geocoder.geocode({ address: placeName }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            const placeLocation = results[0].geometry.location;

            // If there's already a marker, remove it
            if (userMarker) {
                userMarker.setMap(null);
            }

            // Create a new marker for the location
            userMarker = new google.maps.Marker({
                map: map,
                position: placeLocation,
                title: placeName,
            });

            // Center the map on the new place
            map.setCenter(placeLocation);

            // Show emission insights for the selected place
            showEmissionsInsights(placeName, placeLocation.lat(), placeLocation.lng());
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// Show emissions insights for a given place
function showEmissionsInsights(placeName, lat, lng) {
    // For demonstration, generate random emissions data
    let emissions = Math.floor(Math.random() * 2000) + 1000;  // Random emissions data
    let reductionProgress = Math.random() * 100;  // Random reduction progress

    // Update the emissions summary
    document.getElementById("current-emissions").textContent = `${emissions} kg CO2`;
    document.getElementById("reduction-progress").textContent = `${reductionProgress.toFixed(2)}%`;

    // Generate a random alert for emissions
    if (emissions > 1500) {
        generateAlert("Warning: Emissions exceed safe levels!");
    } else {
        generateAlert("Emissions within acceptable levels.");
    }

    // Update emissions chart
    updateEmissionsChart(emissions, reductionProgress);
}

// Add an alert message to the alerts list
function generateAlert(message) {
    let alertList = document.getElementById("alerts-list");
    let alertItem = document.createElement("li");
    alertItem.textContent = message;
    alertList.prepend(alertItem);  // Add the alert at the top of the list
}

let emissionsChart;

// Update emissions chart with new data
function updateEmissionsChart(emissions, reductionProgress) {
    let labels = ["Emissions", "Reduction Progress"];
    let data = [emissions, reductionProgress];

    if (!emissionsChart) {
        // Initialize the emissions chart if it doesn't exist
        const ctx = document.getElementById('emissionsChart').getContext('2d');
        emissionsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Emissions Insights',
                    data: data,
                    backgroundColor: ['#FF5733', '#4CAF50'],
                    borderColor: ['#FF5733', '#4CAF50'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } else {
        // Update the existing chart
        emissionsChart.data.datasets[0].data = data;
        emissionsChart.update();
    }
}
