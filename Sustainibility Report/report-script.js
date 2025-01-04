// Function to generate and display the compliance report
document.getElementById('generate-report-btn').addEventListener('click', function(e) {
    e.preventDefault();

    // Get emissions data from the form
    const rawMaterialEmissions = parseFloat(document.getElementById('raw-material').value) || 0;
    const transportationEmissions = parseFloat(document.getElementById('transportation').value) || 0;
    const manufacturingEmissions = parseFloat(document.getElementById('manufacturing').value) || 0;

    // Calculate total emissions
    const totalEmissions = rawMaterialEmissions + transportationEmissions + manufacturingEmissions;

    // Display emissions summary
    document.getElementById('total-emissions').textContent = totalEmissions.toFixed(2);

    // Check compliance with Greenhouse Gas Protocol (GHG)
    const complianceStatus = totalEmissions < 10000 ? 'Compliant' : 'Non-compliant';
    const ghgCompliance = totalEmissions < 10000 ? 'Meets GHG standards' : 'Exceeds GHG standards';
    
    document.getElementById('compliance-status').textContent = complianceStatus;
    document.getElementById('ghg-compliance').textContent = ghgCompliance;

    // Generate emissions chart
    generateEmissionsChart(rawMaterialEmissions, transportationEmissions, manufacturingEmissions);

    // Enable the download button
    document.getElementById('download-report-btn').style.display = 'block';
});

// Function to generate emissions chart
function generateEmissionsChart(rawMaterialEmissions, transportationEmissions, manufacturingEmissions) {
    const ctx = document.getElementById('emissionsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Raw Material', 'Transportation', 'Manufacturing'],
            datasets: [{
                label: 'Emissions (kg CO2)',
                data: [rawMaterialEmissions, transportationEmissions, manufacturingEmissions],
                backgroundColor: ['#FF5733', '#4CAF50', '#FFEB3B'],
                borderColor: ['#FF5733', '#4CAF50', '#FFEB3B'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to download the report as a PDF (Placeholder functionality)
document.getElementById('download-report-btn').addEventListener('click', function() {
    alert('Report downloaded as PDF!');
});
