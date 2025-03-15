import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const auth = getAuth();
    const db = getFirestore();

    // Sidebar elements
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const logoutLink = document.getElementById("logoutLink");

    // Details button and user list
    const detailsButton = document.getElementById("detailsButton");
    const userDetails = document.getElementById("userDetails");
    const userList = document.getElementById("userList");

    // Post Notice elements
    const postNoticeButton = document.getElementById("postNoticeButton");
    const postNoticeForm = document.createElement("div");
    const noticeTitleInput = document.createElement("input");
    const noticeDetailsInput = document.createElement("textarea");
    const noticeSubmitButton = document.createElement("button");

    // Initialize Notice Form
    function initNoticeForm() {
        postNoticeForm.id = "postNoticeForm";
        postNoticeForm.style.display = "none";

        noticeTitleInput.id = "noticeTitle";
        noticeTitleInput.placeholder = "Enter Notice Title";

        noticeDetailsInput.id = "noticeDetails";
        noticeDetailsInput.placeholder = "Enter Notice Details";

        noticeSubmitButton.id = "submitNotice";
        noticeSubmitButton.textContent = "Post Notice";

        postNoticeForm.appendChild(noticeTitleInput);
        postNoticeForm.appendChild(noticeDetailsInput);
        postNoticeForm.appendChild(noticeSubmitButton);
        document.body.appendChild(postNoticeForm);
    }

    initNoticeForm();

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

    // Load initial 3 users and toggle user details section
    detailsButton.addEventListener("click", async () => {
        if (userDetails.style.display === "none") {
            userDetails.style.display = "block";
            await loadUsers();
        } else {
            userDetails.style.display = "none";
        }
    });

    async function loadUsers() {
        try {
            const usersRef = collection(db, "users");
            const usersSnapshot = await getDocs(usersRef);
            const users = usersSnapshot.docs.slice(0, 3); // Limit to 3 users

            userList.innerHTML = ""; // Clear existing content
            users.forEach((doc) => {
                const user = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = `${user.name} (${user.email})`;
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    // Show/Hide Notice Form
    postNoticeButton.addEventListener("click", () => {
        postNoticeForm.style.display =
            postNoticeForm.style.display === "none" ? "block" : "none";
    });

    // Handle Notice Form Submission
    noticeSubmitButton.addEventListener("click", async () => {
        const title = noticeTitleInput.value.trim();
        const details = noticeDetailsInput.value.trim();

        if (title && details) {
            try {
                // Add notice to Firestore
                await addDoc(collection(db, "notices"), {
                    title,
                    details,
                    timestamp: new Date(),
                });

                alert("Notice posted successfully!");
                updateIndexNotices(title, details); // Update the index.html notices
                noticeTitleInput.value = "";
                noticeDetailsInput.value = "";
                postNoticeForm.style.display = "none";
            } catch (error) {
                console.error("Error posting notice:", error);
            }
        } else {
            alert("Please fill out both fields before submitting.");
        }
    });

    // Update Notices Section on index.html
    function updateIndexNotices(title, details) {
        const noticesSection = document.getElementById("news-column");
        const newNotice = document.createElement("li");
        newNotice.textContent = `${title}: ${details}`;
        noticesSection.appendChild(newNotice);
    }
});
