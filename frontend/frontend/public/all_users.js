import app from "./firebase-config.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    const allUsersList = document.getElementById("allUsersList");

    async function loadAllUsers() {
        try {
            // Reference the "users" collection
            const usersRef = collection(db, "users");
            const usersSnapshot = await getDocs(usersRef);

            // Clear any existing content
            allUsersList.innerHTML = "";

            // Check if there are any documents
            if (usersSnapshot.empty) {
                allUsersList.textContent = "No users found.";
                return;
            }

            // Iterate through documents and display user data
            usersSnapshot.forEach((doc) => {
                const user = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = `${user.name || "No Name"} (${user.email || "No Email"})`;
                allUsersList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error loading all users:", error);
            allUsersList.textContent = "Error loading users. Check the console for details.";
        }
    }

    // Load all users on page load
    loadAllUsers();
});





