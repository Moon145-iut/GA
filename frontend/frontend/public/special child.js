// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getFirestore, collection,  getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyAL0UKvBVHertMHi9Zg0zJZdHgydXXxzIM",
//     authDomain: "login-8133e.firebaseapp.com",
//     projectId: "login-8133e",
//     storageBucket: "login-8133e.firebasestorage.app",
//     messagingSenderId: "668804295177",
//     appId: "1:668804295177:web:fb0bba99c987da360a26d8"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

//     document.addEventListener("DOMContentLoaded", () => {
//         const auth = getAuth();
    
//         // Sidebar elements
//         const sidebar = document.getElementById("sidebar");
//         const menuButton = document.getElementById("menuButton");
//         const closeButton = document.getElementById("closeButton");
//         const logoutLink = document.getElementById("logoutLink");
       
    
//         // Open Sidebar
//         menuButton.addEventListener("click", () => {
//             sidebar.style.width = "250px";
//         });
    
//         // Close Sidebar
//         closeButton.addEventListener("click", () => {
//             sidebar.style.width = "0";
//         });
    
//         // Logout functionality
//         logoutLink.addEventListener("click", () => {
//             signOut(auth)
//                 .then(() => {
//                     window.location.href = "index.html";
//                 })
//                 .catch((error) => {
//                     console.error("Error logging out:", error);
//                 });
//         });
    
//         const setsContainer = document.getElementById("setsContainer");
//         const setsList = document.getElementById("setsList");
//         const quizContainer = document.getElementById("quizContainer");
//         const setTitle = document.getElementById("setTitle");
//         const questionsList = document.getElementById("questionsList");
//         const submitQuizButton = document.getElementById("submitQuiz");
//         const quizResult = document.getElementById("quizResult");
//     const goBackButton = document.getElementById("goBackButton");
    
//     const fetchSets = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "quizSets"));
//             setsList.innerHTML = "";

//             querySnapshot.forEach((doc) => {
//                 const setName = doc.id;
//                 const setElement = document.createElement("div");
//                 setElement.innerHTML = `
//                     <button class="set-button" data-set="${setName}">${setName}</button>
//                 `;
//                 setsList.appendChild(setElement);
//             });
//         } catch (error) {
//             console.error("Error fetching sets:", error);
//         }
//     };

//     setsList.addEventListener("click", async (e) => {
//         if (e.target.classList.contains("set-button")) {
//             const setName = e.target.dataset.set;
//             setTitle.textContent = setName;

//             // Fetch the set's questions
//             const setDoc = await getDoc(doc(collection(db, "quizSets"), setName));
//             const { questions } = setDoc.data();

//             displayQuestions(questions);
//             quizContainer.style.display = "block";
//             submitQuizButton.style.display = "block";
//             quizResult.textContent = ""; // Clear previous results
//             goBackButton.style.display = "none";
//         }
//     });

//     const displayQuestions = (questions) => {
//         questionsList.innerHTML = "";
//         questions.forEach((question, index) => {
//             const questionElement = document.createElement("div");
//             questionElement.innerHTML = `
//                 <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
//                 <div class="options">
//                     ${question.options
//                         .map(
//                             (option, i) =>
//                                 `<label>
//                                     <input type="radio" name="question${index}" value="${i + 1}">
//                                     ${option}
//                                 </label>`
//                         )
//                         .join("<br>")}
//                 </div>
//             `;
//             questionsList.appendChild(questionElement);
//         });
//     };

//     submitQuizButton.addEventListener("click", () => {
//         const answers = [];
//         const questions = document.querySelectorAll(".options");

//         questions.forEach((question, index) => {
//             const selectedOption = document.querySelector(
//                 `input[name="question${index}"]:checked`
//             );
//             answers.push(selectedOption ? parseInt(selectedOption.value) : null);
//         });

//         calculateResults(answers);
//     });

//     const calculateResults = async (answers) => {
//         const setName = setTitle.textContent;
//         const setDoc = await getDoc(doc(collection(db, "quizSets"), setName));
//         const { questions } = setDoc.data();

//         let correctCount = 0;

//         questions.forEach((question, index) => {
//             if (answers[index] === question.correctOption) {
//                 correctCount++;
//             }
//         });

//         quizResult.textContent = `You got ${correctCount} out of ${questions.length} correct!`;
//         goBackButton.style.display = "block";
//     };

//     goBackButton.addEventListener("click", () => {
//         quizContainer.style.display = "none";
//         setsContainer.style.display = "block";
//     });

//     fetchSets();
//     });

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getUserProfile, updateUserProfile } from "./Profile.js";

document.addEventListener("DOMContentLoaded", function() {
    // Get auth and firestore instances
    const auth = getAuth();
    const db = getFirestore();
    
    // UI Elements
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.getElementById('closeButton');
    const logoutLink = document.getElementById('logoutLink');
    const profileSection = document.getElementById('profileSection');
    const profileContainer = document.getElementById('profileContainer');
    const setsContainer = document.getElementById('setsContainer');
    const headerProfilePic = document.getElementById('headerProfilePic');
    const headerProfileName = document.getElementById('headerProfileName');
    const headerProfileLevel = document.getElementById('headerProfileLevel');
    const currentLevel = document.getElementById('currentLevel');
    
    // Menu toggle functionality
    if (menuButton && sidebar && closeButton) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
        
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
    
    // Profile section toggle
    if (profileSection && profileContainer && setsContainer) {
        profileSection.addEventListener('click', (e) => {
            e.preventDefault();
            if (profileContainer.style.display === 'none') {
                profileContainer.style.display = 'block';
                setsContainer.style.display = 'none';
            } else {
                profileContainer.style.display = 'none';
                setsContainer.style.display = 'block';
            }
        });
    }
    
    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.href = "index.html";
            } catch (error) {
                console.error("Error signing out:", error);
            }
        });
    }
    
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Load user profile
            try {
                const userData = await getUserProfile(user.uid);
                
                if (userData) {
                    // Update header with user info
                    if (headerProfileName) {
                        headerProfileName.textContent = `${userData.firstName} ${userData.lastName}`;
                    }
                    
                    if (headerProfileLevel) {
                        headerProfileLevel.textContent = `Level: ${userData.level || 'Primary'}`;
                    }
                    
                    if (currentLevel) {
                        currentLevel.textContent = userData.level || 'Primary';
                    }
                    
                    // Update profile picture if available
                    if (headerProfilePic && userData.photoURL) {
                        headerProfilePic.src = userData.photoURL;
                    }
                    
                    // Update about section if available
                    const aboutInput = document.getElementById('about');
                    if (aboutInput && userData.about) {
                        aboutInput.value = userData.about;
                    }
                }
                
                // Load special child specific content (quizzes, etc)
                // This would be implementation-specific based on your requirements
                
            } catch (error) {
                console.error("Error loading user profile:", error);
            }
        } else {
            // Redirect to login if not authenticated
            window.location.href = "signin.html";
        }
    });
});