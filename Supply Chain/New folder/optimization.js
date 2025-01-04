// optimization.js

// Constants for Emissions
const EMISSION_FACTORS = {
    diesel: 2.68, // kg CO2 per liter of diesel
    electric: 0, // Electric vehicles are assumed to have no emissions for simplicity
    hybrid: 1.5 // Hybrid vehicles are more efficient
  };
  
  const FUEL_EFFICIENCY = 15;  // Fuel efficiency in km per liter (average)
  
  const vehicleTypeSelect = document.getElementById("vehicle-type");
  const routeDistanceInput = document.getElementById("route-distance");
  const optimizeBtn = document.getElementById("optimize-btn");
  const suggestedVehicle = document.getElementById("suggested-vehicle");
  const optimizedDistance = document.getElementById("optimized-distance");
  const optimizedEmissions = document.getElementById("optimized-emissions");
  const chartCanvas = document.getElementById("optimizationChart");
  
  let chart;
  
  // Optimize and recommend vehicle
  optimizeBtn.addEventListener("click", () => {
    const vehicleType = vehicleTypeSelect.value;
    const routeDistance = parseFloat(routeDistanceInput.value);
  
    if (!routeDistance || isNaN(routeDistance)) {
      alert("Please enter a valid route distance.");
      return;
    }
  
    let optimizedEmissionsValue = 0;
    let optimizedDistanceValue = routeDistance;
    let suggestedVehicleType = "";
  
    // Calculate emissions and suggest vehicle type
    if (vehicleType === "diesel") {
      optimizedEmissionsValue = (routeDistance / FUEL_EFFICIENCY) * EMISSION_FACTORS.diesel;
      suggestedVehicleType = "Diesel Vehicle (High Emissions)";
    } else if (vehicleType === "electric") {
      optimizedEmissionsValue = (routeDistance / FUEL_EFFICIENCY) * EMISSION_FACTORS.electric;
      suggestedVehicleType = "Electric Vehicle (Low Emissions)";
    } else if (vehicleType === "hybrid") {
      optimizedEmissionsValue = (routeDistance / FUEL_EFFICIENCY) * EMISSION_FACTORS.hybrid;
      suggestedVehicleType = "Hybrid Vehicle (Moderate Emissions)";
    }
  
    optimizedDistance.textContent = `Optimized Distance: ${optimizedDistanceValue} km`;
    optimizedEmissions.textContent = `Optimized Carbon Emissions: ${optimizedEmissionsValue.toFixed(2)} kg CO₂`;
    suggestedVehicle.textContent = `Suggested Vehicle: ${suggestedVehicleType}`;
  
    // Update Chart
    updateChart(routeDistance, optimizedEmissionsValue);
  });
  
  // Update Chart
  function updateChart(routeDistance, emissions) {
    if (!chart) {
      chart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: ['Distance', 'Emissions'],
          datasets: [{
            label: 'Supply Chain Optimization',
            data: [routeDistance, emissions],
            backgroundColor: ['#4caf50', '#ff7043'],
            borderColor: '#fff',
            borderWidth: 1
          }]
        }
      });
    } else {
      chart.data.datasets[0].data = [routeDistance, emissions];
      chart.update();
    }
  }
  