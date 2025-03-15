import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL0UKvBVHertMHi9Zg0zJZdHgydXXxzIM",
    authDomain: "login-8133e.firebaseapp.com",
    projectId: "login-8133e",
    storageBucket: "login-8133e.firebasestorage.app",
    messagingSenderId: "668804295177",
    appId: "1:668804295177:web:fb0bba99c987da360a26d8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventForm");

    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventDescription = document.getElementById("eventDescription").value;

        // Create new event object
        const newEvent = {
            title: eventName,
            date: eventDate,
            description: eventDescription,
        };

        // Fetch existing events from localStorage
        const existingEvents = JSON.parse(localStorage.getItem("eventsData")) || [];

        // Add new event to the list
        existingEvents.push(newEvent);

        // Save updated events back to localStorage
        localStorage.setItem("eventsData", JSON.stringify(existingEvents));

        // Reset form and show success message
        eventForm.reset();
        alert("Event created successfully!");

        // Optionally redirect to the events page
        window.location.href = "social.html";
    });
});