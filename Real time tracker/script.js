let ecoPoints = 0;
let totalDistance = 0;
let trackingInterval;
let lastPosition = null;
let currentActivity = null;

function startTracking(activity) {
    currentActivity = activity;

    if (navigator.geolocation) {
        trackingInterval = setInterval(trackPosition, 1000);
        document.getElementById("distance").innerText = 0; // Reset distance
        document.getElementById("activityPoints").innerText = 0; // Reset activity points
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function stopTracking() {
    clearInterval(trackingInterval);
    alert(
        `Tracking stopped. You covered ${totalDistance.toFixed(2)} meters while ${currentActivity}.`
    );
    totalDistance = 0;
    lastPosition = null; // Reset the last position
    currentActivity = null;
    document.getElementById("distance").innerText = totalDistance.toFixed(2);
}

function trackPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const currentPosition = position.coords;

        // Skip if there's no valid last position
        if (lastPosition) {
            const distance = calculateDistance(
                lastPosition.latitude,
                lastPosition.longitude,
                currentPosition.latitude,
                currentPosition.longitude
            );

            // Apply a threshold to avoid small inaccuracies adding up
            if (distance > 5) { // Only consider changes greater than 5 meters
                totalDistance += distance;
                document.getElementById("distance").innerText = totalDistance.toFixed(2);
                calculateEcoPoints(totalDistance, currentActivity);
            }
        }

        lastPosition = currentPosition; // Update the last position
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth’s radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function calculateEcoPoints(distance, activity) {
    let pointsMultiplier;

    switch (activity) {
        case "walking":
            pointsMultiplier = 1; // 1 point per 10 meters
            break;
        case "cycling":
            pointsMultiplier = 0.8; // 0.8 points per 10 meters
            break;
        case "carpooling":
            pointsMultiplier = 0.5; // 0.5 points per 10 meters
            break;
        default:
            pointsMultiplier = 0;
    }

    const activityPoints = Math.floor((distance / 10) * pointsMultiplier);
    ecoPoints += activityPoints;

    document.getElementById("activityPoints").innerText = activityPoints;
    document.getElementById("points").innerText = ecoPoints;
}
