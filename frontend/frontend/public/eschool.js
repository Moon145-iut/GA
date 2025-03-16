// import firebase from 'firebase/app';
// import 'firebase/firestore';
// function showLevels(subject) {
//     const levels = ['Primary', 'Intermediate', 'Advanced'];
//     const levelsContainer = document.getElementById('levelsContainer');
    
//     // Clear previous content and display levels for the selected subject
//     levelsContainer.innerHTML = `<h3>Select Level for ${subject}</h3>`;
//     levels.forEach(level => {
//         const levelDiv = document.createElement('div');
//         levelDiv.classList.add('level-option');
        
//         // Add tutorial, resource, and quiz buttons for each level
//         levelDiv.innerHTML = `
//             <h4>${level} Level</h4>
//             <button onclick="showTutorial('${subject}', '${level}')">Tutorial</button>
//             <button onclick="showResources('${subject}', '${level}')">Resources</button>
//             <button onclick="startQuiz('${subject}', '${level}')">Take Quiz</button>
//         `;
//         levelsContainer.appendChild(levelDiv);
//     });
// }

// function showTutorial(subject, level) {
//     const contentContainer = document.getElementById('contentContainer');
//     contentContainer.innerHTML = `
//         <div class="video-placeholder">
//             <h4>${subject} - ${level} Level: Tutorial Video</h4>
//             <p>Watch this tutorial video to understand the concepts better.</p>
//             <video controls>
//                 <source src="path_to_tutorial_video.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     `;
// }

// function showResources(subject, level) {
//     const contentContainer = document.getElementById('contentContainer');
//     contentContainer.innerHTML = `
//         <div class="resource-list">
//             <h4>${subject} - ${level} Level: Resources</h4>
//             <ul>
//                 <li><a href="#">Download PDF Resources for ${subject} - ${level}</a></li>
//                 <li><a href="#">Download Additional Resources for ${subject} - ${level}</a></li>
//             </ul>
//         </div>
//     `;
// }

// // function startQuiz(subject, level) {
// //     const quizSection = document.getElementById('quizSection');
// //     const quizTitle = document.getElementById('quizTitle');
// //     const quizContent = document.getElementById('quizContent');
    
// //     // For demonstration, using hardcoded quiz questions
// //     const quizQuestions = [
// //         { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: 1 },
// //         { question: 'What is 3 + 5?', options: ['7', '8', '9'], correct: 1 }
// //     ];

// //     quizTitle.innerHTML = `Quiz for ${subject} - ${level} Level`;
// //     quizContent.innerHTML = '';

// //     quizQuestions.forEach((q, index) => {
// //         const questionElement = document.createElement('div');
// //         questionElement.classList.add('question');
// //         questionElement.innerHTML = `
// //             <p>${q.question}</p>
// //             ${q.options.map((option, i) => `<input type="radio" name="q${index}" value="${i}"> ${option}<br>`).join('')}
// //         `;
// //         quizContent.appendChild(questionElement);
// //     });

// //     quizSection.style.display = 'block';
// // }
// // function startQuiz(subject, level) {
// //     const db = firebase.firestore(); // Initialize Firestore
// //     const quizSection = document.getElementById('quizSection');
// //     const quizTitle = document.getElementById('quizTitle');
// //     const quizContent = document.getElementById('quizContent');

// //     quizTitle.innerHTML = `Quiz for ${subject} - ${level} Level`;
// //     quizContent.innerHTML = `<p>Loading quiz questions...</p>`; // Temporary loading message

// //     // Fetch questions from Firestore
// //     db.collection('quizzes')
// //         .doc(subject)
// //         .collection(level)
// //         .doc('questions')
// //         .get()
// //         .then((doc) => {
// //             if (doc.exists) {
// //                 const questions = doc.data();
// //                 const questionKeys = Object.keys(questions);

// //                 quizContent.innerHTML = ''; // Clear loading message
// //                 questionKeys.forEach((key, index) => {
// //                     const q = questions[key];
// //                     const questionElement = document.createElement('div');
// //                     questionElement.classList.add('question');
// //                     questionElement.innerHTML = `
// //                         <p>${index + 1}. ${q.text}</p>
// //                         ${q.options.map((option, i) => `
// //                             <input type="radio" name="q${index}" value="${i}">
// //                             ${option}<br>
// //                         `).join('')}
// //                     `;
// //                     quizContent.appendChild(questionElement);
// //                 });

// //                 // Add submit button
// //                 const submitButton = document.createElement('button');
// //                 submitButton.textContent = 'Submit Quiz';
// //                 submitButton.onclick = submitQuiz;
// //                 quizContent.appendChild(submitButton);
// //             } else {
// //                 quizContent.innerHTML = `<p>No quiz questions available for ${subject} - ${level} Level.</p>`;
// //             }
// //         })
// //         .catch((error) => {
// //             console.error('Error fetching quiz questions:', error);
// //             quizContent.innerHTML = `<p>Error loading quiz. Please try again later.</p>`;
// //         });

// //     quizSection.style.display = 'block';
// // }

// // // function submitQuiz() {
// // //     alert('Quiz Submitted!');
// // //     document.getElementById('quizSection').style.display = 'none';
// // // }

// // function submitQuiz() {
// //     const selectedAnswers = [];
// //     const questions = document.querySelectorAll('.question');
// //     questions.forEach((question, index) => {
// //         const selectedOption = question.querySelector(`input[name="q${index}"]:checked`);
// //         if (selectedOption) selectedAnswers.push(parseInt(selectedOption.value));
// //     });

// //     // Validate answers here (you can fetch the correct answers from Firestore and compare)
// //     alert('Quiz Submitted!');
// //     document.getElementById('quizSection').style.display = 'none';
// // }


// document.getElementById('mathTile').addEventListener('click', () => showLevels('Math'));
// document.getElementById('scienceTile').addEventListener('click', () => showLevels('Science'));
// document.getElementById('artTile').addEventListener('click', () => showLevels('Art'));
// document.getElementById('musicTile').addEventListener('click', () => showLevels('Music'));




// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAL0UKvBVHertMHi9Zg0zJZdHgydXXxzIM",
//   authDomain: "login-8133e.firebaseapp.com",
//   projectId: "login-8133e",
//   storageBucket: "login-8133e.firebasestorage.app",
//   messagingSenderId: "668804295177",
//   appId: "1:668804295177:web:fb0bba99c987da360a26d8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// let userLearningLevel = "Primary";

// function fetchUserLevel() {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       try {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           userLearningLevel = userData.level || "Primary";
//           autoShowLevels(userLearningLevel);
//         } else {
//           console.error("No such user document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     } else {
//       window.location.href = "signin.html";
//     }
//   });
// }

// function autoShowLevels(level) {
//   const subjects = ['Math', 'Science', 'Art', 'Music'];
//   const levelsContainer = document.getElementById('levelsContainer');
//   levelsContainer.innerHTML = `<h3>Your Learning Level: ${level}</h3>`;

//   subjects.forEach(subject => {
//     const levelDiv = document.createElement('div');
//     levelDiv.classList.add('level-option');
//     levelDiv.innerHTML = `
//       <h4>${subject} - ${level}</h4>
//       <button onclick="showTutorial('${subject}', '${level}')">Tutorial</button>
//       <button onclick="showResources('${subject}', '${level}')">Resources</button>
//       <button onclick="startQuiz('${subject}', '${level}')">Take Quiz</button>
//     `;
//     levelsContainer.appendChild(levelDiv);
//   });
// }

// let currentTutorialIndex = 0;
// let currentResourceIndex = 0;

// function showTutorial(subject, level) {
//   const contentContainer = document.getElementById('contentContainer');
//   const tutorials = ["video.mp4", "video.mp4", "video.mp4"];

//   contentContainer.innerHTML = `
//     <div class="video-placeholder">
//       <h4>${subject} - ${level} Level: Tutorial Video</h4>
//       <p>Watch this tutorial video to understand the concepts better.</p>
//       <video controls>
//         <source src="${tutorials[currentTutorialIndex]}" type="video/mp4">
//         Your browser does not support the video tag.
//       </video>
//       <br>
//       <button id="nextTutorialButton" onclick="nextTutorial('${subject}', '${level}')">Next Video</button>
//     </div>
//   `;
// }

// function nextTutorial(subject, level) {
//   const tutorials = ["video.mp4", "video.mp4", "video.mp4"];
//   currentTutorialIndex = (currentTutorialIndex + 1) % tutorials.length;
//   showTutorial(subject, level);
// }

// function showResources(subject, level) {
//   const contentContainer = document.getElementById('contentContainer');
//   const resources = ["a.pdf", "b.pdf", "a2.pdf"];

//   contentContainer.innerHTML = `
//     <div class="resource-list">
//       <h4>${subject} - ${level} Level: Resources</h4>
//       <ul>
//         <li><a href="${resources[currentResourceIndex]}" target="_blank">Download PDF Resource ${currentResourceIndex + 1} for ${subject} - ${level}</a></li>
//       </ul>
//       <br>
//       <button id="nextResourceButton" onclick="nextResource('${subject}', '${level}')">Next Resource</button>
//     </div>
//   `;
// }

// function nextResource(subject, level) {
//   const resources = ["a.pdf", "b.pdf", "a2.pdf"];
//   currentResourceIndex = (currentResourceIndex + 1) % resources.length;
//   showResources(subject, level);
// }

// function submitQuiz() {
//   alert('Quiz Submitted!');
//   document.getElementById('quizSection').style.display = 'none';
// }

// function startQuiz(subject, level) {
//   const quizPageUrl = `quiz.html?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`;
//   window.location.href = quizPageUrl;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   fetchUserLevel();
// });
// Import Firebase modules
// Import Firebase modules
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const auth = getAuth(app);

async function fetchUserLevel() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            resolve(userData.level || "Primary");
            autoShowLevels(userData.level || "Primary");
          } else {
            console.error("No user document found in Firestore");
            resolve("Primary");
            autoShowLevels("Primary"); 
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          reject(error);
          autoShowLevels("Primary");
        }
      } else {
        console.warn("User not logged in, redirecting to signin page");
        window.location.href = "signin.html";
      }
    });
  });
}

function autoShowLevels(userLearningLevel) {
  const subjects = ['Math', 'Science', 'Art', 'Music'];
  const levelsContainer = document.getElementById('levelsContainer');
  if (!levelsContainer) return;

  levelsContainer.innerHTML = `<h3>Your Learning Level: ${userLearningLevel}</h3>`;

  subjects.forEach(subject => {
    const levelDiv = document.createElement('div');
    levelDiv.classList.add('level-option');
    levelDiv.innerHTML = `
      <h4>${subject} - ${userLearningLevel}</h4>
      <button onclick="showTutorial('${subject}', '${userLearningLevel}')">Tutorial</button>
      <button onclick="showResources('${subject}', '${userLearningLevel}')">Resources</button>
      <button onclick="startQuiz('${subject}', '${userLearningLevel}')">Take Quiz</button>
    `;
    levelsContainer.appendChild(levelDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  fetchUserLevel();
});
