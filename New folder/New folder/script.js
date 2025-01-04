document.addEventListener("DOMContentLoaded", () => {
    const infographic = document.querySelector(".infographic img");

    infographic.addEventListener("mouseenter", () => {
        infographic.style.transform = "scale(1.05)";
        infographic.style.transition = "transform 0.3s ease-in-out";
    });

    infographic.addEventListener("mouseleave", () => {
        infographic.style.transform = "scale(1)";
    });
});
