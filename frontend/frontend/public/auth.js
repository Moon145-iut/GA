import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Get auth and db instances from the already initialized Firebase app
const auth = getAuth();
const db = getFirestore();

// DOM Elements
const authButton = document.getElementById('authButton');
const profileContainer = document.getElementById('profile-container');
const profilePic = document.getElementById('profilePic');

// Check authentication state when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        updateUIForLoggedInUser(userData);
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // User is signed in
                console.log("User is signed in:", user.uid);
                
                // Fetch user data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    // Save user data to localStorage for persistence across page reloads
                    localStorage.setItem('userData', JSON.stringify({
                        uid: user.uid,
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: userData.role,
                        photoURL: userData.photoURL || 'https://via.placeholder.com/40'
                    }));
                    
                    // Update UI
                    updateUIForLoggedInUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            // User is signed out
            console.log("User is signed out");
            updateUIForLoggedOutUser();
            
            // Clear user data from localStorage
            localStorage.removeItem('userData');
        }
    });

    // Handle sign out button click
    if (authButton) {
        authButton.addEventListener('click', (event) => {
            const isSignOut = authButton.textContent.trim() === 'Sign Out';
            
            if (isSignOut) {
                event.preventDefault();
                signOutUser();
            }
        });
    }
});

// Update UI for logged in user
function updateUIForLoggedInUser(userData) {
    if (!authButton || !profileContainer || !profilePic) {
        console.log("UI elements not found on this page");
        return;
    }
    
    // Change auth button to Sign Out
    authButton.textContent = 'Sign Out';
    authButton.classList.add('signout');
    authButton.href = '#'; // Remove the href to signin.html
    
    // Show profile container with smooth animation
    profileContainer.style.display = 'flex';
    profileContainer.style.opacity = '1';
    
    // Set profile picture
    if (userData.photoURL) {
        profilePic.src = userData.photoURL;
    } else {
        // Use placeholder image
        profilePic.src = 'https://via.placeholder.com/40';
    }
    
    // Add user role as a data attribute
    profilePic.dataset.role = userData.role;
    
    // Make profile pic clickable to go to dashboard
    profilePic.addEventListener('click', () => {
        window.location.href = `${userData.role.toLowerCase().replace(' ', '_')}_dashboard.html`;
    });
    
    // Add transition class for smooth visual changes
    authButton.classList.add('auth-state-transition');
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    if (!authButton || !profileContainer) {
        console.log("UI elements not found on this page");
        return;
    }
    
    // Change auth button back to Sign In
    authButton.textContent = 'Sign In';
    authButton.classList.remove('signout');
    authButton.href = 'signin.html';
    
    // Hide profile container
    profileContainer.style.display = 'none';
    profileContainer.style.opacity = '0';
    
    // Add transition class for smooth visual changes
    authButton.classList.add('auth-state-transition');
}

// Sign out user
async function signOutUser() {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        
        // Update UI immediately for better user experience
        updateUIForLoggedOutUser();
        
        // Clear user data from localStorage
        localStorage.removeItem('userData');
        
        // Reload page for a clean state
        window.location.reload();
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

// Export functions for other modules to use
export { auth, db, updateUIForLoggedInUser, updateUIForLoggedOutUser, signOutUser };
