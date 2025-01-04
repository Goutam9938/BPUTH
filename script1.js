document.addEventListener("DOMContentLoaded", function () {
    // Array of bus data
    const buses = [
        {
            busNo: '101',
            departureTime: '08:00 AM',
            arrivalTime: '10:00 AM',
            from: 'Station A',
            to: 'Station B',
            image: 'img/bus.jpeg' // Sample bus image URL
        },
        {
            busNo: '102',
            departureTime: '09:30 AM',
            arrivalTime: '11:30 AM',
            from: 'Station B',
            to: 'Station C',
            image: 'img/bus.jpeg' // Sample bus image URL
        },
        {
            busNo: '103',
            departureTime: '10:00 AM',
            arrivalTime: '12:00 PM',
            from: 'Station A',
            to: 'Station C',
            image: 'img/bus.jpeg' // Sample bus image URL
        },
        {
            busNo: '104',
            departureTime: '11:30 AM',
            arrivalTime: '01:30 PM',
            from: 'Station C',
            to: 'Station A',
            image: 'img/bus.jpeg' // Sample bus image URL
        }
    ];

    // Function to display bus details
    function displayBusDetails() {
        const tableBody = document.getElementById("bus-table-body");
        tableBody.innerHTML = ''; // Clear any existing rows

        buses.forEach(bus => {
            const row = document.createElement("tr");

            // Adding bus details to the row
            Object.values(bus).slice(0, 5).forEach(detail => {
                const cell = document.createElement("td");
                cell.textContent = detail;
                row.appendChild(cell);
            });

            // Create a cell for the bus image
            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.src = bus.image; // Set image source
            imageCell.appendChild(image);
            row.appendChild(imageCell);

            // Add the row to the table
            tableBody.appendChild(row);
        });
    }

    // Call the function to display data
    displayBusDetails();
});
