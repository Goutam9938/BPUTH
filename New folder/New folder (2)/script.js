// script.js

// Constants for calculation
const EMISSION_FACTOR = 2.68; // kg CO2 per liter of diesel

// Elements
const distanceInput = document.getElementById("distance");
const fuelInput = document.getElementById("fuel");
const calculateBtn = document.getElementById("calculate-btn");
const emissionsResult = document.getElementById("emissions-result");
const chartCanvas = document.getElementById("emissionsChart");

let chart;

// Calculate Emissions
calculateBtn.addEventListener("click", () => {
  const distance = parseFloat(distanceInput.value);
  const fuel = parseFloat(fuelInput.value);

  if (isNaN(distance) || isNaN(fuel)) {
    alert("Please enter valid numbers for distance and fuel.");
    return;
  }

  const emissions = fuel * EMISSION_FACTOR;
  emissionsResult.textContent = `Carbon Emissions: ${emissions.toFixed(2)} kg CO₂`;

  updateChart(distance, emissions);
});

// Chart.js Visualization
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
