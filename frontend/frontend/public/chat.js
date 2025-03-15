import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAL0UKvBVHertMHi9Zg0zJZdHgydXXxzIM",
  authDomain: "login-8133e.firebaseapp.com",
  projectId: "login-8133e",
  storageBucket: "login-8133e.firebasestorage.app",
  messagingSenderId: "668804295177",
  appId: "1:668804295177:web:fb0bba99c987da360a26d8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const currentUser = urlParams.get("currentUser");
const otherUser = urlParams.get("otherUser");

document.getElementById("otherUser").textContent = otherUser;

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

// Generate a unique chat ID for the conversation
const chatId = [currentUser, otherUser].sort().join("_");

// Fetch chat messages in real-time
const chatRef = collection(db, "chats", chatId, "messages");
const chatQuery = query(chatRef, orderBy("timestamp"));

onSnapshot(chatQuery, (snapshot) => {
  chatMessages.innerHTML = ""; 
  snapshot.forEach((doc) => {
    const message = doc.data();
    const messageDiv = document.createElement("div");

    // Determine message alignment based on sender
    const isCurrentUser = message.sender === currentUser;
    messageDiv.classList.add("message", isCurrentUser ? "sent" : "received");

    // Add profile picture
    const profilePic = document.createElement("img");
    profilePic.src = isCurrentUser ? "user1.jpg" : "user2.jpg";
    profilePic.alt = isCurrentUser ? "You" : "Other User";
    profilePic.classList.add("profile-pic");
    messageDiv.appendChild(profilePic);

    // Add text bubble
    const textBubble = document.createElement("div");
    textBubble.classList.add("text");
    textBubble.textContent = message.text;
    messageDiv.appendChild(textBubble);

    // Append message to chat container
    chatMessages.appendChild(messageDiv);
  });

  // Scroll to the bottom of the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Handle sending new messages
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const messageText = messageInput.value.trim();

  if (!messageText) return;

  try {
    await addDoc(chatRef, {
      sender: currentUser,
      text: messageText,
      timestamp: serverTimestamp(),
    });
    messageInput.value = ""; // Clear the input field
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please try again.");
  }
});
