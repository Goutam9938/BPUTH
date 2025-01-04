document.addEventListener("DOMContentLoaded", function () {
    // Array of train data with seat types, prices, and additional details
    const trains = [
        {
            trainNo: '12345',
            departureTime: '06:00 AM',
            arrivalTime: '10:00 AM',
            from: 'Station A',
            to: 'Station B',
            availableSeats: 120,
            waitingList: 10,
            seatPrices: {
                General: 200,
                "3-Tier": 350,
                "2-Tier": 500
            }
        },
        {
            trainNo: '67890',
            departureTime: '08:00 AM',
            arrivalTime: '12:00 PM',
            from: 'Station B',
            to: 'Station C',
            availableSeats: 80,
            waitingList: 15,
            seatPrices: {
                General: 180,
                "3-Tier": 300,
                "2-Tier": 450
            }
        },
        {
            trainNo: '11223',
            departureTime: '10:00 AM',
            arrivalTime: '02:00 PM',
            from: 'Station A',
            to: 'Station C',
            availableSeats: 150,
            waitingList: 5,
            seatPrices: {
                General: 220,
                "3-Tier": 370,
                "2-Tier": 550
            }
        },
        {
            trainNo: '44556',
            departureTime: '12:00 PM',
            arrivalTime: '04:00 PM',
            from: 'Station C',
            to: 'Station A',
            availableSeats: 90,
            waitingList: 8,
            seatPrices: {
                General: 210,
                "3-Tier": 330,
                "2-Tier": 490
            }
        }
    ];

    // Function to display train details with collapsible row
    function displayTrainDetails() {
        const tableBody = document.getElementById("train-table-body");
        tableBody.innerHTML = ''; // Clear any existing rows

        trains.forEach(train => {
            const row = document.createElement("tr");

            Object.values(train).slice(0, 5).forEach(detail => {
                const cell = document.createElement("td");
                cell.textContent = detail;
                row.appendChild(cell);
            });

            // Create the seat type and prices display
            const seatTypesCell = document.createElement("td");
            seatTypesCell.innerHTML = `
                <ul>
                    <li>General: ₹${train.seatPrices.General}</li>
                    <li>3-Tier: ₹${train.seatPrices["3-Tier"]}</li>
                    <li>2-Tier: ₹${train.seatPrices["2-Tier"]}</li>
                </ul>
            `;
            row.appendChild(seatTypesCell);

            // Create a booking button
            const bookButtonCell = document.createElement("td");
            const bookButton = document.createElement("button");
            bookButton.textContent = "Book";
            bookButton.setAttribute("data-train-no", train.trainNo);
            bookButton.setAttribute("data-available-seats", train.availableSeats);
            bookButton.addEventListener("click", function () {
                openPaymentPage(train);
            });
            bookButtonCell.appendChild(bookButton);
            row.appendChild(bookButtonCell);

            // Add arrow for seat details toggle
            const arrowCell = document.createElement("td");
            const arrowButton = document.createElement("button");
            arrowButton.textContent = "▼";
            arrowButton.classList.add("arrow");
            arrowButton.addEventListener("click", function () {
                toggleSeatDetails(arrowButton, train);
            });
            arrowCell.appendChild(arrowButton);
            row.appendChild(arrowCell);

            tableBody.appendChild(row);

            // Add collapsible section for seat availability and waiting list
            const collapsibleRow = document.createElement("tr");
            const collapsibleCell = document.createElement("td");
            collapsibleCell.colSpan = 8;
            collapsibleCell.classList.add("collapsible");
            collapsibleCell.innerHTML = `
                <div class="collapsible-content">
                    <p>Available Seats: ${train.availableSeats}</p>
                    <p>Waiting List: ${train.waitingList}</p>
                </div>
            `;
            collapsibleRow.appendChild(collapsibleCell);
            tableBody.appendChild(collapsibleRow);
        });
    }

    // Function to toggle the visibility of seat details
    function toggleSeatDetails(button, train) {
        const collapsibleRow = button.parentElement.parentElement.nextElementSibling;
        const isVisible = collapsibleRow.classList.contains("show");

        if (isVisible) {
            collapsibleRow.classList.remove("show");
            button.textContent = "▼";
        } else {
            collapsibleRow.classList.add("show");
            button.textContent = "▲";
        }
    }

    // Function to open payment page
    function openPaymentPage(train) {
        // Store the selected train data
        sessionStorage.setItem("selectedTrain", JSON.stringify(train));

        // Hide the train table and show the payment page
        document.querySelector(".container").style.display = "none";
        document.getElementById("payment-page").style.display = "block";
    }

    // Function to handle payment form submission
    document.getElementById("payment-form").onsubmit = function (event) {
        event.preventDefault();

        const train = JSON.parse(sessionStorage.getItem("selectedTrain"));
        const seatType = document.getElementById("seat-type").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        // Simple validation for payment details
        if (cardNumber && expiryDate && cvv) {
            // Payment success, show booking confirmation page
            sessionStorage.setItem("bookedTrain", JSON.stringify(train));
            sessionStorage.setItem("selectedSeatType", seatType);
            document.getElementById("payment-page").style.display = "none";
            document.getElementById("confirmation-page").style.display = "block";
            document.getElementById("confirmation-message").textContent = `Booking Confirmed! Train No: ${train.trainNo}, From: ${train.from} to ${train.to}. Seat Type: ${seatType}, Price: ₹${train.seatPrices[seatType]}.`;
        } else {
            document.getElementById("payment-error-message").textContent = "Please fill in all payment details.";
        }
    };

    // Display train details on page load
    displayTrainDetails();
});
