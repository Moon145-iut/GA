import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import{getFirestore, setDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
// Your web app's Firebase configuration
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
function showMessage(message, divId, isError = false) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  if (isError) {
    messageDiv.style.backgroundColor = "#ff4444";
  }
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Add loading state function
function setLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = 'Please wait...';
  } else {
    button.disabled = false;
    button.innerHTML = buttonId === 'submitSignUp' ? 'Sign Up' : 'Sign In';
  }
}


// Add retry logic for network failures
async function retryOperation(operation, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error.code === 'auth/network-request-failed' && attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      throw error;
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const signUpForm = document.getElementById("signUpForm");
  const signUpMessage = document.getElementById("signUpMessage");

  signUpForm.addEventListener("submit", async function(event) {
      event.preventDefault();

      const firstName = document.getElementById("fName").value.trim();
      const lastName = document.getElementById("lName").value.trim();
      const email = document.getElementById("rEmail").value.trim();
      const password = document.getElementById("rPassword").value.trim();
      const role = document.getElementById("rRole").value;
      const level = document.getElementById("rLevel") ? document.getElementById("rLevel").value : "";

      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          const userData = {
              uid: user.uid,
              firstName,
              lastName,
              email,
              role,
              level,
              createdAt: new Date()
          };

          await setDoc(doc(db, "users", user.uid), userData);
          signUpMessage.textContent = "Account Created Successfully";
          signUpMessage.style.display = "block";

          setTimeout(() => {
              if (role === "Special child") {
                  window.location.href = "test.html"; // Redirect to test page
              } else {
                  window.location.href = "index.html"; // Default redirect
              }
          }, 1500);
      } catch (error) {
          signUpMessage.textContent = "Error: " + error.message;
          signUpMessage.style.display = "block";
      }
  });
});


const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // Get form values
    const role = document.getElementById('rRole').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const level = document.getElementById('rLevel')?.value || 'Primary';

    // Form validation
    if (!email || !password || !firstName || !lastName || !role) {
      showMessage('Please fill in all fields', 'signUpMessage');
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    setLoading('submitSignUp', true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        role,
        level,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "users", user.uid), userData);
      showMessage('Account Created Successfully', 'signUpMessage');

      // Redirect based on role
      setTimeout(() => {
        if (role === "Special child") {
          window.location.href = "test.html";
        } else {
          window.location.href = "index.html";
        }
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, 'signUpMessage', true);
    } finally {
      setLoading('submitSignUp', false);
    }
  });
}

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  setLoading('submitSignIn', true);

  try {
    await retryOperation(async () => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showMessage('Login successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      setTimeout(() => {
        window.location.href = 'index.html';  // Direct redirect to index.html
      }, 1500);
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.code === 'auth/network-request-failed') {
      showMessage('Network error. Please check your internet connection and try again.', 'signInMessage', true);
    } else if (error.code === 'auth/invalid-credential') {
      showMessage('Incorrect Email or Password', 'signInMessage', true);
    } else {
      showMessage('Account does not exist', 'signInMessage', true);
    }
  } finally {
    setLoading('submitSignIn', false);
  }
});

const auth = getAuth();
const db = getFirestore();
onAuthStateChanged(auth, async (user) => {
  const profileContainer = document.getElementById("profile-container");
  const signinLink = document.querySelector(".auth-links .btn-signin");

  if (user) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Store user data in localStorage
        localStorage.setItem('userProfile', JSON.stringify({
          uid: user.uid,
          username: `${userData.firstName}${userData.lastName}`,
          displayName: `${userData.firstName} ${userData.lastName}`,
          photoURL: userData.photoURL || '/default-profile.png',
          email: userData.email
        }));

        // Update UI
        const profilePicElement = document.getElementById("profilePage");
        if (profilePicElement) {
          profilePicElement.src = userData.photoURL || '/default-profile.png';
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    // Clear user data on logout
    localStorage.removeItem('userProfile');
    // User is logged out - reset UI
    profileContainer.style.display = "none";
    signinLink.textContent = "Sign In";
    signinLink.onclick = null;
    signinLink.href = "signin.html";
  }
});

// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html"; // Redirect to home
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
    });
});

// Profile page redirection
document.getElementById("profilePage").addEventListener("click", function (event) {
  event.preventDefault();
  const profileLink = event.target.getAttribute("href");

  if (profileLink) {
    window.location.href = profileLink;
  } else {
    alert("Error: User profile not available.");
  }
});