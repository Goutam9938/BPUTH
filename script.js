let map;
let service;

document.addEventListener("DOMContentLoaded", () => {
    const calculateDistanceButton = document.getElementById("calculate-distance-button");
    const distanceElement = document.getElementById("distance");
    const totalCostElement = document.getElementById("total-cost");
    const totalEmissionElement = document.getElementById("total-emission");

    calculateDistanceButton.addEventListener("click", () => {
        const start = document.getElementById("start-location").value;
        const end = document.getElementById("end-location").value;

        if (start && end) {
            const service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [start],
                destinations: [end],
                travelMode: 'DRIVING',
            }, (response, status) => {
                if (status === 'OK') {
                    const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
                    distanceElement.textContent = distanceInKm.toFixed(2);
                    updateEmissionAndCost(distanceInKm);
                } else {
                    alert('Error calculating distance');
                }
            });
        } else {
            alert('Please enter both start and end locations.');
        }
    });

    function updateEmissionAndCost(distance) {
        const selectedVehicle = document.querySelector(".vehicle-option input:checked");

        if (selectedVehicle) {
            const pricePerKm = parseFloat(selectedVehicle.dataset.price);
            const co2PerKm = parseFloat(selectedVehicle.dataset.co2);

            const totalCost = distance * pricePerKm;
            const totalEmission = distance * co2PerKm;

            totalCostElement.textContent = totalCost.toFixed(2);
            totalEmissionElement.textContent = totalEmission.toFixed(2);
        } else {
            alert('Please select a vehicle option.');
        }
    }
});
