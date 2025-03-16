// // This script handles profile-related functionality
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// // Get auth and db instances from the already initialized Firebase app
// const auth = getAuth();
// const db = getFirestore();
// const storage = getStorage();

// // Initialize profile UI components
// document.addEventListener('DOMContentLoaded', async () => {
//     // Check for user authentication state
//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             try {
//                 const userData = await getUserProfile(user.uid);
//                 if (userData) {
//                     // Update profile picture if it exists
//                     const profileContainer = document.getElementById('profile-container');
//                     const profilePic = document.getElementById('profilePic');
                    
//                     if (profilePic && userData.photoURL) {
//                         profilePic.src = userData.photoURL;
//                     }
                    
//                     // Make profile container visible if it exists
//                     if (profileContainer) {
//                         profileContainer.style.display = 'flex';
//                     }
                    
//                     // Store profile data in localStorage for persistence
//                     localStorage.setItem('userData', JSON.stringify(userData));
//                     console.log("User profile loaded:", userData);
//                 }
                
//                 // Initialize profile form if it exists (on dashboard pages)
//                 initProfileForm(user.uid);
                
//             } catch (error) {
//                 console.error("Error in profile initialization:", error);
//             }
//         } else {
//             // If signed out and on a protected page, redirect to sign in
//             const currentPath = window.location.pathname;
//             if (currentPath.includes('dashboard')) {
//                 window.location.href = 'signin.html';
//             }
//         }
//     });
    
//     // Initialize from localStorage if available (for persistence)
//     const storedUser = localStorage.getItem('userData');
//     if (storedUser) {
//         const userData = JSON.parse(storedUser);
//         console.log("Profile loaded from local storage:", userData);
        
//         // Update profile UI elements
//         const profileContainer = document.getElementById('profile-container');
//         const profilePic = document.getElementById('profilePic');
        
//         if (profilePic && userData.photoURL) {
//             profilePic.src = userData.photoURL;
//         }
        
//         if (profileContainer) {
//             profileContainer.style.display = 'flex';
//         }
//     }
// });

// // Initialize profile forms on dashboard pages
// function initProfileForm(uid) {
//     const profileForm = document.getElementById('profileForm');
//     if (profileForm) {
//         // Check if form handler is already attached
//         if (!profileForm.getAttribute('data-handler-attached')) {
//             profileForm.setAttribute('data-handler-attached', 'true');
            
//             profileForm.addEventListener('submit', async (e) => {
//                 e.preventDefault();
                
//                 const profileImage = document.getElementById('profileImage');
//                 const aboutInput = document.getElementById('about');
                
//                 let photoURL = null;
//                 let profileData = {};
                
//                 // If a profile image was selected, upload it
//                 if (profileImage && profileImage.files.length > 0) {
//                     const profileImageFile = profileImage.files[0];
                    
//                     try {
//                         // Show loading state
//                         const submitButton = profileForm.querySelector('button[type="submit"]');
//                         if (submitButton) {
//                             submitButton.disabled = true;
//                             submitButton.textContent = 'Uploading...';
//                         }
                        
//                         // Upload image to Firebase Storage
//                         photoURL = await uploadProfileImage(uid, profileImageFile);
                        
//                         // Add photoURL to profile data
//                         if (photoURL) {
//                             profileData.photoURL = photoURL;
//                         }
                        
//                         // Update profile picture in UI
//                         const profilePic = document.getElementById('profilePic');
//                         const headerProfilePic = document.getElementById('headerProfilePic');
                        
//                         if (profilePic && photoURL) {
//                             profilePic.src = photoURL;
//                         }
                        
//                         if (headerProfilePic && photoURL) {
//                             headerProfilePic.src = photoURL;
//                         }
//                     } catch (error) {
//                         console.error("Error uploading profile image:", error);
//                         alert("Failed to upload profile image. Please try again.");
//                     }
//                 }
                
//                 // If about text was entered, add it to profile data
//                 if (aboutInput && aboutInput.value.trim()) {
//                     profileData.about = aboutInput.value.trim();
//                 }
                
//                 // Update profile in Firestore if there's data to update
//                 if (Object.keys(profileData).length > 0) {
//                     try {
//                         const success = await updateUserProfile(uid, profileData);
                        
//                         if (success) {
//                             alert("Profile updated successfully!");
//                         } else {
//                             alert("Failed to update profile. Please try again.");
//                         }
//                     } catch (error) {
//                         console.error("Error updating profile:", error);
//                         alert("An error occurred while updating your profile. Please try again.");
//                     }
//                 }
                
//                 // Reset form state
//                 const submitButton = profileForm.querySelector('button[type="submit"]');
//                 if (submitButton) {
//                     submitButton.disabled = false;
//                     submitButton.textContent = 'Update Profile';
//                 }
//             });
//         }
//     }
// }

// // Function to upload profile image to Firebase Storage
// async function uploadProfileImage(uid, imageFile) {
//     try {
//         // Create a reference to the file location
//         const storageRef = ref(storage, `profile_images/${uid}/${Date.now()}_${imageFile.name}`);
        
//         // Upload the file
//         const snapshot = await uploadBytes(storageRef, imageFile);
        
//         // Get the download URL
//         const downloadURL = await getDownloadURL(snapshot.ref);
        
//         console.log('Profile image uploaded successfully:', downloadURL);
//         return downloadURL;
//     } catch (error) {
//         console.error("Error uploading profile image:", error);
//         throw error;
//     }
// }

// // Get current user profile data
// export async function getUserProfile(uid) {
//     try {
//         const userRef = doc(db, "users", uid);
//         const docSnap = await getDoc(userRef);
        
//         if (docSnap.exists()) {
//             return docSnap.data();
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Error getting profile: ", error);
//         return null;
//     }
// }

// // Function to update user profile
// export async function updateUserProfile(uid, profileData) {
//     try {
//         const userRef = doc(db, "users", uid);
        
//         // Use setDoc with merge: true to update only specified fields
//         await setDoc(userRef, profileData, { merge: true });
        
//         // Update localStorage with new profile data
//         const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//         const updatedUserData = { ...userData, ...profileData };
//         localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
//         return true;
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         return false;
//     }
// }

// // Update profile picture
// export async function updateProfilePicture(uid, photoURL) {
//     return await updateUserProfile(uid, { photoURL });
// }
// This script handles profile-related functionality
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Get auth and db instances from the already initialized Firebase app
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// Initialize profile UI components
document.addEventListener('DOMContentLoaded', async () => {
    // Check for user authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userData = await getUserProfile(user.uid);
                if (userData) {
                    // Update profile picture if it exists
                    const profileContainer = document.getElementById('profile-container');
                    const profilePic = document.getElementById('profilePic');
                    
                    if (profilePic && userData.photoURL) {
                        profilePic.src = userData.photoURL;
                    }
                    
                    // Make profile container visible if it exists
                    if (profileContainer) {
                        profileContainer.style.display = 'flex';
                    }
                    
                    // Store profile data in localStorage for persistence
                    localStorage.setItem('userData', JSON.stringify(userData));
                    console.log("User profile loaded:", userData);
                }
                
                // Initialize profile form if it exists (on dashboard pages)
                initProfileForm(user.uid);
                
            } catch (error) {
                console.error("Error in profile initialization:", error);
            }
        } else {
            // If signed out and on a protected page, redirect to sign in
            const currentPath = window.location.pathname;
            if (currentPath.includes('dashboard')) {
                window.location.href = 'signin.html';
            }
        }
    });
    
    // Initialize from localStorage if available (for persistence)
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("Profile loaded from local storage:", userData);
        
        // Update profile UI elements
        const profileContainer = document.getElementById('profile-container');
        const profilePic = document.getElementById('profilePic');
        
        if (profilePic && userData.photoURL) {
            profilePic.src = userData.photoURL;
        }
        
        if (profileContainer) {
            profileContainer.style.display = 'flex';
        }
    }
});

// Initialize profile forms on dashboard pages
function initProfileForm(uid) {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        // Check if form handler is already attached
        if (!profileForm.getAttribute('data-handler-attached')) {
            profileForm.setAttribute('data-handler-attached', 'true');
            
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const profileImage = document.getElementById('profileImage');
                const aboutInput = document.getElementById('about');
                
                let photoURL = null;
                let profileData = {};
                
                // If a profile image was selected, upload it
                if (profileImage && profileImage.files.length > 0) {
                    const profileImageFile = profileImage.files[0];
                    
                    try {
                        // Show loading state
                        const submitButton = profileForm.querySelector('button[type="submit"]');
                        if (submitButton) {
                            submitButton.disabled = true;
                            submitButton.textContent = 'Uploading...';
                        }
                        
                        // Upload image to Firebase Storage
                        photoURL = await uploadProfileImage(uid, profileImageFile);
                        
                        // Add photoURL to profile data
                        if (photoURL) {
                            profileData.photoURL = photoURL;
                        }
                        
                        // Update profile picture in UI
                        const profilePic = document.getElementById('profilePic');
                        const headerProfilePic = document.getElementById('headerProfilePic');
                        
                        if (profilePic && photoURL) {
                            profilePic.src = photoURL;
                        }
                        
                        if (headerProfilePic && photoURL) {
                            headerProfilePic.src = photoURL;
                        }
                    } catch (error) {
                        console.error("Error uploading profile image:", error);
                        alert("Failed to upload profile image. Please try again.");
                    }
                }
                
                // If about text was entered, add it to profile data
                if (aboutInput && aboutInput.value.trim()) {
                    profileData.about = aboutInput.value.trim();
                }
                
                // Update profile in Firestore if there's data to update
                if (Object.keys(profileData).length > 0) {
                    try {
                        const success = await updateUserProfile(uid, profileData);
                        
                        if (success) {
                            alert("Profile updated successfully!");
                        } else {
                            alert("Failed to update profile. Please try again.");
                        }
                    } catch (error) {
                        console.error("Error updating profile:", error);
                        alert("An error occurred while updating your profile. Please try again.");
                    }
                }
                
                // Reset form state
                const submitButton = profileForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Update Profile';
                }
            });
        }
    }
}

// Function to upload profile image to Firebase Storage
async function uploadProfileImage(uid, imageFile) {
    try {
        // Create a reference to the file location
        const storageRef = ref(storage, `profile_images/${uid}/${Date.now()}_${imageFile.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, imageFile);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        console.log('Profile image uploaded successfully:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading profile image:", error);
        throw error;
    }
}

// Get current user profile data
export async function getUserProfile(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting profile: ", error);
        return null;
    }
}

// Function to update user profile
export async function updateUserProfile(uid, profileData) {
    try {
        const userRef = doc(db, "users", uid);
        
        // Use setDoc with merge: true to update only specified fields
        await setDoc(userRef, profileData, { merge: true });
        
        // Update localStorage with new profile data
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const updatedUserData = { ...userData, ...profileData };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        return true;
    } catch (error) {
        console.error("Error updating profile:", error);
        return false;
    }
}

// Update profile picture
export async function updateProfilePicture(uid, photoURL) {
    return await updateUserProfile(uid, { photoURL });
}
