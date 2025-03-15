import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();

    // Sidebar elements
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const logoutLink = document.getElementById("logoutLink");

    // Open Sidebar
    menuButton.addEventListener("click", () => {
        sidebar.style.width = "250px";
    });

    // Close Sidebar
    closeButton.addEventListener("click", () => {
        sidebar.style.width = "0";
    });

    // Logout functionality
    logoutLink.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    });
});