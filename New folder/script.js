// Script for interactive features

document.addEventListener("DOMContentLoaded", () => {
    // Contact form submission handling
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Simulate form submission
        alert(`Thank you, ${name}! We have received your message.`);

        // Clear the form
        contactForm.reset();
    });

    // Dashboard example interaction
    const dashboardContainer = document.getElementById("dashboard-container");

    if (dashboardContainer) {
        dashboardContainer.innerHTML = "<p>Real-time data and graphs will appear here.</p>";
        setTimeout(() => {
            dashboardContainer.innerHTML = "<p>Example: Carbon emissions reduced by 15% this month!</p>";
        }, 2000);
    }
});
