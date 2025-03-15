import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

// Firebase configuration (same as in upload_videos.js)
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

// Fetch and display videos
document.addEventListener("DOMContentLoaded", async () => {
    const videoList = document.getElementById("videoList");
    try {
        const querySnapshot = await getDocs(collection(db, "videos"));

        if (querySnapshot.empty) {
            videoList.innerHTML = "<p>No videos uploaded yet.</p>";
        } else {
            querySnapshot.forEach((doc) => {
                const video = doc.data();
                const videoItem = document.createElement("div");
                videoItem.className = "video-item";
                videoItem.innerHTML = `
                    <h3>${video.title}</h3>
                    <p>Uploaded on: ${new Date(video.uploadedAt).toLocaleString()}</p>
                    <a href="${video.url}" target="_blank">Watch Video</a>
                `;
                videoList.appendChild(videoItem);
            });
        }
    } catch (error) {
        console.error("Error fetching videos:", error);
        videoList.innerHTML = "<p>Failed to load videos.</p>";
    }
});
