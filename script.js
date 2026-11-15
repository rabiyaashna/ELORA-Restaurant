
// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// Menu Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        menuCards.forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// Reservation Form
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const bookingDate = document.getElementById("bookingDate");

// Prevent selecting past dates
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;

reservationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const email = document.getElementById("guestEmail").value.trim();
    const date = bookingDate.value;
    const guests = document.getElementById("guestCount").value;
    const time = document.getElementById("bookingTime").value;

    if (!name || !email || !date || !guests || !time) {
        formMessage.textContent = "Please complete all required fields.";
        return;
    }

    if (date < localToday) {
        formMessage.textContent = "Please select a future date.";
        return;
    }

    formMessage.textContent =
        `Thank you, ${name}! Your reservation request for ${guests} guest(s) on ${date} at ${time} has been received. This is a demo confirmation, not a live booking.`;

    reservationForm.reset();
    bookingDate.min = localToday;
});
